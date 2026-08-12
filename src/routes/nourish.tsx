import { createFileRoute } from "@tanstack/react-router";
import { GALLERY } from "@/lib/gallery";
import { PRODUCT_TITLE, PRODUCT_SUBTITLE, GUARANTEE_DAYS } from "@/lib/product-config";
import { ProductPage, type ProductCopy } from "@/components/site/ProductPage";

export const Route = createFileRoute("/nourish")({
  head: () => ({
    meta: [
      { title: "NOURISH™ Digestive Support + Daily Essentials — Seralie" },
      {
        name: "description",
        content:
          "One capsule that settles digestion and puts back the nutrients smaller portions leave behind. Magnesium, probiotic, ginger, B12, iron, zinc, D3 and folate.",
      },
      { property: "og:title", content: "NOURISH™ Digestive Support + Daily Essentials — Seralie" },
      {
        property: "og:description",
        content: "Digestive comfort and daily essentials in one capsule. 60-day money-back guarantee.",
      },
      { property: "og:type", content: "product" },
      { property: "og:image", content: `https://seralie.com${GALLERY[0]!.url}` },
      { name: "twitter:image", content: `https://seralie.com${GALLERY[0]!.url}` },
      { property: "og:url", content: "https://seralie.com/nourish" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://seralie.com/nourish" }],
  }),
  component: NourishRoute,
});

const COPY: ProductCopy = {
  eyebrow: PRODUCT_SUBTITLE,
  title: PRODUCT_TITLE,
  lede: "One capsule that settles digestion and puts back the nutrients smaller portions leave behind.",
  bullets: [
    "Magnesium supports regularity and digestive comfort",
    "LactoSpore® probiotic supports gut health",
    "Ginger, traditionally used for occasional nausea",
    "B12, iron, zinc, D3 and folate support everyday energy and nutrition",
  ],
  description:
    "NOURISH™ is one daily capsule serving built for people eating smaller meals. It pairs a digestive comfort blend with the everyday nutrients that are easiest to fall short on when portions get smaller.",
  problemEyebrow: "The real problem",
  problemTitle: "This isn't a willpower problem.",
  problemBody:
    "When you eat less, digestion slows down with it. Less food moving through means less to work with — and the nutrients you used to get from bigger meals quietly drop off too.",
  symptoms: [
    "Bloating after meals",
    "Sluggish digestion",
    "Low energy in the afternoon",
    "Thinning hair",
    "Feeling older than you are",
  ],
  formulaTitle: "Two jobs, one capsule.",
  formulaCards: [
    {
      h: "Settles digestion",
      p: "Magnesium supports regularity and digestive comfort. A LactoSpore® probiotic supports gut health. Ginger has been used traditionally for occasional nausea.",
    },
    {
      h: "Covers the gaps",
      p: "B12, iron, zinc, D3 and folate support everyday energy and nutrition — the nutrients most likely to slip when portions get smaller.",
    },
  ],
  stages: [
    {
      n: "1",
      title: "Slower digestion",
      body: "Meals sit heavier. Things move less predictably than they used to.",
    },
    {
      n: "2",
      title: "Running on less",
      body: "Smaller portions mean fewer nutrients coming in day to day.",
    },
    {
      n: "3",
      title: "It starts to show",
      body: "Energy, hair and everyday resilience are usually the first places people notice.",
    },
  ],
  timeline: [
    {
      k: "Week 1–2",
      items: ["Many people find meals sit a little easier", "Digestion may feel less sluggish"],
    },
    {
      k: "Week 3–4",
      items: ["Regularity may become more predictable", "Some people notice steadier afternoons"],
    },
    {
      k: "Week 5–8",
      items: [
        "This is the window where most people say it clicks",
        "Everyday energy may feel more even as nutrient levels build",
      ],
    },
    {
      k: "Week 9–12+",
      items: [
        "Many people find the routine easy to keep",
        "Hair, skin and nail support builds slowly",
      ],
    },
  ],
  comparisonTitle: "Why NOURISH.",
  comparison: [
    "Digestive enzymes and probiotic in one capsule",
    "Chelated iron and zinc, gentler on the stomach",
    "Eight nutrients printed with full doses",
    "No proprietary-blend hiding of amounts",
    "Third-party tested every batch",
    "Made in a GMP-certified US facility",
  ],
  faqs: [
    {
      q: "How long before I notice anything?",
      a: "Plan on 6–8 weeks. Digestive comfort is usually the first thing people mention. The nutrient side is slower and quieter by nature.",
    },
    {
      q: "When should I take it?",
      a: "Two capsules once daily, in the morning, with food and a full glass of water.",
    },
    {
      q: "Will it upset my stomach?",
      a: "The iron and zinc are chelated forms, which are generally gentler than the oxide forms used in cheaper multivitamins. Taking it with food helps.",
    },
    {
      q: "Can I pause or cancel a subscription?",
      a: "Yes. Skip, pause or cancel anytime from your account or by emailing support.",
    },
    {
      q: "What if it is not for me?",
      a: `${GUARANTEE_DAYS}-day money-back guarantee, no questions asked.`,
    },
  ],
  finalTitle: "Start with one capsule a day.",
};

function NourishRoute() {
  return <ProductPage copy={COPY} />;
}
