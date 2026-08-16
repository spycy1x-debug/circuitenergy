import { Link } from "@tanstack/react-router";
import { ArrowRight, Moon, Sparkles, ShieldCheck } from "lucide-react";
import {
  PATCH_TIERS,
  DEFAULT_PATCH_TIER,
  patchTierById,
  GUARANTEE_DAYS,
} from "@/lib/patch-config";
import g1 from "@/assets/patch-g1.webp.asset.json";
import g2 from "@/assets/patch-g2.webp.asset.json";
import g4 from "@/assets/patch-g4.webp.asset.json";

const heroImg = g1.url;
const flatlayImg = g4.url;
const glowImg = g2.url;

const money = (n: number) => `$${n.toFixed(2)}`;
const featured = patchTierById(DEFAULT_PATCH_TIER);

export function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-8 md:px-8 md:pb-16 md:pt-14">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand)]">
              Hydrocolloid + LED
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.06] tracking-tight md:text-6xl">
              Wake up with the spot
              <br />
              flatter and less angry.
            </h1>
            <p className="mt-5 max-w-md text-[16px] leading-8 text-[color:var(--muted-ink)]">
              Seralie makes one thing: an overnight patch that absorbs the gunk while red and blue
              light work on the spot underneath.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/patches"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand)] px-7 py-4 text-base font-semibold text-white transition-transform active:scale-[0.99]"
              >
                Shop the patches <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/how-it-works"
                className="rounded-full border border-[color:var(--line)] px-6 py-4 text-base font-semibold text-[color:var(--brand)]"
              >
                How it works
              </Link>
            </div>
            <p className="mt-4 text-xs text-[color:var(--muted-ink)]">
              Free shipping over $40 · Ships in 24h · {GUARANTEE_DAYS}-day guarantee
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl bg-[color:var(--brand-soft)]">
            <img
              src={heroImg}
              alt="LED pimple patch case with a sheet of clear hydrocolloid patches"
              width={1000}
              height={1000}
              fetchPriority="high"
              decoding="async"
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Three reasons */}
      <section className="border-y border-[color:var(--line)] bg-[color:var(--wash)]">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Moon,
                h: "Works while you sleep",
                p: "Six to eight hours on clean skin. Peel it off in the morning.",
              },
              {
                icon: Sparkles,
                h: "Two jobs at once",
                p: "Hydrocolloid draws fluid out. Red and blue light treat the spot underneath.",
              },
              {
                icon: ShieldCheck,
                h: `${GUARANTEE_DAYS}-day guarantee`,
                p: "Use the whole box. Not clearer? Full refund and keep the patches.",
              },
            ].map((c) => (
              <div
                key={c.h}
                className="rounded-3xl border border-[color:var(--line)] bg-white p-6 shadow-[0_10px_40px_-30px_rgba(76,29,149,0.6)]"
              >
                <c.icon className="h-6 w-6 text-[color:var(--brand)]" strokeWidth={1.6} />
                <h2 className="mt-4 text-lg font-semibold">{c.h}</h2>
                <p className="mt-2 text-[15px] leading-7 text-[color:var(--muted-ink)]">{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product teaser */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="grid grid-cols-2 gap-4">
            <img
              src={flatlayImg}
              alt="Patch sheet next to the LED case, lights on"
              width={600}
              height={600}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full rounded-3xl object-cover"
            />
            <img
              src={glowImg}
              alt="Close-up of a single clear hydrocolloid patch with light glow"
              width={600}
              height={600}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full rounded-3xl object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              One product. Three sizes.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-8 text-[color:var(--muted-ink)]">
              Most people use one to three patches a week. Every box ships free and every bundle
              doubles what you pay for.
            </p>
            <ul className="mt-6 space-y-3">
              {PATCH_TIERS.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center justify-between rounded-2xl border border-[color:var(--line)] px-4 py-3"
                >
                  <span className="text-sm font-medium">
                    {t.label}
                    <span className="ml-2 text-[color:var(--muted-ink)]">
                      {t.patches} patches
                    </span>
                  </span>
                  <span className="text-sm font-semibold">{money(t.price)}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/patches"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[color:var(--brand)] px-7 py-4 text-base font-semibold text-white"
            >
              Shop {featured.label} — {money(featured.price)} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[color:var(--brand)]">
        <div className="mx-auto max-w-2xl px-5 py-16 text-center text-white md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Stick one on tonight.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-white/85">
            Free shipping over $40, ships in 24 hours, and a {GUARANTEE_DAYS}-day guarantee if your skin
            doesn't agree.
          </p>
          <Link
            to="/patches"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-[color:var(--brand)]"
          >
            Shop the patches <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
