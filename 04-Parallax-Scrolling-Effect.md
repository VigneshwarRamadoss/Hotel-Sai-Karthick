# Parallax Scrolling Effect Specification
**Hotel Sai Karthik Website | v1.0**

---

## 1. Design Intent

Parallax here is not decoration — it's meant to recreate a specific sensory memory: **steam rising off a fresh idli plate, the slight blur of movement in a busy morning kitchen, the settled stillness of a well-set dining hall.** Every parallax moment must be justifiable against that intent. If a section doesn't call for it, it stays flat — per the design system's restraint principle ("most content is flat").

**Where parallax is used (and nowhere else):**
1. Homepage Hero
2. Our Story full-bleed heritage photo
3. Signature Dishes section (subtle, image-only)
4. Section transition dividers (kolam motif — see doc 05)

**Where it is explicitly NOT used:** Menu page (must stay perfectly still and scannable — parallax on a menu people are trying to read is a usability failure), Locations page, Contact page, forms.

---

## 2. Technical Approach

- **Library:** GSAP + ScrollTrigger, lazy-loaded only on pages that use it (code-split via dynamic import) to protect the performance budget in the TRD.
- **Technique:** `transform: translate3d()` only — never `top`/`margin` — to stay on the GPU-accelerated compositor thread and avoid layout thrash.
- **Wrapper component:** `<ParallaxSection>` (see TRD component architecture) accepts a `speed` prop (a ratio, not pixels) so designers/devs can tune feel without touching animation logic.
- **Reduced motion:** every `<ParallaxSection>` checks `prefers-reduced-motion` on mount. If reduced motion is requested, the section renders with **zero transform offset** — content is fully visible and static, never hidden or cropped.

```ts
// Pseudocode — ParallaxSection.tsx
const prefersReducedMotion = useReducedMotion();

useEffect(() => {
  if (prefersReducedMotion) return; // bail out entirely, ship static layout

  gsap.to(layerRef.current, {
    yPercent: speed * -20, // speed: -1 (foreground) to 1 (background)
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.6, // slight easing lag, not 1:1 — avoids the "sticky, laggy" feel
    },
  });
}, [prefersReducedMotion, speed]);
```

---

## 3. Section-by-Section Spec

### 3.1 Homepage Hero
**Layers (back to front), each at a different scroll speed ratio:**

| Layer | Content | Speed ratio | Notes |
|---|---|---|---|
| L0 — Background | Full-bleed photo: banana-leaf-and-tumbler top-down or kitchen ambience, subtly desaturated with a navy gradient overlay (`rgba(6,38,84,0.55)` at base per design system's "Dark Overlay / Premium Section" token) | 0.2 (slowest) | Establishes depth floor |
| L1 — Steam layer | Looping, low-opacity animated steam/mist SVG (see doc 05 for full spec), rises independently of scroll, gently drifts | n/a (time-based, not scroll-based) | This layer is **not** parallax — it's ambient; listed here for compositing order only |
| L2 — Signature motion | The filter-coffee-pour signature moment (see doc 05 §2) plays once on load, then rests as a static brass-tumbler illustration that receives its own gentle parallax | 0.5 | The one "hero" motion moment per the frontend-design principle: spend boldness in one place |
| L3 — Headline + subline + CTAs | Foreground text block | 0.8 (fastest, moves closest to 1:1 with scroll, i.e. nearly static relative to viewport) | Text must never lag noticeably behind scroll input — legibility over effect |

**Entry behavior:** on first paint, L2's signature animation plays (≈1.4s). Scroll-linked parallax only activates once the user begins scrolling — the load moment and the scroll moment are sequential, not simultaneous, to avoid visual competition.

**Exit behavior:** as the hero scrolls out, L0 and L2 continue their slow parallax drift until the section is fully out of viewport, then `ScrollTrigger` is killed for that instance (cleanup on unmount) to free GPU resources for the next section.

### 3.2 Our Story — Full-Bleed Heritage Photo
- Single-layer parallax, speed ratio **0.3**
- Image scales from `104%` to `100%` width as it enters/exits viewport (a subtle "settle" — GSAP `scale` tween paired with the translate, referencing the same ScrollTrigger instance to stay in sync)
- Overlaid pull-quote text (if the client supplies a real founder quote) sits at speed ratio **0.9**, near-static, for legibility

### 3.3 Signature Dishes Section
- Each dish photo card gets a very subtle **0.1 speed ratio** internal image parallax (image is 110% of card size, shifts slightly within its frame as the card scrolls through viewport)
- This is intentionally the most restrained parallax on the site — these cards need to feel calm and appetizing, not busy. Cards do **not** parallax relative to each other, only the image within its own frame.

### 3.4 Section Transition Dividers (Kolam Motif)
- Not a photo parallax — a **scroll-triggered SVG stroke-draw** animation (technically a scroll-linked reveal, documented fully in doc 05 §1)
- Included here because it uses the same `ScrollTrigger` scrub mechanism: the kolam pattern "draws itself" in sync with scroll position as it enters the viewport, then holds complete

---

## 4. Mobile Behavior

- Parallax speed ratios are **halved** on viewports < 640px (e.g., Hero L0 becomes 0.1 instead of 0.2) — mobile scroll is typically faster/flickier (touch-driven), and aggressive parallax reads as janky rather than premium on small screens
- The Hero signature motion (L2) still plays on load on mobile, but its ongoing scroll-parallax is disabled below 640px — it settles to a fully static illustration after the initial play, prioritizing scroll performance over ambient motion
- All `scrub` values increase slightly on mobile (`0.6` → `0.8`) to smooth out variable touch-scroll velocity

---

## 5. Performance Guardrails

- Maximum of **3 simultaneous active ScrollTrigger instances** at any scroll position — sections outside the viewport ± one screen height have their triggers disabled (`ScrollTrigger.batch` with `once: false` but visibility-gated)
- All parallax images use `will-change: transform` **only while their ScrollTrigger is active**, removed on exit to avoid unnecessary compositor layers sitting idle
- No parallax element ever affects document flow/height — all effects are transform-only, so CLS remains 0 contribution from parallax
- QA checklist item: profile with Chrome DevTools Performance panel on a throttled mid-tier Android profile; hero scroll sequence must sustain ≥ 50fps
