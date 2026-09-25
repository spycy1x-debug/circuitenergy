import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { SilkBrushPage } from "@/components/site/SilkBrushPage";
import { trackViewContent } from "@/lib/fb-pixel";
import { getVariant, logAbEvent } from "@/lib/ab-test";
import { PRICE, VARIANT_ID } from "@/lib/silkbrush-config";
import { SILKBRUSH_GALLERY_PRELOAD } from "@/lib/silkbrush-gallery";

export const Route = createFileRoute("/silkbrush-2")({
  head: () => ({
    links: [{ rel: "preload", as: "image", href: SILKBRUSH_GALLERY_PRELOAD, fetchPriority: "high" }],
    meta: [
      { title: "Seralie SilkBrush™ — Smooth. Straighten. Shine." },
      {
        name: "description",
        content:
          "The Seralie SilkBrush™ is a boar-bristle brush designed to smooth frizz and create a sleek, straighter-looking finish while you brush. Choose bamboo or plastic. Free shipping on all orders, 365-day money-back guarantee.",
      },
      { property: "og:title", content: "Seralie SilkBrush™ — Smooth. Straighten. Shine." },
      {
        property: "og:description",
        content: "Boar-bristle brush for smoother, shinier, straighter-looking hair. Free shipping on all orders. 365-day money-back guarantee.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SilkBrush2Product,
});

function SilkBrush2Product() {
  useEffect(() => {
    const variant = getVariant();
    logAbEvent("view", { variant });
    trackViewContent(VARIANT_ID || "silkbrush", PRICE);
  }, []);
  return <SilkBrushPage materialSelector />;
}
