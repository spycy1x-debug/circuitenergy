import { Link } from "@tanstack/react-router";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import logoImg from "@/assets/logo.png";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/why-tired", label: "Why You're Tired" },
    { to: "/contact", label: "Contact" },
  ] as const;

  return (
    <header
      className={`sticky top-0 z-40 transition-all backdrop-blur-md ${scrolled ? "shadow-md" : "shadow-sm"}`}
      style={{
        background:
          "linear-gradient(180deg, oklch(0.99 0.005 250 / 0.92) 0%, oklch(0.97 0.012 245 / 0.88) 100%)",
        borderBottom: "1px solid oklch(0.9 0.015 245)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[2px] opacity-80"
        style={{ background: "var(--gradient-energy)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-12 left-1/3 h-32 w-[420px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, var(--energy), transparent 65%)" }}
      />
      <div className="container-x relative grid h-20 grid-cols-3 items-center">
        {/* Left: menu */}
        <div className="flex items-center justify-start">
          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-ink/5 hover:text-ink transition-colors"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Center: logo */}
        <div className="flex items-center justify-center">
          <Link to="/" aria-label="Circuit Energy home" className="flex items-center">
            <img
              src={logoImg}
              alt="Circuit"
              className="h-14 sm:h-16 md:h-20 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Right: actions */}
        <div className="flex items-center justify-end gap-1.5 text-ink/80">
          <button
            aria-label="Search"
            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/5 hover:text-ink transition-colors"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <button
            aria-label="Account"
            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/5 hover:text-ink transition-colors"
          >
            <User className="h-[18px] w-[18px]" />
          </button>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 ring-1 ring-ink/10 bg-white/60 hover:bg-white hover:ring-ink/20 hover:text-ink transition-all shadow-sm"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            <span className="text-sm font-semibold">({count})</span>
          </Link>
        </div>
      </div>

      {/* Slide-down nav panel */}
      {open && (
        <nav
          className="border-t border-border bg-white/95 backdrop-blur-md px-5 py-4 flex flex-col gap-1 text-base font-medium"
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="py-2 px-2 rounded-md hover:bg-ink/5 [&.active]:text-ink text-ink/80"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 pt-3 mt-2 border-t border-border sm:hidden">
            <button aria-label="Search" className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/5">
              <Search className="h-[18px] w-[18px]" />
            </button>
            <button aria-label="Account" className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/5">
              <User className="h-[18px] w-[18px]" />
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
