import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Leaf, HeartPulse, ShieldCheck, Beaker, MapPin, Droplet, Star } from "lucide-react";
import nmnBottle from "@/assets/nmn-new-1.jpeg.asset.json";
import heroImage from "@/assets/seralie-hero.webp.asset.json";
import nmnKitchen from "@/assets/nmn-new-4.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seralie — Beauty & Healthy Aging, From Within" },
      { name: "description", content: "500 mg of pure β-NMN to replenish NAD+, support cellular renewal, and help skin stay radiant. Beauty and healthy aging, from within." },
      { property: "og:title", content: "Seralie — Beauty & Healthy Aging, From Within" },
      { property: "og:description", content: "Seralie NMN — the daily ritual for radiance, cellular energy, and healthy aging." },
    ],
  }),
  component: HomePage,
});

const testimonials = [
  {
    quote: "My skin looks brighter, my energy is steady, and I finally feel like myself again. Seralie has become the quiet non-negotiable in my morning.",
    name: "Priya M.",
    detail: "Age 46 · 3 months in",
  },
  {
    quote: "I've tried collagen, retinols, everything. This is the first thing where friends started asking what I was doing differently.",
    name: "Elena R.",
    detail: "Age 52 · 4 months in",
  },
  {
    quote: "By week six my skin had this glow I hadn't seen since my thirties. I'll never stop taking it.",
    name: "Marina K.",
    detail: "Age 41 · 6 months in",
  },
];

