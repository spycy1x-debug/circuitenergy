import { useEffect, useState } from "react";
import { X, ShoppingBag, ArrowRight, ShieldCheck, Truck, Lock } from "lucide-react";
import { GuaranteeBadges } from "@/components/site/GuaranteeBadges";
import {
  cart,
  useCart,
  fetchVariantPrices,
  PACKAGE_PROTECTION_VARIANT_ID,
} from "@/lib/shopify-cart";
import { PATCH_PATCH_TIERS } from "@/lib/patch-config";
import { Link } from "@tanstack/react-router";

function ProtectionRow() {
  const { protectionOn, protectionPending, protectionError, lines } = useCart();
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    fetchVariantPrices([PACKAGE_PROTECTION_VARIANT_ID])
      .then((m) => {
        const p = m[PACKAGE_PROTECTION_VARIANT_ID];
        if (alive && p) setPrice(p.amount);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (lines.length === 0) return null;

  return (
    <div className="border-t border-[color:var(--line)] bg-white px-5 py-4">
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--muted-ink)]" strokeWidth={1.4} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <span id="pkg-protect-label" className="text-sm text-[color:var(--brand)]">
              Package Protection
            </span>
            <div className="flex items-center gap-3">
              {price !== null && (
                <span className="text-sm tabular-nums text-[color:var(--muted-foreground)]">
                  ${price.toFixed(2)}
                </span>
              )}
              <button
                role="switch"
                aria-checked={protectionOn}
                aria-labelledby="pkg-protect-label"
                disabled={protectionPending}
                onClick={() => cart.setProtection(!protectionOn)}
                className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors disabled:opacity-50 ${
                  protectionOn ? "bg-[color:var(--brand)]" : "bg-[color:var(--line)]"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    protectionOn ? "translate-x-[18px]" : "translate-x-[2px]"
                  }`}
                />
              </button>
            </div>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-[color:var(--muted-foreground)]">
            Covers loss, theft and damage in transit. Charged once ‚Äî never on a rebill.
          </p>
          {protectionError && (
            <p className="mt-2 text-xs text-[color:var(--destructive)]">{protectionError}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/** Nudges a smaller pack up to the next tier. */
function BundleUpgrade() {
  const { lines } = useCart();
  const ids = lines.map((l) => String(l.variantId).split("/").pop());
  const current = PATCH_TIERS.findIndex((t) => ids.includes(t.variantId));
  if (current === -1 || current >= PATCH_TIERS.length - 1) return null;
  const next = PATCH_TIERS[current + 1]!;

  return (
    <div className="border-t border-[color:var(--line)] bg-[color:#ffffff] px-5 py-4">
      <p className="text-xs leading-6 text-[color:var(--muted-foreground)]">
        Upgrade to <span className="text-[color:var(--brand)]">{next.label}</span> for a lower price per patch.
      </p>
      <Link
        to="/patches"
        onClick={() => cart.close()}
        className="mt-2 inline-block text-[11px] uppercase tracking-[0.16em] text-[color:var(--brand)] underline underline-offset-4"
      >
        See the offer
      </Link>
    </div>
  );
}

export function CartDrawer() {
  const { isOpen, lines, allLines, subtotal, isLoading, checkoutUrl, error } = useCart();

  return (
    <>
      <div
        onClick={() => cart.close()}
        className={`fixed inset-0 z-50 bg-[color:var(--brand)]/30 transition-opacity duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!isOpen}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col bg-[color:#ffffff] shadow-xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!isOpen}
      >
        <div className="flex h-16 items-center justify-between border-b border-[color:var(--line)] px-5">
          <span className="caps-label text-[color:var(--brand)]">Your cart</span>
          <button onClick={() => cart.close()} aria-label="Close cart" className="-mr-2 p-2">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {error && <p className="mt-4 text-xs text-[color:var(--destructive)]">{error}</p>}
          {allLines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <ShoppingBag className="h-6 w-6 text-[color:var(--muted-ink)]" strokeWidth={1.2} />
              <p className="text-sm text-[color:var(--muted-foreground)]">Your cart is empty.</p>
              <Link to="/patches" onClick={() => cart.close()} className="rounded-full bg-[color:var(--brand)] px-6 py-3 text-sm font-semibold text-white">
                Shop patches
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-[color:var(--line)]">
              {allLines.map((line) => (
                <li key={line.id} className="flex gap-4 py-5">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-[color:var(--line)] bg-white">
                    {line.image && (
                      <img src={line.image} alt={line.title} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-semibold leading-tight text-[color:var(--brand)]">
                      {line.title}
                    </div>
                    {line.subtitle && (
                      <div className="mt-1 text-xs text-[color:var(--muted-foreground)]">
                        {line.subtitle}
                      </div>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-[color:var(--muted-foreground)]">
                        Qty {line.quantity}
                      </span>
                      <span className="text-sm tabular-nums">
                        ${(line.unitPrice * line.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => cart.remove(line.id)}
                    disabled={isLoading}
                    aria-label="Remove"
                    className="self-start p-1 text-[color:var(--muted-ink)] hover:text-[color:var(--brand)]"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && <BundleUpgrade />}
        <ProtectionRow />

        {allLines.length > 0 && (
          <div className="space-y-4 border-t border-[color:var(--line)] px-5 py-5">
            <div className="flex items-center justify-between text-sm">
              <span className="caps-label text-[color:var(--muted-ink)]">Subtotal</span>
              <span className="text-xl font-semibold tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => cart.checkout()}
              disabled={isLoading || !checkoutUrl}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--brand)] px-6 py-4 text-base font-semibold text-white disabled:opacity-60"
            >
              Checkout <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <GuaranteeBadges className="pt-1" />
            <ul className="flex items-center justify-center gap-4">
              <li className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-[color:var(--muted-ink)]">
                <Truck className="h-3 w-3" strokeWidth={1.4} /> Ships in 24h
              </li>
              <li className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-[color:var(--muted-ink)]">
                <Lock className="h-3 w-3" strokeWidth={1.4} /> Secure checkout
              </li>
            </ul>
          </div>
        )}
      </aside>
    </>
  );
}
