import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

const DURATION_MS = 15 * 60 * 1000;
const KEY = "urgencyBarExpiresAt";

export function UrgencyBar() {
  const [remaining, setRemaining] = useState<number | null>(null);
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    const check = () => setClaimed(sessionStorage.getItem("personalDiscountClaimed") === "1");
    check();
    window.addEventListener("personalDiscountClaimed", check);
    return () => window.removeEventListener("personalDiscountClaimed", check);
  }, []);

  useEffect(() => {
    if (!claimed) {
      setRemaining(null);
      return;
    }
    let expires = Number(sessionStorage.getItem(KEY));
    if (!expires || isNaN(expires) || expires < Date.now()) {
      expires = Date.now() + DURATION_MS;
      sessionStorage.setItem(KEY, String(expires));
    }
    const tick = () => setRemaining(Math.max(0, expires - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [claimed]);

  if (!claimed || remaining === null || remaining <= 0) return null;

  const total = Math.ceil(remaining / 1000);
  const mm = String(Math.floor(total / 60)).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");

  return (
    <div className="relative overflow-hidden bg-[#0b0b0d] text-white border-y border-white/5">
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,53,69,0.18),transparent_60%)]" />
      {/* Shimmer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -inset-x-full top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent animate-[urgShimmer_4s_linear_infinite]" />
      </div>
      <style>{`@keyframes urgShimmer { 0% { transform: translateX(0); } 100% { transform: translateX(400%); } }`}</style>

      <div className="container-x relative py-2.5 flex items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
        {/* Lightning bolt badge */}
        <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[#ff5a6e] to-[#a01a2a] shadow-[0_0_14px_rgba(220,53,69,0.55)]">
          <Zap className="h-3.5 w-3.5 text-white" fill="currentColor" strokeWidth={0} />
        </span>

        <span className="font-semibold uppercase tracking-[0.22em] text-white">
          Personal Discount
        </span>

        <span className="h-3.5 w-px bg-white/15" />

        <span className="flex items-center gap-2 text-white/70">
          <span className="hidden sm:inline uppercase tracking-wider text-[10px] text-white/50">
            Expires in
          </span>
          <span className="flex items-center gap-1 font-mono font-bold tabular-nums">
            <span className="inline-flex min-w-[2.1em] justify-center rounded-md bg-white/[0.08] px-1.5 py-0.5 text-white ring-1 ring-white/10">
              {mm}
            </span>
            <span className="text-white/40">:</span>
            <span className="inline-flex min-w-[2.1em] justify-center rounded-md bg-white/[0.08] px-1.5 py-0.5 text-white ring-1 ring-white/10">
              {ss}
            </span>
          </span>
        </span>
      </div>
    </div>
  );
}
