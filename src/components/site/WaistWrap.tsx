import { useState } from "react";
import { Link } from "@tanstack/react-router";

/* ------------------------------ Design tokens ----------------------------- */

export const WW_VARS = {
  "--cw-bg": "#FAF6F2",
  "--cw-surface": "#EFE6DE",
  "--cw-ink": "#2B211C",
  "--cw-muted": "#8A7A70",
  "--cw-brand": "#B9695E",
  "--cw-line": "#E2D7CE",
} as React.CSSProperties;

export const serif = { fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif' };
export const sans = { fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' };

const money = (n: number) => `$${n.toFixed(2)}`;

/* -------------------------------- Bundles -------------------------------- */

type Bundle = { id: string; name: string; qty: number; price: number; compareAt: number; tag?: string };

export const BUNDLES: Bundle[] = [
  { id: "b1", name: "1 Waist Strap", qty: 1, price: 39.0, compareAt: 59.0 },
  { id: "b2", name: "2 WaistWraps", qty: 2, price: 68.0, compareAt: 118.0, tag: "MOST POPULAR" },
  { id: "b3", name: "3 WaistWraps", qty: 3, price: 89.0, compareAt: 177.0 },
];

/* ------------------------------ Small pieces ------------------------------ */

export function Placeholder({
  label = "IMAGE",
  note,
  ratio = "1 / 1",
  className = "",
}: {
  label?: "IMAGE" | "VIDEO";
  note: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      style={{ aspectRatio: ratio }}
      className={`grid w-full place-items-center rounded-2xl border border-dashed border-[color:var(--cw-brand)]/50 bg-[color:var(--cw-surface)] p-6 text-center ${className}`}
    >
      <div>
        <div style={sans} className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--cw-brand)]">
          {label}
        </div>
        <p style={sans} className="mx-auto mt-2 max-w-[22ch] text-[11px] leading-5 text-[color:var(--cw-muted)]">
          {note}
        </p>
      </div>
    </div>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={sans} className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--cw-brand)]">
      {children}
    </div>
  );
}

/* --------------------------------- Chrome -------------------------------- */

export function WaistWrapShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ ...WW_VARS, ...sans }} className="min-h-screen bg-[color:var(--cw-bg)] text-[color:var(--cw-ink)]">
      <div className="bg-[color:var(--cw-brand)] text-white">
        <p className="px-4 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.24em]">
          Free shipping on 2+ · 60-day fit guarantee
        </p>
      </div>

      <header className="sticky top-0 z-40 border-b border-[color:var(--cw-line)] bg-[color:var(--cw-bg)]/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:h-16 md:px-8">
          <Link to="/" className="flex items-baseline gap-2">
            <span style={serif} className="text-[24px] tracking-[0.14em] text-[color:var(--cw-ink)]">
              SERALIE
            </span>
          </Link>
          <nav className="flex items-center gap-5 text-[10px] font-semibold uppercase tracking-[0.2em]">
            <Link to="/waistwrap" className="hidden text-[color:var(--cw-muted)] hover:text-[color:var(--cw-ink)] sm:inline">
              Waist Strap
            </Link>
            <Link to="/faq" className="hidden text-[color:var(--cw-muted)] hover:text-[color:var(--cw-ink)] sm:inline">
              FAQ
            </Link>
            <Link
              to="/waistwrap"
              className="rounded-full bg-[color:var(--cw-brand)] px-4 py-2 text-white transition-opacity hover:opacity-90"
            >
              Shop
            </Link>
          </nav>
        </div>
      </header>

      {children}

      <footer className="border-t border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-3 md:px-8">
          <div>
            <span style={serif} className="text-[24px] tracking-[0.14em]">
              SERALIE
            </span>
            <p className="mt-3 max-w-xs text-[13px] leading-7 text-[color:var(--cw-muted)]">
              Makers of the Waist Strap — one adjustable band that fits your exact waist, every day. No hooks, no guessing, no compromise.
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--cw-brand)]">Contact</p>
            <p className="mt-3 text-[13px] leading-7 text-[color:var(--cw-muted)]">
              support@seralie.com
              <br />
              Mon–Fri, 9am–5pm ET
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--cw-brand)]">Policies</p>
            <ul className="mt-3 space-y-2 text-[13px] text-[color:var(--cw-muted)]">
              <li><Link to="/shipping" className="hover:text-[color:var(--cw-ink)]">Shipping</Link></li>
              <li><Link to="/refund" className="hover:text-[color:var(--cw-ink)]">Returns &amp; refunds</Link></li>
              <li><Link to="/faq" className="hover:text-[color:var(--cw-ink)]">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-[color:var(--cw-ink)]">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-[color:var(--cw-ink)]">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-[color:var(--cw-ink)]">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[color:var(--cw-line)]">
          <p className="mx-auto max-w-6xl px-5 py-5 text-[11px] text-[color:var(--cw-muted)] md:px-8">
            © {new Date().getFullYear()} Waist Strap. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ---------------------------------- FAQ ---------------------------------- */

