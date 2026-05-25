import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const MAX_BYTES = 200 * 1024 * 1024; // 200 MB
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

const ALLOWED_HOST_SUFFIXES = [
  "meta.ai",
  "metaai.com",
  "fbcdn.net",
  "facebook.com",
  "fb.com",
  "cdninstagram.com",
  "whatsapp.net",
];

const inputSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1)
    .max(2048)
    .url()
    .refine((u) => u.startsWith("https://"), "Link must use https://")
    .refine((u) => {
      try {
        const h = new URL(u).hostname.toLowerCase();
        return ALLOWED_HOST_SUFFIXES.some((s) => h === s || h.endsWith("." + s));
      } catch {
        return false;
      }
    }, "Only Meta AI / Facebook video links are supported."),
});

function decodeEscapes(s: string) {
  return s
    .replace(/\\u0026/g, "&")
    .replace(/\\\//g, "/")
    .replace(/&amp;/g, "&");
}

function cleanExtractedVideoUrl(value: string): string | null {
  let url = decodeEscapes(value).trim().replace(/\\+$/g, "");
  const mp4Index = url.indexOf(".mp4");
  if (mp4Index >= 0) {
    const trailing = url.slice(mp4Index + 4);
    const stopIndex = trailing.search(/(?:%3C|<|\\n|\\r|\\t|[}\]\\]|,\{)/i);
    if (stopIndex >= 0) url = url.slice(0, mp4Index + 4 + stopIndex);
  }

  try {
    return new URL(url).toString();
  } catch {
    return null;
  }
}

function getAllowedHostError(url: string): string | null {
  try {
    const host = new URL(url).hostname.toLowerCase();
    const allowed = ALLOWED_HOST_SUFFIXES.some((s) => host === s || host.endsWith("." + s));
    return allowed ? null : `Resolved video host is not supported: ${host}.`;
  } catch {
    return "Resolved video URL is invalid.";
  }
}

/**
 * Pulls a direct progressive MP4 URL out of a Meta AI / Facebook post HTML page.
 * Prefers progressive_recipe URLs (single-file MP4 with audio) at the highest
 * available resolution. Falls back to the first .mp4 URL found.
 */
function extractVideoUrl(html: string): string | null {
  const ogVideo = html.match(/<meta[^>]+(?:property|name)=["']og:video(?::secure_url)?["'][^>]+content=["']([^"']+)["'][^>]*>/i);
  const ogCandidate = ogVideo?.[1] ? cleanExtractedVideoUrl(ogVideo[1]) : null;
  if (ogCandidate?.includes(".mp4")) return ogCandidate;

  // Match raw .mp4 URLs (may contain \u0026 escapes)
  const re = /https:\\?\/\\?\/[^\s"'<>\\]+?\.mp4[^"'<>\s]*/g;
  const raw = html.match(re) ?? [];
  if (raw.length === 0) return null;

  const candidates = raw.map(cleanExtractedVideoUrl).filter((u): u is string => Boolean(u));

  // Prefer progressive (single-file with audio) over DASH init segments
  const progressive = candidates.filter((u) => /progressive_recipe|xpv_progressive/i.test(u));
  const pool = progressive.length ? progressive : candidates;

  // Prefer higher resolution if hinted in URL
  const rank = (u: string) => {
    const m = u.match(/(\d{3,4})p/);
    return m ? parseInt(m[1], 10) : 0;
  };
  pool.sort((a, b) => rank(b) - rank(a));
  return pool[0] ?? null;
}

async function fetchWithTimeout(url: string, ms: number, init?: RequestInit) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, {
      ...init,
      signal: ctrl.signal,
      redirect: "follow",
      headers: {
        "User-Agent": UA,
        ...(init?.headers ?? {}),
      },
    });
  } finally {
    clearTimeout(t);
  }
}

async function extractVideoUrlFromResponse(res: Response, ms: number): Promise<string | null> {
  if (!res.body) return null;

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let html = "";
  const startedAt = Date.now();

  while (Date.now() - startedAt < ms && html.length < 1_500_000) {
    const remaining = Math.max(1, ms - (Date.now() - startedAt));
    const { done, value } = await Promise.race([
      reader.read(),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Timed out reading response.")), remaining)),
    ]);
    if (done) break;
    html += decoder.decode(value, { stream: true });
    const found = extractVideoUrl(html);
    if (found) {
      await reader.cancel().catch(() => {});
      return found;
    }
  }

  html += decoder.decode();
  return extractVideoUrl(html);
}

async function resolveDirectVideoUrl(input: string): Promise<string> {
  const u = new URL(input);
  const host = u.hostname.toLowerCase();
  const path = u.pathname.toLowerCase();

  // Already a direct video file → use as-is
  if (path.endsWith(".mp4") || host.includes("fbcdn.net") || host.includes("cdninstagram.com")) {
    return input;
  }

  // Otherwise treat as an HTML page that embeds the video URL
  const res = await fetchWithTimeout(input, 15_000, {
    headers: { Accept: "text/html,*/*" },
  });
  if (!res.ok) {
    throw new Error(`Could not load the post page (${res.status}).`);
  }
  const found = await extractVideoUrlFromResponse(res, 15_000);
  if (!found) {
    throw new Error(
      "Could not find a downloadable video on that page. The post may be private, expired, or contain no video.",
    );
  }
  return found;
}

// Lightweight in-memory rate limiter (per-isolate). Caps abusive clients
// before they trigger expensive scrape + proxy work.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 8; // 8 downloads per IP per minute
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function takeRateToken(ip: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const b = rateBuckets.get(ip);
  if (!b || b.resetAt <= now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true, retryAfter: 0 };
  }
  if (b.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfter: Math.ceil((b.resetAt - now) / 1000) };
  }
  b.count += 1;
  return { ok: true, retryAfter: 0 };
}

