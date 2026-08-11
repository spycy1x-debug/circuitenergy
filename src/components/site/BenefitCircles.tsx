import { Leaf, Battery, Sparkles, Pill } from "lucide-react";

const ITEMS = [
  { icon: Pill, label: "Digestive Comfort" },
  { icon: Leaf, label: "Gut Health" },
  { icon: Battery, label: "Energy Support" },
  { icon: Sparkles, label: "Daily Essentials" },
];

export function BenefitCircles() {
  return (
    <ul className="grid grid-cols-2 gap-8 sm:grid-cols-4">
      {ITEMS.map(({ icon: Icon, label }) => (
        <li key={label} className="text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[color:var(--taupe)]">
            <Icon className="h-6 w-6 text-[color:var(--navy)]" strokeWidth={1.2} />
          </span>
          <span className="mt-3 block text-[11px] uppercase tracking-[0.16em] text-[color:var(--taupe)]">
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}
