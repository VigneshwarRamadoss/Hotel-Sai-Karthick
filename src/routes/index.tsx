import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { KolamDivider, ParallaxLayer, Reveal } from "@/components/motion";
import {
  ButtonLink,
  ExternalAction,
  Placeholder,
  PremiumCard,
  SectionHeading,
  VegMark,
} from "@/components/ui-kit";
import { branches, site } from "@/data/site";
import { signatureDishes } from "@/data/menu";
import heroImg from "@/assets/hero-tiffin.jpg";
import coffeeImg from "@/assets/filter-coffee.jpg";
import gheeRoastImg from "@/assets/ghee-roast.jpg";
import pongalImg from "@/assets/pongal.jpg";
import mealsImg from "@/assets/meals.jpg";
import interiorImg from "@/assets/interior.jpg";

const title = "Hotel Sai Karthik — Pure Vegetarian South Indian Tiffin House";
const description =
  "Breakfast tiffin, full South Indian meals and evening tiffin in Pattukkottai and Trichy. Ghee roast, ghee pongal, idiyappam and filter coffee, served the way they always have been.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Hotel Sai Karthik",
          servesCuisine: "South Indian",
          description,
          url: "/",
          priceRange: "₹₹",
          servesVegetarianFood: true,
          areaServed: ["Pattukkottai", "Tiruchirappalli"],
          hasMenu: "/menu",
        }),
      },
    ],
  }),
  component: HomePage,
});

const dishImages: Record<string, string> = {
  "ghee-roast": gheeRoastImg,
  "ghee-pongal": pongalImg,
  "filter-coffee": coffeeImg,
  "special-meals": mealsImg,
};

