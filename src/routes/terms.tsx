import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — MetaVideoDownloader" },
      {
        name: "description",
        content:
          "The terms governing use of MetaVideoDownloader, including acceptable use, copyright and DMCA policy, disclaimers, and limitations of liability.",
      },
      { property: "og:title", content: "Terms of Use — MetaVideoDownloader" },
      { property: "og:description", content: "Acceptable use, copyright/DMCA policy, and disclaimers." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <main>
      <section className="relative bg-hero pb-20 pt-32 text-hero-foreground">
        <Header />
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Terms of Use</h1>
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl space-y-5 px-6 leading-relaxed text-foreground">
          <p className="text-sm text-muted-foreground">Last updated: June 15, 2026</p>

          <p>
            By accessing or using MetaVideoDownloader ("the Service"), you agree to these Terms of Use.
            If you do not agree, please do not use the Service.
          </p>

          <h2 className="pt-4 text-2xl font-semibold">Acceptable use</h2>
          <p>
            You agree to use the Service only to download videos that you created yourself or that you
            have explicit permission to download and use. You must not use the Service to copy,
            distribute, sell, or otherwise exploit content that belongs to a third party without
            authorization, or in any way that infringes intellectual property rights, violates privacy
            rights, or breaks any applicable law.
          </p>
          <p>
            You also agree not to abuse the Service — for example by attempting to overload it, bypass
            rate limits, scrape it programmatically at scale, or interfere with its normal operation.
          </p>

          <h2 className="pt-4 text-2xl font-semibold">Copyright &amp; DMCA policy</h2>
          <p>
            We respect the intellectual property of others and expect our users to do the same.
            MetaVideoDownloader does not host, store, or maintain a library of any user content; the
            Service simply forwards a publicly accessible file to your device at your request.
          </p>
          <p>
            If you are a copyright owner (or authorized to act on behalf of one) and believe that the
            Service has been used to infringe your rights, please send a notice to{" "}
            <a
              href="mailto:legal@metavideodownloader.app"
              className="text-primary underline underline-offset-2"
            >
              legal@metavideodownloader.app
            </a>{" "}
            that includes: (1) identification of the copyrighted work; (2) the specific URL or content
            involved; (3) your contact information; (4) a statement that you have a good-faith belief the
            use is not authorized; and (5) a statement, under penalty of perjury, that the information is
            accurate and that you are the owner or authorized to act on the owner's behalf. We respond to
            valid notices promptly. See our{" "}
            <Link to="/contact" className="text-primary underline underline-offset-2">
              contact page
            </Link>{" "}
            for more.
          </p>

          <h2 className="pt-4 text-2xl font-semibold">No affiliation with Meta</h2>
          <p>
            We are not affiliated with, endorsed by, or sponsored by Meta Platforms, Inc. All
            trademarks, including "Meta" and "Meta AI," belong to their respective owners and are used
            only descriptively.
          </p>

          <h2 className="pt-4 text-2xl font-semibold">Service provided "as is"</h2>
          <p>
            The Service is provided "as is" and "as available," without warranties of any kind, whether
            express or implied. We do not guarantee that any given link will resolve, that downloads will
            succeed, or that the Service will be available without interruption. Meta AI links may
            expire, be set to private, or change format without notice, and downloads may fail as a
            result.
          </p>

          <h2 className="pt-4 text-2xl font-semibold">Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, MetaVideoDownloader and its operators will not be
            liable for any indirect, incidental, or consequential damages arising from your use of, or
            inability to use, the Service. You use the Service at your own risk and are solely
            responsible for ensuring your use complies with all applicable laws and third-party rights.
          </p>

          <h2 className="pt-4 text-2xl font-semibold">Advertising</h2>
          <p>
            The Service may display third-party advertising, including Google AdSense. Your interactions
            with advertisers are solely between you and the advertiser. See our{" "}
            <Link to="/privacy" className="text-primary underline underline-offset-2">
              Privacy Policy
            </Link>{" "}
            for how advertising cookies are used and how to opt out.
          </p>

          <h2 className="pt-4 text-2xl font-semibold">Changes to these terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the Service after changes take
            effect constitutes acceptance of the revised Terms.
          </p>

          <p className="pt-4">
            Questions about these Terms? Reach us via the{" "}
            <Link to="/contact" className="text-primary underline underline-offset-2">
              contact page
            </Link>
            .
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
