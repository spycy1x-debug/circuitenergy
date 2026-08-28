export const STORE_URL = "https://checkout.seralie.com";

export const PRODUCT_NAME = "Seralie SilkBrush™";
export const PRICE = 37.99;

/**
 * Shopify variant ID for the SilkBrush™.
 * Replace with the real numeric variant ID from Shopify to enable checkout.
 */
export const VARIANT_ID = "";

export const RATING = 4.8;
/** Set to a real number once reviews are collected. Null hides the count. */
export const REVIEW_COUNT: number | null = null;

export const money = (n: number) => `$${n.toFixed(2)}`;

export function checkoutUrl(qty: number) {
  if (!VARIANT_ID) return null;
  return `${STORE_URL}/cart/${VARIANT_ID}:${Math.max(1, qty)}`;
}
