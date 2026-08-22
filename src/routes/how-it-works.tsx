import { createFileRoute } from "@tanstack/react-router";
import { WWProse } from "@/components/site/WWPage";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Waist Strap Works — Wrap, Press, Go" },
      { name: "description", content: "How the Waist Strap adjustable waist wrap works: set the tab, wrap firm, press the panel. Fifteen seconds to a snatched waist that holds all day." },
      { property: "og:title", content: "How Waist Strap Works" },
      { property: "og:description", content: "Fifteen seconds to wrap. All day of hold. No hooks, no zippers." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorks,
});

function HowItWorks() {
  return (
    <WWProse
      eyebrow="How it works"
      title="Fifteen seconds. Then you forget it's on."
      intro="Waist Strap is one long compression band. You wrap it, you set the tension, and it holds the shape you chose — no hooks to snap, no zipper to fight, no size chart to get wrong."
      sections={[
        { h: "01 · Set the tab at your navel", p: <p>Hold the marked tab flat against your stomach. That is your anchor point and it stops the band from rolling.</p> },
        { h: "02 · Wrap firm, twice around", p: <p>Pull to the tension you want. This is the part rigid trainers can't do — you decide the shape, not a factory size chart.</p> },
        { h: "03 · Press the panel and go", p: <p>Smooth the panel down and it locks. The bonded 1.2mm flat edge means nothing prints through your clothes.</p> },
        { h: "Why it stays put", p: <p>Traditional trainers rely on hooks under tension, which pop mid-wear. A wrap distributes the pull across the whole band, so it grips itself instead of a single row of hardware.</p> },
        { h: "Wear time", p: <p>Wear it all day once you are used to it. New to waist wear? Start at 4–6 hours and build up over a week.</p> },
        { h: "Care", p: <p>Cold water, mild soap, hang dry. Never tumble dry — heat is what kills elastic.</p> },
      ]}
    />
  );
}
