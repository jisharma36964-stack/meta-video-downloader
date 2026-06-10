import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { blogPosts } from "@/lib/blog-posts";

const URL = "/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Meta AI Downloader Blog — Guides & Tips" },
      {
        name: "description",
        content:
          "Guides, tips, and tutorials on downloading Meta AI videos, reels, shorts, and stories in HD. Learn how to save AI videos without a watermark.",
      },
      { property: "og:title", content: "Meta AI Downloader Blog — Guides & Tips" },
      {
        property: "og:description",
        content: "How-to guides for downloading Meta AI videos, reels, and shorts in HD.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Meta AI Downloader Blog — Guides & Tips" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Meta AI Downloader Blog",
          url: URL,
          blogPost: blogPosts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            datePublished: p.date,
            url: `/blog/${p.slug}`,
          })),
        }),
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <main>
      <section className="relative bg-hero pb-16 pt-28 text-hero-foreground sm:pt-32">
        <Header />
        <div className="mx-auto max-w-5xl px-6">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-hero-foreground/60">
            <Link to="/" className="hover:text-hero-foreground">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-hero-foreground/80">Blog</span>
          </nav>
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Meta AI Downloader Blog
          </h1>
          <p className="mt-5 max-w-2xl text-base text-hero-foreground/70 sm:text-lg">
            Guides and tips for saving Meta AI videos, reels, shorts, and stories in full HD —
            without watermarks or signups.
          </p>
        </div>
      </section>

      <section className="bg-background py-14">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col rounded-2xl border border-border bg-card p-6"
              >
                <div className="text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  · {post.readingTime}
                </div>
                <h2 className="mt-2 text-xl font-semibold text-foreground">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="hover:text-brand"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{post.description}</p>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="mt-4 text-sm font-medium text-brand hover:underline"
                >
                  Read article →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
