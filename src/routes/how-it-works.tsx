import { createFileRoute, Link } from "@tanstack/react-router";
import { PATCH_GALLERY } from "@/components/site/PatchPage";
import { GUARANTEE_DAYS } from "@/lib/patch-config";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Seralie LED Pimple Patches Work" },
      {
        name: "description",
        content:
          "Hydrocolloid absorbs the spot while 415nm blue and 630nm red light treat it. Here is what happens under the patch across one night.",
      },
      { property: "og:title", content: "How Seralie LED Pimple Patches Work" },
      {
        property: "og:description",
        content: "Hydrocolloid absorbs it. Red and blue light treat it. Overnight.",
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
    n: "Step 1",
    t: "Cleanse and dry",
    d: "Wash the area and pat it dry. Hydrocolloid only seals properly on clean, dry skin.",
  },
  {
    n: "Step 2",
    t: "Press it on",
    d: "Hold the patch down for a few seconds so the edges seal all the way around the spot.",
  },
  {
    n: "Step 3",
    t: "Sleep on it",
    d: "Leave it six to eight hours. The patch does the work while you are not touching your face.",
  },
];

const TIMELINE = [
  { w: "Hour 0–1", b: ["The patch seals and goes to work.", "Picking stops — the spot is covered."] },
  { w: "Hour 2–4", b: ["Hydrocolloid pulls fluid out of the spot.", "Blue light targets acne bacteria."] },
  { w: "Overnight", b: ["Red light works on the redness around it.", "Inflammation settles as you sleep."] },
  { w: "Morning", b: ["Peel it off — the spot is flatter and calmer.", "Repeat the next night if needed."] },
];

function HowItWorksPage() {
  const cross = PATCH_GALLERY[4]!;
  return (
    <>
      <section className="container-x max-w-3xl py-14 md:py-20">
        <div className="eyebrow">How it works</div>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">Your last patch wasn't enough.</h1>
        <p className="mt-6 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
          Ordinary hydrocolloid only works once a spot has an opening. On a blind, angry spot there is
          nothing for it to absorb, so it just sits there.
        </p>
        <p className="mt-4 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
          Ours adds 415nm blue and 630nm red light, which pass through skin — so the spot still gets
          treated overnight.
        </p>
      </section>

      <section className="container-x py-4 md:py-8">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="border border-[color:var(--border)] bg-white p-7">
            <h2 className="font-display text-2xl">Absorbs it</h2>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-[color:var(--muted-foreground)]">
              <li>Medical-grade hydrocolloid draws fluid out of the spot.</li>
              <li>A sealed, moist environment keeps the skin from scabbing.</li>
              <li>Clear 12mm patches — thin enough to wear anywhere.</li>
            </ul>
          </div>
          <div className="border border-[color:var(--border)] bg-white p-7">
            <h2 className="font-display text-2xl">Treats it</h2>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-[color:var(--muted-foreground)]">
              <li>415nm blue light targets the bacteria behind breakouts.</li>
              <li>630nm red light goes deeper and calms redness.</li>
              <li>Works on spots that have not surfaced yet.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-[color:var(--border)] bg-white">
        <div className="container-x py-14 md:py-20">
          <h2 className="font-display text-3xl md:text-4xl">Three steps, once a night</h2>
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
        <h2 className="font-display text-3xl md:text-4xl">One night under the patch</h2>
        <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">
          Six to eight hours. Individual results vary.
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
          src={cross.src}
          alt={cross.alt}
          loading="lazy"
          className="mx-auto w-full max-w-3xl border border-[color:var(--border)]"
        />
        <div className="mt-10 text-center">
          <Link to="/patches" className="btn-primary">
            Shop patches
          </Link>
          <p className="mt-4 text-xs text-[color:var(--muted-foreground)]">
            Free shipping over $40 · Ships in 24 hours · {GUARANTEE_DAYS}-day money-back guarantee
          </p>
        </div>
      </section>
    </>
  );
}
