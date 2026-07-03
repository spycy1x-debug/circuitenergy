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
import gmpFacility from "@/assets/seralie-gmp-facility.png.asset.json";
import gmpCertificate from "@/assets/seralie-gmp-certificate.png.asset.json";
import batchTested from "@/assets/seralie-batch-tested.png.asset.json";
// Review wall photos
import rwTennis from "@/assets/nmn-review-tennis.png.asset.json";
import rwCar from "@/assets/nmn-review-car.png.asset.json";
import rwPool from "@/assets/nmn-review-pool.png.asset.json";
import rwPilates from "@/assets/nmn-review-pilates.png.asset.json";
import rwBalcony from "@/assets/nmn-review-balcony.png.asset.json";
import rwKitchen from "@/assets/nmn-review-kitchen-flowers.png.asset.json";
import rwMirror from "@/assets/nmn-review-bathroom-mirror.png.asset.json";

type WallReview = { r: number; t: string; n: string; a: number; img?: string; long?: boolean };
const WALL_REVIEWS: WallReview[] = [
  { r: 5, t: "Three months in and my esthetician asked what I changed. That's all the proof I needed.", n: "Daniela", a: 50, img: rwCar.url },
  { r: 5, t: "I bought it for the skin benefits, but honestly the 3pm energy dip disappearing is what keeps me reordering.", n: "Karen", a: 44, img: rwKitchen.url },
  { r: 5, t: "I did my research — most NMN on Amazon isn't even real NMN. The testing info is why I chose Seralie.", n: "Mei", a: 47, img: rwTennis.url },
  { r: 4, t: "Took about five weeks before I noticed anything, so be patient. But my skin looks brighter and I sleep better. Wish it worked faster, hence 4 stars.", n: "Susan", a: 58, long: true },
  { r: 5, t: "One capsule with my morning coffee. Easiest thing in my whole routine and the one I'd give up last.", n: "Aisha", a: 48, img: rwBalcony.url },
  { r: 5, t: "My husband started stealing mine. Ordering the 3-pack now.", n: "Rosa", a: 55 },
  { r: 5, t: "I've spent more on a single serum than this costs for a month. My skin has never looked this awake.", n: "Priya", a: 44, img: rwMirror.url },
  { r: 5, t: "Turned 60 this year and feel more like myself than I did at 55. Started as a skeptic.", n: "Gloria", a: 61, img: rwPool.url },
  { r: 4, t: "Good product, packaging is beautiful. Only reason for 4 stars is I wish there was a subscription option.", n: "Jennifer", a: 40 },
  { r: 5, t: "The photo test: I stopped hating pictures of myself. That's worth every penny.", n: "Michelle", a: 46, img: rwPilates.url },
  { r: 5, t: "As a nurse I read labels for a living. Real dose, real ingredient, third-party tested. It's the only supplement brand I've ever reviewed.", n: "Denise", a: 52, long: true },
  { r: 5, t: "Week 8: my nails are stronger, my skin is calmer, and I have energy after work for the first time in years.", n: "Amara", a: 39 },
  // additional 40
  { r: 5, t: "Glow is real. Cheeks look plumper without me changing a thing in my skincare.", n: "Elena", a: 42 },
  { r: 5, t: "I feel less foggy in the mornings. Small thing but it changed my whole day.", n: "Beatrice", a: 49 },
  { r: 5, t: "My mom noticed before I did. She's ordering her own now.", n: "Chloe", a: 38 },
  { r: 4, t: "Solid product. Took about a month. Wish the bottle was slightly bigger for the price.", n: "Hannah", a: 45 },
  { r: 5, t: "Sleep quality is noticeably better. I wake up actually rested.", n: "Yumi", a: 51 },
  { r: 5, t: "Skin on my hands looks younger. That's the first place I always saw the age.", n: "Margaret", a: 57 },
  { r: 5, t: "Been through every trend. This one earned the spot on my counter.", n: "Sasha", a: 43 },
  { r: 5, t: "Finally something that doesn't taste like anything or upset my stomach.", n: "Ines", a: 41 },
  { r: 5, t: "I'm 54 and get carded at wine bars again. Coincidence? I don't care.", n: "Vivian", a: 54 },
  { r: 3, t: "Decent. I think I need more time. Two months in, subtle changes.", n: "Rachel", a: 47 },
  { r: 5, t: "Recommended by my dermatologist. That was enough for me.", n: "Kavita", a: 46 },
  { r: 5, t: "My under-eyes look brighter and I'm not editing photos anymore.", n: "Naomi", a: 39 },
  { r: 5, t: "Bought it for my anniversary trip. Skin looked incredible in every photo.", n: "Camille", a: 48 },
  { r: 4, t: "Good. Skin more even. Would love if it came in a larger bottle.", n: "Diane", a: 60 },
  { r: 5, t: "Never leaving a review before. Had to for this one.", n: "Angela", a: 50 },
  { r: 5, t: "My skin drinks moisturizer differently now. Hard to explain, but it's true.", n: "Farah", a: 45 },
  { r: 5, t: "Perimenopause skin was rough. This helped more than any cream.", n: "Sophie", a: 47 },
  { r: 5, t: "Been on it 6 months. Not stopping.", n: "Grace", a: 52 },
  { r: 2, t: "Didn't feel much difference for me personally. Might just not be my thing.", n: "Barbara", a: 55 },
  { r: 5, t: "Hair grew faster too. Wasn't expecting that.", n: "Lucia", a: 44 },
  { r: 5, t: "Simple, clean, works. That's all I want in a supplement.", n: "Nina", a: 40 },
  { r: 5, t: "Skin looks lit from inside. My favorite compliment to receive.", n: "Talia", a: 43 },
  { r: 5, t: "Reordered before my first bottle ended. That says everything.", n: "Marisol", a: 49 },
  { r: 4, t: "Noticed the energy first. Skin took longer but it did come.", n: "Erin", a: 46 },
  { r: 5, t: "I've tried NAD IVs. This is 10% of the cost and I feel similar.", n: "Adriana", a: 53 },
  { r: 5, t: "Feels like a treatment, not a supplement.", n: "Zara", a: 41 },
  { r: 5, t: "Neck looks better. That's where I really see the age.", n: "Louise", a: 58 },
  { r: 3, t: "Fine. Not life-changing for me but nothing negative to say.", n: "Karen T.", a: 51 },
  { r: 5, t: "My skincare works better now. Serums actually sink in.", n: "Isabelle", a: 42 },
  { r: 5, t: "Bought as a gift for my sister. She called me crying.", n: "Yara", a: 45 },
  { r: 5, t: "Post-workout recovery feels quicker in my 50s.", n: "Tessa", a: 52 },
  { r: 5, t: "Third bottle. Not going back.", n: "Renata", a: 47 },
  { r: 5, t: "I forget I'm taking it. Then people ask what I'm doing differently.", n: "Simone", a: 44 },
  { r: 4, t: "Solid. Consistent. I wish shipping was a touch faster.", n: "Melanie", a: 39 },
  { r: 5, t: "Menopause hit me hard. This softened everything about it.", n: "Deborah", a: 56 },
  { r: 5, t: "Clean ingredient list, no fillers. Exactly what I look for.", n: "Priyanka", a: 40 },
  { r: 5, t: "My esthetician asked what changed at my last facial. That was the moment.", n: "Alicia", a: 48 },
  { r: 5, t: "I feel like myself again. That's the best way I can put it.", n: "Miriam", a: 53 },
  { r: 5, t: "Better than any face oil I've tried, and I've tried them all.", n: "Cara", a: 46 },
  { r: 5, t: "One month in and my jawline looks tighter. Not imagining it.", n: "Bianca", a: 44 },
];

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
            <Star className={`${size} text-[#AD9752]/25`} strokeWidth={1.5} />
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
  const [wallVisible, setWallVisible] = useState(12);
  const [wallImg, setWallImg] = useState<string | null>(null);

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
              className="relative block w-full aspect-square overflow-hidden rounded-2xl border border-[#EADFC7] shadow-[0_20px_50px_-25px_rgba(59,46,37,0.25)] group"
              aria-label="View larger"
            >
              <img
                src={GALLERY[active]}
                alt={`Seralie NMN — view ${active + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="eager"
              />
            </button>

            <div className="mt-3 grid grid-cols-5 sm:grid-cols-8 gap-2">
              {GALLERY.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show image ${i + 1}`}
                  aria-current={active === i}
                  className={`aspect-square overflow-hidden rounded-lg border transition-all ${active === i ? "border-[#AD9752] ring-1 ring-[#AD9752]/30" : "border-[#EADFC7] hover:border-[#AD9752]/60"}`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
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
            <p className="mt-2 text-center text-[10px] tracking-[0.24em] uppercase text-[#7A6A5E]">
              Third-Party Tested <span className="text-[#AD9752]">·</span> GMP-Certified <span className="text-[#AD9752]">·</span> Made in USA
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

      {/* WHY YOUR BODY NEEDS THIS */}
      <section className="bg-[#FDF8EE]">
        <div className="container-x py-28 md:py-[120px]">
          <div className="max-w-5xl mx-auto space-y-24 md:space-y-32">
            {/* Beat 1 */}
            <div className="text-center max-w-2xl mx-auto">
              <div className="eyebrow">The science, simply</div>
              <h2 className="mt-5 font-display text-4xl md:text-5xl text-[#3B2E25] leading-tight">
                Around 35, your NAD+ <span className="italic text-[#AD9752]">starts to decline</span>.
              </h2>
              <p className="mt-7 text-[15px] md:text-base leading-8 text-[#5A483C]">
                NAD+ is the molecule every cell uses to produce energy, repair DNA, and renew itself — and levels fall by roughly half between your 20s and 50s.
              </p>
              <p className="mt-4 text-[15px] md:text-base leading-8 text-[#5A483C]">
                It's why energy dips sooner, skin bounces back slower, and mornings feel different than they used to.
              </p>
            </div>

            {/* Beat 2 — graph */}
            <div className="max-w-3xl mx-auto">
              <div className="text-center caps-label text-[#3B2E25] mb-6">Your NAD+ Levels</div>
              <div className="relative w-full aspect-[16/8]">
                <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="none" aria-hidden="true">
                  {/* baseline */}
                  <line x1="60" y1="360" x2="770" y2="360" stroke="#EADFC7" strokeWidth="1" />
                  <line x1="60" y1="40" x2="60" y2="360" stroke="#EADFC7" strokeWidth="1" />
                  {/* curve descending */}
                  <path
                    d="M 60 70 C 220 90, 320 170, 420 230 S 640 340, 770 355"
                    fill="none"
                    stroke="#AD9752"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* you are here dot around age 40 (~x=340) */}
                  <circle cx="340" cy="190" r="9" fill="#AD9752" />
                  <circle cx="340" cy="190" r="16" fill="none" stroke="#AD9752" strokeOpacity="0.35" strokeWidth="1.5" />
                </svg>
                <div
                  className="absolute font-display italic text-[#3B2E25] text-sm md:text-base"
                  style={{ left: "43%", top: "38%" }}
                >
                  you may be here
                </div>
              </div>
              <div className="mt-4 flex justify-between text-[10px] tracking-[0.24em] uppercase text-[#7A6A5E] px-1">
                <span>Age 20</span>
                <span>→</span>
                <span>Age 60</span>
              </div>
            </div>

            {/* Beat 3 */}
            <div className="text-center max-w-2xl mx-auto">
              <div className="eyebrow">The solution</div>
              <h2 className="mt-5 font-display text-4xl md:text-5xl text-[#3B2E25] leading-tight">
                NMN is the <span className="italic text-[#AD9752]">direct precursor</span>.
              </h2>
              <p className="mt-7 text-[15px] md:text-base leading-8 text-[#5A483C]">
                You can't take NAD+ directly — the molecule is too large to absorb. NMN converts to NAD+ in a single step, which is why it's the focus of published human research on healthy aging.
              </p>
              <p className="mt-4 text-[15px] md:text-base leading-8 text-[#5A483C]">
                Seralie delivers 500 mg of pure β-NMN per capsule — the level used in studies, not a sprinkle.
              </p>
              <a
                href="#top"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="mt-10 inline-block caps-label text-[#AD9752] border-b border-[#AD9752]/40 hover:border-[#AD9752] pb-1 transition-colors"
              >
                Choose your ritual ↑
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT — timeline */}
      <section className="bg-[#F7EFDF]/60 border-y border-[#EADFC7]">
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
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#EADFC7] shadow-[0_20px_50px_-25px_rgba(59,46,37,0.25)]">
              <img src={GALLERY[5]} alt="Seralie NMN — clean formulation" className="h-full w-full object-cover" loading="lazy" />
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




      {/* PROOF, NOT PROMISES */}
      <section className="bg-[#FDF8EE]">
        <div className="container-x py-28 md:py-[120px]">
          {/* Row 1 — header */}
          <div className="text-center max-w-2xl mx-auto">
            <div className="eyebrow">The Seralie Standard</div>
            <h2 className="mt-5 font-display text-4xl md:text-5xl text-[#3B2E25]">
              Proof, <span className="italic text-[#AD9752]">Not Promises.</span>
            </h2>
            <p className="mt-6 text-[15px] md:text-base leading-8 text-[#5A483C]">
              Every batch of Seralie NMN is independently tested. Here's what ours showed.
            </p>
          </div>

          {/* Row 2 — two columns */}
          <div className="mt-20 md:mt-24 max-w-5xl mx-auto grid gap-14 md:gap-16 md:grid-cols-2 items-center">
            <div>
              <div className="overflow-hidden rounded-2xl border border-[#EADFC7] shadow-[0_20px_50px_-25px_rgba(59,46,37,0.25)] bg-[#FDF8EE]">
                <img src={gmpCertificate.url} alt="Seralie GMP certificate — independently audited, GMP-certified US manufacturing" className="w-full h-auto object-cover" loading="lazy" />
              </div>
              <p className="mt-5 text-center text-[10px] tracking-[0.24em] uppercase text-[#7A6A5E] leading-relaxed">
                Independently Audited <span className="text-[#AD9752]">·</span> GMP-Certified US Manufacturing
              </p>
            </div>
            <div>
              <div className="overflow-hidden rounded-2xl border border-[#EADFC7] shadow-[0_20px_50px_-25px_rgba(59,46,37,0.25)] bg-[#FDF8EE]">
                <img src={batchTested.url} alt="Independent laboratory batch test results for Seralie NMN" className="w-full h-auto object-cover" loading="lazy" />
              </div>
              <p className="mt-5 text-center">
                <a
                  href="mailto:support@seralie.com?subject=COA%20Request"
                  className="caps-label text-[#AD9752] border-b border-[#AD9752]/40 hover:border-[#AD9752] pb-0.5 transition-colors"
                >
                  Request the full Certificate of Analysis →
                </a>
              </p>
            </div>
          </div>
          {/* Row 3 — facility */}
          <div className="mt-16 md:mt-20 max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-2xl border border-[#EADFC7] shadow-[0_20px_50px_-25px_rgba(59,46,37,0.25)] bg-[#FDF8EE]">
              <img src={gmpFacility.url} alt="GMP-certified facility where Seralie NMN is made" className="w-full h-auto object-cover" loading="lazy" />
            </div>
            <p className="mt-5 text-center text-[10px] tracking-[0.24em] uppercase text-[#7A6A5E] leading-relaxed">
              GMP-Certified Facility <span className="text-[#AD9752]">·</span> US Manufacturing
            </p>
          </div>

          {/* Row 4 — thin trust strip */}
          <div className="mt-24 max-w-4xl mx-auto">
            <div className="h-px bg-[#AD9752]/40" />
            <div className="py-6 text-center text-[10px] md:text-[11px] tracking-[0.24em] uppercase text-[#3B2E25] leading-loose">
              Third-Party Tested <span className="text-[#AD9752] mx-2">·</span> GMP-Certified Facility <span className="text-[#AD9752] mx-2">·</span> Real β-NMN, Verified <span className="text-[#AD9752] mx-2">·</span> Made in USA
            </div>
            <div className="h-px bg-[#AD9752]/40" />
          </div>
        </div>
      </section>

      {/* REVIEW WALL */}
      <section id="reviews" className="scroll-mt-24 bg-[#FDF8EE]">
        <div className="container-x py-24 md:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <div className="eyebrow">Real Women, Real Rituals</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-[#3B2E25]">Loved by <span className="italic text-[#AD9752]">Thousands</span></h2>
            <div className="mt-5 inline-flex items-center gap-2 text-[13px] tracking-wide text-[#5A483C]">
              <FractionalStars value={4.8} size="h-4 w-4" />
              <span className="text-[#3B2E25] font-medium">4.8</span>
              <span className="text-[#AD9752]">·</span>
              <span>based on verified reviews</span>
            </div>
          </div>

          <div className="mt-14 columns-2 md:columns-3 gap-4 [column-fill:_balance]">
            {WALL_REVIEWS.slice(0, wallVisible).map((rv, i) => (
              <article
                key={i}
                className="mb-4 break-inside-avoid bg-[#FDF8EE] border border-[#EADFC7] rounded-[12px] shadow-[0_2px_10px_-4px_rgba(59,46,37,0.08)] hover:shadow-[0_18px_40px_-20px_rgba(59,46,37,0.25)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
              >
                {rv.img && (
                  <button
                    type="button"
                    onClick={() => setWallImg(rv.img!)}
                    className="block w-full"
                    aria-label={`Open photo from ${rv.n}`}
                  >
                    <img src={rv.img} alt={`Customer photo — ${rv.n}`} className="w-full h-auto block" loading="lazy" />
                  </button>
                )}
                <div className={`p-5 ${!rv.img && rv.long ? "py-7" : ""}`}>
                  <FractionalStars value={rv.r} size="h-3.5 w-3.5" />
                  <p className={`mt-3 text-[#3B2E25] leading-relaxed ${!rv.img ? "font-display italic text-[19px] md:text-[21px]" : "text-[14px]"}`}>
                    {rv.img ? rv.t : `"${rv.t}"`}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="text-[13px] text-[#3B2E25]">
                      <span className="font-medium">{rv.n}</span>
                      <span className="text-[#7A6A5E]">, {rv.a}</span>
                    </div>
                    <span className="text-[10px] tracking-[0.14em] uppercase text-[#AD9752] whitespace-nowrap">✓ Verified Buyer</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {wallVisible < WALL_REVIEWS.length && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setWallVisible((v) => v + 12)}
                className="btn-gold-ghost"
              >
                Load More Reviews
              </button>
            </div>
          )}
        </div>
      </section>

      {/* REVIEW PHOTO LIGHTBOX */}
      {wallImg && (
        <div className="fixed inset-0 z-[92] bg-black flex items-center justify-center" onClick={() => setWallImg(null)}>
          <button
            onClick={(e) => { e.stopPropagation(); setWallImg(null); }}
            className="absolute top-4 right-4 text-white/80 hover:text-white h-10 w-10 flex items-center justify-center"
            aria-label="Close"
          ><XIcon className="h-6 w-6" /></button>
          <img src={wallImg} alt="" className="max-h-[92vh] max-w-[92vw] object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* FAQ */}
      <section className="bg-[#F7EFDF]/60 border-y border-[#EADFC7]">
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
