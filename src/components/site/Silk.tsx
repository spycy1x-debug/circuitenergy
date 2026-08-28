import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { cart, cartCheckoutUrl, cartTotal } from "@/lib/silkbrush-cart";
import { money, PRICE, PRODUCT_NAME, PROTECTION_PRICE, RATING, REVIEW_COUNT, VARIANT_ID } from "@/lib/silkbrush-config";
import { trackAddToCart, trackInitiateCheckout } from "@/lib/fb-pixel";
import payBadges from "@/assets/pay-badges-v2.png.asset.json";

/* ------------------------------- tokens ---------------------------------- */

export const SB_VARS = {
  "--cw-bg": "#FFFFFF",
  "--cw-surface": "#F7F4F0",
  "--cw-ink": "#141414",
  "--cw-muted": "#6B6660",
  "--cw-brand": "#141414",
  "--cw-brand-deep": "#B07A4E",
  "--cw-line": "#E7E2DB",
} as React.CSSProperties;

export const serif = { fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif' };
export const sans = { fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' };

/* ------------------------------ small bits -------------------------------- */

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={sans} className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--cw-brand-deep)]">
      {children}
    </div>
  );
}

export function Stars({ value = RATING, size = 14 }: { value?: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative inline-block leading-none" style={{ fontSize: size }}>
            <span className="text-[color:var(--cw-line)]">★</span>
            <span className="absolute left-0 top-0 overflow-hidden text-[#D9A441]" style={{ width: `${fill * 100}%` }}>
              ★
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function RatingLine({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`} style={sans}>
      <Stars />
      <span className="text-[13px] text-[color:var(--cw-muted)]">
        {RATING.toFixed(1)}
        {REVIEW_COUNT ? ` · ${REVIEW_COUNT} reviews` : ""}
      </span>
    </div>
  );
}

export function Media({
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
      className={`grid w-full place-items-center overflow-hidden rounded-xl border border-dashed border-[color:var(--cw-brand-deep)]/45 bg-[color:var(--cw-surface)] p-4 text-center sm:p-5 ${className}`}
    >
      <div className="min-w-0">
        <div style={sans} className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--cw-brand-deep)]">
          {label}
        </div>
        <p style={sans} className="mx-auto mt-2 max-w-[24ch] break-words text-[11px] leading-5 text-[color:var(--cw-muted)]">
          {note}
        </p>
      </div>
    </div>
  );
}

/* --------------------------------- CTA ----------------------------------- */

export function useCart() {
  const [, force] = useState(0);
  useEffect(() => cart.subscribe(() => force((v) => v + 1)), []);
  return { qty: cart.getQty(), open: cart.isOpen() };
}

let lock = 0;
export function addToCart(n = 1) {
  const now = Date.now();
  if (now - lock < 1200) return;
  lock = now;
  cart.add(n);
  trackAddToCart(VARIANT_ID || "silkbrush", PRICE * n, n);
}

export function BuyButton({
  children = "Get My SilkBrush™",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={() => addToCart(1)}
      style={sans}
      className={`block w-full rounded-full bg-[color:var(--cw-ink)] px-8 py-4 text-center text-[14px] font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-black/15 transition-transform active:scale-[0.99] ${className}`}
    >
      {children}
    </button>
  );
}

export function TrustRow({ className = "" }: { className?: string }) {
  return (
    <ul
      style={sans}
      className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--cw-muted)] ${className}`}
    >
      <li>✓ Free shipping</li>
      <li>✓ 30-day money-back guarantee</li>
      <li>✓ Secure checkout</li>
    </ul>
  );
}

/* ------------------------------ sticky bar -------------------------------- */

export function StickyBuyBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[color:var(--cw-line)] bg-[color:var(--cw-bg)]/97 px-4 pb-[max(10px,env(safe-area-inset-bottom))] pt-3 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center gap-3">
        <div className="min-w-0 shrink">
          <p style={sans} className="truncate text-[12px] font-semibold">
            {PRODUCT_NAME}
          </p>
          <p style={sans} className="text-[13px] font-bold tabular-nums">
            {money(PRICE)}
          </p>
        </div>
        <BuyButton className="ml-auto max-w-[62%] !rounded-none px-6 py-3.5 text-[13px]">Add to Cart</BuyButton>
      </div>

    </div>
  );
}

/* -------------------------------- cart ----------------------------------- */

