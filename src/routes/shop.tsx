import { createFileRoute, Link } from "@tanstack/react-router";
import { WaistWrapShell, Label, Placeholder, serif, sans } from "@/components/site/WaistWrap";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Waist Strap Adjustable Waist Wrap" },
      { name: "description", content: "Shop Waist Strap — one adjustable band that wraps to your exact waist. Free shipping on 2+ and a 60-day fit guarantee." },
      { property: "og:title", content: "Shop — Waist Strap" },
      { property: "og:description", content: "One adjustable wrap. No hooks, no zippers, no guessing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <WaistWrapShell>
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Label>Shop</Label>
        <h1 style={serif} className="mt-4 text-[36px] leading-[1.06] md:text-[52px]">
          One product, done properly.
        </h1>
        <div className="mt-12 max-w-sm">
          <Link to="/waistwrap" className="group block">
            <Placeholder ratio="4 / 5" note="Waist Strap product shot." />
            <h2 style={serif} className="mt-5 text-[24px]">
              Waist Strap Adjustable Waist Wrap
            </h2>
            <p style={sans} className="mt-1 text-[13px] text-[color:var(--cw-muted)]">
              One size · Wraps to you · From $49.99
            </p>
            <span
              style={sans}
              className="mt-4 inline-block text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--cw-brand)]"
            >
              View product
            </span>
          </Link>
        </div>
      </section>
    </WaistWrapShell>
  );
}
