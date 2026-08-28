import { checkoutUrl, PRICE, PROTECTION_PRICE } from "./silkbrush-config";

const KEY = "sb-cart-v1";
const PKEY = "sb-cart-protection-v1";

let qty = 0;
let protection = false;
let open = false;
const subs = new Set<() => void>();

function load() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) qty = Math.max(0, parseInt(raw, 10) || 0);
    protection = window.localStorage.getItem(PKEY) === "1";
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
    } catch {
      /* ignore */
    }
  }
  subs.forEach((f) => f());
}

export const cart = {
  subscribe(f: () => void) {
    subs.add(f);
    return () => {
      subs.delete(f);
    };
  },
  getQty: () => qty,
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
  add(n = 1) {
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
  n * PRICE + (withProtection && n > 0 ? PROTECTION_PRICE : 0);
export const cartCheckoutUrl = (n: number, withProtection = false) =>
  n > 0 ? checkoutUrl(n, withProtection) : null;
