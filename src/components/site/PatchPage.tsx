import { useEffect, useState } from "react";
import {
  Check,
  X,
  ChevronDown,
  Zap,
  Sun,
  Moon,
  Droplets,
  Package,
  ShieldCheck,
  Lock,
  Truck,
  Star,
} from "lucide-react";
import {
  PATCH_TIERS,
  DEFAULT_PATCH_TIER,
  patchTierById,
  GUARANTEE_DAYS,
  PRODUCT_TITLE,
  type PatchTierId,
} from "@/lib/patch-config";
import { cart } from "@/lib/shopify-cart";
import { trackViewContent, trackAddToCart } from "@/lib/fb-pixel";
import { MediaPlaceholder } from "@/components/site/MediaPlaceholder";
import { PatchGallery, type GalleryItem } from "@/components/site/PatchGallery";
import g1 from "@/assets/patch-g1.webp.asset.json";
import g2 from "@/assets/patch-g2.webp.asset.json";
import g3 from "@/assets/patch-g3.webp.asset.json";
import g4 from "@/assets/patch-g4.webp.asset.json";
import g5 from "@/assets/patch-g5.webp.asset.json";
import g6 from "@/assets/patch-g6.webp.asset.json";
import g7 from "@/assets/patch-g7.webp.asset.json";
import g8 from "@/assets/patch-g8.webp.asset.json";
import payBadges from "@/assets/pay-badges-v2.png.asset.json";
import { VideoCarousel } from "@/components/site/VideoCarousel";
import ugc1 from "@/assets/ugc-1.mp4.asset.json";
import ugc2 from "@/assets/ugc-2.mp4.asset.json";

import ugc4 from "@/assets/ugc-4.mp4.asset.json";
import ugc5 from "@/assets/ugc-5.mp4.asset.json";
import ugc6 from "@/assets/ugc-6.mp4.asset.json";
import ugc7 from "@/assets/ugc-7.mp4.asset.json";
import ugc8 from "@/assets/ugc-8.mp4.asset.json";

const UGC_VIDEOS = [ugc1, ugc2, ugc4, ugc5, ugc6, ugc7, ugc8].map((a) => ({
  src: a.url,
}));

const money = (n: number) => `$${n.toFixed(2)}`;

export const PATCH_GALLERY: GalleryItem[] = [
  { src: g1.url, alt: "Model applying an LED spot patch to her cheek", label: "On skin" },
  { src: g4.url, alt: "Two clear patches worn on the face", label: "Worn on face" },
  { src: g2.url, alt: "Three LED spot patches glowing", label: "The patches" },
  { src: g3.url, alt: "Patch features and what is inside the kit", label: "What's inside" },
  { src: g5.url, alt: "Cross-section of how the patch works under the skin", label: "Cross-section" },
  { src: g6.url, alt: "Illustration of the spot over three nights", label: "Timeline" },
  { src: g7.url, alt: "Ordinary hydrocolloid versus Seralie on a spot with no head", label: "Comparison" },
  { src: g8.url, alt: "Close-up of skin before and after use", label: "Close-up" },
];

const BADGES: Record<PatchTierId, string> = {
  bogo1: "STARTER",
  bogo2: "BEST SELLER",
  bogo3: "MOST POPULAR",
};

