import { useEffect, useState } from "react";

const messages = [
  "FREE US SHIPPING ON ORDERS OVER $40",
  "CAMERA-READY IN 30 MINUTES · PURPLE COLOR-CORRECTING STRIPS",
  "30-DAY SATISFACTION GUARANTEE",
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % messages.length), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="bg-[#5B3A6E] text-[#FAF6F0] text-[10px] md:text-[11px] py-2.5 text-center font-medium tracking-[0.28em] uppercase overflow-hidden">
      <div key={i} className="animate-in fade-in duration-500">
        {messages[i]}
      </div>
    </div>
  );
}
