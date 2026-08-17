// =====================================================================
// Seralie — LED Pimple Patches configuration
// =====================================================================

export const PRODUCT_ID = "9103104442522";
export const PRODUCT_HANDLE = "led-pimple-patches";
export const PRODUCT_TITLE = "LED Pimple Patches";
export const PRODUCT_SUBTITLE = "Hydrocolloid + red and blue light";

export const GUARANTEE_DAYS = 60;
export const FREE_SHIPPING_THRESHOLD = 40;

export type PatchTierId = "bogo1" | "bogo2" | "bogo3";

export type PatchTier = {
  id: PatchTierId;
  label: string;
  patches: number;
  supply: string;
  variantId: string;
  price: number;
  compareAt: number | null;
  freeShipping?: boolean;
  badge?: string;
};

export const PATCH_TIERS: PatchTier[] = [
  {
    id: "bogo1",
    label: "Buy 1 Get 1 Free",
    patches: 60,
    supply: "2 months",
    variantId: "49014253551770",
    price: 29.99,
    compareAt: 59.98,
  },
  {
    id: "bogo2",
    label: "Buy 2 Get 2 Free",
    patches: 120,
    supply: "4 months",
    variantId: "49014253584538",
    price: 49.99,
    compareAt: 59.98,
    freeShipping: true,
  },
  {
    id: "bogo3",
    label: "Buy 3 Get 3 Free",
    patches: 180,
    supply: "6 months",
    variantId: "49014253617306",
    price: 64.99,
    compareAt: 89.97,
    freeShipping: true,
    badge: "Best value",
  },
];

export const DEFAULT_PATCH_TIER: PatchTierId = "bogo1";

export function patchTierById(id: PatchTierId): PatchTier {
  return PATCH_TIERS.find((t) => t.id === id) ?? PATCH_TIERS[0]!;
}

export function perPatch(tier: PatchTier) {
  return tier.price / tier.patches;
}
