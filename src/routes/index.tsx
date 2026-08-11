import { createFileRoute, Link } from "@tanstack/react-router";
import { GALLERY } from "@/lib/gallery";
import { BenefitCircles } from "@/components/site/BenefitCircles";
import { Reviews } from "@/components/site/Reviews";
import { GuaranteeBand } from "@/components/site/GuaranteeBand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seralie — NOURISH™ Digestive Support + Daily Essentials" },
      {
        name: "description",
        content:
          "Eating less shouldn't mean getting less. NOURISH™ settles digestion and puts back the nutrients smaller portions leave behind. One capsule, eight nutrients.",
      },
      { property: "og:title", content: "Seralie — NOURISH™ Digestive Support + Daily Essentials" },
      {
        property: "og:description",
        content: "One capsule that settles digestion and covers the everyday nutrient gaps.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://seralie.com/" },
      { property: "og:image", content: `https://seralie.com${GALLERY[0]!.url}` },
      { name: "twitter:image", content: `https://seralie.com${GALLERY[0]!.url}` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://seralie.com/" }],
  }),
  component: HomePage,
});

const INGREDIENTS = ["Magnesium", "Probiotic", "Ginger", "B12", "Iron", "Zinc"];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="container-x py-10 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <div className="eyebrow">Digestive Support + Daily Essentials</div>
            <h1 className="mt-4 font-display text-4xl leading-[1.12] md:text-6xl">
              Eating less shouldn't mean getting less.
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-8 text-[color:var(--muted-foreground)]">
              NOURISH™ settles your digestion and puts back the nutrients you're no longer getting from
              food.
            </p>
            <Link to="/nourish" className="btn-primary mt-9">
              Shop NOURISH — from $18 a bottle
            </Link>
            <p className="mt-4 text-xs text-[color:var(--taupe)]">
              Free US shipping · Ships in 24 hours · 60-day money-back guarantee
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src={GALLERY[0]!.url}
              alt={GALLERY[0]!.alt}
              className="w-full border border-[color:var(--border)] bg-white"
            />
          </div>
        </div>
      </section>

      {/* Benefit circles */}
      <section className="border-y border-[color:var(--border)] bg-white">
        <div className="container-x py-12 md:py-16">
          <BenefitCircles />
        </div>
      </section>

      {/* Two columns */}
      <section className="container-x py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl md:text-4xl">Settles digestion</h2>
            <p className="mt-4 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
              Magnesium supports regularity and digestive comfort. A LactoSpore® probiotic supports gut
              health. Ginger has been used traditionally for occasional nausea.
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl md:text-4xl">Covers the gaps</h2>
            <p className="mt-4 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
              B12, iron, zinc, D3 and folate support everyday energy and nutrition — printed with full
              doses, no proprietary blends.
            </p>
          </div>
        </div>
      </section>

      {/* Ingredient strip */}
      <section className="border-y border-[color:var(--border)] bg-white">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-8">
          {INGREDIENTS.map((i) => (
            <span key={i} className="caps-label text-[color:var(--taupe)]">
              {i}
            </span>
          ))}
        </div>
      </section>

      {/* Informational image */}
      <section className="container-x py-14 md:py-20">
        <img
          src={GALLERY[3]!.url}
          alt={GALLERY[3]!.alt}
          loading="lazy"
          className="mx-auto w-full max-w-3xl border border-[color:var(--border)]"
        />
      </section>

      <Reviews />

      <GuaranteeBand />

      {/* Final CTA */}
      <section className="container-x py-16 md:py-24 text-center">
        <h2 className="font-display text-3xl md:text-4xl">One capsule. Two jobs.</h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[color:var(--muted-foreground)]">
          Give it 6–8 weeks. That is usually how long it takes to know.
        </p>
        <Link to="/nourish" className="btn-primary mt-8">
          Shop NOURISH
        </Link>
      </section>
    </>
  );
}
