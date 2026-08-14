# Food Menu — Hotel Sai Karthik
**Engineered Menu Document | v1.0**
*Covers menu engineering rationale + full structured menu content for Breakfast, Lunch, and Evening Tiffin*

---

## Part A — Menu Engineering Rationale

A menu on a website has a different job than a printed menu: nobody is being upsold by a server, and there's no scarcity pressure from other diners at the table. Its entire job is **decision confidence** — convincing someone, before they've left the house, that they know exactly what they'll get and that it will be good. Every structural choice below serves that job.

### A.1 Category Naming Sells, Not Just Labels
Instead of a flat alphabetical list, items are grouped into named categories that mean something to a diner deciding what kind of meal they want (*"Dosa Varieties"* vs. *"One-Pot Specials"*), not internal kitchen categories. This mirrors how people actually think about tiffin: "I want something light and steamed" vs. "I want a proper dosa."

### A.2 The Eye-Scan Pattern (Golden Triangle)
On a scannable digital menu, attention lands first on the **top of each category**, then drifts to the **first 1–2 items**, with a secondary landing on whatever is visually distinguished (bordered, flagged, or paired with an image). Signature items are therefore deliberately placed **first within their category**, not buried mid-list — this is a placement decision, not just a badge.

### A.3 Signature Flagging, Used Sparingly
A small gold corner marker (per the UI/UX brief and animation spec) marks **"Sai Karthik Special"** items — capped at 2–3 per category. Flagging everything flags nothing; scarcity is what makes the marker meaningful.

### A.4 Descriptive, Sensory Language — Not Just Names
Research on menu psychology consistently shows that a described dish ("crisp-edged, ghee-roasted to a deep gold, served with three chutneys and drumstick sambar") outperforms a bare dish name for both perceived value and actual satisfaction. Every item below carries a short sensory line — never generic ("delicious," "tasty") — describing texture, technique, or a real accompaniment.

### A.5 Price Presentation (once pricing is confirmed)
- Prices are **not** lined up in a right-aligned column — a column of numbers invites price-comparison scanning rather than dish selection. Prices sit inline, close to the dish name, in a smaller/lighter weight than the dish name itself.
- No currency symbol repetition clutter — ₹ shown once per section header context is sufficient; individual line items can show the number alone if the design system's type hierarchy makes the context unambiguous. (Final call belongs to visual QA — legibility wins if ambiguity risk exists.)
- **Mini Tiffin** and combination items function as an anchor: their price makes standalone á la carte pricing feel reasonable by comparison, and they solve decision fatigue for undecided first-time visitors.

### A.6 Primacy & Recency
Within a category, the item placed **first** and the item placed **last** are remembered best. Signature and high-margin items go first; a strong, comforting "safe choice" (e.g., Plain Dosa, Curd Rice) anchors the end of a list — never bury the crowd-pleaser in the middle where it's most likely to be skimmed past.

### A.7 The Stars/Plowhorses/Puzzles/Dogs Framework (for post-launch iteration)
Once real sales data exists, the client/agency should classify every item on a **popularity × profitability** matrix:
- **Stars** (high popularity, high margin) → feature prominently, keep exactly as-is
- **Plowhorses** (high popularity, low margin) → keep visible for traffic, consider portioning/pricing review
- **Puzzles** (low popularity, high margin) → reposition using §A.2/A.4 techniques, or add better description/photo
- **Dogs** (low popularity, low margin) → candidates for removal in a future menu revision

This matrix is **not filled in here** — it requires real sales data the agency doesn't have. It is documented so the client's team has a repeatable process for menu revisions after launch.

### A.8 Dietary Trust Signals
Every item is tagged for dietary clarity (see UI/UX Brief §2.1 on the Leaf Green vegetarian mark). Items containing onion (a small but meaningful subset, relevant to Jain and some Vaishnavite diners) are explicitly flagged **"contains onion"** rather than assuming vegetarian = universally suitable — this is a trust-building precision, not a limitation.

---

## Part B — Full Menu Content

*Prices shown as illustrative placeholders `[₹XX]` for layout/QA purposes only — final pricing pending client confirmation per branch, per PRD §8.*

### B.1 Breakfast
*Served from opening until late morning — see Locations page for exact per-branch hours.*

