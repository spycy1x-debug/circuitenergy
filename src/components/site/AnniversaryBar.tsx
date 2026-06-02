import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

const DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours
const KEY = "anniversarySaleExpiresAt_v2";

export function AnniversaryBar() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    let expires = Number(typeof window !== "undefined" ? localStorage.getItem(KEY) : 0);
    if (!expires || isNaN(expires) || expires < Date.now()) {
      expires = Date.now() + DURATION_MS;
      localStorage.setItem(KEY, String(expires));
    }
    const tick = () => setRemaining(Math.max(0, expires - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const total = Math.max(0, Math.ceil((remaining ?? 0) / 1000));
  const hh = String(Math.floor(total / 3600)).padStart(2, "0");
  const mm = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");

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
        {/* Lightning bolt badge */}
        <span className="relative flex h-6 items-center gap-1.5 rounded-md bg-gradient-to-br from-[#ff5a6e] to-[#a01a2a] px-2 shadow-[0_0_14px_rgba(220,53,69,0.55)]">
          <Zap className="h-3 w-3 text-white" fill="currentColor" strokeWidth={0} />
          <span className="font-bold uppercase tracking-[0.18em] text-white text-[10px]">
            Anniversary Sale
          </span>
        </span>

        <span className="hidden sm:inline h-3.5 w-px bg-white/15" />

        <span className="hidden sm:inline font-semibold uppercase tracking-[0.22em] text-white">
          30% Off Sitewide
        </span>

        <span className="h-3.5 w-px bg-white/15" />

        <span className="flex items-center gap-2 text-white/70">
          <span className="hidden sm:inline uppercase tracking-wider text-[10px] text-white/50">
            Ends in
          </span>
          <span className="flex items-center gap-1 font-mono font-bold tabular-nums">
            <span className="inline-flex min-w-[2.1em] justify-center rounded-md bg-white/[0.08] px-1.5 py-0.5 text-white ring-1 ring-white/10">
              {hh}
            </span>
            <span className="text-white/40">:</span>
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
