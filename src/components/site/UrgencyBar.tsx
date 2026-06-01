import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

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

  if (remaining === null) return null;

  const total = Math.ceil(remaining / 1000);
  const mm = String(Math.floor(total / 60)).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");

  return (
    <div className="bg-gradient-to-r from-energy via-primary to-electric text-white">
      <div className="container-x py-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs sm:text-sm">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wide">
          <Flame className="h-4 w-4 animate-pulse" />
          Limited discount
        </span>
        <span className="opacity-95">
          Runs out in{" "}
          <span className="font-mono font-bold tabular-nums bg-white/20 px-2 py-0.5 rounded">
            {mm}:{ss}
          </span>
        </span>
      </div>
    </div>
  );
}
