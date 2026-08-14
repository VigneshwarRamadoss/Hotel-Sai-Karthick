import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin } from "lucide-react";
import { branches, site } from "@/data/site";
import { ExternalAction, Placeholder, VegMark } from "./ui-kit";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="shell py-14 md:py-20">
        <div className="max-w-md">
          <p className="font-display text-2xl text-gold">Hotel Sai Karthik</p>
          <p className="mt-2 font-tamil text-sm text-primary-foreground/70">{site.nameTamil}</p>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">{site.tagline}</p>
          <div className="mt-4">
            <VegMark label="100% Vegetarian kitchen" />
          </div>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {branches.map((b) => (
            <div key={b.slug}>
              <h2 className="font-display text-lg text-gold">{b.city}</h2>
              <address className="mt-3 space-y-1 text-sm not-italic text-primary-foreground/80">
                {b.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
              <p className="mt-3 text-sm text-primary-foreground/80">
                Hours: <Placeholder>pending confirmation</Placeholder>
              </p>
              <div className="mt-4">
                <ExternalAction
                  href={b.directionsUrl}
                  variant="onDark"
                  pendingLabel="Map link to be confirmed"
                >
                  <MapPin className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  Get Directions
                </ExternalAction>
              </div>
            </div>
          ))}

          <nav aria-label="Explore">
            <h2 className="font-display text-lg text-gold">Explore</h2>
            <ul className="mt-3 space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/menu" className="hover:text-gold">Menu</Link></li>
              <li><Link to="/about" className="hover:text-gold">Our Story</Link></li>
              <li><Link to="/gallery" className="hover:text-gold">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-gold">Locations</Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-lg text-gold">Connect</h2>
            <ul className="mt-3 space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <Instagram className="size-4" strokeWidth={1.5} aria-hidden="true" />
                Instagram <Placeholder>handle pending</Placeholder>
              </li>
              <li className="flex items-center gap-2">
                <Facebook className="size-4" strokeWidth={1.5} aria-hidden="true" />
                Facebook <Placeholder>handle pending</Placeholder>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-gold/20 pt-6 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            FSSAI Licence: <Placeholder>number pending, per branch</Placeholder>
          </p>
          <p>© {new Date().getFullYear()} Hotel Sai Karthik. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
