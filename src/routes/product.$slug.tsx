import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Star, ShieldCheck, Check, X as XIcon, ChevronLeft, ChevronRight, FileText,
  Sparkles, Leaf, HeartPulse, Beaker, Droplet, MapPin, Sun, Flower2, ArrowRight,
  Plus, Minus, ShoppingBag,
} from "lucide-react";
import { shopifyCart } from "@/lib/shopify-cart";

// Product assets (in gallery display order)
import img1 from "@/assets/nmn-new-1.jpeg.asset.json";
import img2 from "@/assets/nmn-new-3.png.asset.json";
import img3 from "@/assets/nmn-new-2.png.asset.json";
import img4 from "@/assets/nmn-new-4.png.asset.json";
import img5 from "@/assets/nmn-new-5.png.asset.json";
import img6 from "@/assets/nmn-hand-capsule.png.asset.json";
import img7 from "@/assets/nmn-what-to-expect.png.asset.json";
import img8 from "@/assets/nmn-morning-ritual.png.asset.json";
import supplementFacts from "@/assets/nmn-supplement-facts.png.asset.json";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => {
    if (params.slug !== "nmn") return { meta: [{ title: "Seralie" }] };
    return {
      meta: [
        { title: "Seralie NMN — Beauty & Longevity, From Within" },
        { name: "description", content: "500 mg pure β-NMN to replenish NAD+, support cellular renewal, and help skin stay radiant. Third-party tested. Made in the USA." },
        { property: "og:title", content: "Seralie NMN — Beauty & Longevity, From Within" },
        { property: "og:description", content: "The youth molecule your body makes less of every year. Restored." },
      ],
    };
  },
  component: ProductPage,
});

const GALLERY = [img1, img2, img3, img4, img5, img6, img7, img8].map((a) => a.url);

function FractionalStars({ value, size = "h-4 w-4" }: { value: number; size?: string }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className={`relative inline-block ${size}`}>
            <Star className={`${size} text-[#AD9752]`} strokeWidth={1.5} />
            <span className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width: `${fill * 100}%` }}>
              <Star className={`${size} fill-current text-[#AD9752]`} strokeWidth={1.5} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function scrollToReviews(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth", block: "start" });
}


const BUNDLES = [
  { id: "1", label: "1 Bottle", bottles: 1, variantId: "gid://shopify/ProductVariant/48124189704346", price: 42.99, perBottle: 42.99, standardPrice: 57.99, detail: "30-day supply", freeShipping: false },
  { id: "2", label: "2 Bottles", bottles: 2, variantId: "gid://shopify/ProductVariant/48597438365850", price: 69.99, perBottle: 34.99, standardPrice: 57.99, detail: "60-day supply", freeShipping: true, badge: "Most Loved" },
  { id: "4", label: "3 Bottles + 1 Free", bottles: 4, variantId: "gid://shopify/ProductVariant/48597440659610", price: 95.99, perBottle: 24.00, standardPrice: 57.99, detail: "120-day supply", freeShipping: true, badge: "Best Value", popular: true },
];

function ProductPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();

  // Redirect any legacy neural URLs to NMN
  useEffect(() => {
    if (slug !== "nmn") navigate({ to: "/product/$slug", params: { slug: "nmn" }, replace: true });
  }, [slug, navigate]);

  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState("4");
  const [showFacts, setShowFacts] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [adding, setAdding] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  const bundle = useMemo(() => BUNDLES.find((b) => b.id === selectedBundle) ?? BUNDLES[2], [selectedBundle]);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") setActive((a) => (a - 1 + GALLERY.length) % GALLERY.length);
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % GALLERY.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const handleAdd = async () => {
    if (adding) return;
    setAdding(true);
    try {
      await shopifyCart.add({
        variantId: bundle.variantId,
        productTitle: "Seralie NMN",
        variantTitle: bundle.label,
        image: GALLERY[0],
        unitPrice: bundle.price,
      }, 1);
    } catch (e) {
      console.error(e);
      alert("Could not add to cart. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="product-page bg-[#FDF8EE] text-[#3B2E25]">
      {/* ABOVE THE FOLD */}
      <section className="container-x pt-10 md:pt-14 pb-16 md:pb-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div>
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="relative block w-full aspect-square bg-[#FDF8EE] overflow-hidden group"
              aria-label="View larger"
            >
              <img
                src={GALLERY[active]}
                alt={`Seralie NMN — view ${active + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_25px_#FDF8EE]" />
            </button>

            <div className="mt-3 grid grid-cols-5 sm:grid-cols-8 gap-2">
              {GALLERY.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show image ${i + 1}`}
                  aria-current={active === i}
                  className={`aspect-square bg-[#FDF8EE] overflow-hidden border transition-all ${active === i ? "border-[#AD9752]" : "border-transparent hover:border-[#EADFC7]"}`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover mix-blend-multiply" loading="lazy" />

                </button>
              ))}
            </div>
          </div>

          {/* Buy area */}
          <div>
            <div className="eyebrow">Beauty & Longevity</div>
            <h1 className="mt-4 font-display text-5xl md:text-6xl leading-[1.02] text-[#3B2E25]">Seralie NMN</h1>
            <div className="mt-4 flex items-center gap-3">
              <FractionalStars value={4.8} size="h-4 w-4" />
              <a href="#reviews" onClick={scrollToReviews} className="caps-label text-[#7A6A5E] hover:text-[#AD9752] underline underline-offset-4 decoration-[#EADFC7] hover:decoration-[#AD9752] transition-colors">
                4.8 · 2000+ reviews
              </a>
            </div>


            <p className="mt-6 text-[16px] leading-8 text-[#5A483C] max-w-lg">
              500 mg of pure β-NMN — the direct precursor to NAD+ — to help your skin stay radiant,
              your energy stay steady, and your body age well from within.
            </p>

            <div className="mt-8">
              <div className="eyebrow">Choose your ritual</div>
              <div className="mt-4 space-y-3">
                {BUNDLES.map((b) => {
                  const isSelected = selectedBundle === b.id;
                  const savings = Math.round((b.standardPrice - b.perBottle) * b.bottles);
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedBundle(b.id)}
                      aria-pressed={isSelected}
                      className={`relative w-full text-left p-5 border transition-all ${isSelected ? "border-[#AD9752] bg-[#F7EFDF]/70" : "border-[#EADFC7] bg-white hover:border-[#AD9752]/60"}`}
                    >
                      {b.badge && (
                        <span className="absolute -top-3 right-5 bg-[#AD9752] text-white caps-label px-3 py-1 text-[10px]">
                          {b.badge}
                        </span>
                      )}
                      <div className="flex items-start gap-4">
                        <span className={`mt-1 h-4 w-4 rounded-full border-2 shrink-0 ${isSelected ? "border-[#AD9752] bg-[#AD9752]" : "border-[#C9BFA3]"}`}>
                          {isSelected && <span className="block h-1.5 w-1.5 m-[3px] rounded-full bg-white" />}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="font-display text-xl text-[#3B2E25]">{b.label}</span>
                            <span className="font-display text-xl text-[#3B2E25] tabular-nums">${b.price.toFixed(2)}</span>
                          </div>
                          <div className="mt-1.5 flex items-center justify-between gap-3 text-xs tracking-wide">
                            <span className="text-[#7A6A5E]">
                              <span className="line-through">${b.standardPrice.toFixed(2)} / bottle</span>
                              <span className="ml-2 font-medium text-[#3B2E25]">${b.perBottle.toFixed(2)} / bottle</span>
                              <span className="ml-1">· {b.detail}</span>
                            </span>
                            {savings > 0 && <span className="caps-label text-[#AD9752]">Save ${savings}</span>}
                          </div>
                          {b.freeShipping && (
                            <div className="mt-1.5 caps-label text-[#6B7A4B] text-[10px]">Free Shipping</div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={adding}
              className="mt-7 w-full bg-[#AD9752] hover:bg-[#94803F] text-white caps-label text-[12px] py-5 transition-colors disabled:opacity-60 flex items-center justify-center gap-3"
            >
              {adding ? "Adding…" : <>Add to Cart · ${bundle.price.toFixed(2)} <ArrowRight className="h-3.5 w-3.5" /></>}
            </button>

            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-[#7A6A5E] tracking-wide">
              <ShieldCheck className="h-3.5 w-3.5 text-[#AD9752]" /> 30-day money-back guarantee
            </p>

            <button
              type="button"
              onClick={() => setShowFacts(true)}
              className="mt-6 inline-flex items-center gap-2 caps-label text-[#AD9752] border-b border-[#AD9752]/40 hover:border-[#AD9752] pb-0.5"
            >
              <FileText className="h-3.5 w-3.5" /> View Supplement Facts
            </button>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL NOTICE */}
      <section className="bg-[#F7EFDF]/60 border-y border-[#EADFC7]">
        <div className="container-x py-24 md:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <div className="eyebrow">What you'll notice</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-[#3B2E25]">Results that compound, <span className="italic text-[#AD9752]">quietly</span>.</h2>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { Icon: Sparkles, title: "Brighter, more luminous skin", desc: "Supports the cellular renewal that keeps your complexion looking clear, plump, and radiant." },
              { Icon: Sun, title: "Steadier all-day energy", desc: "Replenishes NAD+ to help your cells produce clean, sustained energy — no afternoon dip." },
              { Icon: Leaf, title: "Healthy aging support", desc: "Nurtures the biology behind longevity so you feel like yourself for decades to come." },
              { Icon: Flower2, title: "Compounds over time", desc: "The women who love Seralie most are the ones who make it their morning ritual for months." },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="bg-[#FDF8EE] border border-[#EADFC7] p-8">
                <div className="inline-flex h-11 w-11 items-center justify-center border border-[#AD9752] text-[#AD9752]">
                  <Icon className="h-4 w-4" strokeWidth={1.4} />
                </div>
                <h3 className="mt-5 font-display text-2xl text-[#3B2E25] leading-tight">{title}</h3>
                <p className="mt-3 text-[14px] leading-7 text-[#5A483C]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT — timeline */}
      <section className="bg-[#FDF8EE]">
        <div className="container-x py-24 md:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <div className="eyebrow">What to expect</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-[#3B2E25]">Your Seralie <span className="italic text-[#AD9752]">timeline</span></h2>
          </div>

          <div className="mt-16 relative">
            <div className="hidden md:block absolute left-0 right-0 top-6 h-px bg-[#AD9752]/40" />
            <div className="grid gap-10 md:gap-6 md:grid-cols-4">
              {[
                { when: "Weeks 1–2", title: "Energy lifts", desc: "A cleaner, steadier feeling of daily energy." },
                { when: "Weeks 3–4", title: "Skin brightens", desc: "Complexion feels smoother, more even." },
                { when: "Weeks 6–8", title: "Radiance returns", desc: "That from-within glow becomes something you notice — and others do too." },
                { when: "12+ Weeks", title: "Firmer-looking skin", desc: "The compounding effects of consistent cellular renewal." },
              ].map((step, i) => (
                <div key={i} className="text-center md:text-left relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center border border-[#AD9752] bg-[#FDF8EE] text-[#AD9752] mx-auto md:mx-0 relative z-10">
                    <span className="font-display italic text-lg">{i + 1}</span>
                  </div>
                  <div className="mt-5 caps-label text-[#AD9752]">{step.when}</div>
                  <h3 className="mt-2 font-display text-2xl text-[#3B2E25]">{step.title}</h3>
                  <p className="mt-2 text-sm text-[#5A483C] leading-7">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-14 text-center max-w-2xl mx-auto italic font-display text-lg text-[#5A483C]">
            The most beautiful results begin at week 6 — which is why we recommend the 3-bottle ritual.
          </p>
        </div>
      </section>

      {/* NOT ALL NMN IS REAL NMN */}
      <section className="bg-[#F7EFDF]/60 border-y border-[#EADFC7]">
        <div className="container-x py-24 md:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <div className="eyebrow">A quiet warning</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-[#3B2E25]">Not all NMN is <span className="italic text-[#AD9752]">real NMN</span>.</h2>
            <p className="mt-5 text-[15px] leading-8 text-[#5A483C]">
              Most cheap NMN online is nicotinamide or under-dosed. The molecule matters. The purity matters. The dose matters.
            </p>
          </div>

          <div className="mt-14 max-w-3xl mx-auto bg-[#FDF8EE] border border-[#EADFC7]">
            <div className="grid grid-cols-3 border-b border-[#EADFC7]">
              <div className="p-5 caps-label text-[#7A6A5E]">The difference</div>
              <div className="p-5 caps-label text-[#AD9752] text-center border-x border-[#EADFC7]">Seralie</div>
              <div className="p-5 caps-label text-[#7A6A5E] text-center">Typical Amazon Brand</div>
            </div>
            {[
              ["Real β-NMN molecule", true, false],
              ["500 mg full dose", true, false],
              ["Third-party tested every batch", true, false],
              ["Formulated for beauty & longevity", true, false],
              ["Made in the USA, GMP-certified", true, false],
              ["No unnecessary fillers", true, false],
            ].map(([label, us, them], i) => (
              <div key={i} className={`grid grid-cols-3 ${i < 5 ? "border-b border-[#EADFC7]" : ""}`}>
                <div className="p-5 text-sm text-[#3B2E25]">{label}</div>
                <div className="p-5 border-x border-[#EADFC7] text-center">
                  {us ? <Check className="inline h-5 w-5 text-[#AD9752]" strokeWidth={2} /> : <span className="text-[#C9BFA3]">—</span>}
                </div>
                <div className="p-5 text-center">
                  {them ? <Check className="inline h-5 w-5 text-[#AD9752]" strokeWidth={2} /> : <span className="text-[#C9BFA3]">—</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY & PURITY */}
      <section className="bg-[#FDF8EE]">
        <div className="container-x py-24 md:py-32">
          <div className="grid gap-14 md:grid-cols-2 items-center max-w-5xl mx-auto">
            <div className="relative aspect-[4/5] bg-[#FDF8EE] overflow-hidden">
              <img src={GALLERY[5]} alt="Seralie NMN — clean formulation" className="h-full w-full object-cover" loading="lazy" />
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_70px_30px_#FDF8EE]" />
            </div>


            <div>
              <div className="eyebrow">Quality & purity</div>
              <h2 className="mt-4 font-display text-4xl md:text-5xl text-[#3B2E25]">Held to a <span className="italic text-[#AD9752]">standard</span> we'd give our mothers.</h2>
              <div className="mt-6 hairline w-14" />
              <p className="mt-6 text-[15px] leading-8 text-[#5A483C]">
                Every batch of Seralie NMN is manufactured in a GMP-certified US facility and tested by an independent third-party lab.
                Purity, potency, and identity — verified before it reaches your vanity.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { Icon: Droplet, label: "Real β-NMN" },
                  { Icon: Beaker, label: "Third-Party Tested" },
                  { Icon: ShieldCheck, label: "GMP-Certified" },
                  { Icon: MapPin, label: "Made in the USA" },
                ].map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-[#AD9752]" strokeWidth={1.5} />
                    <span className="caps-label text-[#3B2E25]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YOUR DAILY RITUAL */}
      <section className="bg-[#3B2E25] text-[#FDF8EE]">
        <div className="container-x py-24 md:py-32 text-center max-w-2xl mx-auto">
          <div className="eyebrow text-[#AD9752]">Your daily ritual</div>
          <h2 className="mt-5 font-display text-4xl md:text-5xl">One capsule. Every morning.</h2>
          <div className="mt-6 hairline w-14 mx-auto bg-[#AD9752]" />
          <p className="mt-6 text-[15px] leading-8 text-[#F7EFDF]/90">
            Take Seralie NMN with your morning glass of water — before serums, before coffee, before the day begins.
            It fits gently into the routine you already love.
          </p>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="scroll-mt-24 bg-[#F7EFDF]/60 border-y border-[#EADFC7]">
        <div className="container-x py-24 md:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <div className="eyebrow">Loved by</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-[#3B2E25]">Women who <span className="italic text-[#AD9752]">know</span> their skin</h2>
            <div className="mt-6 flex items-center justify-center gap-2 text-[11px] tracking-[0.18em] text-[#7A6A5E]">
              <FractionalStars value={4.8} size="h-3.5 w-3.5" />
              <span>4.8 · 2000+ verified reviews</span>
            </div>
          </div>


          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {[
              { name: "Priya M.", age: 46, months: 3, quote: "My skin looks brighter, my energy is steady, and I finally feel like myself again." },
              { name: "Elena R.", age: 52, months: 4, quote: "The first thing where friends actually started asking what I was doing differently. That was the moment." },
              { name: "Marina K.", age: 41, months: 6, quote: "By week six my skin had this glow I hadn't seen since my thirties. I'll never stop taking it." },
              { name: "Naomi J.", age: 49, months: 5, quote: "I've spent thousands on serums. This works on the layer underneath — where actual aging happens." },
              { name: "Sofia B.", age: 44, months: 2, quote: "It's the calmest, most unglamorous morning capsule that has quietly done the most for my skin." },
              { name: "Amelia T.", age: 55, months: 8, quote: "Eight months in. My complexion is more even, my mornings are easier, and my hairdresser noticed my hair felt healthier." },
            ].map((r) => (
              <figure key={r.name} className="bg-[#FDF8EE] border border-[#EADFC7] p-8">
                <div className="flex gap-0.5 text-[#AD9752]">{[0,1,2,3,4].map(i => <Star key={i} className="h-3 w-3 fill-current" />)}</div>
                <blockquote className="mt-5 font-display italic text-xl leading-relaxed text-[#3B2E25]">"{r.quote}"</blockquote>
                <figcaption className="mt-6 pt-5 border-t border-[#EADFC7] flex items-center justify-between">
                  <div>
                    <div className="caps-label text-[#3B2E25]">{r.name}</div>
                    <div className="text-[11px] text-[#7A6A5E] tracking-wide mt-1">Age {r.age} · {r.months} months in</div>
                  </div>
                  <div className="caps-label text-[#6B7A4B] text-[10px] inline-flex items-center gap-1">
                    <Check className="h-3 w-3" /> Verified
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FDF8EE]">
        <div className="container-x py-24 md:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <div className="eyebrow">Questions</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-[#3B2E25]">Everything you might <span className="italic text-[#AD9752]">wonder</span></h2>
          </div>
          <div className="mt-14 max-w-2xl mx-auto divide-y divide-[#EADFC7] border-y border-[#EADFC7]">
            {[
              { q: "When will I see skin results?", a: "Most women notice a change in energy in the first two weeks. Skin brightness and evenness typically begin around weeks 3–4, with the most beautiful results compounding by weeks 6–8. Consistency is the ritual." },
              { q: "Can I take it with collagen or my other vitamins?", a: "Yes — Seralie NMN was designed to complement the routine you already love. It works beautifully alongside collagen, multivitamins, omega-3s, and your favorite skincare." },
              { q: "Is it safe to take long-term?", a: "NMN has an excellent safety profile. Our formula is single-ingredient, third-party tested, and made in a GMP-certified US facility. If you're pregnant, nursing, or on medication, speak with your healthcare provider first." },
              { q: "What is NMN versus NR?", a: "Both are NAD+ precursors, but NMN is the more direct — one step closer to NAD+ in the cellular pathway. It's the molecule the leading longevity research has focused on." },
              { q: "Why not the cheap NMN on Amazon?", a: "Independent testing has repeatedly found that many low-cost NMN products contain little actual β-NMN — often just nicotinamide or under-dose formulas. Seralie is the real molecule, at the real dose, verified in every batch." },
              { q: "What if it isn't for me?", a: "Try Seralie for 30 days. If you don't feel it, we'll refund every penny. Keep the bottle. That's the guarantee." },
            ].map((item, i) => (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="w-full flex items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="font-display text-xl text-[#3B2E25]">{item.q}</span>
                  <span className={`shrink-0 h-8 w-8 border border-[#AD9752] text-[#AD9752] flex items-center justify-center transition-transform ${openFaq === i ? "rotate-45" : ""}`}>
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${openFaq === i ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="text-[15px] leading-8 text-[#5A483C] max-w-xl">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="bg-[#F7EFDF]/60">
        <div className="container-x py-20 text-center max-w-2xl mx-auto">
          <div className="inline-flex h-14 w-14 items-center justify-center border border-[#AD9752] text-[#AD9752]">
            <ShieldCheck className="h-5 w-5" strokeWidth={1.4} />
          </div>
          <h2 className="mt-6 font-display text-3xl md:text-4xl text-[#3B2E25]">30-Day Money-Back Guarantee</h2>
          <p className="mt-4 text-[15px] leading-8 text-[#5A483C]">
            Try Seralie NMN for 30 days. If it isn't right for you, we'll refund every penny — no questions asked.
          </p>
        </div>
      </section>

      {/* FDA disclaimer */}
      <section className="bg-[#FDF8EE] border-t border-[#EADFC7]">
        <div className="container-x py-10 text-center max-w-3xl mx-auto">
          <p className="text-[11px] text-[#7A6A5E] tracking-wide leading-6 italic font-display">
            These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </section>

      {/* STICKY BAR (mobile especially) */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-30 bg-[#FDF8EE]/95 backdrop-blur border-t border-[#EADFC7] transition-transform duration-300 ${showSticky ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="container-x py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-11 w-11 bg-[#FDF8EE] overflow-hidden shrink-0">
              <img src={GALLERY[0]} alt="" className="h-full w-full object-cover mix-blend-multiply" />
            </div>
            <div className="min-w-0">
              <div className="font-display text-sm text-[#3B2E25] leading-tight truncate">Seralie NMN — {bundle.label}</div>
              <div className="text-[11px] text-[#7A6A5E] tracking-wide tabular-nums">${bundle.price.toFixed(2)} · ${bundle.perBottle.toFixed(2)}/bottle</div>
            </div>
          </div>
          <button
            onClick={handleAdd}
            disabled={adding}
            className="shrink-0 bg-[#AD9752] hover:bg-[#94803F] text-white caps-label text-[11px] px-5 py-3.5 transition-colors disabled:opacity-60"
          >
            {adding ? "Adding…" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="fixed inset-0 z-[90] bg-black flex items-center justify-center" onClick={() => setLightbox(false)}>
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(false); }}
            className="absolute top-4 right-4 text-white/80 hover:text-white h-10 w-10 flex items-center justify-center"
            aria-label="Close"
          ><XIcon className="h-6 w-6" /></button>
          <button
            onClick={(e) => { e.stopPropagation(); setActive((a) => (a - 1 + GALLERY.length) % GALLERY.length); }}
            className="absolute left-2 md:left-6 text-white/80 hover:text-white h-12 w-12 flex items-center justify-center"
            aria-label="Previous"
          ><ChevronLeft className="h-8 w-8" /></button>
          <img src={GALLERY[active]} alt="" className="max-h-[92vh] max-w-[92vw] object-contain" onClick={(e) => e.stopPropagation()} />
          <button
            onClick={(e) => { e.stopPropagation(); setActive((a) => (a + 1) % GALLERY.length); }}
            className="absolute right-2 md:right-6 text-white/80 hover:text-white h-12 w-12 flex items-center justify-center"
            aria-label="Next"
          ><ChevronRight className="h-8 w-8" /></button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {GALLERY.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setActive(i); }}
                className={`h-1.5 w-6 transition ${active === i ? "bg-white" : "bg-white/30 hover:bg-white/60"}`}
                aria-label={`Show ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* SUPPLEMENT FACTS MODAL */}
      {showFacts && (
        <div className="fixed inset-0 z-[90] bg-[#3B2E25]/70 backdrop-blur flex items-center justify-center p-4" onClick={() => setShowFacts(false)}>
          <div className="bg-[#FDF8EE] max-w-lg w-full max-h-[92vh] overflow-auto border border-[#EADFC7]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-[#EADFC7]">
              <div>
                <div className="eyebrow text-[#AD9752]">Label</div>
                <div className="mt-1 font-display text-2xl text-[#3B2E25]">Supplement Facts</div>
              </div>
              <button onClick={() => setShowFacts(false)} aria-label="Close" className="h-9 w-9 text-[#5A483C] hover:text-[#3B2E25] flex items-center justify-center">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5">
              <img src={supplementFacts.url} alt="Seralie NMN Supplement Facts" className="w-full h-auto" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
