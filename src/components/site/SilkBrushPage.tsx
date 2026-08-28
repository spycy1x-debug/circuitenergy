import { useRef, useState } from "react";
import { Media, RatingLine, SilkShell, Faq, sans, serif, Stars } from "@/components/site/Silk";
import { DEFAULT_TIER, money, TIERS, tierCheckoutUrl, type Tier } from "@/lib/silkbrush-config";
import { trackInitiateCheckout } from "@/lib/fb-pixel";
import { SilkReviews } from "@/components/site/SilkReviews";
import payBadges from "@/assets/pay-badges-v2.png.asset.json";
import img1 from "@/assets/silkbrush-meet-the-product.png.asset.json";
import img2 from "@/assets/sbx-2.webp.asset.json";
import img3 from "@/assets/sbx-3.webp.asset.json";
import img4 from "@/assets/sbx-4.webp.asset.json";
import img5 from "@/assets/sbx-5.webp.asset.json";
import img6 from "@/assets/sbx-6.webp.asset.json";
import imgCloseup from "@/assets/sbx-7.webp.asset.json";
import imgUsing from "@/assets/sbx-8.webp.asset.json";

/* ------------------------------- primitives ------------------------------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={sans} className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--cw-brand-deep)]">
      {children}
    </p>
  );
}

function OfferLink({ label = "Shop SilkBrush™", className = "" }: { label?: string; className?: string }) {
  return (
    <a
      href="#offer"
      style={sans}
      className={`block w-full bg-[color:var(--gold-deep)] px-8 py-4 text-center text-[14px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#5C4A35] active:scale-[0.99] ${className}`}
    >
      {label}
    </a>
  );
}

/* --------------------------------- offer ---------------------------------- */

function TierCard({ tier, selected, onSelect }: { tier: Tier; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative w-full rounded-xl text-left transition ${
        selected
          ? "border-2 border-[color:var(--gold-deep)] bg-[color:var(--cw-surface)] shadow-lg shadow-black/10"
          : "border border-[color:var(--cw-line)] bg-[color:var(--cw-bg)]"
      }`}
    >
      {tier.tag && (
        <span
          style={sans}
          className="absolute right-3 top-0 -translate-y-1/2 rounded-full bg-[color:var(--gold-deep)] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white"
        >
          {tier.tag}
        </span>
      )}

      <div className="flex items-center gap-4 px-4 py-5 sm:px-5">
        <span
          className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
            selected ? "border-[color:var(--gold-deep)]" : "border-[color:var(--cw-line)]"
          }`}
        >
          {selected && <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--gold-deep)]" />}
        </span>

        <span className="min-w-0 flex-1">
          <span style={serif} className="block text-[20px] leading-tight sm:text-[24px]">
            {tier.label}
          </span>
          <span style={sans} className="mt-1 block text-[12px] text-[color:var(--cw-muted)]">
            {money(tier.price)} total
            {tier.saves ? ` · save ${money(tier.saves)}` : ""}
          </span>
        </span>

        <span className="shrink-0 text-right">
          {tier.compareAt && (
            <span style={sans} className="block text-[12px] text-[color:var(--cw-muted)] line-through tabular-nums">
              {money(tier.compareAt)}
            </span>
          )}
          <span style={sans} className="block text-[20px] font-bold tabular-nums sm:text-[22px]">
            {money(tier.perUnit)}
          </span>
          <span style={sans} className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.18em] text-[color:var(--cw-muted)]">
            Per brush
          </span>
        </span>
      </div>
    </button>
  );
}

