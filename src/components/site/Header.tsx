import { Link, useNavigate } from "@tanstack/react-router";
import { Search, User, ShoppingBag, Menu, X, ArrowUpRight, Sparkles, Zap, BookOpen, Mail, Home as HomeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import logoImg from "@/assets/logo.png";

type SearchItem = { label: string; sub: string; to: string; params?: Record<string, string> };

const SEARCH_INDEX: SearchItem[] = [
  { label: "Home", sub: "Circuit Energy home page", to: "/" },
  { label: "Shop", sub: "All Circuit supplements", to: "/shop" },
  { label: "Circuit Neural Performance", sub: "Focus & cognitive enhancement", to: "/product/$slug", params: { slug: "neural-performance" } },
  { label: "Circuit NMN", sub: "Cellular energy & longevity", to: "/product/$slug", params: { slug: "nmn" } },
  { label: "Why You're Tired", sub: "The science behind the slump", to: "/why-tired" },
  { label: "Contact", sub: "Get in touch with the team", to: "/contact" },
  { label: "Cart", sub: "Review your order", to: "/cart" },
  { label: "Account", sub: "Sign in or create account", to: "/account" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const { count } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!searchOpen) setQ("");
  }, [searchOpen]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/why-tired", label: "Why You're Tired" },
    { to: "/contact", label: "Contact" },
  ] as const;

  const filtered = q.trim()
    ? SEARCH_INDEX.filter((i) =>
        (i.label + " " + i.sub).toLowerCase().includes(q.toLowerCase())
      )
    : SEARCH_INDEX;

  const goToFirst = () => {
    const first = filtered[0];
    if (!first) return;
    setSearchOpen(false);
    navigate({ to: first.to, params: first.params as never });
  };

  return (
    <>
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
        <div className="container-x relative grid h-24 md:h-28 grid-cols-3 items-center">
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

          <div className="flex items-center justify-center">
            <Link to="/" aria-label="Circuit Energy home" className="flex items-center">
              <img
                src={logoImg}
                alt="Circuit"
                className="h-28 sm:h-32 md:h-40 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="flex items-center justify-end gap-1.5 text-ink/80">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/5 hover:text-ink transition-colors"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link
              to="/account"
              aria-label="Account"
              className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/5 hover:text-ink transition-colors"
            >
              <User className="h-[18px] w-[18px]" />
            </Link>
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

        {open && (
          <nav className="border-t border-border bg-white/95 backdrop-blur-md px-5 py-4 flex flex-col gap-1 text-base font-medium">
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
              <button
                aria-label="Search"
                onClick={() => {
                  setOpen(false);
                  setSearchOpen(true);
                }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/5"
              >
                <Search className="h-[18px] w-[18px]" />
              </button>
              <Link
                to="/account"
                aria-label="Account"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/5"
              >
                <User className="h-[18px] w-[18px]" />
              </Link>
            </div>
          </nav>
        )}
      </header>

      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-24 md:pt-32 bg-ink/40 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-white shadow-2xl ring-1 ring-ink/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                goToFirst();
              }}
              className="flex items-center gap-3 px-4 py-3 border-b border-border"
            >
              <Search className="h-5 w-5 text-ink/50" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products and pages…"
                className="flex-1 bg-transparent outline-none text-base placeholder:text-ink/40"
              />
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
                className="text-ink/50 hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </form>
            <ul className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 && (
                <li className="px-4 py-6 text-sm text-ink/60">No results for "{q}".</li>
              )}
              {filtered.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    params={item.params as never}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-ink/5"
                  >
                    <div>
                      <div className="text-sm font-semibold text-ink">{item.label}</div>
                      <div className="text-xs text-ink/55">{item.sub}</div>
                    </div>
                    <span className="text-xs text-ink/40">↵</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
