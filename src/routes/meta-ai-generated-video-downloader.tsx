import { createFileRoute } from "@tanstack/react-router";
import { SeoLanding, buildSeoHead } from "@/components/site/SeoLanding";
import { getTopSeoPage } from "@/lib/seo-top-pages";

const PAGE = getTopSeoPage("meta-ai-generated-video-downloader")!;
const URL = "/meta-ai-generated-video-downloader";

export const Route = createFileRoute("/meta-ai-generated-video-downloader")({
  head: () => buildSeoHead(PAGE, URL),
  component: () => <SeoLanding page={PAGE} url={URL} />,
});
