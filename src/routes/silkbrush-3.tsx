import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { SilkBrushPage } from "@/components/site/SilkBrushPage";
import { trackViewContent } from "@/lib/fb-pixel";
import { getVariant, logAbEvent } from "@/lib/ab-test";
import { PRICE, VARIANT_ID } from "@/lib/silkbrush-config";
import { SILKBRUSH_GALLERY_PRELOAD } from "@/lib/silkbrush-gallery";

export const Route = createFileRoute("/silkbrush-3")({
  head: () => ({
    links: [{ rel: "preload", as: "image", href: SILKBRUSH_GALLERY_PRELOAD, fetchpriority: "high" }],
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

function SilkBrush3Product() {
  useEffect(() => {
    const variant = getVariant();
    logAbEvent("view", { variant });
    trackViewContent(VARIANT_ID || "silkbrush", PRICE);
  }, []);
  return <SilkBrushPage icp />;
}
