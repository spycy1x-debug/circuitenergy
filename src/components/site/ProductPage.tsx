import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronLeft, ChevronRight, Check, Minus, Star } from "lucide-react";
import {
  TIERS,
  DEFAULT_TIER,
  tierById,
  type TierId,
  GUARANTEE_DAYS,
} from "@/lib/product-config";
import { cart } from "@/lib/shopify-cart";
import { trackViewContent, trackAddToCart } from "@/lib/fb-pixel";
import { GALLERY } from "@/lib/gallery";
import { REVIEWS } from "@/lib/reviews-data";
import { Reviews } from "@/components/site/Reviews";
import { GuaranteeBand } from "@/components/site/GuaranteeBand";
import { BenefitCircles } from "@/components/site/BenefitCircles";
import { TrustRow } from "@/components/site/TrustRow";
import { GuaranteeBadges } from "@/components/site/GuaranteeBadges";

const money = (n: number) => `$${n.toFixed(2)}`;

export type ProductCopy = {
  eyebrow: string;
  title: string;
  lede: string;
  bullets: string[];
  description: string;
  problemEyebrow: string;
  problemTitle: string;
  problemBody: string;
  symptoms: string[];
  formulaTitle: string;
  formulaCards: { h: string; p: string }[];
  stages: { n: string; title: string; body: string }[];
  timeline: { k: string; items: string[] }[];
  comparisonTitle: string;
  comparison: string[];
  faqs: { q: string; a: string }[];
  finalTitle: string;
};

/* ------------------------------- Gallery ------------------------------- */

function Gallery() {
  const [i, setI] = useState(0);
  const startX = useRef<number | null>(null);
  const img = GALLERY[i]!;

  const go = (d: number) => setI((v) => (v + d + GALLERY.length) % GALLERY.length);

  return (
    <div>
      <div
        className="relative touch-pan-y select-none overflow-hidden border border-[color:var(--border)] bg-white"
        onTouchStart={(e) => {
          startX.current = e.touches[0]!.clientX;
        }}
        onTouchEnd={(e) => {
          if (startX.current === null) return;
          const dx = e.changedTouches[0]!.clientX - startX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          startX.current = null;
        }}
      >
        <img
          src={img.url}
          alt={img.alt}
          draggable={false}
          className="w-full aspect-square object-cover"
          loading="eager"
        />
        <button
          aria-label="Previous image"
          onClick={() => go(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[color:var(--navy)] border border-[color:var(--border)]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          aria-label="Next image"
          onClick={() => go(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[color:var(--navy)] border border-[color:var(--border)]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5 sm:hidden">
          {GALLERY.map((g, idx) => (
            <span
              key={g.url}
              className={`h-1.5 w-1.5 rounded-full ${idx === i ? "bg-[color:var(--navy)]" : "bg-[color:var(--navy)]/25"}`}
            />
          ))}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-2">
        {GALLERY.map((g, idx) => (
          <button
            key={g.url}
            onClick={() => setI(idx)}
            aria-label={`View image ${idx + 1}`}
            className={`overflow-hidden border ${idx === i ? "border-[color:var(--navy)]" : "border-[color:var(--border)]"}`}
          >
            <img src={g.url} alt="" className="aspect-square w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Accordion ------------------------------ */

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[color:var(--border)]">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="font-display text-lg text-[color:var(--navy)]">{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-[color:var(--taupe)] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-6 text-sm leading-7 text-[color:var(--muted-foreground)]">{children}</div>
      )}
    </div>
  );
}

/* ---------------------------- Review ticker ---------------------------- */

function ReviewTicker() {
  const five = useMemo(() => REVIEWS.filter((r) => r.rating === 5), []);
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % five.length), 5000);
    return () => clearInterval(t);
  }, [five.length]);

  const r = five[i];
  if (!r) return null;

  return (
    <div className="w-full border border-[color:var(--border)] bg-white px-4 py-3">
      <div className="flex items-center justify-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className="h-3 w-3 text-[color:var(--gold)]"
            fill="currentColor"
            strokeWidth={0}
          />
        ))}
      </div>
      <p
        key={r.id}
        className="mt-2 line-clamp-2 text-center text-[13px] leading-6 text-[color:var(--navy)]"
      >
        &ldquo;{r.title ?? r.body}&rdquo;
      </p>
      <div className="mt-2 flex items-center justify-center gap-2">
        {r.photo ? (
          <img
            src={r.photo}
            alt={r.photoAlt ?? r.name}
            loading="lazy"
            className="h-6 w-6 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[color:var(--ivory)] text-[10px] font-semibold text-[color:var(--taupe)]">
            {r.name.charAt(0)}
          </span>
        )}
        <span className="text-[10px] uppercase tracking-[0.14em] text-[color:var(--taupe)]">
          {r.name} · Verified buyer
        </span>
      </div>
    </div>
  );
}

