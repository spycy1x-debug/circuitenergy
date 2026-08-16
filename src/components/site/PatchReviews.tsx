import { useMemo, useState } from "react";
import { Star, X } from "lucide-react";
import {
  PATCH_REVIEWS,
  PATCH_REVIEW_COUNT,
  PATCH_AVG_RATING,
  PATCH_RATING_BREAKDOWN,
  type PatchReview,
} from "@/lib/patch-reviews-data";

function Stars({ n, className = "h-4 w-4" }: { n: number; className?: string }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${className} ${i <= n ? "text-[color:var(--brand)]" : "text-[color:var(--line)]"}`}
          fill="currentColor"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

function FractionalStars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, value - (i - 1)));
        return (
          <span key={i} className="relative inline-block h-4 w-4">
            <Star className="absolute inset-0 h-4 w-4 text-[color:var(--line)]" fill="currentColor" strokeWidth={0} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="h-4 w-4 text-[color:var(--brand)]" fill="currentColor" strokeWidth={0} />
            </span>
          </span>
        );
      })}
    </div>
  );
}

const FILTERS = ["All", "5 star", "4 star", "3 star", "2 star", "1 star", "With photos"] as const;

export function PatchReviews() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [visible, setVisible] = useState(12);
  const [lightbox, setLightbox] = useState<PatchReview | null>(null);

  const list = useMemo(() => {
    if (filter === "All") return PATCH_REVIEWS;
    if (filter === "With photos") return PATCH_REVIEWS.filter((r) => r.photo);
    const n = Number(filter[0]);
    return PATCH_REVIEWS.filter((r) => r.rating === n);
  }, [filter]);

  const shown = list.slice(0, visible);

  return (
    <section id="reviews" className="border-y border-[color:var(--line)] bg-[#FBFAFF]">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-[#111111] md:text-4xl">Reviews</h2>

        <div className="mt-8 grid gap-8 md:grid-cols-[240px_1fr]">
          <div className="rounded-2xl border border-[color:var(--line)] bg-white p-6 text-center">
            <div className="text-4xl font-bold text-[#111111]">{PATCH_AVG_RATING}</div>
            <div className="mt-2 flex justify-center">
              <FractionalStars value={PATCH_AVG_RATING} />
            </div>
            <p className="mt-2 text-[12px] text-[color:var(--muted-ink)]">
              {PATCH_REVIEW_COUNT.toLocaleString()}+ verified reviews
            </p>
          </div>

          <div className="space-y-2">
            {PATCH_RATING_BREAKDOWN.map(({ stars, count }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="w-8 text-[12px] text-[color:var(--muted-ink)]">{stars} ★</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-[color:var(--brand-soft)]">
                  <span
                    className="block h-2 rounded-full bg-[color:var(--brand)]"
                    style={{ width: `${(count / PATCH_REVIEW_COUNT) * 100}%` }}
                  />
                </span>
                <span className="w-10 text-right text-[12px] tabular-nums text-[color:var(--muted-ink)]">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setVisible(12);
              }}
              className={`rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors ${
                filter === f
                  ? "border-[color:var(--brand)] bg-[color:var(--brand)] text-white"
                  : "border-[color:var(--line)] bg-white text-[color:var(--muted-ink)] hover:border-[color:var(--brand)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {shown.map((r) => (
            <div
              key={r.id}
              className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-[color:var(--line)] bg-white"
            >
              {r.photo && (
                <button
                  type="button"
                  onClick={() => setLightbox(r)}
                  className="block w-full"
                  aria-label={`View photo from ${r.name}`}
                >
                  <img
                    src={r.photo}
                    alt={r.photoAlt ?? `Photo from ${r.name}`}
                    loading="lazy"
                    className="w-full object-cover"
                  />
                </button>
              )}
              <div className="p-5">
                <Stars n={r.rating} className="h-3.5 w-3.5" />
                {r.title && (
                  <h3 className="mt-3 text-[15px] font-semibold leading-snug text-[#111111]">{r.title}</h3>
                )}
                <p className="mt-2 text-[14px] leading-6 text-[color:var(--muted-ink)]">{r.body}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-[color:var(--muted-ink)]">
                  <span className="font-semibold text-[#111111]">{r.name}</span>
                  <span>·</span>
                  <span className="font-medium text-[color:var(--brand)]">Verified</span>
                  <span>·</span>
                  <span>{r.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visible < list.length && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setVisible((v) => v + 12)}
              className="rounded-full border border-[color:var(--brand)] px-6 py-3 text-[13px] font-semibold text-[color:var(--brand)] transition-colors hover:bg-[color:var(--brand)] hover:text-white"
            >
              Load more reviews
            </button>
          </div>
        )}
      </div>

      {lightbox?.photo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Close"
            className="absolute right-4 top-4 text-white/80 hover:text-white"
            onClick={() => setLightbox(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={lightbox.photo}
            alt={lightbox.photoAlt ?? ""}
            className="max-h-[88vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
