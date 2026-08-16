import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { PATCH_REVIEWS } from "@/lib/patch-reviews-data";

const TICKER = PATCH_REVIEWS.filter((r) => r.rating === 5).slice(0, 20);

export function PatchReviewTicker() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TICKER.length), 4500);
    return () => clearInterval(t);
  }, []);

  const r = TICKER[i];
  if (!r) return null;

  return (
    <div key={r.id} className="mt-4 flex w-full items-center gap-3 rounded-xl border border-[color:var(--line)] bg-white px-3 py-2.5 animate-in fade-in duration-500">
      {r.photo ? (
        <img
          src={r.photo}
          alt=""
          loading="lazy"
          className="h-9 w-9 shrink-0 rounded-full object-cover"
        />
      ) : (
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[color:var(--brand-soft)] text-[13px] font-bold text-[color:var(--brand)]">
          {r.name.charAt(0)}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((s) => (
              <Star key={s} className="h-3 w-3 text-[color:var(--brand)]" fill="currentColor" strokeWidth={0} />
            ))}
          </span>
          <span className="truncate text-[11px] font-bold text-[#111111]">{r.name}</span>
          <span className="text-[10px] text-[color:var(--muted-ink)]">· Verified</span>
        </div>
        <p className="mt-0.5 truncate text-[12px] leading-5 text-[color:var(--muted-ink)]">
          {r.title ?? r.body}
        </p>
      </div>
    </div>
  );
}
