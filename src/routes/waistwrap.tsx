import { createFileRoute } from "@tanstack/react-router";
import { WaistWrapProduct } from "@/components/site/WaistWrap";

export const Route = createFileRoute("/waistwrap")({
  head: () => ({
    meta: [
      { title: "WaistWrap™ Adjustable Waist Wrap — One Size, Wraps to You" },
      {
        name: "description",
        content:
          "Buy WaistWrap™, the adjustable wrap waist trainer. No hooks, no zippers — one band wraps to your exact waist and stays invisible under clothes. 60-day fit guarantee.",
      },
      { property: "og:title", content: "WaistWrap™ Adjustable Waist Wrap" },
      {
        property: "og:description",
        content: "One adjustable band. Wraps to your exact waist, invisible under clothes, all day.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WaistWrapProduct,
});
