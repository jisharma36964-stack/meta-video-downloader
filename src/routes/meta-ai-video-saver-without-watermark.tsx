import { createFileRoute } from "@tanstack/react-router";
import { SeoLanding, buildSeoHead } from "@/components/site/SeoLanding";
import { getTopSeoPage } from "@/lib/seo-top-pages";

const PAGE = getTopSeoPage("meta-ai-video-saver-without-watermark")!;
const URL = "/meta-ai-video-saver-without-watermark";

export const Route = createFileRoute("/meta-ai-video-saver-without-watermark")({
  head: () => buildSeoHead(PAGE, URL),
  component: () => <SeoLanding page={PAGE} url={URL} />,
});
