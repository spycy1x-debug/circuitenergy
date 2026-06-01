import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const messages = [
  "30% OFF SITEWIDE",
  "FREE SHIPPING OVER $75",
  "60-DAY MONEY-BACK GUARANTEE",
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % messages.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#0a0a0d] text-white border-b border-white/5">
      {/* Ambient gradient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,53,69,0.22),transparent_65%)]" />
      {/* Shimmer sweep */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -inset-x-full top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent animate-[annShimmer_5s_linear_infinite]" />
      </div>
      <style>{`@keyframes annShimmer { 0% { transform: translateX(0); } 100% { transform: translateX(400%); } }`}</style>

      <div className="container-x relative py-2.5 flex items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
        {/* Anniversary badge */}
        <span className="relative hidden sm:flex h-6 items-center gap-1.5 rounded-md bg-gradient-to-br from-[#ff5a6e] to-[#a01a2a] px-2 shadow-[0_0_14px_rgba(220,53,69,0.55)]">
          <Sparkles className="h-3 w-3 text-white" strokeWidth={2.5} />
          <span className="font-bold uppercase tracking-[0.18em] text-white text-[10px]">
            Anniversary Sale
          </span>
        </span>

        <span className="hidden sm:inline h-3.5 w-px bg-white/15" />

        {/* Rotating message */}
        <span
          key={i}
          className="font-semibold uppercase tracking-[0.22em] text-white animate-in fade-in slide-in-from-bottom-1 duration-500"
        >
          <span className="sm:hidden mr-1.5">✦</span>
          {messages[i]}
        </span>
      </div>
    </div>
  );
}
