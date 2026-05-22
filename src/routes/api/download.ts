import { createFileRoute } from "@tanstack/react-router";
import { downloadSchema } from "@/lib/download-schema";

const MAX_BYTES = 200 * 1024 * 1024; // 200 MB

export const Route = createFileRoute("/api/download")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid request body." }, { status: 400 });
        }

        const parsed = downloadSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: parsed.error.issues[0]?.message ?? "Invalid input." },
            { status: 400 },
          );
        }

        const { url } = parsed.data;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 20_000);

        let upstream: Response;
        try {
          upstream = await fetch(url, {
            method: "GET",
            redirect: "follow",
            signal: controller.signal,
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
              Accept: "video/*,*/*;q=0.8",
            },
          });
        } catch (err) {
          clearTimeout(timeout);
          console.error("Upstream fetch failed:", err);
          return Response.json(
            { error: "Could not reach the video. The link may be expired or private." },
            { status: 502 },
          );
        }
        clearTimeout(timeout);

        if (!upstream.ok || !upstream.body) {
          return Response.json(
            { error: `Link expired, private, or unsupported (${upstream.status}).` },
            { status: 422 },
          );
        }

        const contentType = upstream.headers.get("content-type") ?? "";
        if (!/^video\//i.test(contentType) && !/octet-stream/i.test(contentType)) {
          return Response.json(
            { error: "The link does not point to a video file." },
            { status: 422 },
          );
        }

        const contentLength = upstream.headers.get("content-length");
        if (contentLength && Number(contentLength) > MAX_BYTES) {
          return Response.json({ error: "Video is too large (over 200 MB)." }, { status: 413 });
        }

        // Enforce cap while streaming
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
