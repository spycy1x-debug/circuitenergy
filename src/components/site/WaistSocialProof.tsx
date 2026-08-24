import { useEffect, useRef, useState } from "react";
import sp1 from "@/assets/sp-1.webp.asset.json";
import sp2 from "@/assets/sp-2.webp.asset.json";
import sp3 from "@/assets/sp-3.webp.asset.json";
import sp4 from "@/assets/sp-4.webp.asset.json";
import sp5 from "@/assets/sp-5.webp.asset.json";
import sp6 from "@/assets/sp-6.webp.asset.json";
import sp7 from "@/assets/sp-7.webp.asset.json";
import spv1 from "@/assets/spv-1.mp4.asset.json";
import spv2 from "@/assets/spv-2.mp4.asset.json";
import spv3 from "@/assets/spv-3.mp4.asset.json";

const sans = { fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' };
const serif = { fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif' };

type Slide = { kind: "video"; src: string } | { kind: "images"; srcs: string[] };

const SLIDES: Slide[] = [
  { kind: "video", src: spv1.url },
  { kind: "images", srcs: [sp1.url, sp2.url, sp3.url] },
  { kind: "video", src: spv2.url },
  { kind: "images", srcs: [sp4.url, sp5.url, sp6.url] },
  { kind: "video", src: spv3.url },
  { kind: "images", srcs: [sp7.url, sp2.url, sp5.url] },
];

export function WaistSocialProof() {
  const [i, setI] = useState(0);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const go = (d: number) => setI((v) => (v + d + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const slide = SLIDES[i];

  return (
    <section className="border-y border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
      <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20" ref={rootRef}>
        <p style={sans} className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--cw-brand-deep)]">
          Real customers
        </p>
        <h2 style={serif} className="mt-4 text-[30px] leading-[1.1] md:text-[44px]">
          Fifteen seconds on. Instantly snatched.
        </h2>

        <div
          className="relative mt-8"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          {slide.kind === "video" ? (
            <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-2xl border border-[color:var(--cw-line)] bg-black">
              {inView ? (
                <video
                  key={slide.src}
                  src={slide.src}
                  className="aspect-[9/16] w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                <div className="aspect-[9/16] w-full" />
              )}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {slide.srcs.map((s, n) => (
                <img
                  key={`${i}-${n}`}
                  src={s}
                  alt="Customer wearing the Waist Strap"
                  loading="lazy"
                  className="aspect-[3/4] w-full rounded-2xl border border-[color:var(--cw-line)] object-cover"
                />
              ))}
            </div>
          )}

          <button
            aria-label="Previous"
            onClick={() => go(-1)}
            className="absolute left-0 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[color:var(--cw-line)] bg-[color:var(--cw-bg)]/95 text-xl shadow-md md:-left-4"
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={() => go(1)}
            className="absolute right-0 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[color:var(--cw-line)] bg-[color:var(--cw-bg)]/95 text-xl shadow-md md:-right-4"
          >
            ›
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {SLIDES.map((s, n) => (
            <button
              key={n}
              onClick={() => setI(n)}
              aria-label={`Go to slide ${n + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                n === i ? "w-6 bg-[color:var(--cw-brand-deep)]" : "w-1.5 bg-[color:var(--cw-line)]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
