import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { topSeoPages } from "@/lib/seo-top-pages";

const URL = "/faq";

const faqs = [
  {
    q: "How do I download a Meta AI video by link?",
    a: "Copy the video URL from the Meta AI chat using the official 'Copy link' option, paste it into the downloader, and click Download. We fetch the underlying MP4 and stream it to your device.",
  },
  {
    q: "Is the Meta AI video downloader free?",
    a: "Yes. Every download is free with no subscription, credits, or signup. There are no daily download limits for normal use.",
  },
  {
    q: "Will downloaded videos have a watermark?",
    a: "No. We stream the original Meta AI MP4 without adding any overlay, branding, or re-encoding, so the file is exactly what Meta AI generated.",
  },
  {
    q: "Does it work on iPhone and Android?",
    a: "Yes. The downloader runs entirely in your browser and saves directly to your device's gallery or downloads folder on both iOS and Android.",
  },
  {
    q: "Can I download Meta AI reels, shorts, and stories too?",
    a: "Yes. We have dedicated tools for reels, shorts, stories, clips, and HD videos. Each preserves the original vertical or landscape frame without cropping.",
  },
  {
    q: "What format and quality will I get?",
    a: "A standard H.264/AAC MP4 at the highest resolution exposed on the share page — typically up to 1080p — compatible with every editor and social platform.",
  },
  {
    q: "Do you store my videos?",
    a: "No. Files stream through our server only to deliver them to your device. Nothing is retained, and there is no account or tracking on the download page.",
  },
  {
    q: "Why did my download fail?",
    a: "The link is usually private, expired, or copied incorrectly. Re-copy it with 'Copy link' and retry. If Meta changed its share-page format, try again later — we patch the parser quickly.",
  },
  {
    q: "Is it legal to save Meta AI videos?",
    a: "Only download videos you generated yourself or have permission to use, and always respect copyright and Meta AI's terms of service.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Meta AI Video Downloader Questions" },
      {
        name: "description",
        content:
          "Answers to common questions about downloading Meta AI videos, reels, and shorts — quality, watermarks, mobile support, privacy, and troubleshooting.",
      },
      { property: "og:title", content: "FAQ — Meta AI Video Downloader" },
      {
        property: "og:description",
        content: "Common questions about downloading Meta AI videos answered.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "FAQ — Meta AI Video Downloader" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
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
            { "@type": "ListItem", position: 2, name: "FAQ", item: URL },
          ],
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const popular = topSeoPages.slice(0, 6);
  return (
    <main>
      <section className="relative bg-hero pb-16 pt-28 text-hero-foreground sm:pt-32">
        <Header />
        <div className="mx-auto max-w-3xl px-6">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-hero-foreground/60">
            <Link to="/" className="hover:text-hero-foreground">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-hero-foreground/80">FAQ</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-5 max-w-2xl text-base text-hero-foreground/70 sm:text-lg">
            Everything you need to know about downloading Meta AI videos, reels, shorts, and
            stories in HD — free, fast, and watermark-free.
          </p>
        </div>
      </section>

      <section className="bg-background py-14">
        <div className="mx-auto max-w-3xl px-6">
          <Accordion type="single" collapsible>
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">Popular downloaders</h2>
            <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              {popular.map((p) => (
                <li key={p.slug}>
                  <a href={`/${p.slug}`} className="text-brand hover:underline">
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
            <Link to="/blog" className="mt-4 inline-block text-sm font-medium text-brand hover:underline">
              Read our guides on the blog →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
