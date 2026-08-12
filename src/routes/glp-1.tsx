import { createFileRoute } from "@tanstack/react-router";
import { GALLERY } from "@/lib/gallery";
import { GUARANTEE_DAYS } from "@/lib/product-config";
import { ProductPage, type ProductCopy } from "@/components/site/ProductPage";

export const Route = createFileRoute("/glp-1")({
  head: () => ({
    meta: [
      { title: "NOURISH™ for GLP-1 — Nutrient + Digestive Support on Semaglutide" },
      {
        name: "description",
        content:
          "Built for people on GLP-1s. One capsule that eases the nausea, constipation and nutrient gaps that come with eating a fraction of what you used to.",
      },
      {
        property: "og:title",
        content: "NOURISH™ for GLP-1 — Nutrient + Digestive Support on Semaglutide",
      },
      {
        property: "og:description",
        content:
          "Eating a third of what you used to? One capsule for GLP-1 digestion and the nutrients you're no longer getting from food.",
      },
      { property: "og:type", content: "product" },
      { property: "og:image", content: `https://seralie.com${GALLERY[0]!.url}` },
      { name: "twitter:image", content: `https://seralie.com${GALLERY[0]!.url}` },
      { property: "og:url", content: "https://seralie.com/glp-1" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://seralie.com/glp-1" }],
  }),
  component: Glp1Route,
});

const COPY: ProductCopy = {
  eyebrow: "Built for GLP-1 users",
  title: "NOURISH™ for GLP-1",
  lede: "The shot shrinks the appetite. It doesn't shrink what your body still needs. One capsule for the nausea, the slowdown and the nutrients you're no longer eating.",
  bullets: [
    "Ginger, traditionally used for the occasional nausea that comes with GLP-1s",
    "Magnesium supports regularity when digestion slows to a crawl",
    "LactoSpore® probiotic supports gut health on a much smaller food intake",
    "B12, iron, zinc, D3 and folate — the nutrients that drop first on a GLP-1",
  ],
  description:
    "NOURISH™ for GLP-1 is one daily capsule serving for people on semaglutide, tirzepatide or a compounded equivalent. Appetite suppression means fewer calories and fewer nutrients — this covers the digestive side effects and the nutrient gap in the same capsule, so you lose fat instead of hair, muscle tone and energy.",
  problemEyebrow: "What nobody warns you about",
  problemTitle: "The weight comes off. So does everything else.",
  problemBody:
    "On a GLP-1 you might be eating a third of what you used to. Gastric emptying slows, so meals sit, nausea shows up and regularity goes out the window. And a third of the food is a third of the iron, B12, protein cofactors and minerals — which is why the tiredness, hair shedding and weakness usually start around month two.",
  symptoms: [
    "Nausea after eating even a small meal",
    "Constipation and long gaps between bowel movements",
    "Hair shedding in the shower around month 2–3",
    "Feeling weak or lightheaded on low intake",
    "Afternoon energy crashes that sleep doesn't fix",
  ],
  formulaTitle: "Two problems the shot creates. One capsule.",
  formulaCards: [
    {
      h: "Handles the side effects",
      p: "Ginger has been used traditionally for occasional nausea. Magnesium supports regularity when gastric emptying slows down. A LactoSpore® probiotic supports gut health while you're eating far less fiber and food.",
    },
    {
      h: "Replaces what you're not eating",
      p: "B12, iron, zinc, D3 and folate support energy, hair and everyday nutrition — the exact nutrients that fall off fastest when intake drops by half or more.",
    },
  ],
  stages: [
    {
      n: "1",
      title: "Appetite disappears",
      body: "You eat a fraction of what you used to, and you're not hungry enough to notice.",
    },
    {
      n: "2",
      title: "Digestion slows",
      body: "Food sits longer. Nausea and constipation become the daily tax on the dose.",
    },
    {
      n: "3",
      title: "The gap catches up",
      body: "Around month two, energy, hair and strength start telling you what's missing.",
    },
  ],
  timeline: [
    {
      k: "Week 1–2",
      items: [
        "Many people find meals sit easier after the shot",
        "Occasional nausea may feel less sharp",
      ],
    },
    {
      k: "Week 3–4",
      items: [
        "Regularity may become more predictable again",
        "Some people notice steadier afternoons on low intake",
      ],
    },
    {
      k: "Week 5–8",
      items: [
        "This is the window where most GLP-1 users say it clicks",
        "Energy may feel more even as nutrient levels rebuild",
      ],
    },
    {
      k: "Week 9–12+",
      items: [
        "Easy to keep taking through dose escalations",
        "Hair, skin and nail support builds slowly",
      ],
    },
  ],
  comparisonTitle: "Why NOURISH on a GLP-1.",
  comparison: [
    "Formulated around GLP-1 side effects, not general wellness",
    "Ginger and magnesium for nausea and slowed digestion",
    "Chelated iron and zinc, gentler on an already sensitive stomach",
    "One capsule serving — realistic when food is hard to get down",
    "Eight nutrients printed with full doses, no proprietary blends",
    "Third-party tested, made in a GMP-certified US facility",
  ],
  faqs: [
    {
      q: "Can I take this with semaglutide or tirzepatide?",
      a: "NOURISH™ is a dietary supplement, not a medication, and is designed to be taken alongside a GLP-1. As with anything you add while on a prescription, check with your prescriber first.",
    },
    {
      q: "Will it help with the nausea?",
      a: "Ginger has been used traditionally for occasional nausea, and taking the capsules with food and water helps. It is not a treatment for medication side effects — talk to your doctor if nausea is severe.",
    },
    {
      q: "What about constipation?",
      a: "Magnesium supports regularity and digestive comfort, which is the most common complaint we hear from GLP-1 users. Water and fiber still matter.",
    },
    {
      q: "Will this stop hair shedding?",
      a: "Shedding on a GLP-1 is usually tied to rapid weight loss and low intake of iron, zinc, B12 and biotin. NOURISH™ supplies those nutrients. Hair support builds over months, not weeks.",
    },
    {
      q: "When should I take it?",
      a: "Two capsules once daily, in the morning, with food and a full glass of water — on your shot day too.",
    },
    {
      q: "What if it is not for me?",
      a: `${GUARANTEE_DAYS}-day money-back guarantee, no questions asked.`,
    },
  ],
  finalTitle: "Lose the weight. Keep everything else.",
};

function Glp1Route() {
  return <ProductPage copy={COPY} />;
}
