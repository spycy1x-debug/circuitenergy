import { useSyncExternalStore } from "react";
import { storefront } from "./storefront.functions";
import { TIERS, toGid } from "./product-config";
import { trackInitiateCheckout } from "./fb-pixel";

// =====================================================================
// Seralie cart — Shopify Storefront API
// =====================================================================

/** Package Protection — a plain line, never a subscription. */
export const PACKAGE_PROTECTION_VARIANT_ID = "48890343030938";

const LS_CART_ID = "seralie-cart-id";
const LS_CART_STATE = "seralie-cart-state";

export type CartLine = {
  id: string;
  variantId: string;
  title: string;
  subtitle: string;
  image: string;
  unitPrice: number;
  quantity: number;
  /** Subscription cadence name from Shopify, when the line is on a selling plan. */
  sellingPlanName: string | null;
  attributes: { key: string; value: string }[];
};

type State = {
  cartId: string | null;
  checkoutUrl: string | null;
  lines: CartLine[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  protectionPending: boolean;
  protectionError: string | null;
  protectionOptimistic: boolean | null;
};

const listeners = new Set<() => void>();
const state: State = {
  cartId: null,
  checkoutUrl: null,
  lines: [],
  isOpen: false,
  isLoading: false,
  error: null,
  protectionPending: false,
  protectionError: null,
  protectionOptimistic: null,
};
let snapshot = "";

function commit() {
  snapshot = JSON.stringify(state);
  listeners.forEach((l) => l());
}

function persist() {
  if (typeof window === "undefined") return;
  if (state.cartId) localStorage.setItem(LS_CART_ID, state.cartId);
  localStorage.setItem(
    LS_CART_STATE,
    JSON.stringify({ lines: state.lines, checkoutUrl: state.checkoutUrl }),
  );
}

let hydrated = false;
function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    state.cartId = localStorage.getItem(LS_CART_ID);
    const raw = localStorage.getItem(LS_CART_STATE);
    if (raw) {
      const parsed = JSON.parse(raw);
      state.lines = parsed.lines || [];
      state.checkoutUrl = parsed.checkoutUrl || null;
    }
  } catch {
    /* ignore */
  }
  commit();
}

async function gql<T = any>(query: string, variables: Record<string, unknown> = {}) {
  return (await storefront({ data: { query, variables } })) as T;
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
        cost { totalAmount { amount } amountPerQuantity { amount } }
        attributes { key value }
        merchandise {
          ... on ProductVariant {
            id
            title
            image { url }
            price { amount }
            product { title featuredImage { url } }
          }
        }
      }
    }
  }
