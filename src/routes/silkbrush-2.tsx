import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { SilkBrushPage } from "@/components/site/SilkBrushPage";
import { trackViewContent } from "@/lib/fb-pixel";
import { PRICE, VARIANT_ID } from "@/lib/silkbrush-config";
import imgPlastic from "@/assets/silkbrush-plastic.png.asset.json";
import imgFeatures from "@/assets/silkbrush-features.png.asset.json";
import img2 from "@/assets/sbx-2.webp.asset.json";
import img3 from "@/assets/sbx-3.webp.asset.json";
import img4 from "@/assets/sbx-4.webp.asset.json";
import img5 from "@/assets/sbx-5.webp.asset.json";
import img6 from "@/assets/sbx-6.webp.asset.json";

export const Route = createFileRoute("/silkbrush-2")({
  head: () => ({
    meta: [
      { title: "Seralie SilkBrush™ — Smooth. Straighten. Shine." },
      {
        name: "description",
        content:
          "The Seralie SilkBrush™ is a boar-bristle brush designed to smooth frizz and create a sleek, straighter-looking finish while you brush. Choose bamboo or plastic. Free shipping on 2+, 365-day money-back guarantee.",
      },
      { property: "og:title", content: "Seralie SilkBrush™ — Smooth. Straighten. Shine." },
      {
        property: "og:description",
        content: "Boar-bristle brush for smoother, shinier, straighter-looking hair. Free shipping on 2+. 365-day money-back guarantee.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SilkBrush2Product,
});

const GALLERY = [imgPlastic, imgFeatures, img2, img3, img4, img5, img6];

function SilkBrush2Product() {
  useEffect(() => {
    trackViewContent(VARIANT_ID || "silkbrush", PRICE);
  }, []);
  return <SilkBrushPage galleryImages={GALLERY} materialSelector />;
}
