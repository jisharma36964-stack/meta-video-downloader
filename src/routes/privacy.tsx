import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — MetaVideoDownloader" },
      { name: "description", content: "How MetaVideoDownloader handles your data and downloads." },
      { property: "og:title", content: "Privacy Policy — MetaVideoDownloader" },
      { property: "og:description", content: "Our privacy practices in plain English." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <main>
      <section className="relative bg-hero pb-20 pt-32 text-hero-foreground">
        <Header />
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl space-y-5 px-6 text-foreground">
          <p><strong>No accounts.</strong> We don't ask you to sign up or sign in.</p>
          <p><strong>No video storage.</strong> When you submit a link, the file streams through our server to your browser. We do not retain a copy.</p>
          <p><strong>Minimal logs.</strong> Standard request logs (IP, timestamp, status) may be kept temporarily for abuse prevention and then discarded.</p>
          <p><strong>No third-party tracking.</strong> We don't run analytics or advertising trackers on this site.</p>
          <p>Questions? Reach out via the contact page.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
