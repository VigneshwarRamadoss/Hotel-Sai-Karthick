/**
 * Single source of truth for operational content.
 * CMS-ready: every field below maps 1:1 to a future headless CMS document.
 *
 * IMPORTANT: values wrapped in TBC() are UNCONFIRMED placeholders.
 * Nothing here may be invented — replace only with client-confirmed facts.
 */

export const TBC = (label: string) => `[To be confirmed — ${label}]`;

export type Branch = {
  slug: "pattukkottai" | "trichy";
  name: string;
  city: string;
  addressLines: string[];
  phone: string | null;
  whatsapp: string | null;
  directionsUrl: string | null;
  hours: { label: string; time: string }[];
  fssai: string | null;
  mapEmbedUrl: string | null;
};

export const branches: Branch[] = [
  {
    slug: "pattukkottai",
    name: "Hotel Sai Karthik — Pattukkottai",
    city: "Pattukkottai",
    addressLines: [TBC("street address"), "Pattukkottai, Thanjavur District, Tamil Nadu"],
    phone: null,
    whatsapp: null,
    directionsUrl: null,
    hours: [
      { label: "Breakfast", time: TBC("breakfast hours") },
      { label: "Lunch", time: TBC("lunch hours") },
      { label: "Evening Tiffin", time: TBC("evening hours") },
    ],
    fssai: null,
    mapEmbedUrl: null,
  },
  {
    slug: "trichy",
    name: "Hotel Sai Karthik — Trichy",
    city: "Trichy",
    addressLines: [TBC("street address"), "Tiruchirappalli, Tamil Nadu"],
    phone: null,
    whatsapp: null,
    directionsUrl: null,
    hours: [
      { label: "Breakfast", time: TBC("breakfast hours") },
      { label: "Lunch", time: TBC("lunch hours") },
      { label: "Evening Tiffin", time: TBC("evening hours") },
    ],
    fssai: null,
    mapEmbedUrl: null,
  },
];

export const site = {
  name: "Hotel Sai Karthik",
  tagline: "Pure vegetarian tiffin house. Tradition treated as craft.",
  nameTamil: "ஹோட்டல் சாய் கார்த்திக்",
  description:
    "Hotel Sai Karthik is a pure vegetarian South Indian tiffin house in Pattukkottai and Trichy — breakfast tiffin, full South Indian meals and evening tiffin, served the way they always have been.",
  ordering: {
    // Ordering partner links pending client confirmation.
    swiggy: null as string | null,
    zomato: null as string | null,
    direct: null as string | null,
  },
  reservation: {
    // v1 has no booking engine; enquiries are handled by phone/email.
    email: null as string | null,
    policy: TBC("reservation & group-seating policy"),
  },
  social: {
    instagram: null as string | null,
    facebook: null as string | null,
  },
  awards: TBC("award & press mentions"),
};

export const navLinks = [
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "Our Story" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Locations" },
] as const;
