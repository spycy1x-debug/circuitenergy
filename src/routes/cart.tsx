import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Repeat, X } from "lucide-react";
import { cart, useCart } from "@/lib/shopify-cart";
import { TrustRow } from "@/components/site/TrustRow";
import { PATCH_TIERS as TIERS } from "@/lib/patch-config";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Seralie" },
      { name: "description", content: "Review your Seralie LED pimple patch order before checkout." },
      { property: "og:title", content: "Your Cart — Seralie" },
      { property: "og:description", content: "Review your Seralie LED pimple patch order before checkout." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://seralie.com/cart" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://seralie.com/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { allLines, lines, subtotal, isLoading, checkoutUrl } = useCart();

  const ids = lines.map((l) => String(l.variantId).split("/").pop());
  const currentIdx = TIERS.findIndex((t) => ids.includes(t.variantId));
  const upsell = currentIdx > -1 && currentIdx < TIERS.length - 1 ? TIERS[currentIdx + 1]! : null;

  return (
    <section className="container-x py-14 md:py-20">
      <h1 className="font-display text-4xl md:text-5xl">Your cart</h1>

      {allLines.length === 0 ? (
        <div className="mt-10 border border-[color:var(--border)] bg-white px-6 py-16 text-center">
          <p className="text-sm text-[color:var(--muted-foreground)]">Your cart is empty.</p>
          <Link to="/patches" className="btn-primary mt-8">
            Shop patches
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <ul className="divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
            {allLines.map((line) => (
              <li key={line.id} className="flex gap-4 py-6">
                <div className="h-24 w-24 shrink-0 overflow-hidden border border-[color:var(--border)] bg-white">
                  {line.image && (
                    <img src={line.image} alt={line.title} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-xl text-[color:var(--navy)]">{line.title}</div>
                  {line.subtitle && (
                    <div className="mt-1 text-xs text-[color:var(--muted-foreground)]">
                      {line.subtitle}
                    </div>
                  )}
                  {line.sellingPlanName && (
                    <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-[color:var(--taupe)]">
                      <Repeat className="h-3 w-3" strokeWidth={1.6} />
                      {line.sellingPlanName}
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
                  aria-label="Remove"
                  className="self-start p-1 text-[color:var(--taupe)] hover:text-[color:var(--navy)]"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>

          <aside>
            {upsell && (
              <div className="mb-6 border border-[color:var(--border)] bg-white p-5">
                <div className="eyebrow">Better value</div>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted-foreground)]">
                  Move up to <span className="text-[color:var(--navy)]">{upsell.label}</span> and get more patches
                  for less.
                </p>
                <Link to="/patches" className="btn-outline mt-4 w-full">
                  See the offer
                </Link>
              </div>
            )}

            <div className="border border-[color:var(--border)] bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="caps-label text-[color:var(--taupe)]">Subtotal</span>
                <span className="font-display text-2xl tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={() => cart.checkout()}
                disabled={isLoading || !checkoutUrl}
                className="btn-primary mt-5 w-full gap-2"
              >
                Checkout <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <div className="mt-5">
                <TrustRow />
              </div>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
