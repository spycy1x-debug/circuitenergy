import { Link, useNavigate } from "@tanstack/react-router";
import { Search, User, ShoppingBag, Menu, X, ArrowUpRight, Mail, Home as HomeIcon, Sparkles } from "lucide-react";
import seralieLogo from "@/assets/seralie-wordmark.webp.asset.json";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { shopifyCart, useShopifyCart } from "@/lib/shopify-cart";

type SearchItem = { label: string; sub: string; to: string; params?: Record<string, string> };

const SEARCH_INDEX: SearchItem[] = [
  { label: "Home", sub: "Seralie home", to: "/" },
  { label: "Shop", sub: "Seralie NMN", to: "/shop" },
  { label: "Seralie NMN", sub: "500mg β-NMN — the youth molecule", to: "/product/$slug", params: { slug: "nmn" } },
  { label: "Contact", sub: "Speak with our team", to: "/contact" },
  { label: "Cart", sub: "Review your ritual", to: "/cart" },
  { label: "Account", sub: "Sign in", to: "/account" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const { count } = useCart();
  const { count: shopifyCount, bump } = useShopifyCart();
  const totalCount = shopifyCount || count;
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    if (bump > 0) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 600);
      return () => clearTimeout(t);
    }
  }, [bump]);
  const navigate = useNavigate();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (!open && !searchOpen) {
        if (y > lastScrollY.current && y > 120) setHidden(true);
        else if (y < lastScrollY.current) setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open, searchOpen]);

  useEffect(() => { if (open || searchOpen) setHidden(false); }, [open, searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearchOpen((o) => !o); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => { if (!searchOpen) setQ(""); }, [searchOpen]);

  const filtered = q.trim()
    ? SEARCH_INDEX.filter((i) => (i.label + " " + i.sub).toLowerCase().includes(q.toLowerCase()))
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
        className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "shadow-[0_1px_0_rgba(173,151,82,0.2)]" : ""} ${hidden ? "-translate-y-full" : "translate-y-0"}`}
        style={{ background: scrolled ? "rgba(253,248,238,0.96)" : "#FDF8EE", backdropFilter: scrolled ? "blur(8px)" : undefined, borderBottom: "1px solid rgba(173,151,82,0.15)" }}
      >
        <div className="container-x relative grid h-16 md:h-20 grid-cols-3 items-center">
          <div className="flex items-center justify-start gap-4">
            <button
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-10 w-10 items-center justify-center text-[#3B2E25] hover:text-[#AD9752] transition-colors"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link to="/shop" className="hidden md:inline-block caps-label text-[#3B2E25] hover:text-[#AD9752] transition-colors">Shop</Link>
          </div>

          <div className="flex items-center justify-center">
            <Link to="/" aria-label="Seralie home" className="flex items-center justify-center">
              <img src={seralieLogo.url} alt="Seralie" className="h-20 md:h-24 w-auto" style={{ mixBlendMode: "multiply" }} />
            </Link>
          </div>


          <div className="flex items-center justify-end gap-2 text-[#3B2E25]">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="hidden sm:inline-flex h-10 w-10 items-center justify-center hover:text-[#AD9752] transition-colors"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link
              to="/account"
              aria-label="Account"
              className="hidden sm:inline-flex h-10 w-10 items-center justify-center hover:text-[#AD9752] transition-colors"
            >
              <User className="h-[18px] w-[18px]" />
            </Link>
            <button
              type="button"
              onClick={() => shopifyCart.open()}
              aria-label="Open cart"
              className={`relative inline-flex items-center gap-2 px-3 py-2 hover:text-[#AD9752] transition-colors ${pulse ? "cart-bump" : ""}`}
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              <span className="caps-label tabular-nums">({totalCount})</span>
              {pulse && (
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#AD9752] ring-2 ring-[#FDF8EE] animate-ping" />
              )}
            </button>
          </div>
        </div>

        {open && (
          <>
            <div
              className="fixed inset-0 top-16 md:top-20 z-30 bg-[#3B2E25]/25"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <nav className="relative z-40 bg-[#FDF8EE] border-t border-[#EADFC7]">
              <div className="container-x py-14 grid gap-14 md:grid-cols-[1.2fr_1fr]">
                <div>
                  <div className="eyebrow">Navigate</div>
                  <ul className="mt-6 divide-y divide-[#EADFC7] border-y border-[#EADFC7]">
                    {[
                      { to: "/", label: "Home", desc: "Return to the beginning", Icon: HomeIcon },
                      { to: "/shop", label: "Shop", desc: "Seralie NMN", Icon: Sparkles },
                      { to: "/contact", label: "Contact", desc: "Talk to our team", Icon: Mail },
                    ].map(({ to, label, desc, Icon }) => (
                      <li key={to}>
                        <Link
                          to={to}
                          onClick={() => setOpen(false)}
                          className="group flex items-center gap-5 py-5 hover:bg-[#F7EFDF] -mx-3 px-3 transition-colors"
                        >
                          <Icon className="h-4 w-4 text-[#AD9752]" />
                          <span className="flex-1">
                            <span className="block font-display text-3xl md:text-4xl leading-tight text-[#3B2E25]">{label}</span>
                            <span className="block text-xs text-[#7A6A5E] mt-1 tracking-wide">{desc}</span>
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-[#AD9752] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="eyebrow">Featured</div>
                  <Link
                    to="/product/$slug"
                    params={{ slug: "nmn" }}
                    onClick={() => setOpen(false)}
                    className="mt-6 group block bg-[#F7EFDF] p-8 border border-[#EADFC7] hover:border-[#AD9752] transition-colors"
                  >
                    <div className="eyebrow text-[#AD9752]">Beauty & Longevity</div>
                    <h3 className="mt-3 font-display text-3xl text-[#3B2E25]">Seralie NMN</h3>
                    <p className="mt-3 text-sm text-[#5A483C] leading-relaxed">
                      500 mg pure β-NMN. Replenish NAD+, support cellular renewal, and help skin stay radiant.
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 caps-label text-[#AD9752] group-hover:gap-3 transition-all">
                      Shop the ritual <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </Link>
                  <div className="mt-6 text-[11px] text-[#7A6A5E] tracking-wide">
                    Complimentary shipping over $50 · 30-day guarantee
                  </div>
                </div>
              </div>
            </nav>
          </>
        )}
      </header>

      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-24 md:pt-32 bg-[#3B2E25]/40 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-[#FDF8EE] shadow-2xl border border-[#EADFC7]"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={(e) => { e.preventDefault(); goToFirst(); }}
              className="flex items-center gap-3 px-5 py-4 border-b border-[#EADFC7]"
            >
              <Search className="h-5 w-5 text-[#AD9752]" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search Seralie…"
                className="flex-1 bg-transparent outline-none text-base placeholder:text-[#7A6A5E] text-[#3B2E25]"
              />
              <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)} className="text-[#7A6A5E] hover:text-[#3B2E25]">
                <X className="h-5 w-5" />
              </button>
            </form>
            <ul className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 && <li className="px-5 py-6 text-sm text-[#7A6A5E]">No results for "{q}".</li>}
              {filtered.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    params={item.params as never}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-[#F7EFDF]"
                  >
                    <div>
                      <div className="text-sm font-medium text-[#3B2E25]">{item.label}</div>
                      <div className="text-xs text-[#7A6A5E]">{item.sub}</div>
                    </div>
                    <span className="text-xs text-[#AD9752]">↵</span>
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
