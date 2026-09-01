import { createFileRoute } from "@tanstack/react-router";
import { WWProse } from "@/components/site/WWPage";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping — Seralie SilkBrush™" },
      { name: "description", content: "Free shipping on 2+ Seralie SilkBrush™ orders. Processed in 1–2 business days, typically delivered in 3–5 business days within the US." },
      { property: "og:title", content: "Shipping — Seralie SilkBrush™" },
      { property: "og:description", content: "Free shipping on 2+. Processed in 1–2 business days." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <WWProse
      eyebrow="Shipping"
      title="Free shipping on 2+ brushes."
      intro="Orders are processed within 1–2 business days and ship from our US warehouse."
      sections={[
        { h: "Rates", p: <p>Shipping is free on orders of 2+ brushes. Single-brush orders ship at a flat rate.</p> },
        { h: "Delivery time", p: <p>Typically 3–5 business days after dispatch within the US. Remote addresses can take a little longer.</p> },
        { h: "Tracking", p: <p>You get a tracking link by email as soon as your parcel is scanned. If it hasn't moved in 5 days, email support@seralie.com and we'll chase it or reship.</p> },
        { h: "International", p: <p>We ship to Canada, the UK, Australia and the EU. Delivery is 7–14 business days; local duties are the customer's responsibility.</p> },
        { h: "Wrong address", p: <p>Email us within an hour of ordering and we'll correct it before dispatch.</p> },
      ]}
    />
  ),
});
