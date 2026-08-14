# Visual Background & UI Animation Specification
**Hotel Sai Karthik Website | v1.0**

---

## 0. Motion Philosophy

Every animation on this site must answer one question: **does this make the food or the hospitality feel more real, or is it decoration?** If it's decoration, it's cut. The inherited design system already commits to restraint (flat surfaces, shadow only where earned); motion follows the same discipline. This site should feel like it moves the way a well-run kitchen moves — purposeful, unhurried, never frantic.

Two **signature motifs** carry the brand's motion identity end-to-end. Everything else is a supporting player.

---

## 1. Signature Motif A — The Kolam Line-Draw

### What it is
A kolam (rangoli) is the geometric dot-and-line pattern drawn fresh every morning at South Indian household and shop thresholds — a genuine daily ritual, not a generic "Indian pattern." Using it as the site's structural divider ties directly to Sai Karthik's breakfast-first identity and gives the brand something Buhari's system doesn't have: a motif specific to *this* restaurant's culture, not just its palette.

### Where it appears
- Section dividers between major homepage blocks (Hero → Signature Dishes → Story → Branches → Trust)
- As a loading-state motif (see §4)
- As a subtle, low-opacity **static** background texture on the Our Story page (not animated there — used once as a moving moment per page, per the "spend your boldness in one place" principle)

### Behavior
- Rendered as an SVG `<path>` with `stroke-dasharray` / `stroke-dashoffset` technique
- On scroll-into-view, the path "draws" itself over **900ms**, `ease: power2.out`
- Drawn in **Gold** (`#C5A059`, matching the design system's accent role), 1.5px stroke weight, on transparent background so it sits naturally in either white or off-white sections
- Once drawn, small connector dots at each kolam vertex "settle" with a soft scale-in (`0.9 → 1`, 200ms, staggered 40ms per dot) — echoing how a real kolam is built dot-first, then connected
- **Never loops or repeats** — it draws once per section per page view. Re-triggering on every scroll pass would cheapen the ritual quality it's borrowing from

### Reduced motion
Renders fully drawn, static, on load. No animation, no opacity fade — just present.

---

## 2. Signature Motif B — The Filter Coffee Pour

### What it is
The tumbler-to-davara pour — filter coffee poured in a long stream between two vessels to froth it — is one of the most visually iconic, universally recognized gestures in South Indian food culture. It is the site's **hero signature moment** per the frontend-design principle of choosing one characteristic thing from the subject's own world.

### Where it appears
- **Once**, on Homepage Hero load only
- Referenced as a still illustration (final frame of the pour) as a recurring small brand mark elsewhere (favicon-adjacent contexts, loading state) — but the *animated* version plays in exactly one place, so it stays special

### Behavior (Hero load sequence)
1. **0.0s–0.3s:** Brass tumbler and davara fade/scale in from 92% opacity/scale (`ease: power1.out`)
2. **0.3s–1.1s:** A thin animated stream (SVG path, gold-to-cream gradient) draws from tumbler to davara — not a literal video, a stylized line-and-particle animation that reads as a pour without needing real footage
3. **1.1s–1.4s:** A soft particle "froth" bloom at the davara (a handful of small circles scaling/fading, echoing the aeration) — this is the one moment on the entire site with more than 3 simultaneous animated elements, deliberately, because it's the single boldness spend
4. **1.4s onward:** Settles to a static illustration; headline and CTAs (already present, per Parallax doc L3) hold focus from this point forward

### Technical notes
- Built as a single **Lottie** file (After Effects → Lottie JSON) OR hand-coded SVG + GSAP timeline — Lottie is preferred if a motion designer is available (smaller dev lift, easier iteration); GSAP timeline is the fallback if building in-house
- Total file weight budget: **< 80KB** for the Lottie JSON — this is a hero-critical asset and must not delay LCP. Loaded async, hero text (LCP element) never waits on it
- Plays once per session (stored in `sessionStorage`), so returning/navigating visitors aren't shown the full sequence repeatedly — they see the settled static illustration immediately

### Reduced motion
Renders the final settled illustration immediately — no pour animation, no particles.

---

## 3. Ambient Background Layer (Hero Only)

- A very low-opacity (8–12%), slow-drifting steam/mist texture across the hero background, built as 2–3 overlapping blurred SVG blobs animated on independent CSS `@keyframes` loops (12–18s duration, `ease-in-out`, no scroll dependency)
- Purpose: keeps the hero from feeling static during the pause after the signature motion completes, without competing for attention
- Capped to the Hero only — no other section carries ambient looping motion, to avoid a "busy AI-generated" feeling the design system explicitly warns against

```css
@keyframes drift {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(-2%, 3%) scale(1.04); }
  100% { transform: translate(0, 0) scale(1); }
}
.steam-layer {
  animation: drift 16s ease-in-out infinite;
  opacity: 0.1;
  will-change: transform;
}
```
- Automatically paused (`animation-play-state: paused`) when the hero is scrolled out of viewport, via `IntersectionObserver`, to avoid burning GPU cycles off-screen
- Disabled entirely under `prefers-reduced-motion`

---

## 4. Micro-Interactions

| Element | Interaction | Spec |
|---|---|---|
| Primary button (gold) | Hover | Per design system: background darkens to `#B8943F`, glow shadow intensifies — 150ms ease-out. No additional custom motion added |
| Menu item card | Hover (desktop) / tap (mobile) | Card lifts via shadow-medium → shadow-large transition (per design system elevation scale), 200ms — no scale transform, to avoid layout jitter with neighboring cards |
| Signature dish flag (gold corner marker) | On scroll into view | Fades + slides in from the corner, 300ms, staggered 60ms per card in the grid |
| Branch switcher tab | Selection change | Underline indicator slides between tabs (`transform: translateX`), 250ms `ease-in-out` — the same underline-affordance language as main nav hover per design system §4 |
| "Open Now" status badge | State change (open↔closed, if user has tab open across a boundary) | Soft cross-fade, 400ms — deliberately gentle, this is a status update not an alert |
| Page loading state | Route transition | A single kolam dot (from motif A) pulses centrally — 3 dots, staggered opacity pulse, replaces any generic spinner |
| Form submit (Contact) | Success | Gold checkmark draws in using the same stroke-dasharray technique as the kolam motif, tying the "task complete" moment back to the brand's signature line-draw language rather than a generic toast |

---

## 5. What We Deliberately Did NOT Add

Per the frontend-design skill's caution against motion that reads as templated/AI-generated:
- No particle.js-style generic floating dots in hero
- No auto-playing carousel/slider anywhere on the site (carousels have poor engagement and accessibility track records; Signature Dishes uses a static grid instead)
- No text that animates letter-by-letter or "typewriter" effects
- No scroll-jacking (native scroll is never hijacked or overridden in duration/direction)
- No gradient-mesh or blob backgrounds outside the single, restrained Hero steam layer

---

## 6. Implementation Checklist

- [ ] Kolam SVG paths authored/vectorized from an approved, non-appropriative reference (client or agency-commissioned illustration, not a stock asset lifted without rights)
- [ ] Filter-coffee-pour Lottie/GSAP asset built and weight-tested (< 80KB)
- [ ] `prefers-reduced-motion` fallback verified for every item in this document, not just the two signature motifs
- [ ] `IntersectionObserver` pause behavior verified for all looping/ambient animation
- [ ] Session-based "play once" logic tested across navigation (not just page refresh)
