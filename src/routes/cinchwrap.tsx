import { createFileRoute } from "@tanstack/react-router";
import { CinchWrap } from "@/components/site/CinchWrap";

export const Route = createFileRoute("/cinchwrap")({
  head: () => ({
    meta: [
      { title: "CinchWrap™ — The Adjustable Waist Wrap That Stays Put" },
      {
        name: "description",
        content:
          "CinchWrap™ is an adjustable wrap waist trainer. No hooks, no zippers, one size wraps to your exact waist. Invisible under clothes. 60-day fit guarantee.",
      },
      { property: "og:title", content: "CinchWrap™ — The Adjustable Waist Wrap" },
      {
        property: "og:description",
        content: "One adjustable band. Wraps to your exact waist, invisible under clothes, all-day comfort.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CinchWrap,
});