/* -------------------------------- BuyBox -------------------------------- */

function BuyBox({ copy }: { copy: ProductCopy }) {
  const [tierId, setTierId] = useState<TierId>(DEFAULT_TIER);
  const [subscribe, setSubscribe] = useState(true);
  const [adding, setAdding] = useState(false);

  const tier = tierById(tierId);
  const active = subscribe ? tier.subPrice : tier.oneTimePrice;

  useEffect(() => {
    trackViewContent(tier.variantId, tier.oneTimePrice);
  }, [tier.variantId, tier.oneTimePrice]);

  async function addToCart() {
    if (adding) return;
    setAdding(true);
    try {
      await cart.add({
        variantId: tier.variantId,
        quantity: 1,
        sellingPlanId: subscribe ? tier.sellingPlanId : null,
        attributes: subscribe ? [{ key: "Subscription", value: tier.cadence }] : undefined,
        bundleLabel: tier.label,
        displayPrice: active,
      });
      trackAddToCart(tier.variantId, active, tier.bottles);
    } catch {
      /* error surfaces in the drawer */
    } finally {
      setAdding(false);
    }
  }

  return (
    <div id="buy">
      <div className="eyebrow">{copy.eyebrow}</div>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">{copy.title}</h1>
      <p className="mt-4 text-[15px] leading-7 text-[color:var(--muted-foreground)]">{copy.lede}</p>

      <ul className="mt-6 space-y-2.5">
        {copy.bullets.map((b) => (
          <li key={b} className="flex gap-3 text-sm leading-6 text-[color:var(--navy)]">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" strokeWidth={2} />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-3">
        {TIERS.map((t) => {
          const sel = t.id === tierId;
          const per = Math.floor(((subscribe ? t.subPrice : t.oneTimePrice) / t.bottles) * 100) / 100;
          const perCompare = t.compareAt ? Math.floor((t.compareAt / t.bottles) * 100) / 100 : null;
          return (
            <button
              key={t.id}
              onClick={() => setTierId(t.id)}
              className={`relative flex w-full items-center gap-4 border px-4 py-4 text-left transition-colors ${
                sel
                  ? "border-[color:var(--navy)] bg-white"
                  : "border-[color:var(--border)] bg-white/60 hover:border-[color:var(--taupe)]"
              }`}
            >
              {t.badge && (
                <span className="absolute -top-2 right-3 bg-[color:var(--navy)] px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] text-[color:var(--ivory)]">
                  {t.badge}
                </span>
              )}
              <span
                className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
                  sel ? "border-[color:var(--navy)]" : "border-[color:var(--taupe)]"
                }`}
              >
                {sel && <span className="h-2 w-2 rounded-full bg-[color:var(--navy)]" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-lg text-[color:var(--navy)]">{t.label}</span>
                <span className="block text-xs text-[color:var(--muted-foreground)]">
                  {t.bottles} {t.bottles === 1 ? "bottle" : "bottles"}
                </span>
              </span>
              <span className="shrink-0 text-right">
                {perCompare && perCompare > per && (
                  <span className="block text-xs text-[color:var(--taupe)] line-through tabular-nums">
                    {money(perCompare)}/bottle
                  </span>
                )}
                <span className="block font-display text-xl tabular-nums text-[color:var(--navy)]">
                  {money(per)}
                </span>
                <span className="block text-[11px] text-[color:var(--muted-foreground)]">
                  per bottle
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <button onClick={addToCart} disabled={adding} className="btn-primary mt-6 w-full py-7! text-[17px]! tracking-[0.12em]!">
        {adding ? "Adding…" : "Add to cart"}
      </button>

      <GuaranteeBadges className="mt-5" />

      <p className="mt-4 text-center text-xs text-[color:var(--muted-foreground)]">
        Free US shipping over $50 · Ships within 24 hours · {GUARANTEE_DAYS}-day money-back guarantee
      </p>
      <p className="mt-2 text-center text-xs text-[color:var(--muted-foreground)]">
        Most people give it 6–8 weeks. That is how long it takes for nutrient levels and daily habits to
        settle in.
      </p>

      <div className="mt-5">
        <ReviewTicker />
      </div>

      <div className="mt-6">
        <TrustRow />
      </div>

      <div className="mt-4 flex items-center justify-center text-[12px] tracking-[0.06em]">
        <button
          type="button"
          onClick={() => setSubscribe((s) => !s)}
          className="font-semibold uppercase text-[color:var(--navy)] underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          {subscribe ? (
            <>
              Buy once - no savings <span className="font-bold">{money(tier.oneTimePrice)}</span>
            </>
          ) : (
            <>
              Subscribe &amp; save 25% <span className="font-bold">{money(tier.subPrice)}</span>
            </>
          )}
        </button>
      </div>

      <p className="mt-1.5 text-center text-[11px] text-[color:var(--muted-foreground)]">
        Skip, pause or cancel anytime.
      </p>
    </div>
  );
}

function Stage({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="border-t border-[color:var(--border)] pt-6">
      <div className="eyebrow">Stage {n}</div>
      <h3 className="mt-2 font-display text-2xl">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[color:var(--muted-foreground)]">{body}</p>
    </div>
  );
}

/* ------------------------------ Page shell ------------------------------ */

export function ProductPage({ copy }: { copy: ProductCopy }) {
  const galleryAlt = GALLERY[0]!.alt;
  return (
    <>
      {/* A. Gallery + buy box */}
      <section className="container-x py-8 md:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Gallery />
            <span className="sr-only">{galleryAlt}</span>
          </div>
          <BuyBox copy={copy} />
        </div>
      </section>

      {/* B. Accordions */}
      <section className="border-t border-[color:var(--border)] bg-white">
        <div className="container-x max-w-3xl py-10">
          <Accordion title="Description">
            <p>{copy.description}</p>
          </Accordion>
          <Accordion title="What to expect">
            <p>
              Give it 6–8 weeks. Digestive comfort tends to show up first; the nutrient side builds
              quietly over a couple of months. Individual experience varies.
            </p>
          </Accordion>
          <Accordion title="Guarantee">
            <p>
              {GUARANTEE_DAYS}-day money-back guarantee. If you do not notice a difference, return your
              order and we refund you in full.
            </p>
          </Accordion>
          <Accordion title="Shipping">
            <p>
              Free US shipping. Orders placed before 2pm ET ship the same business day, otherwise within
              24 hours. Tracking arrives by email.
            </p>
          </Accordion>
        </div>
      </section>

      {/* C. Explanation block */}
      <section className="border-t border-[color:var(--border)] bg-white">
        <div className="container-x max-w-4xl py-14 md:py-20 space-y-16">
          <div>
            <div className="eyebrow">{copy.problemEyebrow}</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">{copy.problemTitle}</h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[color:var(--muted-foreground)]">
              {copy.problemBody}
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {copy.symptoms.map((s) => (
                <li key={s} className="flex gap-3 text-sm text-[color:var(--navy)]">
                  <Minus className="mt-1.5 h-3 w-3 shrink-0 text-[color:var(--gold)]" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow">The formula</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">{copy.formulaTitle}</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {copy.formulaCards.map((c) => (
                <div
                  key={c.h}
                  className="border border-[color:var(--border)] bg-[color:var(--ivory)] p-6"
                >
                  <h3 className="font-display text-2xl">{c.h}</h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--muted-foreground)]">{c.p}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <BenefitCircles />
            </div>
            <img
              src={GALLERY[2]!.url}
              alt={GALLERY[2]!.alt}
              loading="lazy"
              className="mt-8 w-full border border-[color:var(--border)]"
            />
          </div>

          <div>
            <div className="eyebrow">Over time</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">How it shows up.</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {copy.stages.map((s) => (
                <Stage key={s.n} n={s.n} title={s.title} body={s.body} />
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow">Timeline</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">What to expect.</h2>
            <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">
              Most people give it 6–8 weeks before judging it. Individual experience varies.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {copy.timeline.map((t) => (
                <div key={t.k} className="border-t border-[color:var(--gold)] pt-4">
                  <div className="caps-label text-[color:var(--navy)]">{t.k}</div>
                  <ul className="mt-3 space-y-2">
                    {t.items.map((i) => (
                      <li key={i} className="text-sm leading-6 text-[color:var(--muted-foreground)]">
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow">Comparison</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">{copy.comparisonTitle}</h2>
            <div className="mt-8 overflow-hidden border border-[color:var(--border)]">
              <div className="grid grid-cols-[1fr_auto_auto] bg-[color:var(--ivory)] text-[10px] uppercase tracking-[0.16em] text-[color:var(--taupe)]">
                <div className="px-4 py-3" />
                <div className="px-4 py-3 text-center">NOURISH</div>
                <div className="px-4 py-3 text-center">Typical</div>
              </div>
              {copy.comparison.map((label) => (
                <div
                  key={label}
                  className="grid grid-cols-[1fr_auto_auto] items-center border-t border-[color:var(--border)] bg-white"
                >
                  <div className="px-4 py-4 text-sm text-[color:var(--navy)]">{label}</div>
                  <div className="px-6 py-4 text-center text-[color:var(--navy)]">
                    <Check className="mx-auto h-4 w-4" strokeWidth={2} />
                  </div>
                  <div className="px-6 py-4 text-center text-[color:var(--taupe)]">—</div>
                </div>
              ))}
            </div>
            <img
              src={GALLERY[4]!.url}
              alt={GALLERY[4]!.alt}
              loading="lazy"
              className="mt-8 w-full border border-[color:var(--border)]"
            />
          </div>
        </div>
      </section>

      {/* D. Guarantee band */}
      <GuaranteeBand />

      {/* E. Reviews */}
      <Reviews full />

      {/* F. Final CTA */}
      <section className="container-x py-16 md:py-24 text-center">
        <h2 className="font-display text-3xl md:text-4xl">{copy.finalTitle}</h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[color:var(--muted-foreground)]">
          Free US shipping. Ships within 24 hours. {GUARANTEE_DAYS}-day money-back guarantee.
        </p>
        <a href="#buy" className="btn-primary mt-8">
          Choose your supply
        </a>
      </section>

      {/* G. FAQ — last section on the page */}
      <section className="border-t border-[color:var(--border)] bg-white">
        <div className="container-x max-w-3xl py-14 md:py-20">
          <div className="eyebrow">Questions</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">Frequently asked</h2>
          <div className="mt-8">
            {copy.faqs.map((f) => (
              <Accordion key={f.q} title={f.q}>
                <p>{f.a}</p>
              </Accordion>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/faq" className="btn-outline">
              Read all FAQs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
