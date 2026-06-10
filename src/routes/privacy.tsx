import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — MetaVideoDownloader" },
      { name: "description", content: "How MetaVideoDownloader handles your data and downloads." },
      { property: "og:title", content: "Privacy Policy — MetaVideoDownloader" },
      { property: "og:description", content: "Our privacy practices in plain English." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <main>
      <section className="relative bg-hero pb-20 pt-32 text-hero-foreground">
        <Header />
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl space-y-5 px-6 text-foreground">
          <p className="text-sm text-muted-foreground">Last updated: June 10, 2026</p>

          <p><strong>No accounts.</strong> We don't ask you to sign up or sign in.</p>
          <p><strong>No video storage.</strong> When you submit a link, the file streams through our server to your browser. We do not retain a copy.</p>
          <p><strong>Minimal logs.</strong> Standard request logs (IP, timestamp, status) may be kept temporarily for abuse prevention and then discarded.</p>

          <h2 className="pt-4 text-2xl font-semibold">Cookies and advertising</h2>
          <p>
            This site displays advertising served by Google AdSense. Third-party vendors,
            including Google, use cookies to serve ads based on your prior visits to this
            website and other websites.
          </p>
          <p>
            Google's use of advertising cookies enables it and its partners to serve ads to
            you based on your visit to this site and/or other sites on the internet. You may
            opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              Google Ads Settings
            </a>
            . You can also opt out of third-party vendor cookies for personalized advertising
            at{" "}
            <a
              href="https://www.aboutads.info/choices"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              www.aboutads.info
            </a>
            .
          </p>
          <p>
            For more information on how Google uses data when you use our partners' sites or
            apps, see{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              Google's policy
            </a>
            .
          </p>

          <h2 className="pt-4 text-2xl font-semibold">Analytics</h2>
          <p>
            We use privacy-friendly analytics to understand aggregate, anonymized traffic
            patterns. This data is not used to personally identify you.
          </p>

          <h2 className="pt-4 text-2xl font-semibold">Your choices</h2>
          <p>
            You can manage or disable cookies through your browser settings at any time.
            Disabling cookies may affect the ads you see but will not prevent you from using
            the site.
          </p>

          <h2 className="pt-4 text-2xl font-semibold">Children's privacy</h2>
          <p>
            This site is not directed to children under 13, and we do not knowingly collect
            personal information from children.
          </p>

          <p className="pt-4">Questions? Reach out via the contact page.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