#### Tiffin Classics
| Item | Description | Tags |
|---|---|---|
| ★ **Sambar Idly** | Soft-steamed idlies soaked in hot drumstick sambar, finished with a spoon of ghee | Veg · Signature |
| Idly | Soft-steamed rice cakes served with sambar and coconut chutney | Veg |
| Medhu Vadai | Crisp-shelled, fluffy-centered lentil doughnuts, fried to order | Veg |
| Sambar Vadai | Medhu vadai soaked in hot sambar just before serving | Veg |

#### One-Pot Specials
| Item | Description | Tags |
|---|---|---|
| ★ **Ghee Pongal** | Rice and moong dal slow-cooked with ghee, cracked pepper, and cumin | Veg · Signature |
| Rava Kichadi | Semolina simmered with vegetables and mild spice, a lighter breakfast option | Veg |
| Poori Masala | Puffed golden pooris with a lightly spiced potato masala | Veg |
| ★ **Idiyappam with Kurma** | Steamed rice-flour noodles paired with a coconut-based vegetable kurma | Veg · Signature |

#### Dosa Varieties
| Item | Description | Tags |
|---|---|---|
| ★ **Ghee Roast** | Dosa roasted slow in ghee until deep gold and shatter-crisp at the edges | Veg · Signature |
| Plain Dosa | The everyday classic, thin and evenly crisped | Veg |
| Masala Dosa | Crisp dosa folded over a lightly spiced potato filling | Veg |
| Ghee Dosa | Dosa finished with a generous hand of ghee, no filling, all crispness | Veg |
| Podi Dosa | Dosa layered with house gunpowder podi and a swipe of ghee | Veg |
| Ghee Podi Dosa | Podi dosa with extra ghee, for the true podi loyalist | Veg |
| Onion Dosa | Dosa studded with finely chopped onion, crisped into the batter | Veg · Contains onion |
| Rava Dosa | Lacy, thin semolina dosa, crisp throughout | Veg |
| Onion Rava Dosa | Rava dosa with onion folded through the lace | Veg · Contains onion |
| Onion Rava Masala Dosa | Rava dosa, onion, and potato masala together — the full spread | Veg · Contains onion |

#### Sampler & Sweet
| Item | Description | Tags |
|---|---|---|
| Mini Tiffin | A small-portion sampler of two or three tiffin items — the easy way to try Sai Karthik for the first time | Veg |
| Rava Kesari | Warm semolina sweet, ghee-rich, cardamom-scented, finished with cashew | Veg |

#### Beverages
| Item | Description | Tags |
|---|---|---|
| ★ **Filter Coffee** | Decoction brewed slow, poured tumbler-to-davara for a proper head of froth | Veg · Signature |
| Tea | Strong, milk-boiled tea, served hot | Veg |

---

### B.2 Lunch
*Served through the midday meal window — see Locations page for exact per-branch hours.*

#### Meals
| Item | Description | Tags |
|---|---|---|
| ★ **Sai Karthik Special South Indian Meals** | The full spread: rice, sambar, rasam, kootu, poriyal, curd, appalam, and payasam, refilled as needed | Veg · Signature |
| Mini Lunch | A smaller-portion version of the full meals, for a lighter midday plate | Veg |
| North Indian Meals | Roti-and-curry style plate with dal, sabzi, rice, and curd | Veg |

#### Variety Rice
| Item | Description | Tags |
|---|---|---|
| Sambar Rice | Rice folded through with sambar and a tempering of mustard and curry leaf | Veg |
| Curd Rice | Cooling curd rice, tempered, finished with a touch of ginger | Veg |
| Lemon Rice | Bright, tangy rice tempered with mustard, curry leaf, and peanut | Veg |
| Tamarind / Puliyodharai Rice | Tamarind-tempered rice, deeply savoury with a sharp tang | Veg |
| Jeera Rice | Cumin-scented rice, simple and aromatic | Veg |

#### Biryani & Pulao
| Item | Description | Tags |
|---|---|---|
| Veg Biryani / Pulao | Slow-layered rice with mixed vegetables and whole spice, several varieties available | Veg |
| Paneer Biryani | Biryani layered with paneer, spiced and finished with fried onion | Veg · Contains onion |
| Mushroom Biryani | Biryani built around mushroom for a deeper, earthier note | Veg |

#### Breads
| Item | Description | Tags |
|---|---|---|
| Chapati / Roti | Soft, hand-rolled whole wheat bread, made fresh to order | Veg |
| Naan | Leavened, tandoor-style bread, soft-centered with a lightly charred edge | Veg · Contains gluten |

