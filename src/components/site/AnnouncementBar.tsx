import { useEffect, useState } from "react";

const messages = [
  "No More Afternoon Crashes — Feel Energized All Day",
  "60-Day Money-Back Guarantee — No Questions Asked",
  "Works in 1-2 Weeks — 500+ Verified Results",
  "Free Shipping on Orders Over $75",
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % messages.length), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="bg-ink text-white text-xs md:text-sm py-2.5 text-center font-medium tracking-wide overflow-hidden">
      <div key={i} className="animate-in fade-in slide-in-from-bottom-1 duration-500">
        {messages[i]}
      </div>
    </div>
  );
}
