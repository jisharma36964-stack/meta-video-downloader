import { Zap, Video, Lock } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Easy Link Downloader",
    body: "Meta AI lets you create short videos with artificial intelligence. MetaVideoDownloader saves your own AI-generated videos by link as standard MP4 files — just paste the URL.",
  },
  {
    icon: Video,
    title: "HD MP4 & Audio",
    body: "We deliver files in crystal-clear quality and automatically synchronize the visual and audio tracks so your clip plays perfectly anywhere.",
  },
  {
    icon: Lock,
    title: "No Watermark",
    body: "Get a clean video without watermark. Perfect for creators who want a polished, branding-free file ready for editing or sharing.",
  },
];

export function Features() {
  return (
    <section className="bg-section-muted py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Why Use Our Meta AI Saver
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
