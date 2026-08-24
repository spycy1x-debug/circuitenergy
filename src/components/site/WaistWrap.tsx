import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BUNDLES, COLORS, SIZES, type Bundle } from "@/lib/waistwrap-config";

import ws1 from "@/assets/ws-1.webp.asset.json";
import ws2 from "@/assets/ws-2.webp.asset.json";
import ws3 from "@/assets/ws-3.webp.asset.json";
import ws4 from "@/assets/ws-4.webp.asset.json";
import ws5 from "@/assets/ws-5.webp.asset.json";
import ws6 from "@/assets/ws-6.webp.asset.json";
import ws7 from "@/assets/ws-7.webp.asset.json";
import ws8 from "@/assets/ws-8.webp.asset.json";
import posture from "@/assets/posture-corrector.png.asset.json";
import { cart } from "@/lib/waistwrap-cart";
import { CartDrawer } from "@/components/site/WaistCart";
import { WaistSocialProof } from "@/components/site/WaistSocialProof";
import { WW_REVIEWS } from "@/lib/waistwrap-reviews";

/* ------------------------------ Design tokens ----------------------------- */

export const WW_VARS = {
  "--cw-bg": "#F4F0E6",
  "--cw-surface": "#FBF8F1",
  "--cw-ink": "#141414",
  "--cw-muted": "#6E6A63",
  "--cw-brand": "#EFA1B0",
  "--cw-brand-deep": "#D97389",
  "--cw-tan": "#D8C6A5",
  "--cw-line": "#E4DCCB",
} as React.CSSProperties;

export const serif = { fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif' };
export const sans = { fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' };

const money = (n: number) => `$${n.toFixed(2)}`;

export { BUNDLES };

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
      className={`grid w-full place-items-center rounded-2xl border border-dashed border-[color:var(--cw-brand-deep)]/50 bg-[color:var(--cw-surface)] p-6 text-center ${className}`}
    >
      <div>
        <div style={sans} className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--cw-brand-deep)]">
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
    <div style={sans} className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--cw-brand-deep)]">
      {children}
      <CartDrawer />
    </div>
  );
}

/* ----------------------------- Announcement ------------------------------ */

const ANNOUNCEMENTS = [
  "Free shipping on 2+ wraps",
  "60-day fit guarantee",
  "Limited time — free posture corrector with every order",
];

function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ANNOUNCEMENTS.length), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-[color:var(--cw-brand)] text-[color:var(--cw-ink)]">
      <p
        key={i}
        style={sans}
        className="animate-in fade-in px-4 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.2em] duration-500"
      >
        {ANNOUNCEMENTS[i]}
      </p>
    </div>
  );
}

/* --------------------------------- Chrome -------------------------------- */

export function WaistWrapShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ ...WW_VARS, ...sans }}
      className="min-h-screen w-full max-w-full overflow-x-hidden bg-[color:var(--cw-bg)] text-[color:var(--cw-ink)]"
    >
      <AnnouncementBar />

      <header className="sticky top-0 z-40 border-b border-[color:var(--cw-line)] bg-[color:var(--cw-bg)]/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-center px-5 md:h-16 md:px-8">
          <Link to="/" className="inline-flex items-baseline">
            <span style={serif} className="text-[24px] tracking-[0.18em] text-[color:var(--cw-ink)] md:text-[26px]">
              SERALIE
            </span>
          </Link>
        </div>
      </header>

      {children}

      <footer className="border-t border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-3 md:px-8">
          <div className="min-w-0">
            <span style={serif} className="text-[24px] tracking-[0.14em]">
              SERALIE
            </span>
            <p className="mt-3 max-w-xs text-[13px] leading-7 text-[color:var(--cw-muted)]">
              Makers of the Waist Strap™ — one adjustable band that fits your exact waist, every day. No hooks, no guessing, no compromise.
            </p>
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--cw-brand-deep)]">Contact</p>
            <p className="mt-3 text-[13px] leading-7 text-[color:var(--cw-muted)]">
              support@seralie.com
              <br />
              Mon–Fri, 9am–5pm ET
            </p>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--cw-brand-deep)]">Policies</p>
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
            © {new Date().getFullYear()} Seralie. All rights reserved.
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
    a: "No. The band sits flat with a bonded edge, so there is no ridge, no line and no bulge — even under a bodycon dress or a white tee.",
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
    a: "Measure the narrowest point of your natural waist and match it to the size chart. If you are between sizes, size up — the wrap closure lets you tighten from there.",
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
            <span style={serif} className="text-[18px] leading-tight text-[color:var(--cw-ink)]">{f.q}</span>
            <span aria-hidden className="shrink-0 text-xl leading-none text-[color:var(--cw-brand-deep)]">
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

