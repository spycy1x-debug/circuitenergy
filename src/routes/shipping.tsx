import { createFileRoute, Link } from "@tanstack/react-router";
import { GUARANTEE_DAYS } from "@/lib/product-config";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping — Seralie" },
      {
        name: "description",
        content:
          "Free US shipping on NOURISH™ orders over $50. Ships from our US facility within 24 hours with tracking by email.",
      },
      { property: "og:title", content: "Shipping — Seralie" },
      { property: "og:description", content: "Free US shipping over $50, dispatched within 24 hours." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://seralie.com/shipping" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://seralie.com/shipping" }],
  }),
  component: ShippingPage,
});

function ShippingPage() {
  const SECTIONS = [
    {
      h: "Free US shipping over $50",
      p: "Shipping is free on US orders over $50, one-time or subscription. Orders under $50 show a flat rate at checkout.",
    },
    {
      h: "Dispatch",
      p: "Orders placed before 2pm ET ship the same business day. Everything else ships from our US facility within 24 hours.",
    },
    {
      h: "Delivery times",
      p: "US delivery is typically 3–5 business days after dispatch. Remote addresses can take a little longer.",
    },
    {
      h: "Tracking",
      p: "A tracking link is emailed as soon as your parcel is scanned. If it has not arrived within 24 hours of your confirmation, check spam and then contact us.",
    },
    {
      h: "Package Protection",
      p: "Package Protection is an optional $4.99 add-on at checkout that covers loss, theft and damage in transit. It is charged once and never on a subscription rebill.",
    },
    {
      h: "Subscription deliveries",
      p: "Subscription orders ship on the cadence shown at checkout and follow the same free shipping and 24-hour dispatch. Skip or pause anytime.",
    },
    {
      h: "Address changes",
      p: "Contact us as soon as possible if an address is wrong. Once a parcel has shipped we cannot redirect it, but Package Protection covers a reship.",
    },
  ];

  return (
    <section className="container-x max-w-3xl py-14 md:py-20">
      <div className="eyebrow">Support</div>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">Shipping</h1>
      <p className="mt-6 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
        Free US shipping over $50 · Ships in 24 hours · {GUARANTEE_DAYS}-day money-back guarantee
      </p>
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