#### Curries & Gravies
| Item | Description | Tags |
|---|---|---|
| Paneer Butter Masala | Paneer in a tomato-cashew gravy, mildly sweet and rich | Veg |
| Kadai Paneer | Paneer with capsicum and onion in a coarsely ground masala | Veg · Contains onion |
| Vegetable Curries | Seasonal mixed vegetable curry, prepared fresh daily | Veg |
| Dal Fry | Yellow lentils tempered with garlic, cumin, and dried red chilli | Veg |
| Dal Tadka | Dal finished with a hot ghee tempering, smokier than dal fry | Veg |

#### Traditional Sides
| Item | Description | Tags |
|---|---|---|
| Poriyal | Lightly stir-fried vegetable with coconut and mustard tempering | Veg |
| Kootu | Vegetable and lentil simmered soft, coconut-ground finish | Veg |
| Kara Kuzhambu | Tangy, spiced tamarind gravy with vegetables — bold and peppery | Veg |
| Rasam | Thin, peppery tamarind broth, the meal's digestive finish | Veg |
| Sambar | Lentil and vegetable stew, the everyday backbone of the meal | Veg |
| Curd | Fresh set curd, served plain alongside the meal | Veg |
| Appalam | Thin lentil wafer, roasted or fried, for crunch | Veg |

#### Sweet Finish
| Item | Description | Tags |
|---|---|---|
| Payasam | Milk-based sweet, slow-simmered with jaggery or sugar, served warm or chilled depending on variety | Veg |

---

### B.3 Evening Tiffin
*Served from late afternoon into the evening — see Locations page for exact per-branch hours.*

#### Tiffin Classics
| Item | Description | Tags |
|---|---|---|
| Sambar Idly | Soft-steamed idlies soaked in hot drumstick sambar | Veg |
| Idly | Soft-steamed rice cakes served with sambar and coconut chutney | Veg |
| Medhu Vadai | Crisp-shelled, fluffy-centered lentil doughnuts, fried to order | Veg |
| Curd Vadai | Medhu vadai soaked in seasoned curd, cooling and mild | Veg |
| Sambar Vadai | Medhu vadai soaked in hot sambar | Veg |

#### Dosa Varieties
| Item | Description | Tags |
|---|---|---|
| ★ **Ghee Roast** | Dosa roasted slow in ghee until deep gold and shatter-crisp at the edges | Veg · Signature |
| Plain Dosa | The everyday classic, thin and evenly crisped | Veg |
| Masala Dosa | Crisp dosa folded over a lightly spiced potato filling | Veg |
| Podi Dosa | Dosa layered with house gunpowder podi and a swipe of ghee | Veg |
| Ghee Podi Dosa | Podi dosa with extra ghee | Veg |
| Onion Dosa | Dosa studded with finely chopped onion | Veg · Contains onion |
| Rava Dosa | Lacy, thin semolina dosa, crisp throughout | Veg |
| Onion Rava Dosa | Rava dosa with onion folded through | Veg · Contains onion |
| Onion Rava Masala Dosa | Rava dosa, onion, and potato masala together | Veg · Contains onion |

#### Evening Specials
| Item | Description | Tags |
|---|---|---|
| Poori Masala | Puffed golden pooris with lightly spiced potato masala | Veg |
| ★ **Idiyappam with Kurma** | Steamed rice-flour noodles with coconut-based vegetable kurma | Veg · Signature |
| Mini Tiffin | Small-portion sampler, ideal for a lighter evening bite | Veg |
| Chaat / Snack Items | Rotating evening snack selection, where available — confirm current offerings per branch | Veg · Availability varies |

#### Beverages
| Item | Description | Tags |
|---|---|---|
| ★ **Filter Coffee** | Decoction brewed slow, poured tumbler-to-davara for a proper head of froth | Veg · Signature |
| Tea | Strong, milk-boiled tea, served hot | Veg |

---

## Part C — Presentation Notes for Development

- Render each category as its own `<section>` with a real `<h3>` heading (accessibility + SEO, per TRD §7)
- The ★ Signature marker maps to `MenuItem.signature = true` in the data model (TRD §3.2) — never hard-code the flag in markup
- "Contains onion" and other dietary tags render as small text chips, never color-only (per UI/UX Brief §6)
- Category order within each meal period follows the sequence above — this order was chosen deliberately per §A.2 and should not be alphabetized by a future content editor without revisiting this rationale
