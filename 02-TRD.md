# TRD — Hotel Sai Karthik Website
**Technical Requirements Document | v1.0**

---

## 1. Stack Decision

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | Static generation for SEO-critical marketing pages, best-in-class image optimization, easy migration path to Phase 2 ordering/booking without a rewrite |
| Language | **TypeScript** | Type-safe menu/branch data model; catches content-shape errors at build time |
| Styling | **Tailwind CSS v4**, configured to output the Buhari-derived design tokens (see Typography.md / design system) as a Tailwind theme | Keeps design system as the single source of truth; no ad-hoc CSS drift |
| Animation | **Framer Motion** (component-level transitions, hover/reveal states) + **GSAP + ScrollTrigger** (parallax, scroll-choreographed sequences) | Framer Motion is idiomatic in React for UI-state animation; GSAP/ScrollTrigger is the industry standard for performant scroll-linked motion — see Parallax doc |
| Content | **MDX + JSON content files at launch**, structured to migrate cleanly into **Sanity.io** (headless CMS) in Phase 1.5 once client wants self-service editing | Avoids WordPress overhead while keeping a clear, low-cost upgrade path |
| Hosting | **Vercel** | Native Next.js support, edge caching, preview deployments per PR, zero-config image CDN |
| Forms | Next.js Route Handler → **Resend** (transactional email) | Serverless, no backend to maintain, sends enquiry submissions to client inbox |
| Maps | **Google Maps Embed API** (no JS SDK needed for static embeds) | Lightweight; avoids loading the full Maps JS SDK for a static pin |
| Analytics | **GA4** + **Vercel Analytics** (Core Web Vitals) + **Google Search Console** | Standard measurement stack matching PRD KPIs |
| Version control / CI | **GitHub** + **Vercel Git integration** | Auto preview URLs per branch/PR, protected `main` = production |

---

## 2. Architecture Overview

```
                         ┌─────────────────────┐
                         │   Vercel Edge CDN    │
                         └─────────┬────────────┘
                                   │
                      ┌────────────▼────────────┐
                      │   Next.js App Router     │
                      │  (SSG for all marketing  │
                      │   pages, ISR for menu)   │
                      └───┬───────────────────┬──┘
                           │                   │
                 ┌─────────▼────────┐  ┌───────▼─────────┐
                 │ Content Layer     │  │ Route Handlers   │
                 │ (MDX/JSON →       │  │ /api/enquiry     │
                 │  Sanity Phase 1.5)│  │  → Resend email  │
                 └───────────────────┘  └──────────────────┘
                           │
                 ┌─────────▼─────────┐
                 │ Google Maps Embed │
                 │ (per-branch pin)  │
                 └────────────────────┘
```

**Rendering strategy:**
- Homepage, Story, Locations, Gallery, Contact → **Static Generation (SSG)** at build time — content changes rarely, maximize speed/SEO
- Menu page → **Incremental Static Regeneration (ISR)**, revalidate every 60 minutes — allows same-day menu tweaks without a full redeploy once on Sanity

---

## 3. Data Model

### 3.1 Branch
```ts
type Branch = {
  slug: "pattukkottai" | "trichy";
  name: string;
  address: string;
  phone: string;
  mapEmbedUrl: string;
  coordinates: { lat: number; lng: number };
  hours: {
    breakfast: { open: string; close: string };
    lunch: { open: string; close: string };
    eveningTiffin: { open: string; close: string };
  };
  seatingNotes?: string;
  parkingNotes?: string;
  heroImage: string;
  galleryImages: string[];
};
```

### 3.2 Menu Item
```ts
type MenuItem = {
  id: string;
  name: string;
  tamilName?: string;
  category: "breakfast" | "lunch" | "eveningTiffin";
  subcategory?: string; // e.g. "Dosa Varieties", "Variety Rice", "Curries"
  description: string;  // sensory, 12–18 words
  dietary: ("veg" | "jain-on-request" | "contains-nuts" | "contains-gluten")[];
  signature: boolean;   // "Sai Karthik Special" flag
  spiceLevel?: 0 | 1 | 2 | 3;
  availableAt: ("pattukkottai" | "trichy" | "both")[];
  price?: { pattukkottai?: number; trichy?: number };
  image?: string;
};
```

### 3.3 Content Files (v1, pre-CMS)
```
/content
  /branches
    pattukkottai.json
    trichy.json
  /menu
    breakfast.json
    lunch.json
    evening-tiffin.json
  /story
    our-story.mdx
  /gallery
    gallery.json
```

This shape maps 1:1 onto Sanity document types when the client is ready for CMS-managed editing — **no schema redesign needed**, only a data-source swap (`lib/content.ts` abstracts the fetch so components never know whether data came from JSON or Sanity).

---

## 4. Component Architecture

