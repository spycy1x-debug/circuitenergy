import { Star } from "lucide-react";

/**
 * Seralie has no customers yet. This section is fully styled but renders an
 * empty state — no fabricated reviews, names, photos, counts or ratings.
 */
export function Reviews({ full = false }: { full?: boolean }) {
  return (
    <section
      id="reviews"
      className={full ? "border-t border-[color:var(--border)] py-14 md:py-20" : "border-y border-[color:var(--border)] bg-white py-14 md:py-20"}
    >
      <div className="container-x max-w-3xl text-center">
        <div className="eyebrow">Customer reviews</div>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">What people are saying</h2>

        <div className="mt-8 border border-[color:var(--border)] bg-[color:var(--ivory)] px-6 py-14">
          <div className="flex justify-center gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-4 w-4 text-[color:var(--taupe)]" strokeWidth={1.4} />
            ))}
          </div>
          <p className="mt-5 text-sm text-[color:var(--muted-foreground)]">
            Reviews from verified customers will appear here.
          </p>
        </div>

        <p className="mt-5 text-xs text-[color:var(--muted-foreground)]">
          We only publish reviews from verified purchases.
        </p>
      </div>
    </section>
  );
}