function OfferSection({ id }: { id?: string }) {
  const [sel, setSel] = useState(DEFAULT_TIER);
  const tier = TIERS.find((t) => t.id === sel) ?? TIERS[0]!;

  return (
    <div id={id} className="scroll-mt-20">
      <div className="space-y-5 pt-3">
        {TIERS.map((t) => (
          <TierCard key={t.id} tier={t} selected={t.id === tier.id} onSelect={() => setSel(t.id)} />
        ))}
      </div>

      <a
        href={tierCheckoutUrl(tier)}
        onClick={() => trackInitiateCheckout([tier.variantId], tier.price, 1)}
        style={sans}
        className="mt-6 block w-full rounded-full bg-[color:var(--gold-deep)] px-8 py-5 text-center text-[15px] font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-black/15 transition hover:bg-[#5C4A35] active:scale-[0.99]"
      >
        Add to Cart — {money(tier.price)}
      </a>

      <img src={payBadges.url} alt="Accepted payment methods" className="mx-auto mt-4 h-6 w-auto object-contain" loading="lazy" />

      <ul
        style={sans}
        className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--gold-deep)]"
      >
        <li>Free shipping</li>
        <li aria-hidden>·</li>
        <li>365-day guarantee</li>
        <li aria-hidden>·</li>
        <li>Secure checkout</li>
      </ul>
    </div>
  );
}

/* --------------------------------- gallery -------------------------------- */

const GALLERY = [img1, img2, img3, img4, img5, img6];

