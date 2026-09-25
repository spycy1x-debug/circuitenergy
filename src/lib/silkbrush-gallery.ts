import gallery1 from "@/assets/silkbrush-gallery-new-1.webp.asset.json";
import gallery2 from "@/assets/silkbrush-gallery-new-2.webp.asset.json";
import gallery3 from "@/assets/silkbrush-gallery-new-3.webp.asset.json";
import gallery4 from "@/assets/silkbrush-gallery-new-4.webp.asset.json";
import gallery5 from "@/assets/silkbrush-gallery-new-5.webp.asset.json";
import gallery6 from "@/assets/silkbrush-gallery-new-6.webp.asset.json";
import gallery7 from "@/assets/silkbrush-gallery-new-7.webp.asset.json";
import gallery8 from "@/assets/silkbrush-gallery-new-8.webp.asset.json";
import gallery9 from "@/assets/silkbrush-gallery-new-9.webp.asset.json";

export type SilkBrushGalleryImage = { url: string };

export const SILKBRUSH_GALLERY: SilkBrushGalleryImage[] = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7,
  gallery8,
  gallery9,
];

export const SILKBRUSH_GALLERY_PRELOAD = gallery1.url;