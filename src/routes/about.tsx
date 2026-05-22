import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — MetaVideoDownloader" },
      { name: "description", content: "About MetaVideoDownloader, a free tool for saving Meta AI generated videos." },
      { property: "og:title", content: "About — MetaVideoDownloader" },
      { property: "og:description", content: "Why we built a simple, free downloader for Meta AI videos." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <main>
      <section className="relative bg-hero pb-20 pt-32 text-hero-foreground">
        <Header />
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About</h1>
          <p className="mt-5 text-hero-foreground/70">
            MetaVideoDownloader is a free, no-signup tool that helps creators save the videos they generate with Meta AI as standard MP4 files.
          </p>
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-6 text-foreground">
          <p>
            Meta AI lets you spin up short videos from a prompt, but the files live inside the chat
            and are easy to lose when sessions expire. We built MetaVideoDownloader so you can keep
            ownership of your own creations — locally, in HD, and watermark-free.
          </p>
          <p>
            We don't store your videos. Files stream through our server only long enough to reach
            your device. We are not affiliated with Meta Platforms, Inc.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
