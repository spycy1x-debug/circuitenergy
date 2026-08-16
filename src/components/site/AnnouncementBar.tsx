import { useEffect, useState } from "react";

const MESSAGES = [
  "Free shipping over $40",
  "60-day guarantee",
  "Ships in 24 hours",
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setI((c) => (c + 1) % MESSAGES.length);
        setVisible(true);
      }, 260);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-[color:var(--brand)] text-white">
      <div className="mx-auto flex min-h-9 max-w-6xl items-center justify-center px-5 py-2 text-center md:px-8">
        <p
          className={`text-[11px] font-medium tracking-wide transition-opacity duration-250 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {MESSAGES[i]}
        </p>
      </div>
    </div>
  );
}
