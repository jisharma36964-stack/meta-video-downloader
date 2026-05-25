import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
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
      <Features />
      <HowItWorks />
      <UseCases />
      <Faq />
      <Footer />
    </main>
  );
}
