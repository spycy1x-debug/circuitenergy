import { useState } from "react";
import { Star, X } from "lucide-react";
import {
  REVIEWS,
  REVIEW_COUNT,
  AVG_RATING,
  RATING_BREAKDOWN,
  type Review,
} from "@/lib/reviews-data";

function Stars({ n, className = "h-3.5 w-3.5" }: { n: number; className?: string }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${className} ${i <= n ? "text-[color:var(--gold)]" : "text-[color:var(--taupe)]/40"}`}
          fill={i <= n ? "currentColor" : "none"}
          strokeWidth={1.4}
        />
      ))}
    </div>
  );
}

function Card({ r, onPhoto }: { r: Review; onPhoto: (r: Review) => void }) {
  return (
    <div className="mb-4 break-inside-avoid border border-[color:var(--border)] bg-white">
      {r.photo && (
        <button
          type="button"
          onClick={() => onPhoto(r)}
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
        <Stars n={r.rating} />
        {r.title && (
          <h3 className="mt-3 font-display text-lg leading-snug text-[color:var(--navy)]">
            {r.title}
          </h3>
        )}
        <p className="mt-2 text-sm leading-6 text-[color:var(--muted-foreground)]">{r.body}</p>
        <div className="mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[color:var(--taupe)]">
          <span className="text-[color:var(--navy)]">{r.name}</span>
          <span>·</span>
          <span>Verified</span>
          <span>·</span>
          <span className="normal-case tracking-normal">{r.date}</span>
        </div>
      </div>
    </div>
  );
}

export function Reviews({ full = false }: { full?: boolean }) {
  const [visible, setVisible] = useState(12);
  const [lightbox, setLightbox] = useState<Review | null>(null);

  const shown = REVIEWS.slice(0, visible);

  return (
    <section
      id="reviews"
      className={
        full
          ? "border-t border-[color:var(--border)] py-14 md:py-20"
          : "border-y border-[color:var(--border)] bg-white py-14 md:py-20"
      }
    >
      <div className="container-x">
        <div className="text-center">
          <div className="eyebrow">Customer reviews</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">What people are saying</h2>
        </div>

        {/* Summary */}
        <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-6 border border-[color:var(--border)] bg-[color:var(--ivory)] px-6 py-7 sm:flex-row sm:items-center sm:justify-center sm:gap-10">
          <div className="text-center">
            <div className="font-display text-4xl text-[color:var(--navy)]">{AVG_RATING}</div>
            <div className="mt-1.5 flex justify-center">
              <Stars n={5} className="h-4 w-4" />
            </div>
            <div className="mt-1.5 text-xs text-[color:var(--muted-foreground)]">
              {REVIEW_COUNT} verified reviews
            </div>
          </div>
          <div className="w-full max-w-[220px] space-y-1.5">
            {RATING_BREAKDOWN.map(({ stars, count }) => (
              <div key={stars} className="flex items-center gap-2 text-[11px] tabular-nums">
                <span className="w-3 text-[color:var(--navy)]">{stars}</span>
                <Star className="h-3 w-3 text-[color:var(--gold)]" fill="currentColor" strokeWidth={0} />
                <span className="h-1.5 flex-1 bg-white">
                  <span
                    className="block h-1.5 bg-[color:var(--gold)]"
                    style={{ width: `${(count / REVIEW_COUNT) * 100}%` }}
                  />
                </span>
                <span className="w-5 text-right text-[color:var(--muted-foreground)]">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Masonry wall */}
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {shown.map((r) => (
            <Card key={r.id} r={r} onPhoto={setLightbox} />
          ))}
        </div>

        {visible < REVIEWS.length && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setVisible((v) => v + 12)}
              className="border border-[color:var(--navy)] px-6 py-3 text-xs uppercase tracking-[0.16em] text-[color:var(--navy)] transition-colors hover:bg-[color:var(--navy)] hover:text-[color:var(--ivory)]"
            >
              Load more reviews
            </button>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-[color:var(--muted-foreground)]">
          We only publish reviews from verified purchases.
        </p>
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
