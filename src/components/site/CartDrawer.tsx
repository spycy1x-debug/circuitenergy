import { useEffect } from "react";
import { X, Plus, Minus, ShoppingBag, Lock, ShieldCheck, Truck, Loader2, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { shopifyCart, useShopifyCart } from "@/lib/shopify-cart";

export function CartDrawer() {
  const { isOpen, lines, subtotal, count, isLoading, checkoutUrl } = useShopifyCart();

  // Lock scroll when open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") shopifyCart.close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!isOpen}
        onClick={() => shopifyCart.close()}
        className={`fixed inset-0 z-[80] bg-[#2C353F]/55 backdrop-blur-[3px] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 z-[81] h-full w-full sm:w-[440px] bg-white shadow-[0_20px_60px_-15px_rgba(44,53,63,0.35)] flex flex-col transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ fontFamily: "inherit" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8ECEF]">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-full bg-[#F5F7F8] flex items-center justify-center">
              <ShoppingBag className="h-4 w-4 text-[#2C353F]" />
            </div>
            <div>
              <div className="text-[15px] font-bold tracking-wide text-[#2C353F]">Your Cart</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#6A7786]">
                {count === 0 ? "Empty" : `${count} ${count === 1 ? "item" : "items"}`}
              </div>
            </div>
          </div>
          <button
            onClick={() => shopifyCart.close()}
            aria-label="Close cart"
            className="h-9 w-9 rounded-full hover:bg-[#F5F7F8] active:scale-95 flex items-center justify-center text-[#4A5560] transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {lines.length === 0 ? (
            <EmptyState />
          ) : (
            <ul className="px-6 py-4 divide-y divide-[#E8ECEF]">
              {lines.map((line) => (
                <li key={line.id} className="py-4 flex gap-4">
                  <div className="h-20 w-20 rounded-xl bg-[#F5F7F8] flex items-center justify-center overflow-hidden shrink-0 border border-[#E8ECEF]">
                    {line.image ? (
                      <img src={line.image} alt={line.productTitle} className="h-full w-full object-cover" />
                    ) : (
                      <ShoppingBag className="h-6 w-6 text-[#8A95A1]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-bold text-[#2C353F] leading-snug truncate">{line.productTitle}</div>
                    {line.variantTitle && (
                      <div className="text-[12px] text-[#6A7786] mt-0.5 truncate">{line.variantTitle}</div>
                    )}
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded-full border border-[#D7DCE0] bg-white overflow-hidden">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => shopifyCart.setQty(line.id, line.quantity - 1)}
                          disabled={isLoading}
                          className="h-8 w-8 flex items-center justify-center text-[#4A5560] hover:bg-[#F5F7F8] active:scale-90 transition disabled:opacity-50"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-[13px] font-bold text-[#2C353F] tabular-nums">{line.quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => shopifyCart.setQty(line.id, line.quantity + 1)}
                          disabled={isLoading}
                          className="h-8 w-8 flex items-center justify-center text-[#4A5560] hover:bg-[#F5F7F8] active:scale-90 transition disabled:opacity-50"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="text-[15px] font-extrabold text-[#2C353F] tabular-nums">
                        ${(line.unitPrice * line.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <button
                    aria-label="Remove item"
                    onClick={() => shopifyCart.remove(line.id)}
                    disabled={isLoading}
                    className="self-start h-7 w-7 rounded-full text-[#8A95A1] hover:text-[#2C353F] hover:bg-[#F5F7F8] active:scale-90 flex items-center justify-center transition disabled:opacity-50"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && (
          <div className="border-t border-[#E8ECEF] bg-[#F5F7F8]/40 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[13px] uppercase tracking-[0.18em] text-[#6A7786] font-semibold">Subtotal</span>
              <span className="text-[22px] font-extrabold text-[#2C353F] tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
            <div className="text-[11px] text-[#6A7786] -mt-2">Shipping & taxes calculated at checkout</div>

            <button
              onClick={() => shopifyCart.checkout()}
              disabled={isLoading || !checkoutUrl}
              className="group w-full rounded-[12px] bg-[#F5853F] hover:bg-[#E0742E] text-white font-extrabold tracking-wider uppercase text-[15px] py-4 shadow-[0_10px_24px_-8px_rgba(245,133,63,0.55)] transition-all hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Checkout
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>

            <button
              onClick={() => shopifyCart.close()}
              className="w-full text-center text-[13px] font-semibold text-[#4A5560] hover:text-[#2C353F] transition"
            >
              Continue Shopping
            </button>

            <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-[#6A7786]">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#2E9E6B]" />
                30-day guarantee
              </span>
              <span className="opacity-40">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-[#708090]" />
                Free over $75
              </span>
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
      <div className="h-20 w-20 rounded-full bg-[#F5F7F8] flex items-center justify-center mb-5">
        <ShoppingBag className="h-8 w-8 text-[#708090]" />
      </div>
      <h3 className="text-[20px] font-bold text-[#2C353F]">Your cart is empty</h3>
      <p className="mt-2 text-[13px] text-[#6A7786] max-w-xs">
        Premium supplements engineered to fix brain fog and afternoon crashes.
      </p>
      <Link
        to="/shop"
        onClick={() => shopifyCart.close()}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2C353F] hover:bg-[#1c2229] text-white font-bold text-[13px] uppercase tracking-wider px-6 py-3 transition-all hover:-translate-y-[1px] active:translate-y-0"
      >
        Shop Now
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
