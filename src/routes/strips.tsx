import { createFileRoute } from "@tanstack/react-router";
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
  ChevronDown,
} from "lucide-react";
import heroImg from "@/assets/seralie-strips-hero.jpg.asset.json";
import ctaImg from "@/assets/seralie-strips-cta.jpg.asset.json";

export const Route = createFileRoute("/strips")({
  head: () => ({
    meta: [
      { title: "Seralie Purple Whitening Strips — Makeup For Your Teeth" },
      {
        name: "description",
        content:
          "Camera-ready in 30 minutes. Seralie purple color-correcting whitening strips instantly brighten your smile for dates, photos, meetings, and every moment you want extra confidence.",
      },
      { property: "og:title", content: "Seralie — Makeup For Your Teeth" },
      {
        property: "og:description",
        content:
          "Purple color-correcting whitening strips. Camera-ready in 30 minutes. A beauty-first smile ritual.",
      },
      { property: "og:image", content: heroImg.url },
      { name: "twitter:image", content: heroImg.url },
    ],
  }),
  component: StripsPage,
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

/* ---------- bundle data ---------- */
const BASE_UNIT = 34.99;
const compareAt = (qty: number) => (qty === 1 ? BASE_UNIT : Math.floor(BASE_UNIT * qty) - 0.01);

const BUNDLES = [
  { id: "b1", title: "Buy 1", strips: "14 Strips", qty: 1, price: 31.99, tag: null, subtitle: "Try it before an event." },
  { id: "b2", title: "Buy 1 Get 1 FREE", strips: "28 Strips", qty: 2, price: 31.99, tag: "MOST POPULAR", subtitle: "Two months of brighter smiles.", popular: true },
  { id: "b3", title: "Buy 2 Get 2 FREE", strips: "56 Strips", qty: 4, price: 50.99, tag: "FAN FAVORITE", subtitle: "Stash one, gift one." },
  { id: "b4", title: "Buy 3 Get 4 FREE", strips: "98 Strips", qty: 7, price: 69.99, tag: "BEST VALUE", subtitle: "Never run out." },
].map((b) => ({ ...b, compareAt: compareAt(b.qty) }));

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

/* ---------- primary button ---------- */
function CTAButton({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center justify-center rounded-full px-8 py-4 text-sm md:text-base font-medium tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 ${className}`}
      style={{
        background: C.primary,
        color: "#FFFFFF",
        letterSpacing: "0.14em",
        boxShadow: "0 10px 30px -12px rgba(91,58,110,0.55)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = C.primaryHover)}
      onMouseLeave={(e) => (e.currentTarget.style.background = C.primary)}
    >
      {children}
    </button>
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

/* ---------- page ---------- */
function StripsPage() {
  const [selected, setSelected] = useState("b2");
  const [showSticky, setShowSticky] = useState(false);
  const offerRef = useRef<HTMLDivElement>(null);
  const chosen = BUNDLES.find((b) => b.id === selected)!;

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToOffer = () => offerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Poppins', 'Inter', system-ui, sans-serif" }}>
      {/* HERO + OFFER */}
      <section ref={offerRef} id="offer" className="relative overflow-hidden">
        <div className="container-x grid md:grid-cols-2 gap-10 md:gap-16 items-center py-10 md:py-20">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase mb-6" style={{ color: C.primary }}>
                <Sparkles className="h-3.5 w-3.5" /> Purple Color-Correcting Strips
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.02]" style={{ color: C.primary }}>
                Makeup for<br />your teeth.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-base md:text-lg max-w-lg leading-relaxed" style={{ color: C.muted }}>
                <span className="font-medium" style={{ color: C.text }}>Camera-ready in just 30 minutes.</span> Purple color correction instantly brightens your smile for dates, photos, meetings, weddings, and every moment you want extra confidence. And with consistent use, yellow tones stay neutralized — so your smile looks whiter week after week, not just tonight.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-6 flex items-center gap-3">
                <Stars rating={4.8} size={16} />
                <span className="text-sm font-medium">4.8</span>
                <a href="#reviews" className="text-sm underline underline-offset-4" style={{ color: C.muted }}>Reviews</a>
              </div>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-8">
                <CTAButton onClick={() => document.getElementById('offer-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                  Choose Your Offer
                </CTAButton>
              </div>
            </Reveal>
            <Reveal delay={340}>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-xs tracking-wide" style={{ color: C.muted }}>
                <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" style={{ color: C.primary }} /> 30-Day Guarantee</span>
                <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4" style={{ color: C.primary }} /> Free U.S. Shipping Over $50</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div
              id="offer-card"
              className="rounded-[24px] p-6 md:p-8"
              style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: "0 30px 80px -30px rgba(46,37,40,0.18)" }}
            >
              <div className="text-[11px] tracking-[0.24em] uppercase" style={{ color: C.primary }}>Choose your ritual</div>
              <h2 className="font-display text-3xl md:text-4xl mt-2" style={{ color: C.primary }}>Bundle & save.</h2>

              <div className="mt-6 space-y-3">
                {BUNDLES.map((b) => {
                  const active = selected === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => setSelected(b.id)}
                      className="w-full text-left rounded-2xl p-4 flex items-center gap-4 transition-all duration-200"
                      style={{
                        background: active ? C.blushSoft : "#FFFFFF",
                        border: `1.5px solid ${active ? C.primary : C.border}`,
                        boxShadow: active ? "0 8px 24px -12px rgba(91,58,110,0.35)" : "none",
                      }}
                    >
                      <span
                        className="inline-flex items-center justify-center h-5 w-5 rounded-full shrink-0"
                        style={{ border: `1.5px solid ${active ? C.primary : "#C7BCB0"}`, background: active ? C.primary : "transparent" }}
                      >
                        {active && <span className="h-2 w-2 rounded-full bg-white" />}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-display text-lg leading-none" style={{ color: C.text }}>{b.title}</span>
                          {b.tag && (
                            <span
                              className="text-[10px] tracking-[0.2em] uppercase px-2 py-1 rounded-full"
                              style={{
                                background: b.popular ? C.primary : C.blush,
                                color: b.popular ? "#FFFFFF" : C.primary,
                              }}
                            >
                              {b.tag}
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-xs" style={{ color: C.muted }}>{b.strips} · {b.subtitle}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs line-through" style={{ color: C.muted }}>${b.compareAt.toFixed(2)}</div>
                        <div className="font-display text-xl leading-tight" style={{ color: C.primary }}>${b.price.toFixed(2)}</div>
                        <div className="text-[10px] tracking-[0.14em] uppercase mt-0.5" style={{ color: C.muted }}>
                          Save ${(b.compareAt - b.price).toFixed(2)}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => window?.alert?.("Launching soon — connect your Shopify variant to enable checkout.")}
                className="mt-6 w-full rounded-full px-8 py-4 text-sm md:text-base font-medium tracking-[0.14em] uppercase transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: C.primary,
                  color: "#FFFFFF",
                  boxShadow: "0 14px 34px -14px rgba(91,58,110,0.6)",
                }}
              >
                <span className="inline-flex items-center gap-2">
                  Add To Cart
                  <span className="opacity-70 line-through text-xs">${chosen.compareAt.toFixed(2)}</span>
                  <span>${chosen.price.toFixed(2)}</span>
                </span>
              </button>

              <div className="mt-5 grid grid-cols-2 gap-3 text-xs" style={{ color: C.muted }}>
                <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" style={{ color: C.primary }} /> 30-Day Guarantee</span>
                <span className="inline-flex items-center gap-2"><Lock className="h-4 w-4" style={{ color: C.primary }} /> Secure Checkout</span>
                <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" style={{ color: C.primary }} /> Ships Within 24 Hours</span>
                <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4" style={{ color: C.primary }} /> Free Shipping Over $50</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>




      {/* HOW IT WORKS */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 60% at 15% 20%, rgba(234,217,223,0.55) 0%, transparent 60%), radial-gradient(50% 50% at 90% 80%, rgba(240,213,122,0.18) 0%, transparent 60%)",
          }}
        />
        <div className="container-x relative">
          <Reveal>
            <div className="max-w-2xl text-center mx-auto">
              <div className="text-[11px] tracking-[0.24em] uppercase mb-4" style={{ color: C.primary }}>How it works</div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight" style={{ color: C.primary }}>Brighten in three simple steps.</h2>
              <p className="mt-5 text-sm md:text-base" style={{ color: C.muted }}>
                A 30-minute ritual built on the same beauty principle behind purple shampoo.
              </p>
            </div>
          </Reveal>

          {/* Color wheel centerpiece */}
          <Reveal delay={100}>
            <div className="mt-14 flex flex-col items-center text-center">
              <svg viewBox="0 0 240 240" className="w-64 h-64 md:w-72 md:h-72 drop-shadow-[0_20px_40px_rgba(91,58,110,0.15)]" aria-hidden>
                <defs>
                  <linearGradient id="purple" x1="0" x2="1">
                    <stop offset="0%" stopColor="#7A5490" />
                    <stop offset="100%" stopColor="#5B3A6E" />
                  </linearGradient>
                  <linearGradient id="yellow" x1="0" x2="1">
                    <stop offset="0%" stopColor="#F0D57A" />
                    <stop offset="100%" stopColor="#E5C25A" />
                  </linearGradient>
                </defs>
                <circle cx="120" cy="120" r="94" fill="none" stroke={C.border} strokeWidth="1" />
                <path d="M120,30 A90,90 0 0,1 120,210 Z" fill="url(#purple)" opacity="0.95" />
                <path d="M120,30 A90,90 0 0,0 120,210 Z" fill="url(#yellow)" opacity="0.9" />
                <circle cx="120" cy="120" r="46" fill={C.bg} />
                <text x="120" y="118" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="20" fill={C.text}>Purple</text>
                <text x="120" y="138" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="12" fill={C.muted}>neutralizes yellow</text>
              </svg>
            </div>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { n: "01", title: "Apply", body: "Place the strip onto clean, dry teeth.", Icon: Sparkles },
              { n: "02", title: "Wait", body: "Relax for 30 minutes while the color wheel does its work.", Icon: Clock },
              { n: "03", title: "Smile", body: "Peel off and reveal a visibly brighter, camera-ready smile.", Icon: Heart },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div
                  className="h-full rounded-[24px] p-8 text-center transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    boxShadow: "0 20px 50px -30px rgba(46,37,40,0.18)",
                  }}
                >
                  <div
                    className="mx-auto inline-flex items-center justify-center h-14 w-14 rounded-full mb-6"
                    style={{ background: C.blushSoft, color: C.primary }}
                  >
                    <s.Icon className="h-5 w-5" />
                  </div>
                  <div className="text-[11px] tracking-[0.24em] uppercase" style={{ color: C.muted }}>{s.n}</div>
                  <div className="font-display text-2xl mt-1" style={{ color: C.primary }}>{s.title}</div>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: C.muted }}>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* YOUR MOMENTS */}
      <section className="py-20 md:py-28" style={{ background: C.blushSoft }}>
        <div className="container-x">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-[11px] tracking-[0.24em] uppercase mb-4" style={{ color: C.primary }}>Your moments</div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight" style={{ color: C.primary }}>Confidence for every occasion.</h2>
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

      {/* WHY SERALIE */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-[11px] tracking-[0.24em] uppercase mb-4" style={{ color: C.primary }}>Why Seralie</div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight" style={{ color: C.primary }}>Beauty-first smile confidence.</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Instant Brightening", body: "Look more camera-ready in just 30 minutes." },
              { title: "No Harsh Bleaching", body: "Beauty-inspired color correction instead of aggressive whitening." },
              { title: "Brighter Over Time", body: "Instant is our specialty — but with consistent use, your smile keeps looking whiter week after week." },
              { title: "Fits Your Beauty Routine", body: "Designed to belong beside your skincare and makeup, not inside a medicine cabinet." },
            ].map((m, i) => (
              <Reveal key={m.title} delay={i * 80}>
                <div
                  className="h-full rounded-[20px] p-7 transition-all duration-300 hover:-translate-y-1"
                  style={{ background: C.card, border: `1px solid ${C.border}` }}
                >
                  <div className="inline-flex items-center justify-center h-11 w-11 rounded-full mb-6" style={{ background: C.blushSoft, color: C.primary }}>
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="font-display text-2xl leading-tight">{m.title}</div>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: C.muted }}>{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS (empty-ready) */}
      <section id="reviews" className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-[11px] tracking-[0.24em] uppercase mb-4" style={{ color: C.primary }}>Loved by our community</div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight" style={{ color: C.primary }}>Real smiles, real moments.</h2>
              <p className="mt-4 text-sm md:text-base" style={{ color: C.muted }}>
                Reviews from verified customers will appear here as they come in.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Reveal key={i} delay={i * 60}>
                <div
                  className="mb-5 break-inside-avoid rounded-[20px] p-6"
                  style={{ background: C.card, border: `1px dashed ${C.border}` }}
                >
                  <div
                    className="w-full rounded-2xl mb-5"
                    style={{
                      aspectRatio: i % 2 === 0 ? "4 / 5" : "1 / 1",
                      background: `linear-gradient(135deg, ${C.blushSoft}, ${C.blush})`,
                    }}
                  />
                  <Stars rating={0} />
                  <div className="mt-3 font-display text-xl" style={{ color: C.text }}>Review title</div>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: C.muted }}>
                    No reviews yet — be the first to share your Seralie moment.
                  </p>
                  <div className="mt-5 flex items-center justify-between text-xs" style={{ color: C.muted }}>
                    <span>Customer Name</span>
                    <span
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full"
                      style={{ background: C.blushSoft, color: C.primary }}
                    >
                      <ShieldCheck className="h-3 w-3" /> Verified Purchase
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28" style={{ background: C.blushSoft }}>
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="text-center">
              <div className="text-[11px] tracking-[0.24em] uppercase mb-4" style={{ color: C.primary }}>FAQ</div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight" style={{ color: C.primary }}>Everything you're wondering.</h2>
            </div>
          </Reveal>

          <div className="mt-12 space-y-3">
            {FAQS.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
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
            <img src={ctaImg.url} alt="Woman with a bright, natural smile in warm sunlight" width={1600} height={1408} loading="lazy" className="w-full h-[520px] md:h-[640px] object-cover block" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(46,37,40,0.55), rgba(46,37,40,0.15) 60%, transparent)" }} />
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 md:px-16 max-w-2xl text-white">
                <Reveal>
                  <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
                    Your smile deserves the same attention as the rest of your beauty routine.
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <div className="mt-8">
                    <CTAButton onClick={scrollToOffer}>Be Camera-Ready</CTAButton>
                  </div>
                </Reveal>
                <Reveal delay={200}>
                  <div className="mt-6 text-xs md:text-sm tracking-wide opacity-90">
                    30-Day Guarantee &nbsp;•&nbsp; Secure Checkout &nbsp;•&nbsp; Fast Shipping
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      <div
        className={`md:hidden fixed left-0 right-0 bottom-0 z-40 px-4 pb-[env(safe-area-inset-bottom)] pt-3 transition-transform duration-300 ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ background: "rgba(250,246,240,0.95)", backdropFilter: "blur(10px)", borderTop: `1px solid ${C.border}` }}
      >
        <button
          onClick={scrollToOffer}
          className="w-full rounded-full py-4 text-sm font-medium tracking-[0.14em] uppercase text-white"
          style={{ background: C.primary, boxShadow: "0 10px 28px -12px rgba(91,58,110,0.6)" }}
        >
          Be Camera-Ready · ${chosen.price.toFixed(2)}
        </button>
      </div>
    </div>
  );
}