// Best-effort cleanup so the map doesn't grow unbounded.
function sweepRateBuckets() {
  const now = Date.now();
  if (rateBuckets.size < 10_000) return;
  for (const [k, v] of rateBuckets) if (v.resetAt <= now) rateBuckets.delete(k);
}

function getClientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export const Route = createFileRoute("/api/download")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        sweepRateBuckets();
        const ip = getClientIp(request);
        const limit = takeRateToken(ip);
        if (!limit.ok) {
          return Response.json(
            { error: "Too many requests. Please wait a moment and try again." },
            {
              status: 429,
              headers: {
                "Retry-After": String(limit.retryAfter),
                "Cache-Control": "no-store",
              },
            },
          );
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid request body." }, { status: 400 });
        }

        const parsed = inputSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: parsed.error.issues[0]?.message ?? "Invalid input." },
            { status: 400 },
          );
        }

        let directUrl: string;
        try {
          directUrl = await resolveDirectVideoUrl(parsed.data.url);
          const hostError = getAllowedHostError(directUrl);
          if (hostError) {
            console.error("Resolved URL rejected:", hostError);
            return Response.json({ error: hostError }, { status: 422 });
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Could not resolve video.";
          console.error("Resolve failed:", msg);
          return Response.json({ error: msg }, { status: 422 });
        }

        let upstream: Response;
        try {
          upstream = await fetchWithTimeout(directUrl, 25_000, {
            headers: { Accept: "video/*,*/*;q=0.8", Referer: "https://www.meta.ai/" },
            signal: request.signal,
          });
        } catch (err) {
          console.error("Video fetch failed:", err);
          return Response.json(
            { error: "Could not reach the video file. The link may have expired." },
            { status: 502 },
          );
        }

        if (!upstream.ok || !upstream.body) {
          const upstreamBody = await upstream.text().catch(() => "");
          const reason = upstream.status === 403
            ? "Meta/Facebook refused access to the video file (403). The share link is private, expired, geo-blocked, or requires a logged-in session."
            : `Video request failed (${upstream.status}).`;
          console.error("Video request failed:", {
            status: upstream.status,
            statusText: upstream.statusText,
            contentType: upstream.headers.get("content-type"),
            host: new URL(directUrl).hostname,
            bodyPreview: upstreamBody.slice(0, 200),
          });
          return Response.json(
            { error: reason },
            { status: 502 },
          );
        }

        const contentType = upstream.headers.get("content-type") ?? "";
        if (!/^video\//i.test(contentType) && !/octet-stream/i.test(contentType)) {
          console.error("Resolved URL returned non-video content:", {
            status: upstream.status,
            contentType,
            host: new URL(directUrl).hostname,
          });
          return Response.json(
            { error: `Resolved URL returned ${contentType || "unknown content"}, not a video file.` },
            { status: 422 },
          );
        }

        const contentLength = upstream.headers.get("content-length");
        if (contentLength && Number(contentLength) > MAX_BYTES) {
          return Response.json({ error: "Video is too large (over 200 MB)." }, { status: 413 });
        }

        let received = 0;
        const reader = upstream.body.getReader();
        const stream = new ReadableStream<Uint8Array>({
          async pull(controller) {
            try {
              const { done, value } = await reader.read();
              if (done) {
                controller.close();
                return;
              }
              received += value.byteLength;
              if (received > MAX_BYTES) {
                controller.error(new Error("Video exceeded 200 MB cap."));
                await reader.cancel();
                return;
              }
              controller.enqueue(value);
            } catch (e) {
              controller.error(e);
            }
          },
          cancel() {
            reader.cancel().catch(() => {});
          },
        });

        const headers = new Headers({
          "Content-Type": "video/mp4",
          "Content-Disposition": 'attachment; filename="meta-ai-video.mp4"',
          "Cache-Control": "no-store",
        });
        if (contentLength) headers.set("Content-Length", contentLength);

        return new Response(stream, { status: 200, headers });
      },
    },
  },
});
