import { Check } from "lucide-react";

const uses = [
  "Transform clips into Reels or TikToks (no watermark, no friction).",
  "Use downloaded AI footage as B-roll in larger video projects.",
  "Keep AI-generated drafts locally to track your prompt history.",
  "Store results securely on your hard drive before chat links expire.",
  "Share files with clients who can't access the Meta AI interface.",
  "Build a personal portfolio from your own creations.",
];

export function UseCases() {
  return (
    <section className="bg-section-muted py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ways to Use Your Downloads
        </h2>
        <p className="mt-4 text-muted-foreground">
          Once you export your video files, you can use them across your digital life:
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {uses.map((u) => (
            <li key={u} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <span className="text-sm text-foreground">{u}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
