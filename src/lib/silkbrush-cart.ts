import { getVariantCached } from "./ab-test";
import { ALL_TIERS, DEFAULT_TIER, PROTECTION_PRICE, PROTECTION_VARIANT_ID, STORE_URL, type Tier } from "./silkbrush-config";

const KEY = "sb-cart-v2";
const PKEY = "sb-cart-protection-v1";
const TKEY = "sb-cart-tier-v1";

let qty = 0;
let tierId: string = DEFAULT_TIER;
let protection = true;
let open = false;
const subs = new Set<() => void>();

function load() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) qty = Math.max(0, parseInt(raw, 10) || 0);
    const pRaw = window.localStorage.getItem(PKEY);
    protection = pRaw === null ? true : pRaw === "1";
    const t = window.localStorage.getItem(TKEY);
    if (t && ALL_TIERS.some((x) => x.id === t)) tierId = t;
    else tierId = getVariantCached() === "B" ? "b2pk" : DEFAULT_TIER;
  } catch {
    qty = 0;
  }
}
load();

function emit(persist = true) {
  if (persist && typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, String(qty));
      window.localStorage.setItem(PKEY, protection ? "1" : "0");
      window.localStorage.setItem(TKEY, tierId);
    } catch {
      /* ignore */
    }
  }
  subs.forEach((f) => f());
}

export const getTier = (): Tier => ALL_TIERS.find((t) => t.id === tierId) ?? ALL_TIERS[0]!;

export const cart = {
  subscribe(f: () => void) {
    subs.add(f);
    return () => {
      subs.delete(f);
    };
  },
  getQty: () => qty,
  getTier,
  getTierId: () => tierId,
  setTier(id: string) {
    if (ALL_TIERS.some((t) => t.id === id)) tierId = id;
    emit();
  },
  hasProtection: () => protection,
  setProtection(v: boolean) {
    protection = v;
    emit();
  },
  isOpen: () => open,
  setOpen(v: boolean) {
    open = v;
    emit(false);
  },
  add(n = 1, id?: string) {
    if (id && ALL_TIERS.some((t) => t.id === id)) tierId = id;
    qty += n;
    open = true;
    emit();
  },
  setQty(n: number) {
    qty = Math.max(0, n);
    emit();
  },
  clear() {
    qty = 0;
    protection = false;
    emit();
  },
};

export const cartTotal = (n: number, withProtection = false) =>
  n * getTier().price + (withProtection && n > 0 ? PROTECTION_PRICE : 0);

export const cartCheckoutUrl = (n: number, withProtection = false) => {
  if (n <= 0) return null;
  const tier = getTier();
  const lines = [`${tier.variantId}:${Math.max(1, n)}`];
  if (tier.giftVariantId) lines.push(`${tier.giftVariantId}:1`);
  if (withProtection) lines.push(`${PROTECTION_VARIANT_ID}:1`);
  return `${STORE_URL}/cart/${lines.join(",")}`;
};
