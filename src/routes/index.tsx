import { createFileRoute } from "@tanstack/react-router";
import { WaistWrapLanding } from "@/components/site/Waist Strap";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Waist Strap — The Waist Wrap That Actually Stays Put" },
      {
        name: "description",
        content:
          "Waist Strap is an adjustable wrap waist trainer — no hooks, no zippers. One size wraps to your exact waist and stays invisible under clothes. 60-day fit guarantee.",
      },
      { property: "og:title", content: "Waist Strap — The Adjustable Waist Wrap" },
      {
        property: "og:description",
        content: "One adjustable band. Wraps to your exact waist. Invisible under clothes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WaistWrapLanding,
});
