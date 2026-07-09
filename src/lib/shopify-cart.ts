import { useSyncExternalStore } from "react";

// =====================================================================
// Shopify Storefront API — cart implementation
// =====================================================================

const DOMAIN = "xwkkv0-r0.myshopify.com";
const STOREFRONT_TOKEN = "27b060f0e9c0b8a83808f0165c32c501";
const API_VERSION = "2024-10";
const ENDPOINT = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`;

const LS_CART_ID = "circuit-shopify-cart-id";
const LS_CART_LINES = "circuit-shopify-cart-lines";
const LS_OVERRIDES = "seralie-cart-overrides";

// Per-variant display overrides (title/image) captured on add() so the cart
// always shows Seralie branding even when the Shopify product data is stale.
const overrides: Record<string, { title?: string; image?: string }> = {};

export type CartLine = {
  id: string; // shopify line id
  variantId: string; // gid://shopify/ProductVariant/...
  productTitle: string;
  variantTitle: string;
  image: string;
  unitPrice: number;
  quantity: number;
};

type State = {
  cartId: string | null;
  checkoutUrl: string | null;
  lines: CartLine[];
  isOpen: boolean;
  isLoading: boolean;
  bump: number; // increments to trigger badge animation
};

const listeners = new Set<() => void>();
const state: State = {
  cartId: null,
  checkoutUrl: null,
  lines: [],
  isOpen: false,
  isLoading: false,
  bump: 0,
};
let snapshot = "";

function commit() {
  snapshot = JSON.stringify(state);
  listeners.forEach((l) => l());
}

function persist() {
  if (typeof window === "undefined") return;
  if (state.cartId) localStorage.setItem(LS_CART_ID, state.cartId);
  localStorage.setItem(LS_CART_LINES, JSON.stringify({ lines: state.lines, checkoutUrl: state.checkoutUrl }));
  localStorage.setItem(LS_OVERRIDES, JSON.stringify(overrides));
}

function hydrate() {
  if (typeof window === "undefined") return;
  try {
    state.cartId = localStorage.getItem(LS_CART_ID);
    const raw = localStorage.getItem(LS_CART_LINES);
    if (raw) {
      const parsed = JSON.parse(raw);
      state.lines = parsed.lines || [];
      state.checkoutUrl = parsed.checkoutUrl || null;
    }
    const ovRaw = localStorage.getItem(LS_OVERRIDES);
    if (ovRaw) Object.assign(overrides, JSON.parse(ovRaw));
  } catch {
    /* ignore */
  }
  commit();
}

let hydrated = false;
function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  hydrate();
}

async function gql<T = any>(query: string, variables: any): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Shopify ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors.map((e: any) => e.message).join(", "));
  return json.data as T;
}

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            image { url }
            price { amount currencyCode }
            product { title featuredImage { url } }
          }
        }
      }
    }
  }
`;

function mapCart(cart: any) {
  state.cartId = cart.id;
  state.checkoutUrl = formatCheckoutUrl(cart.checkoutUrl);
  state.lines = (cart.lines?.edges || []).map((e: any) => {
    const n = e.node;
    const m = n.merchandise;
    const ov = overrides[m.id] || {};
    return {
      id: n.id,
      variantId: m.id,
      productTitle: (ov.title || m.product?.title || "").replace(/circuit/gi, "Seralie"),
      variantTitle: m.title === "Default Title" ? "" : m.title,
      image: ov.image || m.image?.url || m.product?.featuredImage?.url || "",
      unitPrice: parseFloat(m.price?.amount || "0"),
      quantity: n.quantity,
    } as CartLine;
  });
}

function formatCheckoutUrl(url: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set("channel", "online_store");
    return u.toString();
  } catch {
    return url;
  }
}

async function createCart(variantId: string, quantity: number) {
  const data = await gql<{ cartCreate: { cart: any; userErrors: any[] } }>(
    `mutation($input: CartInput!) { cartCreate(input: $input) { cart { ${CART_FIELDS} } userErrors { message } } }`,
    { input: { lines: [{ merchandiseId: variantId, quantity }] } },
  );
  if (data.cartCreate.userErrors?.length) throw new Error(data.cartCreate.userErrors[0].message);
  mapCart(data.cartCreate.cart);
}

async function addLines(cartId: string, variantId: string, quantity: number) {
  const data = await gql<{ cartLinesAdd: { cart: any; userErrors: any[] } }>(
    `mutation($cartId: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { message } } }`,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] },
  );
  const errs = data.cartLinesAdd.userErrors || [];
  if (errs.some((e) => /cart not found|does not exist/i.test(e.message))) return false;
  if (errs.length) throw new Error(errs[0].message);
  mapCart(data.cartLinesAdd.cart);
  return true;
}