export function CartDrawer() {
  const { qty, open } = useCart();
  const [, force] = useState(0);
  useEffect(() => cart.subscribe(() => force((v) => v + 1)), []);
  const protection = cart.hasProtection();
  const total = cartTotal(qty, protection);
  const href = cartCheckoutUrl(qty, protection);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]" style={sans}>
      <button aria-label="Close cart" onClick={() => cart.setOpen(false)} className="absolute inset-0 bg-transparent" />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[400px] flex-col bg-[color:var(--cw-bg)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[color:var(--cw-line)] px-5 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em]">Your cart</p>
          <button onClick={() => cart.setOpen(false)} aria-label="Close" className="text-2xl leading-none">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {qty === 0 ? (
            <p className="text-[14px] text-[color:var(--cw-muted)]">Your cart is empty.</p>
          ) : (
            <>
              <div className="border border-[color:var(--cw-line)] bg-[color:var(--cw-surface)] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p style={serif} className="text-[18px] leading-tight">
                      {PRODUCT_NAME}
                    </p>
                    <p className="mt-1 text-[12px] text-[color:var(--cw-muted)]">Boar-bristle smoothing brush</p>
                  </div>
                  <p style={serif} className="shrink-0 text-[18px] tabular-nums">
                    {money(PRICE * qty)}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => cart.setQty(qty - 1)}
                    aria-label="Decrease quantity"
                    className="h-8 w-8 border border-[color:var(--cw-line)]"
                  >
                    –
                  </button>
                  <span className="w-8 text-center text-[14px] tabular-nums">{qty}</span>
                  <button
                    onClick={() => cart.setQty(qty + 1)}
                    aria-label="Increase quantity"
                    className="h-8 w-8 border border-[color:var(--cw-line)]"
                  >
                    +
                  </button>
                  <button
                    onClick={() => cart.clear()}
                    className="ml-auto text-[11px] uppercase tracking-[0.16em] text-[color:var(--cw-muted)] underline underline-offset-4"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <label className="mt-4 flex cursor-pointer items-start gap-3 border border-[color:var(--cw-line)] p-4">
                <input
                  type="checkbox"
                  checked={protection}
                  onChange={(e) => cart.setProtection(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[color:var(--cw-ink)]"
                />
                <span className="min-w-0">
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-[13px] font-semibold">Shipping protection</span>
                    <span className="shrink-0 text-[13px] tabular-nums">{money(PROTECTION_PRICE)}</span>
                  </span>
                  <span className="mt-1 block text-[12px] leading-5 text-[color:var(--cw-muted)]">
                    Covers your order against loss, theft, or damage in transit.
                  </span>
                </span>
              </label>
            </>
          )}
        </div>

        <div className="border-t border-[color:var(--cw-line)] px-5 py-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--cw-muted)]">Subtotal</span>
            <span style={serif} className="text-[22px] tabular-nums">
              {money(total)}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[color:var(--cw-brand-deep)]">Free shipping · 30-day money-back guarantee</p>
          {href ? (
            <a
              href={href}
              onClick={() => trackInitiateCheckout([VARIANT_ID], total, qty)}
              className="mt-4 block w-full bg-[color:var(--cw-ink)] px-6 py-4 text-center text-[13px] font-bold uppercase tracking-[0.18em] text-white"
            >
              Checkout — {money(total)}
            </a>
          ) : (
            <button
              disabled
              className="mt-4 block w-full cursor-not-allowed bg-[color:var(--cw-ink)]/40 px-6 py-4 text-center text-[13px] font-bold uppercase tracking-[0.18em] text-white"
            >
              Checkout
            </button>
          )}
          <img src={payBadges.url} alt="Accepted payment methods" className="mx-auto mt-4 h-6 w-auto object-contain" loading="lazy" />
          <button
            onClick={() => cart.setOpen(false)}
            className="mt-3 w-full text-[11px] uppercase tracking-[0.16em] text-[color:var(--cw-muted)] underline underline-offset-4"
          >
            Continue shopping
          </button>
        </div>
      </aside>
    </div>
  );
}

/* -------------------------------- shell ---------------------------------- */

