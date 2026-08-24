import { BUNDLES, checkoutUrl, PROTECTION_PRICE, PROTECTION_VARIANT_ID, type Bundle } from "./waistwrap-config";

export type CartLine = {
  id: string;
  qty: number; // bundle qty (1/2/3)
  color: string;
  size: string;
};

const KEY = "ww-cart-v1";

let lines: CartLine[] = [];
let open = false;
let protection = true;
const subs = new Set<() => void>();

function load() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) lines = JSON.parse(raw) as CartLine[];
    const p = window.localStorage.getItem(KEY + "-protection");
    if (p !== null) protection = p === "1";
  } catch {
    lines = [];
  }
}
load();

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(lines));
    window.localStorage.setItem(KEY + "-protection", protection ? "1" : "0");
  } catch {
    /* ignore */
  }
}

function emit() {
  persist();
  subs.forEach((f) => f());
}

export const cart = {
  subscribe(f: () => void) {
    subs.add(f);
    return () => subs.delete(f);
  },
  getLines: () => lines,
  hasProtection: () => protection,
  setProtection(v: boolean) {
    protection = v;
    emit();
  },
  isOpen: () => open,
  setOpen(v: boolean) {
    open = v;
    subs.forEach((f) => f());
  },
  add(line: Omit<CartLine, "id">) {
    lines = [...lines, { ...line, id: `${line.qty}-${line.color}-${line.size}-${Date.now()}` }];
    open = true;
    emit();
  },
  remove(id: string) {
    lines = lines.filter((l) => l.id !== id);
    emit();
  },
  clear() {
    lines = [];
    emit();
  },
};

export function bundleFor(qty: number): Bundle {
  return BUNDLES.find((b) => b.qty === qty) ?? BUNDLES[0];
}

export function cartTotal(ls: CartLine[], withProtection = false) {
  const base = ls.reduce((sum, l) => sum + bundleFor(l.qty).price, 0);
  return ls.length && withProtection ? base + PROTECTION_PRICE : base;
}

/** Shopify permalink for the whole cart — same discount flow as before. */
export function cartCheckoutUrl(ls: CartLine[], withProtection = protection) {
  if (!ls.length) return null;
  if (ls.length === 1 && !withProtection) {
    return checkoutUrl(ls[0].color, ls[0].size, bundleFor(ls[0].qty));
  }
  // multiple lines: build a combined permalink, keeping the best discount code
  const parts: string[] = [];
  let discount: string | null = null;
  for (const l of ls) {
    const b = bundleFor(l.qty);
    const single = checkoutUrl(l.color, l.size, b);
    if (!single) continue;
    const seg = single.split("/cart/")[1]?.split("?")[0];
    if (seg) parts.push(seg);
    if (b.discount && !discount) discount = b.discount;
  }
  if (!parts.length) return null;
  if (withProtection) parts.push(`${PROTECTION_VARIANT_ID}:1`);
  const base = `https://checkout.seralie.com/cart/${parts.join(",")}`;
  return discount ? `${base}?discount=${discount}` : base;
}
