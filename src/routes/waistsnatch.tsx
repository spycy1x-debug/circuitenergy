import { createFileRoute } from "@tanstack/react-router";
import { WaistWrapProduct } from "@/components/site/WaistWrap";

export const Route = createFileRoute("/waistsnatch")({
  head: () => ({
    meta: [
      { title: "WaistSnatch™ Adjustable WaistSnatch™ — One Size, Wraps to You" },
      {
        name: "description",
        content:
          "Buy WaistSnatch™, the adjustable wrap waist trainer. No hooks, no zippers — one band wraps to your exact waist and stays invisible under clothes. 60-day fit guarantee.",
      },
      { property: "og:title", content: "WaistSnatch™ Adjustable WaistSnatch™" },
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
