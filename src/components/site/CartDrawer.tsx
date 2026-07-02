import { useEffect } from "react";
import { X, Plus, Minus, ShoppingBag, Lock, ShieldCheck, Truck, Loader2, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { shopifyCart, useShopifyCart } from "@/lib/shopify-cart";

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
        className={`fixed inset-0 z-[80] bg-[#3B2E25]/55 backdrop-blur-[3px] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 z-[81] h-full w-full sm:w-[440px] bg-[#FDF8EE] shadow-[0_20px_60px_-15px_rgba(59,46,37,0.35)] flex flex-col transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-7 py-6 border-b border-[#EADFC7]">
          <div>
            <div className="caps-label text-[#AD9752]">Your Ritual</div>
            <div className="mt-1 font-display text-2xl text-[#3B2E25]">
              {count === 0 ? "Empty" : `${count} ${count === 1 ? "item" : "items"}`}
            </div>
          </div>
          <button
            onClick={() => shopifyCart.close()}
            aria-label="Close cart"
            className="h-10 w-10 hover:text-[#AD9752] flex items-center justify-center text-[#5A483C] transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {lines.length === 0 ? (
            <EmptyState />
          ) : (
            <ul className="px-7 py-4 divide-y divide-[#EADFC7]">
              {lines.map((line) => (
                <li key={line.id} className="py-5 flex gap-4">
                  <div className="h-20 w-20 bg-white flex items-center justify-center overflow-hidden shrink-0 border border-[#EADFC7]">
                    {line.image ? (
                      <img src={line.image} alt={line.productTitle} className="h-full w-full object-cover mix-blend-multiply" />
                    ) : (
                      <ShoppingBag className="h-6 w-6 text-[#AD9752]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-lg text-[#3B2E25] leading-snug truncate">{line.productTitle}</div>
                    {line.variantTitle && (
                      <div className="text-[11px] uppercase tracking-[0.18em] text-[#7A6A5E] mt-1 truncate">{line.variantTitle}</div>
                    )}
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center border border-[#EADFC7] bg-white overflow-hidden">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => shopifyCart.setQty(line.id, line.quantity - 1)}
                          disabled={isLoading}
                          className="h-8 w-8 flex items-center justify-center text-[#5A483C] hover:bg-[#F7EFDF] transition disabled:opacity-50"
                        ><Minus className="h-3 w-3" /></button>
                        <span className="w-8 text-center text-[13px] font-medium text-[#3B2E25] tabular-nums">{line.quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => shopifyCart.setQty(line.id, line.quantity + 1)}
                          disabled={isLoading}
                          className="h-8 w-8 flex items-center justify-center text-[#5A483C] hover:bg-[#F7EFDF] transition disabled:opacity-50"
                        ><Plus className="h-3 w-3" /></button>
                      </div>
                      <div className="text-[16px] font-medium text-[#3B2E25] tabular-nums">
                        ${(line.unitPrice * line.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <button
                    aria-label="Remove item"
                    onClick={() => shopifyCart.remove(line.id)}
                    disabled={isLoading}
                    className="self-start h-7 w-7 text-[#AD9752] hover:text-[#3B2E25] flex items-center justify-center transition disabled:opacity-50"
                  ><X className="h-4 w-4" /></button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-[#EADFC7] bg-[#F7EFDF]/60 px-7 py-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="caps-label text-[#AD9752]">Subtotal</span>
              <span className="font-display text-3xl text-[#3B2E25] tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
            <div className="text-[11px] text-[#7A6A5E] -mt-2 tracking-wide">Shipping & taxes calculated at checkout</div>

            <button
              onClick={() => shopifyCart.checkout()}
              disabled={isLoading || !checkoutUrl}
              className="group w-full bg-[#AD9752] hover:bg-[#94803F] text-white font-medium tracking-[0.28em] uppercase text-[11px] py-5 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Lock className="h-3.5 w-3.5" /> Checkout <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></>}
            </button>

            <button onClick={() => shopifyCart.close()} className="w-full text-center caps-label text-[#5A483C] hover:text-[#3B2E25] transition py-1">
              Continue Shopping
            </button>

            <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-[#7A6A5E] tracking-wide">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[#AD9752]" /> 30-day guarantee</span>
              <span className="opacity-40">·</span>
              <span className="inline-flex items-center gap-1.5"><Truck className="h-3.5 w-3.5 text-[#AD9752]" /> Free over $75</span>
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
      <div className="h-16 w-16 rounded-full border border-[#EADFC7] bg-white flex items-center justify-center mb-6">
        <ShoppingBag className="h-6 w-6 text-[#AD9752]" />
      </div>
      <div className="caps-label text-[#AD9752]">Your ritual awaits</div>
      <h3 className="mt-3 font-display text-3xl text-[#3B2E25]">Nothing here yet</h3>
      <p className="mt-3 text-sm text-[#5A483C] max-w-xs">
        Beauty and healthy aging, from within. Begin with Seralie NMN.
      </p>
      <Link
        to="/product/$slug"
        params={{ slug: "nmn" }}
        onClick={() => shopifyCart.close()}
        className="mt-7 btn-primary"
      >
        Shop NMN
      </Link>
    </div>
  );
}
