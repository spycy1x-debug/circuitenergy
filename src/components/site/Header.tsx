import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag } from "lucide-react";
import { cart, useCart } from "@/lib/shopify-cart";

export function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--line)] bg-white/95 backdrop-blur">
      <div className="relative mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:h-16 md:px-8">
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 text-lg font-bold tracking-[0.24em] text-[#111111] md:text-xl"
        >
          SERALIE
        </Link>

        <span className="w-8" />

        <div className="ml-auto flex items-center gap-1">
          <Link
            to="/patches"
            aria-label="Search products"
            className="grid h-9 w-9 place-items-center text-[#111111]"
          >
            <Search className="h-5 w-5" strokeWidth={1.6} />
          </Link>
          <button
            onClick={() => cart.open()}
            aria-label="Open cart"
            className="relative grid h-9 w-9 place-items-center text-[#111111]"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.6} />
            {count > 0 && (
              <span className="absolute right-0 top-0 h-4 min-w-4 rounded-full bg-[color:var(--brand)] px-1 text-center text-[10px] leading-4 text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
