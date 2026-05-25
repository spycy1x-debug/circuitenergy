import { useEffect, useState, useSyncExternalStore } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

const KEY = "circuit-cart";
const listeners = new Set<() => void>();

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  listeners.forEach((l) => l());
}

export const cart = {
  get: read,
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  add(item: Omit<CartItem, "qty">, qty = 1) {
    const items = read();
    const existing = items.find((i) => i.id === item.id);
    if (existing) existing.qty += qty;
    else items.push({ ...item, qty });
    write(items);
  },
  setQty(id: string, qty: number) {
    const items = read().map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i));
    write(items);
  },
  remove(id: string) {
    write(read().filter((i) => i.id !== id));
  },
  clear() {
    write([]);
  },
};

export function useCart() {
  const items = useSyncExternalStore(
    (l) => cart.subscribe(l),
    () => JSON.stringify(read()),
    () => "[]"
  );
  const parsed: CartItem[] = JSON.parse(items);
  const count = parsed.reduce((s, i) => s + i.qty, 0);
  const subtotal = parsed.reduce((s, i) => s + i.qty * i.price, 0);
  return { items: parsed, count, subtotal };
}

export function useAddToCart() {
  const [state, setState] = useState<"idle" | "adding" | "added">("idle");
  const add = (item: Omit<CartItem, "qty">, qty = 1) => {
    setState("adding");
    setTimeout(() => {
      cart.add(item, qty);
      setState("added");
      setTimeout(() => setState("idle"), 1800);
    }, 300);
  };
  return { state, add };
}

import neuralImg from "@/assets/neural-bottle.png";
import nmnImg from "@/assets/nmn-bottle.png";

export const PRODUCTS = {
  neural: {
    id: "neural",
    name: "Circuit Neural Performance",
    price: 42.99,
    image: neuralImg,
    slug: "neural-performance",
  },
  nmn: {
    id: "nmn",
    name: "Circuit NMN",
    price: 49.99,
    image: nmnImg,
    slug: "nmn",
  },
};
