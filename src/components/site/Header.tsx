import { Link, useNavigate } from "@tanstack/react-router";
import { Search, User, ShoppingBag, Menu, X, ArrowUpRight, Mail, Home as HomeIcon, Sparkles } from "lucide-react";
import seralieLogo from "@/assets/seralie-wordmark.webp.asset.json";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { shopifyCart, useShopifyCart } from "@/lib/shopify-cart";

type SearchItem = { label: string; sub: string; to: string; params?: Record<string, string> };

const SEARCH_INDEX: SearchItem[] = [
  { label: "Home", sub: "Seralie home", to: "/" },
  { label: "Shop", sub: "Whitening Strips", to: "/strips" },
  { label: "Whitening Strips", sub: "Purple color-correcting — camera-ready in 30 minutes", to: "/strips" },
  { label: "Contact", sub: "Speak with our team", to: "/contact" },
  { label: "Cart", sub: "Review your bag", to: "/cart" },
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
        className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "shadow-[0_1px_0_rgba(91,58,110,0.2)]" : ""} ${hidden ? "-translate-y-full" : "translate-y-0"}`}
        style={{ background: scrolled ? "rgba(250,246,240,0.96)" : "#FAF6F0", backdropFilter: scrolled ? "blur(8px)" : undefined, borderBottom: "1px solid rgba(91,58,110,0.15)" }}
      >
        <div className="container-x relative grid h-20 md:h-24 grid-cols-3 items-center">
          <div className="flex items-center justify-start gap-4">
            <button
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-10 w-10 items-center justify-center text-[#2E2528] hover:text-[#5B3A6E] transition-colors"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link to="/strips" className="hidden md:inline-block caps-label text-[#2E2528] hover:text-[#5B3A6E] transition-colors">Shop</Link>
          </div>

          <div className="flex items-center justify-center">
            <Link to="/" aria-label="Seralie home" className="flex items-center justify-center">
              <img src={seralieLogo.url} alt="Seralie" className="h-20 md:h-24 w-auto" style={{ mixBlendMode: "multiply" }} />
            </Link>
          </div>


          <div className="flex items-center justify-end gap-2 text-[#2E2528]">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="hidden sm:inline-flex h-10 w-10 items-center justify-center hover:text-[#5B3A6E] transition-colors"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link
              to="/account"
              aria-label="Account"
              className="hidden sm:inline-flex h-10 w-10 items-center justify-center hover:text-[#5B3A6E] transition-colors"
            >
              <User className="h-[18px] w-[18px]" />
            </Link>
            <button
              type="button"
              onClick={() => shopifyCart.open()}
              aria-label="Open cart"
              className={`relative inline-flex items-center gap-2 px-3 py-2 hover:text-[#5B3A6E] transition-colors ${pulse ? "cart-bump" : ""}`}
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              <span className="caps-label tabular-nums">({totalCount})</span>
              {pulse && (
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#5B3A6E] ring-2 ring-[#FAF6F0] animate-ping" />
              )}
            </button>
          </div>
        </div>

        {open && (
          <>
            <div
              className="fixed inset-0 top-20 md:top-24 z-30 bg-[#2E2528]/25"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <nav className="relative z-40 bg-[#FAF6F0] border-t border-[#E4D5DC]">
              <div className="container-x py-14 grid gap-14 md:grid-cols-[1.2fr_1fr]">
                <div>
                  <div className="eyebrow">Navigate</div>
                  <ul className="mt-6 divide-y divide-[#E4D5DC] border-y border-[#E4D5DC]">
                    {[
                      { to: "/", label: "Home", desc: "Return to the beginning", Icon: HomeIcon },
                      { to: "/strips", label: "Shop", desc: "Whitening Strips", Icon: Sparkles },
                      { to: "/contact", label: "Contact", desc: "Talk to our team", Icon: Mail },
                    ].map(({ to, label, desc, Icon }) => (
                      <li key={to}>
                        <Link
                          to={to}
                          onClick={() => setOpen(false)}
                          className="group flex items-center gap-5 py-5 hover:bg-[#F5E9EE] -mx-3 px-3 transition-colors"
                        >
                          <Icon className="h-4 w-4 text-[#5B3A6E]" />
                          <span className="flex-1">
                            <span className="block font-display text-3xl md:text-4xl leading-tight text-[#2E2528]">{label}</span>
                            <span className="block text-xs text-[#6B5D62] mt-1 tracking-wide">{desc}</span>
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-[#5B3A6E] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="eyebrow">Featured</div>
                  <Link
                    to="/strips"
                    onClick={() => setOpen(false)}
                    className="mt-6 group block bg-[#F5E9EE] p-8 border border-[#E4D5DC] hover:border-[#5B3A6E] transition-colors"
                  >
                    <div className="eyebrow text-[#5B3A6E]">Makeup For Your Teeth</div>
                    <h3 className="mt-3 font-display text-3xl text-[#2E2528]">Whitening Strips</h3>
                    <p className="mt-3 text-sm text-[#5A4A52] leading-relaxed">
                      Purple color-correcting whitening strips. Instantly brighter, whiter over time — camera-ready in 30 minutes.
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 caps-label text-[#5B3A6E] group-hover:gap-3 transition-all">
                      Shop Now <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </Link>
                  <div className="mt-6 text-[11px] text-[#6B5D62] tracking-wide">
                    Complimentary shipping over $40 · 30-day guarantee
                  </div>
                </div>
              </div>
            </nav>
          </>
        )}
      </header>

      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-24 md:pt-32 bg-[#2E2528]/40 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-[#FAF6F0] shadow-2xl border border-[#E4D5DC]"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={(e) => { e.preventDefault(); goToFirst(); }}
              className="flex items-center gap-3 px-5 py-4 border-b border-[#E4D5DC]"
            >
              <Search className="h-5 w-5 text-[#5B3A6E]" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search Seralie…"
                className="flex-1 bg-transparent outline-none text-base placeholder:text-[#6B5D62] text-[#2E2528]"
              />
              <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)} className="text-[#6B5D62] hover:text-[#2E2528]">
                <X className="h-5 w-5" />
              </button>
            </form>
            <ul className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 && <li className="px-5 py-6 text-sm text-[#6B5D62]">No results for "{q}".</li>}
              {filtered.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    params={item.params as never}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-[#F5E9EE]"
                  >
                    <div>
                      <div className="text-sm font-medium text-[#2E2528]">{item.label}</div>
                      <div className="text-xs text-[#6B5D62]">{item.sub}</div>
                    </div>
                    <span className="text-xs text-[#5B3A6E]">↵</span>
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