```
/components
  /layout
    Header.tsx            — sticky nav, branch-aware CTA
    MobileNavDrawer.tsx
    Footer.tsx
  /home
    Hero.tsx               — parallax layers, signature filter-coffee motion (see 05)
    SignatureDishes.tsx
    BranchTeaser.tsx
    TrustBlock.tsx
  /menu
    MenuTabs.tsx
    MenuCategorySection.tsx
    MenuItemCard.tsx
    DietaryTag.tsx
  /locations
    BranchSwitcher.tsx
    BranchDetailCard.tsx
    MapEmbed.tsx
    OpenStatusBadge.tsx
  /shared
    ParallaxSection.tsx     — GSAP ScrollTrigger wrapper
    KolamDivider.tsx        — animated SVG signature motif
    RevealOnScroll.tsx      — Framer Motion wrapper, respects reduced-motion
    EnquiryForm.tsx
  /gallery
    GalleryGrid.tsx
    Lightbox.tsx
```

---

## 5. SEO Requirements

- **Structured data:** `Restaurant` schema per branch (JSON-LD), including `servesCuisine: "South Indian"`, `priceRange`, `openingHoursSpecification`, `address`, `geo`
- **Metadata:** unique `<title>` / `<meta description>` per page via Next.js Metadata API; Open Graph + Twitter Card images per page
- **Sitemap:** `sitemap.xml` auto-generated from route + content files
- **Canonical URLs:** enforced per page to avoid duplicate branch-content indexing
- **Local SEO:** dedicated URL per branch (`/locations/pattukkottai`, `/locations/trichy`) rather than a single merged page — critical for "near me" search intent
- **Image SEO:** descriptive `alt` text sourced from content model, never generic ("Ghee Roast dosa served with sambar and coconut chutney at Hotel Sai Karthik Trichy")

---

## 6. Performance Budget

| Metric | Target |
|---|---|
| LCP | < 2.5s (4G, mid-tier Android) |
| INP | < 200ms |
| CLS | < 0.1 |
| Total JS shipped (homepage) | < 170KB gzipped |
| Hero image | AVIF/WebP, responsive `srcset`, LQIP blur placeholder |
| Font loading | `next/font` self-hosted, `font-display: swap`, subset to Latin + Tamil glyphs actually used |
| GSAP/ScrollTrigger | Lazy-loaded, code-split, only on pages using parallax |

---

## 7. Accessibility (WCAG 2.1 AA)

- All interactive elements keyboard-reachable with visible focus states (gold focus ring per design system, `2px solid #C5A059` offset)
- `prefers-reduced-motion: reduce` disables parallax translation and ambient background animation; content still reveals (opacity-only fallback)
- Color contrast verified: navy-on-white, gold-on-white, white-on-navy all pass AA (per design system §10)
- Map embeds include text-based address/directions link as a non-visual fallback
- Menu structured with real heading hierarchy (not styled `<div>`s) so screen readers can navigate categories

---

## 8. Security & Reliability

- Enquiry form: honeypot field + server-side rate limiting (per-IP) instead of CAPTCHA, to protect UX
- All environment secrets (Resend API key, Maps key) stored in Vercel environment variables, never client-exposed except the public Maps embed key (domain-restricted in Google Cloud Console)
- HTTPS enforced; HSTS header set
- Standard security headers: `Content-Security-Policy`, `X-Frame-Options`, `Referrer-Policy`

---

## 9. Environments & Deployment

| Environment | Purpose | URL pattern |
|---|---|---|
| Local | Development | `localhost:3000` |
| Preview | Per-PR review, client sign-off | `saikarthik-<branch>.vercel.app` |
| Production | Live site | `hotelsaikarthik.com` (or client-confirmed domain) |

**CI/CD:** Push to feature branch → Vercel preview build → PR review → merge to `main` → automatic production deploy. No manual deployment steps.

---

## 10. Third-Party Integrations

| Service | Purpose | Notes |
|---|---|---|
| Google Maps Embed API | Per-branch map | Domain-restricted API key |
| Resend | Enquiry form email delivery | Client inbox as destination |
| GA4 | Behavioral analytics | Consent-aware, loads after interaction or after a short delay to protect LCP |
| Google Search Console | Indexing & search performance | Sitemap submitted at launch |
| Instagram Basic Display (optional, Phase 2) | Live feed on Gallery page | Only if client wants auto-updating gallery |

---

## 11. Future-Proofing Notes (for Phase 2/3)

- Data model already supports `availableAt` per branch → adding a 3rd branch is a content addition, not a code change
- `MenuItem.price` is already structured (even though pricing display is optional in v1) → ready for an ordering flow later
- Route structure (`/menu`, `/locations/[branch]`) can host `/order` and `/reserve` routes later without restructuring
- Sanity migration path documented in §3.3 avoids a content re-authoring project down the line