/* ---------- FAQ item ---------- */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-[18px] overflow-hidden transition-all"
      style={{ background: C.card, border: `1px solid ${C.border}` }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-6 px-6 py-5 text-left"
      >
        <span className="font-display text-lg md:text-xl" style={{ color: C.text }}>{q}</span>
        <ChevronDown
          className="h-5 w-5 shrink-0 transition-transform duration-300"
          style={{ color: C.primary, transform: open ? "rotate(180deg)" : "rotate(0)" }}
        />
      </button>
      <div
        className="grid transition-all duration-300"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-sm leading-relaxed" style={{ color: C.muted }}>{a}</p>
        </div>
      </div>
    </div>
  );
}

const FAQS = [
  {
    q: "How do SERALIE Purple Whitening Strips work?",
    a: "Purple sits opposite yellow on the color wheel, helping neutralize yellow tones so your smile appears brighter after just one treatment. Think of it as the same beauty concept behind purple shampoo, but designed for your smile. It's the perfect finishing touch before the moments that matter — and with regular use, that brighter look becomes your smile's everyday baseline.",
  },
  {
    q: "How long does it take?",
    a: "Simply apply the strip and relax for 30 minutes. Once removed, your smile looks instantly brighter and more camera-ready, making it effortless to fit into your routine before a date, event, meeting, vacation, or night out.",
  },
  {
    q: "When should I use them?",
    a: "Anytime you want your smile to look its best. They're perfect before photos, weddings, interviews, content creation, first dates, special events, or whenever you want an extra boost of confidence.",
  },
  {
    q: "Will they make my teeth sensitive?",
    a: "SERALIE is designed as a gentle beauty product rather than a traditional bleaching treatment. Because it doesn't rely on harsh whitening methods, many people choose it when they want a brighter-looking smile without the discomfort often associated with peroxide whitening.",
  },
  {
    q: "Do they contain peroxide or bleach?",
    a: "No. SERALIE uses color-correction technology instead of harsh bleaching ingredients, giving you a brighter-looking smile without making bleaching the focus of your beauty routine.",
  },
  {
    q: "Can I use them after drinking coffee or wine?",
    a: "Yes. They're perfect whenever your smile could use a quick refresh before heading out, taking photos, or meeting people.",
  },
  {
    q: "How often can I use SERALIE?",
    a: "Two ways: on-demand before big moments, or a few times a week as part of your routine. The instant brightening is our signature — and with consistent use, yellow tones stay neutralized so your smile maintains a visibly whiter look over time.",
  },
  {
    q: "What's included in each pack?",
    a: "Each pack includes 14 easy-to-use purple whitening strips, enough for multiple confidence boosts whenever you need them. Bundle options offer even greater value if you want to keep a pack at home, in your travel bag, or ready for upcoming events.",
  },
  {
    q: "What if I'm not satisfied?",
    a: "Try SERALIE completely risk-free. If you're not happy with your order, you're covered by our 30-Day Satisfaction Guarantee. Our team is here to make sure you have a great experience from your first order onward.",
  },
];