export const WW_FAQS = [
  {
    q: "How do I wrap it?",
    a: "Hold the tab at your navel, wrap firm around your waist, then press the panel down. It takes about fifteen seconds and it does not move for the rest of the day.",
  },
  {
    q: "Will it show under clothes?",
    a: "No. The band is 1.2mm thin with a bonded flat edge, so there is no ridge, no line and no bulge — even under a bodycon dress or a white tee.",
  },
  {
    q: "How long can I wear it per day?",
    a: "Wear it all day. Most people put it on at 7am and forget about it until they undress. Start with 4–6 hours if you have never worn a trainer before.",
  },
  {
    q: "How do I wash it?",
    a: "Cold water, mild soap, hang dry. It keeps its snap-back after hundreds of washes — no stretching out, no pilling, no dead elastic.",
  },
  {
    q: "What size do I get?",
    a: "One Waist Strap adjusts across the full XS–3XL range because you set the tension yourself. Use the size guide to confirm your band length, and if you are between sizes, size up.",
  },
  {
    q: "What if it doesn't work for me?",
    a: "Wear it for 60 days. If your waist does not look dramatically snatched the second it goes on, send it back and we refund every cent — no photos, no questions.",
  },
];

export function Faq({ items = WW_FAQS }: { items?: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-[color:var(--cw-line)]">
      {items.map((f, i) => (
        <div key={f.q} className="border-b border-[color:var(--cw-line)]">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-6 py-5 text-left"
          >
            <span style={serif} className="text-[19px] leading-tight text-[color:var(--cw-ink)]">{f.q}</span>
            <span aria-hidden className="shrink-0 text-xl leading-none text-[color:var(--cw-brand)]">
              {open === i ? "–" : "+"}
            </span>
          </button>
          {open === i && (
            <p style={sans} className="pb-6 pr-8 text-[14px] leading-7 text-[color:var(--cw-muted)]">{f.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}

/* -------------------------------- Buy box -------------------------------- */

function BuyBox() {
  const [sel, setSel] = useState("b2");
  const bundle = BUNDLES.find((b) => b.id === sel)!;

  return (
    <div>
      <Label>One size · Wraps to you</Label>
      <h1 style={serif} className="mt-3 text-[34px] leading-[1.05] text-[color:var(--cw-ink)] md:text-[42px]">
        Waist Strap Adjustable Waist Wrap
      </h1>
      <p style={sans} className="mt-4 text-[15px] leading-7 text-[color:var(--cw-muted)]">
        Instantly takes inches off your silhouette and holds them there all day. No hooks to snap, no
        zipper to fight, no size to guess wrong.
      </p>

      <div className="mt-7 space-y-3">
        {BUNDLES.map((b) => {
          const on = b.id === sel;
          return (
            <button
              key={b.id}
              onClick={() => setSel(b.id)}
              className={`relative flex w-full items-center gap-4 rounded-2xl border bg-[color:var(--cw-bg)] px-4 py-4 text-left transition-colors ${
                on ? "border-[color:var(--cw-brand)]" : "border-[color:var(--cw-line)] hover:border-[color:var(--cw-muted)]"
              }`}
            >
              {b.tag && (
                <span
                  style={sans}
                  className="absolute -top-2 right-4 rounded-full bg-[color:var(--cw-brand)] px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white"
                >
                  {b.tag}
                </span>
              )}
              <span
                className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
                  on ? "border-[color:var(--cw-brand)]" : "border-[color:var(--cw-muted)]"
                }`}
              >
                {on && <span className="h-2 w-2 rounded-full bg-[color:var(--cw-brand)]" />}
              </span>
              <span className="min-w-0 flex-1">
                <span style={serif} className="block text-[18px] text-[color:var(--cw-ink)]">{b.name}</span>
                <span style={sans} className="block text-[12px] text-[color:var(--cw-muted)]">
                  {money(b.price / b.qty)} per wrap
                </span>
              </span>
              <span className="shrink-0 text-right">
                <span style={sans} className="block text-[12px] tabular-nums text-[color:var(--cw-muted)] line-through">
                  {money(b.compareAt)}
                </span>
                <span style={serif} className="block text-[22px] tabular-nums text-[color:var(--cw-ink)]">
                  {money(b.price)}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <button
        style={sans}
        className="mt-6 w-full rounded-full bg-[color:var(--cw-brand)] px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90"
      >
        Add to cart — {money(bundle.price)}
      </button>

      <p style={sans} className="mt-4 text-center text-[12px] leading-6 text-[color:var(--cw-muted)]">
        60-day fit guarantee · Free shipping on 2+ · Ships in 24 hours
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {["VISA", "MASTERCARD", "AMEX", "PAYPAL", "APPLE PAY", "SHOP PAY"].map((p) => (
          <span
            key={p}
            style={sans}
            className="rounded-md border border-[color:var(--cw-line)] bg-[color:var(--cw-bg)] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[color:var(--cw-muted)]"
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------- Data ---------------------------------- */

const STEPS = [
  { n: "01", t: "Set the tab at your navel", c: "Hold the marked tab flat against your stomach. That is your anchor." },
  { n: "02", t: "Wrap firm, twice around", c: "Pull to the tension you want. You choose the shape — nobody else's sizing chart does." },
  { n: "03", t: "Press and go", c: "Smooth the panel down and it locks. Fifteen seconds, then it disappears under your clothes." },
];

const ROWS = [
  { k: "Fit", ours: "Wraps to your exact waist, every single day", theirs: "One rigid shape you have to squeeze into" },
  { k: "Closure", ours: "No hooks, no zippers — wrap and press", theirs: "Rows of hooks that pop mid-wear" },
  { k: "Comfort", ours: "Breathable, no digging, wearable all day", theirs: "Boning that jabs your ribs by hour two" },
  { k: "Sizing", ours: "One size adjusts across XS–3XL", theirs: "Order twice, return once, guess again" },
  { k: "Visibility under clothes", ours: "1.2mm flat edge — completely invisible", theirs: "Bulk lines through everything you own" },
];

const SIZES = [
  ["XS", "23–25 in"],
  ["S", "26–28 in"],
  ["M", "29–31 in"],
  ["L", "32–35 in"],
  ["XL", "36–39 in"],
  ["2XL", "40–44 in"],
  ["3XL", "45–50 in"],
];

function CtaButton({ children = "Shop Waist Strap" }: { children?: React.ReactNode }) {
  return (
    <Link
      to="/waistwrap"
      style={sans}
      className="inline-block rounded-full bg-[color:var(--cw-brand)] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90"
    >
      {children}
    </Link>
  );
}

/* -------------------------------- Landing -------------------------------- */

export function WaistWrapLanding() {
  return (
    <WaistWrapShell>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:gap-16 md:px-8 md:py-24">
        <div>
          <Label>Adjustable waist wrap</Label>
          <h1 style={serif} className="mt-5 text-[42px] leading-[1.02] md:text-[64px]">
            The waist wrap that actually stays put.
          </h1>
          <p className="mt-6 max-w-md text-[16px] leading-8 text-[color:var(--cw-muted)]">
            One band wraps to your exact waist and holds it — all day, no hooks, no zippers, no size to
            guess wrong.
          </p>
          <div className="mt-9">
            <CtaButton>Shop Waist Strap — $39</CtaButton>
          </div>
        </div>
        <Placeholder ratio="4 / 5" note="Hero: full-body shot, wrap worn under a fitted dress." />
      </section>

      {/* Icon bar */}
      <section className="border-y border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]/60">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 text-center sm:grid-cols-3 md:px-8">
          {["Wraps to your size", "No hooks or zippers", "Invisible under clothes"].map((t) => (
            <div key={t}>
              <div className="mx-auto h-px w-8 bg-[color:var(--cw-brand)]" />
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em]">{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it wraps */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Label>How it wraps</Label>
        <h2 style={serif} className="mt-4 max-w-xl text-[34px] leading-[1.08] md:text-[46px]">
          Fifteen seconds. Then you forget it's on.
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n}>
              <Placeholder note={`Step ${s.n}: ${s.t.toLowerCase()}.`} />
              <div className="mt-5 flex items-baseline gap-3">
                <span style={serif} className="text-[20px] text-[color:var(--cw-brand)]">{s.n}</span>
                <h3 style={serif} className="text-[22px] leading-tight">{s.t}</h3>
              </div>
              <p className="mt-2 text-[14px] leading-7 text-[color:var(--cw-muted)]">{s.c}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="border-y border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]/50">
        <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
          <Label>The difference</Label>
          <h2 style={serif} className="mt-4 text-[34px] leading-[1.08] md:text-[46px]">
            Waist Strap vs. traditional waist trainers.
          </h2>
          <ComparisonTable />
          <div className="mt-10">
            <CtaButton />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8">
        <h2 style={serif} className="text-[34px] leading-[1.08] md:text-[46px]">
          Snatched in fifteen seconds, guaranteed for sixty days.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-[15px] leading-8 text-[color:var(--cw-muted)]">
          Wear it every day for two months. If it isn't the best waist piece you've owned, we refund
          every cent.
        </p>
        <div className="mt-9">
          <CtaButton>Shop Waist Strap</CtaButton>
        </div>
      </section>
    </WaistWrapShell>
  );
}

function ComparisonTable() {
  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-[color:var(--cw-line)] bg-[color:var(--cw-bg)]">
      <div className="grid grid-cols-[0.8fr_1.1fr_1fr] border-b border-[color:var(--cw-line)] text-[9px] font-semibold uppercase tracking-[0.18em] text-[color:var(--cw-muted)]">
        <div className="px-3 py-3 md:px-5" />
        <div className="border-l-2 border-[color:var(--cw-brand)] bg-[color:var(--cw-surface)] px-3 py-3 text-[color:var(--cw-ink)] md:px-5">
          Waist Strap
        </div>
        <div className="px-3 py-3 md:px-5">Traditional</div>
      </div>
      {ROWS.map((r) => (
        <div key={r.k} className="grid grid-cols-[0.8fr_1.1fr_1fr] border-b border-[color:var(--cw-line)] last:border-0">
          <div className="px-3 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--cw-muted)] md:px-5">
            {r.k}
          </div>
          <div className="border-l-2 border-[color:var(--cw-brand)] bg-[color:var(--cw-surface)] px-3 py-4 text-[13px] leading-6 md:px-5">
            {r.ours}
          </div>
          <div className="px-3 py-4 text-[13px] leading-6 text-[color:var(--cw-muted)] md:px-5">{r.theirs}</div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ Product page ------------------------------ */

export function WaistWrapProduct() {
  return (
    <WaistWrapShell>
      <section id="shop" className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-3">
            <Placeholder ratio="4 / 5" note="Primary product shot: wrap on a neutral body, waist crop." />
            <div className="grid grid-cols-3 gap-3">
              <Placeholder note="Flat lay of the full band." />
              <Placeholder note="Close-up of the bonded flat edge." />
              <Placeholder label="VIDEO" note="15-second wrap demo." />
            </div>
          </div>
          <BuyBox />
        </div>
      </section>

      {/* How it wraps */}
      <section className="border-y border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]/50">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <Label>How it wraps</Label>
          <h2 style={serif} className="mt-4 max-w-xl text-[34px] leading-[1.08] md:text-[46px]">
            Fifteen seconds. Then you forget it's on.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n}>
                <Placeholder note={`Step ${s.n}: ${s.t.toLowerCase()}.`} />
                <div className="mt-5 flex items-baseline gap-3">
                  <span style={serif} className="text-[20px] text-[color:var(--cw-brand)]">{s.n}</span>
                  <h3 style={serif} className="text-[22px] leading-tight">{s.t}</h3>
                </div>
                <p className="mt-2 text-[14px] leading-7 text-[color:var(--cw-muted)]">{s.c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <Label>The difference</Label>
        <h2 style={serif} className="mt-4 text-[34px] leading-[1.08] md:text-[46px]">
          Waist Strap vs. traditional waist trainers.
        </h2>
        <ComparisonTable />
      </section>

      {/* Size guide */}
      <section className="border-y border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]/50">
        <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
          <Label>Size guide</Label>
          <h2 style={serif} className="mt-4 text-[34px] leading-[1.08] md:text-[42px]">
            Between sizes? Size up.
          </h2>
          <p className="mt-4 text-[14px] leading-7 text-[color:var(--cw-muted)]">
            Measure at the narrowest point of your natural waist, keeping the tape flat.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[color:var(--cw-line)] bg-[color:var(--cw-bg)]">
            {SIZES.map(([s, w]) => (
              <div
                key={s}
                className="flex items-center justify-between border-b border-[color:var(--cw-line)] px-5 py-3.5 last:border-0"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">{s}</span>
                <span className="text-[14px] tabular-nums text-[color:var(--cw-muted)]">{w}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <Label>Questions</Label>
        <h2 style={serif} className="mt-4 mb-8 text-[34px] leading-[1.08] md:text-[42px]">
          Everything you asked.
        </h2>
        <Faq />
        <div className="mt-12 text-center">
          <CtaButton>Shop Waist Strap — $39</CtaButton>
        </div>
      </section>
    </WaistWrapShell>
  );
}
