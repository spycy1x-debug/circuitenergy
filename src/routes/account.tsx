import { createFileRoute, Link } from "@tanstack/react-router";
import { User, Package, Heart, LogIn } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — Circuit Energy" },
      { name: "description", content: "Sign in to your Circuit Energy account to track orders and manage your subscription." },
    ],
  }),
  component: AccountPage,
});

const serif = { fontFamily: '"Instrument Serif", Georgia, serif' };

function AccountPage() {
  return (
    <section className="relative isolate overflow-hidden bg-[oklch(0.15_0.03_245)] text-white min-h-[70vh]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, oklch(0.55 0.18 290 / 0.5), transparent 55%), radial-gradient(ellipse at 85% 90%, oklch(0.6 0.18 55 / 0.45), transparent 50%), linear-gradient(135deg, oklch(0.18 0.05 250), oklch(0.12 0.04 245))",
        }}
      />
      <div className="container-x py-20 md:py-28 max-w-md mx-auto text-center">
        <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur">
          <User className="h-7 w-7 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl leading-[1] text-white">
          Your <em style={serif} className="italic font-normal text-[oklch(0.85_0.15_70)]">account</em>
        </h1>
        <p className="mt-5 text-white/75">
          Sign in to track orders, manage your subscription, and view your saved items.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-ink font-semibold px-6 py-3 hover:bg-white/90 transition-colors shadow-lg">
            <LogIn className="h-4 w-4" /> Sign in
          </button>
          <button className="inline-flex items-center justify-center gap-2 rounded-full ring-1 ring-white/25 bg-white/5 text-white font-semibold px-6 py-3 hover:bg-white/10 transition-colors backdrop-blur">
            Create account
          </button>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 text-left">
          <Link to="/cart" className="rounded-2xl ring-1 ring-white/15 bg-white/5 p-4 hover:bg-white/10 transition-colors backdrop-blur">
            <Package className="h-5 w-5 text-[oklch(0.85_0.15_70)]" />
            <div className="mt-2 text-sm font-semibold text-white">Orders</div>
            <div className="text-xs text-white/60">View your cart</div>
          </Link>
          <Link to="/shop" className="rounded-2xl ring-1 ring-white/15 bg-white/5 p-4 hover:bg-white/10 transition-colors backdrop-blur">
            <Heart className="h-5 w-5 text-[oklch(0.85_0.15_70)]" />
            <div className="mt-2 text-sm font-semibold text-white">Favorites</div>
            <div className="text-xs text-white/60">Browse the shop</div>
          </Link>
        </div>
      </div>
    </section>
  );
}
