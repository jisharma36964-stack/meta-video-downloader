import { Link } from "@tanstack/react-router";
import { topSeoPages } from "@/lib/seo-top-pages";
import { DISCLAIMER_TEXT } from "@/components/site/Disclaimer";

export function Footer() {
  const popular = topSeoPages;
  return (
    <footer className="bg-hero text-hero-foreground">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="text-lg font-semibold">MetaVideoDownloader</div>
            <p className="mt-2 max-w-xs text-sm text-hero-foreground/70">
              Free online tool to save your Meta AI generated videos as HD MP4 files.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold">Product</div>
            <ul className="mt-3 space-y-2 text-sm text-hero-foreground/70">
              <li><Link to="/" className="hover:text-hero-foreground">Home</Link></li>
              <li><Link to="/tools" className="hover:text-hero-foreground">All tools</Link></li>
              <li><Link to="/blog" className="hover:text-hero-foreground">Blog</Link></li>
              <li><Link to="/faq" className="hover:text-hero-foreground">FAQ</Link></li>
              <li><a href="/#how" className="hover:text-hero-foreground">How it works</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold">Popular</div>
            <ul className="mt-3 space-y-2 text-sm text-hero-foreground/70">
              {popular.map((p) => (
                <li key={p.slug}>
                  <a href={`/${p.slug}`} className="hover:text-hero-foreground">
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold">Company</div>
            <ul className="mt-3 space-y-2 text-sm text-hero-foreground/70">
              <li><Link to="/about" className="hover:text-hero-foreground">About</Link></li>
              <li><Link to="/contact" className="hover:text-hero-foreground">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-hero-foreground">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-hero-foreground">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-hero-foreground/10 pt-6 text-xs text-hero-foreground/60">
          © {new Date().getFullYear()} MetaVideoDownloader. Not affiliated with Meta Platforms, Inc.
        </div>
      </div>
    </footer>
  );
}
