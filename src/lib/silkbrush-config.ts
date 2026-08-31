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
};

export const TIERS: Tier[] = [
  { id: "1pk", label: "1 Brush", price: 29.99, compareAt: null, perUnit: 29.99, saves: null, tag: null, variantId: "49137549574298" },
  { id: "2pk", label: "2 Brushes", subLabel: "One for home, one for your bag.", price: 49.99, compareAt: 59.98, perUnit: 25.0, saves: 9.99, tag: "MOST POPULAR", variantId: "49137550491802" },
  { id: "3pk", label: "3 Brushes", price: 67.99, compareAt: 89.97, perUnit: 22.66, saves: 21.98, tag: "BEST VALUE", variantId: "49137550524570" },
];

export const DEFAULT_TIER = "2pk";

export const tierCheckoutUrl = (t: Tier) => `${STORE_URL}/cart/${t.variantId}:1`;

/**
 * Shopify variant ID for the SilkBrush™.
 * Replace with the real numeric variant ID from Shopify to enable checkout.
 */
export const VARIANT_ID = "";

/** Shipping protection add-on (optional, offered in the cart). */
export const PROTECTION_VARIANT_ID = "48890343030938";
export const PROTECTION_PRICE = 3.99;

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
