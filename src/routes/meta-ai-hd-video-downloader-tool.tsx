import { createFileRoute } from "@tanstack/react-router";
import { SeoLanding, buildSeoHead } from "@/components/site/SeoLanding";
import { getTopSeoPage } from "@/lib/seo-top-pages";

const PAGE = getTopSeoPage("meta-ai-hd-video-downloader-tool")!;
const URL = "/meta-ai-hd-video-downloader-tool";

export const Route = createFileRoute("/meta-ai-hd-video-downloader-tool")({
  head: () => buildSeoHead(PAGE, URL),
  component: () => <SeoLanding page={PAGE} url={URL} />,
});
