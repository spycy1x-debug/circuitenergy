import { createFileRoute } from "@tanstack/react-router";
import { WaistWrapShell, Faq, Label, serif, sans } from "@/components/site/WaistWrap";
import { Link } from "@tanstack/react-router";

const FAQS = [
  { q: "How does WaistSnatch™ work?", a: "It is one long compression band you wrap around your waist and secure yourself. You set the tension, so it molds to your exact shape instead of forcing you into a fixed size." },
  { q: "What size do I order?", a: "One size. WaistSnatch™ adjusts across XS–3XL because you control the wrap. Between sizes? Size up." },
  { q: "Will it show under clothes?", a: "No. The band is 1.2mm thin with a bonded flat edge — no ridge, no line, even under a bodycon dress." },
  { q: "How long can I wear it?", a: "All day. Start with 4–6 hours if you have never worn a waist piece before, then build up." },
  { q: "How do I wash it?", a: "Cold water, mild soap, hang dry. Never tumble dry — heat kills elastic." },
  { q: "Shipping?", a: "Ships within 24 hours. Free US shipping on orders of 2+ wraps, $4.95 flat on single wraps. Delivery is typically 3–5 business days." },
  { q: "Returns?", a: "60-day fit guarantee. If it is not right, email support@seralie.com and we refund the product price in full." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — WaistSnatch™ Adjustable WaistSnatch™" },
      { name: "description", content: "Sizing, wear time, washing, shipping and the 60-day fit guarantee for WaistSnatch™, the adjustable wrap waist trainer." },
      { property: "og:title", content: "FAQ — WaistSnatch™" },
      { property: "og:description", content: "Everything about sizing, wear time, washing and returns." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <WaistWrapShell>
      <section className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <Label>Questions</Label>
        <h1 style={serif} className="mt-4 mb-10 text-[36px] leading-[1.06] md:text-[52px]">
          Everything you asked.
        </h1>
        <Faq items={FAQS} />
        <div className="mt-14">
          <Link
            to="/waistwrap"
            style={sans}
            className="inline-block rounded-full bg-[color:var(--cw-brand)] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-white hover:opacity-90"
          >
            Shop WaistSnatch™ — $49.99
          </Link>
        </div>
      </section>
    </WaistWrapShell>
  );
}
