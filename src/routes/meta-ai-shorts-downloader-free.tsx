import { createFileRoute } from "@tanstack/react-router";
import { SeoLanding, buildSeoHead } from "@/components/site/SeoLanding";
import { getTopSeoPage } from "@/lib/seo-top-pages";

const PAGE = getTopSeoPage("meta-ai-shorts-downloader-free")!;
const URL = "/meta-ai-shorts-downloader-free";

export const Route = createFileRoute("/meta-ai-shorts-downloader-free")({
  head: () => buildSeoHead(PAGE, URL),
  component: () => <SeoLanding page={PAGE} url={URL} />,
});