/* ------------------------------ Buy area bits ----------------------------- */

export function Stars({ value = 4.8, size = 13 }: { value?: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative inline-block leading-none" style={{ fontSize: size }}>
            <span className="text-[color:var(--cw-line)]">★</span>
            <span
              className="absolute left-0 top-0 overflow-hidden text-[color:var(--cw-brand-deep)]"
              style={{ width: `${fill * 100}%` }}
            >
              ★
            </span>
          </span>
        );
      })}
    </span>
  );
}

const TICKER = [
  { n: "Alexis R.", t: "Wore it under a slip dress for 11 hours. Never moved once." },
  { n: "Danielle P.", t: "First waist piece I haven't had to fix in a bathroom mirror." },
  { n: "Marisol G.", t: "No hooks digging in. I forget it's on by lunch." },
  { n: "Tia W.", t: "Two sizes of trainers in my closet and this replaced both." },
];

function ReviewTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => v + 1), 5000);
    return () => clearInterval(t);
  }, []);
  const r = TICKER[i % TICKER.length];
  return (
    <div className="mt-4 flex w-full items-center gap-3 rounded-2xl border border-[color:var(--cw-line)] bg-[color:var(--cw-surface)] px-4 py-3 text-left">
      <span
        style={serif}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[color:var(--cw-brand)] text-[13px] text-[color:var(--cw-ink)]"
      >
        {r.n[0]}
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2">
          <Stars size={11} value={5} />
          <span style={sans} className="text-[11px] font-semibold text-[color:var(--cw-ink)]">{r.n}</span>
        </span>
        <span style={sans} className="mt-0.5 block truncate text-[12px] text-[color:var(--cw-muted)]">
          "{r.t}"
        </span>
      </span>
    </div>
  );
}

