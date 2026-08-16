import { useEffect, useState } from "react";
import { ChevronDown, Check, Minus } from "lucide-react";
import {
  PATCH_TIERS,
  DEFAULT_PATCH_TIER,
  patchTierById,
  perPatch,
  GUARANTEE_DAYS,
  PRODUCT_TITLE,
  type PatchTierId,
} from "@/lib/patch-config";
import { cart } from "@/lib/shopify-cart";
import { trackViewContent, trackAddToCart } from "@/lib/fb-pixel";
import heroImg from "@/assets/patch-hero.jpg";
import flatlayImg from "@/assets/patch-flatlay.jpg";
import glowImg from "@/assets/patch-glow.jpg";

const money = (n: number) => `$${n.toFixed(2)}`;

const GALLERY = [
  { src: heroImg, alt: "LED pimple patch case with a sheet of clear hydrocolloid patches" },
  { src: flatlayImg, alt: "Patch sheet next to the LED case, lights on" },
  { src: glowImg, alt: "Close-up of a single clear hydrocolloid patch with light glow" },
];

/* ------------------------------ Buy box ------------------------------ */

function BuyBox() {
  const [selected, setSelected] = useState<PatchTierId>(DEFAULT_PATCH_TIER);
  const [adding, setAdding] = useState(false);
  const tier = patchTierById(selected);

  useEffect(() => {
    trackViewContent(tier.variantId, tier.price);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function add() {
    if (adding) return;
    setAdding(true);
    try {
      await cart.add({
        variantId: tier.variantId,
        quantity: 1,
        bundleLabel: tier.label,
        displayPrice: tier.price,
      });
      trackAddToCart(tier.variantId, tier.price, 1);
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="rounded-3xl border border-[color:var(--line)] bg-white p-5 shadow-[0_10px_40px_-24px_rgba(76,29,149,0.45)] sm:p-6">
      <div className="space-y-3">
        {PATCH_TIERS.map((t) => {
          const on = t.id === selected;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelected(t.id)}
              aria-pressed={on}
              className={`relative flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-colors ${
                on
                  ? "border-[color:var(--brand)] bg-[color:var(--brand-soft)]"
                  : "border-[color:var(--line)] bg-white hover:border-[color:var(--brand)]/40"
              }`}
            >
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${
                  on ? "border-[color:var(--brand)] bg-[color:var(--brand)]" : "border-[color:var(--line)]"
                }`}
              >
                {on && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-base font-semibold">{t.label}</span>
                  {t.badge && (
                    <span className="rounded-full bg-[color:var(--brand)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                      {t.badge}
                    </span>
                  )}
                </span>
                <span className="mt-1 block text-sm text-[color:var(--muted-ink)]">
                  {t.patches} patches · {t.supply} supply
                </span>
                <span className="mt-1 block text-xs text-[color:var(--muted-ink)]">
                  {money(perPatch(t))} per patch
                </span>
              </span>

              <span className="shrink-0 text-right">
                <span className="block text-lg font-semibold">{money(t.price)}</span>
                {t.compareAt && (
                  <span className="block text-xs text-[color:var(--muted-ink)] line-through">
                    {money(t.compareAt)}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <button
        onClick={add}
        disabled={adding}
        className="mt-5 w-full rounded-full bg-[color:var(--brand)] px-6 py-4 text-base font-semibold text-white transition-transform active:scale-[0.99] disabled:opacity-60"
      >
        {adding ? "Adding…" : "Add to cart"}
      </button>

      <p className="mt-3 text-center text-xs text-[color:var(--muted-ink)]">
        Free shipping · {GUARANTEE_DAYS}-day guarantee · Ships in 24h
      </p>
    </div>
  );
}

/* ------------------------------ Gallery ------------------------------ */

function Gallery() {
  const [i, setI] = useState(0);
  const active = GALLERY[i]!;
  return (
    <div>
      <div className="overflow-hidden rounded-3xl bg-[color:var(--brand-soft)]">
        <img
          key={active.src}
          src={active.src}
          alt={active.alt}
          width={1000}
          height={1000}
          fetchPriority={i === 0 ? "high" : undefined}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          className="aspect-square w-full object-cover"
        />
      </div>
      <div className="mt-3 flex gap-3">
        {GALLERY.map((g, idx) => (
          <button
            key={g.src}
            onClick={() => setI(idx)}
            aria-label={`View image ${idx + 1}`}
            className={`h-16 w-16 overflow-hidden rounded-xl border-2 ${
              idx === i ? "border-[color:var(--brand)]" : "border-[color:var(--line)]"
            }`}
          >
            <img
              src={g.src}
              alt=""
              width={128}
              height={128}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- FAQ -------------------------------- */

const FAQS = [
  {
    q: "Will it work on a spot that hasn't come to a head?",
    a: "Yes — that's the main reason we added light. Hydrocolloid alone needs an opening to draw fluid through. Light doesn't.",
  },
  {
    q: "Does the light actually do anything?",
    a: "Blue and red LED phototherapy for acne has been studied in dermatology for over twenty years. Blue light is absorbed by bacteria in the pore; red light reduces inflammation. A patch is lower-powered than a clinic panel — this is an overnight assist, not a medical device.",
  },
  {
    q: "How long do I leave it on?",
    a: "Six to eight hours. Clean, dry skin before bed.",
  },
  {
    q: "Can I wear makeup over it?",
    a: "It's designed for overnight. Makeup over the top will lift the edges.",
  },
  {
    q: "How many will I use?",
    a: "Most people use two or three on the same spot across consecutive nights until it flattens. A 60-pack lasts most people about two months.",
  },
  {
    q: "Will it irritate my skin?",
    a: "Hydrocolloid is one of the gentlest options available — it's the same material used in wound dressings. If you get redness that lasts after removal, stop using it.",
  },
  {
    q: "What if it doesn't work for me?",
    a: "60 days, full refund, and keep the patches. Email us, nothing to ship back.",
  },
];


function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-2xl divide-y divide-[color:var(--line)] rounded-3xl border border-[color:var(--line)] bg-white">
      {FAQS.map((f, i) => (
        <div key={f.q}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
          >
            <span className="text-[15px] font-medium">{f.q}</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <p className="px-5 pb-5 text-[15px] leading-7 text-[color:var(--muted-ink)]">{f.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------- Page -------------------------------- */

export function PatchPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <Gallery />
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand)]">
              Hydrocolloid + LED
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
              {PRODUCT_TITLE}
            </h1>
            <p className="mt-4 max-w-md text-[16px] leading-8 text-[color:var(--muted-ink)]">
              Stick one on before bed. It absorbs the gunk while red and blue light work on the spot
              underneath. Wake up with it flatter and less angry.
            </p>
            <div className="mt-6">
              <BuyBox />
            </div>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="border-y border-[color:var(--line)] bg-[color:var(--wash)]">
        <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Why your last patch did nothing
          </h2>
          <div className="mt-6 space-y-5 text-[16px] leading-8 text-[color:var(--muted-ink)]">
            <p>
              Hydrocolloid works by drawing fluid out of a spot. That means it needs somewhere for
              the fluid to go — an opening. Put one on a whitehead and it works. Put one on a deep,
              sore lump that hasn't surfaced and nothing happens, because there's nothing for it to
              pull.
            </p>
            <p>
              That's the review you've read a hundred times: "did nothing for me." It's not the
              patch failing. It's the wrong spot for the mechanism.
            </p>
            <p className="text-[color:var(--brand)] font-semibold">Light doesn't need an opening.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
          Three things at once, overnight
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              h: "Hydrocolloid draws it out",
              p: "Medical-grade hydrocolloid pulls fluid from a spot that's come to a head, and seals it so you physically can't pick at it overnight.",
            },
            {
              h: "Blue light targets the bacteria",
              p: "Blue light around 415nm is absorbed by porphyrins inside C. acnes, the bacteria involved in breakouts. It reaches the spot whether or not it has a head.",
            },
            {
              h: "Red light calms the swelling",
              p: "Red light penetrates deeper and is used in dermatology to reduce the inflammatory response — the redness and puffiness that makes a spot obvious from across a room.",
            },
          ].map((c) => (
            <div
              key={c.h}
              className="rounded-3xl border border-[color:var(--line)] bg-white p-6 shadow-[0_10px_40px_-30px_rgba(76,29,149,0.6)]"
            >
              <div className="h-10 w-10 rounded-full bg-[color:var(--brand-soft)]" />
              <h3 className="mt-4 text-lg font-semibold">{c.h}</h3>
              <p className="mt-2 text-[15px] leading-7 text-[color:var(--muted-ink)]">{c.p}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-xs leading-6 text-[color:var(--muted-ink)]">
          Blue and red LED phototherapy for acne has been studied since Papageorgiou et al., British
          Journal of Dermatology, 2000. Clinical studies use higher-powered panels than a wearable
          patch.
        </p>
      </section>

      {/* Comparison */}
      <section className="border-y border-[color:var(--line)] bg-[color:var(--wash)]">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">How it stacks up</h2>
          <div className="mt-8 overflow-x-auto rounded-3xl border border-[color:var(--line)] bg-white">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[color:var(--wash)]">
                  <th className="p-4 font-medium text-[color:var(--muted-ink)]"> </th>
                  <th className="p-4 font-semibold text-[color:var(--brand)]">Seralie LED patches</th>
                  <th className="p-4 font-medium">Ordinary hydrocolloid</th>
                  <th className="p-4 font-medium">Cortisone shot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[color:var(--line)]">
                {[
                  ["Works on a whitehead", "Yes", "Yes", "Yes"],
                  ["Works on a spot with no head", "Yes", "No", "Yes"],
                  ["Reduces redness", "Yes", "No", "Yes"],
                  ["Stops you picking", "Yes", "Yes", "No"],
                  ["Needs an appointment", "No", "No", "Yes"],
                  ["Cost", "$29.99 for 60", "varies", "$75–150 per visit"],
                ].map((row) => (
                  <tr key={row[0]}>
                    <td className="p-4 font-medium">{row[0]}</td>
                    <td className="p-4">{row[1]}</td>
                    <td className="p-4">{row[2]}</td>
                    <td className="p-4">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* When to use */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          The night before something
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            "Something came up on your chin and you have photos tomorrow",
            "A sore lump that hasn't surfaced and you know picking makes it worse",
            "The one that always shows up the week of something important",
          ].map((s) => (
            <li
              key={s}
              className="rounded-2xl border border-[color:var(--line)] bg-white p-5 text-[15px] leading-7 text-[color:var(--muted-ink)]"
            >
              {s}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[16px] leading-8">
          Put it on clean skin before bed. Six to eight hours. Peel it off in the morning.
        </p>
      </section>


      {/* How to use */}
      <section className="border-y border-[color:var(--line)] bg-[color:var(--wash)]">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">How to use</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", h: "Cleanse and dry", p: "Skip serums and oils on the spot — the patch needs dry skin to grip." },
              { n: "02", h: "Press it on", p: "Hold it down for a few seconds so the edges seal flat." },
              { n: "03", h: "Sleep on it", p: "Leave it 6–8 hours. Peel it off in the morning and rinse." },
            ].map((s) => (
              <li key={s.n} className="rounded-3xl bg-white p-6 ring-1 ring-[color:var(--line)]">
                <span className="text-sm font-semibold text-[color:var(--brand)]">{s.n}</span>
                <h3 className="mt-2 text-lg font-semibold">{s.h}</h3>
                <p className="mt-2 text-[15px] leading-7 text-[color:var(--muted-ink)]">{s.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Reviews placeholder — nothing rendered until real reviews exist */}
      <section id="reviews" aria-hidden="true" />

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
          Questions, answered
        </h2>
        <div className="mt-10">
          <Faq />
        </div>
      </section>

      {/* Guarantee */}
      <section className="bg-[color:var(--brand)]">
        <div className="mx-auto max-w-2xl px-5 py-16 text-center text-white md:py-20">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-white/40 text-2xl font-semibold">
            {GUARANTEE_DAYS}
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">
            {GUARANTEE_DAYS}-day clear skin guarantee
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-white/85">
            Use the whole box. Not clearer? Full refund and keep the patches — nothing to ship back.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 text-sm text-white/80">
            <Minus className="h-4 w-4" /> support@seralie.com
          </div>
        </div>
      </section>
    </div>
  );
}
