import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--bone)]">
      <div className="container-x py-16 md:py-20 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="font-display text-2xl tracking-[0.28em] text-[color:var(--charcoal)]">SERALIE</div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-[color:var(--muted-foreground)]">
            Fine jewellery made from the ones you love. Each piece is engraved to order and shown to you as a
            digital proof before we begin.
          </p>
        </div>

        <div>
          <div className="eyebrow">Shop</div>
          <ul className="mt-5 space-y-3 text-sm text-[color:var(--muted-foreground)]">
            <li><Link to="/necklace" className="hover:text-[color:var(--charcoal)]">Photo Necklace</Link></li>
            <li><Link to="/shop" className="hover:text-[color:var(--charcoal)]">All pieces</Link></li>
            <li><Link to="/cart" className="hover:text-[color:var(--charcoal)]">Your bag</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow">Care</div>
          <ul className="mt-5 space-y-3 text-sm text-[color:var(--muted-foreground)]">
            <li><Link to="/contact" className="hover:text-[color:var(--charcoal)]">Contact</Link></li>
            <li><Link to="/account" className="hover:text-[color:var(--charcoal)]">Account</Link></li>
            <li><Link to="/privacy" className="hover:text-[color:var(--charcoal)]">Privacy</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[color:var(--border)]">
        <div className="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] tracking-wide text-[color:var(--muted-foreground)]">
            © {new Date().getFullYear()} Seralie. All rights reserved.
          </p>
          <p className="text-[11px] tracking-wide text-[color:var(--muted-foreground)]">
            30-day guarantee · support@seralie.com
          </p>
        </div>
      </div>
    </footer>
  );
}
