import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import edgeHero from "@/assets/adv-edge-hero.jpg";
import edgeSplitAsset from "@/assets/adv-edge-split-v2.png.asset.json";
import bottleImg from "@/assets/neural-bottle.png";
import reviewManOfficeBlueAsset from "@/assets/review-uploaded-man-office-blue.png.asset.json";
import reviewManOfficeDarkAsset from "@/assets/review-uploaded-man-office-dark.png.asset.json";
import reviewWomanLaptopAsset from "@/assets/review-woman-laptop.png.asset.json";
import reviewManGlassesSofaAsset from "@/assets/review-man-glasses-sofa.png.asset.json";
import reviewBottleKitchenAsset from "@/assets/review-bottle-kitchen.png.asset.json";
import reviewWomanMugKitchenAsset from "@/assets/review-woman-mug-kitchen.png.asset.json";

const edgeSplit = edgeSplitAsset.url;
const reviewManOfficeBlue = reviewManOfficeBlueAsset.url;
const reviewManOfficeDark = reviewManOfficeDarkAsset.url;
const reviewWomanLaptop = reviewWomanLaptopAsset.url;
const reviewManGlassesSofa = reviewManGlassesSofaAsset.url;
const reviewBottleKitchen = reviewBottleKitchenAsset.url;
const reviewWomanMugKitchen = reviewWomanMugKitchenAsset.url;


