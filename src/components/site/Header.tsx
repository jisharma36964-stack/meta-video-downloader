import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Download, Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

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
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="hover:text-hero-foreground"
              activeProps={{ className: "text-hero-foreground font-medium" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-hero-foreground/90 hover:bg-hero-foreground/10 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="mx-4 rounded-2xl border border-hero-foreground/10 bg-hero p-2 text-hero-foreground shadow-lg md:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm text-hero-foreground/80 hover:bg-hero-foreground/10 hover:text-hero-foreground"
              activeProps={{ className: "text-hero-foreground font-medium" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
