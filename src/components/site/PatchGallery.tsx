import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type GalleryItem = { src: string; alt: string; label: string };

export function PatchGallery({ items }: { items: GalleryItem[] }) {
  const [i, setI] = useState(0);
  const startX = useRef<number | null>(null);
  const active = items[i]!;
  const go = (n: number) => setI((c) => (c + n + items.length) % items.length);

  return (
    <div className="min-w-0">
      <div
        className="relative overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--brand-soft)] p-2"
        onTouchStart={(e) => {
          startX.current = e.touches[0]!.clientX;
        }}
        onTouchEnd={(e) => {
          if (startX.current === null) return;
          const dx = e.changedTouches[0]!.clientX - startX.current;
          if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
          startX.current = null;
        }}
      >
        <img
          key={active.src}
          src={active.src}
          alt={active.alt}
          width={1000}
          height={1250}
          fetchPriority={i === 0 ? "high" : undefined}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          className="aspect-[4/5] w-full rounded-xl bg-white object-contain"
        />

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[color:var(--brand)] shadow-sm backdrop-blur transition hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next image"
          className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[color:var(--brand)] shadow-sm backdrop-blur transition hover:bg-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          {items.map((it, idx) => (
            <span
              key={it.src}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-5 bg-[color:var(--brand)]" : "w-1.5 bg-[color:var(--brand)]/30"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((g, idx) => (
          <button
            key={g.src}
            type="button"
            onClick={() => setI(idx)}
            aria-label={g.label}
            className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-[color:var(--brand-soft)] p-1 transition ${
              idx === i ? "border-[color:var(--brand)]" : "border-[color:var(--line)]"
            }`}
          >
            <img
              src={g.src}
              alt=""
              width={128}
              height={128}
              loading="lazy"
              decoding="async"
              className="h-full w-full rounded-lg object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
