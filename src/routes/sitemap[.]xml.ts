import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { seoPages } from "@/lib/seo-pages";
import { topSeoPages } from "@/lib/seo-top-pages";
import { blogPosts } from "@/lib/blog-posts";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

interface SitemapEntry {
  path: string;
  priority: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          // Homepage — highest priority
          { path: "/", priority: "1.0" },
          // Primary downloader landing pages — topical authority cluster
          ...topSeoPages.map((p) => ({ path: `/${p.slug}`, priority: "0.9" })),
          // Blog index + posts
          { path: "/blog", priority: "0.8" },
          ...blogPosts.map((p) => ({ path: `/blog/${p.slug}`, priority: "0.8" })),
          // Supporting / informational pages
          { path: "/faq", priority: "0.7" },
          { path: "/tools", priority: "0.7" },
          // Secondary dynamic landing pages
          ...seoPages.map((p) => ({ path: `/d/${p.slug}`, priority: "0.6" })),
          // Legal / company
          { path: "/about", priority: "0.5" },
          { path: "/contact", priority: "0.5" },
          { path: "/privacy", priority: "0.4" },
          { path: "/terms", priority: "0.4" },
        ];

        const urls = entries
          .map((e) =>
            [
              `  <url>`,
              `    <loc>${BASE_URL}${e.path}</loc>`,
              `    <changefreq>weekly</changefreq>`,
              `    <priority>${e.priority}</priority>`,
              `  </url>`,
            ].join("\n"),
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;


        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
