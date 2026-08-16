import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seralie LED Pimple Patches — Absorbs It, Treats It" },
      {
        name: "description",
        content:
          "Overnight LED pimple patches. Hydrocolloid absorbs the spot while red and blue light treat it. Free shipping, ships in 24h, 60-day guarantee.",
      },
      { property: "og:title", content: "Seralie LED Pimple Patches — Absorbs It, Treats It" },
      {
        property: "og:description",
        content: "Hydrocolloid absorbs it. Light treats it. Overnight patches for angry spots.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://seralie.com/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://seralie.com/" }],
  }),
  component: PatchPage,
});
