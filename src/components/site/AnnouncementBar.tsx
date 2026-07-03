import { useEffect, useState } from "react";

const messages = [
  "COMPLIMENTARY US SHIPPING ON ORDERS OVER $50",
  "30-DAY MONEY-BACK GUARANTEE",
  "REAL β-NMN · THIRD-PARTY TESTED · MADE IN THE USA",
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % messages.length), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="bg-[#3B2E25] text-[#FDF8EE] text-[10px] md:text-[11px] py-2.5 text-center font-medium tracking-[0.28em] uppercase overflow-hidden">
      <div key={i} className="animate-in fade-in duration-500">
        {messages[i]}
      </div>
    </div>
  );
}
