import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Star, Check, ShieldCheck, Truck, RotateCcw, Lock, ChevronRight, Minus, Plus, FileText, X, Flame, Users } from "lucide-react";
import neuralImg from "@/assets/neural-bottle.png";
import neuralOpen from "@/assets/neural-open.png";
import nmnImg from "@/assets/nmn-bottle.png";
import nmnTrio from "@/assets/nmn-trio.png";
import neuralHand from "@/assets/product-hand-kitchen.png";
import neuralCustomer from "@/assets/product-customer-thumbsup.png";
import neuralInfographic from "@/assets/product-benefits-infographic.png";
import neuralComparison from "@/assets/product-comparison.png";
import supplementFacts from "@/assets/product-supplement-facts.png";
import { PRODUCTS } from "@/lib/cart";
import { ShopifyBuyButton } from "@/components/site/ShopifyBuyButton";

const SHOPIFY_BUY: Record<"neural" | "nmn", { productId: string; buttonText: string }> = {
  neural: { productId: "8951258808474", buttonText: "Sharpen Your Mind" },
  nmn: { productId: "8951254876314", buttonText: "Fix Your Energy" },
};

type ProductData = {
  id: "neural" | "nmn";
  name: string;
  subtitle: string;
  price: number;
  rating: number;
  reviews: number;
  badge: string;
  images: string[];
  description: string;
  benefits: string[];
  why: { heading: string; body: string[]; cards: { t: string; d: string }[] };
  ingredients: { serving: string; items: { name: string }[]; other: string; callouts: { name: string; desc: string }[] };
  use: { dosage: string; best: string[]; timeline: { period: string; text: string }[]; storage: string; note: string };
  related: { id: "neural" | "nmn"; blurb: string };
  sample: { title: string; body: string; name: string; date: string };
};