`;


function formatCheckoutUrl(url: string) {
  try {
    const u = new URL(url);
    u.searchParams.set("channel", "online_store");
    return u.toString();
  } catch {
    return url;
  }
}

function mapCart(cart: any) {
  state.cartId = cart.id;
  state.checkoutUrl = formatCheckoutUrl(cart.checkoutUrl);
  state.lines = (cart.lines?.edges || []).map((e: any) => {
    const n = e.node;
    const m = n.merchandise;
    const attrs = (n.attributes || []).filter((a: any) => a.key && a.value);
    const planAttr = attrs.find((a: any) => a.key === "Subscription");
    const bundleAttr = attrs.find((a: any) => a.key === "_Bundle");
    const priceAttr = attrs.find((a: any) => a.key === "_DisplayPrice");
    const requestedQuantity = Number(attrs.find((a: any) => a.key === "_RequestedQuantity")?.value);
    const apiQuantity = Number(n.quantity);
    const apiUnitPrice = Number(n.cost?.amountPerQuantity?.amount || m.price?.amount || 0);
    const displayPrice = Number(priceAttr?.value);
    return {
      id: n.id,
      variantId: m.id,
      title: m.product?.title || "",
      subtitle: bundleAttr?.value || (m.title === "Default Title" ? "" : m.title),
      image: m.image?.url || m.product?.featuredImage?.url || "",
      // The selected offer is the source of truth for this custom cart UI.
      // Shopify can echo the variant's one-time price even when a selling plan was sent.
      unitPrice: Number.isFinite(displayPrice) ? displayPrice : apiUnitPrice,
      quantity: apiQuantity > 0 ? apiQuantity : requestedQuantity > 0 ? requestedQuantity : 1,
      sellingPlanName: planAttr?.value || null,
      attributes: attrs.filter((a: any) => !["Subscription", "_Bundle", "_DisplayPrice", "_RequestedQuantity"].includes(a.key)),
    } as CartLine;
  });

}

/** Live prices straight from Shopify — never hardcoded in the UI. */
export async function fetchVariantPrices(
  variantIds: string[],
): Promise<Record<string, { amount: number; currencyCode: string; compareAt: number | null }>> {
  if (variantIds.length === 0) return {};
  const data = await gql<{ nodes: any[] }>(
    `query($ids: [ID!]!) {
      nodes(ids: $ids) {
        ... on ProductVariant {
          id
          price { amount currencyCode }
          compareAtPrice { amount }
        }
      }
    }`,
    { ids: variantIds.map(toGid) },
  );
  const out: Record<string, { amount: number; currencyCode: string; compareAt: number | null }> = {};
  for (const n of data.nodes || []) {
    if (!n?.id) continue;
    out[String(n.id).split("/").pop()!] = {
      amount: parseFloat(n.price?.amount || "0"),
      currencyCode: n.price?.currencyCode || "USD",
      compareAt: n.compareAtPrice?.amount ? parseFloat(n.compareAtPrice.amount) : null,
    };
  }
  return out;
}

/**
 * Selling plan IDs are hardcoded in product-config (verified live in Shopify).
 * The storefront token has no `unauthenticated_read_selling_plans` scope, so
 * plan data can never be queried at runtime.
 */


type LineInput = {
  merchandiseId: string;
  quantity: number;
  sellingPlanId?: string;
  attributes?: { key: string; value: string }[];
};

async function createCart(lines: LineInput[]) {
  const data = await gql<{ cartCreate: { cart: any; userErrors: any[] } }>(
    `mutation($input: CartInput!) { cartCreate(input: $input) { cart { ${CART_FIELDS} } userErrors { message } } }`,
    { input: { lines } },
  );
  if (data.cartCreate.userErrors?.length) throw new Error(data.cartCreate.userErrors[0].message);
  mapCart(data.cartCreate.cart);
}

async function addLines(cartId: string, lines: LineInput[]) {
  const data = await gql<{ cartLinesAdd: { cart: any; userErrors: any[] } }>(
    `mutation($cartId: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { message } } }`,
    { cartId, lines },
  );
  const errs = data.cartLinesAdd.userErrors || [];
  if (errs.some((e: any) => /cart not found|does not exist/i.test(e.message))) return false;
  if (errs.length) throw new Error(errs[0].message);
  mapCart(data.cartLinesAdd.cart);
  return true;
}

async function removeLineRemote(cartId: string, lineId: string) {
  const data = await gql<{ cartLinesRemove: { cart: any; userErrors: any[] } }>(
    `mutation($cartId: ID!, $lineIds: [ID!]!) { cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FIELDS} } userErrors { message } } }`,
    { cartId, lineIds: [lineId] },
  );
  const errs = data.cartLinesRemove.userErrors || [];
  if (errs.some((e: any) => /cart not found|does not exist/i.test(e.message))) return false;
  if (errs.length) throw new Error(errs[0].message);
  mapCart(data.cartLinesRemove.cart);
  return true;
}

async function updateLineRemote(cartId: string, lineId: string, quantity: number) {
  const data = await gql<{ cartLinesUpdate: { cart: any; userErrors: any[] } }>(
    `mutation($cartId: ID!, $lines: [CartLineUpdateInput!]!) { cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { message } } }`,
    { cartId, lines: [{ id: lineId, quantity }] },
  );
  const errs = data.cartLinesUpdate.userErrors || [];
  if (errs.some((e: any) => /cart not found|does not exist/i.test(e.message))) return false;
  if (errs.length) throw new Error(errs[0].message);
  mapCart(data.cartLinesUpdate.cart);
  return true;
}

function clearLocal() {
  state.cartId = null;
  state.checkoutUrl = null;
  state.lines = [];
  if (typeof window !== "undefined") {
    localStorage.removeItem(LS_CART_ID);
    localStorage.removeItem(LS_CART_STATE);
  }
}

export const PROTECTION_GID = toGid(PACKAGE_PROTECTION_VARIANT_ID);

export function isProtectionLine(l: CartLine) {
  return l.variantId === PROTECTION_GID;
}

function protectionLine() {
  return state.lines.find(isProtectionLine) ?? null;
}

/** If protection is the only thing left, it can't stand alone — clear the cart. */
async function dropOrphanProtection() {
  const others = state.lines.filter((l) => !isProtectionLine(l));
  const prot = protectionLine();
  if (prot && others.length === 0 && state.cartId) {
    await removeLineRemote(state.cartId, prot.id);
  }
}

export const cart = {
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
  /**
   * Adds one bottle-pack line. `sellingPlanId` is included only when the
   * subscribe toggle is on — without it Shopify silently books a one-time order.
   */
  async add(opts: {
    variantId: string;
    quantity?: number;
    sellingPlanId?: string | null;
    attributes?: { key: string; value: string }[];
    packageProtection?: boolean;
    bundleLabel?: string;
    displayPrice?: number;
  }) {
    ensureHydrated();
    state.isLoading = true;
    state.error = null;
    commit();
    try {
      const line: LineInput = {
        merchandiseId: toGid(opts.variantId),
        quantity: opts.quantity ?? 1,
      };
      if (opts.sellingPlanId) line.sellingPlanId = opts.sellingPlanId;
      line.attributes = [
        ...(opts.attributes ?? []),
        ...(opts.bundleLabel ? [{ key: "_Bundle", value: opts.bundleLabel }] : []),
        ...(typeof opts.displayPrice === "number"
          ? [{ key: "_DisplayPrice", value: opts.displayPrice.toFixed(2) }]
          : []),
        { key: "_RequestedQuantity", value: String(opts.quantity ?? 1) },
      ];

      const lines: LineInput[] = [line];
      if (opts.packageProtection) {
        // Plain line — no selling plan, so it is charged once and never rebilled.
        lines.push({ merchandiseId: PROTECTION_GID, quantity: 1 });
      }
      if (!state.cartId) {
        await createCart(lines);
      } else {
        const nourishVariantIds = new Set(TIERS.map((tier) => toGid(tier.variantId)));
        const previousBundleLines = state.lines.filter((existing) =>
          nourishVariantIds.has(existing.variantId),
        );
        for (const previous of previousBundleLines) {
          const removed = await removeLineRemote(state.cartId, previous.id);
          if (!removed) {
            clearLocal();
            break;
          }
        }
        if (!state.cartId) {
          await createCart(lines);
          persist();
          state.isOpen = true;
          return;
        }
        const ok = await addLines(state.cartId, lines);
        if (!ok) {
          clearLocal();
          await createCart(lines);
        }
      }
      persist();
      state.isOpen = true;
    } catch (err) {
      console.error("Cart add failed", err);
      state.error = err instanceof Error ? err.message : "Something went wrong adding to your cart.";
      throw err;
    } finally {
      state.isLoading = false;
      commit();
    }
  },
  /** Toggle the standalone Package Protection line. Always quantity exactly 1. */
  async setProtection(on: boolean) {
    ensureHydrated();
    if (state.protectionPending) return;
    const existing = protectionLine();
    if (on === !!existing && (!existing || existing.quantity === 1)) return;

    state.protectionPending = true;
    state.protectionError = null;
    state.protectionOptimistic = on;
    commit();

    try {
      if (on) {
        if (!state.cartId) throw new Error("Add NOURISH to your cart first.");
        const ok = await addLines(state.cartId, [{ merchandiseId: PROTECTION_GID, quantity: 1 }]);
        if (!ok) throw new Error("Your cart expired. Refresh and try again.");
        const p = protectionLine();
        if (p && p.quantity !== 1) await updateLineRemote(state.cartId, p.id, 1);
      } else if (existing && state.cartId) {
        const ok = await removeLineRemote(state.cartId, existing.id);
        if (!ok) throw new Error("Your cart expired. Refresh and try again.");
      }
      persist();
    } catch (err) {
      console.error("Protection toggle failed", err);
      state.protectionError =
        err instanceof Error ? err.message : "Couldn't update package protection.";
    } finally {
      state.protectionOptimistic = null;
      state.protectionPending = false;
      commit();
    }
  },
  async remove(lineId: string) {
    if (!state.cartId) return;
    state.isLoading = true;
    commit();
    try {
      const ok = await removeLineRemote(state.cartId, lineId);
      if (ok) await dropOrphanProtection();
      if (!ok || state.lines.length === 0) clearLocal();
      persist();
    } finally {
      state.isLoading = false;
      commit();
    }
  },
  checkout() {
    if (!state.checkoutUrl) return;
    try {
      const ids = state.lines.map((l) => String(l.variantId).split("/").pop()!);
      const total = state.lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
      const items = state.lines
        .filter((l) => !isProtectionLine(l))
        .reduce((sum, l) => sum + l.quantity, 0);
      trackInitiateCheckout(ids, total, items);
    } catch {
      /* never block checkout on tracking */
    }
    window.location.href = state.checkoutUrl;
  },
};

const EMPTY: State = {
  cartId: null,
  checkoutUrl: null,
  lines: [],
  isOpen: false,
  isLoading: false,
  error: null,
  protectionPending: false,
  protectionError: null,
  protectionOptimistic: null,
};

export function useCart() {
  const snap = useSyncExternalStore(cart.subscribe, cart.getSnapshot, cart.getServerSnapshot);
  const s: State = snap ? JSON.parse(snap) : EMPTY;
  const protection = s.lines.find(isProtectionLine) ?? null;
  const lines = s.lines.filter((l) => !isProtectionLine(l));
  const count = lines.reduce((sum, l) => sum + l.quantity, 0);
  const subtotal = s.lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
  return {
    ...s,
    lines,
    allLines: s.lines,
    protection,
    protectionOn: s.protectionOptimistic ?? !!protection,
    count,
    subtotal,
  };
}
