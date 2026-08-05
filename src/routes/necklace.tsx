import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Loader2, Upload, X, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { PhotoSlot } from "@/components/site/PhotoSlot";
import g1 from "@/assets/pdp-1-bailey.png.asset.json";
import g1s from "@/assets/pdp-1-bailey-silver.png.asset.json";
import g1r from "@/assets/pdp-1-bailey-rose.png.asset.json";
import { supabase } from "@/integrations/supabase/client";
import g2 from "@/assets/pdp-2-three-finishes.webp.asset.json";
import g3 from "@/assets/pdp-3-photo-compare.webp.asset.json";
import g4 from "@/assets/pdp-4-worn-willow.webp.asset.json";
import g5 from "@/assets/pdp-5-in-hand.webp.asset.json";
import g6 from "@/assets/pdp-6-milo-desk.webp.asset.json";
import { FINISHES, TIERS, PRODUCT_TITLE, type FinishId, type TierId } from "@/lib/product-config";
import { cart, fetchVariantPrices, useCart } from "@/lib/shopify-cart";
import { trackViewContent, trackAddToCart } from "@/lib/fb-pixel";
import { uploadPhoto, validatePhoto } from "@/lib/photo-upload";
import hiw1Asset from "@/assets/hiw-1-upload.png.asset.json";
import hiw2 from "@/assets/hiw-2-illustrate.jpg";
import hiw3Asset from "@/assets/hiw-3-craft.png.asset.json";

const hiw1 = hiw1Asset.url;
const hiw3 = hiw3Asset.url;

const HOW_IT_WORKS: { img: string; title: string; body: string }[] = [
  {
    img: hiw1,
    title: "Upload your photo",
    body: "Any clear phone photo works. Add a name for the engraving on the back.",
  },
  {
    img: hiw2,
    title: "We draw the portrait",
    body: "Their portrait is engraved by hand-finished laser onto a solid pendant. You approve a digital proof before we touch the metal.",
  },
  {
    img: hiw3,
    title: "We engrave and ship",
    body: "Once you approve the proof, we engrave your piece and ship it in 5–9 business days.",
  },
];

