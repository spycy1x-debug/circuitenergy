export const STORE_URL = "https://checkout.seralie.com";

export type Variant = { color: string; size: string; variantId: string };

export const VARIANTS: Variant[] = [
  { color: "Black", size: "XS", variantId: "49067233181850" },
  { color: "Black", size: "S", variantId: "49067243634842" },
  { color: "Black", size: "M", variantId: "49067243667610" },
  { color: "Black", size: "L", variantId: "49067243700378" },
  { color: "Black", size: "XL", variantId: "49067243733146" },
  { color: "Black", size: "XXL", variantId: "49067243765914" },
  { color: "Black", size: "3XL", variantId: "49067243798682" },
  { color: "Pink", size: "XS", variantId: "49067243831450" },
  { color: "Pink", size: "S", variantId: "49067243864218" },
  { color: "Pink", size: "M", variantId: "49067243896986" },
  { color: "Pink", size: "L", variantId: "49067243929754" },
  { color: "Pink", size: "XL", variantId: "49067243962522" },
  { color: "Pink", size: "XXL", variantId: "49067243995290" },
  { color: "Pink", size: "3XL", variantId: "49067244028058" },
];

export type Bundle = {
  qty: number;
  label: string;
  price: number;
  compareAt: number | null;
  discount: string | null;
  tag: string | null;
  gift: string;
};

export const BUNDLES: Bundle[] = [
  {
    qty: 1,
    label: "1 Wrap",
    price: 39.99,
    compareAt: null,
    discount: null,
    tag: null,
    gift: "+ Free Posture Corrector",
  },
  {
    qty: 2,
    label: "2 Wraps",
    price: 59.99,
    compareAt: 79.98,
    discount: "SAVE30",
    tag: "MOST POPULAR",
    gift: "+ Free Posture Corrector",
  },
  {
    qty: 3,
    label: "3 Wraps",
    price: 79.99,
    compareAt: 119.97,
    discount: "SAVE50",
    tag: "BEST VALUE",
    gift: "+ 2 Free Posture Correctors",
  },
];

export const COLORS = ["Black", "Pink"] as const;

export const SIZES = [
  { size: "XS", waist: "21.6–27.5 in", length: "29.1 in / 74 cm", width: "—" },
  { size: "S", waist: "28.3–31.5 in", length: "30.7 in / 78 cm", width: "—" },
  { size: "M", waist: "31.5–34.6 in", length: "32.7 in / 83 cm", width: "9 in / 23 cm" },
  { size: "L", waist: "34.6–37.8 in", length: "34.6 in / 88 cm", width: "9 in / 23 cm" },
  { size: "XL", waist: "37.8–40.9 in", length: "36.6 in / 93 cm", width: "9 in / 23 cm" },
  { size: "XXL", waist: "40.9–44.1 in", length: "38.6 in / 98 cm", width: "9 in / 23 cm" },
  { size: "3XL", waist: "44.1–47.2 in", length: "40.6 in / 103 cm", width: "9 in / 23 cm" },
];

export function findVariantId(color: string, size: string) {
  return VARIANTS.find((v) => v.color === color && v.size === size)?.variantId ?? null;
}

export function checkoutUrl(color: string, size: string, bundle: Bundle) {
  const id = findVariantId(color, size);
  if (!id) return null;
  const base = `${STORE_URL}/cart/${id}:${bundle.qty}`;
  return bundle.discount ? `${base}?discount=${bundle.discount}` : base;
}

/** Shipping / package protection add-on. */
export const PROTECTION_VARIANT_ID = "48890343030938";
export const PROTECTION_PRICE = 3.99;
