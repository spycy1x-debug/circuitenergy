import { Link } from "@tanstack/react-router";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import logoImg from "@/assets/logo.png";

function Logo() {
  return (
    <Link to="/" className="flex items-center" aria-label="Circuit Energy home">
      <img src={logoImg} alt="Circuit" className="h-12 md:h-16 w-auto object-contain" />
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
    <header className={`sticky top-0 z-40 bg-white transition-shadow ${scrolled ? "shadow-sm" : ""}`}>
      <div className="container-x flex h-16 items-center justify-between">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-ink/80">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-ink transition-colors">{l.label}</Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4 text-ink/80">
          <button aria-label="Search" className="hidden md:inline-flex hover:text-ink"><Search className="h-5 w-5" /></button>
          <button aria-label="Account" className="hidden md:inline-flex hover:text-ink"><User className="h-5 w-5" /></button>
          <Link to="/cart" aria-label="Cart" className="relative inline-flex items-center gap-1.5 hover:text-ink">
            <ShoppingBag className="h-5 w-5" />
            <span className="text-sm font-medium">({count})</span>
          </Link>
          <button aria-label="Menu" className="md:hidden" onClick={() => setOpen((o) => !o)}>
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