export const Route = createFileRoute("/necklace")({
  head: () => ({
    meta: [
      { title: "Custom Pet Portrait Necklace — Seralie" },
      {
        name: "description",
        content:
          "A hand-finished photo pendant engraved with your pet's portrait. Upload a photo, approve a digital proof, and we engrave. Gold, silver, or rose gold.",
      },
      { property: "og:title", content: "Custom Pet Portrait Necklace — Seralie" },
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

type Slot = { file: File | null; url: string | null; name: string; error: string | null; uploading: boolean; finish: FinishId | null };
const emptySlot = (): Slot => ({ file: null, url: null, name: "", error: null, uploading: false, finish: null });

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

/** Hero shot swaps to match the selected finish — same gallery slot, no extra thumbnails. */
const HERO_BY_FINISH: Record<FinishId, { src: string; alt: string }> = {
  gold: { src: g1.url, alt: "Gold pendant engraved with a golden retriever portrait and the name Bailey" },
  silver: { src: g1s.url, alt: "Silver pendant engraved with a golden retriever portrait and the name Bailey" },
  "rose-gold": {
    src: g1r.url,
    alt: "Rose gold pendant engraved with a golden retriever portrait and the name Bailey",
  },
};

const GALLERY = [
  HERO_BY_FINISH.gold,
  { src: g2.url, alt: "The pendant in gold, silver, and rose gold finishes" },
  { src: g3.url, alt: "Engraved gold pendant beside the original photo of a golden retriever" },
  { src: g4.url, alt: "Woman wearing the engraved pendant with the name Willow" },
  { src: g5.url, alt: "Engraved pendant held between two fingers" },
  { src: g6.url, alt: "Engraved pendant on a wooden dresser beside a framed dog portrait" },
];

function Gallery({ finish }: { finish: FinishId }) {
  const [i, setI] = useState(0);
  const images = useMemo(() => {
    const list = [...GALLERY];
    list[0] = HERO_BY_FINISH[finish];
    return list;
  }, [finish]);

  const go = (dir: 1 | -1) => setI((p) => (p + dir + images.length) % images.length);

  return (
    <div>
      <div className="relative">
        <PhotoSlot label="Necklace" ratio="1/1" src={images[i]!.src} alt={images[i]!.alt} />
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[color:var(--sand-deep)]/60 bg-[color:var(--bone)]/90 shadow-sm backdrop-blur transition hover:border-[color:var(--gold)]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[color:var(--sand-deep)]/60 bg-[color:var(--bone)]/90 shadow-sm backdrop-blur transition hover:border-[color:var(--gold)]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-6 gap-2">
        {images.map((g, idx) => (
          <button
            key={idx}
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

type Review = {
  id: string;
  name: string;
  city: string | null;
  body: string;
  rating: number;
  image_url: string | null;
  created_at: string;
};

function Stars({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span className={`text-[color:var(--gold)] ${className}`} aria-label={`${n} out of 5 stars`}>
      {"★★★★★".slice(0, n)}
      <span className="text-[color:var(--sand-deep)]">{"★★★★★".slice(0, 5 - n)}</span>
    </span>
  );
}

/** Horizontal, snap-scrolling testimonial track. Neighbouring cards peek on both sides. */
function ReviewCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [open, setOpen] = useState(false);

  async function load() {
    const { data } = await supabase
      .from("product_reviews")
      .select("id,name,city,body,rating,image_url,created_at")
      .eq("product_id", "necklace")
      .order("image_url", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(80);
    if (data) setReviews(data as Review[]);
  }


  useEffect(() => {
    load();
  }, []);

  function scrollBy(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.6), behavior: "smooth" });
  }

  return (
    <div className="relative mt-8">
      {reviews.length === 0 ? (
        <p className="text-sm text-[color:var(--muted-foreground)]">
          No reviews yet — be the first to share yours.
        </p>
      ) : (
        <div className="relative">
          <div
            ref={trackRef}
            className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-10 pb-2 [scrollbar-width:none] md:mx-0 md:gap-5 md:px-12 [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((r) => (
              <figure
                key={r.id}
                className="flex w-[78%] shrink-0 snap-center flex-col rounded-2xl border border-[color:var(--border)] bg-[color:var(--bone)] p-4 sm:w-[46%] lg:w-[30%]"
              >
                {r.image_url && (
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={r.image_url}
                      alt=""
                      loading="lazy"
                      className="h-40 w-full object-cover md:h-48"
                    />
                  </div>
                )}
                <Stars n={r.rating} className={r.image_url ? "mt-3 block text-sm" : "block text-sm"} />
                <blockquote className="mt-2 line-clamp-4 text-sm leading-6 text-[color:var(--muted-foreground)]">
                  {r.body}
                </blockquote>
                <figcaption className="mt-3 caps-label text-[color:var(--muted-foreground)]">
                  {r.name}
                  {r.city ? `, ${r.city}` : ""}
                </figcaption>
              </figure>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous reviews"
            className="absolute left-0 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-[color:var(--border)] bg-white/90 shadow-sm backdrop-blur transition hover:border-[color:var(--gold)] md:h-11 md:w-11"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next reviews"
            className="absolute right-0 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-[color:var(--border)] bg-white/90 shadow-sm backdrop-blur transition hover:border-[color:var(--gold)] md:h-11 md:w-11"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="mt-7 flex flex-col items-center gap-3">
        <a
          href="#buy"
          className="w-full rounded-full bg-[color:var(--charcoal)] px-8 py-4 text-center caps-label text-[color:var(--bone)] transition hover:opacity-90 sm:w-auto"
        >
          Create yours
        </a>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="caps-label text-[color:var(--muted-foreground)] underline underline-offset-4 transition hover:text-[color:var(--gold)]"
        >
          Write a review
        </button>
      </div>


      {open && (
        <ReviewForm
          onClose={() => setOpen(false)}
          onSaved={() => {
            setOpen(false);
            load();
          }}
        />
      )}
    </div>
  );
}

function ReviewForm({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(5);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError("Please add your name.");
    if (body.trim().length < 10) return setError("Please write a little more about your piece.");
    setBusy(true);
    try {
      let imageUrl: string | null = null;
      if (file) {
        const v = validatePhoto(file);
        if (v) throw new Error(v);
        imageUrl = await uploadPhoto(file);
      }
      const { error: err } = await supabase.from("product_reviews").insert({
        product_id: "necklace",
        name: name.trim().slice(0, 60),
        city: city.trim().slice(0, 60) || null,
        body: body.trim().slice(0, 1000),
        title: "",
        rating,
        image_url: imageUrl,
      });
      if (err) throw new Error(err.message);
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
      <form
        onSubmit={submit}
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-[color:var(--bone)] p-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl">Write a review</h3>
          <button type="button" onClick={onClose} aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-sm">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                aria-label={`${n} star`}
                className={n <= rating ? "text-[color:var(--gold)]" : "text-[color:var(--sand-deep)]"}
              >
                ★
              </button>
            ))}
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={60}
            className="w-full rounded-xl border border-[color:var(--border)] bg-transparent px-4 py-3"
          />
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City (optional)"
            maxLength={60}
            className="w-full rounded-xl border border-[color:var(--border)] bg-transparent px-4 py-3"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Tell us about your piece"
            rows={4}
            maxLength={1000}
            className="w-full rounded-xl border border-[color:var(--border)] bg-transparent px-4 py-3"
          />
          <label className="flex cursor-pointer items-center gap-2 caps-label text-[color:var(--muted-foreground)]">
            <Upload className="h-4 w-4" />
            {file ? file.name : "Add a photo (optional)"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={busy}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--charcoal)] px-6 py-3.5 caps-label text-[color:var(--bone)] disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Submit review
        </button>
      </form>
    </div>
  );
}



function labelFor(id: FinishId) {
  return FINISHES.find((f) => f.id === id)!.label;
}

function NecklacePage() {
  const [tierId, setTierId] = useState<TierId>("one");
  const [finish, setFinish] = useState<FinishId>("gold");
  const [slots, setSlots] = useState<Slot[]>(() => Array.from({ length: 6 }, emptySlot));
  const [prices, setPrices] = useState<Record<string, { amount: number; currencyCode: string }>>({});
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [attempted, setAttempted] = useState(false);

  const tier = useMemo(() => TIERS.find((t) => t.id === tierId)!, [tierId]);
  const variantId = tier.variantId;
  const [openFinishFor, setOpenFinishFor] = useState<number | null>(null);

  useEffect(() => {
    const ids = TIERS.map((t) => t.variantId);
    fetchVariantPrices(ids)
      .then(setPrices)
      .catch(() => setPrices({}));
  }, []);

  const active = slots.slice(0, tier.pieces);
  const complete = active.every((s) => s.url && s.name.trim().length > 0);

  const finishOf = (s: Slot) => (tier.pieces === 1 ? finish : (s.finish ?? finish));

  const finishCounts = active.reduce<Record<string, number>>((acc, s) => {
    const label = labelFor(finishOf(s));
    acc[label] = (acc[label] ?? 0) + 1;
    return acc;
  }, {});
  const fulfillmentSummary = Object.entries(finishCounts)
    .map(([label, n]) => `${n}\u00d7 ${label}`)
    .join(", ");
  const mixedFinishes = tier.pieces > 1 && active.some((s) => s.finish && s.finish !== finish);

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
        { key: `_necklace_${i + 1}_photo`, value: s.url! },
        { key: `_necklace_${i + 1}_name`, value: s.name.trim() },
        { key: `_necklace_${i + 1}_finish`, value: labelFor(finishOf(s)) },
      ]);
      attributes.push({ key: "Fulfillment", value: fulfillmentSummary });
      await cart.addConfigured({ variantId, attributes });
    } catch (e) {
      setAddError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="bg-[color:var(--bone)]">
      <section id="buy" className="container-x scroll-mt-24 pt-8 pb-16 md:pt-14 md:pb-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* 1. Gallery */}
          <Gallery finish={finish} />

          <div>
            {/* 2. Title */}
            <h1 className="font-display text-4xl md:text-5xl leading-tight">{PRODUCT_TITLE}</h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-[color:var(--muted-foreground)]">
              Their portrait, engraved by hand-finished laser onto a solid pendant. You approve a digital proof
              before we touch the metal.
            </p>

            {/* 3. Offer selector */}
            <div className="mt-8">
              <div className="eyebrow">Choose your set</div>
              <div className="mt-4 space-y-3">
                {TIERS.map((t) => {
                  const tPrice = prices[t.variantId]?.amount ?? null;
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
                <div className="eyebrow">
                  {tier.pieces === 1 ? "Finish" : "Preview finish — choose each necklace below"}
                </div>
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
                    {tier.pieces > 1 && (
                      <div className="mt-3">
                        <div className="flex items-center gap-2 text-[11px] text-[color:var(--muted-foreground)]">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{ background: FINISHES.find((f) => f.id === (s.finish ?? finish))!.swatch }}
                          />
                          <span>Finish: {labelFor(s.finish ?? finish)}</span>
                          <span aria-hidden>·</span>
                          <button
                            type="button"
                            onClick={() => setOpenFinishFor(openFinishFor === i ? null : i)}
                            className="underline underline-offset-2 hover:text-[color:var(--charcoal)]"
                          >
                            Change
                          </button>
                        </div>
                        {openFinishFor === i && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {FINISHES.map((f) => {
                              const activeFinish = (s.finish ?? finish) === f.id;
                              return (
                                <button
                                  key={f.id}
                                  type="button"
                                  onClick={() => {
                                    updateSlot(i, { finish: f.id });
                                    setOpenFinishFor(null);
                                  }}
                                  className={`flex items-center gap-2 border px-3 py-2 text-[11px] transition-colors ${
                                    activeFinish
                                      ? "border-[color:var(--charcoal)] bg-white"
                                      : "border-[color:var(--border)] hover:border-[color:var(--sand-deep)]"
                                  }`}
                                >
                                  <span className="h-3 w-3 rounded-full" style={{ background: f.swatch }} />
                                  {f.label}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
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
                          maxLength={10}
                          onChange={(e) => updateSlot(i, { name: e.target.value })}
                          placeholder="Name for the front"
                          className="w-full border border-[color:var(--border)] bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[color:var(--charcoal)]"
                        />
                        <div className="mt-1.5 flex items-center justify-between">
                          <span className="text-[11px] text-[color:var(--muted-foreground)]">Max 10 characters</span>
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
            {mixedFinishes && (
              <p className="mt-8 text-center text-xs text-[color:var(--charcoal)]">
                Your order: {fulfillmentSummary}
              </p>
            )}
            <button onClick={addToCart} disabled={adding} className="btn-primary mt-4 w-full gap-2">
              {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to bag"}
            </button>
            {!complete && (
              <p className="mt-3 text-center text-[11px] text-[color:var(--muted-foreground)]">
                Add a photo and a name for each necklace to continue.
              </p>
            )}
            {addError && <p className="mt-3 text-center text-xs text-[color:var(--destructive)]">{addError}</p>}
            <p className="mt-4 text-center text-[11px] text-[color:var(--muted-foreground)]">
              Hand-engraved by a professional · Digital proof before we ship · 30-day guarantee
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
            <div className="mt-5 inline-flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl">4.8</span>
                <span className="flex items-center text-lg">
                  {"★★★★".split("").map((_, i) => (
                    <span key={i} className="text-[color:var(--gold)]">★</span>
                  ))}
                  <span className="relative text-[color:var(--sand-deep)]">
                    ★
                    <span className="absolute left-0 top-0 overflow-hidden text-[color:var(--gold)]" style={{ width: "80%" }}>
                      ★
                    </span>
                  </span>
                </span>
              </div>
              <span className="text-sm text-[color:var(--muted-foreground)]">out of 5 · 6000+ reviews</span>
            </div>
          </div>
          <ReviewCarousel />
        </div>
      </section>

      {/* 7. How it works — visual 3-step */}
      <section className="bg-[color:var(--secondary)]">
        <div className="container-x py-16 md:py-24">
          <div className="text-center">
            <div className="eyebrow">How it works</div>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">Three steps, start to keepsake</h2>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {HOW_IT_WORKS.map((s, i) => (
              <div key={s.title} className="text-center">
                <div className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white shadow-sm">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="aspect-square w-full object-cover"
                  />
                </div>
                <div className="mt-6 text-xs tracking-[0.2em] text-[color:var(--muted-foreground)]">
                  STEP {i + 1}
                </div>
                <h3 className="mt-2 font-display text-xl md:text-2xl">{s.title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-[color:var(--muted-foreground)]">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Everything else */}
      <section className="container-x py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2">
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
