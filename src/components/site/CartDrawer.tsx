import { useEffect, useState } from "react";
import { X, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import {
  cart,
  useCart,
  fetchVariantPrices,
  PACKAGE_PROTECTION_VARIANT_ID,
} from "@/lib/shopify-cart";
import { Link } from "@tanstack/react-router";

function ProtectionRow() {
  const { protectionOn, protectionPending, protectionError, protection, lines } = useCart();
  const [price, setPrice] = useState<number | null>(protection?.unitPrice ?? null);

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
    <div className="border-t border-[color:var(--border)] px-6 py-4 bg-[color:var(--sand)]/40">
      <div className="flex items-start gap-3">
        <ShieldCheck
          className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--muted-foreground)]"
          strokeWidth={1.4}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <span id="pkg-protect-label" className="text-sm text-[color:var(--charcoal)]">
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
                aria-describedby="pkg-protect-desc"
                disabled={protectionPending}
                onClick={() => cart.setProtection(!protectionOn)}
                className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--charcoal)] focus-visible:ring-offset-2 ${
                  protectionOn
                    ? "bg-[color:var(--charcoal)]"
                    : "bg-[color:var(--border)]"
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
          <p id="pkg-protect-desc" className="mt-1 text-xs leading-relaxed text-[color:var(--muted-foreground)]">
            Covers loss, theft, and damage in transit. We remake and reship free.
          </p>
          {protectionError && (
            <p className="mt-2 text-xs text-[color:var(--muted-foreground)]">{protectionError}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { isOpen, lines, subtotal, isLoading, checkoutUrl, error } = useCart();


  return (
    <>
      <div
        onClick={() => cart.close()}
        className={`fixed inset-0 z-50 bg-black/30 transition-opacity duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!isOpen}
      />
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-[420px] bg-[color:var(--bone)] shadow-xl transition-transform duration-300 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-[color:var(--border)]">
          <span className="caps-label text-[color:var(--charcoal)]">Your bag</span>
          <button onClick={() => cart.close()} aria-label="Close bag" className="p-2 -mr-2">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {error && (
            <p className="mt-4 text-xs text-[color:var(--destructive)]">{error}</p>
          )}
          {lines.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4">
              <ShoppingBag className="h-6 w-6 text-[color:var(--muted-foreground)]" strokeWidth={1.2} />
              <p className="text-sm text-[color:var(--muted-foreground)]">Your bag is empty.</p>
              <Link to="/necklace" onClick={() => cart.close()} className="btn-outline">
                Begin a keepsake
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-[color:var(--border)]">
              {lines.map((line) => (
                <li key={line.id} className="py-6 flex gap-4">
                  <div className="h-20 w-20 shrink-0 bg-[color:var(--sand)] overflow-hidden">
                    {line.image && (
                      <img src={line.image} alt={line.title} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-lg leading-tight text-[color:var(--charcoal)]">{line.title}</div>
                    {line.subtitle && (
                      <div className="mt-1 text-xs text-[color:var(--muted-foreground)]">{line.subtitle}</div>
                    )}
                    {line.attributes.filter((a) => a.key.startsWith("_name_")).length > 0 && (
                      <div className="mt-2 text-xs text-[color:var(--muted-foreground)]">
                        {line.attributes
                          .filter((a) => a.key.startsWith("_name_"))
                          .map((a) => a.value)
                          .join(" · ")}
                      </div>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-[color:var(--muted-foreground)]">Qty {line.quantity}</span>
                      <span className="text-sm tabular-nums">${(line.unitPrice * line.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => cart.remove(line.id)}
                    disabled={isLoading}
                    aria-label="Remove"
                    className="self-start p-1 text-[color:var(--muted-foreground)] hover:text-[color:var(--charcoal)]"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <ProtectionRow />

        {lines.length > 0 && (
          <div className="border-t border-[color:var(--border)] px-6 py-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="caps-label text-[color:var(--muted-foreground)]">Subtotal</span>
              <span className="font-display text-xl tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => cart.checkout()}
              disabled={isLoading || !checkoutUrl}
              className="btn-primary w-full gap-2"
            >
              Checkout <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <p className="text-[11px] text-center text-[color:var(--muted-foreground)]">
              Package protection can be added at checkout.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
