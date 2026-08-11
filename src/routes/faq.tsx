import { createFileRoute, Link } from "@tanstack/react-router";
import { GUARANTEE_DAYS } from "@/lib/product-config";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Seralie NOURISH™" },
      {
        name: "description",
        content:
          "Answers on dosing, timing, subscriptions, shipping and the 60-day money-back guarantee for NOURISH™.",
      },
      { property: "og:title", content: "FAQ — Seralie NOURISH™" },
      { property: "og:description", content: "Dosing, timing, subscriptions, shipping and returns." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://seralie.com/faq" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://seralie.com/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

const FAQS = [
  {
    q: "How do I take NOURISH?",
    a: "Two capsules once daily in the morning, with food and a full glass of water.",
  },
  {
    q: "How long before I notice anything?",
    a: "Plan on 6–8 weeks. Digestive comfort is usually the first thing people mention; the nutrient side builds more slowly. Individual experience varies.",
  },
  {
    q: "What is in it?",
    a: "Magnesium, a LactoSpore® probiotic, ginger, bromelain and DigeZyme enzymes, BioPerine for absorption, plus B12, iron, zinc, D3 and folate. Full amounts are printed on the label.",
  },
  {
    q: "Will it upset my stomach?",
    a: "The iron and zinc are chelated forms, which are generally gentler than the oxide forms used in cheaper multivitamins. Taking it with food helps.",
  },
  {
    q: "Can I take it with other supplements or medication?",
    a: "If you take medication, are pregnant or nursing, or have a medical condition, speak with your doctor before starting any supplement.",
  },
  {
    q: "How does the subscription work?",
    a: "You save 25% and your order arrives on the cadence shown at checkout. Skip, pause or cancel anytime from your account or by emailing support.",
  },
  {
    q: "Is Package Protection charged every time?",
    a: "No. It is a one-time charge on the first order and is never added to a subscription rebill.",
  },
  {
    q: "When will my order ship?",
    a: "Free US shipping. Orders ship from our US facility within 24 hours, and tracking arrives by email.",
  },
  {
    q: "What if it is not for me?",
    a: `${GUARANTEE_DAYS}-day money-back guarantee. Return your order and we refund you in full.`,
  },
];

function FaqPage() {
  return (
    <section className="container-x max-w-3xl py-14 md:py-20">
      <div className="eyebrow">Support</div>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">Frequently asked questions</h1>
      <dl className="mt-10 divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
        {FAQS.map((f) => (
          <div key={f.q} className="py-6">
            <dt className="font-display text-xl text-[color:var(--navy)]">{f.q}</dt>
            <dd className="mt-3 text-sm leading-7 text-[color:var(--muted-foreground)]">{f.a}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/nourish" className="btn-primary">
          Shop NOURISH
        </Link>
        <Link to="/contact" className="btn-outline">
          Contact us
        </Link>
      </div>
    </section>
  );
}
