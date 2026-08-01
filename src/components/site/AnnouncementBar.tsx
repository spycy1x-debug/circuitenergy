import { useEffect, useState } from "react";

const MESSAGES = [
  "Limited time offer · Buy 2 Get 1 Free + Buy 3 Get 3 Free",
  "Free shipping on orders over $80",
  "Made to order · Digital proof before we engrave",
  "30-day remake or refund guarantee",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % MESSAGES.length);
        setVisible(true);
      }, 300);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[color:var(--charcoal)] text-[color:var(--bone)]">
      <div className="container-x flex h-9 items-center justify-center overflow-hidden text-center">
        <p
          className={`caps-label text-[10px] transition-all duration-300 ${
            visible ? "opacity-90 translate-y-0" : "opacity-0 translate-y-1"
          }`}
        >
          {MESSAGES[index]}
        </p>
      </div>
    </div>
  );
}
