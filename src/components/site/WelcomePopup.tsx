import { useState, useEffect } from "react";
import { X, Mail } from "lucide-react";

declare global {
  interface Window {
    _klOnsite?: unknown[];
  }
}

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

  const openKlaviyoForm = () => {
    window._klOnsite = window._klOnsite || [];
    window._klOnsite.push(["openForm", "SqNmXt"]);
    close();
  };

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
      {/* Overlay with blur */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Card */}
      <div
        className={`relative w-full max-w-[380px] overflow-hidden rounded-2xl bg-[#101014] shadow-[0_30px_80px_-20px_rgba(245,133,63,0.45)] ring-1 ring-white/10 transition-all duration-500 ${
          mounted
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-8 scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glowing accent */}
        <div className="relative h-1.5 w-full bg-gradient-to-r from-[#F5853F] via-[#ff9f6e] to-[#F5853F]">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>

        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#F5853F]/25 blur-3xl" />

        {/* Close button */}
        <button
          onClick={close}
          className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X size={14} strokeWidth={2.5} />
        </button>

        {/* Content */}
        <div className="relative flex flex-col items-center px-7 pb-7 pt-8 text-center">
          {/* Icon badge */}
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#F5853F] to-[#c75e28] shadow-lg shadow-[#F5853F]/40">
            <Mail className="h-7 w-7 text-white" strokeWidth={2.2} />
          </div>

          {/* Eyebrow */}
          <span className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#ffb384]">
            Join the List
          </span>

          <h3 className="text-2xl font-bold leading-tight text-white">
            Unlock Exclusive Perks
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            Get early access to new formulas, member-only discounts, and
            science-backed energy tips.
          </p>

          <button
            onClick={openKlaviyoForm}
            className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-b from-[#ff9a65] to-[#e07030] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-[#F5853F]/30 transition-all hover:shadow-[#F5853F]/50 hover:brightness-110 active:scale-[0.98]"
          >
            Sign Up Free →
          </button>

          <button
            onClick={close}
            className="mt-3 text-[11px] text-gray-500 transition-colors hover:text-gray-300"
          >
            No thanks, I’ll miss out
          </button>
        </div>
      </div>
    </div>
  );
}
