import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Music2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#CCCCCC]">
      <div className="container-x py-16 grid gap-10 md:grid-cols-3">
        <div>
          <div className="text-white font-display font-bold text-xl tracking-tight">CIRCUIT</div>
          <p className="mt-3 text-sm text-[#999]">You're Not Tired. Your Cells Are.</p>
          <div className="mt-5 flex gap-4">
            <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram className="h-5 w-5" /></a>
            <a href="#" aria-label="TikTok" className="hover:text-white"><Music2 className="h-5 w-5" /></a>
            <a href="#" aria-label="Facebook" className="hover:text-white"><Facebook className="h-5 w-5" /></a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Link to="/shop" className="py-1 hover:text-white">Shop</Link>
          <Link to="/why-tired" className="py-1 hover:text-white">Why You're Tired</Link>
          <Link to="/contact" className="py-1 hover:text-white">Contact</Link>
          <Link to="/shipping" className="py-1 hover:text-white">Shipping & Returns</Link>
          <Link to="/privacy" className="py-1 hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="py-1 hover:text-white">Terms of Service</Link>
        </div>
        <div className="text-sm space-y-2">
          <a href="mailto:support.circuit@gmail.com" className="block hover:text-white">support.circuit@gmail.com</a>
          <div>60-Day Money-Back Guarantee</div>
          <div>Third-Party Lab Tested</div>
          <div>Made in the USA</div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 text-xs text-[#888] leading-relaxed">
          © 2026 Circuit Energy. All rights reserved. | These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </div>
      </div>
    </footer>
  );
}
