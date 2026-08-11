import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, ChevronLeft, ChevronRight, Check, Minus } from "lucide-react";
import {
  TIERS,
  DEFAULT_TIER,
  tierById,
  type TierId,
  PRODUCT_TITLE,
  PRODUCT_SUBTITLE,
  GUARANTEE_DAYS,
} from "@/lib/product-config";
import { cart } from "@/lib/shopify-cart";
import { trackViewContent, trackAddToCart } from "@/lib/fb-pixel";
import { GALLERY } from "@/lib/gallery";
import { Reviews } from "@/components/site/Reviews";
import { GuaranteeBand } from "@/components/site/GuaranteeBand";
import { BenefitCircles } from "@/components/site/BenefitCircles";
import { TrustRow } from "@/components/site/TrustRow";

export const Route = createFileRoute("/nourish")({
  head: () => ({
    meta: [
      { title: "NOURISH™ Digestive Support + Daily Essentials — Seralie" },
      {
        name: "description",
        content:
          "One capsule that settles digestion and puts back the nutrients smaller portions leave behind. Magnesium, probiotic, ginger, B12, iron, zinc, D3 and folate.",
      },
      { property: "og:title", content: "NOURISH™ Digestive Support + Daily Essentials — Seralie" },
      {
        property: "og:description",
        content: "Digestive comfort and daily essentials in one capsule. 60-day money-back guarantee.",
      },
      { property: "og:type", content: "product" },
      { property: "og:image", content: `https://seralie.com${GALLERY[0]!.url}` },
      { name: "twitter:image", content: `https://seralie.com${GALLERY[0]!.url}` },
      { property: "og:url", content: "https://seralie.com/nourish" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://seralie.com/nourish" }],
  }),
  component: NourishPage,
});

const money = (n: number) => `$${n.toFixed(2)}`;

function Gallery() {
  const [i, setI] = useState(0);
  const img = GALLERY[i]!;
  return (
    <div>
      <div className="relative overflow-hidden border border-[color:var(--border)] bg-white">
        <img
          src={img.url}
          alt={img.alt}
          className="w-full aspect-square object-cover"
          loading="eager"
        />
        <button
          aria-label="Previous image"
          onClick={() => setI((v) => (v - 1 + GALLERY.length) % GALLERY.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[color:var(--navy)] border border-[color:var(--border)]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          aria-label="Next image"
          onClick={() => setI((v) => (v + 1) % GALLERY.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[color:var(--navy)] border border-[color:var(--border)]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
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

function BuyBox() {
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
      <div className="eyebrow">{PRODUCT_SUBTITLE}</div>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">{PRODUCT_TITLE}</h1>
      <p className="mt-4 text-[15px] leading-7 text-[color:var(--muted-foreground)]">
        One capsule that settles digestion and puts back the nutrients smaller portions leave behind.
      </p>

      <ul className="mt-6 space-y-2.5">
        {[
          "Magnesium supports regularity and digestive comfort",
          "LactoSpore® probiotic supports gut health",
          "Ginger, traditionally used for occasional nausea",
          "B12, iron, zinc, D3 and folate support everyday energy and nutrition",
        ].map((b) => (
          <li key={b} className="flex gap-3 text-sm leading-6 text-[color:var(--navy)]">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" strokeWidth={2} />
            {b}
          </li>
        ))}
      </ul>

      {/* Tier cards — per-bottle pricing only */}
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
                {perCompare && (
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

      <button onClick={addToCart} disabled={adding} className="btn-primary mt-6 w-full">
        {adding ? "Adding…" : `Add to cart — ${money(active)}`}
      </button>

      <p className="mt-3 text-center text-xs text-[color:var(--muted-foreground)]">
        Free US shipping over $50 · Ships within 24 hours · {GUARANTEE_DAYS}-day money-back guarantee
      </p>
      <p className="mt-2 text-center text-xs text-[color:var(--muted-foreground)]">
        Most people give it 6–8 weeks. That is how long it takes for nutrient levels and daily habits to
        settle in.
      </p>

      <div className="mt-6">
        <TrustRow />
      </div>

      {/* Purchase mode — single clickable switch to the other option */}
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

const TIMELINE = [
  {
    k: "Week 1–2",
    items: ["Many people find meals sit a little easier", "Digestion may feel less sluggish"],
  },
  {
    k: "Week 3–4",
    items: ["Regularity may become more predictable", "Some people notice steadier afternoons"],
  },
  {
    k: "Week 5–8",
    items: [
      "This is the window where most people say it clicks",
      "Everyday energy may feel more even as nutrient levels build",
    ],
  },
  {
    k: "Week 9–12+",
    items: ["Many people find the routine easy to keep", "Hair, skin and nail support builds slowly"],
  },
];

const COMPARISON = [
  { label: "Digestive enzymes and probiotic in one capsule", us: true },
  { label: "Chelated iron and zinc, gentler on the stomach", us: true },
  { label: "Eight nutrients printed with full doses", us: true },
  { label: "No proprietary-blend hiding of amounts", us: true },
  { label: "Third-party tested every batch", us: true },
  { label: "Made in a GMP-certified US facility", us: true },
];

function NourishPage() {
  const galleryAlt = useMemo(() => GALLERY[0]!.alt, []);
  return (
    <>
      {/* A. Gallery + buy box */}
      <section className="container-x py-8 md:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Gallery />
            <span className="sr-only">{galleryAlt}</span>
          </div>
          <BuyBox />
        </div>
      </section>

      {/* B. Accordions */}
      <section className="border-t border-[color:var(--border)] bg-white">
        <div className="container-x max-w-3xl py-10">
          <Accordion title="Description">
            <p>
              NOURISH™ is one daily capsule serving built for people eating smaller meals. It pairs a
              digestive comfort blend with the everyday nutrients that are easiest to fall short on when
              portions get smaller.
            </p>
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


      {/* D. FAQ */}
      <section className="container-x max-w-3xl py-14 md:py-20">
        <div className="eyebrow">Questions</div>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">Frequently asked</h2>
        <div className="mt-8">
          <Accordion title="How long before I notice anything?">
            <p>
              Plan on 6–8 weeks. Digestive comfort is usually the first thing people mention. The
              nutrient side is slower and quieter by nature.
            </p>
          </Accordion>
          <Accordion title="When should I take it?">
            <p>Two capsules once daily, in the morning, with food and a full glass of water.</p>
          </Accordion>
          <Accordion title="Will it upset my stomach?">
            <p>
              The iron and zinc are chelated forms, which are generally gentler than the oxide forms used
              in cheaper multivitamins. Taking it with food helps.
            </p>
          </Accordion>
          <Accordion title="Can I pause or cancel a subscription?">
            <p>Yes. Skip, pause or cancel anytime from your account or by emailing support.</p>
          </Accordion>
          <Accordion title="What if it is not for me?">
            <p>{GUARANTEE_DAYS}-day money-back guarantee, no questions asked.</p>
          </Accordion>
        </div>
        <div className="mt-8">
          <Link to="/faq" className="btn-outline">
            Read all FAQs
          </Link>
        </div>
      </section>

      {/* E. Explanation block */}
      <section className="border-t border-[color:var(--border)] bg-white">
        <div className="container-x max-w-4xl py-14 md:py-20 space-y-16">
          {/* E1 */}
          <div>
            <div className="eyebrow">The real problem</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">This isn't a willpower problem.</h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[color:var(--muted-foreground)]">
              When you eat less, digestion slows down with it. Less food moving through means less to work
              with — and the nutrients you used to get from bigger meals quietly drop off too.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {[
                "Bloating after meals",
                "Sluggish digestion",
                "Low energy in the afternoon",
                "Thinning hair",
                "Feeling older than you are",
              ].map((s) => (
                <li key={s} className="flex gap-3 text-sm text-[color:var(--navy)]">
                  <Minus className="mt-1.5 h-3 w-3 shrink-0 text-[color:var(--gold)]" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* E2 */}
          <div>
            <div className="eyebrow">The formula</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">Two jobs, one capsule.</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="border border-[color:var(--border)] bg-[color:var(--ivory)] p-6">
                <h3 className="font-display text-2xl">Settles digestion</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted-foreground)]">
                  Magnesium supports regularity and digestive comfort. A LactoSpore® probiotic supports gut
                  health. Ginger has been used traditionally for occasional nausea.
                </p>
              </div>
              <div className="border border-[color:var(--border)] bg-[color:var(--ivory)] p-6">
                <h3 className="font-display text-2xl">Covers the gaps</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted-foreground)]">
                  B12, iron, zinc, D3 and folate support everyday energy and nutrition — the nutrients most
                  likely to slip when portions get smaller.
                </p>
              </div>
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

          {/* E3 */}
          <div>
            <div className="eyebrow">Over time</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">How it shows up.</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              <Stage
                n="1"
                title="Slower digestion"
                body="Meals sit heavier. Things move less predictably than they used to."
              />
              <Stage
                n="2"
                title="Running on less"
                body="Smaller portions mean fewer nutrients coming in day to day."
              />
              <Stage
                n="3"
                title="It starts to show"
                body="Energy, hair and everyday resilience are usually the first places people notice."
              />
            </div>
          </div>

          {/* E4 */}
          <div>
            <div className="eyebrow">Timeline</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">What to expect.</h2>
            <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">
              Most people give it 6–8 weeks before judging it. Individual experience varies.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {TIMELINE.map((t) => (
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

          {/* E5 */}
          <div>
            <div className="eyebrow">Comparison</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">Why NOURISH.</h2>
            <div className="mt-8 overflow-hidden border border-[color:var(--border)]">
              <div className="grid grid-cols-[1fr_auto_auto] bg-[color:var(--ivory)] text-[10px] uppercase tracking-[0.16em] text-[color:var(--taupe)]">
                <div className="px-4 py-3" />
                <div className="px-4 py-3 text-center">NOURISH</div>
                <div className="px-4 py-3 text-center">Typical</div>
              </div>
              {COMPARISON.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[1fr_auto_auto] items-center border-t border-[color:var(--border)] bg-white"
                >
                  <div className="px-4 py-4 text-sm text-[color:var(--navy)]">{row.label}</div>
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

      {/* F. Guarantee band */}
      <GuaranteeBand />

      {/* G. Reviews (full) */}
      <Reviews full />

      {/* H. Final CTA */}
      <section className="container-x py-16 md:py-24 text-center">
        <h2 className="font-display text-3xl md:text-4xl">Start with one capsule a day.</h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[color:var(--muted-foreground)]">
          Free US shipping. Ships within 24 hours. {GUARANTEE_DAYS}-day money-back guarantee.
        </p>
        <a href="#buy" className="btn-primary mt-8">
          Choose your supply
        </a>
      </section>
    </>
  );
}
