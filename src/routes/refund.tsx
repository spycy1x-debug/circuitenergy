import { createFileRoute } from "@tanstack/react-router";
import { WWProse } from "@/components/site/WWPage";

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Seralie SilkBrush™" },
      { name: "description", content: "The Seralie SilkBrush™ is covered by a 365-day money-back guarantee. Here is exactly how returns and refunds work." },
      { property: "og:title", content: "Refund Policy — Seralie SilkBrush™" },
      { property: "og:description", content: "365-day money-back guarantee. Full refund of the product price." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <WWProse
      eyebrow="Returns"
      title="365-day money-back guarantee."
      intro="If the SilkBrush™ isn't right for you, we refund the product price — subject to this policy."
      sections={[
        { h: "How it works", p: <p>Email support@seralie.com within 365 days of delivery with your order number and we'll send return instructions.</p> },
        { h: "What you get back", p: <p>The full product price. Original shipping charges are not refunded, and return postage is the customer's responsibility unless the item arrived damaged or incorrect.</p> },
        { h: "Timing", p: <p>Refunds are issued to the original payment method within 3 business days of the return being received, and usually land in 5–10 days depending on your bank.</p> },
        { h: "Damaged or wrong item", p: <p>Send a photo. We reship immediately at our cost — no return needed.</p> },
        { h: "Cancellations", p: <p>Email us within one hour of ordering and we'll cancel before dispatch.</p> },
      ]}
    />
  ),
});
