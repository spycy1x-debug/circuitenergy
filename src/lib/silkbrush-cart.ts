import { checkoutUrl, PRICE } from "./silkbrush-config";

const KEY = "sb-cart-v1";

let qty = 0;
let open = false;
const subs = new Set<() => void>();

function load() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) qty = Math.max(0, parseInt(raw, 10) || 0);
  } catch {
    qty = 0;
  }
}
load();

function emit(persist = true) {
  if (persist && typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, String(qty));
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
    emit();
  },
};

export const cartTotal = (n: number) => n * PRICE;
export const cartCheckoutUrl = (n: number) => (n > 0 ? checkoutUrl(n) : null);
