import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Seralie" },
      {
        name: "description",
        content: "The terms that apply when you browse seralie.com or order NOURISH™.",
      },
      { property: "og:title", content: "Terms of Service — Seralie" },
      { property: "og:description", content: "Terms that apply to orders placed with Seralie." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://seralie.com/terms" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://seralie.com/terms" }],
  }),
  component: TermsPage,
});

const SECTIONS = [
  {
    h: "Agreement",
    p: "By using seralie.com or placing an order, you agree to these terms. If you do not agree, please do not use the site.",
  },
  {
    h: "Orders and pricing",
    p: "All orders are subject to acceptance and availability. Prices are shown in US dollars and may change at any time. We may cancel and refund an order that was placed at an incorrect price.",
  },
  {
    h: "Subscriptions",
    p: "Subscription orders renew automatically at the cadence shown at checkout, at the subscription price in effect at the time of renewal. You may skip, pause or cancel anytime from your account or by contacting support before the next renewal is processed.",
  },
  {
    h: "Use of the site",
    p: "You may not misuse the site, attempt to gain unauthorised access, or copy site content for commercial use without written permission. All brand names, text and imagery on this site belong to Seralie.",
  },
  {
    h: "Health information",
    p: "Content on this site is for general information only and is not medical advice. Consult your physician before starting any supplement, especially if you are pregnant, nursing, taking medication or managing a medical condition.",
  },
  {
    h: "Limitation of liability",
    p: "To the extent permitted by law, Seralie is not liable for indirect or consequential losses arising from use of the site or products. Nothing in these terms limits liability that cannot be limited by law.",
  },
  {
    h: "Changes",
    p: "We may update these terms. The version posted here is the version that applies to your order at the time it is placed.",
  },
  {
    h: "Contact",
    p: "Questions about these terms can be sent through our contact page and we will respond within one business day.",
  },
];

function TermsPage() {
  return (
    <section className="container-x max-w-3xl py-14 md:py-20">
      <div className="eyebrow">Legal</div>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">Terms of service</h1>
      <div className="mt-10 space-y-8">
        {SECTIONS.map((s) => (
          <div key={s.h}>
            <h2 className="font-display text-2xl text-[color:var(--navy)]">{s.h}</h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted-foreground)]">{s.p}</p>
          </div>
        ))}
      </div>
      <p className="mt-12 border-t border-[color:var(--border)] pt-6 text-xs leading-6 text-[color:var(--taupe)]">
        These statements have not been evaluated by the Food and Drug Administration. This product is not
        intended to diagnose, treat, cure, or prevent any disease.
      </p>
    </section>
  );
}
