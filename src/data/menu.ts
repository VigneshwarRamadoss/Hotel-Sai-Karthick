/**
 * Menu content — CMS-ready shape.
 * Prices are illustrative placeholders until the client confirms per-branch pricing.
 */

export type DietTag = "Vegetarian" | "Contains onion" | "Contains gluten" | "Availability varies";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  tags: DietTag[];
  signature?: boolean;
  /** null = price pending client confirmation */
  price: number | null;
};

export type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

export type MealPeriod = {
  id: "breakfast" | "lunch" | "evening-tiffin";
  name: string;
  note: string;
  categories: MenuCategory[];
};

const veg: DietTag[] = ["Vegetarian"];
const vegOnion: DietTag[] = ["Vegetarian", "Contains onion"];

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const item = (
  name: string,
  description: string,
  tags: DietTag[] = veg,
  signature = false,
): MenuItem => ({ id: slug(name), name, description, tags, signature, price: null });

export const mealPeriods: MealPeriod[] = [
  {
    id: "breakfast",
    name: "Breakfast",
    note: "Served from opening until late morning — exact per-branch hours on the Locations page.",
    categories: [
      {
        id: "tiffin-classics",
        name: "Tiffin Classics",
        items: [
          item("Sambar Idly", "Soft-steamed idlies soaked in hot drumstick sambar, finished with a spoon of ghee", veg, true),
          item("Idly", "Soft-steamed rice cakes served with sambar and coconut chutney"),
          item("Medhu Vadai", "Crisp-shelled, fluffy-centered lentil doughnuts, fried to order"),
          item("Sambar Vadai", "Medhu vadai soaked in hot sambar just before serving"),
        ],
      },
      {
        id: "one-pot-specials",
        name: "One-Pot Specials",
        items: [
          item("Ghee Pongal", "Rice and moong dal slow-cooked with ghee, cracked pepper, and cumin", veg, true),
          item("Rava Kichadi", "Semolina simmered with vegetables and mild spice, a lighter breakfast option"),
          item("Poori Masala", "Puffed golden pooris with a lightly spiced potato masala"),
          item("Idiyappam with Kurma", "Steamed rice-flour noodles paired with a coconut-based vegetable kurma", veg, true),
        ],
      },
      {
        id: "dosa-varieties",
        name: "Dosa Varieties",
        items: [
          item("Ghee Roast", "Dosa roasted slow in ghee until deep gold and shatter-crisp at the edges", veg, true),
          item("Plain Dosa", "The everyday classic, thin and evenly crisped"),
          item("Masala Dosa", "Crisp dosa folded over a lightly spiced potato filling"),
          item("Ghee Dosa", "Dosa finished with a generous hand of ghee, no filling, all crispness"),
          item("Podi Dosa", "Dosa layered with house gunpowder podi and a swipe of ghee"),
          item("Ghee Podi Dosa", "Podi dosa with extra ghee, for the true podi loyalist"),
          item("Onion Dosa", "Dosa studded with finely chopped onion, crisped into the batter", vegOnion),
          item("Rava Dosa", "Lacy, thin semolina dosa, crisp throughout"),
          item("Onion Rava Dosa", "Rava dosa with onion folded through the lace", vegOnion),
          item("Onion Rava Masala Dosa", "Rava dosa, onion, and potato masala together — the full spread", vegOnion),
        ],
      },
      {
        id: "sampler-sweet",
        name: "Sampler & Sweet",
        items: [
          item("Mini Tiffin", "A small-portion sampler of two or three tiffin items — the easy way to try Sai Karthik for the first time"),
          item("Rava Kesari", "Warm semolina sweet, ghee-rich, cardamom-scented, finished with cashew"),
        ],
      },
      {
        id: "beverages",
        name: "Beverages",
        items: [
          item("Filter Coffee", "Decoction brewed slow, poured tumbler-to-davara for a proper head of froth", veg, true),
          item("Tea", "Strong, milk-boiled tea, served hot"),
        ],
      },
    ],
  },
  {
    id: "lunch",
    name: "Lunch",
    note: "Served through the midday meal window — exact per-branch hours on the Locations page.",
    categories: [
      {
        id: "meals",
        name: "Meals",
        items: [
          item("Sai Karthik Special South Indian Meals", "The full spread: rice, sambar, rasam, kootu, poriyal, curd, appalam, and payasam, refilled as needed", veg, true),
          item("Mini Lunch", "A smaller-portion version of the full meals, for a lighter midday plate"),
          item("North Indian Meals", "Roti-and-curry style plate with dal, sabzi, rice, and curd"),
        ],
      },
      {
        id: "variety-rice",
        name: "Variety Rice",
        items: [
          item("Sambar Rice", "Rice folded through with sambar and a tempering of mustard and curry leaf"),
          item("Curd Rice", "Cooling curd rice, tempered, finished with a touch of ginger"),
          item("Lemon Rice", "Bright, tangy rice tempered with mustard, curry leaf, and peanut"),
          item("Tamarind / Puliyodharai Rice", "Tamarind-tempered rice, deeply savoury with a sharp tang"),
          item("Jeera Rice", "Cumin-scented rice, simple and aromatic"),
        ],
      },
      {
        id: "biryani-pulao",
        name: "Biryani & Pulao",
        items: [
          item("Veg Biryani / Pulao", "Slow-layered rice with mixed vegetables and whole spice, several varieties available"),
          item("Paneer Biryani", "Biryani layered with paneer, spiced and finished with fried onion", vegOnion),
          item("Mushroom Biryani", "Biryani built around mushroom for a deeper, earthier note"),
        ],
      },
      {
        id: "breads",
        name: "Breads",
        items: [
          item("Chapati / Roti", "Soft, hand-rolled whole wheat bread, made fresh to order"),
          item("Naan", "Leavened, tandoor-style bread, soft-centered with a lightly charred edge", ["Vegetarian", "Contains gluten"]),
        ],
      },
      {
        id: "curries-gravies",
        name: "Curries & Gravies",
        items: [
          item("Paneer Butter Masala", "Paneer in a tomato-cashew gravy, mildly sweet and rich"),
          item("Kadai Paneer", "Paneer with capsicum and onion in a coarsely ground masala", vegOnion),
          item("Vegetable Curries", "Seasonal mixed vegetable curry, prepared fresh daily"),
          item("Dal Fry", "Yellow lentils tempered with garlic, cumin, and dried red chilli"),
          item("Dal Tadka", "Dal finished with a hot ghee tempering, smokier than dal fry"),
        ],
      },
      {
        id: "traditional-sides",
        name: "Traditional Sides",
        items: [
          item("Poriyal", "Lightly stir-fried vegetable with coconut and mustard tempering"),
          item("Kootu", "Vegetable and lentil simmered soft, coconut-ground finish"),
          item("Kara Kuzhambu", "Tangy, spiced tamarind gravy with vegetables — bold and peppery"),
          item("Rasam", "Thin, peppery tamarind broth, the meal's digestive finish"),
          item("Sambar", "Lentil and vegetable stew, the everyday backbone of the meal"),
          item("Curd", "Fresh set curd, served plain alongside the meal"),
          item("Appalam", "Thin lentil wafer, roasted or fried, for crunch"),
        ],
      },
      {
        id: "sweet-finish",
        name: "Sweet Finish",
        items: [
          item("Payasam", "Milk-based sweet, slow-simmered with jaggery or sugar, served warm or chilled depending on variety"),
        ],
      },
    ],
  },
  {
    id: "evening-tiffin",
    name: "Evening Tiffin",
    note: "Served from late afternoon into the evening — exact per-branch hours on the Locations page.",
    categories: [
      {
        id: "tiffin-classics-evening",
        name: "Tiffin Classics",
        items: [
          item("Sambar Idly", "Soft-steamed idlies soaked in hot drumstick sambar"),
          item("Idly", "Soft-steamed rice cakes served with sambar and coconut chutney"),
          item("Medhu Vadai", "Crisp-shelled, fluffy-centered lentil doughnuts, fried to order"),
          item("Curd Vadai", "Medhu vadai soaked in seasoned curd, cooling and mild"),
          item("Sambar Vadai", "Medhu vadai soaked in hot sambar"),
        ],
      },
      {
        id: "dosa-varieties-evening",
        name: "Dosa Varieties",
        items: [
          item("Ghee Roast", "Dosa roasted slow in ghee until deep gold and shatter-crisp at the edges", veg, true),
          item("Plain Dosa", "The everyday classic, thin and evenly crisped"),
          item("Masala Dosa", "Crisp dosa folded over a lightly spiced potato filling"),
          item("Podi Dosa", "Dosa layered with house gunpowder podi and a swipe of ghee"),
          item("Ghee Podi Dosa", "Podi dosa with extra ghee"),
          item("Onion Dosa", "Dosa studded with finely chopped onion", vegOnion),
          item("Rava Dosa", "Lacy, thin semolina dosa, crisp throughout"),
          item("Onion Rava Dosa", "Rava dosa with onion folded through", vegOnion),
          item("Onion Rava Masala Dosa", "Rava dosa, onion, and potato masala together", vegOnion),
        ],
      },
      {
        id: "evening-specials",
        name: "Evening Specials",
        items: [
          item("Poori Masala", "Puffed golden pooris with lightly spiced potato masala"),
          item("Idiyappam with Kurma", "Steamed rice-flour noodles with coconut-based vegetable kurma", veg, true),
          item("Mini Tiffin", "Small-portion sampler, ideal for a lighter evening bite"),
          item("Chaat / Snack Items", "Rotating evening snack selection, where available — confirm current offerings per branch", ["Vegetarian", "Availability varies"]),
        ],
      },
      {
        id: "beverages-evening",
        name: "Beverages",
        items: [
          item("Filter Coffee", "Decoction brewed slow, poured tumbler-to-davara for a proper head of froth", veg, true),
          item("Tea", "Strong, milk-boiled tea, served hot"),
        ],
      },
    ],
  },
];

/** Time-aware default meal period (per Web Flow §4.2 — never a static first tab). */
export function currentMealPeriodId(date = new Date()): MealPeriod["id"] {
  const h = date.getHours();
  if (h < 11) return "breakfast";
  if (h < 16) return "lunch";
  return "evening-tiffin";
}

export const signatureDishes = [
  { id: "ghee-roast", name: "Ghee Roast", note: "Roasted slow in ghee until deep gold and shatter-crisp at the edges." },
  { id: "ghee-pongal", name: "Ghee Pongal", note: "Rice and moong dal, cracked pepper, cumin, and an honest hand with the ghee." },
  { id: "filter-coffee", name: "Filter Coffee", note: "Decoction brewed slow, poured tumbler-to-davara for a proper head of froth." },
  { id: "special-meals", name: "Special Meals", note: "Rice, sambar, rasam, kootu, poriyal, curd, appalam, payasam — refilled as needed." },
];