function TrustRow() {
  return (
    <div className="mt-5 grid grid-cols-3 gap-2 text-center">
      {[
        ["60-day", "Fit guarantee"],
        ["Secure", "Encrypted checkout"],
        ["Free", "Shipping on 2+"],
      ].map(([a, b]) => (
        <div key={a} className="min-w-0 rounded-xl border border-[color:var(--cw-line)] bg-[color:var(--cw-surface)] px-2 py-3">
          <p style={serif} className="text-[15px] text-[color:var(--cw-ink)]">{a}</p>
          <p style={sans} className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-[color:var(--cw-muted)]">{b}</p>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------- Countdown ------------------------------- */

function useCountdown(minutes = 15) {
  const [left, setLeft] = useState(minutes * 60);
  useEffect(() => {
    const t = setInterval(() => setLeft((v) => (v <= 1 ? minutes * 60 : v - 1)), 1000);
    return () => clearInterval(t);
  }, [minutes]);
  const m = String(Math.floor(left / 60)).padStart(2, "0");
  const s = String(left % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function OfferUrgency() {
  const t = useCountdown(15);
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--cw-brand-deep)] bg-[color:var(--cw-brand)]/30 p-3">
      <img
        src={posture.url}
        alt="Free posture corrector included with every order"
        className="h-16 w-16 shrink-0 rounded-xl bg-[color:var(--cw-surface)] object-contain p-1"
      />
      <div className="min-w-0 flex-1">
        <p style={sans} className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[color:var(--cw-brand-deep)]">
          Free gift · $39 value
        </p>
        <p style={serif} className="text-[17px] leading-tight text-[color:var(--cw-ink)]">
          Free posture corrector with every order
        </p>
        <p style={sans} className="mt-0.5 text-[11px] font-semibold tabular-nums text-[color:var(--cw-brand-deep)]">
          Offer ends in {t}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------- Buy box -------------------------------- */

function BuyBox() {
  const [selQty, setSelQty] = useState(2);
  const [color, setColor] = useState<string>("Black");
  const [size, setSize] = useState<string | null>("M");
  const bundle = BUNDLES.find((b) => b.qty === selQty)!;
  

  return (
    <div className="min-w-0">
      <Label>Seralie · Waist Strap™</Label>
      <h1 style={serif} className="mt-3 text-[32px] leading-[1.05] text-[color:var(--cw-ink)] md:text-[42px]">
        The Waist Strap™
      </h1>

      <a href="#reviews" className="mt-3 inline-flex items-center gap-2">
        <Stars />
        <span style={sans} className="text-[12px] text-[color:var(--cw-muted)] underline underline-offset-4">
          4.8 · 3,000+ reviews
        </span>
      </a>

      <p style={sans} className="mt-4 text-[15px] leading-7 text-[color:var(--cw-muted)]">
        Instantly takes inches off your silhouette and holds them there all day. No hooks to snap, no
        zipper to fight, no size to guess wrong.
      </p>

      <ul style={sans} className="mt-5 space-y-2 text-[13px] leading-6 text-[color:var(--cw-ink)]">
        {[
          "Adjustable wrap closure — you set the compression",
          "Latex compression core with flexible steel support",
          "Bonded flat edge — invisible under clothes",
          "Breathable cotton-spandex lining, wearable all day",
        ].map((b) => (
          <li key={b} className="flex gap-2">
            <span className="text-[color:var(--cw-brand-deep)]">✓</span>
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-7">
        <OfferUrgency />
      </div>

      <div className="mt-4 space-y-3">
        {BUNDLES.map((b) => {
          const on = b.qty === selQty;
          return (
            <div
              key={b.qty}
              className={`relative rounded-2xl border bg-[color:var(--cw-surface)] transition-colors ${
                on ? "border-[color:var(--cw-brand-deep)] ring-1 ring-[color:var(--cw-brand-deep)]" : "border-[color:var(--cw-line)]"
              }`}
            >
              {b.tag && (
                <span
                  style={sans}
                  className="absolute -top-2 right-4 rounded-full bg-[color:var(--cw-brand)] px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[color:var(--cw-ink)]"
                >
                  {b.tag}
                </span>
              )}
              <button onClick={() => setSelQty(b.qty)} className="flex w-full items-center gap-3 px-4 py-4 text-left">
                <span
                  className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
                    on ? "border-[color:var(--cw-brand-deep)]" : "border-[color:var(--cw-muted)]"
                  }`}
                >
                  {on && <span className="h-2 w-2 rounded-full bg-[color:var(--cw-brand-deep)]" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span style={serif} className="block text-[18px] text-[color:var(--cw-ink)]">{b.label}</span>
                  <span style={sans} className="block text-[12px] text-[color:var(--cw-muted)]">
                    {money(b.price / b.qty)} per wrap{b.qty > 1 ? " · free shipping" : ""}
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  {b.compareAt && (
                    <span style={sans} className="block text-[12px] tabular-nums text-[color:var(--cw-muted)] line-through">
                      {money(b.compareAt)}
                    </span>
                  )}
                  <span style={serif} className="block text-[22px] tabular-nums text-[color:var(--cw-ink)]">
                    {money(b.price)}
                  </span>
                </span>
              </button>

              <div
                style={sans}
                className="mx-4 mb-3 flex items-center gap-2 rounded-lg bg-[color:var(--cw-brand)]/40 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--cw-ink)]"
              >
                <img src={posture.url} alt="" className="h-7 w-7 shrink-0 object-contain" />
                {b.gift}
              </div>

              {on && (
                <div className="border-t border-[color:var(--cw-line)] px-4 py-4">
                  <p style={sans} className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--cw-muted)]">
                    Color
                  </p>
                  <div className="mt-2 flex gap-2">
                    {COLORS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        style={sans}
                        className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                          color === c
                            ? "border-[color:var(--cw-brand-deep)] bg-[color:var(--cw-brand)]/40 text-[color:var(--cw-ink)]"
                            : "border-[color:var(--cw-line)] text-[color:var(--cw-muted)]"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p style={sans} className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--cw-muted)]">
                      Size
                    </p>
                    <a href="#size-guide" style={sans} className="text-[11px] underline underline-offset-4 text-[color:var(--cw-muted)]">
                      Size chart
                    </a>
                  </div>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {SIZES.map((s) => (
                      <button
                        key={s.size}
                        onClick={() => setSize(s.size)}
                        style={sans}
                        className={`rounded-lg border px-1 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] ${
                          size === s.size
                            ? "border-[color:var(--cw-brand-deep)] bg-[color:var(--cw-brand)]/40 text-[color:var(--cw-ink)]"
                            : "border-[color:var(--cw-line)] text-[color:var(--cw-muted)]"
                        }`}
                      >
                        {s.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {size ? (
        <button
          onClick={() => cart.add({ qty: bundle.qty, color, size })}
          style={sans}
          className="mt-6 block w-full rounded-full bg-[color:var(--cw-ink)] px-6 py-5 text-center text-[15px] font-semibold uppercase tracking-[0.16em] text-[color:var(--cw-bg)] transition-opacity hover:opacity-90"
        >
          Add to cart — {money(bundle.price)}
        </button>
      ) : (
        <button
          disabled
          style={sans}
          className="mt-6 block w-full cursor-not-allowed rounded-full bg-[color:var(--cw-ink)]/40 px-6 py-5 text-center text-[15px] font-semibold uppercase tracking-[0.16em] text-[color:var(--cw-bg)]"
        >
          Select your size
        </button>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {["VISA", "MASTERCARD", "AMEX", "PAYPAL", "APPLE PAY", "SHOP PAY"].map((p) => (
          <span
            key={p}
            style={sans}
            className="rounded-md border border-[color:var(--cw-line)] bg-[color:var(--cw-surface)] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[color:var(--cw-muted)]"
          >
            {p}
          </span>
        ))}
      </div>

      <ReviewTicker />
      <TrustRow />
    </div>
  );
}

/* --------------------------------- Data ---------------------------------- */

const STEPS = [
  { n: "01", t: "Set the tab at your navel", c: "Hold the marked tab flat against your stomach. That is your anchor.", img: ws3.url },
  { n: "02", t: "Wrap firm, twice around", c: "Pull to the tension you want. You choose the shape — nobody else's sizing chart does.", img: ws6.url },
  { n: "03", t: "Press and go", c: "Smooth the panel down and it locks. Fifteen seconds, then it disappears under your clothes.", img: ws7.url },
];

const ROWS = [
  { k: "Fit", ours: "Wraps to your exact waist, every single day", theirs: "One rigid shape you have to squeeze into" },
  { k: "Closure", ours: "No hooks, no zippers — wrap and press", theirs: "Rows of hooks that pop mid-wear" },
  { k: "Comfort", ours: "Breathable, no digging, wearable all day", theirs: "Boning that jabs your ribs by hour two" },
  { k: "Sizing", ours: "Seven sizes, XS through 3XL, plus adjustable closure", theirs: "Order twice, return once, guess again" },
  { k: "Under clothes", ours: "Bonded flat edge — completely invisible", theirs: "Bulk lines through everything you own" },
];

function CtaButton({ children = "Shop Waist Strap™" }: { children?: React.ReactNode }) {
  return (
    <Link
      to="/waistwrap"
      style={sans}
      className="inline-block rounded-full bg-[color:var(--cw-ink)] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:var(--cw-bg)] transition-opacity hover:opacity-90"
    >
      {children}
    </Link>
  );
}

/* ------------------------------- Objections ------------------------------- */

const OBJECTIONS = [
  {
    q: "\"Waist trainers are uncomfortable.\"",
    a: "This one has a soft cotton-spandex lining against your skin and flexible steel support instead of rigid boning, so it holds shape while still letting you sit, bend and breathe.",
  },
  {
    q: "\"It'll roll, slip or bunch up.\"",
    a: "Reinforced top edges and structured support panels keep the band flat and centered. Nothing to unhook, nothing to re-adjust in a bathroom mirror.",
  },
  {
    q: "\"I'll order the wrong size.\"",
    a: "Every size has an adjustable closure with multiple attachment points, so you fine-tune the compression after it arrives. Between sizes? Size up.",
  },
  {
    q: "\"You'll see it under my clothes.\"",
    a: "The bonded flat edge sits close to the body with no ridge, so it disappears under a tee, a slip dress or work trousers.",
  },
  {
    q: "\"What if it just doesn't work for me?\"",
    a: "Wear it for 60 days. If you don't love it, send it back for a full refund — no photos, no questions.",
  },
];

function ObjectionsSection() {
  return (
    <section className="border-y border-[color:var(--cw-line)] bg-[color:var(--cw-tan)]/30">
      <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
        <Label>Engineered for a better fit</Label>
        <h2 style={serif} className="mt-4 text-[30px] leading-[1.1] md:text-[44px]">
          Every reason you hesitated, answered.
        </h2>
        <img
          src={ws1.url}
          alt="Engineered for a better fit — premium latex compression core, cotton and spandex lining, flexible steel boning, adjustable compression, reinforced edges"
          loading="lazy"
          className="mt-8 w-full rounded-2xl border border-[color:var(--cw-line)]"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {OBJECTIONS.map((o) => (
            <div key={o.q} className="min-w-0 rounded-2xl border border-[color:var(--cw-line)] bg-[color:var(--cw-surface)] p-5">
              <h3 style={serif} className="text-[19px] leading-tight">{o.q}</h3>
              <p style={sans} className="mt-2 text-[14px] leading-7 text-[color:var(--cw-muted)]">{o.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Landing -------------------------------- */

export function WaistWrapLanding() {
  return (
    <WaistWrapShell>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:gap-16 md:px-8 md:py-24">
        <div className="min-w-0">
          <Label>Adjustable waist wrap</Label>
          <h1 style={serif} className="mt-5 text-[38px] leading-[1.04] md:text-[64px]">
            The waist wrap that actually stays put.
          </h1>
          <p className="mt-6 max-w-md text-[16px] leading-8 text-[color:var(--cw-muted)]">
            One band wraps to your exact waist and holds it — all day, no hooks, no zippers, no size to
            guess wrong.
          </p>
          <div className="mt-9">
            <CtaButton>Shop Waist Strap™ — $49.99</CtaButton>
          </div>
        </div>
        <img
          src={ws2.url}
          alt="Before and after wearing the Seralie Waist Strap™"
          className="w-full rounded-2xl border border-[color:var(--cw-line)]"
        />
      </section>

      <WaistSocialProof />

      <ObjectionsSection />

      {/* Icon bar */}
      <section className="border-b border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 text-center sm:grid-cols-3 md:px-8">
          {["Wraps to your size", "No hooks or zippers", "Invisible under clothes"].map((t) => (
            <div key={t}>
              <div className="mx-auto h-px w-8 bg-[color:var(--cw-brand-deep)]" />
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em]">{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it wraps */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-24">
        <Label>How it wraps</Label>
        <h2 style={serif} className="mt-4 max-w-xl text-[30px] leading-[1.1] md:text-[46px]">
          Fifteen seconds. Then you forget it's on.
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="min-w-0">
              <img src={s.img} alt={s.t} loading="lazy" className="w-full rounded-2xl border border-[color:var(--cw-line)]" />
              <div className="mt-5 flex items-baseline gap-3">
                <span style={serif} className="text-[20px] text-[color:var(--cw-brand-deep)]">{s.n}</span>
                <h3 style={serif} className="text-[22px] leading-tight">{s.t}</h3>
              </div>
              <p className="mt-2 text-[14px] leading-7 text-[color:var(--cw-muted)]">{s.c}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="border-y border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
        <div className="mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-24">
          <Label>The difference</Label>
          <h2 style={serif} className="mt-4 text-[30px] leading-[1.1] md:text-[46px]">
            Waist Strap™ vs. traditional waist trainers.
          </h2>
          <ComparisonTable />
          <div className="mt-10">
            <CtaButton />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-3xl px-5 py-16 text-center md:px-8 md:py-20">
        <h2 style={serif} className="text-[30px] leading-[1.1] md:text-[46px]">
          Snatched in fifteen seconds, guaranteed for sixty days.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-[15px] leading-8 text-[color:var(--cw-muted)]">
          Wear it every day for two months. If it isn't the best waist piece you've owned, we refund
          every cent.
        </p>
        <div className="mt-9">
          <CtaButton>Shop Waist Strap™</CtaButton>
        </div>
      </section>
    </WaistWrapShell>
  );
}

function ComparisonTable() {
  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
      <div className="grid grid-cols-[0.8fr_1.1fr_1fr] border-b border-[color:var(--cw-line)] text-[9px] font-semibold uppercase tracking-[0.18em] text-[color:var(--cw-muted)]">
        <div className="px-3 py-3 md:px-5" />
        <div className="border-l-2 border-[color:var(--cw-brand-deep)] bg-[color:var(--cw-brand)]/20 px-3 py-3 text-[color:var(--cw-ink)] md:px-5">
          Waist Strap™
        </div>
        <div className="px-3 py-3 md:px-5">Traditional</div>
      </div>
      {ROWS.map((r) => (
        <div key={r.k} className="grid grid-cols-[0.8fr_1.1fr_1fr] border-b border-[color:var(--cw-line)] last:border-0">
          <div className="px-3 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--cw-muted)] md:px-5">
            {r.k}
          </div>
          <div className="border-l-2 border-[color:var(--cw-brand-deep)] bg-[color:var(--cw-brand)]/20 px-3 py-4 text-[12px] leading-6 md:px-5 md:text-[13px]">
            {r.ours}
          </div>
          <div className="px-3 py-4 text-[12px] leading-6 text-[color:var(--cw-muted)] md:px-5 md:text-[13px]">{r.theirs}</div>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------- Gallery -------------------------------- */

const GALLERY = [
  { url: ws8.url, alt: "Customer before and after wearing the Waist Strap™" },
  { url: ws1.url, alt: "Engineered for a better fit — construction callouts" },
  { url: ws5.url, alt: "Built for everyday wear — materials and construction detail" },
  { url: ws2.url, alt: "See the difference — waist definition with and without the Waist Strap™" },
  { url: ws4.url, alt: "Designed to stay secure — reinforced edges and stitching" },
  { url: ws6.url, alt: "Adjustable closure with relaxed, custom and firmer fit" },
  { url: ws3.url, alt: "Create a smoother silhouette under clothing" },
  { url: ws7.url, alt: "Made to move with you — sit, bend and move" },
];

function ProductGallery() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((v) => (v + d + GALLERY.length) % GALLERY.length);
  return (
    <div className="min-w-0">
      <div className="relative overflow-hidden rounded-2xl border border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
        <img src={GALLERY[i].url} alt={GALLERY[i].alt} className="w-full" />
        <button
          aria-label="Previous image"
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-[color:var(--cw-line)] bg-[color:var(--cw-bg)]/90 text-[color:var(--cw-ink)]"
        >
          ‹
        </button>
        <button
          aria-label="Next image"
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-[color:var(--cw-line)] bg-[color:var(--cw-bg)]/90 text-[color:var(--cw-ink)]"
        >
          ›
        </button>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8">
        {GALLERY.map((g, n) => (
          <button
            key={g.url}
            onClick={() => setI(n)}
            aria-label={`View image ${n + 1}`}
            className={`overflow-hidden rounded-xl border ${
              n === i ? "border-[color:var(--cw-brand-deep)]" : "border-[color:var(--cw-line)]"
            }`}
          >
            <img src={g.url} alt="" className="aspect-square w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Product page ------------------------------ */

const GLANCE = [
  { t: "Wraps to you", c: "Adjustable closure lets you set your own level of compression." },
  { t: "Invisible", c: "Bonded flat edge leaves no ridge under clothes." },
  { t: "Stays put", c: "Reinforced edges and support panels — nothing rolls or slips." },
  { t: "All-day comfort", c: "Cotton-spandex lining that doesn't dig into your ribs." },
];

const USAGE = [
  { t: "Under a slip dress", c: "Smooths the midsection without a single visible line.", img: ws3.url },
  { t: "Workday, 9 to 6", c: "Wrap at your desk in fifteen seconds and forget it.", img: ws7.url },
  { t: "Everyday movement", c: "Sit, bend and move with structured support that flexes.", img: ws6.url },
];

function ReviewWall() {
  const [shown, setShown] = useState(10);
  const [box, setBox] = useState<string | null>(null);
  const list = WW_REVIEWS.slice(0, shown);
  return (
    <section id="reviews" className="scroll-mt-20 border-t border-[color:var(--cw-line)]">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-24">
        <Label>Real customers</Label>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <h2 style={serif} className="text-[30px] leading-[1.1] md:text-[46px]">
            3,000+ women wear it daily.
          </h2>
          <div className="flex items-center gap-2">
            <Stars size={16} />
            <span style={sans} className="text-[13px] text-[color:var(--cw-muted)]">
              4.8 average · 3,000+ reviews
            </span>
          </div>
        </div>

        <div className="mt-10 gap-4 [column-count:1] sm:[column-count:2] lg:[column-count:3]">
          {list.map((r, i) => (
            <div
              key={`${r.n}-${i}`}
              className="mb-4 break-inside-avoid rounded-2xl border border-[color:var(--cw-line)] bg-[color:var(--cw-surface)] p-4"
            >
              {r.img && (
                <button onClick={() => setBox(r.img!)} className="mb-3 block w-full overflow-hidden rounded-xl">
                  <img src={r.img} alt={`Review photo from ${r.n}`} loading="lazy" className="w-full" />
                </button>
              )}
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2">
                  <span
                    style={serif}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[color:var(--cw-brand)] text-[12px] text-[color:var(--cw-ink)]"
                  >
                    {r.n[0]}
                  </span>
                  <span style={sans} className="text-[12px] font-semibold text-[color:var(--cw-ink)]">{r.n}</span>
                </span>
                <span style={sans} className="text-[10px] uppercase tracking-[0.14em] text-[color:var(--cw-muted)]">
                  {r.d}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Stars size={11} value={r.r} />
                <span style={sans} className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[color:var(--cw-brand-deep)]">
                  Verified buyer
                </span>
              </div>
              <p style={sans} className="mt-2 text-[13px] leading-6 text-[color:var(--cw-muted)]">{r.t}</p>
            </div>
          ))}
        </div>

        {shown < WW_REVIEWS.length && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShown((v) => v + 10)}
              style={sans}
              className="rounded-full border border-[color:var(--cw-ink)] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:var(--cw-ink)]"
            >
              Load more reviews
            </button>
          </div>
        )}
      </div>

      {box && (
        <div className="fixed inset-0 z-[110] grid place-items-center bg-black/85 p-4" onClick={() => setBox(null)}>
          <img src={box} alt="Customer review photo" className="max-h-[90vh] max-w-full rounded-xl object-contain" />
        </div>
      )}
    </section>
  );
}


export function WaistWrapProduct() {
  return (
    <WaistWrapShell>
      <section id="shop" className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery />
          <BuyBox />
        </div>
      </section>

      <ObjectionsSection />

      {/* At a glance */}
      <section className="border-b border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4 md:px-8">
          {GLANCE.map((g) => (
            <div key={g.t} className="min-w-0 rounded-2xl border border-[color:var(--cw-line)] bg-[color:var(--cw-bg)] p-5">
              <div className="h-px w-8 bg-[color:var(--cw-brand-deep)]" />
              <h3 style={serif} className="mt-4 text-[19px]">{g.t}</h3>
              <p style={sans} className="mt-2 text-[13px] leading-6 text-[color:var(--cw-muted)]">{g.c}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it wraps */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-24">
        <Label>How it wraps</Label>
        <h2 style={serif} className="mt-4 max-w-xl text-[30px] leading-[1.1] md:text-[46px]">
          Fifteen seconds. Then you forget it's on.
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="min-w-0">
              <img src={s.img} alt={s.t} loading="lazy" className="w-full rounded-2xl border border-[color:var(--cw-line)]" />
              <div className="mt-5 flex items-baseline gap-3">
                <span style={serif} className="text-[20px] text-[color:var(--cw-brand-deep)]">{s.n}</span>
                <h3 style={serif} className="text-[22px] leading-tight">{s.t}</h3>
              </div>
              <p className="mt-2 text-[14px] leading-7 text-[color:var(--cw-muted)]">{s.c}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="border-y border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
        <div className="mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-24">
          <Label>The difference</Label>
          <h2 style={serif} className="mt-4 text-[30px] leading-[1.1] md:text-[46px]">
            Waist Strap™ vs. traditional waist trainers.
          </h2>
          <ComparisonTable />
        </div>
      </section>

      {/* Size guide */}
      <section id="size-guide" className="scroll-mt-20">
        <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-24">
          <Label>Size chart</Label>
          <h2 style={serif} className="mt-4 text-[30px] leading-[1.1] md:text-[42px]">
            Between sizes? Size up.
          </h2>
          <p className="mt-4 text-[14px] leading-7 text-[color:var(--cw-muted)]">
            Measure at the narrowest point of your natural waist, keeping the tape flat.
          </p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
            <table style={sans} className="w-full min-w-[420px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-[color:var(--cw-line)] text-[10px] uppercase tracking-[0.16em] text-[color:var(--cw-muted)]">
                  <th className="px-4 py-3 font-semibold">Size</th>
                  <th className="px-4 py-3 font-semibold">Waistline</th>
                  <th className="px-4 py-3 font-semibold">Length</th>
                  <th className="px-4 py-3 font-semibold">Width</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map((s) => (
                  <tr key={s.size} className="border-b border-[color:var(--cw-line)] last:border-0">
                    <td className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em]">{s.size}</td>
                    <td className="px-4 py-3 tabular-nums text-[color:var(--cw-muted)]">{s.waist}</td>
                    <td className="px-4 py-3 tabular-nums text-[color:var(--cw-muted)]">{s.length}</td>
                    <td className="px-4 py-3 tabular-nums text-[color:var(--cw-muted)]">{s.width}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Where people wear it */}
      <section className="border-y border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-24">
          <Label>Where people wear it</Label>
          <h2 style={serif} className="mt-4 max-w-xl text-[30px] leading-[1.1] md:text-[46px]">
            One strap, every kind of day.
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {USAGE.map((u) => (
              <div key={u.t} className="min-w-0">
                <img src={u.img} alt={u.t} loading="lazy" className="w-full rounded-2xl border border-[color:var(--cw-line)]" />
                <h3 style={serif} className="mt-5 text-[21px] leading-tight">{u.t}</h3>
                <p style={sans} className="mt-2 text-[14px] leading-7 text-[color:var(--cw-muted)]">{u.c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewWall />

      {/* FAQ */}
      <section className="border-t border-[color:var(--cw-line)]">
        <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-24">
          <Label>Questions</Label>
          <h2 style={serif} className="mt-4 mb-8 text-[30px] leading-[1.1] md:text-[42px]">
            Everything you asked.
          </h2>
          <Faq />
          <div className="mt-12 text-center">
            <a
              href="#shop"
              style={sans}
              className="inline-block rounded-full bg-[color:var(--cw-ink)] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-[color:var(--cw-bg)]"
            >
              Shop Waist Strap™ — $49.99
            </a>
          </div>
        </div>
      </section>
    </WaistWrapShell>
  );
}
