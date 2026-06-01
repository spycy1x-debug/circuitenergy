import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";

export function WelcomePopup() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("welcomePopupDismissed");
    if (!dismissed) {
      const timer = setTimeout(() => {
        setVisible(true);
        requestAnimationFrame(() => setMounted(true));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => {
    setMounted(false);
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("welcomePopupDismissed", "1");
    }, 300);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      onClick={close}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          mounted ? "opacity-60" : "opacity-0"
        }`}
      />

      {/* Card */}
      <div
        className={`relative w-full max-w-[340px] overflow-hidden rounded-xl bg-[#1A1A1A] shadow-2xl transition-all duration-300 ${
          mounted
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-6 scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Red top accent bar */}
        <div className="h-1 w-full bg-[#DC3545]" />

        {/* Close button */}
        <button
          onClick={close}
          className="absolute right-3 top-3 text-gray-400 transition-colors hover:text-gray-200"
          aria-label="Close"
        >
          <X size={16} strokeWidth={2.5} />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center px-6 pb-6 pt-5 text-center">
          <span className="mb-2 text-xl">⚡</span>

          <h3 className="text-lg font-bold text-white">Welcome Gift</h3>

          <p className="mt-1 text-sm leading-relaxed text-gray-400">
            Get 30% off Neural Performance — today only
          </p>

          <Link
            to="/product/neural-performance"
            onClick={close}
            className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-[#DC3545] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#c02a3a] hover:shadow-lg active:scale-[0.98]"
          >
            Claim Now
          </Link>
        </div>
      </div>
    </div>
  );
}
