import { ShieldCheck, Truck, Lock } from "lucide-react";
import { GUARANTEE_DAYS } from "@/lib/product-config";

export function TrustRow() {
  const items = [
    { icon: ShieldCheck, label: `${GUARANTEE_DAYS}-day guarantee` },
    { icon: Truck, label: "Ships from US in 24h" },
    { icon: Lock, label: "Secure checkout" },
  ];
  return (
    <ul className="grid grid-cols-3 gap-3 border-y border-[color:var(--border)] py-4">
      {items.map(({ icon: Icon, label }) => (
        <li key={label} className="flex flex-col items-center gap-2 text-center">
          <Icon className="h-4 w-4 text-[color:var(--navy)]" strokeWidth={1.4} />
          <span className="text-[10px] uppercase tracking-[0.14em] text-[color:var(--taupe)]">
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}
