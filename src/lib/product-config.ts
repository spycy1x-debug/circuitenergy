// =====================================================================
// Seralie — product configuration
// =====================================================================

/**
 * Back-engraving is not yet confirmed with the supplier.
 * Set to false to remove "Free engraving on the back" from every tier.
 */
export const SHOW_BACK_ENGRAVING = true;

export type FinishId = "gold" | "silver" | "rose-gold";

export const FINISHES: { id: FinishId; label: string; detail: string; swatch: string }[] = [
  { id: "gold", label: "18K Gold Plated", detail: "18K gold over hypoallergenic stainless steel", swatch: "#C6A664" },
  { id: "silver", label: "Polished Silver", detail: "Rhodium-finished hypoallergenic stainless steel", swatch: "#C7C9CB" },
  {
    id: "rose-gold",
    label: "18K Rose Gold Plated",
    detail: "18K rose gold over hypoallergenic stainless steel",
    swatch: "#D6A28C",
  },
];


export type TierId = "one" | "three" | "six";

/** A bonus included with a tier. `value` is what it would otherwise cost. */
export type Extra = { label: string; value: number };

export type Tier = {
  id: TierId;
  label: string;
  pieces: number;
  badge?: string;
  /** Always-included essentials — no price attached. */
  includes: string[];
  /** Bonuses shown with their value struck out and marked FREE. */
  extras: Extra[];
  /** Shipping line: null means free shipping, a number is the charge. */
  shipping: number | null;
  /** Single Shopify variant — finish is no longer part of the variant. */
  variantId: string;
};

const ENGRAVING: Extra[] = SHOW_BACK_ENGRAVING ? [{ label: "Engraving on the back", value: 19 }] : [];

export const TIERS: Tier[] = [
  {
    id: "one",
    label: "1 Necklace",
    pieces: 1,
    includes: ["One custom engraved pendant + chain", "Digital proof before we engrave"],
    extras: [...ENGRAVING],
    shipping: 2.99,
    variantId: "48859433238682",
  },
  {
    id: "three",
    label: "Buy 2 Get 1 Free",
    pieces: 3,
    badge: "Most popular",
    includes: ["Three custom engraved pendants + chains", "Digital proof before we engrave"],
    extras: [
      ...ENGRAVING,
      { label: "Their portrait as a downloadable file", value: 29 },
      { label: "Matching phone lock-screen wallpaper", value: 19 },
    ],
    shipping: null,
    variantId: "48859433336986",
  },
  {
    id: "six",
    label: "Buy 3 Get 3 Free",
    pieces: 6,
    badge: "Best value",
    includes: ["Six custom engraved pendants + chains", "Digital proof before we engrave"],
    extras: [
      ...ENGRAVING,
      { label: "Their portrait as a downloadable file", value: 29 },
      { label: "Matching phone lock-screen wallpaper", value: 19 },
    ],
    shipping: null,
    variantId: "48859433435290",
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
