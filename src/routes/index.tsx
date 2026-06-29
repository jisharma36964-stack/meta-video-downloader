import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Disclaimer } from "@/components/site/Disclaimer";
import { Overview } from "@/components/site/Overview";
import { Features } from "@/components/site/Features";
import { HowItWorks } from "@/components/site/HowItWorks";
import { UseCases } from "@/components/site/UseCases";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { AdSlot } from "@/components/site/AdSlot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MetaVideoDownloader — Download Meta AI Videos as HD MP4" },
      {
        name: "description",
        content:
          "Free online tool to download Meta AI generated videos as HD MP4. No watermark, no signup. Paste the link and save your AI videos instantly.",
      },
      { property: "og:title", content: "MetaVideoDownloader — Download Meta AI Videos" },
      {
        property: "og:description",
        content: "Save your Meta AI videos as HD MP4 files. Free, fast, no watermark.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Hero />
      <Disclaimer />
      <div className="mx-auto max-w-5xl px-6">
        <AdSlot slot="1111111111" format="auto" />
      </div>
      <Overview />
      <Features />
      <HowItWorks />

      <div className="mx-auto max-w-5xl px-6">
        <AdSlot slot="2222222222" format="auto" />
      </div>
      <UseCases />
      <Faq />
      <div className="mx-auto max-w-5xl px-6">
        <AdSlot slot="3333333333" format="auto" />
      </div>
      <Footer />
    </main>
  );
}
