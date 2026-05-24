import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { seoPages } from "@/lib/seo-pages";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = ["/", "/tools", "/about", "/contact", "/privacy", "/terms"];
        const dynamicPaths = seoPages.map((p) => `/d/${p.slug}`);
        const all = [...staticPaths, ...dynamicPaths];

        const urls = all
          .map((path) => {
            const priority = path === "/" ? "1.0" : path.startsWith("/d/") ? "0.7" : "0.6";
            return [
              `  <url>`,
              `    <loc>${BASE_URL}${path}</loc>`,
              `    <changefreq>weekly</changefreq>`,
              `    <priority>${priority}</priority>`,
              `  </url>`,
            ].join("\n");
          })
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
