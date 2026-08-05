// =====================================================================
// Meta Pixel — standard events (base code lives in __root.tsx)
// Dataset / Pixel ID: 1969968856965318
// =====================================================================

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function eventId() {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  } catch {
    /* ignore */
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}-${Math.random().toString(16).slice(2)}`;
}

function track(name: string, params: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  const value = Number(params["value"]);
  if (!Number.isFinite(value) || value <= 0) return; // Meta can't optimize without a real value
  window.fbq("track", name, { ...params, value, currency: "USD" }, { eventID: eventId() });
}

/** Fires at most once per browser session for a given key (guards reload / back-nav). */
function oncePerSession(key: string) {
  if (typeof window === "undefined") return false;
  try {
    if (sessionStorage.getItem(key)) return false;
    sessionStorage.setItem(key, "1");
  } catch {
    /* private mode — allow */
  }
  return true;
}

export const PRODUCT_NAME = "Custom Pet Portrait Necklace";

export function trackViewContent(variantId: string, price: number) {
  if (!oncePerSession(`fb_vc_${variantId}`)) return;
  track("ViewContent", {
    content_type: "product",
    content_ids: [variantId],
    content_name: PRODUCT_NAME,
    value: price,
  });
}

export function trackAddToCart(variantId: string, value: number, numItems: number) {
  track("AddToCart", {
    content_type: "product",
    content_ids: [variantId],
    content_name: PRODUCT_NAME,
    value,
    num_items: numItems,
  });
}

export function trackInitiateCheckout(
  contentIds: string[],
  value: number,
  numItems: number,
) {
  track("InitiateCheckout", {
    content_type: "product",
    content_ids: contentIds,
    value,
    num_items: numItems,
  });
}
