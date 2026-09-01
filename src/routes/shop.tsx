import { createFileRoute, Link } from "@tanstack/react-router";
import { SilkShell, Label, Media, serif, sans } from "@/components/site/Silk";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Seralie SilkBrush™" },
      { name: "description", content: "Shop the Seralie SilkBrush™ — a boar-bristle brush for smoother, shinier, straighter-looking hair. $37.99 with free shipping on 2+." },
      { property: "og:title", content: "Shop — Seralie SilkBrush™" },
      { property: "og:description", content: "One brush. Smoother, shinier, straighter-looking hair." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <SilkShell>
      <section className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
        <Label>Shop</Label>
        <h1 style={serif} className="mt-4 text-[34px] leading-[1.06] md:text-[48px]">
          One product, done properly.
        </h1>
        <div className="mt-10 max-w-sm">
          <Link to="/silkbrush" className="group block">
            <Media label="IMAGE" ratio="4 / 5" note="SilkBrush™ product shot." />
            <h2 style={serif} className="mt-5 text-[24px]">
              Seralie SilkBrush™
            </h2>
            <p style={sans} className="mt-1 text-[13px] text-[color:var(--cw-muted)]">
              Boar-bristle smoothing brush · $37.99
            </p>
            <span style={sans} className="mt-4 inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--cw-brand-deep)]">
              View product
            </span>
          </Link>
        </div>
      </section>
    </SilkShell>
  );
}
