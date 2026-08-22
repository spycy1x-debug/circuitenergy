import { createFileRoute } from "@tanstack/react-router";
import { WWProse } from "@/components/site/WWPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — WaistWrap™" },
      { name: "description", content: "Questions about sizing, an order, or the 60-day fit guarantee? Email support@waistwrap.com — we reply within 24 hours." },
      { property: "og:title", content: "Contact — WaistWrap™" },
      { property: "og:description", content: "Email support@waistwrap.com — we reply within 24 hours." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <WWProse
      eyebrow="Contact"
      title="Talk to a real person."
      intro="Sizing, orders, returns — a human answers, usually within 24 hours on weekdays."
      sections={[
        {
          h: "Email",
          p: (
            <p>
              <a href="mailto:support@waistwrap.com" className="text-[color:var(--cw-ink)] underline">
                support@waistwrap.com
              </a>
              <br />
              Mon–Fri, 9am–5pm ET.
            </p>
          ),
        },
        { h: "Order changes", p: <p>Email within an hour of ordering with your order number and we'll fix the address or cancel before dispatch.</p> },
        { h: "Sizing help", p: <p>Send your natural waist measurement and we'll tell you exactly how to set the tension. Between sizes? Size up.</p> },
        { h: "Returns", p: <p>60-day fit guarantee — email us and we'll start the refund the same day.</p> },
      ]}
    />
  ),
});
