# PRD — Hotel Sai Karthik Website
**Product Requirements Document | v1.0 | Prepared for: Hotel Sai Karthik**
**Prepared by: The Dot — Web Design & Brand Strategy**

---

## 1. Executive Summary

Hotel Sai Karthik is a South Indian vegetarian restaurant with locations in **Pattukkottai** and **Trichy**, Tamil Nadu, serving breakfast tiffin, full South Indian meals, and evening tiffin. This PRD scopes a **premium, award-caliber marketing website** — a digital front door that does for Sai Karthik what a beautifully laid banana leaf does for a meal: it sets the expectation before the first bite.

The site is **discovery-first, not transactional**. There is no online ordering or table booking in v1. Its job is to make someone who has never eaten at Sai Karthik feel the quality, warmth, and consistency of the food before they walk in — and to make it effortless for them to find the right branch, see today's tiffin, and get directions or call.

This is a **B2C** property. The audience is the diner, not the trade.

---

## 2. Business Context & Goals

### 2.1 Business Goals
| Goal | Why it matters |
|---|---|
| Establish Sai Karthik as a **premium heritage brand**, not "just another mess" | Differentiates from generic tiffin-center competitors on Google/Zomato/Swiggy listings |
| Drive **foot traffic and calls** to both branches | Primary revenue lever in a dine-in-first, no-ordering model |
| Build a **reusable content system** (menu, photos, branch info) the client can hand to the agency for updates | Avoids a static site that rots after launch |
| Create a **shareable, screenshot-worthy** digital presence | Word of mouth + social sharing is the dominant discovery channel for regional restaurants |
| Lay groundwork for **Phase 2 commerce** (reservations, catering enquiries, online ordering) without a rebuild | Protects the initial investment |

### 2.2 Positioning Statement
> For discerning South Indian food lovers in and around Pattukkottai and Trichy, Hotel Sai Karthik is the vegetarian tiffin house that treats tradition as craft — where a plain dosa is never plain. Unlike everyday tiffin centers, Sai Karthik earns "premium" through consistency, hospitality, and presentation, not price.

### 2.3 Non-Goals (v1)
- No online ordering, cart, or payment processing
- No table reservation system
- No user accounts / login
- No multi-language CMS (site ships in English; Tamil is used selectively for brand voice, see Typography.md)

---

## 3. Target Audience

### 3.1 Primary Personas

**1. The Local Regular ("Mani, 42, Pattukkottai")**
Eats tiffin 3–4x/week, decides where in under 30 seconds, wants to know: is it open now, what's on today, is parking/seating easy. Visits on mobile, usually via Google search or Maps.

**2. The Passing Traveler ("Deepa, 29, driving Trichy–Pattukkottai highway")**
Doesn't know the brand. Searches "best vegetarian restaurant near me" or asks a group chat. Needs instant trust signals — photos, reviews, a menu that reads as authentic and clean, and a map pin she can tap into Google Maps.

**3. The Family Host ("Ravi, 55, planning a family evening tiffin gathering")**
Wants to know if the restaurant can comfortably seat a family group, what evening tiffin looks like, and whether it feels like a place worth bringing visiting relatives to. Cares about ambience photography and hygiene cues.

**4. The Food Content Creator / Reviewer**
Looking for a distinctive story or hook (a signature dish, a heritage detail, a visual moment) to feature. The site should hand them a ready narrative and photographable design language.

### 3.2 Secondary Audience
- Local press / food bloggers researching Tamil Nadu vegetarian dining
- Prospective staff (careers signal, even if only a contact line)
- The client's own team, who will use the site as their brand reference document

---

## 4. Success Metrics (KPIs)

| Metric | Target (6 months post-launch) |
|---|---|
| "Get Directions" / "Call Now" click-through rate | ≥ 8% of sessions |
| Avg. session duration | ≥ 1m 45s (indicates menu browsing, not bounce) |
| Mobile bounce rate | < 45% |
| Organic search impressions for branch + "veg restaurant" queries | +40% vs. pre-launch baseline |
| Google Business Profile referral traffic (both branches) | Trackable via UTM on GBP links |
| Core Web Vitals | All "Good" in Search Console (LCP < 2.5s, INP < 200ms, CLS < 0.1) |
| Social shares of menu/gallery pages | Qualitative tracking, monthly |

---

## 5. Scope

### 5.1 In Scope — Pages
1. **Homepage** — brand thesis, signature dishes, both branches, social proof
2. **Our Story** — heritage, values, the "why" behind Sai Karthik
3. **Menu** — Breakfast / Lunch / Evening Tiffin, fully engineered (see Food-Menu.md)
4. **Locations** — Pattukkottai & Trichy, hours, map, directions, photos per branch
5. **Gallery** — food + ambience photography
6. **Contact** — phone, email, enquiry form (general enquiries only, not booking)
7. **404 / Not Found** — on-brand error page

### 5.2 In Scope — Features
- Fully responsive (mobile-first; see design system breakpoints)
- Branch selector / switcher (persists across Menu + Locations pages)
- Embedded Google Maps for both branches
- Click-to-call and click-to-directions on mobile
- Scroll-driven parallax and ambient motion (see dedicated specs)
- SEO: schema.org `Restaurant` structured data per branch, Open Graph, sitemap
- Basic analytics (GA4) and Search Console integration
- Accessibility: WCAG 2.1 AA baseline

