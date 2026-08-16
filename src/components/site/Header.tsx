import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { cart, useCart } from "@/lib/shopify-cart";

const NAV = [
  { to: "/patches", label: "Shop" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];


export function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--ivory)]/95 backdrop-blur">
      <div className="container-x relative flex h-16 items-center justify-between md:h-20">
        <button
          className="-ml-2 p-2 text-[color:var(--navy)] md:hidden"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="caps-label text-[color:var(--taupe)] transition-colors hover:text-[color:var(--navy)]"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/"
          className="wordmark text-xl md:absolute md:left-1/2 md:-translate-x-1/2 md:text-2xl"
        >
          SERALIE
        </Link>

        <button
          onClick={() => cart.open()}
          aria-label="Open cart"
          className="relative -mr-2 p-2 text-[color:var(--navy)]"
        >
          <ShoppingBag className="h-5 w-5" strokeWidth={1.4} />
          {count > 0 && (
            <span className="absolute -right-0.5 -top-0.5 h-4 min-w-4 rounded-full bg-[color:var(--navy)] px-1 text-center text-[10px] leading-4 text-[color:var(--ivory)]">
              {count}
            </span>
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-[color:var(--border)] bg-[color:var(--ivory)] md:hidden">
          <nav className="container-x flex flex-col gap-5 py-5">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="caps-label text-[color:var(--navy)]"
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
