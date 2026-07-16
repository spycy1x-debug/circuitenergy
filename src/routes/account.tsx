import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Sparkles, Star, ShieldCheck, Check, Loader2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Join the Seralie list — Seralie" },
      {
        name: "description",
        content: "Subscribe to the Seralie list for early access to new drops, beauty notes, and 15% off your first order.",
      },
    ],
  }),
  component: AccountPage,
});

const serif = { fontFamily: '"Instrument Serif", Georgia, serif' };

type Status = "idle" | "loading" | "success" | "error";

function AccountPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/public/klaviyo-subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), firstName: firstName.trim() || undefined }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setMessage("You're on the list. Check your inbox shortly.");
      setEmail("");
      setFirstName("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#241531] text-white min-h-[80vh]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at 15% 10%, oklch(0.55 0.16 330 / 0.55), transparent 55%), radial-gradient(ellipse at 90% 90%, oklch(0.5 0.14 300 / 0.5), transparent 50%), linear-gradient(135deg, oklch(0.26 0.07 320), oklch(0.16 0.05 315))",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 0.6) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="container-x py-20 md:py-28 max-w-xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.8_0.14_340)] animate-pulse" />
          The Seralie List
        </span>

        <h1 className="mt-6 text-5xl md:text-6xl leading-[1]">
          Join the{" "}
          <em style={serif} className="italic font-normal text-[oklch(0.86_0.1_340)]">
            Seralie
          </em>{" "}
          list
        </h1>
        <p className="mt-5 text-white/75 text-lg">
          First looks at new drops, beauty notes worth reading, and 15% off your first order — straight to your inbox.
        </p>



        <form onSubmit={onSubmit} className="mt-10 grid gap-3 text-left" noValidate>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-white/55 font-semibold">
              First name <span className="opacity-50 normal-case tracking-normal">(optional)</span>
            </span>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              maxLength={80}
              placeholder="Alex"
              autoComplete="given-name"
              className="mt-2 w-full rounded-xl bg-white/5 ring-1 ring-white/15 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-white/40 backdrop-blur"
            />
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-white/55 font-semibold">Email</span>
            <div className="relative mt-2">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                placeholder="you@domain.com"
                autoComplete="email"
                className="w-full rounded-xl bg-white/5 ring-1 ring-white/15 pl-11 pr-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-white/40 backdrop-blur"
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white text-ink font-semibold px-6 py-3 hover:bg-white/90 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
            {status === "success" && <Check className="h-4 w-4" />}
            {status === "success" ? "Subscribed" : status === "loading" ? "Subscribing…" : "Subscribe"}
          </button>

          {status === "error" && <p className="text-sm text-[oklch(0.78_0.16_30)] text-center">{message}</p>}
          {status === "success" && <p className="text-sm text-[oklch(0.85_0.15_150)] text-center">{message}</p>}

          <p className="text-xs text-white/45 text-center">
            No spam, unsubscribe anytime. We use Klaviyo to send our emails.
          </p>
        </form>

        <div className="mt-12 grid grid-cols-3 gap-3 text-left">
          <Link
            to="/strips"
            className="rounded-2xl ring-1 ring-white/15 bg-white/5 p-4 hover:bg-white/10 transition-colors backdrop-blur"
          >
            <Sparkles className="h-5 w-5 text-[oklch(0.82_0.11_330)]" />
            <div className="mt-2 text-sm font-semibold text-white">Shop</div>
            <div className="text-xs text-white/60">Whitening strips</div>
          </Link>
          <Link
            to="/strips"
            className="rounded-2xl ring-1 ring-white/15 bg-white/5 p-4 hover:bg-white/10 transition-colors backdrop-blur"
          >
            <Star className="h-5 w-5 text-[oklch(0.86_0.12_340)]" />
            <div className="mt-2 text-sm font-semibold text-white">Reviews</div>
            <div className="text-xs text-white/60">Real results</div>
          </Link>
          <Link
            to="/contact"
            className="rounded-2xl ring-1 ring-white/15 bg-white/5 p-4 hover:bg-white/10 transition-colors backdrop-blur"
          >
            <ShieldCheck className="h-5 w-5 text-[oklch(0.84_0.1_320)]" />
            <div className="mt-2 text-sm font-semibold text-white">Support</div>
            <div className="text-xs text-white/60">30-day guarantee</div>
          </Link>
        </div>
      </div>
    </section>
  );
}