async function updateLine(cartId: string, lineId: string, quantity: number) {
  const data = await gql<{ cartLinesUpdate: { cart: any; userErrors: any[] } }>(
    `mutation($cartId: ID!, $lines: [CartLineUpdateInput!]!) { cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { message } } }`,
    { cartId, lines: [{ id: lineId, quantity }] },
  );
  const errs = data.cartLinesUpdate.userErrors || [];
  if (errs.some((e) => /cart not found|does not exist/i.test(e.message))) return false;
  if (errs.length) throw new Error(errs[0].message);
  mapCart(data.cartLinesUpdate.cart);
  return true;
}

async function removeLine(cartId: string, lineId: string) {
  const data = await gql<{ cartLinesRemove: { cart: any; userErrors: any[] } }>(
    `mutation($cartId: ID!, $lineIds: [ID!]!) { cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FIELDS} } userErrors { message } } }`,
    { cartId, lineIds: [lineId] },
  );
  const errs = data.cartLinesRemove.userErrors || [];
  if (errs.some((e) => /cart not found|does not exist/i.test(e.message))) return false;
  if (errs.length) throw new Error(errs[0].message);
  mapCart(data.cartLinesRemove.cart);
  return true;
}

function clearLocal() {
  state.cartId = null;
  state.checkoutUrl = null;
  state.lines = [];
  if (typeof window !== "undefined") {
    localStorage.removeItem(LS_CART_ID);
    localStorage.removeItem(LS_CART_LINES);
  }
}

function fireAddPixels(item: { variantId: string; productTitle: string; unitPrice: number }, qty: number) {
  if (typeof window === "undefined") return;
  const value = parseFloat((item.unitPrice * qty).toFixed(2));
  (window as any).fbq?.("track", "AddToCart", {
    content_ids: [item.variantId],
    content_name: item.productTitle,
    content_type: "product",
    value,
    currency: "USD",
  });
  (window as any).gtag?.("event", "add_to_cart", {
    currency: "USD",
    value,
    items: [{ item_id: item.variantId, item_name: item.productTitle, price: item.unitPrice, quantity: qty }],
  });
}

export const shopifyCart = {
  subscribe(l: () => void) {
    ensureHydrated();
    listeners.add(l);
    return () => listeners.delete(l);
  },
  getSnapshot() {
    return snapshot;
  },
  getServerSnapshot() {
    return "";
  },
  open() {
    state.isOpen = true;
    commit();
  },
  close() {
    state.isOpen = false;
    commit();
  },
  async add(item: Omit<CartLine, "id" | "quantity">, quantity = 1) {
    ensureHydrated();
    if (item.productTitle || item.image) {
      overrides[item.variantId] = { title: item.productTitle, image: item.image };
    }
    state.isLoading = true;
    commit();
    try {
      let ok = true;
      if (!state.cartId) {
        await createCart(item.variantId, quantity);
      } else {
        ok = await addLines(state.cartId, item.variantId, quantity);
        if (!ok) {
          clearLocal();
          await createCart(item.variantId, quantity);
        }
      }
      fireAddPixels(item, quantity);
      persist();
      state.bump += 1;
      state.isOpen = true;
    } catch (err) {
      console.error("Cart add failed", err);
      throw err;
    } finally {
      state.isLoading = false;
      commit();
    }
  },
  async setQty(lineId: string, quantity: number) {
    if (!state.cartId) return;
    if (quantity <= 0) return this.remove(lineId);
    state.isLoading = true;
    commit();
    try {
      const ok = await updateLine(state.cartId, lineId, quantity);
      if (!ok) clearLocal();
      persist();
    } finally {
      state.isLoading = false;
      commit();
    }
  },
  async remove(lineId: string) {
    if (!state.cartId) return;
    state.isLoading = true;
    commit();
    try {
      const ok = await removeLine(state.cartId, lineId);
      if (!ok) clearLocal();
      if (state.lines.length === 0) clearLocal();
      persist();
    } finally {
      state.isLoading = false;
      commit();
    }
  },
  checkout() {
    if (state.checkoutUrl) {
      window.location.href = state.checkoutUrl;
    }
  },
};

export function useShopifyCart() {
  const snap = useSyncExternalStore(
    shopifyCart.subscribe,
    shopifyCart.getSnapshot,
    shopifyCart.getServerSnapshot,
  );
  const s: State = snap ? JSON.parse(snap) : { cartId: null, checkoutUrl: null, lines: [], isOpen: false, isLoading: false, bump: 0 };
  const count = s.lines.reduce((sum, l) => sum + l.quantity, 0);
  const subtotal = s.lines.reduce((sum, l) => sum + l.quantity * l.unitPrice, 0);
  return { ...s, count, subtotal };
}
