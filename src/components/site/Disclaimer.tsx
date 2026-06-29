import { ShieldAlert } from "lucide-react";

export const DISCLAIMER_TEXT =
  "This tool is intended only for downloading content you own or have explicit permission to use. We do not host, store, or distribute any third-party copyrighted content. Users are solely responsible for ensuring they have the rights to any content they download.";

export function Disclaimer() {
  return (
    <section className="bg-background pt-4">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex gap-3 rounded-xl border border-border bg-card p-5">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
          <p className="text-sm text-muted-foreground">{DISCLAIMER_TEXT}</p>
        </div>
      </div>
    </section>
  );
}
