import { createFileRoute, Link } from "@tanstack/react-router";
import { SilkShell, Label, serif, sans } from "@/components/site/Silk";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Seralie SilkBrush™" },
      { name: "description", content: "Review your Seralie SilkBrush™ order before checkout. Free shipping and a 30-day money-back guarantee." },
      { property: "og:title", content: "Your Cart — Seralie SilkBrush™" },
      { property: "og:description", content: "Review your SilkBrush™ order before checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  return (
    <SilkShell>
      <section className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8 md:py-28">
        <Label>Your cart</Label>
        <h1 style={serif} className="mt-4 text-[34px] leading-[1.06] md:text-[46px]">
          Open your cart from the header.
        </h1>
        <p style={sans} className="mx-auto mt-5 max-w-md text-[15px] leading-8 text-[color:var(--cw-muted)]">
          Free shipping and 30 days to change your mind.
        </p>
        <Link
          to="/"
          style={sans}
          className="mt-8 inline-block rounded-full bg-[color:var(--cw-ink)] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-white"
        >
          Get My SilkBrush™ — $37.99
        </Link>
      </section>
    </SilkShell>
  );
}
