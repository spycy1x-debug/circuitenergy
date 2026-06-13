import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Star, Check, ShieldCheck, Truck, RotateCcw, Lock, ChevronLeft, ChevronRight, Minus, Plus, FileText, X, Flame, Users, Brain, Zap, Sparkles, Heart, Beaker, Clock, AlertCircle, ThumbsUp } from "lucide-react";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
  }
}
import neuralImg from "@/assets/neural-bottle.png";
import neuralOpen from "@/assets/neural-open.png";
import nmnImg from "@/assets/nmn-bottle.png";
import nmnTrio from "@/assets/nmn-trio.png";
import nmnBuiltDifferentAsset from "@/assets/nmn-built-different.jpg.asset.json";
import nmnWomanBalconyAsset from "@/assets/nmn-woman-balcony.png.asset.json";
import nmnEnergizeRepairAsset from "@/assets/nmn-energize-repair.png.asset.json";
import nmnKitchenHandAsset from "@/assets/nmn-kitchen-hand.png.asset.json";
import nmnNadChartAsset from "@/assets/nmn-nad-chart.png.asset.json";
const nmnBuiltDifferent = nmnBuiltDifferentAsset.url;
const nmnWomanBalcony = nmnWomanBalconyAsset.url;
const nmnEnergizeRepair = nmnEnergizeRepairAsset.url;
const nmnKitchenHand = nmnKitchenHandAsset.url;
const nmnNadChart = nmnNadChartAsset.url;
...
    badge: "Best Seller",
    images: [nmnImg, nmnBuiltDifferent, nmnWomanBalcony, nmnEnergizeRepair, nmnKitchenHand, nmnNadChart, nmnTrio],
    description: "Boost NAD+ for sustained energy, reduced afternoon crashes, and cellular repair. No stimulants. No crashes. Just your body producing energy the way it should.",
...
function ProductPage() {
  const p = Route.useLoaderData() as ProductData;
  const [imgIdx, setImgIdx] = useState(0);
  const [showImageLightbox, setShowImageLightbox] = useState(false);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"why"|"ing"|"use"|"rev">("why");
  const [reviewsShown, setReviewsShown] = useState(3);
  const [userReviews, setUserReviews] = useState<Array<{title:string;body:string;name:string;date:string;rating:number}>>([]);
...
      {showLabel && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setShowLabel(false)}>
          <div className="bg-white rounded-2xl p-4 max-w-2xl w-full relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowLabel(false)} aria-label="Close" className="absolute top-3 right-3 h-9 w-9 rounded-full hover:bg-secondary flex items-center justify-center"><X className="h-5 w-5"/></button>
            <h2 className="text-xl font-display font-bold mb-3 pr-10">Supplement Facts Label</h2>
            <img src={supplementFacts} alt="Supplement facts label" className="w-full rounded-lg border border-border"/>
          </div>
        </div>
      )}
      {showImageLightbox && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={() => setShowImageLightbox(false)}>
          <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowImageLightbox(false)} aria-label="Close image" className="absolute top-3 right-3 z-10 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-md border border-border flex items-center justify-center text-ink"><X className="h-5 w-5"/></button>
            <img src={p.images[imgIdx]} alt={`${p.name} image ${imgIdx + 1}`} className="w-full max-h-[85vh] object-contain rounded-2xl bg-white"/>
          </div>
        </div>
      )}
      {/* URGENCY BAR moved to global root */}
      <div className="container-x py-4 text-xs text-muted-foreground flex items-center gap-1.5">
