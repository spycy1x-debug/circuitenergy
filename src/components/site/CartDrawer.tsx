import { useEffect } from "react";
import { X, Plus, Minus, ShoppingBag, Lock, ShieldCheck, Truck, Loader2, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { shopifyCart, useShopifyCart } from "@/lib/shopify-cart";

/* Seralie purple palette (matches /strips) */
const C = {
  bg: "#FAF6F0",
  panel: "#FFFFFF",
  soft: "#F5E9EE",
  softer: "#FBF3F6",
  primary: "#5B3A6E",
  primaryHover: "#4A2E5A",
  text: "#2E2528",
  muted: "#6B5D62",
  border: "#E9DFD5",
  borderStrong: "#E4D5DC",
};

export function CartDrawer() {
  const { isOpen, lines, subtotal, count, isLoading, checkoutUrl } = useShopifyCart();

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") shopifyCart.close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <>
      <div
        aria-hidden={!isOpen}
        onClick={() => shopifyCart.close()}
        className={`fixed inset-0 z-[80] backdrop-blur-[3px] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(46,37,40,0.55)" }}
      />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 z-[81] h-full w-full sm:w-[440px] flex flex-col transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ background: C.bg, boxShadow: "0 20px 60px -15px rgba(91,58,110,0.35)" }}
      >
        <div className="flex items-center justify-between px-7 py-6" style={{ borderBottom: `1px solid ${C.borderStrong}` }}>
          <div>
            <div className="text-[11px] tracking-[0.24em] uppercase" style={{ color: C.primary }}>Your Bag</div>
            <div className="mt-1 font-display text-2xl" style={{ color: C.primary }}>
              {count === 0 ? "Empty" : `${count} ${count === 1 ? "item" : "items"}`}
            </div>
          </div>
          <button
            onClick={() => shopifyCart.close()}
            aria-label="Close cart"
            className="h-10 w-10 flex items-center justify-center transition"
            style={{ color: C.muted }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {lines.length === 0 ? (
            <EmptyState />
          ) : (
            <ul className="px-7 py-4 divide-y" style={{ borderColor: C.borderStrong }}>
              {lines.map((line) => (
                <li key={line.id} className="py-5 flex gap-4" style={{ borderColor: C.borderStrong }}>
                  <div className="h-20 w-20 flex items-center justify-center overflow-hidden shrink-0 rounded-xl" style={{ background: C.panel, border: `1px solid ${C.borderStrong}` }}>
                    {line.image ? (
                      <img src={line.image} alt={line.productTitle} className="h-full w-full object-cover" />
                    ) : (
                      <ShoppingBag className="h-6 w-6" style={{ color: C.primary }} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-lg leading-snug truncate" style={{ color: C.text }}>{line.productTitle}</div>
                    {line.variantTitle && (
                      <div className="text-[11px] uppercase tracking-[0.18em] mt-1 truncate" style={{ color: C.muted }}>{line.variantTitle}</div>
                    )}
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center overflow-hidden rounded-full" style={{ background: C.panel, border: `1px solid ${C.borderStrong}` }}>
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => shopifyCart.setQty(line.id, line.quantity - 1)}
                          disabled={isLoading}
                          className="h-8 w-8 flex items-center justify-center transition disabled:opacity-50"
                          style={{ color: C.primary }}
                        ><Minus className="h-3 w-3" /></button>
                        <span className="w-8 text-center text-[13px] font-medium tabular-nums" style={{ color: C.text }}>{line.quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => shopifyCart.setQty(line.id, line.quantity + 1)}
                          disabled={isLoading}
                          className="h-8 w-8 flex items-center justify-center transition disabled:opacity-50"
                          style={{ color: C.primary }}
                        ><Plus className="h-3 w-3" /></button>
                      </div>
                      <div className="text-[16px] font-medium tabular-nums" style={{ color: C.primary }}>
                        ${(line.unitPrice * line.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <button
                    aria-label="Remove item"
                    onClick={() => shopifyCart.remove(line.id)}
                    disabled={isLoading}
                    className="self-start h-7 w-7 flex items-center justify-center transition disabled:opacity-50"
                    style={{ color: C.muted }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
                  ><X className="h-4 w-4" /></button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="px-7 py-6 space-y-4" style={{ background: C.softer, borderTop: `1px solid ${C.borderStrong}` }}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] tracking-[0.24em] uppercase" style={{ color: C.primary }}>Subtotal</span>
              <span className="font-display text-3xl tabular-nums" style={{ color: C.primary }}>${subtotal.toFixed(2)}</span>
            </div>
            <div className="text-[11px] -mt-2 tracking-wide" style={{ color: C.muted }}>Shipping & taxes calculated at checkout</div>

            <button
              onClick={() => shopifyCart.checkout()}
              disabled={isLoading || !checkoutUrl}
              className="group w-full font-medium tracking-[0.28em] uppercase text-[11px] py-5 rounded-full transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-white"
              style={{ background: C.primary, boxShadow: "0 14px 34px -14px rgba(91,58,110,0.6)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.primaryHover)}
              onMouseLeave={(e) => (e.currentTarget.style.background = C.primary)}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Lock className="h-3.5 w-3.5" /> Checkout <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></>}
            </button>

            <button onClick={() => shopifyCart.close()} className="w-full text-center text-[11px] tracking-[0.24em] uppercase transition py-1" style={{ color: C.muted }}>
              Continue Shopping
            </button>

            <div className="flex items-center justify-center gap-4 pt-1 text-[11px] tracking-wide" style={{ color: C.muted }}>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" style={{ color: C.primary }} /> 30-day guarantee</span>
              <span className="opacity-40">·</span>
              <span className="inline-flex items-center gap-1.5"><Truck className="h-3.5 w-3.5" style={{ color: C.primary }} /> Free over $40</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-8 py-16">
      <div className="h-16 w-16 rounded-full flex items-center justify-center mb-6" style={{ background: C.panel, border: `1px solid ${C.borderStrong}` }}>
        <ShoppingBag className="h-6 w-6" style={{ color: C.primary }} />
      </div>
      <div className="text-[11px] tracking-[0.24em] uppercase" style={{ color: C.primary }}>Your brighter smile awaits</div>
      <h3 className="mt-3 font-display text-3xl" style={{ color: C.primary }}>Nothing here yet</h3>
      <p className="mt-3 text-sm max-w-xs" style={{ color: C.muted }}>
        Makeup for your teeth. Camera-ready in 30 minutes.
      </p>
      <Link
        to="/strips"
        onClick={() => shopifyCart.close()}
        className="mt-7 inline-flex items-center justify-center rounded-full px-8 py-4 text-[11px] font-medium tracking-[0.24em] uppercase text-white transition-all"
        style={{ background: C.primary, boxShadow: "0 10px 28px -12px rgba(91,58,110,0.6)" }}
      >
        Shop Strips
      </Link>
    </div>
  );
}