/* ------------------------------- Buy box ------------------------------- */

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

  const save =
    tier.compareAt && tier.compareAt > tier.price
      ? Math.round((1 - tier.price / tier.compareAt) * 100)
      : null;

  return (
    <div>
      {/* a) rating slot — intentionally empty until real reviews exist */}
      {/* <div>X/5 Customer feedback</div> */}

      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-ink)]">
        Targeted red + blue light care
      </div>
      <h1 className="mt-3 text-[34px] font-bold leading-[1.05] tracking-tight text-[#111111] md:text-5xl">
        {PRODUCT_TITLE}
      </h1>

      <ul className="mt-6 space-y-2.5">
        {[
          "415nm blue light targets acne bacteria",
          "630nm red light calms redness",
          "Medical-grade hydrocolloid draws out the spot",
          "60 patches — about two months",
        ].map((b) => (
          <li key={b} className="flex items-start gap-3 text-[15px] leading-6 text-[#111111]">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--brand)]" strokeWidth={3} />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="text-4xl font-bold tracking-tight text-[color:var(--brand)]">
          {money(tier.price)}
        </span>
        {tier.compareAt && (
          <span className="text-lg text-[color:var(--muted-ink)] line-through">
            {money(tier.compareAt)}
          </span>
        )}
        {save && (
          <span className="rounded-full bg-[color:var(--brand)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            Save {save}%
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-[color:var(--brand)]/40 px-4 py-3 text-[13px] font-medium text-[#111111]">
        <Zap className="h-4 w-4 text-[color:var(--brand)]" strokeWidth={2} />
        {tier.freeShipping ? "Free shipping included · Ships in 24 hours" : "Ships in 24 hours · Free shipping over $40"}
      </div>

      <div className="mt-7 flex items-center gap-4">
        <span className="h-px flex-1 bg-[color:var(--line)]" />
        <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-ink)]">
          Choose your set
        </span>
        <span className="h-px flex-1 bg-[color:var(--line)]" />
      </div>

      <div className="mt-5 space-y-3">
        {PATCH_TIERS.map((t) => {
          const on = t.id === selected;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelected(t.id)}
              aria-pressed={on}
              className={`flex w-full items-center gap-3 rounded-2xl border-2 p-4 text-left transition-colors ${
                on
                  ? "border-[color:var(--brand)] bg-[color:var(--brand-soft)]"
                  : "border-[color:var(--line)] bg-white hover:border-[color:var(--brand)]/40"
              }`}
            >
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${
                  on
                    ? "border-[color:var(--brand)] bg-[color:var(--brand)]"
                    : "border-[color:var(--line)]"
                }`}
              >
                {on && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-[15px] font-bold text-[#111111]">{t.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      on
                        ? "bg-[color:var(--brand)] text-white"
                        : "bg-[color:var(--brand-soft)] text-[color:var(--brand)]"
                    }`}
                  >
                    {BADGES[t.id]}
                  </span>
                </span>
                <span className="mt-1 block text-[13px] text-[color:var(--muted-ink)]">
                  {t.patches} patches · about {t.supply}
                </span>
                {t.freeShipping && (
                  <span className="mt-1 flex items-center gap-1 text-[12px] font-semibold text-[color:var(--brand)]">
                    <Truck className="h-3.5 w-3.5" strokeWidth={2} />
                    Free shipping
                  </span>
                )}
                <span className="mt-1 flex items-center gap-1 text-[12px] font-semibold text-[color:var(--brand)]">
                  <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
                  {GUARANTEE_DAYS}-day money-back guarantee
                </span>
              </span>

              <span className="shrink-0 text-right">
                <span className="block text-lg font-bold text-[#111111]">{money(t.price)}</span>
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

      <p className="mt-3 text-[13px] text-[color:var(--muted-ink)]">
        Wear it overnight. Six to eight hours.
      </p>

      <button
        onClick={add}
        disabled={adding}
        className="mt-4 w-full rounded-[10px] bg-[color:var(--brand)] px-6 py-5 text-base font-bold uppercase tracking-wide text-white transition-transform active:scale-[0.99] disabled:opacity-60"
      >
        {adding ? "Adding…" : "Add to cart"}
      </button>

      <div className="mt-4 flex justify-center">
        <img
          src={payBadges.url}
          alt="Accepted payment methods: Amex, Apple Pay, Discover, Google Pay, Mastercard, PayPal, Shop Pay, Visa, Klarna"
          className="h-7 w-auto max-w-full object-contain md:h-8"
          loading="lazy"
        />
      </div>

      <ul className="mt-6 grid grid-cols-3 gap-3 border-y border-[color:var(--line)] py-6">
        {[
          { icon: ShieldCheck, label: `${GUARANTEE_DAYS}-Day Guarantee` },
          { icon: Lock, label: "Secure Checkout" },
          { icon: Truck, label: "Free Over $40" },
        ].map(({ icon: Icon, label }) => (
          <li key={label} className="flex flex-col items-center gap-2 text-center">
            <Icon className="h-7 w-7 text-[color:var(--brand)]" strokeWidth={1.8} />
            <span className="text-[12px] font-bold leading-tight text-[#111111]">
              {label}
            </span>
          </li>
        ))}
      </ul>

      <Accordion
        items={[
          {
            q: "Why it's different",
            a: "Ordinary hydrocolloid only works once a spot has an opening. Ours adds 415nm blue and 630nm red light, which pass through skin — so it still does something on a spot that hasn't surfaced.",
          },
          {
            q: "What's included",
            a: "60 clear hydrocolloid patches (12mm), the reusable light case and a carry pouch.",
          },
          {
            q: "How to use",
            a: "Cleanse and dry the area, press the patch on for a few seconds so the edges seal, and leave it 6–8 hours overnight.",
          },
          {
            q: "Red and blue light",
            a: "Blue light around 415nm is absorbed by porphyrins inside C. acnes. Red light around 630nm penetrates deeper and is used to calm the inflammatory response.",
          },
          {
            q: "Safety",
            a: "Hydrocolloid is the same material used in wound dressings and is one of the gentlest options available. Not a medical device. If redness lasts after removal, stop using it.",
          },
        ]}
      />
    </div>
  );
}

/* ------------------------------ Accordion ------------------------------ */

function Accordion({ items, defaultOpen = null }: { items: { q: string; a: string }[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <div className="mt-5 divide-y divide-[color:var(--line)] overflow-hidden rounded-2xl border border-[color:var(--line)] bg-white">
      {items.map((f, i) => (
        <div key={f.q}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
          >
            <span className="text-[15px] font-semibold text-[#111111]">{f.q}</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-[color:var(--brand)] transition-transform ${
                open === i ? "rotate-180" : ""
              }`}
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

/* -------------------------------- Page --------------------------------- */

const SECTION = "mx-auto max-w-6xl px-5 md:px-8";
const H2 = "text-[28px] font-bold leading-tight tracking-tight text-[#111111] md:text-4xl";

export function PatchPage() {
  return (
    <div className="bg-white">
      {/* 3. HERO */}
      <section className={`${SECTION} py-8 md:py-14`}>
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,55%)_minmax(0,45%)] lg:gap-14">
          <div className="min-w-0">
            <PatchGallery items={PATCH_GALLERY} />
          </div>
          <div className="min-w-0">
            <BuyBox />
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="border-t border-[color:var(--line)] bg-[#FBFAFF]">
        <div className={`${SECTION} py-14 md:py-20`}>
          <h2 className={H2}>Spot care without the full-face setup</h2>
          <div className="mt-8">
            <VideoCarousel items={UGC_VIDEOS} />
          </div>

        </div>
      </section>

      {/* 5. AT A GLANCE */}
      <section className={`${SECTION} py-14 md:py-20`}>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <MediaPlaceholder ratio="4/5" label="Close-up skin photo" dimensions="1000 × 1250" />
          <div className="space-y-6">
            {[
              { icon: Sun, h: "Blue light", p: "415nm targets the bacteria in the pore" },
              { icon: Droplets, h: "Red light", p: "630nm calms the redness around it" },
              { icon: Moon, h: "Overnight", p: "6 to 8 hours while you sleep" },
              { icon: Package, h: "60 patches", p: "About two months of breakouts" },
            ].map((r) => (
              <div key={r.h} className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color:var(--brand-soft)]">
                  <r.icon className="h-5 w-5 text-[color:var(--brand)]" strokeWidth={1.7} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[17px] font-bold text-[#111111]">{r.h}</h3>
                  <p className="mt-1 text-[15px] leading-7 text-[color:var(--muted-ink)]">{r.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY YOUR LAST PATCH DID NOTHING */}
      <section className="border-y border-[color:var(--line)] bg-[#FBFAFF]">
        <div className={`${SECTION} py-14 md:py-20`}>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <MediaPlaceholder
              ratio="1/1"
              label="Cross-section diagram"
              dimensions="1000 × 1000"
            />
            <div>
              <h2 className={H2}>Why your last patch did nothing</h2>
              <p className="mt-5 text-[16px] leading-8 text-[color:var(--muted-ink)]">
                Hydrocolloid works by drawing fluid out of a spot. It needs an opening. On a deep
                lump that hasn't surfaced, nothing happens — there's nothing to pull. That's the
                review you've read a hundred times.
              </p>
              <p className="mt-4 text-[17px] font-bold text-[color:var(--brand)]">
                Light doesn't need an opening.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHAT TO EXPECT */}
      <section className={`${SECTION} py-14 md:py-20`}>
        <h2 className={H2}>What to expect</h2>
        <div className="mt-10">
          <div className="relative h-1 rounded-full bg-[color:var(--brand-soft)]">
            <div className="absolute inset-y-0 left-0 w-full rounded-full bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--brand)]/20" />
          </div>
          <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Night 1", "Calmer, and your hands stay off it"],
              ["Nights 2–4", "Flatter and less obvious"],
              ["Week 1–2", "Fewer spots reaching the surface"],
              ["Ongoing", "One in the drawer for when it happens"],
            ].map(([t, p]) => (
              <li key={t} className="rounded-2xl border border-[color:var(--line)] bg-white p-5">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--brand)]">
                  {t}
                </span>
                <p className="mt-2 text-[15px] leading-7 text-[color:var(--muted-ink)]">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. REAL RESULTS — empty */}
      <section className="border-y border-[color:var(--line)] bg-[#FBFAFF]">
        <div className={`${SECTION} py-14 md:py-20`}>
          <h2 className={H2}>What people notice after using it</h2>
          <div className="mt-8">
            <MediaPlaceholder
              ratio="16/9"
              label="Customer photo gallery — awaiting real customers"
              dimensions="1600 × 900"
            />
          </div>
        </div>
      </section>

      {/* 9. COMPARISON */}
      <section className={`${SECTION} py-14 md:py-20`}>
        <h2 className={H2}>How it stacks up</h2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-[color:var(--line)]">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[color:var(--brand-soft)]">
                <th className="p-4 font-medium text-[color:var(--muted-ink)]"> </th>
                <th className="p-4 font-bold text-[color:var(--brand)]">Ours</th>
                <th className="p-4 font-medium text-[#111111]">Ordinary pimple patch</th>
                <th className="p-4 font-medium text-[#111111]">Full-face LED mask</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--line)] bg-white">
              {([
                ["Treats one spot directly", true, true, false],
                ["Red + blue light", true, false, true],
                ["Works on a spot with no head yet", true, false, true],
                ["Nothing to charge", true, true, false],
                ["Wear it to bed", true, true, false],
                ["Under $30", true, true, false],
              ] as [string, boolean, boolean, boolean][]).map((row) => (
                <tr key={row[0]}>
                  <td className="p-4 font-medium text-[#111111]">{row[0]}</td>
                  {[row[1], row[2], row[3]].map((v, idx) => (
                    <td key={idx} className="p-4">
                      {v ? (
                        <Check className="h-5 w-5 text-[color:var(--brand)]" strokeWidth={3} />
                      ) : (
                        <X className="h-5 w-5 text-[color:var(--muted-ink)]/50" strokeWidth={2.5} />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 10. WHEN TO USE IT */}
      <section className="border-y border-[color:var(--line)] bg-[#FBFAFF]">
        <div className={`${SECTION} py-14 md:py-20`}>
          <h2 className={H2}>When to use it</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "At the first sign of one",
              "The night before something",
              "While travelling",
              "When you know you'll pick at it",
            ].map((s) => (
              <li
                key={s}
                className="rounded-2xl border border-[color:var(--line)] bg-white p-5 text-[15px] font-medium leading-7 text-[#111111]"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className={`${SECTION} py-14 md:py-20`}>
        <h2 className={`${H2} text-center`}>Everything to know before your first patch</h2>
        <div className="mx-auto mt-8 max-w-2xl">
          <Accordion
            defaultOpen={0}
            items={[
              {
                q: "Will it work on a spot that hasn't come to a head?",
                a: "Yes — that's the main reason we added light. Hydrocolloid alone needs an opening to draw fluid through. Light doesn't.",
              },
              { q: "How long do I leave it on?", a: "Six to eight hours. Clean, dry skin before bed." },
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
                a: `${GUARANTEE_DAYS} days, full refund, and keep the patches. Email us, nothing to ship back.`,
              },
            ]}
          />
        </div>
      </section>

      {/* 12. REVIEWS — empty state */}
      <section id="reviews" className="border-y border-[color:var(--line)] bg-[#FBFAFF]">
        <div className={`${SECTION} py-14 md:py-20`}>
          <h2 className={H2}>Reviews</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-[240px_1fr]">
            <div className="rounded-2xl border border-[color:var(--line)] bg-white p-6 text-center">
              <div className="text-4xl font-bold text-[#111111]">—</div>
              <div className="mt-2 flex justify-center gap-0.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 text-[color:var(--line)]" fill="currentColor" />
                ))}
              </div>
              <p className="mt-2 text-[12px] text-[color:var(--muted-ink)]">No reviews yet</p>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <span className="w-8 text-[12px] text-[color:var(--muted-ink)]">{s} ★</span>
                  <span className="h-2 flex-1 rounded-full bg-[color:var(--brand-soft)]" />
                  <span className="w-6 text-right text-[12px] text-[color:var(--muted-ink)]">0</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {["All", "5 star", "4 star", "3 star", "2 star", "1 star", "With photos"].map((f) => (
              <span
                key={f}
                className="cursor-default rounded-full border border-[color:var(--line)] bg-white px-3 py-1.5 text-[12px] font-medium text-[color:var(--muted-ink)]"
              >
                {f}
              </span>
            ))}
          </div>

          <div className="mt-6 grid place-items-center rounded-2xl border-2 border-dashed border-[color:var(--brand)]/40 bg-white px-6 py-16 text-center">
            <p className="text-[15px] text-[color:var(--muted-ink)]">
              Reviews will appear here once customers start leaving them.
            </p>
          </div>
        </div>
      </section>

      {/* 13. GUARANTEE BAND */}
      <section className="bg-[color:var(--brand)]">
        <div className="mx-auto max-w-2xl px-5 py-16 text-center text-white md:py-20">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-white/40 text-2xl font-bold">
            {GUARANTEE_DAYS}
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
            {GUARANTEE_DAYS}-day guarantee
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-white/85">
            Use the whole box. Not clearer? Full refund and keep the patches — nothing to ship back.
          </p>
        </div>
      </section>
    </div>
  );
}
