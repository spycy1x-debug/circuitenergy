import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-[#4A2E5A] text-[#F5E9EE]">
      <div className="container-x py-20">
        <div className="grid gap-14 md:grid-cols-3">
          <div>
            <div className="font-display text-4xl md:text-5xl text-[#FAF6F0] tracking-wide">Seralie</div>
            <p className="mt-5 font-display italic text-lg text-[#FAF6F0]">Beauty, down to your smile.</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="caps-label text-[#EAD9DF] col-span-2 mb-2">Explore</div>
            <Link to="/" className="py-1.5 hover:text-white transition-colors">Home</Link>
            <Link to="/strips" className="py-1.5 hover:text-white transition-colors">Whitening Strips</Link>
            <Link to="/shop" className="py-1.5 hover:text-white transition-colors">Shop</Link>
            <Link to="/contact" className="py-1.5 hover:text-white transition-colors">Contact</Link>
            <Link to="/privacy" className="py-1.5 hover:text-white transition-colors">Privacy</Link>
            <a
              href="https://crystal-arithmetic-b9d.notion.site/Return-Refund-Policy-3820dd83dbc080bfb93ac8dd79b1d27d?pvs=73"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1.5 hover:text-white transition-colors"
            >
              Returns
            </a>
          </div>

          <div className="text-sm space-y-2.5">
            <div className="caps-label text-[#EAD9DF] mb-2">The Seralie Standard</div>
            <a href="mailto:support@seralie.com" className="block hover:text-white transition-colors">support@seralie.com</a>
            <div>30-Day Money-Back Guarantee</div>
            <div>Peroxide-Free · Gentle on Enamel</div>
            <div>Non-Toxic Ingredients</div>
            <div>Free U.S. Shipping Over $50</div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#EAD9DF]/25 text-[11px] text-[#D9C9D4] leading-relaxed">
          <p className="italic font-display text-sm text-[#FAF6F0] mb-3">
            Seralie strips deliver cosmetic color-correction. Brightening effects are temporary —
            like all good makeup — and individual results vary.
          </p>
          © {new Date().getFullYear()} Seralie. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
