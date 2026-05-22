import { Link } from "@tanstack/react-router";
import { Download } from "lucide-react";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2 text-hero-foreground">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground">
            <Download className="h-4 w-4" />
          </span>
          <span className="text-base font-semibold">MetaVideoDownloader</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-hero-foreground/80 md:flex">
          <Link to="/" className="hover:text-hero-foreground">Home</Link>
          <a href="/#how" className="hover:text-hero-foreground">How it works</a>
          <a href="/#faq" className="hover:text-hero-foreground">FAQ</a>
          <Link to="/about" className="hover:text-hero-foreground">About</Link>
        </nav>
      </div>
    </header>
  );
}
