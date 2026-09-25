import { createFileRoute } from "@tanstack/react-router";
import { AdvertorialPage } from "@/components/site/AdvertorialPage";
import story from "@/content/advertorial-3.txt?raw";
import image from "@/assets/advertorial-straightener.webp.asset.json";

export const Route = createFileRoute("/advertorial-3")({
  head: () => ({
    meta: [
      { title: "I Couldn't Remember the Last Time I Got Ready Without My Straightener | Seralie" },
      { name: "description", content: "A personal story about finding a non-heated option for a smoother, straighter-looking everyday finish." },
      { property: "og:title", content: "I Couldn't Remember the Last Time I Got Ready Without My Straightener" },
      { property: "og:description", content: "A personal story about replacing the daily straightener habit with a simpler smoothing option." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <AdvertorialPage
      headline="I Couldn't Remember the Last Time I Got Ready Without My Straightener"
      image={image.url}
      imageAlt="Woman holding a hair straightener during her morning routine"
      story={story}
      ctaLabels={["Discover A Smoother Way", "Put Down The Straightener", "Try SilkBrush™ Risk-Free"]}
    />
  ),
});