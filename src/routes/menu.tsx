import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Star, X } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Placeholder, VegMark, buttonStyles } from "@/components/ui-kit";
import { Reveal } from "@/components/motion";
import { currentMealPeriodId, mealPeriods, type MenuItem } from "@/data/menu";

const title = "Menu — Breakfast, Lunch & Evening Tiffin | Hotel Sai Karthik";
const description =
  "The full Hotel Sai Karthik menu: breakfast tiffin, South Indian meals and evening tiffin. Dosa varieties, idly, vadai, pongal, variety rice, curries and filter coffee — all pure vegetarian.";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/menu" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Menu",
          name: "Hotel Sai Karthik Menu",
          hasMenuSection: mealPeriods.map((p) => ({
            "@type": "MenuSection",
            name: p.name,
            hasMenuSection: p.categories.map((c) => ({
              "@type": "MenuSection",
              name: c.name,
              hasMenuItem: c.items.map((i) => ({
                "@type": "MenuItem",
                name: i.name,
                description: i.description,
                suitableForDiet: "https://schema.org/VegetarianDiet",
              })),
            })),
          })),
        }),
      },
    ],
  }),
  component: MenuPage,
});

function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <li className="border-b border-border py-5 last:border-b-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h4 className="text-lg text-primary">{item.name}</h4>
        {item.signature ? (
          <span className="inline-flex items-center gap-1 rounded-sm bg-gold/15 px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-primary">
            <Star className="size-3 fill-gold text-gold" strokeWidth={1.5} aria-hidden="true" />
            Sai Karthik Special
          </span>
        ) : null}
        <span className="text-sm text-muted-foreground">
          {item.price === null ? <Placeholder>price pending</Placeholder> : `₹${item.price}`}
        </span>
      </div>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
      <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        {item.tags.map((tag) => (
          <li key={tag}>
            {tag === "Vegetarian" ? (
              <VegMark />
            ) : (
              <span className="rounded-sm border border-border bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">
                {tag}
              </span>
            )}
          </li>
        ))}
      </ul>
    </li>
  );
}

function MenuPage() {
  // Time-aware default: never a static first tab.
  const [activeId, setActiveId] = useState(() => currentMealPeriodId());
  const [query, setQuery] = useState("");
  const [signatureOnly, setSignatureOnly] = useState(false);
  const [noOnion, setNoOnion] = useState(false);

  const period = mealPeriods.find((p) => p.id === activeId) ?? mealPeriods[0]!;

  const categories = useMemo(() => {
    const q = query.trim().toLowerCase();
    return period.categories
      .map((c) => ({
        ...c,
        items: c.items.filter((i) => {
          if (signatureOnly && !i.signature) return false;
          if (noOnion && i.tags.includes("Contains onion")) return false;
          if (!q) return true;
          return (
            i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
          );
        }),
      }))
      .filter((c) => c.items.length > 0);
  }, [period, query, signatureOnly, noOnion]);

  const resultCount = categories.reduce((n, c) => n + c.items.length, 0);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Menu"
        title="Breakfast, lunch and evening tiffin"
        intro="Three menus, each served in its own window. This page opens on whatever is being served now. Prices are shown as placeholders until per-branch pricing is confirmed."
      />

      {/* Sticky controls */}
      <div className="sticky top-16 z-40 border-b border-border bg-ivory/95 backdrop-blur md:top-20">
        <div className="shell py-4">
          <div
            role="tablist"
            aria-label="Meal period"
            className="flex flex-wrap gap-2"
          >
            {mealPeriods.map((p) => (
              <button
                key={p.id}
                role="tab"
                type="button"
                aria-selected={p.id === activeId}
                onClick={() => setActiveId(p.id)}
                className={
                  p.id === activeId
                    ? `${buttonStyles.primary} min-h-11`
                    : `${buttonStyles.quiet} min-h-11`
                }
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <label htmlFor="menu-search" className="sr-only">
                Search the menu
              </label>
              <input
                id="menu-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dishes, e.g. ghee roast"
                className="min-h-11 w-full rounded-sm border border-input bg-card pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-sm text-muted-foreground hover:text-primary"
                >
                  <X className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  <span className="sr-only">Clear search</span>
                </button>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-4">
              <label className="flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">
                <input
                  type="checkbox"
                  checked={signatureOnly}
                  onChange={(e) => setSignatureOnly(e.target.checked)}
                  className="size-4 accent-[var(--gold)]"
                />
                Signature only
              </label>
              <label className="flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">
                <input
                  type="checkbox"
                  checked={noOnion}
                  onChange={(e) => setNoOnion(e.target.checked)}
                  className="size-4 accent-[var(--gold)]"
                />
                No onion
              </label>
            </div>
          </div>
        </div>
      </div>

      <section className="section-pad bg-background">
        <div className="shell">
          <p className="text-sm text-muted-foreground">{period.note}</p>
          <p aria-live="polite" className="mt-2 text-sm font-semibold text-primary">
            {resultCount} {resultCount === 1 ? "dish" : "dishes"} shown
          </p>

          {categories.length === 0 ? (
            <p className="mt-12 rounded-sm border border-dashed border-border bg-ivory p-8 text-center text-muted-foreground">
              Nothing matches that yet. Try a different dish name or clear the filters.
            </p>
          ) : (
            <div className="mt-10 space-y-14">
              {categories.map((c) => (
                <Reveal as="section" key={c.id}>
                  <h3 className="text-2xl text-primary">{c.name}</h3>
                  <div className="mt-1 h-px w-16 bg-gold" aria-hidden="true" />
                  <ul className="mt-4">
                    {c.items.map((item) => (
                      <MenuItemRow key={`${c.id}-${item.id}`} item={item} />
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          )}

          <aside className="mt-16 rounded-sm border border-border bg-ivory p-6 text-sm leading-relaxed text-muted-foreground">
            <h2 className="font-display text-lg text-primary">A note on the menu</h2>
            <p className="mt-2">
              Every dish is prepared in a pure vegetarian kitchen. Items containing onion are
              labelled so, rather than assuming vegetarian suits every diner. Availability of
              rotating items varies by branch and day —{" "}
              <Placeholder>confirm current offerings by phone</Placeholder>
            </p>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
