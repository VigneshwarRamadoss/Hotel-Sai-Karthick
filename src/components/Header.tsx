import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { branches, navLinks, site } from "@/data/site";
import { ExternalAction } from "./ui-kit";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const primaryPhone = branches[0]?.phone ?? null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-border bg-ivory/95 backdrop-blur shadow-lift" : "bg-ivory/80 backdrop-blur-sm"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="shell flex h-16 items-center justify-between gap-4 md:h-20">
        <Link to="/" className="flex flex-col leading-none" aria-label={`${site.name} — home`}>
          <span className="font-display text-lg text-primary md:text-xl">Hotel Sai Karthik</span>
          <span className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.28em] text-leaf">
            Pure Vegetarian
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-semibold tracking-wide text-primary/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary underline decoration-gold decoration-2 underline-offset-8" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ExternalAction
            href={primaryPhone ? `tel:${primaryPhone}` : null}
            pendingLabel="Phone number to be confirmed"
          >
            <Phone className="size-4" strokeWidth={1.5} aria-hidden="true" />
            Call Now
          </ExternalAction>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ExternalAction
            href={primaryPhone ? `tel:${primaryPhone}` : null}
            pendingLabel="Phone number to be confirmed"
            className="size-11 px-0"
          >
            <Phone className="size-5" strokeWidth={1.5} aria-hidden="true" />
            <span className="sr-only">Call</span>
          </ExternalAction>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid size-11 place-items-center rounded-sm border border-primary/25 text-primary"
          >
            {open ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="lg:hidden">
          <nav aria-label="Mobile" className="border-t border-gold/20 bg-primary px-5 pb-8 pt-4">
            <ul className="divide-y divide-gold/15">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="flex min-h-14 items-center font-display text-xl text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-tamil text-sm text-primary-foreground/70">{site.nameTamil}</p>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
