import { createFileRoute, Link } from "@tanstack/react-router";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { cart, useCart } from "@/lib/shopify-cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Seralie" },
      { name: "description", content: "Review your Seralie keepsake before checkout." },
      { property: "og:title", content: "Your Bag — Seralie" },
      { property: "og:description", content: "Review your Seralie keepsake before checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, subtotal, isLoading, checkoutUrl } = useCart();

  return (
    <section className="container-x py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <div className="eyebrow">Your bag</div>
        <h1 className="mt-4 font-display text-4xl md:text-5xl">Bag</h1>

        {lines.length === 0 ? (
          <div className="mt-12 border border-[color:var(--border)] bg-white p-12 text-center">
            <ShoppingBag className="mx-auto h-6 w-6 text-[color:var(--muted-foreground)]" strokeWidth={1.2} />
            <p className="mt-4 text-sm text-[color:var(--muted-foreground)]">Nothing here yet.</p>
            <Link to="/necklace" className="btn-primary mt-8">Begin a keepsake</Link>
          </div>
        ) : (
          <>
            <ul className="mt-10 divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
              {lines.map((line) => (
                <li key={line.id} className="py-6 flex gap-5">
                  <div className="h-24 w-24 shrink-0 bg-[color:var(--sand)] overflow-hidden">
                    {line.image && <img src={line.image} alt={line.title} className="h-full w-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-xl">{line.title}</div>
                    {line.subtitle && (
                      <div className="mt-1 text-xs text-[color:var(--muted-foreground)]">{line.subtitle}</div>
                    )}
                    <ul className="mt-2 space-y-1">
                      {line.attributes
                        .filter((a) => a.key.startsWith("_name_"))
                        .map((a) => (
                          <li key={a.key} className="text-xs text-[color:var(--muted-foreground)]">
                            {a.key.replace("_name_", "Necklace ")}: {a.value}
                          </li>
                        ))}
                    </ul>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-[color:var(--muted-foreground)]">Qty {line.quantity}</span>
                      <span className="tabular-nums">${(line.unitPrice * line.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => cart.remove(line.id)}
                    disabled={isLoading}
                    aria-label="Remove"
                    className="self-start p-1 text-[color:var(--muted-foreground)] hover:text-[color:var(--charcoal)]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center justify-between">
              <span className="caps-label text-[color:var(--muted-foreground)]">Subtotal</span>
              <span className="font-display text-2xl tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => cart.checkout()}
              disabled={isLoading || !checkoutUrl}
              className="btn-primary mt-6 w-full gap-2"
            >
              Checkout <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <p className="mt-4 text-center text-[11px] text-[color:var(--muted-foreground)]">
              Package protection can be added at checkout · 30-day guarantee
            </p>
          </>
        )}
      </div>
    </section>
  );
}
