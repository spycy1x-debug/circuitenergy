import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, ShieldCheck, Star } from "lucide-react";

import heroMirror from "@/assets/nmn-review-bathroom-mirror.png.asset.json";
import morningRitual from "@/assets/nmn-morning-ritual.png.asset.json";
import bottleHero from "@/assets/nmn-bottle-hero.png.asset.json";

export const Route = createFileRoute("/glow")({
  head: () => ({
    meta: [
      { title: "The Photo That Made Me Google “Why Do I Look So Tired” | Seralie Journal" },
      {
        name: "description",
        content:
          "I wasn't tired. But every photo said otherwise. What I learned about NAD+ changed how I think about aging — and what I do every morning now.",
      },
      { property: "og:title", content: "The Photo That Made Me Google “Why Do I Look So Tired”" },
      {
        property: "og:description",
        content: "A reader's story about the molecule behind “tired face” — and the morning ritual that changed hers.",
      },
    ],
  }),
  component: GlowStoryPage,
});

function GlowStoryPage() {
  return (
    <article className="bg-[#FDF8EE] text-[#3B2E25]">
      {/* EDITORIAL HEADER */}
      <header className="container-x pt-14 md:pt-20 max-w-3xl mx-auto text-center">
        <div className="eyebrow">Seralie Journal · Reader Story</div>
        <h1 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05]">
          The photo that made me google{" "}
          <span className="italic text-[#AD9752]">“why do I look so tired”</span>
        </h1>
        <p className="mt-6 text-[15px] leading-8 text-[#5A483C]">
          I wasn't tired. I'd slept eight hours. But the camera kept disagreeing with me — and it
          turned out the camera knew something I didn't.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 text-[12px] tracking-[0.18em] uppercase text-[#7A6A5E]">
          <span>By Rachel M., 47</span>
          <span className="text-[#AD9752]">·</span>
          <span>6 min read</span>
        </div>
        <p className="mt-3 text-[10px] tracking-[0.2em] uppercase text-[#B0A294]">
          Sponsored content · In partnership with Seralie
        </p>
      </header>

      {/* HERO IMAGE */}
      <div className="container-x mt-10 md:mt-14 max-w-3xl mx-auto">
        <div className="overflow-hidden rounded-2xl border border-[#EADFC7] shadow-[0_20px_50px_-25px_rgba(59,46,37,0.25)]">
          <img
            src={heroMirror.url}
            alt="A woman looking at her reflection in the bathroom mirror"
            className="w-full h-auto"
          />
        </div>
        <p className="mt-3 text-center text-[11px] italic text-[#7A6A5E]">
          “It wasn't one bad photo. It was every photo.”
        </p>
      </div>

      {/* STORY */}
      <div className="container-x max-w-2xl mx-auto mt-14 md:mt-20 space-y-8 text-[16px] leading-9 text-[#4A3B30]">
        <p>
          It was my niece's graduation. Someone handed me their phone to show me the group photo,
          and my first thought — the honest one, before I could edit it — was:{" "}
          <em>who is that exhausted woman standing next to my sister?</em>
        </p>
        <p>
          I wasn't exhausted. I'd slept fine. I'd done my skincare that morning — the serums, the
          SPF, the whole shelf. And I still looked like I was running on four hours.
        </p>
        <p>
          If you're a woman somewhere north of 40, you probably know this exact moment. It's not
          dramatic. Nothing is <em>wrong</em>, exactly. Your face just reads&hellip; dimmer. Flatter.
          Tired when you aren't. And nobody warns you how early it starts.
        </p>
        <p className="font-medium text-[#3B2E25]">
          That night I did what we all do. I googled it. And I fell down a rabbit hole that changed
          how I think about aging.
        </p>

        <div className="hairline w-16 mx-auto" />

        <h2 className="font-display text-3xl md:text-4xl text-[#3B2E25] pt-2">
          It wasn't my skincare failing. It was something underneath it.
        </h2>
        <p>
          Every cream I owned works on the surface of my skin. But the thing I kept reading about
          lives <em>underneath</em> — in the cells themselves. It's a molecule called{" "}
          <strong>NAD+</strong>, and it's what your cells use to produce energy, repair DNA, and
          renew themselves.
        </p>
        <p>
          Here's the part that stopped me cold: <strong>NAD+ levels fall by roughly half between
          your 20s and your 50s.</strong> Half. It's one of the most consistent findings in aging
          research — and it maps almost exactly onto the things I'd been noticing. Skin that
          bounces back slower. Energy that dips earlier. Mornings that feel different than they
          used to.
        </p>
      </div>

      {/* NAD CHART */}
      <div className="container-x mt-12 max-w-2xl mx-auto">
        <div className="rounded-2xl border border-[#EADFC7] bg-[#F7EFDF]/50 p-6 sm:p-10">
          <div className="text-center caps-label text-[#3B2E25] mb-6">Your NAD+ Levels</div>
          <div className="relative w-full aspect-[16/8]">
            <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="none" aria-hidden="true">
              <line x1="60" y1="360" x2="770" y2="360" stroke="#EADFC7" strokeWidth="1" />
              <line x1="60" y1="40" x2="60" y2="360" stroke="#EADFC7" strokeWidth="1" />
              <path
                d="M 60 70 C 220 90, 320 170, 420 230 S 640 340, 770 355"
                fill="none"
                stroke="#AD9752"
                strokeWidth="3"
                strokeLinecap="round"
              />
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
        <p className="mt-3 text-center text-[11px] italic text-[#7A6A5E]">
          NAD+ declines steadily with age — researchers estimate a ~50% drop between 20 and 50.
        </p>
      </div>

      <div className="container-x max-w-2xl mx-auto mt-12 space-y-8 text-[16px] leading-9 text-[#4A3B30]">
        <p>
          My first thought was: fine, I'll just take NAD+. It turns out you can't —{" "}
          <strong>the molecule is too large to absorb</strong>. That's why the research focuses on
          its direct precursor: a compound called <strong>NMN</strong>, which your body converts to
          NAD+ in a single step. It's been the subject of published human trials, and it's quietly
          become the thing longevity researchers take themselves.
        </p>

        <h2 className="font-display text-3xl md:text-4xl text-[#3B2E25] pt-2">
          The part nobody tells you: most NMN isn't real
        </h2>
        <p>
          This is where I almost gave up. Because when I started comparing products, I learned that
          independent testing has found many bargain NMN supplements contain little to no actual
          NMN — some substitute cheap nicotinamide (plain vitamin B3) and label it like the real
          thing.
        </p>
        <p>So I made myself a checklist before I'd buy anything:</p>
        <ul className="space-y-3 pl-1">
          {[
            "Real β-NMN — verified by third-party lab testing, not just claimed",
            "A full 500 mg dose — the level used in research, not a sprinkle",
            "Made in a GMP-certified US facility",
            "A real guarantee — because I'd been burned before",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check className="mt-2 h-4 w-4 shrink-0 text-[#AD9752]" strokeWidth={2.5} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          One brand checked every box: <strong>Seralie</strong>. Third-party tested every batch,
          full certificate of analysis available, 500 mg of verified β-NMN per capsule — and
          unlike the biohacker brands built for Silicon Valley men, it's actually formulated and
          positioned for women like me. Beauty from within, not a lab experiment.
        </p>

        <div className="hairline w-16 mx-auto" />

        <h2 className="font-display text-3xl md:text-4xl text-[#3B2E25] pt-2">
          What actually happened, week by week
        </h2>
        <p>
          I'm going to be honest, because the reviews that helped me most were the honest ones:{" "}
          <strong>the first two weeks, I mostly noticed energy.</strong> Steadier afternoons. Less
          of that 3pm fade. Around week four, my skin started looking… awake. Not different —{" "}
          <em>mine again</em>.
        </p>
        <p>
          By week eight, a coworker asked if I'd changed my makeup. I hadn't. By month three, my
          esthetician asked what I was doing differently — and she does not hand out compliments.
        </p>
      </div>

      {/* RITUAL IMAGE */}
      <div className="container-x mt-12 max-w-2xl mx-auto">
        <div className="overflow-hidden rounded-2xl border border-[#EADFC7]">
          <img src={morningRitual.url} alt="Seralie NMN as part of a morning routine" className="w-full h-auto" />
        </div>
        <p className="mt-3 text-center text-[11px] italic text-[#7A6A5E]">
          One capsule, every morning, with my coffee. The easiest step in my routine.
        </p>
      </div>

      <div className="container-x max-w-2xl mx-auto mt-12 space-y-8 text-[16px] leading-9 text-[#4A3B30]">
        <p>
          Here's the thing I'd say to the woman staring at her own graduation photo: you're not
          imagining it, and it's not your fault. You did the skincare, the water, the workouts.
          This is the layer underneath all of that — and it's addressable. That's not hype;
          that's biology.
        </p>
        <p className="font-medium text-[#3B2E25]">
          Every month at half-empty is a month your cells don't get back. That's the sentence that
          finally made me order. I'm glad I did.
        </p>
      </div>

      {/* PRODUCT CTA CARD */}
      <div className="container-x mt-16 md:mt-20 max-w-3xl mx-auto">
        <div className="rounded-2xl border border-[#EADFC7] bg-[#F7EFDF]/70 p-8 md:p-12 grid gap-8 md:grid-cols-[240px_1fr] items-center">
          <div className="mx-auto w-48 md:w-full">
            <img src={bottleHero.url} alt="Seralie NMN bottle" className="w-full h-auto" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#AD9752] text-[#AD9752]" />
              ))}
              <span className="ml-1 text-[12px] tracking-wide text-[#7A6A5E]">4.8 · verified reviews</span>
            </div>
            <h3 className="mt-4 font-display text-3xl md:text-4xl">Seralie NMN</h3>
            <p className="mt-3 text-[15px] leading-8 text-[#5A483C]">
              500 mg of pure, third-party-verified β-NMN per capsule. One a day, with your morning
              coffee. Beauty &amp; healthy aging, from within.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                to="/product/$slug"
                params={{ slug: "nmn" }}
                className="inline-flex items-center gap-2 bg-[#AD9752] hover:bg-[#94803F] text-white caps-label text-[12px] px-8 py-4 transition-colors"
              >
                Read more &amp; shop <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <span className="flex items-center gap-2 text-[12px] text-[#7A6A5E]">
                <ShieldCheck className="h-4 w-4 text-[#AD9752]" /> 30-day money-back guarantee
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DISCLAIMERS */}
      <footer className="container-x max-w-2xl mx-auto mt-14 pb-20 space-y-3 text-[11px] leading-5 text-[#9B8D80]">
        <p>
          This is a sponsored reader story published in partnership with Seralie. Individual results
          vary; the experiences described are one person's and are not a guarantee of outcomes.
        </p>
        <p>
          *These statements have not been evaluated by the Food and Drug Administration. This
          product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </footer>
    </article>
  );
}
