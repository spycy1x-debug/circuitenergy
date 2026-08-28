import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { SilkBrushPage } from "@/components/site/SilkBrushPage";
import { trackViewContent } from "@/lib/fb-pixel";
import { PRICE, VARIANT_ID } from "@/lib/silkbrush-config";

export const Route = createFileRoute("/silkbrush")({
  head: () => ({
    meta: [
      { title: "Seralie SilkBrush™ — Smooth. Straighten. Shine." },
      {
        name: "description",
        content:
          "The Seralie SilkBrush™ is a boar-bristle brush designed to smooth frizz and create a sleek, straighter-looking finish while you brush. $37.99, free shipping, 365-day money-back guarantee.",
      },
      { property: "og:title", content: "Seralie SilkBrush™ — Smooth. Straighten. Shine." },
      {
        property: "og:description",
        content: "Boar-bristle brush for smoother, shinier, straighter-looking hair. Free shipping. 365-day money-back guarantee.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SilkBrushProduct,
});

function SilkBrushProduct() {
  useEffect(() => {
    trackViewContent(VARIANT_ID || "silkbrush", PRICE);
  }, []);
  return <SilkBrushPage />;
}
