import { useEffect, useRef } from "react";

/**
 * Reusable Google AdSense ad slot.
 *
 * Usage:
 *   <AdSlot slot="1234567890" format="auto" />
 *
 * Set your AdSense client ID once via VITE_ADSENSE_CLIENT (e.g. "ca-pub-XXXXXXXX")
 * in your environment, or hardcode below.
 */
const ADSENSE_CLIENT =
  (import.meta.env.VITE_ADSENSE_CLIENT as string | undefined) ?? "";

type AdSlotProps = {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  layout?: string;
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({
  slot,
  format = "auto",
  layout,
  responsive = true,
  className,
  style,
}: AdSlotProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      // AdSense not yet loaded; safe to ignore
      console.warn("AdSense push failed:", e);
    }
  }, []);

  // Render a neutral placeholder if no client ID configured so layout doesn't break
  if (!ADSENSE_CLIENT) {
    return (
      <div
        className={`mx-auto my-6 flex h-[90px] w-full max-w-3xl items-center justify-center rounded-md border border-dashed border-border bg-muted/30 text-xs text-muted-foreground ${className ?? ""}`}
        aria-hidden="true"
      >
        Ad slot ({slot}) — set VITE_ADSENSE_CLIENT to enable
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle block ${className ?? ""}`}
      style={{ display: "block", ...style }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-ad-layout={layout}
      data-full-width-responsive={responsive ? "true" : "false"}
    />
  );
}
