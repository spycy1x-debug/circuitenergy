import gallery1 from "@/assets/silkbrush-gallery-new-1.webp.asset.json";
import gallery2 from "@/assets/silkbrush-gallery-new-2.webp.asset.json";
import gallery3 from "@/assets/silkbrush-gallery-new-3.webp.asset.json";
import gallery4 from "@/assets/silkbrush-gallery-new-4.webp.asset.json";
import gallery5 from "@/assets/silkbrush-gallery-new-5.webp.asset.json";
import gallery6 from "@/assets/silkbrush-gallery-new-6.webp.asset.json";
import gallery7 from "@/assets/silkbrush-gallery-new-7.webp.asset.json";
import gallery8 from "@/assets/silkbrush-gallery-new-8.webp.asset.json";
import gallery9 from "@/assets/silkbrush-gallery-new-9.webp.asset.json";
import gallery10 from "@/assets/silkbrush-gallery-new-10.png.asset.json";
import gallery11 from "@/assets/silkbrush-gallery-new-11.png.asset.json";
import plainBrush from "@/assets/silkbrush-prod-1.png.asset.json";

export type SilkBrushGalleryImage = { url: string; aspectRatio?: string };

export const SILKBRUSH_GALLERY: SilkBrushGalleryImage[] = [
  { ...plainBrush, aspectRatio: "1 / 1" },
  gallery9,
  gallery8,
  gallery7,
  gallery6,
  gallery5,
  gallery4,
  gallery3,
  gallery2,
  gallery1,
  gallery10,
  gallery11,
];

export const SILKBRUSH_GALLERY_PRELOAD = plainBrush.url;