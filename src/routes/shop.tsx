import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Star } from "lucide-react";
import neuralImg from "@/assets/neural-bottle.png";
import nmnImg from "@/assets/nmn-bottle.png";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Circuit Energy Supplements" },
      { name: "description", content: "Shop Circuit Neural Performance and Circuit NMN. Premium supplements that fix brain fog, afternoon crashes, and chronic fatigue at the root." },
    ],
  }),
  component: ShopPage,
});

const products = [
  { hero: true, slug: "neural-performance", image: neuralImg, title: "Circuit Neural Performance", subtitle: "Focus & Cognitive Enhancement", price: "42.99", rating: 4.7, reviews: 234, desc: "10 natural compounds — Alpha GPC, Bacopa, L-Theanine, Huperzine A — for all-day mental clarity and sharp focus.", benefits: ["Eliminates brain fog","Enhances focus and memory","Smooth energy without jitters","No artificial additives"], cta: "Sharpen Your Mind" },
  { hero: false, slug: "nmn", image: nmnImg, title: "Circuit NMN", subtitle: "Cellular Energy & Longevity", price: "49.99", rating: 4.6, reviews: 198, desc: "500mg NMN per serving. Restores NAD+ for sustained cellular energy and reduced afternoon crashes.", benefits: ["Eliminates afternoon crashes","Restores cellular energy","Improves sleep quality"], cta: "Fix Your Energy" },
];

function ShopPage() {
  return (
    <>
      <section className="bg-secondary py-16">
        <div className="container-x text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl">Shop Circuit</h1>
          <p className="mt-4 text-lg text-body">Two formulas. One mission: help you feel and think like yourself again.</p>
        </div>
      </section>
      <section className="container-x py-16 grid gap-8 md:grid-cols-2">
        {products.map(p => (
          <div key={p.slug} className={`relative rounded-2xl bg-white border ${p.hero ? "border-primary/40 shadow-xl" : "border-border"} p-8 flex flex-col`}>
            {p.hero && <div className="absolute -top-3 left-8 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">Most Popular</div>}
            <div className="aspect-square bg-secondary rounded-xl flex items-center justify-center mb-6">
              <img src={p.image} alt={p.title} className="max-h-80 object-contain"/>
            </div>
            <div className="text-xs uppercase tracking-wider text-primary font-semibold">{p.subtitle}</div>
            <h2 className="text-2xl mt-1">{p.title}</h2>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <div className="flex">{[1,2,3,4].map(i=><Star key={i} className="h-4 w-4 fill-primary text-primary"/>)}<Star className="h-4 w-4 fill-primary/40 text-primary"/></div>
              <span className="text-muted-foreground">{p.rating} ({p.reviews})</span>
            </div>
            <div className="text-2xl font-display font-bold text-ink mt-2">${p.price}</div>
            <p className="mt-3 text-body text-sm">{p.desc}</p>
            <ul className="mt-5 space-y-2">
              {p.benefits.map(b => <li key={b} className="flex items-center gap-2 text-sm text-body"><Check className="h-4 w-4 text-success"/>{b}</li>)}
            </ul>
            <Link to="/product/$slug" params={{slug:p.slug}} className="btn-primary mt-7">{p.cta}</Link>
          </div>
        ))}
      </section>
    </>
  );
}
