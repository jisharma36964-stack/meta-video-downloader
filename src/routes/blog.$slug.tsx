import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getBlogPost, blogPosts } from "@/lib/blog-posts";
import { getTopSeoPage } from "@/lib/seo-top-pages";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ params, loaderData }) => {
    const url = `/blog/${params.slug}`;
    const post = loaderData;
    return {
      meta: [
        { title: `${post?.title ?? "Article"} — MetaVideoDownloader Blog` },
        { name: "description", content: post?.description ?? "" },
        { name: "keywords", content: post?.keyword ?? "" },
        { property: "og:title", content: post?.title ?? "" },
        { property: "og:description", content: post?.description ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post?.title ?? "" },
        { name: "twitter:description", content: post?.description ?? "" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: post
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.title,
                description: post.description,
                datePublished: post.date,
                author: { "@type": "Organization", name: "MetaVideoDownloader" },
                mainEntityOfPage: url,
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                  { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
                  { "@type": "ListItem", position: 3, name: post.title, item: url },
                ],
              }),
            },
          ]
        : [],
    };
  },
  component: BlogArticle,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Article not found</h1>
        <Link to="/blog" className="mt-4 inline-block text-brand hover:underline">
          Back to blog
        </Link>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">This article didn't load</h1>
        <Link to="/blog" className="mt-4 inline-block text-brand hover:underline">
          Back to blog
        </Link>
      </div>
    </div>
  ),
});

function BlogArticle() {
  const post = Route.useLoaderData();
  const relatedPages = post.related
    .map((slug) => getTopSeoPage(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main>
      <section className="relative bg-hero pb-14 pt-28 text-hero-foreground sm:pt-32">
        <Header />
        <div className="mx-auto max-w-3xl px-6">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-hero-foreground/60">
            <Link to="/" className="hover:text-hero-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-hero-foreground">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-hero-foreground/80">{post.title}</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
          <div className="mt-4 text-sm text-hero-foreground/60">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {post.readingTime}
          </div>
        </div>
      </section>

      <section className="bg-background py-14">
        <div className="mx-auto max-w-3xl space-y-8 px-6 text-foreground leading-relaxed">
          {post.body.map((section) => (
            <div key={section.heading} className="space-y-4">
              <h2 className="text-2xl font-semibold">{section.heading}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ))}

          {relatedPages.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">Related downloaders</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {relatedPages.map((p) => (
                  <li key={p.slug}>
                    <a href={`/${p.slug}`} className="text-brand hover:underline">
                      {p.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-2xl bg-hero p-6 text-center text-hero-foreground">
            <h2 className="text-xl font-bold">Ready to save a Meta AI video?</h2>
            <p className="mx-auto mt-2 max-w-md text-hero-foreground/70">
              Paste your share link into the main downloader and get a clean HD MP4 in seconds.
            </p>
            <Link
              to="/"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 font-semibold text-brand-foreground hover:opacity-90"
            >
              Open the downloader <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {otherPosts.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold">More from the blog</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {otherPosts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      className="text-brand hover:underline"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
