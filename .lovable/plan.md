## MetaVideoDownloader — Build Plan

A close visual clone of versevidsaver.com, rebranded as **MetaVideoDownloader**, with a working best-effort backend that fetches a pasted Meta AI video URL and streams the MP4 to the user.

### Pages (TanStack Start routes)

- `/` — landing page (hero + downloader + features + how-to + uses + FAQ + footer)
- `/about` — short brand/about page
- `/privacy` — privacy policy
- `/terms` — terms of use
- `/contact` — simple contact info page

Each route gets its own `head()` with unique title + meta description + og tags.

### Landing page sections (mirroring the reference)

1. **Header** — logo "MetaVideoDownloader" left, nav (Home, How it works, FAQ, About) right.
2. **Hero (dark navy)** — H1 "Download Meta AI Video", subheading, large URL input + blue "Download" button, trust badges (Secure / Virus Free / No Watermark).
3. **Processing card states** (in-place, replacing the input card):
   - Analyzing link → Processing → Complete (shows "HD MP4 ready" + Download button) → Error.
4. **"Why Use Our Meta AI Saver"** — 3 feature cards: Easy Link Downloader, HD MP4 & Audio, No Watermark.
5. **"How to Download Meta AI Videos"** — 4 numbered steps.
6. **"Ways to Use Your Downloads"** — bulleted list with checkmark icons.
7. **FAQ** — accordion with the 9 Q&As from the reference, reworded.
8. **Footer** — brand, nav links, legal links, copyright.

### Design system

Match the reference closely:
- Background dark navy `#1f2937`-ish for hero/footer, light gray `#f8fafc` for sections, white cards.
- Primary accent: blue `#2563eb`.
- Typography: Inter (already common); bold display weights for headings.
- Rounded-2xl cards with soft shadow, generous spacing.
- All colors declared as oklch tokens in `src/styles.css` (no hardcoded colors in components). Add `--brand`, `--brand-foreground`, `--hero-bg`, `--section-muted` semantic tokens.
- shadcn components: Button, Input, Card, Accordion, Sonner (toasts).

### Backend — best-effort downloader

Server route: `src/routes/api/download.ts` (POST).

Request: `{ url: string }`. Validation with zod:
- Must be a valid `https://` URL.
- Hostname allowlist limited to known Meta AI / Facebook CDN hosts (e.g. `*.fbcdn.net`, `*.facebook.com`, `meta.ai`, `*.meta.ai`). Anything else → 400.
- Max URL length 2048.

Handler:
1. Server-side `fetch(url)` with a desktop User-Agent and a 20s timeout.
2. If response is not OK or content-type is not `video/*`, return JSON error `{ error: "Link expired, private, or unsupported." }` with 422.
3. Otherwise stream the response body back with:
   - `Content-Type: video/mp4`
   - `Content-Disposition: attachment; filename="meta-ai-video.mp4"`
   - Forward `Content-Length` if present.
4. Hard cap response size at ~200MB; abort and return 413 if exceeded.

Explicitly tell the user in UI copy: only works for direct/public Meta AI share links; auth-protected links will fail.

### Client flow

- Single `DownloaderCard` component owns state: `idle | analyzing | downloading | success | error`.
- On submit: POST to `/api/download` via `fetch`. Stream response into a Blob, create object URL, trigger download via hidden `<a>`.
- Show progress (bytes received / total when Content-Length known).
- Error toast via Sonner with friendly message; reset button to try again.
- Client-side input validation mirrors server zod schema for instant feedback.

### File map (new)

```text
src/routes/index.tsx                  # landing
src/routes/about.tsx
src/routes/privacy.tsx
src/routes/terms.tsx
src/routes/contact.tsx
src/routes/api/download.ts            # server route
src/components/site/Header.tsx
src/components/site/Footer.tsx
src/components/site/Hero.tsx
src/components/site/DownloaderCard.tsx
src/components/site/Features.tsx
src/components/site/HowItWorks.tsx
src/components/site/UseCases.tsx
src/components/site/Faq.tsx
src/lib/download-schema.ts            # shared zod schema
src/styles.css                        # extend tokens
src/routes/__root.tsx                 # update meta + Toaster + favicon
```

No backend database, no auth, no Lovable Cloud needed.

### Out of scope (call out)

- No actual Meta AI authentication or session handling — auth-protected links cannot be fetched server-side.
- No ad-blocker prompt modal (the reference's monetization layer).
- No analytics integrations.

### Acceptance

- Layout visually matches reference at desktop and mobile breakpoints.
- Pasting a valid public video URL on a Meta CDN downloads an MP4 file.
- Invalid/non-allowlisted URLs show a clear error without server crash.
- Each route has unique SEO meta; single H1 per page; semantic HTML.
