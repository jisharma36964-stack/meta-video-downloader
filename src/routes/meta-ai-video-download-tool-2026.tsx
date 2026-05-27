import { createFileRoute } from "@tanstack/react-router";
import { SeoLanding, buildSeoHead } from "@/components/site/SeoLanding";
import { getTopSeoPage } from "@/lib/seo-top-pages";

const PAGE = getTopSeoPage("meta-ai-video-download-tool-2026")!;
const URL = "/meta-ai-video-download-tool-2026";

export const Route = createFileRoute("/meta-ai-video-download-tool-2026")({
  head: () => buildSeoHead(PAGE, URL),
  component: () => <SeoLanding page={PAGE} url={URL} />,
});
