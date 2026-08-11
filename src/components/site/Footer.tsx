import { useState } from "react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/public/klaviyo-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Could not subscribe.");
      setStatus("done");
      setMessage("You're on the list.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Could not subscribe.");
    }
  }

  const linkCls = "text-[color:var(--ivory)]/70 hover:text-[color:var(--ivory)] transition-colors";

  return (
    <footer className="bg-[color:var(--navy)] text-[color:var(--ivory)]">
      <div className="container-x grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-20">
        <div>
          <div className="wordmark text-xl text-[color:var(--ivory)]">SERALIE</div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-[color:var(--ivory)]/70">
            NOURISH™ — digestive support and daily essentials in one capsule, made in a GMP-certified US
            facility.
          </p>

          <form onSubmit={subscribe} className="mt-7 max-w-sm">
            <label htmlFor="footer-email" className="eyebrow text-[color:var(--gold)]">
              Join the list
            </label>
            <div className="mt-3 flex">
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="min-w-0 flex-1 border border-[color:var(--ivory)]/30 bg-transparent px-3 py-3 text-sm text-[color:var(--ivory)] placeholder:text-[color:var(--ivory)]/40 focus:border-[color:var(--gold)] focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="border border-l-0 border-[color:var(--ivory)]/30 px-4 text-[10px] uppercase tracking-[0.16em] text-[color:var(--ivory)] hover:bg-[color:var(--ivory)]/10 disabled:opacity-50"
              >
                {status === "loading" ? "…" : "Join"}
              </button>
            </div>
            {message && <p className="mt-2 text-xs text-[color:var(--ivory)]/70">{message}</p>}
          </form>
        </div>

        <div>
          <div className="eyebrow text-[color:var(--gold)]">Shop</div>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/nourish" className={linkCls}>NOURISH™</Link></li>
            <li><Link to="/shop" className={linkCls}>All products</Link></li>
            <li><Link to="/cart" className={linkCls}>Your cart</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow text-[color:var(--gold)]">Support</div>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/contact" className={linkCls}>Contact</Link></li>
            <li><Link to="/faq" className={linkCls}>FAQ</Link></li>
            <li><Link to="/shipping" className={linkCls}>Shipping</Link></li>
            <li><Link to="/refund" className={linkCls}>Returns</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow text-[color:var(--gold)]">Legal</div>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/privacy" className={linkCls}>Privacy</Link></li>
            <li><Link to="/terms" className={linkCls}>Terms</Link></li>
            <li><Link to="/refund" className={linkCls}>Refund Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[color:var(--ivory)]/15">
        <div className="container-x py-8">
          <p className="max-w-3xl text-[11px] leading-5 text-[color:var(--ivory)]/55">
            These statements have not been evaluated by the Food and Drug Administration. This product is
            not intended to diagnose, treat, cure, or prevent any disease.
          </p>
          <div className="mt-5 flex flex-col justify-between gap-3 md:flex-row">
            <p className="text-[11px] text-[color:var(--ivory)]/55">
              © {new Date().getFullYear()} Seralie. All rights reserved.
            </p>
            <p className="text-[11px] text-[color:var(--ivory)]/55">
              60-day money-back guarantee · support@seralie.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
