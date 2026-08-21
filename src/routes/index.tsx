import { createFileRoute } from "@tanstack/react-router";
import { CinchWrap } from "@/components/site/CinchWrap";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CinchWrap™ — The Waist Wrap That Actually Stays Put" },
      {
        name: "description",
        content:
          "CinchWrap™ is an adjustable wrap waist trainer — no hooks, no zippers. One size wraps to your exact waist and stays invisible under clothes. 60-day fit guarantee.",
      },
      { property: "og:title", content: "CinchWrap™ — The Adjustable Waist Wrap" },
      {
        property: "og:description",
        content: "One adjustable band. Wraps to your exact waist. Invisible under clothes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://seralie.com/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://seralie.com/" }],
  }),
  component: CinchWrap,
});
