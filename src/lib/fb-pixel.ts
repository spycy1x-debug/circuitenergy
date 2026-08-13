// =====================================================================
// Meta Pixel — standard events (base code lives in __root.tsx)
// Dataset / Pixel ID: 2241686346674827
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

function send(name: string, params: Record<string, unknown>) {
  const value = Number(params["value"]);
  if (!Number.isFinite(value) || value <= 0) return false; // Meta can't optimize without a real value
  if (typeof window === "undefined" || typeof window.fbq !== "function") return false;
  window.fbq("track", name, { ...params, value, currency: "USD" }, { eventID: eventId() });
  return true;
}

/** Fires as soon as fbq exists — retries briefly if the base pixel is still loading. */
function track(name: string, params: Record<string, unknown>, sessionKey?: string) {
  if (typeof window === "undefined") return;
  if (sessionKey && alreadySent(sessionKey)) return;
  let tries = 0;
  const attempt = () => {
    if (send(name, params)) {
      if (sessionKey) markSent(sessionKey);
      return;
    }
    if (typeof window.fbq !== "function" && tries++ < 40) setTimeout(attempt, 250);
  };
  attempt();
}

function alreadySent(key: string) {
  try {
    return !!sessionStorage.getItem(key);
  } catch {
    return false;
  }
}

function markSent(key: string) {
  try {
    sessionStorage.setItem(key, "1");
  } catch {
    /* private mode — ignore */
  }
}


export const PRODUCT_NAME = "NOURISH™ Digestive Support + Daily Essentials";

export function trackViewContent(variantId: string, price: number) {
  track(
    "ViewContent",
    {
      content_type: "product",
      content_ids: [variantId],
      content_name: PRODUCT_NAME,
      value: price,
    },
    `fb_vc_${variantId}`,
  );
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
