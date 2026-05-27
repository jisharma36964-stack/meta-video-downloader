import { createFileRoute } from "@tanstack/react-router";
import { SeoLanding, buildSeoHead } from "@/components/site/SeoLanding";
import { getTopSeoPage } from "@/lib/seo-top-pages";

const SLUG = "meta-ai-reel-downloader-hd";
const URL = `/${SLUG}`;
const PAGE = getTopSeoPage(SLUG)!;

export const Route = createFileRoute(`/${SLUG}` as "/meta-ai-reel-downloader-hd")({
  head: () => buildSeoHead(PAGE, URL),
  component: () => <SeoLanding page={PAGE} url={URL} />,
});
