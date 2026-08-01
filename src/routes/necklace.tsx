import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Check, Loader2, Upload, X, ChevronDown } from "lucide-react";
import { PhotoSlot } from "@/components/site/PhotoSlot";
import { FINISHES, TIERS, PRODUCT_TITLE, type FinishId, type TierId } from "@/lib/product-config";
import { cart, fetchVariantPrices } from "@/lib/shopify-cart";
import { uploadPhoto, validatePhoto } from "@/lib/photo-upload";

export const Route = createFileRoute("/necklace")({
  head: () => ({
    meta: [
      { title: "Pet Memorial Photo Necklace — Seralie" },
      {
        name: "description",
        content:
          "A hand-finished photo pendant engraved with your pet's portrait. Upload a photo, approve a digital proof, and we engrave. Gold, silver, or rose gold.",
      },
      { property: "og:title", content: "Pet Memorial Photo Necklace — Seralie" },
      {
        property: "og:description",
        content: "Upload a photo, approve your digital proof, and we engrave. Made to order in gold, silver, or rose gold.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NecklacePage,
});

type Slot = { file: File | null; url: string | null; name: string; error: string | null; uploading: boolean };
const emptySlot = (): Slot => ({ file: null, url: null, name: "", error: null, uploading: false });

/** How many pieces are actually paid for in each set. */
const PAID_PIECES: Record<TierId, number> = { one: 1, three: 2, six: 3 };

function BonusRow({ label, value }: { label: string; value?: number | null }) {
  return (
    <li className="flex items-center justify-between gap-3 text-[13px]">
      <span className="flex items-center gap-2.5 text-[color:var(--charcoal)]">
        <Check className="h-3.5 w-3.5 shrink-0 text-[color:var(--gold)]" />
        {label}
      </span>
      <span className="flex shrink-0 items-center gap-2">
        {typeof value === "number" && value > 0 && (
          <span className="tabular-nums text-[color:var(--muted-foreground)] line-through">
            ${value.toFixed(2)}
          </span>
        )}
        <span className="caps-label text-[9px] text-[color:var(--gold)]">Free</span>
      </span>
    </li>
  );
}

const GALLERY = [
  { src: g1.url, alt: "Gold pendant engraved with a golden retriever portrait and the name Bailey" },
  { src: g2.url, alt: "The pendant in gold, silver, and rose gold finishes" },
  { src: g3.url, alt: "Engraved gold pendant beside the original photo of a golden retriever" },
  { src: g4.url, alt: "Woman wearing the engraved pendant with the name Willow" },
  { src: g5.url, alt: "Engraved pendant held between two fingers" },
  { src: g6.url, alt: "Engraved pendant on a wooden dresser beside a framed dog portrait" },
];

function Gallery() {
  const [i, setI] = useState(0);
  return (
    <div>
      <PhotoSlot label="Necklace" ratio="1/1" src={GALLERY[i]!.src} alt={GALLERY[i]!.alt} />
      <div className="mt-3 grid grid-cols-6 gap-2">
        {GALLERY.map((g, idx) => (
          <button
            key={g.src}
            type="button"
            onClick={() => setI(idx)}
            aria-label={`View image ${idx + 1}`}
            className={`overflow-hidden rounded-xl border p-1 transition ${
              idx === i
                ? "border-[color:var(--gold)]"
                : "border-[color:var(--sand-deep)]/60 hover:border-[color:var(--sand-deep)]"
            }`}
          >
            <img
              src={g.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="aspect-square w-full rounded-lg object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/** Horizontal, snap-scrolling testimonial track. Next card peeks at the edge. */
function ReviewCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.6), behavior: "smooth" });
  }

  return (
    <div className="relative mt-10">
      <div
        ref={trackRef}
        className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0"
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <figure
            key={n}
            className="w-[78%] shrink-0 snap-start rounded-2xl border border-[color:var(--border)] bg-[color:var(--bone)] p-6 sm:w-[52%] lg:w-[31%]"
          >
            <PhotoSlot label={`Customer photo ${n}`} ratio="1/1" />
            <blockquote className="mt-5 min-h-16 text-sm leading-7 text-[color:var(--muted-foreground)]">
              <span className="opacity-50">Customer review — add real copy here.</span>
            </blockquote>
            <figcaption className="mt-3 caps-label text-[color:var(--muted-foreground)]">Name, City</figcaption>
          </figure>
        ))}
        <div className="w-2 shrink-0 md:hidden" aria-hidden />
      </div>

      <div className="mt-6 hidden justify-end gap-3 md:flex">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Previous reviews"
          className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--border)] transition hover:border-[color:var(--gold)]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Next reviews"
          className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--border)] transition hover:border-[color:var(--gold)]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}


