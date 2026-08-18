import { useEffect, useState } from "react";
import { PATCH_TIERS } from "@/lib/patch-config";

const KEY = "seralie_cart_discount_until";
const WINDOW_MS = 10 * 60 * 1000;

type Listener = () => void;
const listeners = new Set<Listener>();
let until = 0;

function read() {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(KEY);
  const n = raw ? Number(raw) : 0;
  return Number.isFinite(n) ? n : 0;
}

function emit() {
  listeners.forEach((l) => l());
}

export function claimDiscount() {
  until = Date.now() + WINDOW_MS;
  try {
    window.localStorage.setItem(KEY, String(until));
  } catch {
    /* ignore */
  }
  emit();
}

/** Unit price for a cart line, honoring an active claimed discount. */
export function discountedUnitPrice(variantId: string, fallback: number, active: boolean) {
  const id = String(variantId).split("/").pop();
  const tier = PATCH_TIERS.find((t) => t.variantId === id);
  if (!tier) return fallback;
  return active ? tier.dealPrice : tier.price;
}

export function useCartDiscount() {
  const [now, setNow] = useState(() => Date.now());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    until = read();
    setHydrated(true);
    const listener = () => setNow(Date.now());
    listeners.add(listener);
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => {
      listeners.delete(listener);
      window.clearInterval(t);
    };
  }, []);

  const msLeft = hydrated ? Math.max(0, until - now) : 0;
  const active = msLeft > 0;
  const claimed = hydrated && until > 0;
  const mins = Math.floor(msLeft / 60000);
  const secs = Math.floor((msLeft % 60000) / 1000);

  return {
    active,
    claimed,
    expired: claimed && !active,
    msLeft,
    timeLeft: `${mins}:${String(secs).padStart(2, "0")}`,
    claim: claimDiscount,
  };
}
