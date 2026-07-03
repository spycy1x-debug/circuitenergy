import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Truck, Lock, ArrowRight, ShoppingBag, Minus, Plus, X } from "lucide-react";
import { useShopifyCart, shopifyCart } from "@/lib/shopify-cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Ritual — Seralie" },
      { name: "description", content: "Review your Seralie order before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, subtotal, count, isLoading, checkoutUrl } = useShopifyCart();
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 7.99;
  const total = subtotal + shipping;
  const progress = Math.min(100, (subtotal / 50) * 100);

  return (
    <>
      <section className="bg-[#FDF8EE]">
        <div className="container-x pt-14 pb-6 md:pt-20 md:pb-10 text-center max-w-2xl mx-auto">
          <div className="eyebrow">Your Ritual</div>
          <h1 className="mt-4 font-display text-5xl md:text-6xl text-[#3B2E25]">Cart</h1>
          <p className="mt-4 text-[15px] leading-8 text-[#5A483C]">
            {count === 0 ? "Nothing here yet — the ritual awaits." : `${count} ${count === 1 ? "item" : "items"} · Complimentary shipping over $50.`}
          </p>
        </div>
      </section>

      <section className="bg-[#FDF8EE]">
        <div className="container-x pb-24 md:pb-32">
          {lines.length === 0 ? (
            <div className="max-w-md mx-auto text-center border border-[#EADFC7] bg-white p-10">
              <div className="mx-auto h-16 w-16 rounded-full border border-[#AD9752] flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-[#AD9752]" />
              </div>
              <h2 className="mt-6 font-display text-3xl text-[#3B2E25]">Empty for now</h2>
              <p className="mt-3 text-sm text-[#5A483C]">Beauty and healthy aging, from within. Begin with Seralie NMN.</p>
              <Link to="/product/$slug" params={{ slug: "nmn" }} className="btn-primary mt-7">Shop NMN</Link>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1fr_380px] max-w-5xl mx-auto">
              <div>
                {subtotal < 50 && (
                  <div className="border border-[#EADFC7] bg-[#F7EFDF]/60 p-5">
                    <div className="text-sm text-[#3B2E25]">
                      Add <span className="font-display italic text-[#AD9752]">${(50 - subtotal).toFixed(2)}</span> for complimentary shipping.
                    </div>
                    <div className="mt-3 h-1 bg-[#EADFC7] overflow-hidden">
                      <div className="h-full bg-[#AD9752] transition-all" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                )}
                <ul className="mt-6 divide-y divide-[#EADFC7] border-y border-[#EADFC7]">
                  {lines.map((line) => (
                    <li key={line.id} className="py-6 flex gap-5">
                      <div className="h-24 w-24 bg-[#F7EFDF] shrink-0 overflow-hidden">
                        {line.image ? <img src={line.image} alt={line.productTitle} className="h-full w-full object-cover" /> : <ShoppingBag className="h-6 w-6 m-auto text-[#AD9752]" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-display text-xl text-[#3B2E25]">{line.productTitle}</div>
                        {line.variantTitle && <div className="caps-label text-[#7A6A5E] text-[10px] mt-1">{line.variantTitle}</div>}
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div className="inline-flex items-center border border-[#EADFC7] bg-white">
                            <button aria-label="Decrease" onClick={() => shopifyCart.setQty(line.id, line.quantity - 1)} disabled={isLoading} className="h-9 w-9 flex items-center justify-center hover:bg-[#F7EFDF] disabled:opacity-50"><Minus className="h-3 w-3" /></button>
                            <span className="w-9 text-center text-sm tabular-nums">{line.quantity}</span>
                            <button aria-label="Increase" onClick={() => shopifyCart.setQty(line.id, line.quantity + 1)} disabled={isLoading} className="h-9 w-9 flex items-center justify-center hover:bg-[#F7EFDF] disabled:opacity-50"><Plus className="h-3 w-3" /></button>
                          </div>
                          <div className="font-display text-xl text-[#3B2E25] tabular-nums">${(line.unitPrice * line.quantity).toFixed(2)}</div>
                        </div>
                      </div>
                      <button aria-label="Remove" onClick={() => shopifyCart.remove(line.id)} disabled={isLoading} className="self-start text-[#AD9752] hover:text-[#3B2E25] h-8 w-8 flex items-center justify-center"><X className="h-4 w-4" /></button>
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="bg-[#F7EFDF]/60 border border-[#EADFC7] p-8 h-fit">
                <div className="eyebrow">Summary</div>
                <div className="mt-5 space-y-3 text-sm text-[#3B2E25]">
                  <div className="flex justify-between"><span>Subtotal</span><span className="tabular-nums">${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span className="tabular-nums">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
                  <div className="border-t border-[#EADFC7] pt-3 flex justify-between font-display text-2xl text-[#3B2E25]"><span>Total</span><span className="tabular-nums">${total.toFixed(2)}</span></div>
                </div>
                <button
                  onClick={() => shopifyCart.checkout()}
                  disabled={isLoading || !checkoutUrl}
                  className="mt-6 w-full bg-[#AD9752] hover:bg-[#94803F] text-white caps-label text-[11px] py-4 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Lock className="h-3.5 w-3.5" /> Checkout <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <div className="mt-6 space-y-2 text-[11px] text-[#7A6A5E] tracking-wide">
                  <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-[#AD9752]" /> 30-day money-back guarantee</div>
                  <div className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-[#AD9752]" /> Free shipping over $50</div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
