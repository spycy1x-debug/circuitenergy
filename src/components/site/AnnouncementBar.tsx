import { useEffect, useState } from "react";

const messages = [
  "⚡ SUPPORT YOUR ENERGY — FORMULATED FOR ALL-DAY FOCUS",
  "🛡️ 60-DAY MONEY-BACK GUARANTEE — NO QUESTIONS ASKED",
  "🧠 CONSISTENCY IS KEY — TAKE DAILY FOR BEST RESULTS",
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
