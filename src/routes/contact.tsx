import { createFileRoute } from "@tanstack/react-router";
import { WWProse } from "@/components/site/WWPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Seralie SilkBrush™" },
      { name: "description", content: "Questions about your order, the SilkBrush™, or our 30-day money-back guarantee? Email support@seralie.com — we reply within 24 hours." },
      { property: "og:title", content: "Contact — Seralie SilkBrush™" },
      { property: "og:description", content: "Email support@seralie.com — we reply within 24 hours." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <WWProse
      eyebrow="Contact"
      title="Talk to a real person."
      intro="Orders, product questions, returns — a human answers, usually within 24 hours on weekdays."
      sections={[
        {
          h: "Email",
          p: (
            <p>
              <a href="mailto:support@seralie.com" className="text-[color:var(--cw-ink)] underline">
                support@seralie.com
              </a>
              <br />
              Mon–Fri, 9am–5pm ET.
            </p>
          ),
        },
        { h: "Order changes", p: <p>Email within an hour of ordering with your order number and we'll fix the address or cancel before dispatch.</p> },
        { h: "Using the SilkBrush™", p: <p>Use it on dry hair, working through small sections. Email us if you'd like routine tips for your hair type.</p> },
        { h: "Returns", p: <p>30-day money-back guarantee — email us and we'll start the return the same day.</p> },
      ]}
    />
  ),
});
