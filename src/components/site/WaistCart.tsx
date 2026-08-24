import { useEffect, useState } from "react";
import { cart, bundleFor, cartTotal, cartCheckoutUrl, type CartLine } from "@/lib/waistwrap-cart";
import posture from "@/assets/posture-corrector.png.asset.json";
import payBadges from "@/assets/pay-badges-v2.png.asset.json";
import { PROTECTION_PRICE } from "@/lib/waistwrap-config";

const serif = { fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif' };
const sans = { fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' };
const money = (n: number) => `$${n.toFixed(2)}`;

export function useCart() {
  const [, force] = useState(0);
  useEffect(() => {
    const unsub = cart.subscribe(() => force((v) => v + 1));
    return () => {
      unsub();
    };
  }, []);
  return { lines: cart.getLines(), open: cart.isOpen(), protection: cart.hasProtection() };
}

export function CartDrawer() {
  const { lines, open, protection } = useCart();
  const total = cartTotal(lines, protection);
  const href = cartCheckoutUrl(lines, protection);
  const freeShipping = lines.some((l) => l.qty > 1) || total >= 50;

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
      <button
        aria-label="Close cart"
        onClick={() => cart.setOpen(false)}
        className="absolute inset-0 bg-black/40"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-[color:var(--cw-bg)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[color:var(--cw-line)] px-5 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em]">Your cart</p>
          <button onClick={() => cart.setOpen(false)} aria-label="Close" className="text-2xl leading-none">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {lines.length === 0 ? (
            <p className="text-[14px] text-[color:var(--cw-muted)]">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {lines.map((l: CartLine) => {
                const b = bundleFor(l.qty);
                return (
                  <li
                    key={l.id}
                    className="rounded-2xl border border-[color:var(--cw-line)] bg-[color:var(--cw-surface)] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p style={serif} className="text-[18px] leading-tight">
                          Waist Strap™ — {b.label}
                        </p>
                        <p className="mt-1 text-[12px] text-[color:var(--cw-muted)]">
                          {l.color} · Size {l.size}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        {b.compareAt && (
                          <p className="text-[11px] text-[color:var(--cw-muted)] line-through">{money(b.compareAt)}</p>
                        )}
                        <p style={serif} className="text-[18px] tabular-nums">
                          {money(b.price)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-3 rounded-xl bg-[color:var(--cw-brand)]/30 p-2.5">
                      <img src={posture.url} alt="Free posture corrector" className="h-12 w-12 object-contain" />
                      <p className="text-[11px] font-semibold uppercase leading-4 tracking-[0.1em]">
                        {b.gift.replace(/^\+\s*/, "")} — included free
                      </p>
                    </div>

                    <button
                      onClick={() => cart.remove(l.id)}
                      className="mt-3 text-[11px] uppercase tracking-[0.16em] text-[color:var(--cw-muted)] underline underline-offset-4"
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-[color:var(--cw-line)] px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-[color:var(--cw-ink)]">Shipping Protection</p>
                <p className="mt-1 text-[11px] leading-5 text-[color:var(--cw-muted)]">
                  Covers loss, theft and damage in transit.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-[13px] tabular-nums text-[color:var(--cw-muted)]">{money(PROTECTION_PRICE)}</span>
                <button
                  role="switch"
                  aria-checked={protection}
                  aria-label="Shipping protection"
                  onClick={() => cart.setProtection(!protection)}
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
                    protection ? "bg-[color:var(--cw-ink)]" : "bg-[color:var(--cw-line)]"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      protection ? "translate-x-[18px]" : "translate-x-[2px]"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="border-t border-[color:var(--cw-line)] px-5 py-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--cw-muted)]">Subtotal</span>
            <span style={serif} className="text-[22px] tabular-nums">
              {money(total)}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[color:var(--cw-muted)]">
            {freeShipping ? "Free shipping applied" : "Add a second wrap for free shipping"} · 60-day fit guarantee
          </p>
          {href ? (
            <a
              href={href}
              className="mt-4 block w-full rounded-full bg-[color:var(--cw-ink)] px-6 py-4 text-center text-[13px] font-semibold uppercase tracking-[0.18em] text-[color:var(--cw-bg)]"
            >
              Checkout — {money(total)}
            </a>
          ) : (
            <button
              disabled
              className="mt-4 block w-full cursor-not-allowed rounded-full bg-[color:var(--cw-ink)]/40 px-6 py-4 text-center text-[13px] font-semibold uppercase tracking-[0.18em] text-[color:var(--cw-bg)]"
            >
              Checkout
            </button>
          )}
          <img src={payBadges.url} alt="Accepted payment methods" className="mx-auto mt-4 h-6 w-auto object-contain" />
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
