# UI/UX Design Brief — Hotel Sai Karthik
**v1.0 | Extends the attached Buhari-derived design system with a brand-specific signature**

---

## 1. How This Brief Relates to the Attached Design System

The client-provided design system (`www_buhari_in-DESIGN.md`) is the **structural foundation** for this build: its color roles, type scale, component styling, spacing system, and elevation rules carry over directly. It was chosen because it already solves the exact positioning problem Sai Karthik has — communicating **heritage and premium quality for a traditional food category** without resorting to generic "fine dining" visual clichés (no white tablecloth photography, no European plating).

This brief does **not** replace that system. It extends it with the choices specific to Sai Karthik's own identity: a vegetarian tiffin house across two Tamil Nadu towns, not a biryani landmark restaurant. Where this brief is silent, defer to the attached design system.

---

## 2. Design Plan

### 2.1 Color — Inherited + One Deliberate Addition

**Inherited directly (no changes):**
- Gold `#C5A059` — primary accent, CTAs, signature line-art
- Deep Navy `#062654` / Navy Secondary `#002D62` — text, structure
- White `#FFFFFF` / Off-White `#FDFBF7` — backgrounds
- Full neutral, border, and interactive-state scale as documented

**One addition, used deliberately and sparingly:**
- **Leaf Green** `#3C5B3F` — reserved *exclusively* for the vegetarian-purity signal: a small square-with-dot mark (matching India's mandatory FSSAI green vegetarian symbol convention) placed once per menu item, and as a single accent line under "100% Vegetarian" wherever that claim appears. It is never used for buttons, headings, or decoration — it has exactly one job, communicating dietary trust, and doing that job well matters more here than in most restaurant categories.

This restraint is intentional: the brief already has a resolved, working palette. The temptation to "make it feel different from Buhari" by changing the whole palette would be the wrong kind of boldness — the boldness budget (per our design principles) is spent on the kolam and filter-coffee motifs instead, not on reinventing a palette that already does its job.

### 2.2 Type — Inherited, Extended for Bilingual Texture

- **Prata** (display/headings) and **Lato** (body/UI) carry over exactly as documented in the attached system and detailed further in `08-Typography.md`
- **Addition:** selective Tamil-script brand texture (restaurant name, taglines) requires a Tamil-compatible companion face — specified fully in the Typography doc — used only in specific brand moments, never for body content

### 2.3 Layout Concept

```
┌────────────────────────────────────────┐
│  Transparent header over full-bleed     │
│  hero photography — signature motion    │
│  plays once, settles to stillness       │
├────────────────────────────────────────┤
│  Generous off-white section             │
│  Kolam divider draws in on scroll       │
│  Photography-led content grid           │
│  (never more than 3 columns desktop)    │
├────────────────────────────────────────┤
│  Navy "Premium Card" block used         │
│  ONCE per page maximum — for the        │
│  single most important trust claim      │
│  on that page (heritage detail,         │
│  branch highlight, etc.)                │
├────────────────────────────────────────┤
│  Off-white section, repeat pattern      │
└────────────────────────────────────────┘
```
Sections alternate white/off-white per the attached system's "Section Container" token — this is inherited exactly, not reinvented. The navy Premium Card treatment is capped at one use per page specifically because the attached system flags it as reserved for "hero overlays, premium cards, or dark sections" — overusing it would flatten its impact.

### 2.4 Signature Element

**The Filter Coffee Pour** (full spec in `05-Visual-Background-UI-Animation.md`) is the single element this site will be remembered by. It is:
- Specific to South Indian culture, not a generic "Indian restaurant" cliché
- A genuine sensory/behavioral gesture real customers recognize and associate with quality tiffin houses
- Executed once, with restraint, exactly per the frontend-design principle of spending boldness in one place

The **Kolam line-draw** motif is the secondary signature — a structural device (dividers, loading states) that reinforces the same cultural specificity at a lower register throughout the site.

---

## 3. Photography Direction

Photography carries more brand weight on this site than on almost any other page type — food is the product.

**Do:**
- Shoot dosas, idlis, and tiffin items with visible steam where authentic (morning shoots, not staged with artificial smoke unless steam is genuinely present)
- Use natural, warm light — avoid the cold blue-white "food blogger ring light" look
- Include hands in some shots (pouring filter coffee, serving on a banana leaf) — hospitality is a human act, and the design system's "authentic Indian hospitality" language should show up in imagery, not just words
- Shoot both branches' interiors distinctly — do not present a single "generic interior" photo set and imply it represents both locations
- Banana leaf and stainless-steel/brass tableware should appear as recurring textures across food photography — this is real material culture for this cuisine, not a prop choice

**Don't:**
- No stock photography of unrelated Indian food (biryani stock shots on a pure-veg tiffin house site would misrepresent the menu)
- No overly stylized "flat lay" arrangements that feel like a cookbook shoot rather than what a customer will actually be served
- No people who are not real staff/customers (with consent) — do not use generic stock people

---

## 4. Iconography

- Line-weight icons at `1.5px` stroke, matching the restrained border-width language of the attached design system (thin `1px`, medium `2px` only)
- Icon set limited to: phone, map pin, clock, directions arrow, Instagram/Facebook marks, the FSSAI-style veg dot, and the kolam dot motif — no icon added without a clear functional or brand purpose
- Icons are always paired with a text label on primary CTAs (never icon-only for Call/Directions) — this is an accessibility requirement as much as a clarity one

---

## 5. Voice & Tone

- **Warm, specific, unhurried** — matching the attached system's "unhurried pleasure of fine dining" language, translated to tiffin-house register (less "sommelier," more "your favorite aunt who happens to run a very well-organized kitchen")
- Menu descriptions are sensory and precise, never generic ("crisp-edged, ghee-roasted to a deep gold" rather than "delicious dosa" — see Food Menu doc)
- No superlative claims that can't be substantiated ("Chennai's best" is a claim; "a Sai Karthik tradition" is a voice)
- Tamil words used in the brand voice (e.g., a tagline in Tamil script) must be reviewed by a native speaker before launch — the agency will draft options but final Tamil copy requires client/native-speaker sign-off, not an assumed translation

---

## 6. Accessibility Commitments

- WCAG 2.1 AA baseline (full detail in TRD §7)
- Every signature animation has a static, fully legible fallback — the brand identity must survive completely intact with all motion off
- Color is never the only signal (the veg-dot green is always paired with the word "Vegetarian" or "Jain on request" in text, never color alone)
- Minimum touch target 44×44px maintained from the inherited system, non-negotiable on Call/Directions CTAs specifically, since mobile is the dominant use context (see PRD personas)

---

## 7. Do's and Don'ts — Sai Karthik-Specific Additions

**In addition to the attached system's existing Do's/Don'ts:**

**Do:**
- Let photography and the two signature motifs carry the "premium" feeling — resist the urge to add ornamental borders or textures beyond what's specified
- Keep both branches visually equal in presentation weight everywhere (nav, footer, homepage teaser) — no branch should read as the "main" location and the other as an afterthought

**Don't:**
- Don't use the Leaf Green accent (§2.1) for anything other than the vegetarian trust signal
- Don't let the kolam motif appear more than once per section transition — its ritual quality depends on scarcity
- Don't introduce plating styles, cutlery, or presentation photography that isn't authentic to how the restaurant actually serves food
