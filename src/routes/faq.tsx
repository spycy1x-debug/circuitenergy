import { createFileRoute, Link } from "@tanstack/react-router";
import { GUARANTEE_DAYS } from "@/lib/patch-config";

const FAQS = [
  {
    q: "How do the LED patches work?",
    a: "Medical-grade hydrocolloid draws out fluid from the spot while 415nm blue light targets acne bacteria and 630nm red light calms the redness around it.",
  },
  {
    q: "How long do I wear one?",
    a: "Six to eight hours — put it on before bed and take it off in the morning. Cleanse and dry the area first so the edges seal.",
  },
  {
    q: "Do they work on spots with no head?",
    a: "That is the point of the light. Ordinary hydrocolloid needs an opening to pull anything out; red and blue light pass through skin, so a blind spot still gets treated.",
  },
  {
    q: "How many patches do I get?",
    a: "Each set is 60 clear 12mm patches — roughly two months — plus the reusable light case and a carry pouch.",
  },
  {
    q: "Can I wear makeup over them?",
    a: "They are thin and clear, so light makeup sits over them fine. Most people wear them overnight anyway.",
  },
  {
    q: "Is it safe for sensitive skin?",
    a: "Hydrocolloid is the same material used in wound dressings and is one of the gentlest options available. Stop use if redness lasts after removal. Not a medical device.",
  },
  {
    q: "When will my order ship?",
    a: "Free US shipping on orders over $40, and free on the Buy 2 Get 2 and Buy 3 Get 3 sets. Orders ship within 24 hours with tracking by email.",
  },
  {
    q: "What if they don't work for me?",
    a: `${GUARANTEE_DAYS}-day money-back guarantee. Contact us and we refund you in full.`,
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Seralie LED Pimple Patches" },
      {
        name: "description",
        content:
          "Answers on wear time, red and blue light, sensitive skin, shipping and the 60-day money-back guarantee on Seralie LED pimple patches.",
      },
      { property: "og:title", content: "FAQ — Seralie LED Pimple Patches" },
      { property: "og:description", content: "How the patches work, wear time, shipping and returns." },
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
        <Link to="/patches" className="btn-primary">
          Shop patches
        </Link>
        <Link to="/contact" className="btn-outline">
          Contact us
        </Link>
      </div>
    </section>
  );
}
