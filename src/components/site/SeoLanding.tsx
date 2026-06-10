import { Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { DownloaderCard } from "@/components/site/DownloaderCard";
import { topSeoPages } from "@/lib/seo-top-pages";
import type { SeoPage } from "@/lib/seo-pages";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface SeoLandingProps {
  page: SeoPage;
  url: string;
}

export function SeoLanding({ page, url }: SeoLandingProps) {
  const others = topSeoPages.filter((p) => p.slug !== page.slug);
  const idx = topSeoPages.findIndex((p) => p.slug === page.slug);
  // 3 curated related downloader pages (rotating so each page links to a
  // distinct trio — supports topical authority without cannibalization).
  const related = Array.from({ length: 3 }, (_, i) => topSeoPages[(idx + i + 1) % topSeoPages.length]).filter(
    (p) => p.slug !== page.slug,
  );
  const popular = others.slice(0, 6);

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-hero pb-16 pt-28 text-hero-foreground sm:pt-32">
        <Header />
        <div className="mx-auto max-w-5xl px-6">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-hero-foreground/60">
            <Link to="/" className="hover:text-hero-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/tools" className="hover:text-hero-foreground">Tools</Link>
            <span className="mx-2">/</span>
            <span className="text-hero-foreground/80">{page.title}</span>
          </nav>
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {page.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-hero-foreground/70 sm:text-lg">
            {page.description}
          </p>
          <div className="mt-10">
            <DownloaderCard />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-background py-14">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-3">
          <article className="md:col-span-2 space-y-5 text-foreground leading-relaxed">
            <h2 className="text-2xl font-semibold">Why {capitalizeFirst(page.keyword)} Matters</h2>
            <p>{page.intro}</p>
            <p>
              Built for {page.audience}, this page exists because {page.angle}. Most generic
              tools weren't designed for the specific way Meta AI exposes its generated videos
              on share pages, which is why success rates and quality can vary wildly across
              the dozens of {page.keyword} tools you'll find in a search result.
            </p>
            <p>
              Our approach is straightforward: scan the public Meta AI share page server-side,
              locate the embedded progressive MP4 URL, validate it against an allowlist of known
              Meta CDN hosts, and stream the file directly back to your browser. Nothing is
              stored, nothing is re-encoded, and nothing is added — including watermarks.
            </p>

            <h2 className="pt-4 text-2xl font-semibold">What You Get</h2>
            <ul className="space-y-3">
              {page.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <h2 className="pt-4 text-2xl font-semibold">How to Use This {capitalizeFirst(page.keyword)}</h2>
            <ol className="space-y-3">
              <li><strong>Open your Meta AI video.</strong> In the Meta AI app or website, tap the share icon on the video you want to keep.</li>
              <li><strong>Copy the share link.</strong> Use the "Copy link" option so the full public URL is on your clipboard.</li>
              <li><strong>Paste it above.</strong> Drop the URL into the downloader box at the top of this page.</li>
              <li><strong>Click Download.</strong> We resolve the underlying MP4 and stream it to your device — usually in seconds.</li>
            </ol>

            <h2 className="pt-4 text-2xl font-semibold">Quality, Speed, and Privacy</h2>
            <p>
              On quality: we always select the highest progressive variant available in the share
              page payload. On speed: the server-side parser streams the page HTML and stops the
              moment it finds the MP4 URL, so downloads typically start within one or two seconds.
              On privacy: we don't require an account, don't run third-party trackers on this page,
              and don't retain copies of any file you download.
            </p>
            <p>
              These properties matter most when you're using a {page.keyword} as part of a real
              workflow rather than a one-off curiosity. Creators, social media managers, and anyone
              with a steady stream of Meta AI generations to archive will feel the difference
              compared to ad-heavy general-purpose downloaders.
            </p>

            <h2 className="pt-4 text-2xl font-semibold">Common Use Cases</h2>
            <p>
              The most popular reasons people use this {page.keyword} include archiving personal
              Meta AI creations before the chat history rolls over, cross-posting reels to
              Instagram, TikTok, or YouTube Shorts without losing quality, importing AI footage
              into a desktop editor like CapCut, Premiere, or DaVinci Resolve, and keeping
              a permanent local library of generations you want to revisit later.
            </p>
            <p>
              Because the output is a standard H.264 MP4 with AAC audio in a clean container,
              there's no compatibility headache downstream. It plays in any browser, opens in
              any editor, and uploads cleanly to every major social platform that accepts video.
            </p>

            <h2 className="pt-4 text-2xl font-semibold">Tips for Best Results</h2>
            <p>
              Use the official share link rather than a copied URL bar — share links are designed
              to be publicly resolvable. If a link fails, the most common reasons are that the
              post has been set to private, the CDN URL has expired, or the share page format
              changed and our parser hasn't caught up yet. In the last case, try again in a few
              hours; we ship parser updates quickly when Meta AI rotates its HTML.
            </p>
            <p>
              When you plan to upload the downloaded video back to a Meta property (Instagram,
              Facebook, WhatsApp), keep in mind that those apps re-compress on upload. If you
              want the highest-quality cross-post, upload from a desktop browser rather than
              the mobile app whenever possible.
            </p>

            <h2 className="pt-4 text-2xl font-semibold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {page.faqs.map((f) => (
                <details key={f.q} className="rounded-xl border border-border bg-card p-4">
                  <summary className="cursor-pointer font-semibold text-foreground">{f.q}</summary>
                  <p className="mt-2 text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Related Pages</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {related.map((r) => (
                  <li key={r.slug}>
                    <a href={`/${r.slug}`} className="text-foreground hover:text-brand">
                      {r.title}
                    </a>
                  </li>
                ))}
              </ul>
              <Link
                to="/tools"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
              >
                Browse all tools <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Explore</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link to="/" className="text-foreground hover:text-brand">Home — main downloader</Link></li>
                <li><Link to="/faq" className="text-foreground hover:text-brand">FAQ — common questions</Link></li>
                <li><Link to="/blog" className="text-foreground hover:text-brand">Blog — guides &amp; tips</Link></li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Target Keywords</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {[page.keyword, ...page.related].map((k) => (
                  <span key={k} className="rounded-full bg-muted px-2.5 py-1 text-xs text-foreground">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Popular Downloads */}
      <section className="border-t border-border bg-muted/30 py-14">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold text-foreground">Popular Downloads</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Explore the full Meta AI downloader suite — each tool is tuned for a specific format.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((p) => (
              <a
                key={p.slug}
                href={`/${p.slug}`}
                className="rounded-xl border border-border bg-card p-4 text-sm font-medium text-foreground transition-colors hover:border-brand hover:text-brand"
              >
                {p.title}
              </a>
            ))}
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="bg-hero py-16 text-hero-foreground">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to Save Your Meta AI Video?</h2>
          <p className="mx-auto mt-3 max-w-xl text-hero-foreground/70">
            Scroll back up, paste your share link, and your HD MP4 is seconds away. Free, no signup, no watermark.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 font-semibold text-brand-foreground hover:opacity-90"
          >
            Open the main downloader <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export function buildSeoHead(page: SeoPage, url: string) {
  return {
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      { name: "keywords", content: [page.keyword, ...page.related].join(", ") },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: page.title },
      { name: "twitter:description", content: page.description },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Tools", item: "/tools" },
            { "@type": "ListItem", position: 3, name: page.h1, item: url },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: page.title,
          applicationCategory: "MultimediaApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }),
      },
    ],
  };
}

function capitalizeFirst(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