### 5.3 Out of Scope (v1) → Phase 2 Candidates
- Online ordering / delivery integration (Swiggy/Zomato deep-links only, if desired)
- Table reservations
- Loyalty program
- Multi-branch expansion beyond 2 locations (architecture should anticipate it — see TRD)
- Blog / recipe content hub

---

## 6. Functional Requirements

### 6.1 Homepage
- FR-1.1: Hero must communicate "premium South Indian vegetarian" within 3 seconds of load (visual + headline, no scroll required)
- FR-1.2: Must surface both branches with one-tap access to each branch's hours/map
- FR-1.3: Must feature 4–6 signature dishes with photography, pulled from Menu content model
- FR-1.4: Must include a trust block (years of service / generations / press mentions — content pending client input)
- FR-1.5: Sticky header with Call and Directions CTAs visible on scroll (mobile)

### 6.2 Menu Page
- FR-2.1: Menu organized into Breakfast, Lunch, Evening Tiffin tabs/sections matching real serving windows
- FR-2.2: Each item supports: name, short sensory description, dietary tag (veg/Jain-on-request/contains-nuts), "signature" flag
- FR-2.3: Menu must be legible and scannable on mobile without horizontal scroll
- FR-2.4: Menu content managed as structured data (not hard-coded prose) so it can be updated without a developer

### 6.3 Locations Page
- FR-3.1: Branch switcher (Pattukkottai / Trichy) updates address, hours, map, and photos
- FR-3.2: Each branch displays: address, phone (click-to-call), hours by meal period, embedded map, parking/seating notes
- FR-3.3: "Open now / Closed" live status computed from hours data

### 6.4 Contact Page
- FR-4.1: General enquiry form (name, phone/email, branch, message) — submits via serverless function to client email; no payment or booking logic
- FR-4.2: Spam protection (honeypot + rate limiting, no CAPTCHA friction if avoidable)

### 6.5 Global
- FR-5.1: Persistent header nav + mobile hamburger drawer per design system spec
- FR-5.2: Footer with both branch quick-links, social links, hours summary
- FR-5.3: 100% content editable via structured content files/CMS without touching component code (see TRD)

---

## 7. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | LCP < 2.5s on 4G mobile; images served via next-gen formats (AVIF/WebP) with responsive sizing |
| SEO | Server-rendered/statically generated HTML (no client-side-only content); per-branch local SEO schema |
| Accessibility | WCAG 2.1 AA; full keyboard navigation; `prefers-reduced-motion` respected on all parallax/animation |
| Browser support | Last 2 versions of Chrome, Safari, Edge, Firefox; iOS Safari 15+; Android Chrome |
| Uptime | 99.9% (Vercel-hosted; see TRD) |
| Localization readiness | Copy structure allows future Tamil translation without re-architecture |
| Content ownership | Client can update menu items, hours, and photos without developer involvement post-launch |

---

## 8. Content Requirements (Client Deliverables Needed)

- [ ] Final, confirmed menu items with pricing for both branches (if pricing differs)
- [ ] High-resolution food photography (or budget/timeline for a photoshoot — recommended)
- [ ] Ambience/interior photography for both branches
- [ ] Exact addresses, phone numbers, and hours (including special hours e.g. festival days) for both branches
- [ ] Brand history / founding story details (year established, founder note, any press/awards — factual, to be verified by client, not assumed by agency)
- [ ] Logo files (vector, if an existing logo exists) or confirmation to design one
- [ ] Social media handles
- [ ] FSSAI license number (required disclosure for Indian F&B businesses, footer placement)

> **Note:** All specific factual claims (founding year, "X generations," award names) in this blueprint's example copy are **placeholders** and must be confirmed by the client before launch. The agency will not publish unverified heritage claims.

---

## 9. Assumptions & Constraints

- Client will not require online payments in v1 (confirmed: discovery-only scope)
- Two branches only at launch; architecture supports adding branches later (see TRD data model)
- Client has (or will obtain) rights to all photography used
- Site language is English; Tamil used selectively for brand texture only

---

## 10. Risks

| Risk | Mitigation |
|---|---|
| Client cannot supply professional photography in time | Recommend phased launch: soft-launch with best available photos, swap in professional shoot within 60 days |
| "Premium" positioning feels inauthentic if pricing/ambience don't match online promise | Align design tone with actual in-restaurant experience during discovery phase |
| Menu changes frequently (seasonal/festival items) | Structured content model (TRD) makes updates a content edit, not a code change |
| Two-branch hours/pricing divergence causes confusion | Explicit branch switcher, never a merged/ambiguous view |

---

## 11. Phased Roadmap (Summary — full detail in Implementation.md)

- **Phase 1 (Launch):** Homepage, Menu, Locations (x2), Story, Gallery, Contact
- **Phase 2 (0–6 months post-launch):** Google Business Profile deep integration, review aggregation display, catering enquiry flow
- **Phase 3 (6–12 months):** Online ordering evaluation, reservation system evaluation, loyalty/WhatsApp updates opt-in

---

## 12. Stakeholders

| Role | Responsibility |
|---|---|
| Client (Hotel Sai Karthik ownership) | Content approval, factual accuracy, brand sign-off |
| The Dot — Strategy/PM | Requirements, timeline, QA sign-off |
| The Dot — UI/UX & Brand | Design system extension, art direction |
| The Dot — Development | Build per TRD |
| Photographer (TBD) | Food + ambience photography |
