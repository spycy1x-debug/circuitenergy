import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X, ShieldCheck, Truck } from "lucide-react";
import { useCart, cart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Circuit Energy" }, { name: "description", content: "Review your Circuit supplements before checkout." }] }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, count } = useCart();
  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 7.99;
  const total = subtotal + shipping;

  return (
    <section className="container-x py-16">
      <h1 className="text-3xl md:text-5xl">Your Cart</h1>
      {count === 0 ? (
        <div className="mt-12 text-center bg-secondary rounded-2xl p-16">
          <p className="text-lg text-body">Your cart is empty.</p>
          <Link to="/shop" className="btn-primary mt-6">Shop Circuit</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr] items-start">
          <div className="space-y-4">
            {items.map(it => (
              <div key={it.id} className="rounded-xl border border-border p-5 flex gap-5 items-center">
                <div className="h-24 w-24 bg-secondary rounded-lg flex items-center justify-center shrink-0">
                  <img src={it.image} alt={it.name} className="max-h-20 object-contain"/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-semibold text-ink">{it.name}</div>
                  <div className="mt-1 text-sm text-muted-foreground">${it.price.toFixed(2)} each</div>
                  <div className="mt-3 inline-flex items-center border border-border rounded-md">
                    <button aria-label="Decrease" onClick={()=>cart.setQty(it.id, it.qty-1)} className="h-9 w-9 flex items-center justify-center hover:bg-secondary"><Minus className="h-3.5 w-3.5"/></button>
                    <span className="w-10 text-center text-sm font-semibold">{it.qty}</span>
                    <button aria-label="Increase" onClick={()=>cart.setQty(it.id, it.qty+1)} className="h-9 w-9 flex items-center justify-center hover:bg-secondary"><Plus className="h-3.5 w-3.5"/></button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display font-bold text-ink">${(it.price*it.qty).toFixed(2)}</div>
                  <button onClick={()=>cart.remove(it.id)} aria-label="Remove" className="mt-2 text-muted-foreground hover:text-destructive"><X className="h-4 w-4"/></button>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-border p-6 bg-secondary">
            <h2 className="text-xl">Order Summary</h2>
            <div className="mt-5 space-y-3 text-sm">
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`}/>
              <Row label={shipping===0?"Shipping (Free)":"Shipping"} value={shipping===0?"FREE":`$${shipping.toFixed(2)}`}/>
              {subtotal>0 && subtotal<75 && <p className="text-xs text-muted-foreground">Add ${(75-subtotal).toFixed(2)} more for free shipping.</p>}
              <div className="border-t border-border pt-3 flex justify-between text-base font-display font-bold text-ink">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button onClick={()=>alert("Checkout flow coming soon!")} className="btn-primary w-full mt-6">Checkout</button>
            <div className="mt-5 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-success"/>60-day money-back guarantee</div>
              <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary"/>Free shipping over $75</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Row({label,value}:{label:string;value:string}){
  return <div className="flex justify-between text-body"><span>{label}</span><span className="font-semibold text-ink">{value}</span></div>;
}
