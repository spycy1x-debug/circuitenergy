import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.png";
import neuralImg from "@/assets/neural-bottle.png";
import nmnImg from "@/assets/nmn-bottle.png";
import { Brain, Zap, Shield, Atom, CalendarCheck, MoonStar, Pill, Sparkles, Check, X, ChevronDown, Loader2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Circuit Energy — Support Your Energy & Mental Clarity" },
      { name: "description", content: "Circuit pairs cellular energy support with cognitive ingredients to help you think clearly and feel your best. 60-day money-back guarantee." },
      { property: "og:title", content: "Circuit Energy — Your Brain Isn't Broken. It's Under-Fueled." },
      { property: "og:description", content: "Premium dietary supplements formulated to support energy and cognitive function. 60-day money-back guarantee. Made in the USA." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

const tickerItems = ["Natural Ingredients", "No Artificial Additives", "60-Day Guarantee", "Made in USA", "Research-Backed Ingredients"];

const benefits = [
  { icon: Brain, title: "Sharp, Focused Thinking", desc: "Alpha GPC and Huperzine A are included to help support acetylcholine — the neurotransmitter associated with focus, learning, and memory.*", accent: "var(--electric)", tint: "oklch(0.7 0.16 200 / 0.12)", tag: "Cognition" },
  { icon: Zap, title: "Steady Daytime Energy", desc: "Formulated to help support sustained energy throughout the day, without the spike-and-crash pattern of caffeine alone.*", accent: "var(--energy)", tint: "oklch(0.72 0.18 55 / 0.14)", tag: "Energy" },
  { icon: Shield, title: "Natural. No Additives.", desc: "Every ingredient in Circuit Neural Performance is a high-quality, natural compound. No artificial fillers, no proprietary blends, no compromises.", accent: "var(--success)", tint: "oklch(0.38 0.09 140 / 0.12)", tag: "Clean" },
  { icon: Atom, title: "Cellular-Level Support", desc: "Circuit NMN supplies NMN, a direct precursor to NAD+ — the coenzyme your mitochondria use in energy metabolism.* A foundational nutrient, not a stimulant.", accent: "var(--primary)", tint: "oklch(0.59 0.025 245 / 0.12)", tag: "Cellular" },
  { icon: CalendarCheck, title: "Noticeable Over Time", desc: "Many customers report noticing changes in their mental clarity and energy levels with consistent daily use. Individual results may vary.", accent: "var(--energy)", tint: "oklch(0.72 0.18 55 / 0.14)", tag: "Routine" },
  { icon: MoonStar, title: "Daily Wellness Routine", desc: "Designed to support healthy neurotransmitter and cellular energy systems as part of a balanced daily routine.*", accent: "var(--electric)", tint: "oklch(0.7 0.16 200 / 0.12)", tag: "Recovery" },
];

const painPoints = [
  "You're exhausted by 2pm every single day",
  "You can't focus for more than 20 minutes",
  "You sleep 8 hours but wake up tired",
  "Brain fog makes work feel impossible",
];

// Real customer reviews will be populated here once collected through our review platform.
const testimonials: { title: string; body: string; name: string }[] = [];

const faqs = [
  { q: "What's the difference between Neural Performance and NMN?", a: "They target different sides of the same problem. Neural Performance is formulated for cognitive function — focus, memory, mental clarity — using compounds like Alpha GPC, Bacopa monnieri, and Huperzine A that directly support brain chemistry. Circuit NMN works at the cellular level, restoring NAD+ so your mitochondria can produce energy efficiently. Together, they cover both your brain and your body." },
  { q: "Does Neural Performance contain caffeine?", a: "Yes. Neural Performance contains caffeine paired with L-Theanine, a combination that has been studied for its potential to support calm, focused energy rather than a spike-and-crash pattern.* If you're sensitive to caffeine, start with one capsule and assess your tolerance." },
  { q: "When will I actually feel results?", a: "For Neural Performance, most people notice sharper focus and mental clarity within 7-14 days of consistent daily use, with some feeling a difference in 3-5 days — ingredients like Bacopa monnieri build in effect over time. For NMN, cellular energy benefits typically become noticeable within 2-4 weeks as NAD+ levels are restored. Taken together, many customers report meaningful improvements in both brain and body within the first 2 weeks." },
  { q: "Are the ingredients natural?", a: "Yes — for both products. Every ingredient in Circuit Neural Performance and Circuit NMN is a high-quality, natural compound. No artificial additives, no fillers, no proprietary blends hiding weak doses. What's on the label is what's in the capsule." },
  { q: "What if it doesn't work for me?", a: "Both Neural Performance and NMN are backed by our 60-day money-back guarantee. If you don't feel a noticeable difference after consistent use of either product, we'll refund every penny. No questions asked." },
  { q: "How do I take Circuit supplements?", a: "Neural Performance: take 1 capsule daily with 6-8 oz of water, preferably in the morning. NMN: take 1 capsule daily with water, ideally in the morning with food for best absorption. If taking both, they can be taken together at the same time. For best results, take at the same time each day. Consult your healthcare professional if you have any medical conditions." },
  { q: "Can I take Neural Performance and NMN together?", a: "Yes — they're designed to complement each other. Neural Performance supports cognitive function and brain chemistry; NMN supports cellular energy production by restoring NAD+. There are no known interactions between the two, and many customers take both daily for comprehensive mental and physical performance." },
  { q: "How long does one bottle last?", a: "Each bottle of Neural Performance and each bottle of NMN contains 30 capsules. At the recommended dose of 1 capsule per day, each bottle lasts 30 days. If you're taking both, plan on one bottle of each per month." },
];

function HomePage() {
  return (
    <>
      {/* HERO — split-screen, vibrant gradient + fully visible photo */}
      <section className="relative isolate overflow-hidden border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        {/* Decorative glows */}
        <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full blur-3xl opacity-40" style={{ background: "radial-gradient(circle, var(--electric), transparent 60%)" }} />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 right-1/3 h-[460px] w-[460px] rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, var(--energy), transparent 60%)" }} />
        {/* Subtle grid */}
        <div aria-hidden className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

        <div className="container-x relative grid gap-10 md:gap-12 md:grid-cols-2 items-center py-16 md:py-24 lg:py-28">
          {/* Copy */}
          <div className="text-white relative">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] md:text-xs font-semibold tracking-wide uppercase mb-6 border border-white/15 bg-white/5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "var(--energy)" }} />
              <span className="text-white/90">Cellular Energy + Cognitive Performance</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-white">
              Your Brain Isn't<br/>
              Broken.{" "}
              <span className="relative inline-block">
                <span className="relative z-10 italic font-display" style={{ background: "var(--gradient-energy)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                  It's Under-Fueled.
                </span>
              </span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/80 max-w-xl leading-relaxed">
              Circuit pairs cellular NAD+ support with advanced nootropics — so you can think clearly, work sharply, and finally feel like yourself again.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn-primary shadow-xl shadow-black/30">Shop the Collection</Link>
              <a href="#products" className="btn-white">See the Products</a>
            </div>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl">
              {[
                { k: "Natural", v: "Ingredients" },
                { k: "Made in", v: "the USA" },
                { k: "60-Day", v: "Money-back" },
                { k: "1 Capsule", v: "Daily dose" },
              ].map((s) => (
                <div key={s.k} className="border-l-2 pl-3" style={{ borderColor: "var(--energy)" }}>
                  <div className="text-white font-display text-xl md:text-2xl font-bold">{s.k}</div>
                  <div className="text-[11px] md:text-xs text-white/60 uppercase tracking-wide">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image — fully contained, never cropped */}
          <div className="relative">
            <div aria-hidden className="absolute inset-0 -m-6 rounded-[2rem] blur-2xl opacity-50" style={{ background: "var(--gradient-energy)" }} />
            <div className="relative rounded-[2rem] overflow-hidden ring-1 ring-white/10 shadow-2xl bg-white/5 backdrop-blur-sm">
              <img
                src={heroImg}
                alt="Active people using Circuit Energy supplements"
                className="w-full h-auto object-cover aspect-square"
                loading="eager"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-white/95 backdrop-blur px-4 py-3 shadow-lg">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-body/60 font-semibold">Most Popular</div>
                  <div className="text-sm font-display font-bold text-ink">Neural Performance</div>
                </div>
                <Link to="/product/$slug" params={{ slug: "neural-performance" }} className="text-xs font-semibold rounded-full px-3 py-1.5 text-white" style={{ background: "var(--gradient-energy)" }}>
                  Shop →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <section className="bg-ink text-white py-4 overflow-hidden">
        <div className="flex w-max marquee">
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((t, i) => (
            <div key={i} className="flex items-center gap-3 px-6 text-sm font-medium whitespace-nowrap">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"/>{t}
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS — moved directly below hero */}
      <section id="products" className="bg-secondary py-20 md:py-28">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl">Fix Your Energy. Sharpen Your Mind.</h2>
            <p className="mt-5 text-lg text-body">Two formulas. One mission: help you feel and think like yourself again.</p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <ProductCard
              hero
              slug="neural-performance"
              image={neuralImg}
              title="Circuit Neural Performance"
              subtitle="Focus & Cognitive Enhancement"
              price="$42.99"
              desc="A precision blend of **10 natural compounds** — **Alpha GPC**, **Bacopa**, **L-Theanine**, **Huperzine A**, and more — for **all-day mental clarity**, **sharp focus**, and **long-term brain health**."
              benefits={["Supports mental clarity*","Helps support focus and memory*","Smooth energy without jitters*","No artificial additives"]}
              cta="Sharpen Your Mind"
            />
            <ProductCard
              slug="nmn"
              image={nmnImg}
              title="Circuit NMN"
              subtitle="Cellular Energy & Longevity"
              price="$49.99"
              desc="Boosts **NAD+** for **all-day cellular energy**, **reduced crashes**, and **healthy aging** at the **mitochondrial level**. The foundation your body needs."
              benefits={["Helps support sustained daytime energy*","Supports cellular energy production*","Supports restful sleep*"]}
              cta="Fix Your Energy"
            />
          </div>
        </div>
      </section>

      {/* WHY CIRCUIT */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-40 -left-32 h-[480px] w-[480px] rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, var(--electric), transparent 60%)" }} />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-32 h-[520px] w-[520px] rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(circle, var(--energy), transparent 60%)" }} />
        <div className="container-x relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-wide uppercase mb-5 border border-border bg-secondary">
              <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--energy)" }} />
              <span className="text-ink/80">The Circuit Advantage</span>
            </div>
            <h2 className="text-3xl md:text-5xl">Why You Feel Tired and Foggy<br className="hidden md:block"/> <span className="italic font-display" style={{ background: "var(--gradient-energy)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>(And How Nutrition Can Help)</span></h2>
            <p className="mt-5 text-lg text-body">Your brain and body run on the same fuel. When that fuel runs low, everything feels off — energy, focus, memory, mood.</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({icon:Icon,title,desc,accent,tint,tag}, idx)=>(
              <div
                key={title}
                className="group relative rounded-2xl border border-border p-7 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                style={{ background: `linear-gradient(180deg, ${tint} 0%, var(--card) 70%)` }}
              >
                <div aria-hidden className="absolute -top-16 -right-16 h-40 w-40 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" style={{ background: accent }} />
                <div aria-hidden className="absolute top-0 left-0 right-0 h-1" style={{ background: accent }} />
                <div className="relative flex items-start justify-between mb-5">
                  <div className="h-14 w-14 rounded-xl flex items-center justify-center ring-1 ring-border bg-card shadow-sm" style={{ color: accent }}>
                    <Icon className="h-7 w-7" strokeWidth={2}/>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-ink/5 text-ink/60">{tag}</span>
                </div>
                <div className="relative">
                  <div className="text-[11px] font-mono text-ink/40 mb-1">0{idx+1}</div>
                  <h3 className="text-xl mb-2">{title}</h3>
                  <p className="text-sm text-body leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="bg-[#1A1A1A] text-white py-20 md:py-28">
        <div className="container-x">
          <h2 className="text-white text-3xl md:text-5xl">Sound Familiar?</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {painPoints.map((p)=>(
              <div key={p} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <X className="h-5 w-5 text-destructive mb-3"/>
                <p className="text-white/90 text-base font-medium leading-snug">{p}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 max-w-2xl">
            <p className="text-white/80 text-lg">You've tried everything — more coffee, energy drinks, vitamins, better sleep. Nothing works for more than an hour.</p>
            <a href="#science" className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary hover:bg-primary-dark text-white px-6 py-3 font-semibold transition">Here's Why →</a>
          </div>
        </div>
      </section>

      {/* SCIENCE */}
      <section id="science" className="py-20 md:py-28">
        <div className="container-x grid gap-12 md:grid-cols-2 items-center">
          <div className="relative bg-secondary rounded-2xl p-10 flex justify-center">
            <img src={neuralImg} alt="Circuit Neural Performance bottle" className="max-h-[520px] object-contain"/>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl">The Real Reason You're Foggy and Tired</h2>
            <div className="mt-6 space-y-4 text-body leading-relaxed">
              <p>It's not stress. It's not laziness. Your brain is running low on the raw materials it needs to function.</p>
              <p><strong className="text-ink">Acetylcholine is associated with focus, memory, and learning.</strong> Alpha GPC and Huperzine A in Circuit Neural Performance are included to help support acetylcholine levels.*</p>
              <p>L-Theanine and caffeine have been studied together for their potential to support calm, focused energy.* Bacopa monnieri has been studied for its role in supporting memory and learning.* Phosphatidylserine supports brain cell membrane integrity.*</p>
              <p>And for the energy your body needs to keep up with your brain: <strong className="text-ink">Circuit NMN supplies NMN, a direct precursor to NAD+</strong> — the coenzyme your mitochondria use in energy metabolism.*</p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                "Key ingredients studied in published research",
                "Formulated to support focus and energy*",
                "Quality-controlled manufacturing in the USA",
                "Natural ingredients, no artificial additives",
              ].map((s)=>(
                <div key={s} className="rounded-lg bg-secondary p-4 text-sm font-medium text-ink">{s}</div>
              ))}
            </div>
            <Link to="/product/$slug" params={{slug:"neural-performance"}} className="btn-primary mt-8">Shop Neural Performance</Link>
          </div>
        </div>
      </section>




      {/* HOW IT WORKS */}
      <section className="py-20 md:py-28 bg-secondary relative overflow-hidden">
        {/* Decorative glows */}
        <div aria-hidden className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, var(--electric), transparent 60%)" }} />
        <div aria-hidden className="pointer-events-none absolute -bottom-20 left-1/4 h-[300px] w-[300px] rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, var(--energy), transparent 60%)" }} />

        <div className="container-x relative">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-wide uppercase mb-5 border border-border bg-white">
              <CalendarCheck className="h-3.5 w-3.5" style={{ color: "var(--energy)" }} />
              <span className="text-ink/80">Simple Routine</span>
            </div>
            <h2 className="text-3xl md:text-5xl">How Circuit Works</h2>
            <p className="mt-5 text-lg text-body">Simple to take. Powerful results. Three steps to feeling like yourself again.</p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3 relative">
            {/* Connecting line for desktop */}
            <div aria-hidden className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-0.5" style={{ background: "linear-gradient(90deg, var(--primary) 0%, var(--electric) 50%, var(--energy) 100%)" }} />

            {[
              {icon: Pill, title: "Take Daily", desc: "One capsule of Neural Performance each morning. One capsule of NMN each morning. With or without food. Consistency is everything.", accent: "var(--primary)", tint: "oklch(0.59 0.025 245 / 0.08)"},
              {icon: Brain, title: "Ingredients Activate", desc: "Alpha GPC, Huperzine A, and L-Theanine begin supporting neurotransmitter function. NMN converts to NAD+ and restores cellular energy production.", accent: "var(--electric)", tint: "oklch(0.7 0.16 200 / 0.08)"},
              {icon: Sparkles, title: "Feel the Difference", desc: "Within 1-2 weeks: sharper focus, no brain fog, no afternoon crashes, consistent energy all day.", accent: "var(--energy)", tint: "oklch(0.72 0.18 55 / 0.1)"},
            ].map((s, i) => (
              <div key={s.title} className="relative flex flex-col items-center text-center group">
                {/* Step number circle */}
                <div className="relative z-10 mb-6">
                  <div
                    className="h-14 w-14 rounded-2xl flex items-center justify-center text-white font-display font-bold text-xl shadow-lg transition-transform duration-300 group-hover:scale-110"
                    style={{ background: s.accent }}
                  >
                    0{i + 1}
                  </div>
                </div>

                {/* Card */}
                <div
                  className="rounded-2xl border border-border p-7 bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full"
                  style={{ background: `linear-gradient(180deg, ${s.tint} 0%, white 60%)` }}
                >
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center mb-5 mx-auto"
                    style={{ background: s.accent + "15", color: s.accent }}
                  >
                    <s.icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl mb-3">{s.title}</h3>
                  <p className="text-body text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE/AFTER */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container-x">
          <h2 className="text-3xl md:text-5xl text-center">Life Before and After Circuit</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-destructive/5 border border-destructive/20 p-8">
              <h3 className="text-xl mb-5 text-destructive">Before Circuit</h3>
              <ul className="space-y-3">
                {["Brain fog by 10am","Can't focus for more than 20 minutes","Exhausted by 2pm every day","Coffee gives jitters, not clarity","Weekends spent recovering","Sleep doesn't help anymore"].map(i=>(
                  <li key={i} className="flex gap-3 text-body"><X className="h-5 w-5 text-destructive shrink-0 mt-0.5"/>{i}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-success/5 border border-success/20 p-8">
              <h3 className="text-xl mb-5 text-success">After Circuit</h3>
              <ul className="space-y-3">
                {["Sharp, clear thinking all morning","Deep focus that lasts for hours","Consistent energy morning to evening","Smooth, jitter-free mental energy","Weekends full of energy","Wake up actually rested"].map(i=>(
                  <li key={i} className="flex gap-3 text-body"><Check className="h-5 w-5 text-success shrink-0 mt-0.5"/>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — placeholder until real reviews are collected via review platform */}

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container-x max-w-3xl">
          <h2 className="text-3xl md:text-5xl text-center">Questions, Answered</h2>
          <div className="mt-12 space-y-3">
            {faqs.map((f,i)=><FaqItem key={i} q={f.q} a={f.a}/>)}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-primary text-white py-20 md:py-24">
        <div className="container-x text-center max-w-2xl">
          <h2 className="text-white text-3xl md:text-5xl">Stop Running on Empty.<br/>Start Thinking Clearly.</h2>
          <p className="mt-5 text-white/90 text-lg">Join the community choosing Circuit to support their daily energy and focus.</p>
          <Link to="/shop" className="btn-white mt-8">Shop Circuit</Link>
          <p className="mt-5 text-white/70 text-xs">60-day money-back guarantee · Free shipping over $75</p>
        </div>
      </section>

      {/* EMAIL */}
      <section className="bg-[#0c0c0c] text-white py-16">
        <div className="container-x max-w-2xl text-center">
          <h2 className="text-white text-2xl md:text-4xl">Stay in the Loop</h2>
          <p className="mt-3 text-white/70">Tips on beating fatigue, sharpening focus, and getting the most from Circuit.</p>
          <KlaviyoInlineForm />
          <p className="mt-4 text-xs text-white/50">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  );
}

function KlaviyoInlineForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/public/klaviyo-subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setMessage("You're on the list — check your inbox shortly.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <>
      <form className="mt-7 flex flex-col sm:flex-row gap-3 justify-center" onSubmit={onSubmit} noValidate>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={255}
          placeholder="you@example.com"
          autoComplete="email"
          className="flex-1 max-w-sm rounded-md bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === "success" ? "Subscribed" : status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {status === "error" && <p className="mt-3 text-sm text-[oklch(0.78_0.16_30)]">{message}</p>}
      {status === "success" && <p className="mt-3 text-sm text-[oklch(0.85_0.15_150)]">{message}</p>}
    </>
  );
}

function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-bold text-ink">{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function ProductCard(props: { hero?: boolean; slug: string; image: string; title: string; subtitle: string; price: string; desc: string; benefits: string[]; cta: string }) {
  return (
    <div className={`group relative rounded-3xl bg-white overflow-hidden border ${props.hero ? "border-primary/40 shadow-2xl" : "border-border shadow-md"} p-8 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl`}>
      {/* Decorative glow */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-70" style={{ background: props.hero ? "var(--gradient-energy)" : "radial-gradient(circle, var(--electric), transparent 60%)" }} />
      {props.hero && (
        <div className="absolute top-5 right-5 z-10 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] font-bold px-3 py-1.5 rounded-full text-white shadow-lg" style={{ background: "var(--gradient-energy)" }}>
          <Sparkles className="h-3 w-3" /> Most Popular
        </div>
      )}
      <div className="relative aspect-square rounded-2xl mb-6 overflow-hidden ring-1 ring-border">
        <img src={props.image} alt={props.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
      </div>
      <div className="relative">
        <div className="text-xs uppercase tracking-[0.18em] text-primary font-bold">{props.subtitle}</div>
        <h3 className="text-2xl md:text-3xl mt-1.5 leading-tight">{props.title}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-display font-bold text-ink">{props.price}</span>
          <span className="text-sm text-muted-foreground">/ bottle</span>
        </div>
        <p className="mt-4 text-body text-sm leading-relaxed">{renderBold(props.desc)}</p>
        <ul className="mt-5 space-y-2.5">
          {props.benefits.map(b=>(
            <li key={b} className="flex items-center gap-2.5 text-sm text-body">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-success/15 shrink-0">
                <Check className="h-3 w-3 text-success" strokeWidth={3}/>
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto pt-7 relative">
        <Link
          to="/product/$slug"
          params={{slug:props.slug}}
          className="group/btn relative inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 overflow-hidden"
          style={{ background: props.hero ? "var(--gradient-energy)" : "linear-gradient(135deg, var(--primary), var(--electric))" }}
        >
          <span className="relative z-10">{props.cta}</span>
          <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
          <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
        </Link>
        <p className="mt-3 text-xs text-muted-foreground text-center">60-day guarantee • Free shipping over $75</p>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl bg-white border border-border overflow-hidden">
      <button onClick={()=>setOpen(o=>!o)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
        <span className="font-display font-semibold text-ink">{q}</span>
        <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${open?"rotate-180":""}`}/>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${open?"grid-rows-[1fr] opacity-100":"grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden"><p className="px-5 pb-5 text-body text-sm leading-relaxed">{a}</p></div>
      </div>
    </div>
  );
}

