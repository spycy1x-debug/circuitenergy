import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X, ShieldCheck, Truck, Lock, ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { useCart, cart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Circuit Energy" },
      { name: "description", content: "Review your Circuit supplements before checkout." },
    ],
  }),
  component: CartPage,
});

const serif = { fontFamily: '"Instrument Serif", Georgia, serif' };

function CartPage() {
  const { items, subtotal, count } = useCart();
  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 7.99;
  const total = subtotal + shipping;
  const progress = Math.min(100, (subtotal / 75) * 100);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[oklch(0.15_0.03_245)] text-white">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at 15% 20%, oklch(0.55 0.18 290 / 0.55), transparent 55%), radial-gradient(ellipse at 90% 80%, oklch(0.6 0.18 55 / 0.5), transparent 50%), linear-gradient(135deg, oklch(0.18 0.05 250), oklch(0.12 0.04 245))",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0 / 0.6) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="container-x py-16 md:py-20 max-w-3xl text-center mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur">
            <ShoppingBag className="h-3 w-3" />
            {count === 0 ? "Empty Cart" : `${count} ${count === 1 ? "item" : "items"}`}
          </span>
          <h1 className="mt-6 text-5xl md:text-7xl leading-[0.95] text-white">
            Your{" "}
            <em style={serif} className="italic font-normal text-[oklch(0.85_0.15_70)]">
              Cart
            </em>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-white/80">
            {count === 0 ? (
              <>
                A blank slate. Let's build your{" "}
                <em style={serif} className="italic text-white">
                  stack
                </em>
                .
              </>
            ) : (
              <>
                One step closer to feeling like{" "}
                <em style={serif} className="italic text-white">
                  yourself
                </em>{" "}
                again.
              </>
            )}
          </p>
        </div>
      </section>

      <section className="container-x py-12 md:py-16">
        {count === 0 ? (
          <div className="mx-auto max-w-2xl">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-md p-10 md:p-14 text-center">
              <div
                aria-hidden
                className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-50"
                style={{ background: "oklch(0.96 0.06 70)" }}
              />
              <div
                aria-hidden
                className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full blur-3xl opacity-40"
                style={{ background: "oklch(0.96 0.04 290)" }}
              />
              <div className="relative">
                <div className="mx-auto h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                  <ShoppingBag className="h-7 w-7 text-ink" />
                </div>
                <h2 className="mt-6 text-3xl md:text-4xl">
                  Your cart is{" "}
                  <em style={serif} className="italic font-normal">
                    empty
                  </em>
                </h2>
                <p className="mt-3 text-body max-w-md mx-auto">
                  Two formulas. Real results. Start with the stack that fixes brain fog and afternoon crashes.
                </p>
                <Link to="/shop" className="btn-primary mt-8 group">
                  Shop Circuit
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-success" />
                    30-day guarantee
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5 text-primary" />
                    Free shipping over $75
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-ink" />
                    Clean ingredients
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] items-start">
            {/* ITEMS */}
            <div className="space-y-4">
              {/* Free shipping progress */}
              {subtotal < 75 && (
                <div className="rounded-2xl border border-border bg-secondary/60 p-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-ink inline-flex items-center gap-2">
                      <Truck className="h-4 w-4 text-primary" />${(75 - subtotal).toFixed(2)} away from free shipping
                    </span>
                    <span className="text-muted-foreground">${subtotal.toFixed(2)} / $75</span>
                  </div>
                  <div className="mt-3 h-2 w-full rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${progress}%`,
                        background: "linear-gradient(90deg, oklch(0.65 0.17 290), oklch(0.75 0.18 55))",
                      }}
                    />
                  </div>
                </div>
              )}

              {items.map((it) => (
                <div
                  key={it.id}
                  className="group relative rounded-2xl border border-border bg-white p-5 flex gap-5 items-center transition-shadow hover:shadow-md"
                >
                  <div
                    className="h-28 w-28 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
                    style={{
                      background: "linear-gradient(160deg, oklch(0.98 0.02 290), white)",
                      boxShadow: "inset 0 0 0 1px oklch(0.65 0.17 290 / 0.2)",
                    }}
                  >
                    <img
                      src={it.image}
                      alt={it.name}
                      className="max-h-24 object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-ink text-lg">{it.name}</div>
                    <div className="mt-1 text-sm text-muted-foreground">${it.price.toFixed(2)} each</div>
                    <div className="mt-3 inline-flex items-center border border-border rounded-md bg-white">
                      <button
                        aria-label="Decrease"
                        onClick={() => cart.setQty(it.id, it.qty - 1)}
                        className="h-9 w-9 flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold">{it.qty}</span>
                      <button
                        aria-label="Increase"
                        onClick={() => cart.setQty(it.id, it.qty + 1)}
                        className="h-9 w-9 flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-bold text-ink text-lg">${(it.price * it.qty).toFixed(2)}</div>
                    <button
                      onClick={() => cart.remove(it.id)}
                      aria-label="Remove"
                      className="mt-2 inline-flex items-center justify-center h-8 w-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-secondary transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              <Link to="/shop" className="inline-flex items-center text-sm font-semibold text-ink hover:underline mt-2">
                ← Continue shopping
              </Link>
            </div>

            {/* SUMMARY */}
            <div className="lg:sticky lg:top-24">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-md p-6">
                <div
                  aria-hidden
                  className="absolute -top-20 -right-20 h-48 w-48 rounded-full blur-3xl opacity-50"
                  style={{ background: "oklch(0.96 0.06 70)" }}
                />
                <div className="relative">
                  <h2 className="text-2xl">
                    Order{" "}
                    <em style={serif} className="italic font-normal">
                      Summary
                    </em>
                  </h2>
                  <div className="mt-5 space-y-3 text-sm">
                    <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                    <Row
                      label={shipping === 0 ? "Shipping" : "Shipping"}
                      value={shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    />
                    <div className="border-t border-border pt-3 flex justify-between text-lg font-display font-bold text-ink">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <button onClick={() => alert("Checkout flow coming soon!")} className="btn-primary w-full mt-6 group">
                    <Lock className="mr-2 h-4 w-4" />
                    Secure Checkout
                  </button>
                  <div className="mt-5 space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-success" />
                      30-day money-back guarantee
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-primary" />
                      Free shipping over $75
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-ink" />
                      SSL encrypted checkout
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-body">
      <span>{label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </div>
  );
}
