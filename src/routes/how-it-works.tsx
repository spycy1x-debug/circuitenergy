import { createFileRoute, Link } from "@tanstack/react-router";
import { GALLERY } from "@/lib/gallery";
import { BenefitCircles } from "@/components/site/BenefitCircles";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How NOURISH™ Works — Seralie" },
      {
        name: "description",
        content:
          "Smaller portions mean less food to digest and fewer nutrients coming in. Here is how NOURISH™ supports digestive comfort and everyday nutrition.",
      },
      { property: "og:title", content: "How NOURISH™ Works — Seralie" },
      {
        property: "og:description",
        content: "Two jobs, one capsule: digestive comfort and the everyday nutrient gaps.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://seralie.com/how-it-works" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://seralie.com/how-it-works" }],
  }),
  component: HowItWorksPage,
});

const STAGES = [
  {
    n: "Stage 1",
    t: "Slower digestion",
    d: "Meals sit longer than they used to. Bloating after eating becomes the normal end of dinner.",
  },
  {
    n: "Stage 2",
    t: "Running on less",
    d: "Less food means fewer nutrients coming in. Energy through the afternoon is the first thing to notice it.",
  },
  {
    n: "Stage 3",
    t: "It starts to show",
    d: "Hair, nails and stamina all draw on the same everyday nutrition. When intake drops, they tend to be where you see it.",
  },
];

const TIMELINE = [
  { w: "Week 1–2", b: ["Many people find meals sit more comfortably.", "Routine starts to settle."] },
  { w: "Week 3–4", b: ["Digestion may feel more regular.", "Afternoon energy may steady out."] },
  { w: "Week 5–8", b: ["Nutrient support builds with consistent use.", "Most people judge it here."] },
  { w: "Week 9–12+", b: ["Everyday nutrition stays covered.", "Benefits may continue with daily use."] },
];

function HowItWorksPage() {
  return (
    <>
      <section className="container-x max-w-3xl py-14 md:py-20">
        <div className="eyebrow">How it works</div>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">This isn't a willpower problem.</h1>
        <p className="mt-6 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
          When you eat less, digestion slows and nutrient intake drops with it. That shows up plainly:
          bloating after meals, sluggish digestion, low energy, thinning hair, feeling older than you are.
        </p>
        <p className="mt-4 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
          NOURISH™ was built for that gap — one capsule doing two jobs.
        </p>
      </section>

      <section className="border-y border-[color:var(--border)] bg-white">
        <div className="container-x py-12 md:py-16">
          <BenefitCircles />
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="border border-[color:var(--border)] bg-white p-7">
            <h2 className="font-display text-2xl">Settles digestion</h2>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-[color:var(--muted-foreground)]">
              <li>Magnesium supports regularity and digestive comfort.</li>
              <li>LactoSpore® probiotic supports gut health.</li>
              <li>Ginger, traditionally used for occasional nausea.</li>
            </ul>
          </div>
          <div className="border border-[color:var(--border)] bg-white p-7">
            <h2 className="font-display text-2xl">Covers the gaps</h2>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-[color:var(--muted-foreground)]">
              <li>B12, iron and zinc support energy and everyday nutrition.</li>
              <li>D3 and folate round out the daily essentials.</li>
              <li>Chelated minerals, no artificial fillers.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-[color:var(--border)] bg-white">
        <div className="container-x py-14 md:py-20">
          <h2 className="font-display text-3xl md:text-4xl">How it shows up over time</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {STAGES.map((s) => (
              <div key={s.n}>
                <div className="caps-label text-[color:var(--gold)]">{s.n}</div>
                <h3 className="mt-3 font-display text-2xl">{s.t}</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted-foreground)]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <h2 className="font-display text-3xl md:text-4xl">What to expect</h2>
        <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">
          Give it 6–8 weeks. Individual experience varies.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TIMELINE.map((t) => (
            <div key={t.w} className="border border-[color:var(--border)] bg-white p-5">
              <div className="caps-label text-[color:var(--taupe)]">{t.w}</div>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[color:var(--muted-foreground)]">
                {t.b.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x pb-16 md:pb-24">
        <img
          src={GALLERY[5]!.url}
          alt={GALLERY[5]!.alt}
          loading="lazy"
          className="mx-auto w-full max-w-3xl border border-[color:var(--border)]"
        />
        <div className="mt-10 text-center">
          <Link to="/nourish" className="btn-primary">
            Shop NOURISH
          </Link>
        </div>
      </section>
    </>
  );
}
