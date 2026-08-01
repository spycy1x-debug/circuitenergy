import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { cart, useCart } from "@/lib/shopify-cart";

const NAV = [
  { to: "/necklace", label: "The Necklace" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-[color:var(--bone)]/95 backdrop-blur border-b border-[color:var(--border)]">
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <button
          className="md:hidden -ml-2 p-2 text-[color:var(--charcoal)]"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <nav className="hidden md:flex items-center gap-9">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="caps-label text-[color:var(--muted-foreground)] hover:text-[color:var(--charcoal)] transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/"
          className="font-display text-2xl md:text-[28px] tracking-[0.28em] text-[color:var(--charcoal)] md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          SERALIE
        </Link>

        <button
          onClick={() => cart.open()}
          aria-label="Open bag"
          className="relative p-2 -mr-2 text-[color:var(--charcoal)]"
        >
          <ShoppingBag className="h-5 w-5" strokeWidth={1.4} />
          {count > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-[color:var(--gold)] text-[10px] leading-4 text-white text-center">
              {count}
            </span>
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[color:var(--border)] bg-[color:var(--bone)]">
          <nav className="container-x py-5 flex flex-col gap-5">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="caps-label text-[color:var(--charcoal)]"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