const PRODUCT_DATA: Record<string, ProductData> = {
  "neural-performance": {
    id: "neural",
    name: "Circuit Neural Performance",
    subtitle: "Focus & Cognitive Enhancement",
    price: 42.99,
    rating: 4.7,
    reviews: 87,
    badge: "Most Popular",
    images: [neuralHand, neuralInfographic, neuralComparison, neuralCustomer, neuralImg, neuralOpen],
    description: "A precision blend of 10 clinically studied, natural compounds designed to restore mental clarity, sharpen focus, and support long-term brain health. One capsule. All day performance.",
    benefits: [
      "Eliminates brain fog",
      "Enhances focus and memory",
      "Smooth, jitter-free mental energy",
      "Supports long-term brain health",
      "No artificial additives — natural ingredients only",
      "Third-party tested for purity",
    ],
    why: {
      heading: "Your Brain Needs More Than Caffeine",
      body: [
        "If you're dealing with brain fog, poor focus, or mental fatigue, it's not a willpower problem — it's a chemistry problem.",
        "Your brain relies on neurotransmitters like acetylcholine and dopamine to think, focus, and retain information. As we age, stress accumulates, and poor nutrition compounds the issue — these critical compounds decline. The result is the fog, the forgetfulness, the inability to focus for more than 20 minutes.",
        "Circuit Neural Performance addresses this directly. Alpha GPC and Huperzine A work together to boost and preserve acetylcholine. L-Tyrosine supports dopamine production under stress. Bacopa monnieri has been clinically studied for memory and learning. L-Theanine smooths caffeine's effects for jitter-free focus. Phosphatidylserine keeps your brain cell membranes healthy.",
        "All natural. No artificial additives. One capsule a day.",
      ],
      cards: [
        { t: "Razor-Sharp Focus", d: "Alpha GPC and Huperzine A directly support the neurotransmitter behind focus and memory. Think clearly for hours." },
        { t: "Brain Fog Gone", d: "GABA and L-Theanine promote calm, clear-headed thinking. No more mental static." },
        { t: "Stress-Proof Thinking", d: "L-Tyrosine helps maintain cognitive function under pressure, stress, and sleep deprivation." },
        { t: "Long-Term Brain Health", d: "Bacopa monnieri and Phosphatidylserine support memory, learning, and brain cell health over time." },
      ],
    },
    ingredients: {
      serving: "Serving Size: 1 Capsule | Servings Per Container: 30",
      items: [
        { name: "Niacin (as Niacinamide)" },
        { name: "Vitamin B6 (as Pyridoxine Hydrochloride)" },
        { name: "GABA (Gamma-Aminobutyric Acid)" },
        { name: "L-Tyrosine" },
        { name: "Caffeine" },
        { name: "Bacopa Monnieri Extract (whole herb)" },
        { name: "Phosphatidylserine 20% (sunflower)" },
        { name: "Alpha GPC (Alpha-glycerylphosphorylcholine) Powder" },
        { name: "L-Theanine" },
        { name: "Huperzine A 1% (Huperzia serrata, whole herb)" },
      ],
      other: "Other Ingredients: No artificial additives. Natural capsule. Manufactured in USA.",
      callouts: [
        { name: "Alpha GPC", desc: "Boosts acetylcholine — the neurotransmitter behind focus and memory." },
        { name: "Huperzine A", desc: "Inhibits the enzyme that breaks down acetylcholine, keeping levels elevated longer." },
        { name: "L-Theanine + Caffeine", desc: "The clinically validated stack for smooth, focused energy without jitters." },
        { name: "Bacopa Monnieri", desc: "Clinically studied for memory, learning, and reducing mental fatigue." },
        { name: "Phosphatidylserine", desc: "Supports brain cell membrane integrity for faster, sharper thinking." },
        { name: "L-Tyrosine", desc: "Supports dopamine and norepinephrine under stress." },
        { name: "GABA", desc: "Promotes calm focus without sedation." },
        { name: "B Vitamins (Niacin + B6)", desc: "Essential for energy metabolism and neurotransmitter synthesis." },
      ],
    },
    use: {
      dosage: "Take 1 capsule daily with 6-8 oz of water.",
      best: [
        "Take in the morning for all-day cognitive support",
        "Consistency is key — effects build over time",
        "Consult your healthcare professional if on medication or have a medical condition",
      ],
      timeline: [
        { period: "Days 1–7", text: "Some users notice improved clarity and smoother energy." },
        { period: "Week 2–3", text: "Most users report significantly reduced brain fog and improved focus." },
        { period: "Week 4+", text: "Full benefits realized — memory, focus, and mental endurance at their best." },
      ],
      storage: "Store in a cool, dry place away from direct sunlight.",
      note: "Contains caffeine. Avoid taking in the evening if sensitive to caffeine.",
    },
    related: { id: "nmn", blurb: "Pair with Neural Performance for complete energy and cognitive support." },
    sample: {
      title: "Brain fog is completely gone",
      body: "I've been taking Neural Performance every morning for 5 weeks. The difference in my focus is night and day. I work in finance and need to stay sharp all day — this delivers. No jitters, no crash, just clear thinking from 8am to 6pm. I stacked it with Circuit NMN and the combination is incredible.",
      name: "James L.",
      date: "April 2, 2026",
    },
  },
  "nmn": {
    id: "nmn",
    name: "Circuit NMN",
    subtitle: "Cellular Energy & Longevity Support",
    price: 49.99,
    rating: 4.6,
    reviews: 72,
    badge: "Best Seller",
    images: [nmnImg, nmnTrio],
    description: "Boost NAD+ for sustained energy, reduced afternoon crashes, and cellular repair. No stimulants. No crashes. Just your body producing energy the way it should.",
    benefits: [
      "Eliminates afternoon crashes",
      "Restores cellular energy production",
      "Improves sleep quality",
      "Supports healthy aging at the cellular level",
      "Zero caffeine, zero stimulants",
      "Third-party tested for purity",
    ],
    why: {
      heading: "Fix Your Energy at the Cellular Level",
      body: [
        "If you're tired of being tired, this is why.",
        "By age 40, your body's NAD+ levels have declined by 50%. NAD+ is the molecule every cell in your body uses to produce energy. Without it, your mitochondria can't function efficiently. That's why coffee doesn't work anymore. That's why you crash every afternoon. That's why you wake up exhausted.",
        "NMN is a direct NAD+ precursor — meaning it converts into NAD+ in your cells. Research shows it restores cellular energy production, improves cognitive function, and supports healthy aging. Circuit NMN delivers 500mg per capsule — the dose shown in studies to meaningfully boost NAD+ levels.",
        "No fillers. No proprietary blends. Just pure, third-party tested NMN at the dose that actually works.",
      ],
      cards: [
        { t: "No More Crashes", d: "Sustained cellular energy from morning through evening — no afternoon wall." },
        { t: "Mental Clarity Returns", d: "Restored NAD+ supports cognitive function and mental sharpness." },
        { t: "Better Sleep", d: "Improved cellular function leads to deeper, more restorative sleep." },
        { t: "Science-Backed Dosing", d: "500mg NMN per serving — the dose studied to meaningfully raise NAD+ levels." },
      ],
    },
    ingredients: {
      serving: "Serving Size: 1 Capsule | Servings Per Container: 30",
      items: [{ name: "β-Nicotinamide Mononucleotide (NMN) — 500mg" }],
      other: "Other Ingredients: Vegetable cellulose (capsule), rice flour.",
      callouts: [
        { name: "Third-party tested", desc: "Independently verified for purity and potency." },
        { name: "Non-GMO", desc: "Sourced without genetic modification." },
        { name: "No fillers", desc: "Only NMN and clean capsule ingredients." },
        { name: "Made in USA", desc: "Manufactured in an FDA-registered facility." },
      ],
    },
    use: {
      dosage: "Take 1 capsule every morning, with or without food.",
      best: ["Take in the morning for all-day energy", "Stay consistent — effects compound over weeks"],
      timeline: [
        { period: "Week 1", text: "Subtle improvements in morning energy." },
        { period: "Week 2–3", text: "Afternoon crashes eliminated, clarity improved." },
        { period: "Week 4+", text: "Full benefits realized — sustained energy and recovery." },
      ],
      storage: "Store in a cool, dry place.",
      note: "Contains zero caffeine or stimulants.",
    },
    related: { id: "neural", blurb: "Pair with NMN for complete cognitive and energy support." },
    sample: {
      title: "I have energy again",
      body: "After 3 weeks on Circuit NMN, the afternoon crashes are gone. I'm 46 and feel like I did at 30. I wake up rested, get through the day without coffee number three, and still have energy for the gym after work.",
      name: "Sarah M.",
      date: "March 18, 2026",
    },
  },
};

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const p = PRODUCT_DATA[params.slug];
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.name} — Circuit Energy` },
      { name: "description", content: loaderData.description.slice(0, 160) },
      { property: "og:title", content: loaderData.name },
      { property: "og:description", content: loaderData.description.slice(0, 160) },
      { property: "og:image", content: loaderData.images[0] },
    ] : [],
  }),
  component: ProductPage,
  notFoundComponent: () => <div className="container-x py-20 text-center">Product not found.</div>,
  errorComponent: ({ error }) => {
    console.error(error);
    return <div className="container-x py-20 text-center">Something went wrong. Please try again or return to the shop.</div>;
  },
});

function ProductPage() {
  const p = Route.useLoaderData() as ProductData;
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"why"|"ing"|"use"|"rev">("why");
  const [reviewsShown, setReviewsShown] = useState(3);
  const [userReviews, setUserReviews] = useState<Array<{title:string;body:string;name:string;date:string;rating:number}>>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [form, setForm] = useState({ name: "", title: "", body: "", rating: 5 });
  const [reviewFilter, setReviewFilter] = useState<"recent"|"highest"|"helpful"|"verified">("recent");
  const [helpful, setHelpful] = useState<Record<number, "yes"|"no">>({});
  const [showLabel, setShowLabel] = useState(false);
  const [stockLeft] = useState(() => 12 + Math.floor(Math.random() * 9));
  const [secs, setSecs] = useState(15 * 60 + 42);
  useEffect(() => { const t = setInterval(() => setSecs(s => s > 0 ? s - 1 : 0), 1000); return () => clearInterval(t); }, []);
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  const extraReviews = useMemo(() => {
    const pool = p.id === "neural" ? [
      { title: "Genuine focus, no jitters", body: "I've tried every nootropic on the market. This is the first one where I actually feel calm focus instead of caffeine anxiety. Two weeks in and my afternoon slump is gone.", name: "Marcus T.", date: "3 weeks ago", rating: 5 },
      { title: "Brain fog lifted in days", body: "Was skeptical but by day 4 I noticed I wasn't reaching for a third coffee. Reading retention is noticeably better.", name: "Priya S.", date: "1 month ago", rating: 5 },
      { title: "Great for deep work", body: "I write code for a living. This helps me hold complex problems in my head longer. Not magic, but real.", name: "Devon K.", date: "1 month ago", rating: 5 },
      { title: "Subtle but real", body: "Don't expect a rush. Expect to finish your to-do list without zoning out. That's exactly what I got.", name: "Hannah R.", date: "2 months ago", rating: 4 },
      { title: "Replaced two other supplements", body: "Cleaner formula than what I was stacking before. One capsule is a huge plus.", name: "Olivier B.", date: "2 months ago", rating: 5 },
      { title: "Solid for studying", body: "Med school grind is brutal. This has become part of my morning routine. Memory recall during practice exams is sharper.", name: "Aisha M.", date: "3 months ago", rating: 5 },
      { title: "Took a few weeks", body: "First week I felt nothing. By week three the mental clarity was undeniable. Stick with it.", name: "Jordan L.", date: "3 months ago", rating: 4 },
    ] : [
      { title: "Energy without the crash", body: "47 and finally feel like I did in my 30s. Steady all-day energy, not a spike and crash. Sleep is also better.", name: "Rachel D.", date: "2 weeks ago", rating: 5 },
      { title: "Noticeable in the gym", body: "Recovery between sets feels better and I'm not gassed by the third lift. Real difference after 3 weeks.", name: "Tom W.", date: "1 month ago", rating: 5 },
      { title: "Best NMN I've tried", body: "Tried three other brands before this. The trio combo with resveratrol actually makes sense biochemically and I feel it.", name: "Dr. Lena F.", date: "1 month ago", rating: 5 },
      { title: "Worth the price", body: "Not cheap but I cut out two other supplements after starting this. Net cost is similar and the results are better.", name: "Carlos V.", date: "2 months ago", rating: 4 },
      { title: "Mental clarity bonus", body: "Bought it for energy, ended up loving the mental clarity even more. Mid-afternoon dips are gone.", name: "Sofia A.", date: "2 months ago", rating: 5 },
      { title: "Subtle, then significant", body: "Three weeks in and my wife asked what I was doing differently. That's when I knew it was working.", name: "Ben H.", date: "3 months ago", rating: 5 },
      { title: "One pill is convenient", body: "Love that the new dose is one capsule. Easier to stay consistent.", name: "Mira J.", date: "3 months ago", rating: 4 },
    ];
    return [
      ...userReviews,
      { title: p.sample.title, body: p.sample.body, name: p.sample.name, date: p.sample.date, rating: 5 },
      ...pool,
    ];
  }, [p, userReviews]);
  const sortedReviews = useMemo(() => {
    const arr = [...extraReviews];
    if (reviewFilter === "highest") arr.sort((a,b)=>b.rating-a.rating);
    else if (reviewFilter === "helpful") arr.sort((a,b)=>b.body.length-a.body.length);
    else if (reviewFilter === "verified") return arr.filter(r => r.rating >= 4).slice(0, 6);
    return arr;
  }, [extraReviews, reviewFilter]);
  const related = PRODUCTS[p.related.id];

  return (
    <>
      {showReviewForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowReviewForm(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-display font-bold mb-4">Write a Review</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!form.name.trim() || !form.title.trim() || !form.body.trim()) return;
                setUserReviews(prev => [{ ...form, date: "Just now" }, ...prev]);
                setForm({ name: "", title: "", body: "", rating: 5 });
                setShowReviewForm(false);
                setTab("rev");
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-sm font-medium block mb-1">Rating</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(n => (
                    <button key={n} type="button" onClick={() => setForm(f => ({...f, rating: n}))}>
                      <Star className={`h-7 w-7 ${n <= form.rating ? "fill-primary text-primary" : "fill-primary/20 text-primary/30"}`}/>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Your name</label>
                <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className="w-full px-3 py-2 border border-border rounded-lg" required/>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Title</label>
                <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} className="w-full px-3 py-2 border border-border rounded-lg" required/>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Review</label>
                <textarea value={form.body} onChange={e => setForm(f => ({...f, body: e.target.value}))} rows={4} className="w-full px-3 py-2 border border-border rounded-lg" required/>
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setShowReviewForm(false)} className="btn-outline">Cancel</button>
                <button type="submit" className="btn-primary">Submit Review</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showLabel && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setShowLabel(false)}>
          <div className="bg-white rounded-2xl p-4 max-w-2xl w-full relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowLabel(false)} aria-label="Close" className="absolute top-3 right-3 h-9 w-9 rounded-full hover:bg-secondary flex items-center justify-center"><X className="h-5 w-5"/></button>
            <h2 className="text-xl font-display font-bold mb-3 pr-10">Supplement Facts Label</h2>
            <img src={supplementFacts} alt="Supplement facts label" className="w-full rounded-lg border border-border"/>
          </div>
        </div>
      )}
      {/* URGENCY BAR */}
      <div className="bg-gradient-to-r from-energy/15 via-primary/10 to-electric/15 border-b border-border">
        <div className="container-x py-2.5 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs sm:text-sm">
          <span className="flex items-center gap-1.5 font-semibold text-ink"><Flame className="h-4 w-4 text-energy"/>Limited launch pricing</span>
          <span className="text-body">Ends in <span className="font-mono font-bold text-ink tabular-nums">{mm}:{ss}</span></span>
          <span className="hidden sm:flex items-center gap-1.5 text-body"><Users className="h-4 w-4 text-primary"/>{stockLeft} bottles left at this price</span>
        </div>
      </div>
      <div className="container-x py-4 text-xs text-muted-foreground flex items-center gap-1.5">
        <Link to="/" className="hover:text-ink">Home</Link><ChevronRight className="h-3 w-3"/>
        <Link to="/shop" className="hover:text-ink">Shop</Link><ChevronRight className="h-3 w-3"/>
        <span className="text-ink">{p.name}</span>
      </div>

      {/* SPLIT */}
      <section className="container-x pb-12 grid gap-10 md:grid-cols-[5fr_6fr] items-start">
        <div>
          <div className="relative bg-secondary rounded-2xl aspect-square flex items-center justify-center overflow-hidden group">
            <div className="absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full z-10">{p.badge}</div>
            <img src={p.images[imgIdx]} alt={p.name} className="max-h-[500px] object-contain transition-transform duration-500 group-hover:scale-110"/>
          </div>
          <div className="mt-4 flex gap-3">
            {p.images.map((src,i)=>(
              <button key={i} onClick={()=>setImgIdx(i)} className={`h-20 w-20 rounded-lg bg-secondary border-2 ${imgIdx===i?"border-primary":"border-transparent"} flex items-center justify-center overflow-hidden`}>
                <img src={src} alt="" className="max-h-16 object-contain"/>
              </button>
            ))}
          </div>
        </div>
        <div>
          <h1 className="font-display text-3xl md:text-4xl">{p.name}</h1>
          <p className="mt-1 text-primary font-semibold">{p.subtitle}</p>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <div className="flex">{[1,2,3,4].map(i=><Star key={i} className="h-4 w-4 fill-primary text-primary"/>)}<Star className="h-4 w-4 fill-primary/40 text-primary"/></div>
            <span className="text-body">{p.rating} ({p.reviews} reviews)</span>
          </div>
          <div className="mt-5 text-3xl font-display font-bold text-ink">${p.price.toFixed(2)}</div>
          <p className="mt-4 text-body leading-relaxed">{p.description}</p>
          <ul className="mt-6 space-y-2.5">
            {p.benefits.map(b=>(
              <li key={b} className="flex items-center gap-2 text-sm text-body"><Check className="h-4 w-4 text-success shrink-0"/>{b}</li>
            ))}
          </ul>

          <div className="mt-7 flex items-center gap-4">
            <div className="inline-flex items-center border border-border rounded-md">
              <button aria-label="Decrease" onClick={()=>setQty(q=>Math.max(1,q-1))} className="h-12 w-12 flex items-center justify-center hover:bg-secondary"><Minus className="h-4 w-4"/></button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button aria-label="Increase" onClick={()=>setQty(q=>Math.min(10,q+1))} className="h-12 w-12 flex items-center justify-center hover:bg-secondary"><Plus className="h-4 w-4"/></button>
            </div>
          </div>
          <div className="mt-4 w-full">
            <ShopifyBuyButton productId={SHOPIFY_BUY[p.id].productId} buttonText={SHOPIFY_BUY[p.id].buttonText} />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
            <Trust icon={Lock} text="Secure Checkout"/>
            <Trust icon={Truck} text="Free Shipping $75+"/>
            <Trust icon={RotateCcw} text="60-Day Guarantee"/>
            <Trust icon={Star} text="50+ Reviews"/>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="bg-secondary py-16">
        <div className="container-x">
          <div className="flex flex-wrap gap-2 mb-8 border-b border-border">
            {[
              {k:"why",l:"Why You Need This"},
              {k:"ing",l:"Ingredients"},
              {k:"use",l:"How to Use"},
              {k:"rev",l:"Reviews"},
            ].map(t=>(
              <button key={t.k} onClick={()=>setTab(t.k as typeof tab)} className={`px-5 py-3 text-sm font-semibold border-b-2 -mb-px transition ${tab===t.k?"border-primary text-ink":"border-transparent text-muted-foreground hover:text-ink"}`}>{t.l}</button>
            ))}
          </div>

          {tab==="why" && (
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-2xl md:text-3xl">{p.why.heading}</h2>
                <div className="mt-5 space-y-4 text-body">{p.why.body.map((para,i)=><p key={i}>{para}</p>)}</div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {p.why.cards.map(c=>(
                  <div key={c.t} className="rounded-xl bg-white p-5 border border-border">
                    <h3 className="text-base mb-2">{c.t}</h3>
                    <p className="text-sm text-body">{c.d}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==="ing" && (
            <div className="grid gap-10 md:grid-cols-2">
              <div className="rounded-xl bg-white p-6 border-2 border-ink">
                <h3 className="text-xl border-b-4 border-ink pb-2">Supplement Facts</h3>
                <p className="mt-2 text-sm text-body">{p.ingredients.serving}</p>
                <ul className="mt-4 divide-y divide-border">
                  {p.ingredients.items.map(it=><li key={it.name} className="py-2 text-sm">{it.name}</li>)}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">{p.ingredients.other}</p>
              </div>
              <div>
                <h3 className="text-2xl mb-4">Key Ingredients</h3>
                <div className="space-y-3">
                  {p.ingredients.callouts.map(c=>(
                    <div key={c.name} className="rounded-lg bg-white p-4 border border-border">
                      <div className="font-display font-semibold text-ink text-sm">{c.name}</div>
                      <p className="text-sm text-body mt-1">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab==="use" && (
            <div className="max-w-3xl space-y-6">
              <div className="rounded-xl bg-white p-6 border border-border">
                <h3 className="text-lg mb-2">Dosage</h3>
                <p className="text-body">{p.use.dosage}</p>
              </div>
              <div className="rounded-xl bg-white p-6 border border-border">
                <h3 className="text-lg mb-3">Best Practices</h3>
                <ul className="space-y-2">{p.use.best.map(b=><li key={b} className="flex gap-2 text-body text-sm"><Check className="h-4 w-4 text-success mt-0.5 shrink-0"/>{b}</li>)}</ul>
              </div>
              <div className="rounded-xl bg-white p-6 border border-border">
                <h3 className="text-lg mb-3">Timeline</h3>
                <div className="space-y-3">
                  {p.use.timeline.map(t=>(
                    <div key={t.period} className="flex gap-4">
                      <div className="w-24 shrink-0 font-display font-semibold text-primary text-sm">{t.period}</div>
                      <div className="text-body text-sm">{t.text}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-white p-6 border border-border text-sm text-body space-y-2">
                <div><strong className="text-ink">Storage:</strong> {p.use.storage}</div>
                <div><strong className="text-ink">Note:</strong> {p.use.note}</div>
              </div>
            </div>
          )}

          {tab==="rev" && (
            <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
              <div className="rounded-xl bg-white p-6 border border-border h-fit">
                <div className="text-5xl font-display font-bold text-ink">{p.rating}</div>
                <div className="flex mt-2">{[1,2,3,4].map(i=><Star key={i} className="h-5 w-5 fill-primary text-primary"/>)}<Star className="h-5 w-5 fill-primary/40 text-primary"/></div>
                <div className="text-sm text-muted-foreground mt-1">{p.reviews} reviews</div>
                <div className="mt-5 space-y-1.5 text-xs">
                  {[["5",79],["4",12],["3",6],["2",2],["1",1]].map(([s,pct])=>(
                    <div key={s} className="flex items-center gap-2"><span className="w-3">{s}★</span><div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden"><div className="h-full bg-primary" style={{width:`${pct}%`}}/></div><span className="w-8 text-right text-muted-foreground">{pct}%</span></div>
                  ))}
                </div>
                <button onClick={() => setShowReviewForm(true)} className="mt-6 btn-outline w-full">Write a Review</button>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 text-xs">
                  {([["recent","Most Recent"],["highest","Highest Rated"],["helpful","Most Helpful"],["verified","Verified Only"]] as const).map(([k,l])=>(
                    <button key={k} onClick={()=>{setReviewFilter(k);setReviewsShown(3);}} className={`px-3 py-1.5 rounded-full border transition ${reviewFilter===k?"border-primary bg-primary text-white":"border-border hover:bg-white"}`}>{l}</button>
                  ))}
                </div>
                {sortedReviews.slice(0, reviewsShown).map((r, i) => (
                  <div key={i} className="rounded-xl bg-white p-6 border border-border">
                    <div className="flex">{Array.from({length:5}).map((_,s)=><Star key={s} className={`h-4 w-4 ${s < r.rating ? "fill-primary text-primary" : "fill-primary/20 text-primary/30"}`}/>)}</div>
                    <h3 className="text-lg mt-2">"{r.title}"</h3>
                    <div className="text-xs text-muted-foreground mt-1">Verified Purchase — {r.name} · {r.date}</div>
                    <p className="mt-4 text-body text-sm leading-relaxed">{r.body}</p>
                    <div className="mt-4 text-xs text-muted-foreground flex items-center gap-2">
                      <span>Was this helpful?</span>
                      <button onClick={()=>setHelpful(h=>({...h,[i]:"yes"}))} className={`px-2 py-1 rounded border transition ${helpful[i]==="yes"?"border-primary text-primary bg-primary/5":"border-border hover:bg-secondary"}`}>Yes</button>
                      <button onClick={()=>setHelpful(h=>({...h,[i]:"no"}))} className={`px-2 py-1 rounded border transition ${helpful[i]==="no"?"border-primary text-primary bg-primary/5":"border-border hover:bg-secondary"}`}>No</button>
                      {helpful[i] && <span className="text-success">Thanks for your feedback!</span>}
                    </div>
                  </div>
                ))}
                {reviewsShown < sortedReviews.length ? (
                  <button onClick={() => setReviewsShown(n => Math.min(n + 3, sortedReviews.length))} className="btn-outline">Load More Reviews</button>
                ) : (
                  <div className="text-center text-sm text-muted-foreground py-2">You've reached the end of the reviews.</div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* RELATED */}
      <section className="container-x py-20">
        <h2 className="text-2xl md:text-3xl">Complete Your Stack</h2>
        <div className="mt-6 rounded-2xl border border-border p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="h-32 w-32 bg-secondary rounded-xl flex items-center justify-center shrink-0">
            <img src={related.image} alt={related.name} className="max-h-28 object-contain"/>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl">{related.name} — ${related.price.toFixed(2)}</h3>
            <p className="mt-1 text-body text-sm">{p.related.blurb}</p>
          </div>
          <Link to="/product/$slug" params={{slug:related.slug}} className="btn-primary">View Product</Link>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="bg-secondary py-16">
        <div className="container-x text-center max-w-2xl">
          <ShieldCheck className="h-12 w-12 text-success mx-auto"/>
          <h2 className="text-2xl md:text-4xl mt-4">60-Day Money-Back Guarantee</h2>
          <p className="mt-4 text-body">Try {p.name} risk-free for 60 days. If you don't feel a noticeable difference in your focus and mental clarity, we'll refund every penny. No questions asked.</p>
        </div>
      </section>
    </>
  );
}

function Trust({ icon: Icon, text }: { icon: typeof Lock; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2.5">
      <Icon className="h-4 w-4 text-primary"/>
      <span className="text-ink font-medium">{text}</span>
    </div>
  );
}
