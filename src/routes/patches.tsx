import { createFileRoute } from "@tanstack/react-router";
import { PatchPage } from "@/components/site/PatchPage";

export const Route = createFileRoute("/patches")({
  head: () => ({
    meta: [
      { title: "LED Pimple Patches — Hydrocolloid + Light | Seralie" },
      {
        name: "description",
        content:
          "Hydrocolloid absorbs it, light treats it. Overnight LED pimple patches with red and blue light. Free shipping over $40, ships in 24h, 60-day guarantee.",
      },
      { property: "og:title", content: "LED Pimple Patches — Hydrocolloid + Light | Seralie" },
      {
        property: "og:description",
        content: "Overnight patches that absorb the gunk and treat the spot with red and blue light.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PatchPage,
});
