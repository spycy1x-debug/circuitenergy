import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Star, Check, ShieldCheck, Truck, RotateCcw, Lock, ChevronRight, Minus, Plus } from "lucide-react";
import neuralImg from "@/assets/neural-bottle.png";
import neuralOpen from "@/assets/neural-open.png";
import nmnImg from "@/assets/nmn-bottle.png";
import nmnTrio from "@/assets/nmn-trio.png";
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
    reviews: 234,
    badge: "Most Popular",
    images: [neuralImg, neuralOpen],
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
    reviews: 198,
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
  const related = PRODUCTS[p.related.id];

  return (
    <>
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
            <Trust icon={Star} text="500+ Reviews"/>
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
                <button className="mt-6 btn-outline w-full">Write a Review</button>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 text-xs">
                  {["Most Recent","Highest Rated","Most Helpful","Verified Only"].map(f=><button key={f} className="px-3 py-1.5 rounded-full border border-border hover:bg-white">{f}</button>)}
                </div>
                <div className="rounded-xl bg-white p-6 border border-border">
                  <div className="flex">{[1,2,3,4,5].map(s=><Star key={s} className="h-4 w-4 fill-primary text-primary"/>)}</div>
                  <h3 className="text-lg mt-2">"{p.sample.title}"</h3>
                  <div className="text-xs text-muted-foreground mt-1">Verified Purchase — {p.sample.name} · {p.sample.date}</div>
                  <p className="mt-4 text-body text-sm leading-relaxed">{p.sample.body}</p>
                  <div className="mt-4 text-xs text-muted-foreground">Was this helpful? Yes (52) · No (3)</div>
                </div>
                <button className="btn-outline">Load More Reviews</button>
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
