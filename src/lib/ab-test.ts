/**
 * Isolated A/B test module for the SilkBrush™ offer selector.
 *
 * Variant A = the original offer (unchanged Shopify variants).
 * Variant B = higher-priced offer with a FREE Scalp Scrubber on the 2- and 3-packs
 *             (its own Shopify variants + a $0.00 gift line item).
 *
 * Turn the test off by setting AB_TEST_ENABLED to false — everyone then gets
 * AB_DEFAULT_VARIANT and checkout keeps working exactly as before.
 */
import { useEffect, useState } from "react";
import { DEFAULT_TIER, DEFAULT_TIER_B, TIERS, TIERS_B, type Tier } from "./silkbrush-config";
import { supabase } from "@/integrations/supabase/client";

export const AB_TEST_ENABLED = true;
export const AB_DEFAULT_VARIANT: AbVariant = "A";

export type AbVariant = "A" | "B";

const VKEY = "sb-ab-variant-v1";
const IDKEY = "sb-ab-visitor-v1";

function randomId() {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  } catch {
    /* ignore */
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** Stable per-browser visitor id (first-party localStorage only). */
export function visitorId(): string {
  if (typeof window === "undefined") return "ssr";
  try {
    let id = window.localStorage.getItem(IDKEY);
    if (!id) {
      id = randomId();
      window.localStorage.setItem(IDKEY, id);
    }
    return id;
  } catch {
    return "anon";
  }
}

/**
 * Reads the visitor's assigned variant, assigning one 50/50 on first visit.
 * Client-only; never called during SSR so hydration stays stable.
 */
export function getVariant(): AbVariant {
  if (typeof window === "undefined") return AB_DEFAULT_VARIANT;
  if (!AB_TEST_ENABLED) return AB_DEFAULT_VARIANT;
  try {
    const stored = window.localStorage.getItem(VKEY);
    if (stored === "A" || stored === "B") return stored;
    const assigned: AbVariant = Math.random() < 0.5 ? "A" : "B";
    window.localStorage.setItem(VKEY, assigned);
    logAbEvent("assign", { variant: assigned });
    return assigned;
  } catch {
    return AB_DEFAULT_VARIANT;
  }
}

export const tiersFor = (v: AbVariant): Tier[] => (v === "B" ? TIERS_B : TIERS);
export const defaultTierFor = (v: AbVariant) => (v === "B" ? DEFAULT_TIER_B : DEFAULT_TIER);

/** Returns the assigned variant after mount (SSR-safe: renders the default first). */
export function useAbVariant(): AbVariant {
  const [v, setV] = useState<AbVariant>(AB_DEFAULT_VARIANT);
  useEffect(() => {
    setV(getVariant());
  }, []);
  return v;
}

/* ------------------------------- analytics -------------------------------- */

type AbEvent = "assign" | "view" | "select" | "add_to_cart" | "initiate_checkout";

/** Fire-and-forget first-party funnel logging. Never blocks or throws. */
export function logAbEvent(
  event: AbEvent,
  opts: { variant?: AbVariant; tierId?: string; value?: number } = {},
) {
  if (typeof window === "undefined") return;
  const variant = opts.variant ?? getVariantCached();
  try {
    void supabase
      .from("ab_events")
      .insert({
        visitor_id: visitorId(),
        variant,
        event,
        tier_id: opts.tierId ?? null,
        value: opts.value ?? null,
        path: window.location.pathname,
      })
      .then(() => undefined, () => undefined);
  } catch {
    /* ignore */
  }
}

/** Non-assigning read (avoids recursion inside logAbEvent). */
export function getVariantCached(): AbVariant {
  if (typeof window === "undefined" || !AB_TEST_ENABLED) return AB_DEFAULT_VARIANT;
  try {
    const stored = window.localStorage.getItem(VKEY);
    return stored === "B" ? "B" : "A";
  } catch {
    return AB_DEFAULT_VARIANT;
  }
}
