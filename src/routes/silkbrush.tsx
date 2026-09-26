import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { SilkBrushPage } from "@/components/site/SilkBrushPage";
import { trackViewContent } from "@/lib/fb-pixel";
import { getVariant, logAbEvent } from "@/lib/ab-test";
import { PRICE, VARIANT_ID } from "@/lib/silkbrush-config";
import { SILKBRUSH_GALLERY_PRELOAD } from "@/lib/silkbrush-gallery";

export const Route = createFileRoute("/silkbrush")({
  head: () => ({
    links: [{ rel: "preload", as: "image", href: SILKBRUSH_GALLERY_PRELOAD, fetchPriority: "high" }],
    meta: [
      { title: "Seralie SilkBrush™ — Smooth. Straighten. Shine." },
      {
        name: "description",
        content:
          "The Seralie SilkBrush™ is designed to smooth frizz and create a sleek, straighter-looking finish while you brush. $37.99, free shipping on all orders, 365-day money-back guarantee.",
      },
      { property: "og:title", content: "Seralie SilkBrush™ — Smooth. Straighten. Shine." },
      {
        property: "og:description",
        content: "A smoothing brush for shinier, straighter-looking hair. Free shipping on all orders. 365-day money-back guarantee.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SilkBrushProduct,
});

function SilkBrushProduct() {
  useEffect(() => {
    const variant = getVariant();
    logAbEvent("view", { variant });
    trackViewContent(VARIANT_ID || "silkbrush", PRICE);
  }, []);
  return <SilkBrushPage />;
}
