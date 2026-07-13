import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Star,
  ShieldCheck,
  Truck,
  Lock,
  Clock,
  Sparkles,
  Camera,
  Briefcase,
  Coffee,
  Heart,
  ArrowRight,
} from "lucide-react";
import heroImg from "@/assets/seralie-strips-hero.jpg.asset.json";
import ctaImg from "@/assets/seralie-strips-cta.jpg.asset.json";
import offerImg from "@/assets/seralie-strips-offer.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seralie — Beauty, Down To Your Smile" },
      {
        name: "description",
        content:
          "Seralie is beauty for your smile. Purple color-correcting whitening strips that make you camera-ready in 30 minutes — for dates, photos, and every moment that matters.",
      },
      { property: "og:title", content: "Seralie — Beauty, Down To Your Smile" },
      {
        property: "og:description",
        content:
          "Makeup for your teeth. Camera-ready in 30 minutes.",
      },
      { property: "og:image", content: heroImg.url },
      { name: "twitter:image", content: heroImg.url },
    ],
  }),
  component: HomePage,
});

/* ---------- palette ---------- */
const C = {
  bg: "#FAF6F0",
  primary: "#5B3A6E",
  primaryHover: "#4A2E5A",
  blush: "#EAD9DF",
  blushSoft: "#F5E9EE",
  text: "#2E2528",
  muted: "#6B5D62",
  border: "#E9DFD5",
  card: "#FFFFFF",
};

