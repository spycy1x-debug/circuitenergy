import { useRef, useState } from "react";
import { BuyButton, Faq, Label, Media, RatingLine, SilkShell, TrustRow, sans, serif } from "@/components/site/Silk";
import { money, PRICE } from "@/lib/silkbrush-config";

/* ------------------------------ tiny helpers ------------------------------ */

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={serif} className="text-[28px] leading-[1.1] md:text-[40px]">
      {children}
    </h2>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return (
    <p style={sans} className="mt-2 text-[15px] leading-7 text-[color:var(--cw-muted)]">
      {children}
    </p>
  );
}

/** Horizontal snap carousel: swipeable on mobile, grid-like on desktop. */
function SwipeRow({ children }: { children: React.ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  return (
    <div className="relative">
      <div
        ref={ref}
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0"
      >
        {children.map((c, i) => (
          <div key={i} className="w-[70%] shrink-0 snap-center md:w-auto">
            {c}
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-2 md:hidden">
        <button onClick={() => scrollBy(-1)} aria-label="Previous" className="h-9 w-9 rounded-full border border-[color:var(--cw-line)]">
          ‹
        </button>
        <button onClick={() => scrollBy(1)} aria-label="Next" className="h-9 w-9 rounded-full border border-[color:var(--cw-line)]">
          ›
        </button>
      </div>
    </div>
  );
}

/* --------------------------------- page ---------------------------------- */

export function SilkBrushPage() {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <SilkShell sticky>
      {/* 1 — HERO */}
      <section className="mx-auto max-w-3xl px-4 pb-10 pt-8 md:px-8 md:pt-12">
        <h1 style={serif} className="text-center text-[34px] leading-[1.05] md:text-[54px]">
          Smooth. Straighten. Shine.
        </h1>
        <p style={sans} className="mx-auto mt-3 max-w-xl text-center text-[15px] leading-7 text-[color:var(--cw-muted)] md:text-[17px]">
          Meet the Seralie SilkBrush™ — the boar-bristle brush designed to smooth frizz and create a sleek,
          straighter-looking finish while you brush.
        </p>

        <div className="mt-6">
          <Media label="VIDEO" ratio="4 / 5" note="HERO UGC VIDEO — before → SilkBrush™ → after. Transformation must be obvious in the first 3 seconds." />
        </div>

        <div className="mt-5 flex flex-col items-center gap-2">
          <RatingLine />
          <p style={serif} className="text-[30px] leading-none">
            {money(PRICE)}
          </p>
          <TrustRow className="mt-1" />
        </div>

        <BuyButton className="mt-5" />
      </section>

      {/* 2 — TRANSFORMATION */}
      <section className="border-t border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
        <div className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
          <Label>The transformation</Label>
          <H2>See The Difference.</H2>
          <Sub>One side brushed. One side untouched.</Sub>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Media label="VIDEO" ratio="4 / 5" note="BEFORE/AFTER VIDEO — frizzy → smooth, dull → shiny, unruly → sleek." />
            <Media label="IMAGE" ratio="4 / 5" note="BEFORE/AFTER IMAGE — split shot, one side brushed." />
          </div>

          <div className="mx-auto mt-7 max-w-md">
            <BuyButton />
          </div>
        </div>
      </section>

      {/* 3 — WHY IT WORKS + BENEFITS */}
      <section className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
        <Label>Why it works</Label>
        <H2>One Brush. Three Results.</H2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { t: "Smooth", d: "Helps tame frizz and flyaways for a more polished finish." },
            {
              t: "Shine",
              d: "Boar bristles help distribute your hair's natural oils through the lengths of the hair, helping create a smoother, shinier appearance.",
            },
            { t: "Sleek", d: "Helps smooth and lay hair down for a straighter-looking finish." },
          ].map((b) => (
            <div key={b.t} className="rounded-xl border border-[color:var(--cw-line)] p-5">
              <p style={sans} className="text-[12px] font-bold uppercase tracking-[0.2em]">
                {b.t}
              </p>
              <p style={sans} className="mt-2 text-[14px] leading-7 text-[color:var(--cw-muted)]">
                {b.d}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-6 md:grid-cols-2">
          <div>
            <h3 style={serif} className="text-[24px] leading-tight md:text-[30px]">
              Why Boar Bristles?
            </h3>
            <p style={sans} className="mt-3 text-[15px] leading-7 text-[color:var(--cw-muted)]">
              The SilkBrush™ uses boar bristles to help smooth the hair's surface while distributing natural oils
              through the lengths of the hair. The result is hair that looks smoother, shinier, and more polished.
            </p>
          </div>
          <Media label="IMAGE" ratio="4 / 3" note="CLOSE-UP PRODUCT IMAGE showing the bristles." />
        </div>
      </section>

      {/* 4 — UGC + SOCIAL PROOF */}
      <section className="border-t border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
        <div className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-16">
          <Label>Social proof</Label>
          <H2>Watch It Work.</H2>
          <Sub>Real hair. Real routines.</Sub>

          <div className="mt-6">
            <SwipeRow>
              {[1, 2, 3, 4].map((n) => (
                <Media key={n} label="VIDEO" ratio="9 / 16" note={`UGC VIDEO ${n} — different hook/result. Use the creator's real words as the caption.`} />
              ))}
            </SwipeRow>
          </div>

          <h3 style={serif} className="mt-12 text-[24px] md:text-[30px]">
            What Customers Are Saying
          </h3>
          <p style={sans} className="mt-2 text-[13px] text-[color:var(--cw-muted)]">
            Verified reviews will appear here as they come in.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-xl border border-dashed border-[color:var(--cw-brand-deep)]/45 bg-[color:var(--cw-bg)] p-5">
                <div style={sans} className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--cw-brand-deep)]">
                  Review slot {n}
                </div>
                <p style={sans} className="mt-2 text-[13px] leading-6 text-[color:var(--cw-muted)]">
                  Insert real customer review {n} here — name, rating and verified purchase status.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Media label="IMAGE" ratio="16 / 9" note="CUSTOMER PHOTO / VIDEO — real customer result." />
          </div>

          <div className="mx-auto mt-7 max-w-md">
            <BuyButton />
          </div>
        </div>
      </section>

      {/* 5 — HOW TO USE + DETAILS */}
      <section className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
        <Label>How to use</Label>
        <H2>Brush. Smooth. Shine. Done.</H2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { n: "01", t: "Start", d: "Use on dry hair." },
            { n: "02", t: "Brush", d: "Work through small sections of hair." },
            { n: "03", t: "Finish", d: "Enjoy a smoother, shinier, straighter-looking finish." },
          ].map((s) => (
            <div key={s.n} className="rounded-xl bg-[color:var(--cw-surface)] p-5">
              <p style={sans} className="text-[11px] font-bold tracking-[0.2em] text-[color:var(--cw-brand-deep)]">
                {s.n} — {s.t.toUpperCase()}
              </p>
              <p style={sans} className="mt-2 text-[14px] leading-7 text-[color:var(--cw-muted)]">
                {s.d}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Media label="VIDEO" ratio="16 / 9" note="HOW-TO VIDEO — 15s demo of the three steps." />
        </div>

        <div className="mt-8 rounded-xl border border-[color:var(--cw-line)] p-5">
          <p style={sans} className="text-[12px] font-bold uppercase tracking-[0.2em]">
            What's Included
          </p>
          <p style={sans} className="mt-2 text-[14px] text-[color:var(--cw-muted)]">
            1 × Seralie SilkBrush™
          </p>

          <button
            onClick={() => setDetailsOpen((v) => !v)}
            aria-expanded={detailsOpen}
            style={sans}
            className="mt-4 flex w-full items-center justify-between border-t border-[color:var(--cw-line)] pt-4 text-left text-[13px] font-semibold uppercase tracking-[0.16em]"
          >
            Product details
            <span className="text-[color:var(--cw-brand-deep)]">{detailsOpen ? "–" : "+"}</span>
          </button>
          {detailsOpen && (
            <dl style={sans} className="mt-3 space-y-2 text-[13px] leading-6 text-[color:var(--cw-muted)]">
              {[
                ["Bristle material", "[INSERT ACTUAL MATERIAL]"],
                ["Handle material", "[INSERT ACTUAL MATERIAL]"],
                ["Dimensions", "[INSERT]"],
                ["Weight", "[INSERT]"],
                ["Recommended hair types", "[INSERT]"],
                ["Care instructions", "[INSERT]"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-[color:var(--cw-line)] pb-2">
                  <dt className="font-medium text-[color:var(--cw-ink)]">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {/* 6 — GUARANTEE + FAQ + FINAL CTA */}
      <section className="border-t border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
        <div className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
          <Label>Guarantee</Label>
          <H2>Try It Without The Guesswork.</H2>
          <Sub>
            We're confident you'll love the SilkBrush™. If you're not satisfied with your purchase, you're covered by our
            30-day money-back guarantee, subject to our return policy.
          </Sub>
          <TrustRow className="mt-5 justify-start" />

          <h3 id="faq" style={serif} className="mt-12 text-[24px] md:text-[30px]">
            FAQ
          </h3>
          <div className="mt-4">
            <Faq />
          </div>

          <div className="mt-12 rounded-2xl bg-[color:var(--cw-bg)] p-6 text-center md:p-8">
            <h3 style={serif} className="text-[26px] leading-tight md:text-[34px]">
              Smooth Hair Starts With One Brush.
            </h3>
            <p style={serif} className="mt-3 text-[30px] leading-none">
              {money(PRICE)}
            </p>
            <TrustRow className="mt-3" />
            <div className="mx-auto mt-5 max-w-md">
              <BuyButton />
            </div>
            <div className="mt-6">
              <Media label="IMAGE" ratio="16 / 9" note="FINAL LIFESTYLE IMAGE — smooth, shiny finished hair with the brush in frame." />
            </div>
          </div>
        </div>
      </section>
    </SilkShell>
  );
}
