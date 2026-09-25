import { createFileRoute } from "@tanstack/react-router";
import { AdvertorialPage } from "@/components/site/AdvertorialPage";
import story from "@/content/advertorial-1.txt?raw";
import image from "@/assets/advertorial-hair-fight.png.asset.json";

export const Route = createFileRoute("/advertorial-1")({
  head: () => ({
    meta: [
      { title: "I Was Tired of Fighting With My Hair Every Morning | Seralie" },
      { name: "description", content: "One woman's story of simplifying her morning hair routine with the Seralie SilkBrush™." },
      { property: "og:title", content: "I Was Tired of Fighting With My Hair Every Morning" },
      { property: "og:description", content: "A personal story about frizz, changing texture, and finding a simpler way to feel put together." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <AdvertorialPage
      headline="I Was Tired of Fighting With My Hair Every Morning"
      image={image.url}
      imageAlt="Woman examining a frizzy section of her hair in the bathroom"
      story={story}
      ctaLabels={["See How SilkBrush™ Works", "Give Your Hair Another Option", "Try SilkBrush™ For Yourself"]}
    />
  ),
});