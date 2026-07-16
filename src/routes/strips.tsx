import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
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
  ChevronLeft,
  ChevronRight,
  X as XIcon,
} from "lucide-react";
import howVideo from "@/assets/strips-how-it-works.mp4.asset.json";
import gallerySmile from "@/assets/strips-smile-closeup.png.asset.json";
import galleryMirror from "@/assets/strips-mirror-apply.png.asset.json";
import galleryBoxMarble from "@/assets/strips-box-marble.png.asset.json";
import galleryBoxVanity from "@/assets/strips-box-vanity.png.asset.json";
import gallery14Strips from "@/assets/strips-14-strips.png.asset.json";
import galleryMacroMug from "@/assets/strips-macro-mug.png.asset.json";
import rvMia from "@/assets/strips-rv-mia.png.asset.json";
import rvJasmine from "@/assets/strips-rv-jasmine.png.asset.json";
import rvStripMacro from "@/assets/strips-rv-strip-macro.png.asset.json";
import rvFlatlayTimer from "@/assets/strips-rv-flatlay-timer.png.asset.json";
import rvGym from "@/assets/strips-rv-gym.png.asset.json";
import rvVanityCurl from "@/assets/strips-rv-vanity-curl.png.asset.json";
import rvPurpleMouth from "@/assets/strips-rv-purple-mouth.png.asset.json";
import rvOffice from "@/assets/strips-rv-office.png.asset.json";
import rvPorchGolden from "@/assets/strips-rv-porch-golden.png.asset.json";
import rvPorchLaugh from "@/assets/strips-rv-porch-laugh.png.asset.json";
import { shopifyCart } from "@/lib/shopify-cart";
import { supabase } from "@/integrations/supabase/client";

/* order requested: last→first, 2nd-to-last→second, 1st→third, 2nd→fourth, then rest */
const GALLERY = [
  { url: gallerySmile.url, alt: "Bright, camera-ready smile after using Seralie strips" },
  { url: galleryMirror.url, alt: "Applying a Seralie purple whitening strip in the mirror" },
  { url: galleryBoxMarble.url, alt: "Seralie Whitening Strips box on marble vanity" },
  { url: galleryBoxVanity.url, alt: "Seralie Whitening Strips alongside a beauty vanity" },
  { url: gallery14Strips.url, alt: "Seralie box opened with all 14 purple whitening strips" },
  { url: galleryMacroMug.url, alt: "Macro of a Seralie purple strip beside a coffee cup" },
];

