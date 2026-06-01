import { useEffect, useState } from "react";

const messages = [
  "⚡ NO MORE AFTERNOON CRASHES — FEEL ENERGIZED ALL DAY",
  "🛡️ 60-DAY MONEY-BACK GUARANTEE — NO QUESTIONS ASKED",
  "🧠 WORKS IN 1-2 WEEKS — 50+ VERIFIED RESULTS",
  "🚚 FREE SHIPPING ON ORDERS OVER $75",
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % messages.length), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="bg-ink text-white text-xs md:text-sm py-2.5 text-center font-bold tracking-[0.12em] uppercase overflow-hidden">
      <div key={i} className="animate-in fade-in slide-in-from-bottom-1 duration-500">
        {messages[i]}
      </div>
    </div>
  );
}
