import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ShieldCheck, Zap, Lock, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About MetaVideoDownloader — Our Mission & Story" },
      {
        name: "description",
        content:
          "Learn who builds MetaVideoDownloader, why we created a free Meta AI video saver, how the tool works, and our commitment to privacy and responsible use.",
      },
      { property: "og:title", content: "About MetaVideoDownloader" },
      {
        property: "og:description",
        content: "Our mission, how the tool works, and our commitment to privacy and responsible use.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const values = [
  {
    icon: Zap,
    title: "Simple by design",
    body: "One paste, one click. No accounts, no installs, no confusing settings — saving your own video should take seconds.",
  },
  {
    icon: Lock,
    title: "Privacy first",
    body: "We never store the videos you download. Files stream through our server only long enough to reach your device, then they're gone.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible use",
    body: "We built this for people saving their own creations. We respect intellectual property and act quickly on valid takedown requests.",
  },
  {
    icon: Users,
    title: "Made for creators",
    body: "From hobbyists to social media managers, our users want to own and reuse the AI videos they generate — so that's what we optimize for.",
  },
];

function About() {
  return (
    <main>
      <section className="relative bg-hero pb-20 pt-32 text-hero-foreground">
        <Header />
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About MetaVideoDownloader</h1>
          <p className="mt-5 max-w-2xl text-hero-foreground/70">
            MetaVideoDownloader is a free, independent tool that helps creators keep ownership of the
            videos they generate with Meta AI — saved locally, in HD, and without a watermark.
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-6 leading-relaxed text-foreground">
          <h2 className="text-2xl font-semibold">Why we built this</h2>
          <p>
            Meta AI makes it remarkably easy to turn a text prompt into a short video. The problem is
            what happens next: those videos live inside the chat thread, and they're easy to lose when
            a session expires, a device is wiped, or the conversation history rolls over. We kept
            hearing the same frustration from creators — "I made something I love, but I can't get it
            out." MetaVideoDownloader exists to solve exactly that.
          </p>
          <p>
            Our goal was a tool that does one thing well. You paste a public Meta AI share link, and we
            return the original MP4 to your device in seconds. No subscription, no browser extension, no
            five-step funnel designed to keep you on the page longer than necessary.
          </p>

          <h2 className="pt-4 text-2xl font-semibold">How the tool works</h2>
          <p>
            When you submit a share link, our server fetches the public share page, locates the
            embedded progressive MP4 URL, validates it against an allowlist of known Meta content
            delivery hosts, and streams that file straight back to your browser. Nothing is re-encoded,
            nothing is added, and nothing is retained afterward. Because we pass the original file
            through untouched, what you download is identical in quality to what Meta AI generated.
          </p>
          <p>
            This approach also means the tool only ever works with content that is already publicly
            shareable. We cannot access private chats, drafts, or anything behind a login — by design.
          </p>

          <h2 className="pt-4 text-2xl font-semibold">What we stand for</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-5">
                <v.icon className="h-6 w-6 text-brand" aria-hidden />
                <h3 className="mt-3 text-lg font-semibold">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>

          <h2 className="pt-4 text-2xl font-semibold">Responsible & legal use</h2>
          <p>
            MetaVideoDownloader is intended for downloading videos you created yourself or have explicit
            permission to use. We do not condone using the tool to copy, redistribute, or monetize
            content that belongs to someone else. If you believe content has been downloaded in a way
            that infringes your rights, our{" "}
            <Link to="/contact" className="text-primary underline underline-offset-2">
              contact page
            </Link>{" "}
            explains how to submit a takedown request, and our{" "}
            <Link to="/terms" className="text-primary underline underline-offset-2">
              Terms of Use
            </Link>{" "}
            spell out the acceptable-use rules in full.
          </p>

          <h2 className="pt-4 text-2xl font-semibold">Independence</h2>
          <p>
            We are an independent project and are not affiliated with, endorsed by, or sponsored by
            Meta Platforms, Inc. "Meta AI" and related marks belong to their respective owners and are
            used here only to describe the content our tool helps you save.
          </p>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold">Have a question?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Read our{" "}
              <Link to="/faq" className="text-primary underline underline-offset-2">
                FAQ
              </Link>{" "}
              for quick answers, or{" "}
              <Link to="/contact" className="text-primary underline underline-offset-2">
                get in touch
              </Link>{" "}
              — we read every message.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
