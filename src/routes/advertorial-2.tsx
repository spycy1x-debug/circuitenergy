import { createFileRoute } from "@tanstack/react-router";
import { AdvertorialPage } from "@/components/site/AdvertorialPage";
import story from "@/content/advertorial-2.txt?raw";
import image from "@/assets/advertorial-confidence.webp.asset.json";

export const Route = createFileRoute("/advertorial-2")({
  head: () => ({
    meta: [
      { title: "I Didn't Realize How Much My Hair Was Affecting Me | Seralie" },
      { name: "description", content: "A personal story about difficult hair, confidence, and a simpler smoothing routine with SilkBrush™." },
      { property: "og:title", content: "I Didn't Realize How Much My Hair Was Affecting Me" },
      { property: "og:description", content: "A personal story about feeling put together again without building the morning around difficult hair." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <AdvertorialPage
      headline="I Didn't Realize How Much My Hair Was Affecting Me"
      image={image.url}
      imageAlt="Woman looking at her hair in a bathroom mirror"
      story={story}
      ctaLabels={["Meet The Seralie SilkBrush™", "See The Smoother-Hair Routine", "Feel Put Together Again"]}
    />
  ),
});