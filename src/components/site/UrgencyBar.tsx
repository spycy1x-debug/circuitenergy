import { useEffect, useState } from "react";
import { Sparkles, Clock } from "lucide-react";

const DURATION_MS = 15 * 60 * 1000;
const KEY = "urgencyBarExpiresAt";

export function UrgencyBar() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    let expires = Number(sessionStorage.getItem(KEY));
    if (!expires || isNaN(expires) || expires < Date.now()) {
      expires = Date.now() + DURATION_MS;
      sessionStorage.setItem(KEY, String(expires));
    }
    const tick = () => setRemaining(Math.max(0, expires - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (remaining === null || remaining <= 0) return null;

  const total = Math.ceil(remaining / 1000);
  const mm = String(Math.floor(total / 60)).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#0a0a0a] via-[#1a0a10] to-[#0a0a0a] text-white border-b border-white/10">
      {/* Animated shimmer */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -inset-x-full top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#DC3545]/30 to-transparent animate-[shimmer_3s_linear_infinite]" />
      </div>
      <style>{`@keyframes shimmer { 0% { transform: translateX(0); } 100% { transform: translateX(300%); } }`}</style>

      <div className="container-x relative py-2.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs sm:text-sm">
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5a6e] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#DC3545]" />
          </span>
          <Sparkles className="h-3.5 w-3.5 text-[#ff8896]" />
          <span className="font-bold uppercase tracking-[0.18em] bg-gradient-to-r from-[#ff8896] via-white to-[#ff8896] bg-clip-text text-transparent">
            Personal Discount
          </span>
        </span>

        <span className="hidden sm:inline text-white/40">•</span>

        <span className="flex items-center gap-1.5 text-white/85">
          <Clock className="h-3.5 w-3.5 text-[#ff8896]" />
          Expires in
          <span className="font-mono font-bold tabular-nums text-white bg-gradient-to-b from-[#DC3545] to-[#a01a2a] px-2.5 py-0.5 rounded-md shadow-[0_0_12px_rgba(220,53,69,0.5)]">
            {mm}:{ss}
          </span>
        </span>
      </div>
    </div>
  );
}
