import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { SilkBrushPage } from "@/components/site/SilkBrushPage";
import { trackViewContent } from "@/lib/fb-pixel";
import { getVariant, logAbEvent } from "@/lib/ab-test";
import { PRICE, VARIANT_ID } from "@/lib/silkbrush-config";
import imgFeatures from "@/assets/silkbrush-features.png.asset.json";
import img2 from "@/assets/sbx-2.webp.asset.json";
import img3 from "@/assets/sbx-3.webp.asset.json";
import img4 from "@/assets/sbx-4.webp.asset.json";
import img5 from "@/assets/sbx-5.webp.asset.json";
import img6 from "@/assets/sbx-6.webp.asset.json";

export const Route = createFileRoute("/silkbrush-3")({
  head: () => ({
    links: [{ rel: "preload", as: "image", href: "/img/prod-1.webp", fetchpriority: "high" }],
    meta: [
      { title: "Seralie SilkBrush™ — Hair That Feels Manageable Again" },
      {
        name: "description",
        content:
          "Hair used to be easy and now it fights you? The SilkBrush™ smooths frizzy, uneven, unruly sections as you brush. Free shipping, 365-day money-back guarantee.",
      },
      { property: "og:title", content: "Seralie SilkBrush™ — Hair That Feels Manageable Again" },
      {
        property: "og:description",
        content: "Smooth, put-together hair without the daily fight. Free shipping. 365-day money-back guarantee.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SilkBrush3Product,
});

const img1 = { url: "/img/prod-1.webp" };

const GALLERY = [img1, imgFeatures, img2, img3, img4, img5, img6];

function SilkBrush3Product() {
  useEffect(() => {
    const variant = getVariant();
    logAbEvent("view", { variant });
    trackViewContent(VARIANT_ID || "silkbrush", PRICE);
  }, []);
  return <SilkBrushPage galleryImages={GALLERY} icp />;
}
