# Typography — Hotel Sai Karthik Website
**v1.0 | Extends the attached Buhari-derived type system**

---

## 1. Typeface Decisions

### 1.1 Inherited (unchanged from attached design system)

**Display / Headings — Prata** (serif)
`Prata, Georgia, 'Times New Roman', serif`
Reserved for all display type, section headings, and branded moments. Weight 400 only — Prata's single-weight character is part of what makes it feel restrained rather than decorative.

**Body / UI — Lato** (sans-serif)
`Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif`
Reserved for body copy, navigation, buttons, forms, captions, and the menu content itself (legibility at small sizes matters more on a menu than personality).

This pairing carries over directly because it already solves Sai Karthik's exact brand problem: Prata reads as heritage/prestige without reading as European fine-dining, and Lato keeps the practical content (hours, addresses, menu items) fast to scan on a phone.

### 1.2 Addition — Tamil Script Companion Face

Both Sai Karthik branches are in Tamil Nadu, and the brand voice (UI/UX Brief §5) calls for selective Tamil-script use — the restaurant name in Tamil, and potentially a tagline. Prata and Lato have **no Tamil glyph support**, so a companion face is required for these specific, limited moments only.

**Tamil Companion — Noto Serif Tamil** (paired with Prata moments) and **Noto Sans Tamil** (paired with Lato moments)
- Chosen because Noto's metrics are designed for harmonious pairing across scripts, and both are open-licensed, well-hinted web fonts with full Tamil Unicode coverage
- **Used only for:** the Tamil-script wordmark treatment (e.g., in the footer or an "our name in Tamil" brand moment), and any Tamil tagline the client approves after native-speaker review (UI/UX Brief §5)
- **Never used for:** body copy, menu items, or navigation — the working language of the site is English; Tamil is brand texture, not a parallel content track, in v1

```css
--font-display: 'Prata', Georgia, 'Times New Roman', serif;
--font-display-ta: 'Noto Serif Tamil', 'Prata', Georgia, serif;
--font-body: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-body-ta: 'Noto Sans Tamil', 'Lato', -apple-system, sans-serif;
```

---

## 2. Type Scale

*Inherited exactly from the attached design system — reproduced here for a single reference point, with usage notes specific to this build.*

| Role | Font | Size | Weight | Line Height | Used for (Sai Karthik-specific) |
|---|---|---|---|---|---|
| Display XL | Prata | 96px | 400 | 105.6px | Homepage hero headline only |
| Display Large | Prata | 72px | 400 | 72px | "Our Story" page header |
| Display | Prata | 60px | 400 | 75px | Menu page section intro, Locations page header |
| Heading Large | Prata | 48px | 400 | 60px | Category-level headings (e.g., "Breakfast") |
| Heading Medium | Prata | 36px | 400 | 45px | Subsection headings (e.g., "Dosa Varieties") |
| Heading | Prata | 30px | 400 | 36px | Card group titles ("Signature Dishes") |
| Heading Small | Prata | 20px | 400 | 28px | Individual dish names on Menu page |
| Heading XSmall | Prata | 18px | 400 | 28px | Minor headings, branch names on Locations |
| Label Bold | Lato | 14px | 700 | 20px | Form labels, button text, dietary tag chips |
| Body Large | Lato | 20px | 300 | 32.5px | Homepage lead paragraphs, Our Story intro |
| Body | Lato | 18px | 400 | 29.25px | Standard paragraph copy |
| Body Light | Lato | 18px | 300 | 36px | Menu item descriptions (generous line height aids scanning while eating decisions are being made) |
| Text | Lato | 16px | 400 | 24px | Standard links, secondary copy |
| Text Medium | Lato | 16px | 500 | 24px | Hours, addresses — needs slight emphasis over surrounding text |
| Caption | Lato | 14px | 400 | 20px | Metadata, "Contains onion" tags, image captions |
| Small | Lato | 12px | 400 | 19.5px | FSSAI license line, legal/footer fine print |

**Menu-specific note:** dish prices (once confirmed, see Food-Menu.md §A.5) render at **Text (16px/400)** in a muted navy (60% opacity per the attached opacity scale) — deliberately smaller and quieter than the dish name (Heading Small, full-opacity navy), so the eye lands on the dish first, price second.

---

## 3. Web Font Loading Strategy

- All fonts self-hosted via `next/font` (not a Google Fonts `<link>` call) — eliminates a third-party network request and lets Next.js inline the correct `@font-face` with zero layout shift
- `font-display: swap` on all faces — text is visible in a fallback font immediately, swapping to the branded face once loaded, rather than showing invisible text
- **Subsetting:** Prata and Lato subset to Latin (+ Latin Extended for potential future markets); Noto Serif/Sans Tamil subset to the Tamil Unicode block only — no reason to ship the full Noto Tamil glyph set (which includes many rarely-used characters) when the site only needs the wordmark and a short tagline
- Preload only the two most critical weight/style combinations (Prata 400, Lato 400) used in the hero — everything else loads on demand, protecting the LCP budget defined in TRD §6

---

## 4. Accessibility Notes

- Body text never renders below **16px** on any breakpoint (the attached system's mobile scaling floor is respected — see design system §8, "reduced font sizes to 14px–16px" applies to captions/labels, not body paragraphs)
- Line height for all body roles stays at or above 1.5× font size, matching the inherited system's readability principle
- Prata, being a serif with moderate stroke contrast, is never used below **18px** (Heading XSmall) — smaller sizes shift to Lato, since serif legibility degrades faster than sans-serif at small sizes on screens
