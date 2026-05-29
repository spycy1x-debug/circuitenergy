import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#CCCCCC]">
      <div className="container-x py-16 grid gap-10 md:grid-cols-3">
        <div>
          <div className="text-white font-display font-bold text-xl tracking-tight">CIRCUIT</div>
          <p className="mt-3 text-sm text-[#999]">You're Not Tired. Your Cells Are.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Link to="/shop" className="py-1 hover:text-white">Shop</Link>
          <Link to="/why-tired" className="py-1 hover:text-white">Why You're Tired</Link>
          <Link to="/contact" className="py-1 hover:text-white">Contact</Link>
          <Link to="/privacy" className="py-1 hover:text-white">Privacy Policy</Link>
        </div>
        <div className="text-sm space-y-2">
          <a href="mailto:support.circuit@gmail.com" className="block hover:text-white">support.circuit@gmail.com</a>
          <div>60-Day Money-Back Guarantee</div>
          <div>Made in the USA</div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 text-xs text-[#888] leading-relaxed space-y-2">
          <p>
            * These statements have not been evaluated by the Food and Drug Administration.
            Circuit products are dietary supplements and are not intended to diagnose, treat,
            cure, or prevent any disease. Individual results may vary. Consult your healthcare
            provider before starting any new supplement, especially if you are pregnant,
            nursing, taking medication, or have a medical condition.
          </p>
          <p>© 2026 Circuit Energy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