function NecklacePage() {
  const [tierId, setTierId] = useState<TierId>("three");
  const [finish, setFinish] = useState<FinishId>("gold");
  const [slots, setSlots] = useState<Slot[]>(() => Array.from({ length: 6 }, emptySlot));
  const [prices, setPrices] = useState<Record<string, { amount: number; currencyCode: string }>>({});
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [attempted, setAttempted] = useState(false);

  const tier = useMemo(() => TIERS.find((t) => t.id === tierId)!, [tierId]);
  const variantId = tier.variants[finish];
  const price = prices[variantId]?.amount ?? null;

  useEffect(() => {
    const ids = TIERS.flatMap((t) => Object.values(t.variants));
    fetchVariantPrices(ids)
      .then(setPrices)
      .catch(() => setPrices({}));
  }, []);

  const active = slots.slice(0, tier.pieces);
  const complete = active.every((s) => s.url && s.name.trim().length > 0);

  function updateSlot(i: number, patch: Partial<Slot>) {
    setSlots((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }

  async function onFile(i: number, file: File | undefined) {
    if (!file) return;
    const err = validatePhoto(file);
    if (err) {
      updateSlot(i, { error: err, file: null, url: null });
      return;
    }
    updateSlot(i, { file, error: null, uploading: true, url: null });
    try {
      const url = await uploadPhoto(file);
      updateSlot(i, { url, uploading: false });
    } catch (e) {
      updateSlot(i, {
        uploading: false,
        error: e instanceof Error ? e.message : "Upload failed. Please try again.",
      });
    }
  }

  async function addToCart() {
    setAttempted(true);
    setAddError(null);
    if (!complete) return;
    setAdding(true);
    try {
      const attributes = active.flatMap((s, i) => [
        { key: `_photo_${i + 1}_url`, value: s.url! },
        { key: `_name_${i + 1}`, value: s.name.trim() },
      ]);
      attributes.push({ key: "_finish", value: FINISHES.find((f) => f.id === finish)!.label });
      await cart.addConfigured({ variantId, attributes });
    } catch (e) {
      setAddError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="bg-[color:var(--bone)]">
      <section className="container-x pt-8 pb-16 md:pt-14 md:pb-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* 1. Gallery */}
          <Gallery />

          <div>
            {/* 2. Title */}
            <h1 className="font-display text-4xl md:text-5xl leading-tight">{PRODUCT_TITLE}</h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-[color:var(--muted-foreground)]">
              Their portrait, engraved by hand-finished laser onto a solid pendant. You approve a digital proof
              before we touch the metal.
            </p>
            <p className="mt-5 font-display text-2xl tabular-nums">
              {price !== null ? `$${price.toFixed(2)}` : <span className="opacity-40">—</span>}
            </p>

            {/* 3. Offer selector */}
            <div className="mt-8">
              <div className="eyebrow">Choose your set</div>
              <div className="mt-4 space-y-3">
                {TIERS.map((t) => {
                  const tPrice = prices[t.variants[finish]]?.amount ?? null;
                  const selected = t.id === tierId;
                  const perPiece = tPrice !== null ? tPrice / t.pieces : null;
                  const freePieces = t.pieces - PAID_PIECES[t.id];
                  const bonusValue =
                    t.extras.reduce((sum, e) => sum + e.value, 0) +
                    (t.shipping === null ? 2.99 : 0) +
                    (freePieces > 0 && perPiece !== null ? freePieces * (tPrice! / PAID_PIECES[t.id]) : 0);
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTierId(t.id)}
                      className={`relative w-full text-left border p-5 transition-all ${
                        selected
                          ? "border-[color:var(--charcoal)] bg-white shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)]"
                          : "border-[color:var(--border)] bg-transparent hover:border-[color:var(--sand-deep)]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-display text-xl">{t.label}</span>
                            {t.badge && (
                              <span className="caps-label text-[9px] px-2 py-1 bg-[color:var(--gold)]/15 text-[color:var(--gold)] border border-[color:var(--gold)]/30">
                                {t.badge}
                              </span>
                            )}
                          </div>
                          <div className="mt-1 text-xs text-[color:var(--muted-foreground)]">
                            {t.pieces} {t.pieces === 1 ? "necklace" : "necklaces"}
                            {perPiece !== null && ` · $${perPiece.toFixed(2)} each`}
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          <div className="font-display text-xl tabular-nums">
                            {tPrice !== null ? `$${tPrice.toFixed(2)}` : "—"}
                          </div>
                          {bonusValue > 0 && (
                            <div className="mt-1 caps-label text-[9px] text-[color:var(--gold)]">
                              +${Math.round(bonusValue)} free
                            </div>
                          )}
                        </div>
                      </div>
                      {selected && (
                        <div className="mt-4 border-t border-[color:var(--border)] pt-4">
                          <ul className="space-y-2">
                            {t.includes.map((line) => (
                              <li
                                key={line}
                                className="flex gap-2.5 text-[13px] text-[color:var(--muted-foreground)]"
                              >
                                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[color:var(--gold)]" />
                                {line}
                              </li>
                            ))}
                          </ul>

                          <div className="mt-4 border border-[color:var(--gold)]/25 bg-[color:var(--gold)]/[0.06] p-4">
                            <div className="caps-label text-[9px] text-[color:var(--gold)]">
                              Included free with this set
                            </div>
                            <ul className="mt-3 space-y-2.5">
                              {freePieces > 0 && (
                                <BonusRow
                                  label={`${freePieces} free ${freePieces === 1 ? "necklace" : "necklaces"}`}
                                  value={tPrice !== null ? freePieces * (tPrice / PAID_PIECES[t.id]) : null}
                                />
                              )}


                              {t.extras.map((e) => (
                                <BonusRow key={e.label} label={e.label} value={e.value} />
                              ))}
                              {t.shipping === null ? (
                                <BonusRow label="Shipping" value={2.99} />
                              ) : (
                                <li className="flex items-center justify-between gap-3 text-[13px]">
                                  <span className="text-[color:var(--muted-foreground)]">Shipping</span>
                                  <span className="tabular-nums text-[color:var(--muted-foreground)]">
                                    ${t.shipping.toFixed(2)}
                                  </span>
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}

              </div>

              <div className="mt-7">
                <div className="eyebrow">Finish</div>
                <div className="mt-3 flex flex-wrap gap-3">
                  {FINISHES.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFinish(f.id)}
                      className={`flex items-center gap-2.5 border px-4 py-2.5 text-xs transition-colors ${
                        finish === f.id
                          ? "border-[color:var(--charcoal)] bg-white"
                          : "border-[color:var(--border)] hover:border-[color:var(--sand-deep)]"
                      }`}
                    >
                      <span className="h-3.5 w-3.5 rounded-full" style={{ background: f.swatch }} />
                      {f.label}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-xs text-[color:var(--muted-foreground)]">
                  {FINISHES.find((f) => f.id === finish)!.detail} · nickel-free, water-resistant, won't tarnish
                  with everyday wear.
                </p>
              </div>

            </div>

            {/* 4. Photo + engraving slots */}
            <div className="mt-10">
              <div className="eyebrow">Your {tier.pieces === 1 ? "necklace" : "necklaces"}</div>
              <p className="mt-2 text-xs text-[color:var(--muted-foreground)]">
                A clear, well-lit photo works best. JPG, PNG or HEIC, up to 10MB.
              </p>
              <div className="mt-5 space-y-4">
                {active.map((s, i) => (
                  <div key={i} className="border border-[color:var(--border)] bg-white p-4">
                    <div className="caps-label text-[color:var(--muted-foreground)]">Necklace {i + 1}</div>
                    <div className="mt-3 flex gap-4">
                      <label className="relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden border border-dashed border-[color:var(--sand-deep)] bg-[color:var(--sand)]/50 flex items-center justify-center">
                        {s.uploading ? (
                          <Loader2 className="h-4 w-4 animate-spin text-[color:var(--muted-foreground)]" />
                        ) : s.url ? (
                          <img src={s.url} alt={`Necklace ${i + 1} photo`} className="h-full w-full object-cover" />
                        ) : (
                          <Upload className="h-4 w-4 text-[color:var(--muted-foreground)]" />
                        )}
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/heic,image/heif,.heic,.heif"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={(e) => onFile(i, e.target.files?.[0])}
                        />
                      </label>
                      <div className="flex-1 min-w-0">
                        <input
                          value={s.name}
                          maxLength={15}
                          onChange={(e) => updateSlot(i, { name: e.target.value })}
                          placeholder="Name for the front"
                          className="w-full border border-[color:var(--border)] bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[color:var(--charcoal)]"
                        />
                        <div className="mt-1.5 flex items-center justify-between">
                          <span className="text-[11px] text-[color:var(--muted-foreground)]">Max 15 characters</span>
                          {s.url && (
                            <button
                              onClick={() => updateSlot(i, { url: null, file: null })}
                              className="flex items-center gap-1 text-[11px] text-[color:var(--muted-foreground)] hover:text-[color:var(--charcoal)]"
                            >
                              <X className="h-3 w-3" /> Replace photo
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    {s.error && <p className="mt-3 text-xs text-[color:var(--destructive)]">{s.error}</p>}
                    {attempted && !s.error && (!s.url || !s.name.trim()) && (
                      <p className="mt-3 text-xs text-[color:var(--destructive)]">
                        {!s.url && !s.name.trim()
                          ? "Add a photo and a name for this necklace."
                          : !s.url
                            ? "Add a photo for this necklace."
                            : "Add a name for this necklace."}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Add to cart */}
            <button onClick={addToCart} disabled={adding} className="btn-primary mt-8 w-full gap-2">
              {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to bag"}
            </button>
            {!complete && (
              <p className="mt-3 text-center text-[11px] text-[color:var(--muted-foreground)]">
                Add a photo and a name for each necklace to continue.
              </p>
            )}
            {addError && <p className="mt-3 text-center text-xs text-[color:var(--destructive)]">{addError}</p>}
            <p className="mt-4 text-center text-[11px] text-[color:var(--muted-foreground)]">
              Digital proof before we engrave · 30-day guarantee
            </p>
          </div>
        </div>
      </section>

      {/* 6. Social proof — real components, no invented reviews */}
      <section className="border-y border-[color:var(--border)] bg-white">
        <div className="container-x py-16 md:py-20">
          <div className="text-center">
            <div className="eyebrow">In their words</div>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">From customers</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <figure key={i} className="border border-[color:var(--border)] p-6">
                <PhotoSlot label={`Customer photo ${i}`} ratio="1/1" />
                <blockquote className="mt-5 min-h-16 text-sm leading-7 text-[color:var(--muted-foreground)]">
                  <span className="opacity-50">Customer review — add real copy here.</span>
                </blockquote>
                <figcaption className="mt-3 caps-label text-[color:var(--muted-foreground)]">Name, City</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Everything else */}
      <section className="container-x py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="eyebrow">How it works</div>
            <ol className="mt-5 space-y-4 text-sm leading-7 text-[color:var(--muted-foreground)]">
              <li>1. Upload a photo of them.</li>
              <li>2. We send a digital proof within 48 hours.</li>
              <li>3. You approve, then we engrave and ship.</li>
            </ol>
          </div>
          <div>
            <div className="eyebrow">Materials</div>
            <p className="mt-5 text-sm leading-7 text-[color:var(--muted-foreground)]">
              Stainless steel core with a gold, silver, or rose gold finish. Hypoallergenic and water-resistant.
              Pendant 25mm, chain 45cm with a 5cm extender.
            </p>
          </div>
          <div>
            <div className="eyebrow">Shipping &amp; guarantee</div>
            <p className="mt-5 text-sm leading-7 text-[color:var(--muted-foreground)]">
              Made to order. Proof in 48 hours, then 5–9 business days to arrive. Free shipping on orders
              over $80, $2.99 below that. If it isn't right, we remake it or refund you within 30 days.

            </p>
          </div>
        </div>

        <div className="mt-16 max-w-3xl">
          <div className="eyebrow">Questions</div>
          <div className="mt-5 divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
            {FAQS.map((f) => (
              <Faq key={f.q} {...f} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const FAQS = [
  {
    q: "What if the engraving doesn't look right?",
    a: "You see a digital proof of the exact engraving before we make anything. Nothing is engraved until you say yes, and you can ask for changes as many times as you need.",
  },
  {
    q: "What kind of photo works best?",
    a: "A clear, well-lit photo where their face fills most of the frame. Phone photos are perfect. If yours won't engrave well, we'll tell you before we start and help you pick another.",
  },
  {
    q: "How long does it take?",
    a: "Your proof arrives within 48 hours. Once approved, engraving and delivery take 5–9 business days.",
  },
  {
    q: "Can I use a photo of a person?",
    a: "Yes. The same process works for any portrait you'd like engraved.",
  },
  {
    q: "What if something arrives wrong?",
    a: "Email support@seralie.com with your order number. We remake it or refund you within 30 days — no argument.",
  },
];

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-lg">{q}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pb-5 text-sm leading-7 text-[color:var(--muted-foreground)]">{a}</p>}
    </div>
  );
}
