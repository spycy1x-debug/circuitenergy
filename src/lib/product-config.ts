// =====================================================================
// Seralie — product configuration
// =====================================================================

/**
 * Back-engraving is not yet confirmed with the supplier.
 * Set to false to remove "Free engraving on the back" from every tier.
 */
export const SHOW_BACK_ENGRAVING = true;

export type FinishId = "gold" | "silver" | "rose-gold";

export const FINISHES: { id: FinishId; label: string; swatch: string }[] = [
  { id: "gold", label: "Gold", swatch: "#C6A664" },
  { id: "silver", label: "Silver", swatch: "#C7C9CB" },
  { id: "rose-gold", label: "Rose Gold", swatch: "#D6A28C" },
];

export type TierId = "one" | "three" | "six";

export type Tier = {
  id: TierId;
  label: string;
  pieces: number;
  badge?: string;
  includes: string[];
  variants: Record<FinishId, string>;
};

export const TIERS: Tier[] = [
  {
    id: "one",
    label: "1 Necklace",
    pieces: 1,
    includes: [
      "One custom engraved pendant + chain",
      ...(SHOW_BACK_ENGRAVING ? ["Free engraving on the back"] : []),
      "Digital proof before we engrave",
      "$2.99 shipping",
    ],
    variants: {
      gold: "48859433238682",
      silver: "48859433271450",
      "rose-gold": "48859433304218",
    },
  },
  {
    id: "three",
    label: "Buy 2 Get 1 Free",
    pieces: 3,
    badge: "Most popular",
    includes: [
      "Three custom engraved pendants + chains",
      ...(SHOW_BACK_ENGRAVING ? ["Free engraving on the back"] : []),
      "Digital proof before we engrave",
      "Their portrait as a downloadable file",
      "Matching phone lock-screen wallpaper",
      "Free shipping",
    ],
    variants: {
      gold: "48859433336986",
      silver: "48859433369754",
      "rose-gold": "48859433402522",
    },
  },
  {
    id: "six",
    label: "Buy 3 Get 3 Free",
    pieces: 6,
    badge: "Best value",
    includes: [
      "Six custom engraved pendants + chains",
      ...(SHOW_BACK_ENGRAVING ? ["Free engraving on the back"] : []),
      "Digital proof before we engrave",
      "Their portrait as a downloadable file",
      "Matching phone lock-screen wallpaper",
      "Free shipping",
    ],
    variants: {
      gold: "48859433435290",
      silver: "48859433468058",
      "rose-gold": "48859433500826",
    },
  },
];

export const PRODUCT_HANDLE_ID = "9068189778074";
export const PRODUCT_TITLE = "Pet Memorial Photo Necklace";

export function tierById(id: TierId): Tier {
  return TIERS.find((t) => t.id === id) ?? TIERS[0]!;
}

export function toGid(variantId: string) {
  return `gid://shopify/ProductVariant/${variantId}`;
}
