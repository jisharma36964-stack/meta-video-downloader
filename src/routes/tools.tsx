import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { seoPages } from "@/lib/seo-pages";
import { topSeoPages } from "@/lib/seo-top-pages";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "All Meta AI Video Downloader Tools" },
      { name: "description", content: "Browse all 50 Meta AI video downloader tools — every angle, every format, every device. Free HD MP4 downloads, no signup." },
      { property: "og:title", content: "All Meta AI Video Downloader Tools" },
      { property: "og:description", content: "Every Meta AI video download tool we offer, in one directory." },
      { property: "og:url", content: "/tools" },
    ],
    links: [{ rel: "canonical", href: "/tools" }],
  }),
  component: Tools,
});

function Tools() {
  return (
    <main>
      <section className="relative bg-hero pb-16 pt-28 text-hero-foreground sm:pt-32">
        <Header />
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            All Meta AI Video Downloader Tools
          </h1>
          <p className="mt-4 max-w-2xl text-hero-foreground/70">
            Every angle, every format, every device. Pick the one that matches what you need today — they all run on the same fast, watermark-free download pipeline.
          </p>
        </div>
      </section>

      <section className="bg-background py-14">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-6 text-2xl font-semibold text-foreground">Featured tools</h2>
          <ul className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topSeoPages.map((p) => (
              <li key={p.slug} className="rounded-xl border border-brand/40 bg-card p-4 transition hover:border-brand">
                <a href={`/${p.slug}`} className="block">
                  <h3 className="text-base font-semibold text-foreground">{p.h1}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                </a>
              </li>
            ))}
          </ul>

          <h2 className="mb-6 text-2xl font-semibold text-foreground">All tools</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {seoPages.map((p) => (
              <li key={p.slug} className="rounded-xl border border-border bg-card p-4 transition hover:border-brand">
                <Link to="/d/$slug" params={{ slug: p.slug }} className="block">
                  <h3 className="text-base font-semibold text-foreground">{p.h1}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
