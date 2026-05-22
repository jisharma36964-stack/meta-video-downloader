import { z } from "zod";

const ALLOWED_HOST_SUFFIXES = [
  "meta.ai",
  "metaai.com",
  "fbcdn.net",
  "facebook.com",
  "fb.com",
  "cdninstagram.com",
  "whatsapp.net",
];

export const downloadSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, "Please paste a video link.")
    .max(2048, "Link is too long.")
    .url("Enter a valid URL.")
    .refine((u) => u.startsWith("https://"), "Link must start with https://")
    .refine((u) => {
      try {
        const host = new URL(u).hostname.toLowerCase();
        return ALLOWED_HOST_SUFFIXES.some(
          (s) => host === s || host.endsWith("." + s),
        );
      } catch {
        return false;
      }
    }, "Paste a Meta AI share link (meta.ai/...) or direct Facebook CDN link."),
});

export type DownloadInput = z.infer<typeof downloadSchema>;
