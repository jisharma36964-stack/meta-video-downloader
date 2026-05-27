import { createFileRoute } from "@tanstack/react-router";
import { SeoLanding, buildSeoHead } from "@/components/site/SeoLanding";
import { getTopSeoPage } from "@/lib/seo-top-pages";

const PAGE = getTopSeoPage("meta-ai-video-downloader-online-free")!;
const URL = "/meta-ai-video-downloader-online-free";

export const Route = createFileRoute("/meta-ai-video-downloader-online-free")({
  head: () => buildSeoHead(PAGE, URL),
  component: () => <SeoLanding page={PAGE} url={URL} />,
});
