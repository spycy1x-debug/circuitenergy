import { createFileRoute } from "@tanstack/react-router";
import { WWProse } from "@/components/site/WWPage";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping — Waist Strap" },
      { name: "description", content: "Waist Strap ships within 24 hours. Free US shipping on orders of 2+ wraps, $4.95 flat on single wraps, 3–5 business day delivery." },
      { property: "og:title", content: "Shipping — Waist Strap" },
      { property: "og:description", content: "Ships in 24 hours. Free shipping on 2+." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <WWProse
      eyebrow="Shipping"
      title="Ships within 24 hours."
      intro="Orders placed before 2pm ET leave the same business day. Everything ships from our US warehouse."
      sections={[
        { h: "Rates", p: <p>Free US shipping on orders of 2+ wraps. Single wraps ship for a flat $4.95.</p> },
        { h: "Delivery time", p: <p>Typically 3–5 business days after dispatch. Remote addresses can take a little longer.</p> },
        { h: "Tracking", p: <p>You get a tracking link by email the moment your parcel is scanned. If it hasn't moved in 5 days, email support@seralie.com and we'll chase it or reship.</p> },
        { h: "International", p: <p>We ship to Canada, the UK, Australia and the EU. Delivery is 7–14 business days; local duties are the customer's responsibility.</p> },
        { h: "Wrong address", p: <p>Email us within an hour of ordering and we'll correct it before dispatch.</p> },
      ]}
    />
  ),
});
