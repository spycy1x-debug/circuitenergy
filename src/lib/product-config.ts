// =====================================================================
// Seralie — NOURISH™ product configuration
// =====================================================================

export const PRODUCT_ID = "9096498446490";
export const PRODUCT_HANDLE = "nourish-digestive-support-daily-essentials";
export const PRODUCT_TITLE = "NOURISH™";
export const PRODUCT_SUBTITLE = "Digestive Support + Daily Essentials";

export const SUBSCRIBE_DISCOUNT = 0.25; // 25% off one-time price

export type TierId = "one" | "three" | "five";

export type Tier = {
  id: TierId;
  label: string;
  bottles: number;
  badge?: string;
  variantId: string;
  /** Cadence copy shown when the subscribe toggle is on. */
  cadence: string;
  /** Struck-through reference price (true multiple of the single bottle). */
  compareAt: number | null;
};

export const TIERS: Tier[] = [
  {
    id: "one",
    label: "1 Bottle",
    bottles: 1,
    variantId: "48994580168858",
    cadence: "Delivered every month",
    compareAt: null,
  },
  {
    id: "three",
    label: "Buy 2 Get 1 Free",
    bottles: 3,
    badge: "Most popular",
    variantId: "48994580201626",
    cadence: "Delivered every 3 months",
    compareAt: 119.97,
  },
  {
    id: "five",
    label: "Buy 3 Get 2 Free",
    bottles: 5,
    badge: "Best value",
    variantId: "48994580234394",
    cadence: "Delivered every 5 months",
    compareAt: 199.95,
  },
];

export const DEFAULT_TIER: TierId = "five";

export function tierById(id: TierId): Tier {
  return TIERS.find((t) => t.id === id) ?? TIERS[0]!;
}

export function toGid(variantId: string) {
  return `gid://shopify/ProductVariant/${variantId}`;
}

export const BENEFITS = [
  "Digestive Comfort",
  "Gut Health",
  "Energy Support",
  "Daily Essentials",
] as const;

export const GUARANTEE_DAYS = 60;
