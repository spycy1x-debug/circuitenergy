import { BadgeCheck } from "lucide-react";
import { GUARANTEE_DAYS } from "@/lib/product-config";
import payBadges from "@/assets/pay-badges.png.asset.json";

export function GuaranteeBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`text-center ${className}`}>
      <div className="flex items-center justify-center gap-2">
        <BadgeCheck className="h-4 w-4 text-[color:var(--navy)]" strokeWidth={1.6} />
        <span className="text-[13px] font-semibold text-[color:var(--navy)]">
          {GUARANTEE_DAYS}-Day Money-Back Guarantee
        </span>
      </div>
      <img
        src={payBadges.url}
        alt="Accepted payment methods: Amex, Apple Pay, Discover, Google Pay, Mastercard, PayPal, Shop Pay, Visa, Klarna"
        loading="lazy"
        className="mx-auto mt-3 h-7 w-auto max-w-full object-contain md:h-8"
      />
    </div>
  );
}
