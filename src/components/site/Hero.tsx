import { DownloaderCard } from "./DownloaderCard";
import { Header } from "./Header";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero pb-24 pt-28 text-hero-foreground sm:pb-32 sm:pt-32">
      <Header />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, oklch(0.55 0.22 264 / 0.35) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Download Meta AI Video
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-hero-foreground/70 sm:text-lg">
          Save your own Meta AI generated videos as HD MP4 files. Paste the share link below and we'll handle the rest — fast, free, no watermark.
        </p>
        <div className="mt-10">
          <DownloaderCard />
        </div>
      </div>
    </section>
  );
}