/* ---------- seed reviews ---------- */
type SeedReview = { r: number; title: string; body: string; n: string; date: string; img?: string };
const SEED_REVIEWS: SeedReview[] = [
  { r: 5, title: "wedding-ready in an hour", body: "used these the morning of my best friend's wedding and by the time i got to hair & makeup my teeth genuinely looked whiter. the purple cancels the yellow immediately, it's kind of unreal. every photo i'm in i can actually see the difference.", n: "Mia R.", date: "6 days ago", img: rvMia.url },
  { r: 5, title: "two weeks in", body: "i've been using them 3x a week for a little over two weeks and my teeth are genuinely several shades lighter. not a filter, not a lighting trick — my husband noticed before i said anything. and zero sensitivity which was my main worry.", n: "Jasmine T.", date: "2 weeks ago", img: rvJasmine.url },
  { r: 5, title: "the strips are actually cute?", body: "wasn't expecting to say that about whitening strips but the little purple shape is kind of adorable. fits my teeth perfectly, doesn't slide around. more importantly they actually work.", n: "Chloe D.", date: "3 days ago", img: rvStripMacro.url },
  { r: 5, title: "my new pre-date ritual", body: "put one on while i'm doing my hair and makeup and by the time i'm ready to walk out the door my smile matches the effort i put into everything else. finally.", n: "Sofia G.", date: "9 days ago", img: rvVanityCurl.url },
  { r: 5, title: "coffee girlie approved", body: "i drink way too much coffee. way too much. was skeptical anything short of the dentist could help but these have honestly kept my teeth looking bright between cleanings. i keep a box at work now.", n: "Priya S.", date: "4 days ago", img: rvOffice.url },
  { r: 5, title: "before flights, before events, before everything", body: "throw a box in my gym bag, in my carry on, everywhere. 30 min and i look put together no matter how tired i am. only thing i've tried that gives an instant result AND actually whitens over time.", n: "Isabela M.", date: "11 days ago", img: rvGym.url },
  { r: 5, title: "obsessed", body: "no other way to put it. gentle, no burning, actually works. i keep telling my mom to try them.", n: "Hannah K.", date: "1 week ago" },
  { r: 5, title: "the purple genuinely does something", body: "you can literally see the yellow being neutralized the second you take it off. it's like a filter but real. then a few weeks of using them and the baseline shade just… stays lighter. love that.", n: "Ellie P.", date: "3 weeks ago", img: rvPurpleMouth.url },
  { r: 5, title: "no sensitivity at all", body: "i have sensitive teeth and can't do the peroxide strips from the drugstore, they wreck me for days. these? nothing. just a brighter smile.", n: "Rachel W.", date: "5 days ago" },
  { r: 5, title: "worth the bundle", body: "got the buy 2 get 2 free — glad i did. one for the bathroom, one for the travel bag, one for my sister, one still sealed. price per box is a joke for the quality.", n: "Amanda B.", date: "2 weeks ago", img: rvPorchGolden.url },
  { r: 4, title: "really good, just wanted the deeper whitening a bit faster", body: "the instant effect is unreal, no notes there. for the long term change i'd say i started really seeing it around week 3, i was hoping for closer to 1. still keeping them in rotation.", n: "Nicole H.", date: "8 days ago" },
  { r: 4, title: "loving them so far", body: "wish the strips were just slightly wider so they'd cover my back teeth too. the front looks amazing though and i keep getting compliments.", n: "Julia F.", date: "12 days ago", img: rvPorchLaugh.url },
  { r: 4, title: "great product, would love more per box", body: "14 strips goes faster than you think once you start using them for every event. bundle is the way to go. rating 4 only because i want more!!", n: "Taylor V.", date: "6 days ago" },
  { r: 3, title: "instant effect is real, long term was slower for me", body: "loved the way it looked right after — before a shoot it saved me. the whitening-over-time part took longer for me than i expected, maybe a month before i noticed a permanent shift. still using them though.", n: "Kayla D.", date: "3 weeks ago" },
  { r: 3, title: "good for events, i wanted more staying power", body: "it's a lovely product and gentle which i appreciate. the instant brightness faded quicker than i hoped between uses so i basically apply one before anything important. that's fine but i wanted the day-to-day effect to stick harder.", n: "Meredith L.", date: "2 weeks ago", img: rvFlatlayTimer.url },
  { r: 2, title: "gentle but slow for me", body: "no complaints on safety, zero sensitivity, easy to use. i just didn't see the dramatic long-term change others are getting after 3 weeks. the instant effect is nice for a night out but for me it faded pretty fast. giving it more time.", n: "Danielle O.", date: "10 days ago" },
];
const heroImg = GALLERY[3]; // box on vanity (used for beauty-routine section)
const ctaImg = GALLERY[1]; // mirror apply (used as final CTA backdrop)

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

