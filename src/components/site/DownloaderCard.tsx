import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { downloadSchema } from "@/lib/download-schema";
import { CheckCircle2, Download, Loader2, RefreshCw, ShieldCheck, AlertTriangle } from "lucide-react";

type State =
  | { kind: "idle" }
  | { kind: "analyzing" }
  | { kind: "downloading"; received: number; total: number | null }
  | { kind: "success"; blobUrl: string; sizeMb: string }
  | { kind: "error"; message: string };

export function DownloaderCard() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  async function startDownload(e: React.FormEvent) {
    e.preventDefault();
    const parsed = downloadSchema.safeParse({ url });
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Invalid link.";
      toast.error(msg);
      return;
    }

    setState({ kind: "analyzing" });
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: parsed.data.url }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        const msg = data.error ?? `Download failed (${res.status}).`;
        setState({ kind: "error", message: msg });
        toast.error(msg);
        return;
      }

      const total = Number(res.headers.get("content-length")) || null;
      const reader = res.body!.getReader();
      const chunks: Uint8Array[] = [];
      let received = 0;
      setState({ kind: "downloading", received: 0, total });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        received += value.byteLength;
        setState({ kind: "downloading", received, total });
      }

      const blob = new Blob(chunks, { type: "video/mp4" });
      const blobUrl = URL.createObjectURL(blob);
      setState({
        kind: "success",
        blobUrl,
        sizeMb: (blob.size / (1024 * 1024)).toFixed(1),
      });
    } catch (err) {
      console.error(err);
      const msg = "Something went wrong. Please try again.";
      setState({ kind: "error", message: msg });
      toast.error(msg);
    }
  }

  function reset() {
    if (state.kind === "success") URL.revokeObjectURL(state.blobUrl);
    setUrl("");
    setState({ kind: "idle" });
  }

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl bg-card p-6 text-card-foreground shadow-2xl shadow-black/20 ring-1 ring-black/5 sm:p-8">
      {state.kind === "idle" && (
        <form onSubmit={startDownload} className="space-y-4">
          <label htmlFor="video-url" className="block text-sm font-medium text-foreground">
            Paste the Meta AI video link
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              id="video-url"
              type="url"
              inputMode="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="h-12 flex-1 text-base"
              autoComplete="off"
            />
            <Button
              type="submit"
              size="lg"
              className="h-12 bg-brand px-6 text-brand-foreground hover:bg-brand/90"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 pt-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-brand" /> Secure</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-brand" /> Virus free</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-brand" /> No watermark</span>
          </div>
        </form>
      )}

      {state.kind === "analyzing" && (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
          <h3 className="text-lg font-semibold">Processing link</h3>
          <p className="text-sm text-muted-foreground">Analyzing your video link...</p>
        </div>
      )}

      {state.kind === "downloading" && (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
          <h3 className="text-lg font-semibold">Downloading</h3>
          <p className="text-sm text-muted-foreground">
            {(state.received / (1024 * 1024)).toFixed(1)} MB
            {state.total ? ` of ${(state.total / (1024 * 1024)).toFixed(1)} MB` : ""}
          </p>
          {state.total && (
            <div className="h-2 w-full max-w-md overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-brand transition-all"
                style={{ width: `${Math.min(100, (state.received / state.total) * 100)}%` }}
              />
            </div>
          )}
        </div>
      )}

      {state.kind === "success" && (
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">
            <CheckCircle2 className="h-6 w-6 text-brand" />
          </span>
          <div>
            <h3 className="text-lg font-semibold">Processing Complete</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Your HD MP4 file ({state.sizeMb} MB) is ready.
            </p>
          </div>
          <a
            href={state.blobUrl}
            download="meta-ai-video.mp4"
            className="inline-flex h-11 items-center justify-center rounded-md bg-brand px-6 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90"
          >
            <Download className="mr-2 h-4 w-4" />
            Save MP4
          </a>
          <button onClick={reset} className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Download another video
          </button>
        </div>
      )}

      {state.kind === "error" && (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </span>
          <h3 className="text-lg font-semibold">Download failed</h3>
          <p className="max-w-md text-sm text-muted-foreground">{state.message}</p>
          <Button variant="outline" onClick={reset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try another link
          </Button>
        </div>
      )}
    </div>
  );
}
