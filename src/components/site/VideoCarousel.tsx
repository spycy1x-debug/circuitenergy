import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type VideoItem = { src: string; caption?: string };

export function VideoCarousel({ items }: { items: VideoItem[] }) {
  const [index, setIndex] = useState(0);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchX = useRef<number | null>(null);

  const go = (d: number) =>
    setIndex((i) => (i + d + items.length) % items.length);

  useEffect(() => {
    refs.current.forEach((v, i) => {
      if (!v) return;
      if (i === index) {
        v.play().catch(() => {});
      } else {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [index]);

  const SLIDE = 62; // % of container width
  const GAP = 3;
  const offset = (100 - SLIDE) / 2 - index * (SLIDE + GAP);

  return (
    <div className="relative">
      <div
        className="overflow-hidden"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(${offset}%)`, gap: `${GAP}%` }}
        >
          {items.map((v, i) => (
            <button
              key={v.src}
              type="button"
              onClick={() => setIndex(i)}
              style={{ flex: `0 0 ${SLIDE}%` }}
              className={`relative overflow-hidden rounded-2xl bg-black transition-all duration-500 ${
                i === index ? "opacity-100 scale-100" : "opacity-60 scale-[0.9]"
              }`}
              aria-label={v.caption ?? `Video ${i + 1}`}
            >
              <video
                ref={(el) => {
                  refs.current[i] = el;
                }}
                src={v.src}
                className="aspect-[9/16] h-full w-full object-cover"
                muted
                loop
                playsInline
                preload="metadata"
                autoPlay={i === 0}
              />
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous video"
        className="absolute left-1 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[color:var(--line)] bg-white/95 shadow-md transition-colors hover:border-[color:var(--brand)] md:left-3"
      >
        <ChevronLeft className="h-5 w-5 text-[#111111]" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next video"
        className="absolute right-1 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[color:var(--line)] bg-white/95 shadow-md transition-colors hover:border-[color:var(--brand)] md:right-3"
      >
        <ChevronRight className="h-5 w-5 text-[#111111]" />
      </button>

      <div className="mt-5 flex justify-center gap-2">
        {items.map((v, i) => (
          <button
            key={v.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to video ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-[color:var(--brand)]" : "w-1.5 bg-[color:var(--line)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