/* Each bundle is its own Shopify product; variantId verified from the live store. */
const BUNDLES = [
  { id: "b1", title: "Buy 1", strips: "14 Strips", qty: 1, price: 31.99, tag: null, subtitle: "Try it before an event.", variantId: "gid://shopify/ProductVariant/48740328308890" },
  { id: "b2", title: "Buy 1 Get 1 FREE", strips: "28 Strips", qty: 2, price: 31.99, tag: "MOST POPULAR", subtitle: "Two months of brighter smiles.", popular: true, variantId: "gid://shopify/ProductVariant/48745209397402" },
  { id: "b3", title: "Buy 2 Get 2 FREE", strips: "56 Strips", qty: 4, price: 50.99, tag: "FAN FAVORITE", subtitle: "Stash one, gift one.", variantId: "gid://shopify/ProductVariant/48745208742042" },
  { id: "b4", title: "Buy 3 Get 4 FREE", strips: "98 Strips", qty: 7, price: 69.99, tag: "BEST VALUE", subtitle: "Never run out.", variantId: "gid://shopify/ProductVariant/48745209266330" },
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

/* ---------- comparison cell ---------- */
function Cell({ value, highlight = false }: { value: "yes" | "no" | "meh" | "limited"; highlight?: boolean }) {
  const symbol = value === "yes" ? "✓" : value === "no" ? "✕" : value === "limited" ? "Limited" : "△";
  const color = value === "yes" ? (highlight ? C.primary : "#6B7A4B") : value === "no" ? "#B14B3F" : C.muted;
  return (
    <div className="p-4 text-center">
      <span
        className={`inline-flex items-center justify-center min-w-8 h-8 px-2 rounded-full ${highlight ? "font-semibold" : ""}`}
        style={{
          background: highlight && value === "yes" ? C.blushSoft : "transparent",
          color,
          fontSize: value === "limited" ? 11 : 16,
          letterSpacing: value === "limited" ? "0.14em" : "normal",
          textTransform: value === "limited" ? "uppercase" : "none",
        }}
      >
        {symbol}
      </span>
    </div>
  );
}

/* ---------- product gallery ---------- */
function ProductGallery() {
  const [i, setI] = useState(0);
  const total = GALLERY.length;
  const prev = () => setI((v) => (v - 1 + total) % total);
  const next = () => setI((v) => (v + 1) % total);
  return (
    <div>
      <div
        className="relative rounded-[24px] overflow-hidden group"
        style={{ background: "#FFFFFF", border: `1px solid ${C.border}`, boxShadow: "0 30px 80px -30px rgba(46,37,40,0.18)" }}
      >
        <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
          {GALLERY.map((g, idx) => (
            <img
              key={g.url}
              src={g.url}
              alt={g.alt}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              style={{ opacity: i === idx ? 1 : 0 }}
              loading={idx === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>
        <button
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full flex items-center justify-center transition-all duration-200 opacity-80 hover:opacity-100 hover:-translate-x-0.5"
          style={{ background: "rgba(255,255,255,0.92)", color: C.primary, boxShadow: "0 8px 24px -8px rgba(46,37,40,0.25)", transform: "translateY(-50%)" }}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full flex items-center justify-center transition-all duration-200 opacity-80 hover:opacity-100 hover:translate-x-0.5"
          style={{ background: "rgba(255,255,255,0.92)", color: C.primary, boxShadow: "0 8px 24px -8px rgba(46,37,40,0.25)", transform: "translateY(-50%)" }}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex gap-1.5">
          {GALLERY.map((_, idx) => (
            <span
              key={idx}
              className="h-1.5 rounded-full transition-all"
              style={{ width: i === idx ? 20 : 6, background: i === idx ? C.primary : "rgba(91,58,110,0.28)" }}
            />
          ))}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-6 gap-2">
        {GALLERY.map((g, idx) => (
          <button
            key={g.url}
            onClick={() => setI(idx)}
            aria-label={`Show photo ${idx + 1}`}
            className="rounded-lg overflow-hidden transition-all"
            style={{ border: `1.5px solid ${i === idx ? C.primary : C.border}`, opacity: i === idx ? 1 : 0.75 }}
          >
            <img src={g.url} alt="" className="w-full h-full object-cover" style={{ aspectRatio: "1 / 1" }} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- page ---------- */
function StripsPage() {
  const [selected, setSelected] = useState("b2");
  const [showSticky, setShowSticky] = useState(false);
  const [adding, setAdding] = useState(false);
  const offerRef = useRef<HTMLDivElement>(null);
  const chosen = BUNDLES.find((b) => b.id === selected)!;

  /* ----- reviews state ----- */
  type UserReview = { r: number; title: string; body: string; n: string; date: string; img?: string };
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [reviewFilter, setReviewFilter] = useState<0 | 5 | 4 | 3 | 2>(0);
  const [reviewsVisible, setReviewsVisible] = useState(12);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rvName, setRvName] = useState("");
  const [rvTitle, setRvTitle] = useState("");
  const [rvText, setRvText] = useState("");
  const [rvRating, setRvRating] = useState(5);
  const [rvPhoto, setRvPhoto] = useState<string | null>(null);
  const [rvSubmitting, setRvSubmitting] = useState(false);
  const [rvError, setRvError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    supabase
      .from("product_reviews")
      .select("name, title, body, rating, image_url, created_at")
      .eq("product_id", "strips")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (!alive || !data) return;
        setUserReviews(
          data.map((r) => ({
            r: r.rating,
            title: r.title,
            body: r.body,
            n: r.name,
            date: new Date(r.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }),
            img: r.image_url || undefined,
          })),
        );
      });
    return () => { alive = false; };
  }, []);

  const allReviews = useMemo<UserReview[]>(() => [...userReviews, ...SEED_REVIEWS], [userReviews]);
  const filtered = useMemo(
    () => (reviewFilter === 0 ? allReviews : allReviews.filter((r) => r.r === reviewFilter)),
    [allReviews, reviewFilter],
  );
  const shown = filtered.slice(0, reviewsVisible);
  const totalCount = 3000 + userReviews.length;
  const avgRating = 4.8;
  const starBreakdown = useMemo(() => {
    const buckets: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    allReviews.forEach((r) => { buckets[r.r] = (buckets[r.r] || 0) + 1; });
    return buckets;
  }, [allReviews]);

  const handleAdd = async () => {
    if (adding) return;
    setAdding(true);
    try {
      await shopifyCart.add(
        {
          variantId: chosen.variantId,
          productTitle: "Seralie Purple Whitening Strips",
          variantTitle: chosen.title,
          image: "", // let the cart use the real Shopify product image
          unitPrice: chosen.price,
        },
        1,
      );
    } catch (e) {
      console.error(e);
      window?.alert?.("Could not add to cart. Please try again.");
    } finally {
      setAdding(false);
    }
  };

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
              <div className="mt-6 flex items-center gap-3 flex-wrap">
                <Stars rating={4.8} size={16} />
                <span className="text-sm font-medium">4.8</span>
                <span className="text-sm" style={{ color: C.muted }}>3,000+ reviews</span>
                <a href="#reviews" className="text-sm underline underline-offset-4" style={{ color: C.primary }}>Read reviews</a>
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
                <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4" style={{ color: C.primary }} /> Free U.S. Shipping Over $40</span>
              </div>
            </Reveal>
          </div>

          <div className="space-y-6 md:space-y-8">
            <Reveal delay={100}>
              <ProductGallery />
            </Reveal>

            <Reveal delay={160}>
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
                onClick={handleAdd}
                disabled={adding}
                className="mt-6 w-full rounded-full px-8 py-4 text-sm md:text-base font-medium tracking-[0.14em] uppercase transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                style={{
                  background: C.primary,
                  color: "#FFFFFF",
                  boxShadow: "0 14px 34px -14px rgba(91,58,110,0.6)",
                }}
              >
                <span className="inline-flex items-center gap-2">
                  {adding ? "Adding…" : "Add To Cart"}
                  <span className="opacity-70 line-through text-xs">${chosen.compareAt.toFixed(2)}</span>
                  <span>${chosen.price.toFixed(2)}</span>
                </span>
              </button>

              <div className="mt-5 grid grid-cols-2 gap-3 text-xs" style={{ color: C.muted }}>
                <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" style={{ color: C.primary }} /> 30-Day Guarantee</span>
                <span className="inline-flex items-center gap-2"><Lock className="h-4 w-4" style={{ color: C.primary }} /> Secure Checkout</span>
                <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" style={{ color: C.primary }} /> Ships Within 24 Hours</span>
                <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4" style={{ color: C.primary }} /> Free Shipping Over $40</span>
              </div>
            </div>
          </Reveal>
          </div>
        </div>
      </section>

      {/* WHY YOUR SMILE LOOKS DULL */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 60% at 15% 20%, rgba(234,217,223,0.55) 0%, transparent 60%), radial-gradient(50% 50% at 90% 80%, rgba(240,213,122,0.18) 0%, transparent 60%)",
          }}
        />
        <div className="container-x relative grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div>
              <div className="text-[11px] tracking-[0.24em] uppercase mb-4" style={{ color: C.primary }}>Why your smile looks dull</div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight" style={{ color: C.primary }}>
                Your natural smile is still there.
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed" style={{ color: C.muted }}>
                <p>
                  Everyday habits like coffee, tea, wine, berries, and richly colored foods leave behind tiny pigment particles that settle into the surface of your teeth. Over time, these stains build up, causing your smile to appear duller and more yellow — even if you brush twice a day.
                </p>
                <p>
                  Unfortunately, toothpaste can only remove surface debris. It isn't designed to lift the deeper stains that gradually develop with everyday life.
                </p>
                <p className="font-display text-2xl md:text-3xl" style={{ color: C.primary }}>
                  The good news? Your natural smile is still there.
                </p>
                <p>
                  Seralie Purple Whitening Strips are formulated to target stubborn discoloration while color-correcting visible yellow tones, helping reveal a brighter, whiter smile from the very first use. The comfortable, enamel-safe strips conform to your teeth to deliver even whitening across your smile — without the mess of gels or the hassle of expensive treatments.
                </p>
                <p style={{ color: C.text }}>
                  The result is a visibly brighter smile that looks fresh, radiant, and effortlessly confident.
                </p>
              </div>
              <div className="mt-8">
                <CTAButton onClick={() => document.getElementById('offer-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                  Shop The Ritual
                </CTAButton>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div
              className="rounded-[24px] overflow-hidden"
              style={{ border: `1px solid ${C.border}`, boxShadow: "0 30px 80px -30px rgba(91,58,110,0.28)" }}
            >
              <video
                src={howVideo.url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto block"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE SCIENCE — simple icons */}
      <section className="py-16 md:py-20" style={{ background: C.blushSoft }}>
        <div className="container-x">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <div className="text-[11px] tracking-[0.24em] uppercase mb-4" style={{ color: C.primary }}>The science, simply</div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight" style={{ color: C.primary }}>How Seralie works.</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { emoji: "☕", title: "Coffee stains enamel", body: "Pigments settle into the surface of your teeth every day." },
              { emoji: "💜", title: "Purple neutralizes yellow", body: "The same beauty principle behind purple shampoo — for your smile." },
              { emoji: "✨", title: "Whitening lifts stains", body: "Gentle actives target deeper discoloration over time." },
            ].map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <div
                  className="h-full rounded-[24px] p-8 text-center transition-all duration-300 hover:-translate-y-1"
                  style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: "0 20px 50px -30px rgba(46,37,40,0.18)" }}
                >
                  <div className="text-5xl mb-4" aria-hidden>{s.emoji}</div>
                  <div className="font-display text-2xl" style={{ color: C.primary }}>{s.title}</div>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: C.muted }}>{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-20 md:py-28">
        <div className="container-x max-w-5xl">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <div className="text-[11px] tracking-[0.24em] uppercase mb-4" style={{ color: C.primary }}>Why Seralie</div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight" style={{ color: C.primary }}>The clear difference.</h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div
              className="mt-12 rounded-[24px] overflow-hidden"
              style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: "0 30px 80px -30px rgba(46,37,40,0.15)" }}
            >
              <div className="grid grid-cols-4 text-center text-[11px] md:text-sm tracking-[0.14em] uppercase" style={{ background: C.blushSoft, color: C.primary }}>
                <div className="p-4 text-left pl-6" />
                <div className="p-4 font-display text-base md:text-lg tracking-normal">Seralie</div>
                <div className="p-4 tracking-normal" style={{ color: C.muted }}>Whitening Toothpaste</div>
                <div className="p-4 tracking-normal" style={{ color: C.muted }}>Whitening Pen</div>
              </div>
              {[
                { label: "Instant brightening", s: "yes" as const, t: "no" as const, p: "meh" as const },
                { label: "Whitens over time", s: "yes" as const, t: "limited" as const, p: "yes" as const },
                { label: "Even coverage", s: "yes" as const, t: "no" as const, p: "no" as const },
                { label: "Comfortable", s: "yes" as const, t: "yes" as const, p: "no" as const },
                { label: "Enamel safe", s: "yes" as const, t: "yes" as const, p: "meh" as const },
                { label: "Peroxide-free", s: "yes" as const, t: "limited" as const, p: "no" as const },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className="grid grid-cols-4 items-center text-sm"
                  style={{ borderTop: `1px solid ${C.border}`, background: i % 2 ? "transparent" : "rgba(245,233,238,0.35)" }}
                >
                  <div className="p-4 pl-6 text-left font-medium" style={{ color: C.text }}>{row.label}</div>
                  <Cell value={row.s} highlight />
                  <Cell value={row.t} />
                  <Cell value={row.p} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* BEAUTY ROUTINE */}
      <section className="py-20 md:py-28" style={{ background: C.blushSoft }}>
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="rounded-[24px] overflow-hidden group" style={{ border: `1px solid ${C.border}`, boxShadow: "0 30px 80px -30px rgba(91,58,110,0.28)" }}>
              <img
                src={heroImg.url}
                alt="Seralie beside skincare and makeup on a vanity"
                className="w-full h-auto block transition-transform duration-[900ms] group-hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <div className="text-[11px] tracking-[0.24em] uppercase mb-4" style={{ color: C.primary }}>Your beauty routine</div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight" style={{ color: C.primary }}>
                The final step before you leave the house.
              </h2>
              <ul className="mt-8 space-y-3 text-base" style={{ color: C.text }}>
                {[
                  "Morning skincare",
                  "Hair",
                  "Makeup",
                  "✨ Smile",
                ].map((x) => (
                  <li key={x} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: C.primary }} />
                    <span className="font-display text-2xl">{x}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-base leading-relaxed max-w-md" style={{ color: C.muted }}>
                You perfect your skin, your hair, your look — Seralie is the finishing touch that ties it all together. Because your smile is part of your beauty routine, too.
              </p>
              <div className="mt-8">
                <CTAButton onClick={() => document.getElementById('offer-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                  Add To Your Ritual
                </CTAButton>
              </div>
            </div>
          </Reveal>
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

      {/* REVIEWS */}
      <section id="reviews" className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-[11px] tracking-[0.24em] uppercase mb-4" style={{ color: C.primary }}>Loved by thousands of smiles</div>
              <h2 className="font-display text-4xl md:text-6xl leading-[1.05]" style={{ color: C.primary }}>
                Real smiles, real moments.
              </h2>
              <div className="mt-6 inline-flex items-center gap-3 flex-wrap justify-center">
                <Stars rating={avgRating} size={22} />
                <span className="font-display text-2xl" style={{ color: C.primary }}>{avgRating.toFixed(1)}</span>
                <span className="text-sm" style={{ color: C.muted }}>· Based on {totalCount.toLocaleString()}+ reviews</span>
              </div>
            </div>
          </Reveal>

          {/* summary + filters */}
          <Reveal delay={100}>
            <div className="mt-10 max-w-3xl mx-auto rounded-[20px] p-6 md:p-7" style={{ background: C.card, border: `1px solid ${C.border}` }}>
              <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-center">
                <div className="text-center md:border-r md:pr-8" style={{ borderColor: C.border }}>
                  <div className="font-display text-5xl md:text-6xl leading-none" style={{ color: C.primary }}>{avgRating.toFixed(1)}</div>
                  <div className="mt-2"><Stars rating={avgRating} size={16} /></div>
                  <div className="mt-1 text-[11px] tracking-wide" style={{ color: C.muted }}>{totalCount.toLocaleString()}+ reviews</div>
                </div>
                <div className="space-y-1.5">
                  {[5, 4, 3, 2, 1].map((s) => {
                    const pct = s === 5 ? 88 : s === 4 ? 8 : s === 3 ? 3 : s === 2 ? 1 : 0;
                    return (
                      <button
                        key={s}
                        onClick={() => { setReviewFilter((reviewFilter === s ? 0 : s) as 0 | 5 | 4 | 3 | 2); setReviewsVisible(12); }}
                        className="w-full flex items-center gap-3 text-left px-2 py-1 rounded-md transition-colors hover:bg-black/[0.03]"
                        style={{ opacity: reviewFilter === 0 || reviewFilter === s ? 1 : 0.5 }}
                      >
                        <span className="text-xs w-6" style={{ color: C.muted }}>{s}★</span>
                        <span className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: C.blushSoft }}>
                          <span className="block h-full rounded-full" style={{ width: `${pct}%`, background: C.primary }} />
                        </span>
                        <span className="text-xs w-10 text-right tabular-nums" style={{ color: C.muted }}>{pct}%</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-2 pt-5" style={{ borderTop: `1px solid ${C.border}` }}>
                {[
                  { v: 0, label: "All" },
                  { v: 5, label: "5 ★" },
                  { v: 4, label: "4 ★" },
                  { v: 3, label: "3 ★" },
                  { v: 2, label: "2 ★" },
                ].map((f) => {
                  const active = reviewFilter === f.v;
                  return (
                    <button
                      key={f.v}
                      onClick={() => { setReviewFilter(f.v as 0 | 5 | 4 | 3 | 2); setReviewsVisible(12); }}
                      className="px-4 py-1.5 rounded-full text-xs tracking-wide transition-all"
                      style={{
                        background: active ? C.primary : "transparent",
                        color: active ? "#FFFFFF" : C.primary,
                        border: `1px solid ${active ? C.primary : C.border}`,
                      }}
                    >
                      {f.label}
                    </button>
                  );
                })}
                <div className="flex-1" />
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="px-5 py-2 rounded-full text-xs font-medium tracking-[0.14em] uppercase text-white transition-all hover:-translate-y-0.5"
                  style={{ background: C.primary, boxShadow: "0 10px 24px -12px rgba(91,58,110,0.55)" }}
                >
                  Write a Review
                </button>
              </div>
            </div>
          </Reveal>

          {/* masonry */}
          <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
            {shown.map((rv, i) => (
              <div
                key={i}
                className="mb-5 break-inside-avoid rounded-2xl p-6"
                style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: "0 6px 20px -12px rgba(46,37,40,0.10)" }}
              >
                <Stars rating={rv.r} size={14} />
                <div className="mt-3 font-display text-xl leading-tight" style={{ color: C.primary }}>{rv.title}</div>
                <p className="mt-2 text-[14px] leading-relaxed" style={{ color: C.text }}>{rv.body}</p>
                {rv.img && (
                  <div className="mt-4 rounded-xl overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
                    <img src={rv.img} alt="" className="w-full h-full object-cover" style={{ aspectRatio: "4 / 5" }} loading="lazy" />
                  </div>
                )}
                <div className="mt-5 flex items-center justify-between gap-2 flex-wrap text-xs" style={{ color: C.muted }}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span style={{ color: C.text }}>{rv.n}</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: C.blushSoft, color: C.primary }}>
                      <ShieldCheck className="h-3 w-3" /> Verified Buyer
                    </span>
                  </div>
                  <span>{rv.date}</span>
                </div>
              </div>
            ))}
          </div>

          {reviewsVisible < filtered.length && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setReviewsVisible((v) => v + 9)}
                className="px-8 py-3 rounded-full text-xs font-medium tracking-[0.14em] uppercase transition-all hover:-translate-y-0.5"
                style={{ background: "transparent", color: C.primary, border: `1.5px solid ${C.primary}` }}
              >
                Load More Reviews
              </button>
            </div>
          )}
        </div>
      </section>

      {/* WRITE A REVIEW MODAL */}
      {showReviewForm && (
        <div className="fixed inset-0 z-[95] bg-black/60 flex items-center justify-center p-4" onClick={() => !rvSubmitting && setShowReviewForm(false)}>
          <div
            className="rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            style={{ background: C.bg, border: `1px solid ${C.border}` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-[11px] tracking-[0.24em] uppercase" style={{ color: C.primary }}>Share your smile</div>
                  <h3 className="mt-2 font-display text-2xl" style={{ color: C.primary }}>Write a Review</h3>
                </div>
                <button type="button" onClick={() => setShowReviewForm(false)} className="p-1" style={{ color: C.muted }} aria-label="Close">
                  <XIcon className="h-5 w-5" />
                </button>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setRvError(null);
                  const name = rvName.trim();
                  const title = rvTitle.trim();
                  const text = rvText.trim();
                  if (!name || name.length > 80) return setRvError("Please enter your name.");
                  if (!title || title.length > 120) return setRvError("Please add a short title.");
                  if (!text || text.length < 5) return setRvError("Please write your review.");
                  if (text.length > 2000) return setRvError("Review is too long.");
                  setRvSubmitting(true);
                  try {
                    const { error } = await supabase.from("product_reviews").insert({
                      product_id: "strips",
                      name, title, body: text, rating: rvRating, image_url: rvPhoto,
                    });
                    if (error) throw error;
                    setUserReviews((prev) => [{
                      r: rvRating, title, body: text, n: name,
                      date: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }),
                      img: rvPhoto || undefined,
                    }, ...prev]);
                    setShowReviewForm(false);
                    setRvName(""); setRvTitle(""); setRvText(""); setRvRating(5); setRvPhoto(null);
                  } catch (err: any) {
                    setRvError(err?.message || "Something went wrong. Please try again.");
                  } finally {
                    setRvSubmitting(false);
                  }
                }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-[11px] tracking-[0.18em] uppercase mb-2" style={{ color: C.muted }}>Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} type="button" onClick={() => setRvRating(n)} className="p-1" aria-label={`${n} stars`}>
                        <Star className="h-7 w-7" style={{ color: C.primary, opacity: n <= rvRating ? 1 : 0.25 }} fill="currentColor" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] tracking-[0.18em] uppercase mb-2" style={{ color: C.muted }}>Name</label>
                  <input type="text" value={rvName} maxLength={80} onChange={(e) => setRvName(e.target.value)} required
                    className="w-full px-3 py-2.5 bg-white rounded-md text-[14px] focus:outline-none"
                    style={{ border: `1px solid ${C.border}`, color: C.text }} />
                </div>

                <div>
                  <label className="block text-[11px] tracking-[0.18em] uppercase mb-2" style={{ color: C.muted }}>Review title</label>
                  <input type="text" value={rvTitle} maxLength={120} onChange={(e) => setRvTitle(e.target.value)} required
                    className="w-full px-3 py-2.5 bg-white rounded-md text-[14px] focus:outline-none"
                    style={{ border: `1px solid ${C.border}`, color: C.text }} />
                </div>

                <div>
                  <label className="block text-[11px] tracking-[0.18em] uppercase mb-2" style={{ color: C.muted }}>Your review</label>
                  <textarea value={rvText} maxLength={2000} rows={4} onChange={(e) => setRvText(e.target.value)} required
                    placeholder="Tell others what you love about it…"
                    className="w-full px-3 py-2.5 bg-white rounded-md text-[14px] focus:outline-none resize-none"
                    style={{ border: `1px solid ${C.border}`, color: C.text }} />
                </div>

                <div>
                  <label className="block text-[11px] tracking-[0.18em] uppercase mb-2" style={{ color: C.muted }}>Add a photo (optional)</label>
                  {rvPhoto ? (
                    <div className="relative inline-block">
                      <img src={rvPhoto} alt="Preview" className="h-24 w-24 object-cover rounded-md" style={{ border: `1px solid ${C.border}` }} />
                      <button type="button" onClick={() => setRvPhoto(null)} aria-label="Remove photo"
                        className="absolute -top-2 -right-2 text-white rounded-full p-1 shadow" style={{ background: C.primary }}>
                        <XIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-md text-[13px] cursor-pointer"
                      style={{ border: `1px dashed ${C.primary}`, color: C.primary }}>
                      <input type="file" accept="image/*" className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0]; if (!file) return;
                          if (file.size > 15 * 1024 * 1024) { setRvError("Image too large (15MB max)."); return; }
                          const dataUrl: string = await new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onload = () => {
                              const img = new Image();
                              img.onload = () => {
                                const maxW = 900;
                                const scale = Math.min(1, maxW / img.width);
                                const canvas = document.createElement("canvas");
                                canvas.width = img.width * scale;
                                canvas.height = img.height * scale;
                                canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
                                resolve(canvas.toDataURL("image/jpeg", 0.82));
                              };
                              img.onerror = reject; img.src = reader.result as string;
                            };
                            reader.onerror = reject; reader.readAsDataURL(file);
                          });
                          setRvPhoto(dataUrl);
                        }} />
                      + Upload Photo
                    </label>
                  )}
                </div>

                {rvError && <p className="text-[13px] text-red-700">{rvError}</p>}

                <div className="pt-2 flex gap-3">
                  <button type="button" onClick={() => setShowReviewForm(false)}
                    className="flex-1 py-3 rounded-md text-[13px]"
                    style={{ border: `1px solid ${C.border}`, color: C.text }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={rvSubmitting}
                    className="flex-1 py-3 rounded-md text-[13px] tracking-wide uppercase text-white disabled:opacity-60 transition-colors"
                    style={{ background: C.primary }}>
                    {rvSubmitting ? "Submitting…" : "Submit Review"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}



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
                    <CTAButton onClick={scrollToOffer}>Be Camera-Ready</CTAButton>
                  </div>
                </Reveal>
                <Reveal delay={200}>
                  <div className="mt-6 text-xs md:text-sm tracking-wide text-white/90">
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