function Gallery() {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="relative overflow-hidden border border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
        <div className="absolute right-3 top-3 z-10">
          <span
            style={sans}
            className="inline-block rounded-sm border border-[color:var(--cw-brand-deep)]/50 bg-[color:var(--cw-bg)] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[color:var(--cw-brand-deep)] shadow-sm"
          >
            Updated Design
          </span>
          <span
            style={sans}
            className="mt-1 block text-right text-[8px] font-semibold uppercase tracking-[0.14em] text-[color:var(--cw-muted)]"
          >
            New wooden version
          </span>
        </div>
        <img
          src={GALLERY[i]!.url}
          alt={`Seralie SilkBrush™ product image ${i + 1}`}
          className="h-full w-full object-contain"
          style={{ aspectRatio: "4 / 5" }}
        />
      </div>
      <div className="mt-3 grid grid-cols-6 gap-2">
        {GALLERY.map((g, idx) => (
          <button
            key={g.url}
            onClick={() => setI(idx)}
            aria-label={`View image ${idx + 1}`}
            className={`overflow-hidden border ${
              idx === i ? "border-[color:var(--cw-ink)]" : "border-[color:var(--cw-line)]"
            }`}
          >
            <img src={g.url} alt="" className="aspect-square w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ ugc carousel ------------------------------ */

function UgcRow() {
  const ref = useRef<HTMLDivElement>(null);
  const by = (d: number) => ref.current?.scrollBy({ left: d * (ref.current.clientWidth * 0.7), behavior: "smooth" });
  return (
    <div className="relative">
      <div
        ref={ref}
        className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0"
      >
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="w-[72%] shrink-0 snap-center md:w-auto">
            <Media label="VIDEO" ratio="9 / 16" note={`PLACEHOLDER: UGC VIDEO ${n}`} className="!rounded-none" />
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2 md:hidden">
        <button onClick={() => by(-1)} aria-label="Previous" className="h-9 w-9 border border-[color:var(--cw-line)]">
          ‹
        </button>
        <button onClick={() => by(1)} aria-label="Next" className="h-9 w-9 border border-[color:var(--cw-line)]">
          ›
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- page ---------------------------------- */

export function SilkBrushPage() {
  const [openSpec, setOpenSpec] = useState(false);

  return (
    <SilkShell>
      {/* 1 — PRODUCT HERO */}
      <section className="mx-auto max-w-6xl px-5 pb-14 pt-6 md:px-8 md:pb-20 md:pt-10">
        <div className="grid gap-8 md:grid-cols-2 md:gap-14">
          <Gallery />

          <div className="md:pt-2">
            <RatingLine />
            <h1 style={serif} className="mt-3 text-[36px] leading-[1.02] text-[color:var(--cw-brand-deep)] md:text-[52px]">
              Smooth. Straighten. Shine.
            </h1>
            <p style={sans} className="mt-4 max-w-md text-[15px] leading-7 text-[color:var(--cw-muted)]">
              Meet the <strong className="font-bold text-[color:var(--cw-ink)]">Seralie SilkBrush™</strong>. A boar-bristle brush designed to smooth frizz, tame flyaways, and create a
              sleek, straighter-looking finish while you brush.
            </p>

            <div className="mt-8">
              <OfferSection id="offer" />
            </div>
          </div>
        </div>
      </section>

      {/* 1b — PRODUCT UPDATE ANNOUNCEMENT */}
      <section className="mx-auto max-w-6xl px-5 pb-14 md:px-8 md:pb-20">
        <div className="flex flex-col gap-5 rounded-lg border border-[color:var(--cw-line)] bg-[color:var(--cw-surface)] p-5 md:flex-row md:items-center md:gap-6 md:p-6">
          <div className="shrink-0 md:w-28">
            <div className="overflow-hidden border border-[color:var(--cw-line)] bg-[color:var(--cw-bg)]">
              <img
                src={img2.url}
                alt="Current wooden Seralie SilkBrush™ design"
                className="aspect-square w-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-[color:var(--cw-brand-deep)]">
                <path d="M12 2L14.09 8.26L20 9.27L15.55 13.14L16.82 19L12 15.77L7.18 19L8.45 13.14L4 9.27L9.91 8.26L12 2Z" fill="currentColor" />
              </svg>
              <p style={sans} className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--cw-brand-deep)]">
                Updated SilkBrush™ Design
              </p>
            </div>
            <p style={serif} className="mt-2 text-[20px] leading-snug text-[color:var(--cw-ink)] md:text-[24px]">
              Now featuring our <span className="text-[color:var(--cw-brand-deep)]">upgraded wooden design</span>.
            </p>
            <p style={sans} className="mt-2 max-w-xl text-[13px] leading-6 text-[color:var(--cw-muted)]">
              We’re always looking for ways to improve the SilkBrush™. Some earlier content features our previous version, but all current orders include the <span className="text-[color:var(--cw-brand-deep)]">newest wooden SilkBrush™ design</span> shown on this page.
            </p>
          </div>
        </div>
      </section>

      {/* 2 — SOCIAL PROOF */}
      <section id="social" className="border-t border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <Eyebrow>Social proof</Eyebrow>
          <h2 style={serif} className="mt-2 text-[32px] leading-[1.05] md:text-[46px]">
            Don't Just Take Our Word For It.
          </h2>
          <p style={sans} className="mt-2 max-w-lg text-[15px] text-[color:var(--cw-muted)]">
            See how people are using the SilkBrush™ in their everyday routines.
          </p>

          <div className="mt-7">
            <UgcRow />
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="border border-dashed border-[color:var(--cw-brand-deep)]/45 bg-[color:var(--cw-bg)] p-5">
                <Stars />
                <p style={sans} className="mt-2 text-[12px] leading-6 text-[color:var(--cw-muted)]">
                  PLACEHOLDER: REAL REVIEW {n} — paste a verified customer review here.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 max-w-xs">
            <OfferLink />
          </div>
        </div>
      </section>

      {/* 3 — BENEFITS */}
      <section id="how" className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
          <div>
            <Eyebrow>Why people want it</Eyebrow>
            <h2 style={serif} className="mt-2 text-[32px] leading-[1.05] md:text-[46px]">
              Your Hair, Just Better.
            </h2>
            <p style={sans} className="mt-4 max-w-md text-[15px] leading-7 text-[color:var(--cw-muted)]">
              The SilkBrush™ helps smooth unruly strands while boar bristles distribute natural oils through the hair,
              leaving it looking smoother, shinier, and more polished.
            </p>

            <dl className="mt-8 divide-y divide-[color:var(--cw-line)] border-y border-[color:var(--cw-line)]">
              {[
                ["Smooth", "Tame frizz and flyaways."],
                ["Shine", "Bring out a naturally glossy finish."],
                ["Sleek", "Create a smoother, straighter-looking style."],
              ].map(([t, d]) => (
                <div key={t} className="flex min-w-0 gap-6 py-4">
                  <dt style={sans} className="w-20 shrink-0 text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--cw-brand-deep)] sm:w-24">
                    {t}
                  </dt>
                  <dd style={sans} className="min-w-0 break-words text-[14px] leading-6 text-[color:var(--cw-muted)]">
                    {d}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid gap-3">
            <img
              src={imgCloseup.url}
              alt="Close-up of the SilkBrush™ boar bristles"
              className="w-full border border-[color:var(--cw-line)] object-cover"
              style={{ aspectRatio: "3 / 4" }}
              loading="lazy"
            />
            <img
              src={imgUsing.url}
              alt="Woman brushing her hair with the Seralie SilkBrush™"
              className="w-full border border-[color:var(--cw-line)] object-cover"
              style={{ aspectRatio: "9 / 16" }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 4 — HOW TO USE + DETAILS */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-14">
          <div>
            <Eyebrow>How to use</Eyebrow>
            <h2 style={serif} className="mt-2 text-[32px] leading-[1.05] md:text-[42px]">
              Brush. Smooth. Shine. Done.
            </h2>

            <ol className="mt-7 divide-y divide-[color:var(--cw-line)] border-y border-[color:var(--cw-line)]">
              {[
                ["01", "Start", "Use on dry hair according to product instructions."],
                ["02", "Brush", "Work through small sections of hair."],
                ["03", "Finish", "Reveal a smoother, shinier, straighter-looking finish."],
              ].map(([n, t, d]) => (
                <li key={n} className="flex min-w-0 gap-5 py-4">
                  <span style={serif} className="w-8 shrink-0 text-[18px] text-[color:var(--cw-brand-deep)]">
                    {n}
                  </span>
                  <span className="min-w-0">
                    <span style={sans} className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--cw-brand-deep)]">
                      {t}
                    </span>
                    <span style={sans} className="mt-1 block break-words text-[14px] leading-6 text-[color:var(--cw-muted)]">
                      {d}
                    </span>
                  </span>
                </li>
              ))}
            </ol>

            <button
              onClick={() => setOpenSpec((v) => !v)}
              aria-expanded={openSpec}
              style={sans}
              className="mt-6 flex w-full items-center justify-between border-b border-[color:var(--cw-line)] pb-3 text-left text-[12px] font-bold uppercase tracking-[0.2em] text-[color:var(--cw-brand-deep)]"
            >
              Product details
              <span className="text-[color:var(--cw-brand-deep)]">{openSpec ? "–" : "+"}</span>
            </button>
            {openSpec && (
              <dl style={sans} className="text-[13px] leading-6 text-[color:var(--cw-muted)]">
                {[
                  ["What's included", "1 × Seralie SilkBrush™"],
                  ["Bristle type", "[INSERT ACTUAL BRISTLE TYPE]"],
                  ["Materials", "[INSERT ACTUAL MATERIALS]"],
                  ["Dimensions", "[INSERT]"],
                  ["Care instructions", "[INSERT]"],
                  ["Recommended hair types", "[INSERT]"],
                ].map(([k, v]) => (
                  <div key={k} className="flex min-w-0 justify-between gap-6 border-b border-[color:var(--cw-line)] py-3">
                    <dt className="min-w-0 break-words font-medium text-[color:var(--cw-brand-deep)]">{k}</dt>
                    <dd className="min-w-0 break-words text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <Media label="VIDEO" ratio="4 / 5" note="PLACEHOLDER: HOW-TO VIDEO" className="!rounded-none" />
        </div>
      </section>

      <SilkReviews />

      {/* 5 — FAQ */}
      <section className="border-t border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
        <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
          <h3 id="faq" style={serif} className="text-[24px] md:text-[30px]">
            FAQ
          </h3>
          <div className="mt-4">
            <Faq />
          </div>
        </div>
      </section>
    </SilkShell>
  );
}