export function SilkShell({ children, sticky = false }: { children: React.ReactNode; sticky?: boolean }) {
  const { qty } = useCart();
  const nav = [
    { label: "Shop", to: "/silkbrush" as const, hash: undefined },
    { label: "How it works", to: "/silkbrush" as const, hash: "how" },
    { label: "Reviews", to: "/silkbrush" as const, hash: "reviews" },
    { label: "FAQ", to: "/silkbrush" as const, hash: "faq" },
  ];
  return (
    <div
      style={{ ...SB_VARS, ...sans }}
      className="min-h-screen w-full max-w-full overflow-x-hidden bg-[color:var(--cw-bg)] text-[color:var(--cw-ink)]"
    >
      <div className="bg-[color:var(--cw-ink)] text-white">
        <p style={sans} className="px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em]">
          Free shipping · 30-day money-back guarantee
        </p>
      </div>

      <header className="sticky top-0 z-40 border-b border-[color:var(--cw-line)] bg-[color:var(--cw-bg)]/95 backdrop-blur">
        <div className="relative mx-auto flex h-14 max-w-6xl items-center px-4 md:h-16 md:px-8">
          <nav className="hidden flex-1 items-center gap-6 md:flex">
            {nav.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                hash={n.hash}
                style={sans}
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--cw-muted)] hover:text-[color:var(--cw-ink)]"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 inline-flex items-baseline"
            aria-label="Seralie home"
          >
            <span style={serif} className="text-[22px] tracking-[0.22em] md:text-[26px]">
              SERALIE
            </span>
          </Link>

          <button
            onClick={() => cart.setOpen(true)}
            aria-label="Open cart"
            style={sans}
            className="ml-auto text-[11px] font-semibold uppercase tracking-[0.18em]"
          >
            Cart ({qty})
          </button>
        </div>
      </header>


      {children}

      <footer className="border-t border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3 md:px-8">
          <div className="min-w-0">
            <span style={serif} className="text-[22px] tracking-[0.14em]">
              SERALIE
            </span>
            <p className="mt-3 max-w-xs text-[13px] leading-7 text-[color:var(--cw-muted)]">
              Makers of the Seralie SilkBrush™ — a boar-bristle brush for smoother, shinier, straighter-looking hair.
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

      {sticky && <StickyBuyBar />}
      {sticky && <div className="h-20" />}
      <CartDrawer />
    </div>
  );
}

/* --------------------------------- FAQ ----------------------------------- */

export const SB_FAQS = [
  {
    q: "What is the SilkBrush™?",
    a: "The Seralie SilkBrush™ is a boar-bristle hair brush designed to smooth frizz, tame flyaways, distribute natural oils, and create a smoother, shinier, straighter-looking finish.",
  },
  {
    q: "Does the SilkBrush™ actually straighten hair?",
    a: "The SilkBrush™ is designed to smooth and lay hair down, creating a straighter-looking, more polished finish as you brush. It is not a permanent chemical straightening treatment.",
  },
  {
    q: "What type of hair can I use it on?",
    a: "The SilkBrush™ can be used as part of a smoothing routine on many hair types. Results can vary depending on hair texture, thickness, and natural pattern.",
  },
  {
    q: "Can I use it on wet hair?",
    a: "Use the SilkBrush™ on dry hair, according to the manufacturer's instructions.",
  },
  {
    q: "How do boar bristles help my hair?",
    a: "Boar bristles can help distribute natural oils from the scalp through the lengths of the hair while smoothing the hair surface, helping hair appear shinier and more polished.",
  },
  {
    q: "Will it eliminate frizz?",
    a: "The SilkBrush™ is designed to help smooth frizz and flyaways. Results can vary depending on hair type, humidity, and individual hair texture.",
  },
  {
    q: "How do I clean the SilkBrush™?",
    a: "Remove loose hair from the bristles regularly and clean the brush according to the manufacturer's care instructions.",
  },
  {
    q: "How long does shipping take?",
    a: "Orders are processed within 1–2 business days. Delivery times are shown at checkout — see our Shipping page for current estimates.",
  },
  {
    q: "What if I don't like it?",
    a: "You're covered by our 30-day money-back guarantee, subject to our return policy.",
  },
];

export function Faq({ items = SB_FAQS }: { items?: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-[color:var(--cw-line)]">
      {items.map((f, i) => (
        <div key={f.q} className="border-b border-[color:var(--cw-line)]">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-6 py-4 text-left"
          >
            <span style={sans} className="text-[15px] font-semibold leading-snug">
              {f.q}
            </span>
            <span aria-hidden className="shrink-0 text-xl leading-none text-[color:var(--cw-brand-deep)]">
              {open === i ? "–" : "+"}
            </span>
          </button>
          {open === i && (
            <p style={sans} className="pb-5 pr-8 text-[14px] leading-7 text-[color:var(--cw-muted)]">
              {f.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
