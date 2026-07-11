import { Link } from "@tanstack/react-router";
import seralieLogo from "@/assets/seralie-wordmark.webp.asset.json";

export function Footer() {
  return (
    <footer className="bg-[#3B2E25] text-[#EADFC7]">
      <div className="container-x py-20">
        <div className="grid gap-14 md:grid-cols-3">
          <div>
            <img src={seralieLogo.url} alt="Seralie" className="h-24 md:h-28 w-auto invert brightness-0 opacity-95" />
            <p className="mt-5 font-display italic text-lg text-[#F7EFDF]">Beauty & healthy aging, from within.</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="caps-label text-[#AD9752] col-span-2 mb-2">Explore</div>
            <Link to="/" className="py-1.5 hover:text-white transition-colors">Home</Link>
            <Link to="/shop" className="py-1.5 hover:text-white transition-colors">Shop</Link>
            <Link to="/product/$slug" params={{ slug: "nmn" }} className="py-1.5 hover:text-white transition-colors">Seralie NMN</Link>
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
            <div className="caps-label text-[#AD9752] mb-2">The Seralie Standard</div>
            <a href="mailto:support@seralie.com" className="block hover:text-white transition-colors">support@seralie.com</a>
            <div>30-Day Money-Back Guarantee</div>
            <div>Third-Party Lab Tested</div>
            <div>GMP-Certified US Manufacturing</div>
            <div>No Unnecessary Additives</div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#AD9752]/25 text-[11px] text-[#C9BFA3] leading-relaxed">
          <p className="italic font-display text-sm text-[#F7EFDF] mb-3">
            These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
          © {new Date().getFullYear()} Seralie. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
