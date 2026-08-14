# Implementation Plan — Hotel Sai Karthik Website
**v1.0 | Phased delivery roadmap**

---

## 1. Phase Overview

| Phase | Focus | Duration (est.) |
|---|---|---|
| 0 — Discovery & Content Collection | Facts, assets, sign-off on scope | 1–2 weeks |
| 1 — Design | Extend design system, build key page comps | 2 weeks |
| 2 — Development | Build per TRD | 3–4 weeks |
| 3 — Content, Photography & QA | Populate real content, test everything | 1–2 weeks |
| 4 — Launch | Go live, submit to search, connect analytics | 2–3 days |
| 5 — Post-Launch | Monitor, iterate, plan Phase 2 features | Ongoing |

**Total estimated timeline to launch: 7–10 weeks**, dependent primarily on how quickly the client supplies confirmed content (Phase 0 is the most common source of delay on restaurant sites — see risk mitigation in PRD §10).

---

## 2. Phase 0 — Discovery & Content Collection

### Deliverables from client (see PRD §8 for full checklist)
- [ ] Confirmed final menu + any pricing (per branch, if it differs)
- [ ] Branch addresses, phone numbers, hours (incl. festival/holiday variations)
- [ ] Founding story facts — year established, founder details, any real press/award mentions (**verified, not assumed**)
- [ ] Existing logo files, or confirmation the agency should design one
- [ ] FSSAI license number(s) for both branches
- [ ] Social media handles
- [ ] Photography: existing assets audit + decision on commissioning a shoot

### Agency deliverables
- [ ] Sign-off on PRD scope (this document set)
- [ ] Domain + hosting account access confirmed (or new domain registration if needed)
- [ ] Google Business Profile audit for both branches (claimed? accurate? photos present?)

**Gate to Phase 1:** PRD signed off, at minimum a content placeholder plan agreed (real copy can follow in Phase 3, but scope must be locked first).

---

## 3. Phase 1 — Design

- [ ] Extend design tokens into Tailwind config (colors, type scale, spacing, elevation — all per attached design system + UI/UX Brief additions)
- [ ] Build high-fidelity comps: Homepage, Menu, Locations (one branch, pattern applies to both), Our Story
- [ ] Prototype the two signature motion motifs (kolam line-draw, filter coffee pour) as isolated proofs-of-concept before committing to full-page builds
- [ ] Client review checkpoint — comps + motion prototypes presented together, since the motion is core to the brand feeling, not an afterthought
- [ ] Photography brief finalized (shot list derived from UI/UX Brief §3, mapped to specific page needs)

**Gate to Phase 2:** Comps approved, motion motifs approved, photography plan locked (even if shoot happens in parallel with dev).

---

## 4. Phase 2 — Development

### Sprint breakdown (indicative)
| Sprint | Scope |
|---|---|
| Dev Sprint 1 | Project scaffold, design tokens in Tailwind, layout shell (Header/Footer/Nav), content data model (TRD §3) |
| Dev Sprint 2 | Homepage incl. hero + both signature motion motifs, Signature Dishes, Branch Teaser |
| Dev Sprint 3 | Menu page (all three meal periods), Locations page (branch switcher, map embeds, open-status logic) |
| Dev Sprint 4 | Our Story, Gallery, Contact + enquiry form + email integration, 404 page |
| Dev Sprint 5 | SEO pass (schema, metadata, sitemap), accessibility pass, performance tuning, cross-browser QA |

- [ ] All components built against the data model in TRD §3 — no hard-coded menu/branch content in components
- [ ] `prefers-reduced-motion` fallback implemented and tested for every animated element (Parallax doc §everything, Animation doc §everything)
- [ ] Preview deployments reviewed by client at the end of each sprint (Vercel preview URLs, per TRD §9)

**Gate to Phase 3:** Feature-complete build on staging with placeholder content, passing internal QA.

---

## 5. Phase 3 — Content, Photography & QA

- [ ] Real menu content entered into content files/CMS
- [ ] Confirmed branch data (hours, addresses, phone) entered
- [ ] Photography shoot completed and assets optimized (AVIF/WebP, responsive sizes per TRD §6)
- [ ] Copy finalized — Our Story narrative, meta descriptions, alt text for every image
- [ ] Tamil-script brand moments reviewed by a native speaker (Typography doc §1.2 / UI/UX Brief §5) before going live
- [ ] Full QA pass:
  - [ ] Cross-browser (Chrome, Safari, Edge, Firefox — current + previous version)
  - [ ] Cross-device (iOS Safari, Android Chrome, tablet breakpoints)
  - [ ] Lighthouse audit: Performance, Accessibility, Best Practices, SEO all ≥ 90
  - [ ] Screen reader pass (VoiceOver or NVDA) on Menu and Contact pages minimum
  - [ ] Reduced-motion toggle tested on every animated element
  - [ ] Form submission tested end-to-end (spam protection, email delivery)
  - [ ] All CTAs (Call, Directions) tested on real mobile devices, not just browser emulation

**Gate to Phase 4:** All QA checklist items passed, client final content sign-off received.

---

## 6. Phase 4 — Launch

- [ ] DNS pointed to Vercel production, SSL verified
- [ ] `sitemap.xml` submitted to Google Search Console
- [ ] GA4 property connected and verified firing correctly
- [ ] Google Business Profile updated with website link for both branches
- [ ] Social media bios updated with website link
- [ ] Post-launch smoke test on production URL (not just staging) — repeat the critical-path checks from Phase 3 QA on the live domain
- [ ] Client walkthrough / handover session — how to request content updates, who owns what

---

## 7. Phase 5 — Post-Launch

- [ ] Week 1: daily monitoring of Core Web Vitals (Vercel Analytics) and any error reports
- [ ] Week 2–4: first real-world content edit test (client or agency updates a menu item, confirms the process works)
- [ ] Month 1: review GA4 data against PRD §4 KPI targets, adjust CTAs/copy if early data suggests friction
- [ ] Month 2–3: begin Sanity CMS migration evaluation (TRD §11) if client wants self-service content editing
- [ ] Month 3–6: revisit the Stars/Plowhorses/Puzzles/Dogs menu analysis (Food-Menu.md §A.7) using real sales data, propose a menu content refresh if warranted
- [ ] Ongoing: quarterly design-system consistency audit — confirm no ad-hoc styling has drifted from the token system as content gets added

---

## 8. Roles & Responsibilities

| Role | Responsible for |
|---|---|
| Client / Owner | Content accuracy, factual sign-off (esp. heritage claims, FSSAI numbers), timely asset delivery |
| The Dot — PM | Timeline, scope gates, client communication |
| The Dot — Designer | Design system extension, comps, motion motif design |
| The Dot — Developer | Build per TRD, QA execution |
| Photographer | Food + ambience shoot (in-house or commissioned, per Phase 0 decision) |
| Native Tamil reviewer | Sign-off on any Tamil-script copy before launch |

---

## 9. Definition of Done (v1 Launch)

The project is launch-ready when:
1. All pages in the Web Flow sitemap are live with **real, client-approved content** (no lorem ipsum, no unverified factual claims)
2. All KPIs in PRD §4 have tracking instrumentation live and verified
3. Lighthouse scores ≥ 90 across all four categories on the production URL
4. Both branches' information is independently accurate and complete
5. Client has completed the handover walkthrough and confirmed they can request/perform content updates going forward
