import { createFileRoute, Link } from "@tanstack/react-router";
import { SilkShell, RatingLine } from "@/components/site/Silk";
import { PRICE, money } from "@/lib/silkbrush-config";
import heroImg from "@/assets/silkbrush-meet-the-product.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seralie — Haircare, Simplified" },
      {
        name: "description",
        content:
          "Seralie makes thoughtful haircare tools, starting with the SilkBrush™ — a boar-bristle brush that smooths frizz and adds shine while you brush. Free shipping on 2+. 365-day guarantee.",
      },
      { property: "og:title", content: "Seralie — Haircare, Simplified" },
      {
        property: "og:description",
        content: "Thoughtful haircare tools. Meet the SilkBrush™ — smooth, straighten, shine.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SilkShell>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-5 pt-14 pb-16 text-center sm:pt-20 sm:pb-24">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-deep">
          Seralie Haircare
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#171717] sm:text-6xl">
          Good hair days,
          <br />
          every day.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-[#6B6660]">
          One thoughtfully designed brush. Smoother, shinier,
          straighter-looking hair — no heat, no routine overhaul.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            to="/silkbrush"
            className="inline-flex h-14 items-center justify-center rounded-full bg-gold-deep px-10 text-[15px] font-bold uppercase tracking-wide text-white shadow-lg shadow-gold-deep/30 transition hover:bg-[#5C4A35]"
          >
            Meet the SilkBrush™
          </Link>
          <RatingLine />
        </div>
      </section>

      {/* Product feature */}
      <section className="bg-[#FAF9F6]">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-16 sm:grid-cols-2 sm:items-center sm:py-20">
          <div className="overflow-hidden rounded-3xl bg-white">
            <img
              src={heroImg.url}
              alt="Seralie SilkBrush™ boar-bristle brush"
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-deep">
              Our First Release
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#171717] sm:text-4xl">
              The SilkBrush™
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#6B6660]">
              A boar-bristle brush that smooths frizz, tames flyaways, and
              adds natural shine by distributing your hair's own oils from
              root to tip — while you brush.
            </p>
            <p className="mt-4 text-lg font-bold text-[#171717]">
              {money(PRICE)}
              <span className="ml-2 text-sm font-semibold text-[#6B6660]">
                · Free shipping on 2+
              </span>
            </p>
            <Link
              to="/silkbrush"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[#171717] px-8 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#333333]"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { t: "Smooth", d: "Boar bristles tame frizz and flyaways with every pass." },
            { t: "Straighten", d: "A sleeker, straighter-looking finish — no heat required." },
            { t: "Shine", d: "Distributes natural oils for a healthy, glossy look." },
          ].map((v) => (
            <div key={v.t} className="rounded-2xl bg-[#FAF9F6] p-6">
              <h3 className="text-lg font-bold text-[#171717]">{v.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B6660]">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#171717] text-center">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Smooth. Straighten. Shine.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-white/70">
            Try the SilkBrush™ risk-free with our 365-day money-back guarantee.
          </p>
          <Link
            to="/silkbrush"
            className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-gold-deep px-10 text-[15px] font-bold uppercase tracking-wide text-white shadow-lg shadow-gold-deep/30 transition hover:bg-[#5C4A35]"
          >
            Get My SilkBrush™ — {money(PRICE)}
          </Link>
          <p className="mt-4 text-xs text-white/50">
            Free shipping on 2+ · 365-day money-back guarantee
          </p>
        </div>
      </section>
    </SilkShell>
  );
}
