import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Star } from "lucide-react";
import neuralImg from "@/assets/neural-bottle.png";
import nmnImg from "@/assets/nmn-bottle.png";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Circuit Energy Supplements" },
      { name: "description", content: "Shop Circuit Neural Performance and Circuit NMN — premium dietary supplements formulated to support daily energy and cognitive function." },
    ],
  }),
  component: ShopPage,
});

const serif = { fontFamily: '"Instrument Serif", Georgia, serif' };

const products = [
  { hero: true, slug: "neural-performance", image: neuralImg, title: "Circuit Neural Performance", subtitle: "Focus & Cognitive Enhancement", price: "42.99", desc: "10 natural compounds — Alpha GPC, Bacopa, L-Theanine, Huperzine A — formulated to help support mental clarity and focus.*", benefits: ["Supports mental clarity*","Helps support focus and memory*","Smooth energy without jitters*","No artificial additives"], cta: "Shop Neural Performance", tone: "violet", italic: "​" },
  { hero: false, slug: "nmn", image: nmnImg, title: "Circuit NMN", subtitle: "Cellular Energy & Longevity", price: "49.99", desc: "500mg NMN per serving. NMN is a precursor to NAD+, a coenzyme involved in cellular energy metabolism.*", benefits: ["Helps support sustained daytime energy*","Supports cellular energy production*","Supports restful sleep*"], cta: "Shop Circuit NMN", tone: "amber", italic: "​" },
];

const tones: Record<string, { bg: string; ring: string; text: string; soft: string }> = {
  amber:  { bg: "oklch(0.96 0.06 70)",  ring: "oklch(0.75 0.18 55)",  text: "oklch(0.45 0.15 55)",  soft: "oklch(0.98 0.03 70)" },
  violet: { bg: "oklch(0.96 0.04 290)", ring: "oklch(0.65 0.17 290)", text: "oklch(0.42 0.16 290)", soft: "oklch(0.98 0.02 290)" },
};

function ShopPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[oklch(0.15_0.03_245)] text-white">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at 15% 20%, oklch(0.55 0.18 290 / 0.55), transparent 55%), radial-gradient(ellipse at 90% 80%, oklch(0.6 0.18 55 / 0.5), transparent 50%), linear-gradient(135deg, oklch(0.18 0.05 250), oklch(0.12 0.04 245))",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0 / 0.6) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="container-x py-20 md:py-24 max-w-3xl text-center mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.75_0.2_55)] animate-pulse" />
            The Circuit Stack
          </span>
          <h1 className="mt-6 text-5xl md:text-7xl leading-[0.95] text-white">
            Shop <em style={serif} className="italic font-normal text-[oklch(0.85_0.15_70)]">Circuit</em>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80">
            Two formulas. One mission: help you feel and think like <em style={serif} className="italic text-white">yourself</em> again.
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="container-x py-16 md:py-20 grid gap-8 md:grid-cols-2">
        {products.map((p) => {
          const t = tones[p.tone];
          const parts = p.title.split(p.italic);
          return (
            <div
              key={p.slug}
              className={`group relative rounded-3xl bg-white border ${p.hero ? "shadow-2xl" : "shadow-md"} p-8 flex flex-col overflow-hidden transition-transform hover:-translate-y-1`}
              style={{ borderColor: t.ring + "55" }}
            >
              <div
                aria-hidden
                className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-50"
                style={{ background: t.bg }}
              />
              {p.hero && (
                <div
                  className="absolute top-5 right-5 z-10 text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1.5 rounded-full text-white shadow"
                  style={{ background: t.ring }}
                >
                  Most Popular
                </div>
              )}
              <div
                className="relative aspect-square rounded-2xl flex items-center justify-center mb-6 overflow-hidden"
                style={{ background: `linear-gradient(160deg, ${t.soft}, white)`, boxShadow: `inset 0 0 0 1px ${t.ring}33` }}
              >
                <div style={serif} className="absolute top-3 left-4 text-7xl leading-none" aria-hidden>
                  <span style={{ color: t.ring, opacity: 0.18 }}>{p.hero ? "01" : "02"}</span>
                </div>
                <img src={p.image} alt={p.title} className="relative max-h-80 object-contain transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="relative">
                <div
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold"
                  style={{ color: t.text }}
                >
                  <span className="h-px w-6" style={{ background: t.ring }} />
                  {p.subtitle}
                </div>
                <h2 className="mt-2 text-3xl md:text-4xl text-ink leading-tight">
                  {parts[0]}<em style={serif} className="italic font-normal" >{p.italic}</em>{parts[1]}
                </h2>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex">
                    {[1,2,3,4].map(i => <Star key={i} className="h-4 w-4 fill-current" style={{ color: t.ring }} />)}
                    <Star className="h-4 w-4 fill-current opacity-40" style={{ color: t.ring }} />
                  </div>
                  <span className="text-sm text-muted-foreground">{p.rating} ({p.reviews})</span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span style={serif} className="text-5xl text-ink leading-none">${p.price}</span>
                  <span className="text-sm text-muted-foreground">/ bottle</span>
                </div>
                <p className="mt-4 text-body">{p.desc}</p>
                <ul className="mt-5 space-y-2">
                  {p.benefits.map(b => (
                    <li key={b} className="flex items-center gap-2 text-sm text-body">
                      <span
                        className="inline-flex h-5 w-5 items-center justify-center rounded-full"
                        style={{ background: t.bg }}
                      >
                        <Check className="h-3 w-3" style={{ color: t.text }} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/product/$slug"
                  params={{ slug: p.slug }}
                  className="mt-7 inline-flex w-full items-center justify-center rounded-xl px-6 py-4 text-base font-semibold text-white transition-all hover:scale-[1.02]"
                  style={{ background: `linear-gradient(135deg, ${t.ring}, ${t.text})` }}
                >
                  {p.cta} →
                </Link>
              </div>
            </div>
          );
        })}
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-ink/10 bg-[oklch(0.97_0.01_70)]">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 divide-x divide-ink/10">
          {[
            { n: "60", l: "Day guarantee" },
            { n: "10k+", l: "Bottles shipped" },
            { n: "4.7★", l: "Average rating" },
            { n: "Free", l: "US shipping", sub: "orders over $75" },
          ].map((s) => (
            <div key={s.l} className="px-4 py-6 text-center">
              <div style={serif} className="text-4xl md:text-5xl text-ink leading-none">{s.n}</div>
              <div className="mt-2 text-xs md:text-sm text-body uppercase tracking-wider">{s.l}</div>
              {s.sub && <div className="mt-1 text-[10px] text-body/60 normal-case tracking-normal">{s.sub}</div>}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