/* ---------- fade-in on scroll ---------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 700ms ease ${delay}ms, transform 700ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- stars ---------- */
function Stars({ rating = 4.8, size = 14 }: { rating?: number; size?: number }) {
  return (
    <div className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star size={size} style={{ color: C.primary, opacity: 0.22 }} fill="currentColor" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star size={size} style={{ color: C.primary }} fill="currentColor" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

/* ---------- CTA link (routes to product page) ---------- */
function CTALink({ children, to = "/strips", className = "" }: { children: React.ReactNode; to?: string; className?: string }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm md:text-base font-medium tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 ${className}`}
      style={{
        background: C.primary,
        color: "#FFFFFF",
        letterSpacing: "0.14em",
        boxShadow: "0 10px 30px -12px rgba(91,58,110,0.55)",
      }}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}

/* ---------- page ---------- */
function HomePage() {
  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Poppins', 'Inter', system-ui, sans-serif" }}>
      {/* BRAND HERO */}
      <section className="relative overflow-hidden">
        <div className="container-x grid md:grid-cols-2 gap-10 md:gap-16 items-center py-12 md:py-24">
          <div className="order-2 md:order-1">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase mb-6" style={{ color: C.primary }}>
                <Sparkles className="h-3.5 w-3.5" /> Seralie Beauty
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.02]" style={{ color: C.text }}>
                Beauty, down to<br />your smile.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-base md:text-lg max-w-lg leading-relaxed" style={{ color: C.muted }}>
                You perfect your skin, your hair, your look — Seralie is the finishing touch.
                Our purple color-correcting strips are{" "}
                <span className="font-medium" style={{ color: C.text }}>makeup for your teeth</span>:
                a brighter-looking smile in 30 minutes, right when you need it.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CTALink>Shop Whitening Strips</CTALink>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-xs tracking-wide" style={{ color: C.muted }}>
                <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" style={{ color: C.primary }} /> 30-Day Guarantee</span>
                <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4" style={{ color: C.primary }} /> Free U.S. Shipping Over $40</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="order-1 md:order-2">
            <div
              className="relative rounded-[24px] overflow-hidden"
              style={{ boxShadow: "0 30px 80px -30px rgba(91,58,110,0.25)", border: `1px solid ${C.border}` }}
            >
              <img
                src={heroImg.url}
                alt="Seralie purple whitening strip on a marble vanity in morning light"
                width={1600}
                height={1808}
                className="w-full h-auto block"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURED PRODUCT */}
      <section className="py-20 md:py-28" style={{ background: C.blushSoft }}>
        <div className="container-x grid lg:grid-cols-[1fr_1.1fr] gap-14 items-center">
          <Reveal>
            <Link to="/strips" className="block group">
              <div
                className="rounded-[24px] overflow-hidden transition-transform duration-300 group-hover:-translate-y-1"
                style={{ border: `1px solid ${C.border}`, boxShadow: "0 30px 80px -30px rgba(91,58,110,0.25)" }}
              >
                <img
                  src={offerImg.url}
                  alt="Seralie purple whitening strip pouch on blush linen"
                  width={1408}
                  height={1408}
                  loading="lazy"
                  className="w-full h-auto block"
                />
              </div>
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <div className="text-[11px] tracking-[0.24em] uppercase" style={{ color: C.primary }}>The flagship</div>
            <h2 className="font-display text-4xl md:text-5xl mt-3 leading-tight">Purple Whitening Strips</h2>
            <div className="mt-4 flex items-center gap-3">
              <Stars rating={4.8} size={16} />
              <span className="text-sm" style={{ color: C.muted }}>4.8 · Loved by our community</span>
            </div>
            <p className="mt-6 text-base leading-relaxed max-w-lg" style={{ color: C.muted }}>
              Purple neutralizes yellow — the same beauty principle as purple shampoo, reimagined
              for your smile. No peroxide, no sensitivity, no waiting weeks. Just a visibly
              brighter-looking smile, 30 minutes before the moments that matter.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm" style={{ color: C.text }}>
              {[
                "Camera-ready in 30 minutes",
                "Peroxide-free color correction — zero sensitivity",
                "14 strips per pack · bundles from $31.99",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0" style={{ color: C.primary }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <CTALink>Shop Now · From $31.99</CTALink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* YOUR MOMENTS */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-[11px] tracking-[0.24em] uppercase mb-4" style={{ color: C.primary }}>Your moments</div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight">Confidence for every occasion.</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Heart, title: "Date Night", body: "Your finishing touch before heading out." },
              { icon: Camera, title: "Photos & Events", body: "Look brighter in every picture." },
              { icon: Briefcase, title: "Interviews & Meetings", body: "Feel polished before every first impression." },
              { icon: Coffee, title: "Coffee Refresh", body: "A quick confidence boost after your daily coffee." },
            ].map((m, i) => (
              <Reveal key={m.title} delay={i * 80}>
                <div
                  className="h-full rounded-[20px] p-7 transition-all duration-300 hover:-translate-y-1"
                  style={{ background: C.card, border: `1px solid ${C.border}` }}
                >
                  <div className="inline-flex items-center justify-center h-11 w-11 rounded-full mb-6" style={{ background: C.blush, color: C.primary }}>
                    <m.icon className="h-5 w-5" />
                  </div>
                  <div className="font-display text-2xl">{m.title}</div>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: C.muted }}>{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* THE SERALIE PROMISE */}
      <section className="py-16 md:py-20" style={{ background: C.blushSoft }}>
        <div className="container-x">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: ShieldCheck, title: "30-Day Guarantee", body: "Love it or your money back." },
              { Icon: Lock, title: "Secure Checkout", body: "Safe, encrypted payment." },
              { Icon: Clock, title: "Ships Within 24 Hours", body: "Ready for your next moment." },
              { Icon: Truck, title: "Free Shipping Over $40", body: "Across the U.S." },
            ].map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 70}>
                <div className="flex flex-col items-center text-center gap-3">
                  <span className="inline-flex items-center justify-center h-12 w-12 rounded-full" style={{ background: C.card, color: C.primary, border: `1px solid ${C.border}` }}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="font-medium text-sm" style={{ color: C.text }}>{title}</div>
                  <p className="text-xs" style={{ color: C.muted }}>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div
            className="relative overflow-hidden rounded-[28px]"
            style={{ boxShadow: "0 40px 100px -40px rgba(91,58,110,0.35)", border: `1px solid ${C.border}` }}
          >
            <img src={ctaImg.url} alt="Woman with a bright, natural smile in warm sunlight" width={1600} height={1408} loading="lazy" className="w-full h-[480px] md:h-[600px] object-cover block" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(20,12,18,0.92) 0%, rgba(30,20,26,0.78) 45%, rgba(30,20,26,0.5) 75%, rgba(30,20,26,0.25) 100%)" }} />
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 md:px-16 max-w-2xl">
                <Reveal>
                  <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-white" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}>
                    Your smile deserves the same attention as the rest of your beauty routine.
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <div className="mt-8">
                    <CTALink>Be Camera-Ready</CTALink>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
