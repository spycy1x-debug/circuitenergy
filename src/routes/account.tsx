import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Sparkles, Zap, ShieldCheck, Check, Loader2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Join the Circuit list — Circuit Energy" },
      {
        name: "description",
        content: "Subscribe to the Circuit email list for early access, founder notes, and energy-science deep dives.",
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
    <section className="relative isolate overflow-hidden bg-[oklch(0.13_0.03_245)] text-white min-h-[80vh]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at 15% 10%, oklch(0.55 0.18 290 / 0.55), transparent 55%), radial-gradient(ellipse at 90% 90%, oklch(0.6 0.18 55 / 0.5), transparent 50%), linear-gradient(135deg, oklch(0.18 0.05 250), oklch(0.1 0.04 245))",
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
          <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.75_0.2_55)] animate-pulse" />
          The Circuit List
        </span>

        <h1 className="mt-6 text-5xl md:text-6xl leading-[1]">
          Join the{" "}
          <em style={serif} className="italic font-normal text-[oklch(0.85_0.15_70)]">
            Circuit
          </em>{" "}
          list
        </h1>
        <p className="mt-5 text-white/75 text-lg">
          Early access drops, founder notes, and the occasional deep dive on why you're tired and how to actually fix
          it.
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
            to="/shop"
            className="rounded-2xl ring-1 ring-white/15 bg-white/5 p-4 hover:bg-white/10 transition-colors backdrop-blur"
          >
            <Sparkles className="h-5 w-5 text-[oklch(0.85_0.12_290)]" />
            <div className="mt-2 text-sm font-semibold text-white">Shop</div>
            <div className="text-xs text-white/60">Browse formulas</div>
          </Link>
          <Link
            to="/why-tired"
            className="rounded-2xl ring-1 ring-white/15 bg-white/5 p-4 hover:bg-white/10 transition-colors backdrop-blur"
          >
            <Zap className="h-5 w-5 text-[oklch(0.85_0.15_70)]" />
            <div className="mt-2 text-sm font-semibold text-white">Science</div>
            <div className="text-xs text-white/60">Why you're tired</div>
          </Link>
          <Link
            to="/contact"
            className="rounded-2xl ring-1 ring-white/15 bg-white/5 p-4 hover:bg-white/10 transition-colors backdrop-blur"
          >
            <ShieldCheck className="h-5 w-5 text-[oklch(0.85_0.15_150)]" />
            <div className="mt-2 text-sm font-semibold text-white">Support</div>
            <div className="text-xs text-white/60">30-day guarantee</div>
          </Link>
        </div>
      </div>
    </section>
  );
}