function HomePage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <>
      {/* HERO — stacked on mobile, edge-to-edge on desktop */}
      <section className="relative w-full overflow-hidden bg-[#FDF8EE]">
        {/* Mobile: image first, then text — nothing gets cut off */}
        <div className="md:hidden">
          <div className="relative w-full aspect-[4/5]">
            <img
              src={heroImage.url}
              alt="A woman in a silk robe beginning her Seralie morning ritual"
              className="absolute inset-0 h-full w-full object-cover object-[65%_center]"
              loading="eager"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FDF8EE] to-transparent" />
          </div>
          <div className="container-x pt-2 pb-14">
            <div className="eyebrow">Beauty · Longevity · Ritual</div>
            <h1 className="mt-5 font-display text-5xl leading-[1.02] text-[#3B2E25]">
              Beauty & healthy aging,{" "}
              <span className="italic text-[#AD9752]">from within</span>.
            </h1>
            <div className="mt-5 hairline w-16" />
            <p className="mt-5 text-[15px] leading-8 text-[#5A483C]">
              500 mg of pure β-NMN to replenish NAD+, support cellular renewal,
              and help skin stay radiant — the youth molecule your body makes less of every year.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link to="/product/$slug" params={{ slug: "nmn" }} className="btn-primary">Shop Seralie NMN</Link>
              <Link to="/product/$slug" params={{ slug: "nmn" }} className="caps-label text-[#AD9752] hover:text-[#94803F] transition-colors border-b border-transparent hover:border-[#AD9752] pb-1">
                Learn the science →
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-3 text-[11px] tracking-wide text-[#7A6A5E]">
              <div className="flex items-center gap-1.5">
                {[0,1,2,3,4].map(i => <Star key={i} className="h-3.5 w-3.5 fill-[#AD9752] text-[#AD9752]" />)}
                <span className="ml-1.5 uppercase tracking-[0.18em]">400+ reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: overlaid, edge-to-edge */}
        <div className="hidden md:block relative w-full h-[88vh] min-h-[640px] max-h-[900px]">
          <img
            src={heroImage.url}
            alt="A woman in a silk robe beginning her Seralie morning ritual"
            className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FDF8EE]/85 via-[#FDF8EE]/25 to-transparent" />
          <div className="relative h-full">
            <div className="container-x h-full flex items-center">
              <div className="w-1/2 lg:w-[42%] max-w-xl">
                <div className="eyebrow">Beauty · Longevity · Ritual</div>
                <h1 className="mt-6 font-display text-6xl lg:text-7xl leading-[1.02] text-[#3B2E25]">
                  Beauty & healthy aging,{" "}
                  <span className="italic text-[#AD9752]">from within</span>.
                </h1>
                <div className="mt-6 hairline w-16" />
                <p className="mt-6 max-w-lg text-base leading-8 text-[#5A483C]">
                  500 mg of pure β-NMN to replenish NAD+, support cellular renewal,
                  and help skin stay radiant — the youth molecule your body makes less of every year.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link to="/product/$slug" params={{ slug: "nmn" }} className="btn-primary">Shop Seralie NMN</Link>
                  <Link to="/product/$slug" params={{ slug: "nmn" }} className="caps-label text-[#AD9752] hover:text-[#94803F] transition-colors border-b border-transparent hover:border-[#AD9752] pb-1">
                    Learn the science →
                  </Link>
                </div>
                <div className="mt-10 flex items-center gap-6 text-[11px] tracking-wide text-[#7A6A5E]">
                  <div className="flex items-center gap-1.5">
                    {[0,1,2,3,4].map(i => <Star key={i} className="h-3.5 w-3.5 fill-[#AD9752] text-[#AD9752]" />)}
                    <span className="ml-1.5 uppercase tracking-[0.18em]">400+ reviews</span>
                  </div>
                  <span className="opacity-50">·</span>
                  <span className="uppercase tracking-[0.18em]">30-day guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* BENEFIT TRIO */}
      <section className="bg-[#F7EFDF]/60 border-y border-[#EADFC7]">
        <div className="container-x py-20 md:py-28">
          <div className="text-center max-w-xl mx-auto">
            <div className="eyebrow">What Seralie supports</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-[#3B2E25]">A daily act of self-care</h2>
          </div>
          <div className="mt-16 grid gap-10 md:gap-14 md:grid-cols-3">
            {[
              { Icon: Sparkles, label: "Radiance", desc: "Support skin's natural renewal cycle so your complexion looks brighter, plumper, and more even over time." },
              { Icon: HeartPulse, label: "Cellular Energy", desc: "Replenish NAD+ — the coenzyme your cells rely on for steady, ageless energy." },
              { Icon: Leaf, label: "Healthy Aging", desc: "Nurture the pathways behind longevity so you feel like yourself for decades to come." },
            ].map(({ Icon, label, desc }) => (
              <div key={label} className="text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center border border-[#AD9752] text-[#AD9752]">
                  <Icon className="h-5 w-5" strokeWidth={1.4} />
                </div>
                <div className="mt-6 caps-label text-[#AD9752]">{label}</div>
                <p className="mt-4 text-[15px] leading-8 text-[#5A483C] max-w-xs mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE YOUTH MOLECULE — editorial */}
      <section className="bg-[#FDF8EE]">
        <div className="container-x py-24 md:py-32">
          <div className="grid gap-16 md:grid-cols-[1fr_1.15fr] items-center">
            <div>
              <div className="eyebrow">The Youth Molecule</div>
              <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-[#3B2E25]">
                By 50, your NAD+ has quietly <span className="italic text-[#AD9752]">halved</span>.
              </h2>
              <div className="mt-6 hairline w-14" />
              <p className="mt-6 text-[15px] leading-8 text-[#5A483C]">
                NAD+ is the coenzyme that keeps every cell in your body doing its most vital work —
                repairing DNA, producing energy, and renewing skin from the inside out.
              </p>
              <p className="mt-4 text-[15px] leading-8 text-[#5A483C]">
                It's why we feel more radiant, more vibrant, and more ourselves in our twenties.
                Seralie NMN is the most direct way to restore what time has taken.
              </p>
              <Link to="/product/$slug" params={{ slug: "nmn" }} className="mt-8 inline-block caps-label text-[#AD9752] border-b border-[#AD9752] pb-1 hover:text-[#94803F] transition-colors">
                Discover Seralie NMN →
              </Link>
            </div>
            <div className="relative aspect-[4/5] bg-[#F7EFDF] overflow-hidden">
              <img src={nmnBottle.url} alt="Seralie NMN bottle" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT CARD */}
      <section className="bg-[#F7EFDF]/40 border-y border-[#EADFC7]">
        <div className="container-x py-24 md:py-32">
          <div className="max-w-4xl mx-auto bg-[#FDF8EE] border border-[#EADFC7] p-8 md:p-14 grid gap-12 md:grid-cols-[1fr_1.2fr] items-center">
            <div className="aspect-square bg-[#F7EFDF] overflow-hidden">
              <img src={nmnBottle.url} alt="Seralie NMN" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div>
              <div className="eyebrow">Best Seller</div>
              <h3 className="mt-4 font-display text-4xl md:text-5xl text-[#3B2E25]">Seralie NMN</h3>
              <p className="mt-3 text-[15px] leading-8 text-[#5A483C]">
                500 mg pure β-NMN, third-party tested, GMP-certified. One capsule every morning.
              </p>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-4xl text-[#3B2E25]">$42.99</span>
                <span className="caps-label text-[#7A6A5E]">from</span>
              </div>
              <ul className="mt-6 space-y-2.5 text-sm text-[#5A483C]">
                {["Real β-NMN — no substitutes", "500 mg full clinical dose", "Third-party tested every batch"].map(t => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="inline-block h-1 w-4 bg-[#AD9752]" />
                    {t}
                  </li>
                ))}
              </ul>
              <Link to="/product/$slug" params={{ slug: "nmn" }} className="btn-primary mt-8">Shop the Ritual</Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#FDF8EE]">
        <div className="container-x py-24 md:py-32">
          <div className="text-center max-w-xl mx-auto">
            <div className="eyebrow">Voices</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-[#3B2E25]">Loved by women who <span className="italic text-[#AD9752]">know</span> their skin</h2>
          </div>
          <div className="mt-16 grid gap-10 md:gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="bg-[#F7EFDF]/60 p-8 md:p-10">
                <div className="flex gap-1 text-[#AD9752]">
                  {[0,1,2,3,4].map(i => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <blockquote className="mt-5 font-display italic text-xl md:text-2xl leading-relaxed text-[#3B2E25]">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 pt-6 border-t border-[#EADFC7]">
                  <div className="caps-label text-[#3B2E25]">{t.name}</div>
                  <div className="mt-1 text-xs text-[#7A6A5E] tracking-wide">{t.detail}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* THE SERALIE STANDARD */}
      <section className="bg-[#3B2E25] text-[#FDF8EE]">
        <div className="container-x py-20 md:py-24">
          <div className="text-center max-w-lg mx-auto">
            <div className="eyebrow text-[#AD9752]">The Seralie Standard</div>
            <h2 className="mt-4 font-display text-3xl md:text-4xl text-[#FDF8EE]">Quality is non-negotiable</h2>
          </div>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 text-center">
            {[
              { Icon: Droplet, label: "Real β-NMN" },
              { Icon: Beaker, label: "Third-Party Tested" },
              { Icon: ShieldCheck, label: "GMP-Certified" },
              { Icon: MapPin, label: "Made in the USA" },
            ].map(({ Icon, label }) => (
              <div key={label}>
                <div className="inline-flex h-12 w-12 items-center justify-center border border-[#AD9752] text-[#AD9752]">
                  <Icon className="h-4 w-4" strokeWidth={1.4} />
                </div>
                <div className="mt-4 caps-label text-[#F7EFDF]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section className="bg-[#F7EFDF]/60">
        <div className="container-x py-20 md:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <div className="eyebrow">Join the ritual</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-[#3B2E25]">Softer mornings, brighter skin.</h2>
            <p className="mt-5 text-[15px] leading-8 text-[#5A483C]">
              Thoughtful notes on beauty, longevity, and the science of aging well — plus 10% off your first ritual.
            </p>
            {sent ? (
              <p className="mt-8 font-display italic text-2xl text-[#AD9752]">Welcome. Check your inbox.</p>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSent(true); }}
                className="mt-8 flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 border border-[#EADFC7] bg-[#FDF8EE] px-5 py-4 text-sm text-[#3B2E25] placeholder:text-[#7A6A5E] outline-none focus:border-[#AD9752] transition-colors"
                />
                <button type="submit" className="btn-primary">Join</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
