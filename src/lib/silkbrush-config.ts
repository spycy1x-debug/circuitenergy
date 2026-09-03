export const STORE_URL = "https://checkout.seralie.com";

export const PRODUCT_NAME = "Seralie SilkBrush™";
export const PRICE = 36.99;

export type Tier = {
  id: string;
  label: string;
  subLabel?: string;
  price: number;
  compareAt: number | null;
  perUnit: number;
  saves: number | null;
  tag: string | null;
  variantId: string;
  /** Optional free-gift Shopify variant added as a $0.00 line at checkout. */
  giftVariantId?: string;
};

/** VARIANT A — the original, live offer. Do not change without ending the A/B test. */
export const TIERS: Tier[] = [
  { id: "1pk", label: "1 Brush", price: 29.99, compareAt: 39.99, perUnit: 29.99, saves: 10.0, tag: null, variantId: "49137549574298" },
  { id: "2pk", label: "2 Brushes", subLabel: "One for home, one for your bag.", price: 49.99, compareAt: 79.98, perUnit: 25.0, saves: 29.99, tag: "MOST POPULAR", variantId: "49137550491802" },
  { id: "3pk", label: "3 Brushes", price: 67.99, compareAt: 119.97, perUnit: 22.66, saves: 51.98, tag: "BEST VALUE", variantId: "49137550524570" },
];

/** Shopify variant for the $0.00 free gift line item. */
export const GIFT_VARIANT_ID = "49175121428634";
export const GIFT_NAME = "FREE Scalp Scrubber";

/** VARIANT B — higher-priced offer with a free scalp scrubber on the 2- and 3-packs. */
export const TIERS_B: Tier[] = [
  { id: "b1pk", label: "1 Brush", price: 34.99, compareAt: 49.99, perUnit: 34.99, saves: 15.0, tag: null, variantId: "49175120150682" },
  {
    id: "b2pk",
    label: "2 Brushes + FREE GIFT",
    subLabel: "Includes a FREE Scalp Scrubber.",
    price: 54.99,
    compareAt: 99.98,
    perUnit: 27.5,
    saves: 44.99,
    tag: "MOST POPULAR",
    variantId: "49175120183450",
    giftVariantId: GIFT_VARIANT_ID,
  },
  {
    id: "b3pk",
    label: "3 Brushes + FREE GIFT",
    subLabel: "Includes a FREE Scalp Scrubber.",
    price: 74.99,
    compareAt: 139.97,
    perUnit: 25.0,
    saves: 64.98,
    tag: "BEST VALUE",
    variantId: "49175120216218",
    giftVariantId: GIFT_VARIANT_ID,
  },
];

export const ALL_TIERS: Tier[] = [...TIERS, ...TIERS_B];

export const DEFAULT_TIER = "2pk";
export const DEFAULT_TIER_B = "b2pk";


export const tierCheckoutUrl = (t: Tier) => `${STORE_URL}/cart/${t.variantId}:1`;

/**
 * Shopify variant ID for the SilkBrush™.
 * Replace with the real numeric variant ID from Shopify to enable checkout.
 */
export const VARIANT_ID = "";

/** Shipping protection add-on (optional, offered in the cart). */
export const PROTECTION_VARIANT_ID = "48890343030938";
export const PROTECTION_PRICE = 3.95;

export const RATING = 4.8;
/** Set to a real number once reviews are collected. Null hides the count. */
export const REVIEW_COUNT: number | null = 2348;

export const money = (n: number) => `$${n.toFixed(2)}`;

export function checkoutUrl(qty: number, protection = false) {
  if (!VARIANT_ID) return null;
  const lines = [`${VARIANT_ID}:${Math.max(1, qty)}`];
  if (protection) lines.push(`${PROTECTION_VARIANT_ID}:1`);
  return `${STORE_URL}/cart/${lines.join(",")}`;
}
