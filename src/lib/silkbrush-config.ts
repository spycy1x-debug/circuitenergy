export const STORE_URL = "https://checkout.seralie.com";

export const PRODUCT_NAME = "Seralie SilkBrush™";
export const PRICE = 37.99;

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
export const REVIEW_COUNT: number | null = null;

export const money = (n: number) => `$${n.toFixed(2)}`;

export function checkoutUrl(qty: number, protection = false) {
  if (!VARIANT_ID) return null;
  const lines = [`${VARIANT_ID}:${Math.max(1, qty)}`];
  if (protection) lines.push(`${PROTECTION_VARIANT_ID}:1`);
  return `${STORE_URL}/cart/${lines.join(",")}`;
}
