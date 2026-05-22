import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — MetaVideoDownloader" },
      { name: "description", content: "Terms governing use of MetaVideoDownloader." },
      { property: "og:title", content: "Terms of Use — MetaVideoDownloader" },
      { property: "og:description", content: "Use MetaVideoDownloader responsibly and legally." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <main>
      <section className="relative bg-hero pb-20 pt-32 text-hero-foreground">
        <Header />
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Terms of Use</h1>
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl space-y-5 px-6 text-foreground">
          <p>By using MetaVideoDownloader you agree to download only videos you created yourself or have explicit permission to use.</p>
          <p>The service is provided "as is" with no guarantees of availability or compatibility with any given URL. Meta AI links may expire, be private, or change format without notice.</p>
          <p>We are not affiliated with Meta Platforms, Inc. All trademarks belong to their respective owners.</p>
          <p>Don't use this service to violate any law or third-party rights.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
