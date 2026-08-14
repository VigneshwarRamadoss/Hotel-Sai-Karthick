# Web Flow — Hotel Sai Karthik Website
**Sitemap, Navigation & Page-Level Flow | v1.0**

---

## 1. Sitemap

```
Hotel Sai Karthik
│
├── / (Homepage)
├── /our-story
├── /menu
│     ├── #breakfast
│     ├── #lunch
│     └── #evening-tiffin
├── /locations
│     ├── /locations/pattukkottai
│     └── /locations/trichy
├── /gallery
├── /contact
└── /404
```

**Rationale for flat depth:** Every primary page is one click from the homepage. Restaurant discovery is impatient — a diner deciding between two tiffin houses on their phone will not tolerate a 3-click path to "is it open now."

---

## 2. Global Navigation

### 2.1 Header (desktop, ≥1024px)
```
[ Sai Karthik Logo ]     Our Story   Menu   Locations   Gallery   Contact     [ Call Now ▸ ]
```
- Transparent over hero, solidifies to off-white (`#FDFBF7`) with subtle shadow on scroll (per design system elevation rules)
- "Call Now" renders as the **Primary Button** style (gold fill), dynamically shows the nearest/last-viewed branch's number

### 2.2 Header (mobile, ≤1023px)
```
[ ☰ ]      [ Sai Karthik Logo ]      [ 📞 ]
```
- Hamburger opens full-height slide-out drawer (navy background, gold text — Premium Card treatment)
- Phone icon is a persistent click-to-call shortcut, always visible, never hidden in the drawer

### 2.3 Footer (all pages)
```
Sai Karthik wordmark + one-line brand statement

Pattukkottai            Trichy                 Explore              Connect
Address                 Address                Our Story            Instagram
Hours                   Hours                  Menu                 Facebook
Get Directions →        Get Directions →       Gallery               
                                                Contact

FSSAI License: [XXXXXXXXXXXXXXX]        © Hotel Sai Karthik        Site by The Dot
```

---

## 3. User Journeys

### Journey A — "Is it open, and what's good today?" (Local Regular, mobile)
```
Google search "sai karthik pattukkottai"
   → Google Business Profile OR direct site link
      → Homepage loads → sticky header shows Call + Directions immediately
         → Taps "Menu" → lands on Breakfast (time-aware default tab)
            → Scans signature items → satisfied → taps Call Now
```
**Design implication:** the Menu page must default to whichever meal period is currently being served, based on time of day (breakfast before 11am, lunch 11am–4pm, evening tiffin after 4pm). Never default to a static "first tab."

### Journey B — "Never heard of it, deciding on the highway" (Passing Traveler)
```
Search "vegetarian restaurant near me" on Maps
   → Sees pin + rating → taps website link
      → Homepage hero establishes premium-authentic tone in first 3 seconds
         → Scrolls through Signature Dishes (photography does the persuading)
            → Taps "Locations" → confirms distance/hours for the nearer branch
               → Taps "Get Directions" → exits to Google Maps navigation
```
**Design implication:** Homepage must work as a **standalone trust document** — assume the visitor may never click past it.

### Journey C — "Planning a family evening out" (Family Host)
```
Referral from a friend / WhatsApp share of the site
   → Homepage → clicks "Our Story"
      → Reads heritage narrative, feels reassured about quality/hygiene
         → Clicks "Gallery" → views ambience photos, confirms seating looks right for a group
            → Clicks "Locations" → checks evening tiffin hours
               → Calls to check group seating
```
**Design implication:** Story and Gallery pages need to work harder here — Gallery must include interior/seating shots, not just food macro shots.

### Journey D — "Researching for a feature" (Content Creator / Press)
```
Direct visit (referred by PR contact or prior visit)
   → Our Story → looking for a hook (heritage detail, signature dish story)
      → Menu → screenshots signature items for reference
         → Contact → sends a collaboration enquiry via the general form
```
**Design implication:** the enquiry form's "message" field should accommodate open-ended enquiries (not just "table for 4"), since it is the only conversion path for press, catering, or partnership requests too.

---

## 4. Page-Level Flow

### 4.1 Homepage
```
┌─────────────────────────────────────┐
│ HEADER (transparent → solid)          │
├─────────────────────────────────────┤
│ HERO                                   │
│ Multi-layer parallax + signature       │
│ filter-coffee-pour motion (see 05)     │
│ Headline · Subline · [View Menu]       │
│ [Find a Branch]                        │
├─────────────────────────────────────┤
│ SIGNATURE DISHES (4–6 cards)           │
│ Photography-led, kolam divider above   │
├─────────────────────────────────────┤
│ OUR STORY TEASER                       │
│ 2-col: short narrative + photo,        │
│ "Read Our Story →"                     │
├─────────────────────────────────────┤
│ BRANCH TEASER (2 cards side by side)   │
│ Pattukkottai | Trichy — hours, map     │
│ thumbnail, Get Directions per card     │
├─────────────────────────────────────┤
│ TRUST BLOCK                            │
│ Heritage detail / press mentions       │
│ (client-confirmed content only)        │
├─────────────────────────────────────┤
│ FOOTER                                 │
└─────────────────────────────────────┘
```

### 4.2 Menu Page
```
HEADER
Sticky sub-nav: [ Breakfast | Lunch | Evening Tiffin ]  (time-aware default)
  → Category sections within each tab
     → Signature items visually flagged (gold corner marker, not a badge that
       clutters — see Food-Menu.md for the engineering logic)
Branch note: "Availability may vary by branch" if applicable
FOOTER
```

### 4.3 Locations Page
```
HEADER
[ Pattukkottai ]  [ Trichy ]   ← branch switcher, persists selection in URL (?branch=)
   Selected branch panel:
     - Hero photo of that branch's frontage/interior
     - Address + "Open Now/Closed" live badge
     - Hours table by meal period
     - Embedded map
     - Get Directions / Call buttons
     - Seating & parking notes
FOOTER
```

### 4.4 Our Story
```
HEADER
Full-bleed heritage photo with parallax depth
Narrative sections (short paragraphs, generous whitespace per design system)
Optional timeline IF the client confirms real dated milestones
     (do not fabricate a timeline — omit this block if facts are unverified)
Values grid: Quality · Hospitality · Consistency · Tradition
FOOTER
```

### 4.5 Gallery
```
HEADER
Filter chips: [ All | Food | Interiors | Pattukkottai | Trichy ]
Masonry grid, lightbox on tap
FOOTER
```

### 4.6 Contact
```
HEADER
Two-column: Enquiry form (left) | Branch quick-contact cards (right)
Map thumbnails for both branches, linking to full Locations page
FOOTER
```

---

## 5. Primary CTA Hierarchy (site-wide)

1. **Call Now** — highest priority, always reachable within one tap on mobile
2. **Get Directions** — second priority, present on Homepage, Locations, Footer
3. **View Menu** — discovery CTA, present in Hero
4. **Contact / Enquiry Form** — lowest-friction fallback for non-urgent contact

No CTA in this hierarchy implies transaction (ordering/booking) — all CTAs route toward **a real-world visit or phone call**, matching the discovery-only scope.
