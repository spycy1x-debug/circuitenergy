import { createFileRoute, Link } from "@tanstack/react-router";
import { WaistWrapShell, Label, serif, sans } from "@/components/site/WaistWrap";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — WaistSnatch™" },
      { name: "description", content: "Review your WaistSnatch™ order before checkout. Free shipping on 2+ wraps and a 60-day fit guarantee." },
      { property: "og:title", content: "Your Cart — WaistSnatch™" },
      { property: "og:description", content: "Review your WaistSnatch™ order before checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  return (
    <WaistWrapShell>
      <section className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8 md:py-28">
        <Label>Your cart</Label>
        <h1 style={serif} className="mt-4 text-[36px] leading-[1.06] md:text-[48px]">
          Your cart is empty.
        </h1>
        <p style={sans} className="mx-auto mt-5 max-w-md text-[15px] leading-8 text-[color:var(--cw-muted)]">
          One wrap, one size, sixty days to change your mind.
        </p>
        <Link
          to="/waistsnatch"
          style={sans}
          className="mt-9 inline-block rounded-full bg-[color:var(--cw-brand)] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-white hover:opacity-90"
        >
          Shop WaistSnatch™ — $39.99
        </Link>
      </section>
    </WaistWrapShell>
  );
}