function HomePage() {
  return (
    <SiteLayout>
      {/* ---------- Hero: layered parallax ---------- */}
      <section className="relative isolate flex min-h-[86vh] items-end overflow-hidden bg-primary">
        <ParallaxLayer speed={0.35} className="absolute inset-0 -z-20 scale-110">
          <img
            src={heroImg}
            alt="Idli, ghee roast dosa, medhu vadai, sambar and filter coffee served on a banana leaf"
            width={1600}
            height={1104}
            className="size-full object-cover"
          />
        </ParallaxLayer>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-primary via-primary/70 to-primary/25"
        />
        <ParallaxLayer speed={-0.12} className="shell relative pb-20 pt-32 md:pb-28">
          <p className="eyebrow text-gold">Pattukkottai · Trichy</p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.08] text-primary-foreground sm:text-5xl md:text-6xl">
            A plain dosa is never plain.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/85 md:text-lg">
            {site.description}
          </p>
          <div className="mt-6">
            <VegMark label="100% Vegetarian" />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/menu">
              View the Menu
              <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink to="/contact" variant="onDark">
              Find a Branch
            </ButtonLink>
          </div>
        </ParallaxLayer>
      </section>

      {/* ---------- Signature dishes ---------- */}
      <section className="section-pad bg-background">
        <div className="shell">
          <KolamDivider className="mb-12" />
          <SectionHeading
            eyebrow="Signature"
            title="What we are known for"
            intro="Four things we make the same way every single day. Everything else on the menu is held to them."
          />
          <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {signatureDishes.map((dish, i) => (
              <Reveal as="li" key={dish.id} delay={i * 80} className="group">
                <article>
                  <div className="overflow-hidden rounded-sm bg-muted">
                    <img
                      src={dishImages[dish.id]}
                      alt={dish.name}
                      loading="lazy"
                      width={1000}
                      height={1000}
                      className="aspect-4/3 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <h3 className="mt-5 text-xl text-primary">{dish.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{dish.note}</p>
                  <p className="mt-3 text-sm">
                    <Placeholder>price pending</Placeholder>
                  </p>
                </article>
              </Reveal>
            ))}
            <Reveal as="li" delay={320} className="flex">
              <div className="flex w-full flex-col justify-center gap-4 rounded-sm border border-dashed border-gold/60 bg-ivory p-8">
                <h3 className="text-xl text-primary">Breakfast, lunch, evening tiffin</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Three separate menus, each served in its own window. The menu page opens on
                  whichever one is being served right now.
                </p>
                <ButtonLink to="/menu" variant="outline" className="self-start">
                  Browse all menus
                </ButtonLink>
              </div>
            </Reveal>
          </ul>
        </div>
      </section>

      {/* ---------- Story teaser ---------- */}
      <section className="section-pad bg-ivory">
        <div className="shell grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Our story</p>
            <h2 className="mt-3 text-3xl text-primary md:text-4xl">
              Tradition treated as craft, not nostalgia
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Sai Karthik is a tiffin house first. The batter is ground for the morning it is
              served, the sambar is drumstick sambar, and the coffee decoction is never rushed.
              Two dining rooms, one kitchen standard.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Founding year, family history and press mentions:{" "}
              <Placeholder>awaiting client-verified details</Placeholder>
            </p>
            <ButtonLink to="/about" variant="outline" className="mt-8">
              Read our story
              <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </ButtonLink>
          </Reveal>
          <Reveal delay={120}>
            <ParallaxLayer speed={0.12}>
              <img
                src={coffeeImg}
                alt="Filter coffee being poured in a long stream from a tumbler into a davara"
                loading="lazy"
                width={1200}
                height={1408}
                className="aspect-4/5 w-full rounded-sm object-cover shadow-elegant"
              />
            </ParallaxLayer>
          </Reveal>
        </div>
      </section>

      {/* ---------- Branch teaser ---------- */}
      <section className="section-pad bg-background">
        <div className="shell">
          <KolamDivider className="mb-12" />
          <SectionHeading
            eyebrow="Two branches"
            title="Come to whichever is closer"
            intro="Both kitchens run the same menu and the same standards. Branch-specific hours and phone numbers are confirmed on the Locations page."
          />
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {branches.map((b, i) => (
              <Reveal key={b.slug} delay={i * 100}>
                <article className="flex h-full flex-col rounded-sm border border-border bg-card p-7 shadow-lift">
                  <h3 className="text-2xl text-primary">{b.city}</h3>
                  <address className="mt-3 space-y-1 text-sm not-italic text-muted-foreground">
                    {b.addressLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </address>
                  <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                    {b.hours.map((h) => (
                      <li key={h.label} className="flex items-center gap-2">
                        <Clock className="size-4 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
                        <span className="font-semibold text-primary">{h.label}:</span>
                        <Placeholder>hours pending</Placeholder>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <ExternalAction
                      href={b.phone ? `tel:${b.phone}` : null}
                      pendingLabel="Phone number to be confirmed"
                    >
                      <Phone className="size-4" strokeWidth={1.5} aria-hidden="true" />
                      Call {b.city}
                    </ExternalAction>
                    <ExternalAction
                      href={b.directionsUrl}
                      variant="outline"
                      pendingLabel="Map link to be confirmed"
                    >
                      <MapPin className="size-4" strokeWidth={1.5} aria-hidden="true" />
                      Get Directions
                    </ExternalAction>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Trust block (one premium card per page) ---------- */}
      <section className="section-pad bg-ivory">
        <div className="shell">
          <PremiumCard>
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="eyebrow text-gold">Why people keep coming back</p>
                <h2 className="mt-4 text-3xl text-primary-foreground md:text-4xl">
                  A pure vegetarian kitchen, run the same way every day
                </h2>
                <p className="mt-5 text-base leading-relaxed text-primary-foreground/80">
                  No onion or garlic variants are prepared on request where noted, dietary tags are
                  printed on every menu item, and the vegetarian claim is a kitchen policy, not a
                  marketing line.
                </p>
                <p className="mt-4 text-sm text-primary-foreground/70">
                  Awards, ratings and press: <Placeholder>{site.awards}</Placeholder>
                </p>
                <div className="mt-8">
                  <ButtonLink to="/gallery" variant="onDark">
                    See the dining rooms
                  </ButtonLink>
                </div>
              </div>
              <img
                src={interiorImg}
                alt="Traditional dining hall with wooden tables, banana-leaf place settings and brass lamps"
                loading="lazy"
                width={1600}
                height={1008}
                className="aspect-4/3 w-full rounded-sm object-cover"
              />
            </div>
          </PremiumCard>
        </div>
      </section>

      {/* ---------- Closing actions ---------- */}
      <section className="border-t border-border bg-background py-14">
        <div className="shell flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl text-primary md:text-3xl">Visit us</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center text-sm font-bold uppercase tracking-[0.14em] text-primary underline decoration-gold decoration-2 underline-offset-8 hover:text-gold"
            >
              Locations & hours
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
