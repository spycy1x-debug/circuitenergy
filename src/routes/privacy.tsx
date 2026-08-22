import { createFileRoute } from "@tanstack/react-router";
import { WWProse } from "@/components/site/WWPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — WaistWrap™" },
      { name: "description", content: "How WaistWrap™ handles your information when you place an order or join the email list, including storage and deletion on request." },
      { property: "og:title", content: "Privacy Policy — WaistWrap™" },
      { property: "og:description", content: "What we collect, why, and how to have it deleted." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <WWProse
      cta={false}
      eyebrow="Privacy"
      title="Privacy policy."
      intro="We collect the minimum needed to ship your order and answer your emails. We do not sell your data."
      sections={[
        { h: "What we collect", p: <p>Name, shipping address, email, and order details. Payment card data is handled by our payment processor and never touches our servers.</p> },
        { h: "Why we collect it", p: <p>To fulfil and support your order, to prevent fraud, and — if you opt in — to send occasional email about restocks and offers.</p> },
        { h: "Analytics", p: <p>We use standard website analytics and advertising pixels to understand traffic and measure ads. These use cookies and can be blocked in your browser.</p> },
        { h: "Sharing", p: <p>Only with the providers needed to run the store: payments, shipping carriers, email and analytics. Never sold.</p> },
        { h: "Your rights", p: <p>Request a copy of your data or ask us to delete it. Email support@waistwrap.com and we respond within 30 days.</p> },
        { h: "Contact", p: <p>Questions about this policy: support@waistwrap.com.</p> },
      ]}
    />
  ),
});
