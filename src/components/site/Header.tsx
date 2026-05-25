import { Link } from "@tanstack/react-router";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import logoImg from "@/assets/logo.png";

function Logo() {
  return (
    <Link to="/" className="flex items-center" aria-label="Circuit Energy home">
      <img src={logoImg} alt="Circuit" className="h-12 md:h-16 w-auto object-contain mix-blend-multiply" />
    </Link>
  );
}

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
      {/* Accent gradient stripe */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[2px] opacity-80"
        style={{ background: "var(--gradient-energy)" }}
      />
      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-12 left-1/3 h-32 w-[420px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, var(--energy), transparent 65%)" }}
      />
      <div className="container-x relative flex h-16 items-center justify-between">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-ink/75">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="relative py-1 hover:text-ink transition-colors [&.active]:text-ink group"
              >
                {l.label}
                <span
                  aria-hidden
                  className="absolute left-0 right-0 -bottom-0.5 h-[2px] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                  style={{ background: "var(--gradient-energy)" }}
                />
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2 text-ink/80">
          <button aria-label="Search" className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/5 hover:text-ink transition-colors"><Search className="h-[18px] w-[18px]" /></button>
          <button aria-label="Account" className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/5 hover:text-ink transition-colors"><User className="h-[18px] w-[18px]" /></button>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 ring-1 ring-ink/10 bg-white/60 hover:bg-white hover:ring-ink/20 hover:text-ink transition-all shadow-sm"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            <span className="text-sm font-semibold">({count})</span>
          </Link>
          <button aria-label="Menu" className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-ink/5" onClick={() => setOpen((o) => !o)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden border-t border-border bg-white px-5 py-4 flex flex-col gap-3 text-sm font-medium">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-1.5">{l.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