...
      <section className="container-x pb-12 grid gap-10 md:grid-cols-[5fr_6fr] items-start">
        <div>
          <div className="relative bg-white rounded-2xl aspect-square overflow-hidden group border border-border shadow-sm">
            <div className="absolute top-4 left-4 bg-gradient-to-r from-primary to-electric text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-md">{p.badge}</div>
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-[11px] font-semibold text-ink shadow">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"/><span className="relative inline-flex rounded-full h-2 w-2 bg-success"/></span>
              {viewers} viewing now
            </div>
            <button type="button" onClick={() => setShowImageLightbox(true)} aria-label={`Open ${p.name} image ${imgIdx + 1}`} className="absolute inset-0 z-0 cursor-zoom-in p-4 sm:p-6">
              <img src={p.images[imgIdx]} alt={p.name} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"/>
            </button>
            <button onClick={()=>setImgIdx((imgIdx - 1 + p.images.length) % p.images.length)} aria-label="Previous image" className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-md border border-border flex items-center justify-center text-ink transition"><ChevronLeft className="h-5 w-5"/></button>
            <button onClick={()=>setImgIdx((imgIdx + 1) % p.images.length)} aria-label="Next image" className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-md border border-border flex items-center justify-center text-ink transition"><ChevronRight className="h-5 w-5"/></button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.images.map((src,i)=>(
              <button key={i} onClick={()=>setImgIdx(i)} className={`h-16 w-16 sm:h-20 sm:w-20 rounded-lg bg-white border-2 ${imgIdx===i?"border-primary ring-2 ring-primary/20":"border-border hover:border-primary/40"} overflow-hidden transition p-1`}>
                <img src={src} alt={`${p.name} thumbnail ${i + 1}`} className="w-full h-full object-contain"/>
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 bg-success/10 text-success text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse"/>In Stock · Ships Today
          </div>
          <h1 className="font-display text-3xl md:text-4xl">{p.name}</h1>
          <p className="mt-1 text-primary font-semibold">{p.subtitle}</p>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <div className="flex">{[1,2,3,4].map(i=><Star key={i} className="h-4 w-4 fill-primary text-primary"/>)}<Star className="h-4 w-4 fill-primary/40 text-primary"/></div>
            <span className="text-body">{p.rating} · <button onClick={()=>{setTab("rev"); setTimeout(()=>document.getElementById("product-tabs")?.scrollIntoView({behavior:"smooth",block:"start"}),50);}} className="underline hover:text-primary">{p.reviews} reviews</button></span>
          </div>
          <div className="mt-5 flex items-baseline gap-3">
            <div className="text-3xl font-display font-bold text-ink">${p.price.toFixed(2)}</div>
            <div className="text-lg text-muted-foreground line-through">${(p.price * 1.4).toFixed(2)}</div>
            <div className="text-xs font-bold uppercase bg-energy/15 text-energy px-2 py-1 rounded">Save 30%</div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">or 4 interest-free payments of ${(p.price/4).toFixed(2)} with Shop Pay</p>
          <div className="mt-5 relative rounded-2xl border border-border/70 bg-gradient-to-br from-secondary/50 via-white to-primary/5 p-5 shadow-[0_4px_18px_-12px_rgba(0,0,0,0.15)]">
            <div className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-gradient-to-b from-primary to-electric"/>
            <p className="text-[15px] leading-relaxed text-ink/90 font-medium pl-2">{p.description}</p>
          </div>
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {p.benefits.map((b, i)=>(
              <li
                key={b}
                className="group flex items-start gap-2.5 rounded-xl border border-border/60 bg-white/80 backdrop-blur px-3 py-2.5 text-sm text-ink hover:border-success/40 hover:bg-success/[0.04] hover:shadow-[0_6px_18px_-12px_rgba(16,185,129,0.45)] transition-all"
                style={{ animation: `fadeInUp 0.4s ease-out ${i * 60}ms both` }}
              >
                <span className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-success/25 to-success/10 ring-1 ring-success/30 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                  <Check className="h-3.5 w-3.5 text-success" strokeWidth={3}/>
                </span>
                <span className="font-medium leading-snug">{b}</span>
              </li>
            ))}
          </ul>


          <div className="mt-7 rounded-2xl border border-border bg-gradient-to-b from-white to-secondary/40 p-5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.12)]">
            {/* Stock progress */}
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wide mb-1.5">
              <span className="flex items-center gap-1.5 text-energy"><Flame className="h-3.5 w-3.5"/>Order in <span className="font-mono tabular-nums text-ink">{hh}:{mm}:{ss}</span> — ships today</span>
              <span className="flex items-center gap-1.5 text-ink"><span className="h-1.5 w-1.5 rounded-full bg-energy animate-pulse"/>Only {stockLeft} left</span>
            </div>
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden mb-4">
              <div className="h-full bg-gradient-to-r from-energy to-primary" style={{ width: `${Math.min(100, stockLeft * 5)}%` }}/>
            </div>

            {/* Qty + button row */}
            <div className="flex items-stretch gap-3">
              <div className="inline-flex items-center bg-white border border-border rounded-xl shadow-sm">
                <button aria-label="Decrease" onClick={()=>setQty(q=>Math.max(1,q-1))} className="h-12 w-11 flex items-center justify-center text-muted-foreground hover:text-ink rounded-l-xl"><Minus className="h-4 w-4"/></button>
                <span className="w-8 text-center font-bold text-ink">{qty}</span>
                <button aria-label="Increase" onClick={()=>setQty(q=>Math.min(10,q+1))} className="h-12 w-11 flex items-center justify-center text-muted-foreground hover:text-ink rounded-r-xl"><Plus className="h-4 w-4"/></button>
              </div>
              <div className="flex-1 min-w-0">
                <ShopifyBuyButton
                  productId={SHOPIFY_BUY[p.id].productId}
                  buttonText={SHOPIFY_BUY[p.id].buttonText}
                  productName={p.name}
                  price={p.price}
                />
              </div>
            </div>

            {/* Trust row */}
            <div className="mt-4 pt-4 border-t border-border/70 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] font-medium text-muted-foreground">
              <span className="flex items-center gap-1"><Lock className="h-3 w-3 text-success"/>SSL Secure Checkout</span>
              <span className="hidden sm:inline opacity-40">·</span>
              <span className="flex items-center gap-1"><Truck className="h-3 w-3 text-success"/>Free shipping $75+</span>
              <span className="hidden sm:inline opacity-40">·</span>
              <span className="flex items-center gap-1"><RotateCcw className="h-3 w-3 text-success"/>60-day refund</span>
            </div>
          </div>
          <button onClick={() => setShowLabel(true)} className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-md text-sm font-semibold text-ink hover:bg-secondary transition">
            <FileText className="h-4 w-4"/> View Supplement Label
          </button>

          <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
            <Trust icon={Lock} text="Secure Checkout"/>
            <Trust icon={Truck} text="Free Shipping $75+"/>
            <Trust icon={RotateCcw} text="60-Day Guarantee"/>
            <Trust icon={Star} text="80+ Reviews"/>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section id="product-tabs" className="bg-secondary py-16 scroll-mt-24">
        <div className="container-x">
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
            {[
              {k:"why",l:"Why You Need This",Icon:Brain},
              {k:"ing",l:"Ingredients",Icon:Beaker},
              {k:"use",l:"How to Use",Icon:Clock},
              {k:"rev",l:"Reviews",Icon:Star},
            ].map(t=>{
              const active = tab===t.k;
              return (
                <button
                  key={t.k}
                  onClick={()=>setTab(t.k as typeof tab)}
                  className={`group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${active
                    ? "bg-gradient-to-r from-primary to-electric text-white shadow-lg shadow-primary/25 scale-[1.03]"
                    : "bg-white text-ink border border-border hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5"}`}
                >
                  <t.Icon className={`h-4 w-4 ${active ? "text-white" : "text-primary"}`}/>
                  <span>{t.l}</span>
                </button>
              );
            })}
          </div>

          {tab==="why" && (
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full mb-3"><Brain className="h-3.5 w-3.5"/>The Science</div>
                <h2 className="text-2xl md:text-3xl">{p.why.heading}</h2>
                <div className="mt-5 space-y-4">
                  {p.why.body.map((para,i)=>(
                    i===0
                      ? <p key={i} className="text-lg md:text-xl font-display font-semibold text-ink leading-snug border-l-4 border-primary pl-4">{para}</p>
                      : <p key={i} className="text-body leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {p.why.cards.map((c,i)=>{
                  const icons = [Zap, Sparkles, ShieldCheck, Heart];
                  const Icon = icons[i % icons.length];
                  return (
                    <div key={c.t} className="group rounded-xl bg-white p-5 border border-border hover:border-primary/40 hover:shadow-md transition relative overflow-hidden">
                      <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-gradient-to-br from-primary/10 to-electric/10 group-hover:scale-125 transition-transform"/>
                      <div className="relative">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-electric text-white flex items-center justify-center mb-3 shadow-sm"><Icon className="h-5 w-5"/></div>
                        <h3 className="text-base mb-2 font-display font-bold">{c.t}</h3>
                        <p className="text-sm text-body">{c.d}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab==="ing" && (
            <div className="grid gap-10 md:grid-cols-2">
              <div className="rounded-xl bg-white p-6 border-2 border-ink shadow-sm">
                <div className="flex items-center justify-between border-b-4 border-ink pb-2">
                  <h3 className="text-xl">Supplement Facts</h3>
                  <button onClick={() => setShowLabel(true)} className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"><FileText className="h-3.5 w-3.5"/>Full Label</button>
                </div>
                <p className="mt-2 text-sm text-body">{p.ingredients.serving}</p>
                <ul className="mt-4 divide-y divide-border">
                  {p.ingredients.items.map((it,i)=>(
                    <li key={it.name} className="py-2.5 text-sm flex items-center gap-2">
                      <span className="h-5 w-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">{i+1}</span>
                      {it.name}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">{p.ingredients.other}</p>
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 bg-electric/10 text-electric text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full mb-3"><Beaker className="h-3.5 w-3.5"/>What Each Does</div>
                <h3 className="text-2xl mb-4">Key Ingredients</h3>
                <div className="space-y-3">
                  {p.ingredients.callouts.map(c=>(
                    <div key={c.name} className="rounded-lg bg-white p-4 border border-border hover:border-primary/40 hover:shadow-sm transition flex gap-3">
                      <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary/15 to-electric/15 text-primary flex items-center justify-center shrink-0"><Check className="h-4 w-4"/></div>
                      <div>
                        <div className="font-display font-bold text-ink text-sm">{c.name}</div>
                        <p className="text-sm text-body mt-0.5">{c.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab==="use" && (
            <div className="max-w-3xl space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-primary to-electric text-white p-6 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center"><Clock className="h-6 w-6"/></div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider opacity-90">Daily Dosage</div>
                    <p className="text-lg font-display font-bold">{p.use.dosage}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white p-6 border border-border">
                <h3 className="text-lg mb-4 flex items-center gap-2"><ThumbsUp className="h-5 w-5 text-success"/>Best Practices</h3>
                <ul className="space-y-3">{p.use.best.map(b=>(
                  <li key={b} className="flex gap-3 items-start group">
                    <span className="h-6 w-6 rounded-full bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition"><Check className="h-3.5 w-3.5 text-success"/></span>
                    <span className="text-ink/85 text-sm leading-relaxed font-medium">{b}</span>
                  </li>
                ))}</ul>
              </div>

              <div className="rounded-xl bg-white p-6 border border-border">
                <h3 className="text-lg mb-4 flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary"/>What to Expect</h3>
                <div className="relative pl-6">
                  <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-electric to-energy"/>
                  <div className="space-y-5">
                    {p.use.timeline.map((t,i)=>(
                      <div key={t.period} className="relative">
                        <div className="absolute -left-6 top-1 h-5 w-5 rounded-full bg-white border-2 border-primary flex items-center justify-center"><span className="h-2 w-2 rounded-full bg-primary"/></div>
                        <div className="font-display font-bold text-primary text-sm">{t.period}</div>
                        <div className="text-body text-sm mt-0.5">{t.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-xl bg-white p-5 border border-border text-sm text-body flex gap-3">
                  <ShieldCheck className="h-5 w-5 text-success shrink-0 mt-0.5"/>
                  <div><div className="font-bold text-ink mb-0.5">Storage</div>{p.use.storage}</div>
                </div>
                <div className="rounded-xl bg-alert/5 p-5 border border-alert/20 text-sm text-body flex gap-3">
                  <AlertCircle className="h-5 w-5 text-alert shrink-0 mt-0.5"/>
                  <div><div className="font-bold text-ink mb-0.5">Note</div>{p.use.note}</div>
                </div>
              </div>
            </div>
          )}

          {tab==="rev" && (
            <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
              <div className="rounded-2xl bg-gradient-to-br from-white to-secondary p-6 border border-border h-fit shadow-sm">
                <div className="flex items-baseline gap-2">
                  <div className="text-5xl font-display font-bold text-ink">{p.rating}</div>
                  <div className="text-sm text-muted-foreground">/ 5</div>
                </div>
                <div className="flex mt-2">{[1,2,3,4].map(i=><Star key={i} className="h-5 w-5 fill-primary text-primary"/>)}<Star className="h-5 w-5 fill-primary/40 text-primary"/></div>
                <div className="text-sm text-muted-foreground mt-1">Based on {p.reviews} verified reviews</div>
                <div className="mt-5 space-y-1.5 text-xs">
                  {([["5",79],["4",12],["3",6],["2",2],["1",1]] as const).map(([s,pct])=>(
                    <button
                      key={s}
                      type="button"
                      onClick={()=>{setReviewFilter(s);setReviewsShown(3);}}
                      className={`w-full flex items-center gap-2 rounded-md px-1.5 py-1 -mx-1.5 transition hover:bg-white text-left ${reviewFilter===s?"bg-white ring-1 ring-primary/40":""}`}
                      aria-label={`Show ${s} star reviews`}
                    >
                      <span className="w-4 font-semibold">{s}★</span>
                      <span className="flex-1 h-2 bg-white rounded-full overflow-hidden border border-border"><span className="block h-full bg-gradient-to-r from-primary to-electric" style={{width:`${pct}%`}}/></span>
                      <span className="w-8 text-right text-muted-foreground">{pct}%</span>
                    </button>
                  ))}
                </div>
                {["1","2","3","4","5"].includes(reviewFilter) && (
                  <button onClick={()=>{setReviewFilter("recent");setReviewsShown(3);}} className="mt-2 text-xs text-primary hover:underline">Clear star filter</button>
                )}
                <div className="mt-5 pt-5 border-t border-border flex items-center gap-2 text-xs text-success font-semibold"><ShieldCheck className="h-4 w-4"/>97% would recommend</div>
                <button onClick={() => setShowReviewForm(true)} className="mt-5 btn-primary w-full">Write a Review</button>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 text-xs">
                  {([["recent","Most Recent"],["highest","Highest Rated"],["helpful","Most Helpful"],["verified","Verified Only"]] as const).map(([k,l])=>(
                    <button key={k} onClick={()=>{setReviewFilter(k);setReviewsShown(3);}} className={`px-3 py-1.5 rounded-full border transition ${reviewFilter===k?"border-primary bg-primary text-white":"border-border hover:bg-white"}`}>{l}</button>
                  ))}
                </div>
                {sortedReviews.slice(0, reviewsShown).map((r, i) => {
                  const initials = r.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase();
                  return (
                  <div key={i} className="rounded-xl bg-white p-6 border border-border hover:shadow-md transition">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-electric text-white font-bold text-sm flex items-center justify-center shrink-0">{initials}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-display font-bold text-ink text-sm">{r.name}</span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide bg-success/10 text-success px-1.5 py-0.5 rounded"><Check className="h-2.5 w-2.5"/>Verified</span>
                          <span className="text-xs text-muted-foreground">· {r.date}</span>
                        </div>
                        <div className="flex mt-1">{Array.from({length:5}).map((_,s)=><Star key={s} className={`h-4 w-4 ${s < r.rating ? "fill-primary text-primary" : "fill-primary/20 text-primary/30"}`}/>)}</div>
                      </div>
                    </div>
                    <h3 className="text-base font-display font-bold mt-3">"{r.title}"</h3>
                    <p className="mt-2 text-body text-sm leading-relaxed">{r.body}</p>
                    <div className="mt-4 pt-3 border-t border-border text-xs text-muted-foreground flex items-center gap-2">
                      <span>Was this helpful?</span>
                      <button onClick={()=>setHelpful(h=>({...h,[i]:"yes"}))} className={`px-2 py-1 rounded border transition inline-flex items-center gap-1 ${helpful[i]==="yes"?"border-primary text-primary bg-primary/5":"border-border hover:bg-secondary"}`}><ThumbsUp className="h-3 w-3"/>Yes</button>
                      <button onClick={()=>setHelpful(h=>({...h,[i]:"no"}))} className={`px-2 py-1 rounded border transition ${helpful[i]==="no"?"border-primary text-primary bg-primary/5":"border-border hover:bg-secondary"}`}>No</button>
                      {helpful[i] && <span className="text-success">Thanks for your feedback!</span>}
                    </div>
                  </div>
                  );
                })}
                {sortedReviews.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border bg-white/50 p-8 text-center text-sm text-muted-foreground">No reviews match this filter yet.</div>
                ) : reviewsShown < sortedReviews.length ? (
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
