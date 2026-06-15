import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Mail, Clock, LifeBuoy, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact MetaVideoDownloader — Support & Takedowns" },
      {
        name: "description",
        content:
          "Contact the MetaVideoDownloader team for support, feedback, partnership questions, or copyright takedown requests. We typically reply within 2 business days.",
      },
      { property: "og:title", content: "Contact MetaVideoDownloader" },
      {
        property: "og:description",
        content: "Support, feedback, and copyright takedown requests. We typically reply within 2 business days.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const topics = [
  {
    icon: LifeBuoy,
    title: "Help & support",
    body: "A link won't download, the file looks wrong, or something's broken? Tell us what you pasted and what happened.",
  },
  {
    icon: ShieldAlert,
    title: "Copyright & takedowns",
    body: "Rights holders can request removal or report misuse. Include the content details and proof of ownership so we can act quickly.",
  },
  {
    icon: Mail,
    title: "Feedback & ideas",
    body: "Feature requests, bug reports, and general feedback are always welcome — they genuinely shape the roadmap.",
  },
];

function Contact() {
  return (
    <main>
      <section className="relative bg-hero pb-20 pt-32 text-hero-foreground">
        <Header />
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Contact us</h1>
          <p className="mt-4 max-w-2xl text-hero-foreground/70">
            Questions, feedback, partnership ideas, or a copyright takedown request — we'd love to hear
            from you and read every message.
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-4xl gap-10 px-6 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">What can we help with?</h2>
            <div className="space-y-4">
              {topics.map((t) => (
                <div key={t.title} className="flex gap-4 rounded-xl border border-border bg-card p-5">
                  <t.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                  <div>
                    <h3 className="font-semibold text-foreground">{t.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{t.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
              <Clock className="h-5 w-5 shrink-0 text-brand" aria-hidden />
              We typically reply within 2 business days.
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-2xl font-semibold text-foreground">Email us</h2>
            <p className="text-sm text-muted-foreground">
              Reach the team directly at the address below. For copyright takedowns, please include the
              specific video, the URL involved, and evidence that you own or represent the rights.
            </p>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-brand" aria-hidden />
                <a
                  href="mailto:hello@metavideodownloader.app"
                  className="font-medium text-foreground hover:underline"
                >
                  hello@metavideodownloader.app
                </a>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <ShieldAlert className="h-5 w-5 text-brand" aria-hidden />
                <a
                  href="mailto:legal@metavideodownloader.app"
                  className="font-medium text-foreground hover:underline"
                >
                  legal@metavideodownloader.app
                </a>
                <span className="text-xs text-muted-foreground">(copyright &amp; legal)</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Looking for quick answers first? Many common questions are covered on our{" "}
              <Link to="/faq" className="text-primary underline underline-offset-2">
                FAQ page
              </Link>
              . You can also review our{" "}
              <Link to="/privacy" className="text-primary underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link to="/terms" className="text-primary underline underline-offset-2">
                Terms of Use
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