export const Route = createFileRoute("/case-study-edge")({
  head: () => ({
    meta: [
      { title: "Out-Worked or Out-Focused? — A Focus Case Study | Circuit" },
      { name: "description", content: "Same hours, same effort — but some professionals stay sharp for the whole day. A case study on the quiet edge that decides who finishes ahead." },
      { property: "og:title", content: "Out-Worked or Out-Focused? — A Focus Case Study" },
      { property: "og:description", content: "Why the hardest worker in the room still finishes a step behind — and what the people staying sharp are actually doing differently." },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: CaseStudyEdge,
});

/* ---------- shared editorial bits ---------- */

const BG = "#FAF8F5";
const INK = "#2C353F";
const ORANGE = "#F5853F";

function track(event: string, payload?: Record<string, unknown>) {
  try {
    const w = window as unknown as { dataLayer?: unknown[]; fbq?: (...a: unknown[]) => void };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event, ...payload });
    if (typeof w.fbq === "function") w.fbq("trackCustom", event, payload || {});
  } catch {}
}

function useFadeUp() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function FadeUp({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useFadeUp();
  return (
    <div ref={ref} className={className} style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 600ms ease, transform 600ms ease" }}>
      {children}
    </div>
  );
}

const eyebrowClass = "text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em]";

/* ---------- page ---------- */

function CaseStudyEdge() {
  const [progress, setProgress] = useState(0);
  const [ctaDismissed, setCtaDismissed] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const firedDepths = useRef<Set<number>>(new Set());

  useEffect(() => {
    track("advertorial_view", { page: "case-study-edge" });
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? Math.min(100, Math.round((scrolled / max) * 100)) : 0;
      setProgress(pct);
      if (scrolled > 600) setShowSticky(true);
      for (const d of [25, 50, 75, 100]) {
        if (pct >= d && !firedDepths.current.has(d)) {
          firedDepths.current.add(d);
          track("advertorial_scroll", { depth: d });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ctaClick = (placement: string) => track("advertorial_cta_click", { placement });

  return (
    <div style={{ background: BG, color: INK }} className="min-h-screen">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
        <div className="h-full transition-[width] duration-150 ease-out" style={{ width: `${progress}%`, background: ORANGE }} />
      </div>

      {/* Editorial chrome */}
      <header className="border-b border-black/5">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-5 py-4 md:py-5">
          <span className="text-[10px] uppercase tracking-[0.28em] text-black/45">The Focus Journal — a case study</span>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="relative h-[55vh] min-h-[360px] w-full overflow-hidden sm:h-[65vh] md:h-[78vh] md:min-h-[520px]">
          <img
            src={edgeHero}
            alt="A focused professional working as a tired coworker fades in the background"
            className="absolute inset-0 h-full w-full object-cover object-[60%_35%] sm:object-center"
            width={1600}
            height={1024}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.55) 88%, rgba(0,0,0,0.70) 100%)" }} />
          <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col justify-end px-5 pb-12 md:pb-20">
            <div className={eyebrowClass} style={{ color: ORANGE, textShadow: "0 1px 16px rgba(0,0,0,0.4)" }}>
              Real Results · 5 min read
            </div>
            <h1 className="mt-5 font-serif text-4xl leading-[1.05] md:text-6xl md:leading-[1.04]" style={{ fontFamily: '"Instrument Serif", Georgia, serif', color: "#FFFFFF", textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}>
              The Edge They Were Looking For Wasn't More Hours — It Was This
            </h1>
            <p className="mt-5 max-w-2xl text-lg md:text-xl font-medium" style={{ color: "#FFFFFF", lineHeight: 1.55, textShadow: "0 1px 16px rgba(0,0,0,0.35)" }}>
              How a 31-year-old sales lead went from 2pm crashes to all-day focus — without more caffeine.
            </p>
          </div>
        </div>
        {/* Above-the-fold one-line result + CTA */}
        <div className="mx-auto max-w-3xl px-5 pt-6">
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_10px_30px_-18px_rgba(44,53,63,0.25)] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-base font-bold text-white" style={{ background: ORANGE }}>30d</span>
              <p className="text-[15px] font-semibold leading-snug" style={{ color: INK }}>
                Same hours, same effort — but the 2pm wall stopped showing up.
              </p>
            </div>
            <Link
              to="/product/$slug"
              params={{ slug: "neural-performance" }}
              onClick={() => track("advertorial_cta_click", { placement: "hero_inline" })}
              className="shrink-0 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_24px_-10px_rgba(245,133,63,0.6)]"
              style={{ background: ORANGE }}
            >
              Get the same edge — 45% off →
            </Link>
          </div>
          <p className="mt-3 text-sm italic text-black/55">Two people, same workload. One fades at 2pm. One doesn't.</p>
        </div>

        {/* Stat strip */}
        <div className="mx-auto mt-8 max-w-5xl px-5">
          <div className="grid grid-cols-2 gap-y-4 border-y border-black/10 py-5 md:grid-cols-4 md:gap-0">
            {[
              { i: "★", t: "4.8 average rating" },
              { i: "✓", t: "500+ verified reviews" },
              { i: "⌬", t: "3rd-party tested" },
              { i: "▲", t: "Made in USA" },
            ].map((s) => (
              <div key={s.t} className="flex items-center justify-center gap-2 text-sm font-semibold md:text-[15px]" style={{ color: INK }}>
                <span style={{ color: ORANGE }}>{s.i}</span>
                <span>{s.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BODY */}
      <article className="mx-auto max-w-[680px] px-5 pb-24 pt-16 md:pt-24" style={{ fontSize: 19, lineHeight: 1.7 }}>
        {/* Section 1 */}
        <FadeUp>
          <Eyebrow>Section 01 — The Pattern</Eyebrow>
          <SubHead>The hardest worker, a quiet step behind.</SubHead>
          <p className="mt-6">
            <span
              className="float-left mr-3 mt-1 font-serif text-[64px] leading-[0.85]"
              style={{ fontFamily: '"Instrument Serif", Georgia, serif', color: ORANGE }}
            >
              T
            </span>
            ake a 31-year-old sales lead. First in, last out. Pipeline reviewed before most people are out of bed. Mornings are theirs — calls land, decks ship, problems get solved. Then 2pm hits and everything narrows. The follow-ups slip a day. The strategy doc moves to "tomorrow." The week ends with a long list of almost.
          </p>
          <p className="mt-5">
            Meanwhile a peer — not smarter, not working longer — keeps closing the day out. Same meetings, same inbox, but they're still sharp at 5pm. They're not grinding harder. They just have more usable hours in their head.
          </p>
          <p className="mt-5 font-semibold">
            We heard this story over and over from founders, operators, and managers. It wasn't an effort problem. It was a focus problem.
          </p>
        </FadeUp>

        <PullQuote attribution="Andre W. — Verified Customer">
          “I wasn't getting out-worked. I was getting out-focused.”
        </PullQuote>

        {/* Section 2 */}
        <FadeUp>
          <Eyebrow>Section 02 — The Expensive Fixes</Eyebrow>
          <SubHead>The expensive fixes that quietly made it worse.</SubHead>
          <p className="mt-6 font-semibold">
            Another coffee. An energy drink at 3pm. A scoop of pre-workout before a big call.
          </p>
          <p className="mt-5">
            Each one bought about 20 good minutes — then the crash came back, and it always collected with interest. Heart a little quick. Hands a little shaky. Focus, somehow, worse than before they reached for it.
          </p>
          <p className="mt-5">
            The fixes weren't fixing anything. They were borrowing energy from later in the day at a brutal rate. The edge they were chasing was disappearing on the same stimulants they were using to find it.
          </p>
        </FadeUp>
      </article>

      {/* Section 3 + graph (full-width) */}
      <section className="bg-white/70">
        <div className="mx-auto max-w-[680px] px-5 py-16 md:py-20" style={{ fontSize: 19, lineHeight: 1.7 }}>
          <FadeUp>
            <Eyebrow>Section 03 — The Mechanism</Eyebrow>
            <SubHead>The edge nobody talks about.</SubHead>
            <p className="mt-6 font-semibold">
              Your brain burns through focus chemistry across the day. Caffeine doesn't refuel it — it just hides the empty tank.
            </p>
            <p className="mt-5">
              While you're awake, a molecule called adenosine builds up — it's your brain's "you're getting tired" signal. Large doses of caffeine block that signal. The tank keeps draining; you just stop feeling it. When the caffeine wears off, all that blocked adenosine floods back at once, and the floor falls out.
            </p>
            <p className="mt-5">
              The people who stay sharp through the afternoon aren't grinding harder. They're running on a full tank instead of three good hours — and they're not paying for it at 3pm.
            </p>
          </FadeUp>
        </div>

        <FadeUp className="mx-auto max-w-5xl px-5 pb-16 md:pb-20">
          <FocusGraph />
          <p className="mt-3 text-center text-sm italic text-black/55">
            Coffee spikes and crashes. Calm focus chemistry stays level across the workday.
          </p>
          <div className="mt-8 text-center">
            <Link
              to="/product/$slug"
              params={{ slug: "neural-performance" }}
              onClick={() => ctaClick("inline_link")}
              className="text-base font-semibold underline-offset-4 hover:underline"
              style={{ color: ORANGE }}
            >
              See what keeps them sharp →
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* Section 4 */}
      <article className="mx-auto max-w-[680px] px-5 py-16 md:py-24" style={{ fontSize: 19, lineHeight: 1.7 }}>
        <FadeUp>
          <Eyebrow>Section 04 — What Changed</Eyebrow>
          <SubHead>A full tank, not three good hours.</SubHead>
          <p className="mt-6 font-semibold">
            Circuit's Neural Performance is one capsule. The job is steady focus — not a stimulant hit.
          </p>
          <p className="mt-5">
            Inside: a small dose of natural caffeine paired with L-theanine — a combination shown in double-blind research to deliver smooth attention with less jitter. Stacked on top: clinically-studied Alpha-GPC and Bacopa monnieri, both used to support the focus chemistry your brain actually runs on.
          </p>
          <p className="mt-5">
            One a day. Third-party tested. No spike, no crash, no shaky hands at 3pm.
          </p>
        </FadeUp>
      </article>

      {/* Before / After split */}
      <FadeUp className="mx-auto max-w-6xl px-5">
        <div className="relative mx-auto max-w-[520px] overflow-hidden rounded-2xl shadow-[0_20px_60px_-20px_rgba(44,53,63,0.25)] md:max-w-[640px]">
          <div className="relative aspect-[3/4]">
            <img src={edgeSplit} alt="Before and after — faded at desk vs locked in" className="absolute inset-0 h-full w-full object-contain" loading="lazy" />
            <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">Before</span>
            <span className="absolute right-3 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white" style={{ background: ORANGE, top: "calc(50% + 56px)" }}>After</span>
          </div>
        </div>
        <p className="mt-3 text-center text-sm italic text-black/55">Same hours. A full day of sharp instead of three good hours.</p>
      </FadeUp>

      {/* Section 5 — payoff */}
      <article className="mx-auto max-w-[680px] px-5 py-16 md:py-24" style={{ fontSize: 19, lineHeight: 1.7 }}>
        <FadeUp>
          <Eyebrow>Section 05 — Thirty Days In</Eyebrow>
          <SubHead>What changed over 30 days.</SubHead>
          <p className="mt-6">
            The shift wasn't dramatic. That's the point. The 2pm wall just stopped showing up — and the back half of the day started belonging to them again.
          </p>
        </FadeUp>
      </article>

      <FadeUp className="mx-auto max-w-5xl px-5">
        <ComparisonCard />
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <Link
            to="/product/$slug"
            params={{ slug: "neural-performance" }}
            onClick={() => ctaClick("post_results")}
            className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-bold text-white shadow-[0_12px_30px_-10px_rgba(245,133,63,0.6)] transition hover:translate-y-[-1px]"
            style={{ background: ORANGE }}
          >
            Get the same edge — 45% off →
          </Link>
          <p className="text-xs uppercase tracking-[0.18em] text-black/50">Free shipping · 30-day money-back</p>
        </div>
      </FadeUp>

      <FadeUp className="mx-auto max-w-5xl px-5 pt-16 md:pt-20">
        <Timeline />
        <p className="mt-6 text-center text-xs italic text-black/50">
          Representative of commonly reported experiences. Individual results vary.
        </p>
      </FadeUp>

      {/* Section 6 — evidence */}
      <section className="mt-20 bg-white/70 py-16 md:py-24">
        <div className="mx-auto max-w-[680px] px-5" style={{ fontSize: 19, lineHeight: 1.7 }}>
          <FadeUp>
            <Eyebrow>Section 06 — The Evidence</Eyebrow>
            <SubHead>The science, in plain English.</SubHead>
            <p className="mt-6">
              We didn't invent these ingredients. We picked the ones with the cleanest research and dosed them the way the studies did.
            </p>
          </FadeUp>
        </div>
        <FadeUp className="mx-auto mt-10 grid max-w-5xl gap-5 px-5 md:grid-cols-3">
          <EvidenceCard
            icon="☕"
            title="The crash is real chemistry."
            body="Adenosine builds while you're awake. Large doses of caffeine block it. When that caffeine wears off, the blocked signal rebounds — and the afternoon falls out."
            source="Harvard Medical School · Sleep Research"
            href="https://healthysleep.med.harvard.edu/healthy/science/how/neurophysiology"
          />
          <EvidenceCard
            icon="⚡"
            title="Caffeine + L-theanine = a cleaner mechanism."
            body="Used together in the right ratio, the pair shifts attention without brute-forcing adenosine the way high-dose caffeine alone does. Research shows improved selective attention, faster reaction time, and less jitter."
            source="Cambridge / British Journal of Nutrition · review PMC8794723"
            href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8794723/"
          />
          <EvidenceCard
            icon="🧠"
            title="Bacopa supports memory & attention."
            body="Clinically studied with daily use for improvements in recall, processing speed, and information retention."
            source="PubMed 11498727"
            href="https://pubmed.ncbi.nlm.nih.gov/11498727/"
          />
        </FadeUp>
        <p className="mx-auto mt-8 max-w-3xl px-5 text-center text-xs text-black/55">
          Ingredients are clinically studied. Circuit is a dietary supplement, not a drug.
        </p>
      </section>

      {/* Section 7 — social proof */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[680px] px-5">
          <FadeUp>
            <Eyebrow>Section 07 — Real People</Eyebrow>
            <SubHead>Notes from professionals who got their edge back.</SubHead>
          </FadeUp>
        </div>
        <FadeUp className="mx-auto mt-10 grid max-w-5xl gap-5 px-5 sm:grid-cols-2 lg:grid-cols-3">
          <ReviewCard
            initials="E.R."
            name="Ethan R."
            rating={5}
            title="Way more dialed in at work"
            image={reviewManOfficeBlue}
            quote="Started taking it before work and noticed I wasn't bouncing between tabs as much. My attention just feels more steady all morning."
          />
          <ReviewCard
            initials="A.W."
            name="Andre W."
            rating={5}
            title="Desk-day focus is way better"
            image={reviewManOfficeDark}
            quote="I wasn't getting out-worked. I was getting out-focused. I'm in meetings most of the day and Circuit keeps me sharper without that over-caffeinated feeling. The difference is most obvious around 2 or 3pm."
          />
          <ReviewCard
            initials="H.R."
            name="Hannah Reinholt"
            rating={4}
            title="Subtle but real"
            image={reviewWomanLaptop}
            quote="Don't expect a rush. Expect to finish your to-do list without zoning out. That's exactly what I got."
          />
          <ReviewCard
            initials="D.C."
            name="Daniel C."
            rating={5}
            title="Actually notice the difference"
            image={reviewManGlassesSofa}
            quote="Usually I need weeks to know if something is working. This felt obvious by the end of bottle one — better concentration and a much smoother workday."
          />
          <ReviewCard
            initials="D.K."
            name="David K."
            rating={5}
            title="Great for deep work"
            image={reviewBottleKitchen}
            quote="I write code for a living. This helps me hold complex problems in my head longer. Not magic, but real."
          />
          <ReviewCard
            initials="M.R."
            name="Melissa R."
            rating={5}
            title="Coffee + this = best combo"
            image={reviewWomanMugKitchen}
            quote="One capsule with breakfast and my first coffee has been the best setup for long mornings. Cleaner than my old stack."
          />

        </FadeUp>
      </section>

      {/* Section 8 — offer bridge */}
      <section className="bg-white/70 py-16 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 md:grid-cols-[1fr_1.1fr] md:items-center">
          <FadeUp>
            <div className="relative mx-auto aspect-square max-w-md rounded-2xl bg-[#F2EFEA] p-6">
              <img src={bottleImg} alt="Circuit Neural Performance bottle" className="absolute inset-0 h-full w-full object-contain p-6" loading="lazy" />
            </div>
          </FadeUp>
          <FadeUp>
            <Eyebrow>Section 08 — Try It</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl" style={{ fontFamily: '"Instrument Serif", Georgia, serif', lineHeight: 1.1 }}>
              Get your edge back.
            </h2>
            <ul className="mt-6 space-y-3 text-[17px]">
              {[
                "No jitters, no crash",
                "One capsule a day",
                "Clinically-studied ingredients",
                "Third-party tested, made in USA",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-[6px] inline-block h-2 w-2 rounded-full" style={{ background: ORANGE }} />
                  <span className="font-semibold">{b}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/product/$slug"
              params={{ slug: "neural-performance" }}
              onClick={() => ctaClick("primary_button")}
              className="mt-8 inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-bold text-white shadow-[0_12px_30px_-10px_rgba(245,133,63,0.6)] transition hover:translate-y-[-1px]"
              style={{ background: ORANGE }}
            >
              Get Your Edge Back →
            </Link>
            <p className="mt-5 text-[15px] font-medium" style={{ color: INK }}>
              Try it 30 days. If you're not operating at a higher level, keep the bottle — we refund you.
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs uppercase tracking-[0.18em] text-black/55">
              <span>30-Day Money-Back</span>
              <span>3rd-Party Tested</span>
              <span>Made in USA</span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Footer compliance */}
      <footer className="border-t border-black/10 px-5 py-10 text-center">
        <p className="mx-auto max-w-2xl text-xs leading-relaxed text-black/55">
          These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results vary.
        </p>
        <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-black/40">Advertisement · © Circuit Energy</p>
      </footer>

      {/* Sticky CTA */}
      {showSticky && !ctaDismissed && (
        <div className="fixed inset-x-0 bottom-3 z-40 px-3 md:bottom-5">
          <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-full border border-black/10 bg-white/95 p-2 pl-3 shadow-[0_18px_40px_-18px_rgba(44,53,63,0.35)] backdrop-blur">
            <div className="h-9 w-9 shrink-0 rounded-full bg-[#F2EFEA] p-1">
              <img src={bottleImg} alt="" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0 flex-1 text-[13px] font-semibold md:text-sm" style={{ color: INK }}>
              Get the same edge — 45% off
            </div>
            <Link
              to="/product/$slug"
              params={{ slug: "neural-performance" }}
              onClick={() => ctaClick("sticky_bar")}
              className="shrink-0 rounded-full px-4 py-2 text-sm font-bold text-white"
              style={{ background: ORANGE }}
            >
              Claim 45% →
            </Link>
            <button
              onClick={() => setCtaDismissed(true)}
              aria-label="Dismiss"
              className="ml-1 shrink-0 rounded-full p-1.5 text-black/40 hover:bg-black/5 hover:text-black/70"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- editorial primitives ---------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className={eyebrowClass} style={{ color: ORANGE }}>
      <span className="mr-3 inline-block h-px w-6 align-middle" style={{ background: ORANGE }} />
      {children}
    </div>
  );
}

function SubHead({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-4 font-serif text-3xl leading-[1.1] md:text-[40px]" style={{ fontFamily: '"Instrument Serif", Georgia, serif', color: INK }}>
      {children}
    </h2>
  );
}

function PullQuote({ children, attribution }: { children: React.ReactNode; attribution?: string }) {
  return (
    <FadeUp>
      <blockquote
        className="my-14 border-l-[3px] pl-6 font-serif italic md:my-20 md:pl-8"
        style={{
          borderColor: ORANGE,
          fontFamily: '"Instrument Serif", Georgia, serif',
          fontSize: "clamp(28px, 4.2vw, 36px)",
          lineHeight: 1.25,
          color: INK,
        }}
      >
        {children}
        {attribution && (
          <footer className="mt-4 not-italic text-[12px] font-semibold uppercase tracking-[0.18em] text-black/55">
            <span style={{ fontFamily: '"Inter", system-ui, sans-serif' }}>— {attribution}</span>
          </footer>
        )}
      </blockquote>
    </FadeUp>
  );
}

/* ---------- infographics ---------- */

function FocusGraph() {
  const W = 900;
  const H = 320;
  const padL = 50;
  const padR = 20;
  const padT = 30;
  const padB = 50;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const hours = ["9", "10", "11", "12", "1", "2", "3", "4", "5", "6"];

  const coffeePts = [
    [0.0, 0.55],
    [0.08, 0.75],
    [0.16, 0.95],
    [0.28, 0.92],
    [0.4, 0.78],
    [0.5, 0.5],
    [0.58, 0.22],
    [0.66, 0.18],
    [0.78, 0.32],
    [0.9, 0.28],
    [1.0, 0.2],
  ];
  const circuitPts = [
    [0.0, 0.55],
    [0.1, 0.7],
    [0.2, 0.78],
    [0.35, 0.82],
    [0.5, 0.82],
    [0.65, 0.8],
    [0.78, 0.78],
    [0.9, 0.72],
    [1.0, 0.65],
  ];

  const toXY = ([t, v]: number[]) => [padL + t * innerW, padT + (1 - v) * innerH];
  const smoothPath = (pts: number[][]) => {
    const xy = pts.map(toXY);
    if (xy.length < 2) return "";
    let d = `M${xy[0][0]},${xy[0][1]}`;
    for (let i = 0; i < xy.length - 1; i++) {
      const [x0, y0] = xy[i];
      const [x1, y1] = xy[i + 1];
      const mx = (x0 + x1) / 2;
      d += ` Q${x0},${y0} ${mx},${(y0 + y1) / 2} T${x1},${y1}`;
    }
    return d;
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 bg-white p-5 md:p-7 shadow-[0_18px_50px_-25px_rgba(44,53,63,0.25)]">
      <div className="mb-2 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className={eyebrowClass} style={{ color: ORANGE }}>Figure 01</div>
          <h3 className="mt-1 font-serif text-2xl md:text-3xl" style={{ fontFamily: '"Instrument Serif", Georgia, serif', color: INK }}>
            Coffee vs. Circuit — a workday in focus
          </h3>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-2"><span className="h-[3px] w-5 rounded-full" style={{ background: "#9CA3AF" }} />Coffee</span>
          <span className="flex items-center gap-2"><span className="h-[3px] w-5 rounded-full" style={{ background: ORANGE }} />Circuit</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Coffee versus Circuit focus levels across a workday">
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1={padL} x2={W - padR} y1={padT + g * innerH} y2={padT + g * innerH} stroke="#E7E3DC" strokeDasharray="3 4" />
        ))}
        <line x1={padL} x2={W - padR} y1={H - padB} y2={H - padB} stroke="#2C353F" strokeWidth="1" />
        {hours.map((h, i) => {
          const x = padL + (i / (hours.length - 1)) * innerW;
          return (
            <text key={h} x={x} y={H - padB + 22} textAnchor="middle" fontSize="12" fill="#6A7786">
              {h}
            </text>
          );
        })}
        <text x={padL - 38} y={padT + 6} fontSize="11" fill="#6A7786">Focus</text>
        <text x={padL - 38} y={H - padB} fontSize="11" fill="#6A7786">Low</text>
        <path d={smoothPath(coffeePts)} fill="none" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
        <path d={smoothPath(circuitPts)} fill="none" stroke={ORANGE} strokeWidth="3.5" strokeLinecap="round" />
        {(() => {
          const [cx, cy] = toXY([0.62, 0.2]);
          return (
            <g>
              <circle cx={cx} cy={cy} r="5" fill="#9CA3AF" />
              <line x1={cx} x2={cx + 60} y1={cy} y2={cy - 30} stroke="#9CA3AF" strokeWidth="1" />
              <text x={cx + 64} y={cy - 28} fontSize="11" fill="#6A7786" fontWeight="600">Afternoon crash</text>
            </g>
          );
        })()}
        {(() => {
          const [cx, cy] = toXY([0.5, 0.82]);
          return (
            <g>
              <circle cx={cx} cy={cy} r="5" fill={ORANGE} />
              <line x1={cx} x2={cx - 50} y1={cy} y2={cy - 30} stroke={ORANGE} strokeWidth="1" />
              <text x={cx - 54} y={cy - 34} fontSize="11" fill={ORANGE} fontWeight="700" textAnchor="end">Calm, steady focus</text>
            </g>
          );
        })()}
        <text x={(padL + W - padR) / 2} y={H - 8} textAnchor="middle" fontSize="11" fill="#6A7786">Workday (9am → 6pm)</text>
      </svg>
    </div>
  );
}

function ComparisonCard() {
  const rows = [
    { bad: "Faded by 2pm", good: "Sharp through 5pm" },
    { bad: "Best work in the morning only", good: "Productive all day" },
    { bad: "Pushed tasks to tomorrow", good: "Closed the day out" },
    { bad: "Losing ground to peers", good: "Holding the edge" },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_18px_50px_-25px_rgba(44,53,63,0.25)]">
      <div className="grid grid-cols-2 border-b border-black/10 text-center text-xs font-bold uppercase tracking-[0.2em] md:text-sm">
        <div className="py-4" style={{ background: "#FBEDED", color: "#A24343" }}>Before</div>
        <div className="py-4" style={{ background: "#ECF6EF", color: "#1E7A4D" }}>After 30 days</div>
      </div>
      <div className="divide-y divide-black/5">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-2 text-[15px] md:text-base">
            <div className="flex items-start gap-3 px-5 py-5 md:px-7">
              <span className="mt-[2px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: "#F4D6D6", color: "#A24343" }}>✕</span>
              <span className="font-medium" style={{ color: "#6A4646" }}>{r.bad}</span>
            </div>
            <div className="flex items-start gap-3 px-5 py-5 md:px-7">
              <span className="mt-[2px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: "#CDEBD7", color: "#1E7A4D" }}>✓</span>
              <span className="font-semibold" style={{ color: INK }}>{r.good}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Timeline() {
  const nodes = [
    { tag: "Week 1", title: "Steadier energy", body: "Fewer 2pm slumps. The afternoon stops feeling like a wall." },
    { tag: "Weeks 2–4", title: "Sharper focus & recall", body: "Switching tasks costs less mental fuel. Names, numbers, threads stay closer to the surface." },
    { tag: "Month 2+", title: "Clear thinking as baseline", body: "It just becomes the default. You stop noticing the lift — you notice when you skip it." },
  ];
  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-[34px] hidden h-px bg-black/15 md:block" />
      <div className="grid gap-8 md:grid-cols-3">
        {nodes.map((n, i) => (
          <div key={i} className="relative text-center md:text-left">
            <div className="mx-auto mb-3 grid h-[68px] w-[68px] place-items-center rounded-full border border-black/10 bg-white font-serif text-2xl shadow-[0_8px_24px_-12px_rgba(44,53,63,0.3)] md:mx-0" style={{ fontFamily: '"Instrument Serif", Georgia, serif', color: ORANGE }}>
              {i + 1}
            </div>
            <div className={eyebrowClass} style={{ color: ORANGE }}>{n.tag}</div>
            <h4 className="mt-1 font-serif text-2xl" style={{ fontFamily: '"Instrument Serif", Georgia, serif', color: INK }}>{n.title}</h4>
            <p className="mt-2 text-[15px] leading-relaxed text-black/70">{n.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EvidenceCard({ icon, title, body, source, href }: { icon: string; title: string; body: string; source: string; href: string }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-[0_10px_30px_-18px_rgba(44,53,63,0.25)]">
      <div className="grid h-10 w-10 place-items-center rounded-xl text-lg" style={{ background: "#FFF1E6", color: ORANGE }}>{icon}</div>
      <h4 className="mt-4 mb-0 font-serif text-xl leading-snug" style={{ fontFamily: '"Instrument Serif", Georgia, serif', color: INK }}>{title}</h4>
      <p className="mt-0 flex-1 text-[15px] leading-relaxed text-black/70">{body}</p>
      <a href={href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline" style={{ color: ORANGE }}>
        View study ↗
      </a>
      <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-black/45">{source}</p>
    </div>
  );
}

function ReviewCard({
  initials,
  name,
  quote,
  image,
  title,
  rating,
}: {
  initials: string;
  name: string;
  quote: string;
  image?: string;
  title?: string;
  rating?: number;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_10px_30px_-18px_rgba(44,53,63,0.25)]">
      {image && (
        <div className="relative w-full bg-[#F2EFEA]">
          <img
            src={image}
            alt={`Photo from ${name}`}
            className="h-auto max-h-[420px] w-full object-contain md:aspect-[4/3] md:max-h-none md:object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-white" style={{ background: INK }}>
            {initials}
          </div>
          <div>
            <div className="text-sm font-bold" style={{ color: INK }}>{name}</div>
            {rating != null && (
              <div className="mt-0.5 text-xs tracking-wide text-amber-500">
                {"★".repeat(rating)}
                <span className="ml-1 text-black/40">{rating.toFixed(1)}</span>
              </div>
            )}
            <div className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-[#ECF6EF] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "#1E7A4D" }}>
              ✓ Verified
            </div>
          </div>
        </div>
        {title && <p className="mt-3 text-sm font-bold text-black/90">“{title}”</p>}
        <p className="mt-3 text-[15px] leading-relaxed text-black/75">“{quote}”</p>
      </div>
    </div>
  );
}
