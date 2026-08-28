import { useRef, useState } from "react";
import { addToCart, Media, RatingLine, SilkShell, Faq, sans, serif, Stars } from "@/components/site/Silk";
import { money, PRICE } from "@/lib/silkbrush-config";

/* ------------------------------- primitives ------------------------------- */

function Cta({ label = "Add to Cart", className = "" }: { label?: string; className?: string }) {
  return (
    <button
      onClick={() => addToCart(1)}
      style={sans}
      className={`w-full bg-[color:var(--cw-ink)] px-8 py-4 text-center text-[14px] font-bold uppercase tracking-[0.2em] text-white transition-transform active:scale-[0.99] ${className}`}
    >
      {label}
    </button>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={sans} className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--cw-brand-deep)]">
      {children}
    </p>
  );
}

/* --------------------------------- gallery -------------------------------- */

const GALLERY: { label: "IMAGE" | "VIDEO"; note: string }[] = [
  { label: "IMAGE", note: "PLACEHOLDER: MAIN PRODUCT IMAGE" },
  { label: "VIDEO", note: "PLACEHOLDER: HERO UGC VIDEO" },
  { label: "IMAGE", note: "PLACEHOLDER: PRODUCT IMAGE 2" },
  { label: "IMAGE", note: "PLACEHOLDER: PRODUCT IMAGE 3" },
  { label: "IMAGE", note: "PLACEHOLDER: PRODUCT IMAGE 4" },
];

function Gallery() {
  const [i, setI] = useState(0);
  const active = GALLERY[i]!;
  return (
    <div>
      <Media label={active.label} note={active.note} ratio="4 / 5" className="!rounded-none" />
      <div className="mt-3 grid grid-cols-5 gap-2">
        {GALLERY.map((g, idx) => (
          <button
            key={g.note}
            onClick={() => setI(idx)}
            aria-label={`View media ${idx + 1}`}
            className={`grid aspect-square place-items-center border text-[9px] font-semibold uppercase tracking-[0.14em] ${
              idx === i
                ? "border-[color:var(--cw-ink)] text-[color:var(--cw-ink)]"
                : "border-[color:var(--cw-line)] text-[color:var(--cw-muted)]"
            }`}
            style={sans}
          >
            {g.label === "VIDEO" ? "▶" : idx + 1}
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
    <SilkShell sticky>
      {/* 1 — PRODUCT HERO */}
      <section className="mx-auto max-w-6xl px-5 pb-14 pt-6 md:px-8 md:pb-20 md:pt-10">
        <div className="grid gap-8 md:grid-cols-2 md:gap-14">
          <Gallery />

          <div className="md:pt-2">
            <RatingLine />
            <h1 style={serif} className="mt-3 text-[36px] leading-[1.02] md:text-[52px]">
              Smooth. Straighten. Shine.
            </h1>
            <p style={sans} className="mt-4 max-w-md text-[15px] leading-7 text-[color:var(--cw-muted)]">
              Meet the <strong className="font-bold text-[color:var(--cw-ink)]">Seralie SilkBrush™</strong>. A boar-bristle brush designed to smooth frizz, tame flyaways, and create a
              sleek, straighter-looking finish while you brush.
            </p>

            <p style={serif} className="mt-6 text-[32px] leading-none">
              {money(PRICE)}
            </p>
            <p style={sans} className="mt-2 text-[13px] text-[color:var(--cw-muted)]">
              Free shipping · 30-day money-back guarantee
            </p>

            <Cta className="mt-6" />

            <ul style={sans} className="mt-4 space-y-1.5 text-[12px] uppercase tracking-[0.14em] text-[color:var(--cw-muted)]">
              <li>✓ Free shipping</li>
              <li>✓ 30-day money-back guarantee</li>
              <li>✓ Secure checkout</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2 — PROOF */}
      <section className="border-t border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
        <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
          <Eyebrow>The proof</Eyebrow>
          <h2 style={serif} className="mt-2 text-[32px] leading-[1.05] md:text-[46px]">
            See The Difference.
          </h2>
          <p style={sans} className="mt-2 text-[15px] text-[color:var(--cw-muted)]">
            One side brushed. One side untouched.
          </p>

          <div className="mt-7">
            <Media
              label="VIDEO"
              ratio="16 / 10"
              note="PLACEHOLDER: LARGE BEFORE/AFTER VIDEO (or before/after image slider)"
              className="!rounded-none"
            />
          </div>

          <div style={sans} className="mt-6 grid grid-cols-3 border-y border-[color:var(--cw-line)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--cw-brand-deep)]">
            {["Smoother hair", "Less frizz", "More shine"].map((t) => (
              <p key={t} className="py-4 text-center">
                {t}
              </p>
            ))}
          </div>

          <div className="mt-7 max-w-xs">
            <Cta label="Shop SilkBrush™" />
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
            <Media label="IMAGE" ratio="4 / 3" note="PLACEHOLDER: CLOSE-UP IMAGE OF BRISTLES" className="!rounded-none" />
            <Media label="IMAGE" ratio="4 / 3" note="PLACEHOLDER: LIFESTYLE IMAGE OF WOMAN USING SILKBRUSH™" className="!rounded-none" />
          </div>
        </div>
      </section>

      {/* 4 — UGC */}
      <section id="reviews" className="border-t border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
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
            <Cta />
          </div>
        </div>
      </section>

      {/* 5 — HOW TO USE + DETAILS */}
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
                <li key={n} className="flex gap-5 py-4">
                  <span style={serif} className="w-8 shrink-0 text-[18px] text-[color:var(--cw-brand-deep)]">
                    {n}
                  </span>
                  <span>
                    <span style={sans} className="block text-[11px] font-bold uppercase tracking-[0.2em]">
                      {t}
                    </span>
                    <span style={sans} className="mt-1 block text-[14px] leading-6 text-[color:var(--cw-muted)]">
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
              className="mt-6 flex w-full items-center justify-between border-b border-[color:var(--cw-line)] pb-3 text-left text-[12px] font-bold uppercase tracking-[0.2em]"
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
                  <div key={k} className="flex justify-between gap-6 border-b border-[color:var(--cw-line)] py-3">
                    <dt className="font-medium text-[color:var(--cw-ink)]">{k}</dt>
                    <dd className="text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <Media label="VIDEO" ratio="4 / 5" note="PLACEHOLDER: HOW-TO VIDEO" className="!rounded-none" />
        </div>
      </section>

      {/* 6 — FINAL PURCHASE + FAQ */}
      <section className="border-t border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
        <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
          <h2 style={serif} className="text-[32px] leading-[1.05] md:text-[44px]">
            Ready For Smoother, Shinier Hair?
          </h2>
          <p style={serif} className="mt-4 text-[32px] leading-none">
            {money(PRICE)}
          </p>
          <p style={sans} className="mt-2 text-[13px] text-[color:var(--cw-muted)]">
            Free shipping · 30-day money-back guarantee
          </p>
          <div className="mt-6 max-w-xs">
            <Cta />
          </div>

          <h3 id="faq" style={serif} className="mt-14 text-[24px] md:text-[30px]">
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
