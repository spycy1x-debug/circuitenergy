import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Faq, P, SilkShell, Stars, TrustBadges, sans, serif } from "@/components/site/Silk";
import { cart } from "@/lib/silkbrush-cart";
import { trackAddToCart, trackViewContent } from "@/lib/fb-pixel";
import { logAbEvent } from "@/lib/ab-test";
import {
  money,
  SATIN_COMPARE_AT,
  SATIN_NAME,
  SATIN_PRICE,
  SATIN_RATING,
  SATIN_REVIEW_COUNT,
  SATIN_TIER,
  SATIN_VARIANT_ID,
} from "@/lib/silkbrush-config";
import payBadges from "@/assets/pay-badges-v2.png.asset.json";
import satinProductAsset from "@/assets/satin-product.png.asset.json";

const satinProduct = satinProductAsset.url;

export const Route = createFileRoute("/satin")({
  head: () => ({
    meta: [
      { title: "Seralie Satin Pillowcase Set — Your Hair's New Bedtime Routine" },
      {
        name: "description",
        content:
          "A 2-pack of premium satin pillowcases from Seralie. A smoother surface while you sleep, designed to complement your SilkBrush™ routine. Free shipping, 365-day money-back guarantee.",
      },
      { property: "og:title", content: "Seralie Satin Pillowcase Set — Your Hair's New Bedtime Routine" },
      {
        property: "og:description",
        content: "Two premium satin pillowcases for a smoother nighttime hair routine. Free shipping. 365-day money-back guarantee.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SatinPage,
});

const GALLERY: { url: string; alt: string }[] = [
  { url: satinProduct, alt: "Seralie satin pillowcase in gold" },
];

const FAQS = [
  { q: "Is this a 2-pack?", a: "Yes. Every order includes **2 satin pillowcases**." },
  { q: "What material is the pillowcase made from?", a: "[INSERT ACTUAL MATERIAL COMPOSITION]" },
  { q: "What size is the pillowcase?", a: "[INSERT ACTUAL DIMENSIONS / SIZE]" },
  {
    q: "Is satin the same as silk?",
    a: "No. **Silk is a fiber; satin is a weave.** Satin refers to the smooth, lustrous surface created by the weave, and it can be made from different fibers.",
  },
  { q: "How should I wash the pillowcase?", a: "[INSERT ACTUAL CARE AND WASHING INSTRUCTIONS]" },
  { q: "Will it work with my existing pillows?", a: "[INSERT PILLOW SIZE COMPATIBILITY DETAILS]" },
  {
    q: "How does the satin pillowcase complement SilkBrush™?",
    a: "SilkBrush™ is your **morning** step — smoothing, shine, and a sleeker finish. Seralie Satin is your **nighttime** step — a smoother surface for your hair to rest against while you sleep.",
  },
];

let addLock = 0;
function addSatin() {
  const now = Date.now();
  if (now - addLock < 1200) return;
  addLock = now;
  cart.setQty(0);
  cart.add(1, SATIN_TIER.id);
  logAbEvent("add_to_cart", { tierId: SATIN_TIER.id, value: SATIN_PRICE });
  trackAddToCart(SATIN_VARIANT_ID, SATIN_PRICE, 1);
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={sans} className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--cw-brand-deep)]">
      {children}
    </p>
  );
}

function AddButton({ className = "", label }: { className?: string; label?: string }) {
  return (
    <button
      type="button"
      onClick={addSatin}
      style={sans}
      className={`block w-full rounded-full bg-[color:var(--cw-ink)] px-8 py-5 text-center text-[15px] font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-black/15 transition hover:opacity-90 active:scale-[0.99] ${className}`}
    >
      {label ?? `Add to Cart • ${money(SATIN_PRICE)}`}
    </button>
  );
}

function Gallery() {
  const active = GALLERY[0]!;
  return (
    <div className="overflow-hidden rounded-lg border border-[color:var(--cw-line)]">
      <img
        src={active.url}
        alt={active.alt}
        className="block h-auto w-full"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
}

function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[color:var(--cw-line)] bg-[color:var(--cw-bg)]/97 px-4 pb-[max(10px,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-3xl items-center gap-3">
        <div className="min-w-0 shrink">
          <p style={sans} className="truncate text-[12px] font-semibold">
            Satin Pillowcase Set
          </p>
          <p style={sans} className="text-[13px] font-bold tabular-nums">
            {money(SATIN_PRICE)}
          </p>
        </div>
        <AddButton className="ml-auto max-w-[62%] !py-3.5 !text-[13px]" label="Add to Cart" />
      </div>
    </div>
  );
}

function SatinPage() {
  useEffect(() => {
    trackViewContent(SATIN_VARIANT_ID, SATIN_PRICE);
  }, []);

  return (
    <SilkShell>
      {/* 1 — HERO */}
      <section className="mx-auto max-w-6xl px-5 pb-14 pt-6 md:px-8 md:pb-20 md:pt-10">
        <div className="grid gap-8 md:grid-cols-2 md:gap-14">
          <Gallery />

          <div className="md:pt-2">
            <Eyebrow>Seralie Haircare</Eyebrow>
            <h1 style={serif} className="mt-3 text-[36px] leading-[1.02] text-[color:var(--cw-brand-deep)] md:text-[52px]">
              Your Hair's New Bedtime Routine
            </h1>
            <p style={serif} className="mt-3 text-[20px] text-[color:var(--cw-ink)] md:text-[24px]">
              {SATIN_NAME}
            </p>

            <div className="mt-3 flex items-center gap-2" style={sans}>
              <Stars value={SATIN_RATING} />
              <span className="text-[13px] text-[color:var(--cw-muted)]">
                {SATIN_RATING.toFixed(1)}/5{SATIN_REVIEW_COUNT ? ` · ${SATIN_REVIEW_COUNT} reviews` : ""}
              </span>
            </div>

            <p style={sans} className="mt-4 max-w-md text-[15px] leading-7 text-[color:var(--cw-muted)]">
              A <P>smoother nighttime routine</P> for your hair. Our satin pillowcase set creates a{" "}
              <P>smooth surface</P> that helps <P>reduce friction</P> while you sleep, helping your hair feel{" "}
              <P>smoother and easier to manage</P> when you wake up.
            </p>

            {/* offer badge */}
            <div className="mt-7 rounded-xl border-2 border-[color:var(--gold-deep)] bg-[color:var(--cw-surface)] p-5 shadow-lg shadow-black/10">
              <span
                style={sans}
                className="inline-block rounded-full bg-[color:var(--gold-deep)] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white"
              >
                2-Pack
              </span>
              <p style={sans} className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--cw-brand-deep)]">
                2 Satin Pillowcases Included
              </p>
              <div className="mt-3 flex items-baseline gap-3">
                {SATIN_COMPARE_AT && (
                  <span style={sans} className="text-[16px] text-[color:var(--cw-muted)] line-through tabular-nums">
                    {money(SATIN_COMPARE_AT)}
                  </span>
                )}
                <span style={sans} className="text-[32px] font-bold tabular-nums">
                  {money(SATIN_PRICE)}
                </span>
                {SATIN_COMPARE_AT && (
                  <span style={sans} className="text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--cw-brand-deep)]">
                    Sale price
                  </span>
                )}
              </div>
              <p
                style={serif}
                className="mt-2 text-[22px] italic leading-none text-[color:var(--cw-brand-deep)] md:text-[26px]"
              >
                Just For You
              </p>

              <AddButton className="mt-5" />

              <ul style={sans} className="mt-4 space-y-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-[color:var(--cw-muted)]">
                <li>✓ Free shipping</li>
                <li>✓ 365-day money-back guarantee</li>
                <li>✓ Secure checkout</li>
              </ul>

              <TrustBadges />

              <img src={payBadges.url} alt="Accepted payment methods" className="mx-auto mt-4 h-6 w-auto object-contain" loading="lazy" />
            </div>
          </div>
        </div>

        {/* 2 — BENEFIT STRIP */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {([
            ["✨", "Less friction", "A smoother surface while you sleep."],
            ["💛", "Smoother mornings", "Help reduce overnight tangling and friction."],
            ["🌙", "Nighttime hair care", "The perfect complement to your SilkBrush™ routine."],
          ] as const).map(([icon, t, d]) => (
            <div key={t} className="rounded-lg border border-[color:var(--cw-line)] bg-[color:var(--cw-surface)] p-5 text-center">
              <span className="text-[20px]" aria-hidden>
                {icon}
              </span>
              <p style={sans} className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--cw-brand-deep)]">
                {t}
              </p>
              <p style={sans} className="mt-2 text-[13px] leading-6 text-[color:var(--cw-muted)]">
                {d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 — TRANSFORMATION */}
      <section className="border-t border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:items-center md:gap-14 md:px-8 md:py-20">
          <div>
            <Eyebrow>Why it matters</Eyebrow>
            <h2 style={serif} className="mt-2 text-[32px] leading-[1.05] md:text-[46px]">
              Your hair routine doesn't stop when you go to sleep.
            </h2>
            <p style={sans} className="mt-5 max-w-md text-[15px] leading-7 text-[color:var(--cw-muted)]">
              You spend <P>hours sleeping every night</P>. During that time, your hair is constantly moving against your
              pillow. Seralie Satin gives your hair a <P>smoother surface to rest against</P>, helping reduce{" "}
              <P>friction and overnight tangling</P>. So when morning comes, your hair can feel{" "}
              <P>smoother, easier to manage</P>, and ready for your SilkBrush™.
            </p>
          </div>
          <img
            src={satinProduct}
            alt="Seralie satin pillowcase"
            className="block h-auto w-full rounded-lg border border-[color:var(--cw-line)]"
            loading="lazy"
          />
        </div>
      </section>

      {/* 4 — DAY + NIGHT */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="text-center">
          <Eyebrow>The ecosystem</Eyebrow>
          <h2 style={serif} className="mt-2 text-[32px] leading-[1.05] md:text-[46px]">
            The Complete Seralie Routine
          </h2>
          <p style={sans} className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-[color:var(--cw-muted)]">
            SilkBrush™ helps <P>simplify your morning routine</P>. Seralie Satin helps{" "}
            <P>complete your nighttime routine</P>.
          </p>
        </div>

        <div className="relative mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-[color:var(--cw-line)] bg-[color:var(--cw-surface)] p-7 text-center">
            <span className="text-[22px]" aria-hidden>
              ☀️
            </span>
            <p style={sans} className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[color:var(--cw-brand-deep)]">
              Day
            </p>
            <p style={serif} className="mt-2 text-[26px]">
              SilkBrush™
            </p>
            <p style={sans} className="mt-2 text-[14px] text-[color:var(--cw-muted)]">
              Smooth. Straighten. Shine.
            </p>
            <Link
              to="/silkbrush"
              style={sans}
              className="mt-4 inline-block text-[11px] font-semibold uppercase tracking-[0.18em] underline underline-offset-4"
            >
              Shop SilkBrush™
            </Link>
          </div>

          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[color:var(--gold-deep)] bg-[color:var(--cw-bg)] text-[11px] font-bold uppercase tracking-[0.1em] text-[color:var(--gold-deep)] md:grid"
          >
            +
          </span>

          <div className="rounded-lg border-2 border-[color:var(--gold-deep)] bg-[color:var(--cw-surface)] p-7 text-center">
            <span className="text-[22px]" aria-hidden>
              🌙
            </span>
            <p style={sans} className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[color:var(--cw-brand-deep)]">
              Night
            </p>
            <p style={serif} className="mt-2 text-[26px]">
              Seralie Satin
            </p>
            <p style={sans} className="mt-2 text-[14px] text-[color:var(--cw-muted)]">
              A smoother surface while you sleep.
            </p>
            <button
              type="button"
              onClick={addSatin}
              style={sans}
              className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] underline underline-offset-4"
            >
              Add the satin set
            </button>
          </div>
        </div>
      </section>

      {/* 5 — WHY TWO */}
      <section className="border-t border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:items-center md:gap-14 md:px-8 md:py-20">
          <img
            src={satinProduct}
            alt="Seralie satin pillowcase from the 2-pack"
            className="w-full rounded-lg border border-[color:var(--cw-line)] bg-[color:var(--cw-bg)] object-contain p-4"
            style={{ aspectRatio: "4 / 5" }}
            loading="lazy"
          />
          <div>
            <Eyebrow>The set</Eyebrow>
            <h2 style={serif} className="mt-2 text-[32px] leading-[1.05] md:text-[46px]">
              Why Two?
            </h2>
            <p style={sans} className="mt-5 max-w-md text-[15px] leading-7 text-[color:var(--cw-muted)]">
              <P>One for your bed. One for your next wash day.</P> Having two pillowcases makes it easy to keep your
              nighttime routine <P>consistent</P> — without waiting for laundry day.
            </p>
            <dl className="mt-8 divide-y divide-[color:var(--cw-line)] border-y border-[color:var(--cw-line)]">
              {([
                ["2 Pillowcases", "Always have a fresh one ready."],
                ["Easy Rotation", "Swap while the other is being washed."],
                ["Complete Set", "Everything you need for your nighttime routine."],
              ] as const).map(([t, d]) => (
                <div key={t} className="flex min-w-0 gap-6 py-4">
                  <dt style={sans} className="w-28 shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--cw-brand-deep)]">
                    {t}
                  </dt>
                  <dd style={sans} className="min-w-0 text-[14px] leading-6 text-[color:var(--cw-muted)]">
                    {d}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 6 — FEATURES */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <Eyebrow>Product features</Eyebrow>
        <h2 style={serif} className="mt-2 text-[32px] leading-[1.05] md:text-[46px]">
          Made For Your Nighttime Routine
        </h2>
        <div className="mt-9 grid gap-4 sm:grid-cols-2">
          {([
            ["Satin finish", "Smooth, soft surface designed for comfortable sleep."],
            ["Hair-friendly surface", "Helps reduce friction and overnight tangling."],
            ["Comfortable to sleep on", "Soft, smooth, and comfortable against your skin."],
            ["Easy to rotate", "Two pillowcases make washing and swapping simple."],
          ] as const).map(([t, d]) => (
            <div key={t} className="rounded-lg border border-[color:var(--cw-line)] bg-[color:var(--cw-surface)] p-6">
              <p style={sans} className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--cw-brand-deep)]">
                {t}
              </p>
              <p style={sans} className="mt-2 text-[14px] leading-6 text-[color:var(--cw-muted)]">
                {d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7 — SOCIAL PROOF */}
      <section id="reviews" className="border-t border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
        <div className="mx-auto max-w-3xl px-5 py-14 text-center md:px-8 md:py-20">
          <Eyebrow>Community</Eyebrow>
          <h2 style={serif} className="mt-2 text-[32px] leading-[1.05] md:text-[44px]">
            Join The Seralie Routine
          </h2>
          <p style={sans} className="mx-auto mt-4 max-w-lg text-[15px] leading-7 text-[color:var(--cw-muted)]">
            Reviews for the Satin Pillowcase Set are just getting started. Every order is backed by our{" "}
            <P>365-day money-back guarantee</P>, so you can try it with nothing to lose.
          </p>
          <div className="mx-auto mt-7 max-w-xs">
            <AddButton />
          </div>
        </div>
      </section>

      {/* 8 — FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <h3 id="faq" style={serif} className="text-[24px] md:text-[30px]">
          FAQ
        </h3>
        <div className="mt-4">
          <Faq items={FAQS} />
        </div>
      </section>

      {/* 9 — FINAL CTA */}
      <section className="border-t border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:gap-14 md:px-8 md:py-24">
          <img
            src={satinProduct}
            alt="Seralie satin pillowcase"
            className="w-full rounded-lg border border-[color:var(--cw-line)] bg-[color:var(--cw-bg)] object-contain p-4"
            style={{ aspectRatio: "4 / 5" }}
            loading="lazy"
          />
          <div>
            <h2 style={serif} className="text-[36px] leading-[1.03] text-[color:var(--cw-brand-deep)] md:text-[52px]">
              Smooth by day.
              <br />
              Satin by night.
            </h2>
            <p style={sans} className="mt-4 max-w-md text-[15px] leading-7 text-[color:var(--cw-muted)]">
              Complete your Seralie hair routine with a <P>smoother nighttime setup</P>.
            </p>
            <div className="mt-7 max-w-sm">
              <AddButton label={`Get The Seralie Satin Set → ${money(SATIN_PRICE)}`} />
              <ul style={sans} className="mt-4 space-y-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-[color:var(--cw-muted)]">
                <li>✓ 2 satin pillowcases</li>
                <li>✓ Free shipping</li>
                <li>✓ 365-day money-back guarantee</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <StickyCta />
      <div className="h-20 md:hidden" />
    </SilkShell>
  );
}
