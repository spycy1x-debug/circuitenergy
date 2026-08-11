import img1 from "@/assets/nourish-1-bottle-benefits.webp.asset.json";
import img2 from "@/assets/nourish-2-supplement-facts.webp.asset.json";
import img3 from "@/assets/nourish-3-ingredients.webp.asset.json";
import img4 from "@/assets/nourish-4-eating-less.webp.asset.json";
import img5 from "@/assets/nourish-5-vs-four-bottles.webp.asset.json";
import img6 from "@/assets/nourish-6-why-trust.webp.asset.json";
import img7 from "@/assets/nourish-7-guarantee.webp.asset.json";

export type GalleryImage = { url: string; alt: string };

/** Ordered most informational first. */
export const GALLERY: GalleryImage[] = [
  { url: img1.url, alt: "NOURISH bottle with digestive comfort, nutrient replenishment and no-filler callouts" },
  { url: img2.url, alt: "NOURISH supplement facts panel and directions" },
  { url: img3.url, alt: "Key ingredients: magnesium, LactoSpore probiotic, ginger root, BioPerine, bromelain and DigeZyme" },
  { url: img4.url, alt: "You're eating less, you're absorbing less — digestive comfort, energy and B12, hair, skin and immune support" },
  { url: img5.url, alt: "NOURISH compared with taking four separate bottles" },
  { url: img6.url, alt: "Why trust Seralie: third-party tested, GMP-certified facility, chelated minerals, no artificial fillers" },
  { url: img7.url, alt: "60-day risk-free trial seal" },
];
