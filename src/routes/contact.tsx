import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MetaVideoDownloader" },
      { name: "description", content: "Get in touch with the MetaVideoDownloader team." },
      { property: "og:title", content: "Contact — MetaVideoDownloader" },
      { property: "og:description", content: "Questions, feedback, or takedown requests." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <main>
      <section className="relative bg-hero pb-20 pt-32 text-hero-foreground">
        <Header />
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Contact</h1>
          <p className="mt-4 text-hero-foreground/70">We'd love to hear from you.</p>
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-5">
            <Mail className="h-5 w-5 text-brand" />
            <a href="mailto:hello@metavideodownloader.app" className="text-foreground hover:underline">
              hello@metavideodownloader.app
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
