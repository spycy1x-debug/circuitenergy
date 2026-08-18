import { createFileRoute, Link } from "@tanstack/react-router";
import { GUARANTEE_DAYS } from "@/lib/patch-config";

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Seralie" },
      {
        name: "description",
        content: `Our LED pimple patches are covered by a ${GUARANTEE_DAYS}-day money-back guarantee. Here is how returns and refunds work.`,
      },
      { property: "og:title", content: "Refund Policy — Seralie" },
      { property: "og:description", content: `${GUARANTEE_DAYS}-day money-back guarantee on every order.` },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://seralie.com/refund" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://seralie.com/refund" }],
  }),
  component: RefundPage,
});

function RefundPage() {
  const SECTIONS = [
    {
      h: `${GUARANTEE_DAYS}-day money-back guarantee`,
      p: `If the patches are not right for you, contact us within ${GUARANTEE_DAYS} days of delivery for a full refund of the product price. Opened packs are fine — we ask that you actually give them a fair try.`,
    },
    {
      h: "How to start a refund",
      p: "Message us through the contact page with your order number and we will reply with return instructions within one business day.",
    },
    {
      h: "Processing time",
      p: "Refunds are issued to the original payment method once the return is received or approved, and typically appear within 5–10 business days depending on your bank.",
    },
    {
      h: "One-time orders only",
      p: "Every order is a one-time purchase. There is no subscription and nothing rebills.",
    },
    {
      h: "Damaged or incorrect orders",
      p: "If an order arrives damaged or incorrect, send us a photo and we will replace it at no cost. Package Protection covers loss and theft in transit.",
    },
    {
      h: "Exclusions",
      p: "Shipping charges paid on expedited services are non-refundable. The guarantee applies to one order per household.",
    },
  ];

  return (
    <section className="container-x max-w-3xl py-14 md:py-20">
      <div className="eyebrow">Legal</div>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">Refund policy</h1>
      <div className="mt-10 space-y-8">
        {SECTIONS.map((s) => (
          <div key={s.h}>
            <h2 className="font-display text-2xl text-[color:var(--navy)]">{s.h}</h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted-foreground)]">{s.p}</p>
          </div>
        ))}
      </div>
      <Link to="/contact" className="btn-outline mt-10">
        Contact support
      </Link>
    </section>
  );
}
