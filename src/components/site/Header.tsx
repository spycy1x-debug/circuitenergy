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
        <div className="container-x relative grid h-28 md:h-36 grid-cols-3 items-center">
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
            <Link to="/" aria-label="Circuit Energy home" className="flex items-center justify-center">
              <img
                src={logoImg}
                alt="Circuit"
                className="block h-24 sm:h-28 md:h-32 w-auto object-contain"
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
          <>
            <div
              className="fixed inset-0 top-28 md:top-36 z-30 bg-ink/30 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <nav
              className="relative z-40 border-t border-border overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.16 0.04 245) 0%, oklch(0.12 0.04 245) 100%)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -left-20 h-72 w-[520px] rounded-full blur-3xl opacity-50"
                style={{ background: "radial-gradient(circle, oklch(0.55 0.18 290 / 0.6), transparent 60%)" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-[520px] rounded-full blur-3xl opacity-50"
                style={{ background: "radial-gradient(circle, oklch(0.6 0.18 55 / 0.5), transparent 60%)" }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(oklch(1 0 0 / 0.6) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.6) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              />

              <div className="container-x relative py-10 md:py-14 grid gap-10 md:grid-cols-[1.1fr_1fr]">
                {/* Left: Navigation */}
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/50 font-semibold">
                    Navigate
                  </div>
                  <ul className="mt-5 flex flex-col divide-y divide-white/10 border-y border-white/10">
                    {[
                      { to: "/", label: "Home", desc: "Back to the start", Icon: HomeIcon },
                      { to: "/shop", label: "Shop", desc: "Neural Performance & NMN", Icon: Sparkles },
                      { to: "/why-tired", label: "Why You're Tired", desc: "The science behind the slump", Icon: BookOpen },
                      { to: "/contact", label: "Contact", desc: "Talk to the Circuit team", Icon: Mail },
                    ].map(({ to, label, desc, Icon }) => (
                      <li key={to}>
                        <Link
                          to={to}
                          onClick={() => setOpen(false)}
                          className="group flex items-center gap-4 py-4 text-white hover:bg-white/5 transition-colors -mx-2 px-2 rounded-xl"
                        >
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/15 backdrop-blur group-hover:bg-white/10 transition-colors">
                            <Icon className="h-4 w-4 text-[oklch(0.85_0.15_70)]" />
                          </span>
                          <span className="flex-1">
                            <span
                              className="block text-2xl md:text-3xl leading-tight"
                              style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
                            >
                              {label}
                            </span>
                            <span className="block text-xs text-white/55 mt-0.5">{desc}</span>
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center gap-2 sm:hidden">
                    <button
                      onClick={() => {
                        setOpen(false);
                        setSearchOpen(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <Search className="h-4 w-4" /> Search
                    </button>
                    <Link
                      to="/account"
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <User className="h-4 w-4" /> Account
                    </Link>
                  </div>
                </div>

                {/* Right: Featured products */}
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/50 font-semibold">
                    Featured
                  </div>
                  <div className="mt-5 grid gap-3">
                    <Link
                      to="/product/$slug"
                      params={{ slug: "neural-performance" }}
                      onClick={() => setOpen(false)}
                      className="group relative overflow-hidden rounded-2xl p-5 ring-1 ring-white/15 bg-white/[0.04] hover:bg-white/[0.07] hover:ring-white/25 transition-all backdrop-blur"
                    >
                      <div
                        aria-hidden
                        className="absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl opacity-60"
                        style={{ background: "radial-gradient(circle, oklch(0.65 0.17 290 / 0.65), transparent 60%)" }}
                      />
                      <div className="relative flex items-start gap-3">
                        <Sparkles className="h-5 w-5 text-[oklch(0.85_0.12_290)]" />
                        <div className="flex-1">
                          <div className="text-white font-semibold">Circuit Neural Performance</div>
                          <div className="text-xs text-white/60 mt-1">Focus & cognitive enhancement — 10 natural compounds.</div>
                          <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white/90 group-hover:text-white">
                            Shop now <ArrowUpRight className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/product/$slug"
                      params={{ slug: "nmn" }}
                      onClick={() => setOpen(false)}
                      className="group relative overflow-hidden rounded-2xl p-5 ring-1 ring-white/15 bg-white/[0.04] hover:bg-white/[0.07] hover:ring-white/25 transition-all backdrop-blur"
                    >
                      <div
                        aria-hidden
                        className="absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl opacity-60"
                        style={{ background: "radial-gradient(circle, oklch(0.7 0.18 55 / 0.6), transparent 60%)" }}
                      />
                      <div className="relative flex items-start gap-3">
                        <Zap className="h-5 w-5 text-[oklch(0.85_0.15_70)]" />
                        <div className="flex-1">
                          <div className="text-white font-semibold">Circuit NMN</div>
                          <div className="text-xs text-white/60 mt-1">Cellular energy & longevity — 500mg NMN per serving.</div>
                          <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white/90 group-hover:text-white">
                            Shop now <ArrowUpRight className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="mt-5 flex items-center gap-3 text-[11px] text-white/55">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.75_0.2_55)] animate-pulse" />
                      Free shipping over $75
                    </span>
                    <span className="opacity-50">•</span>
                    <span>60-day guarantee</span>
                  </div>
                </div>
              </div>
            </nav>
          </>
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
