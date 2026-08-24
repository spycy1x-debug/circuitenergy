import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "The WaistSnatch™ List — Offers & Fit Notes" },
      {
        name: "description",
        content:
          "Join the WaistSnatch™ list for restock notes, subscriber offers and occasional plain-spoken guidance on fit and wear.",
      },
      { property: "og:title", content: "The WaistSnatch™ List" },
      { property: "og:description", content: "Restock notes and subscriber offers, straight to your inbox." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://waistwrap.com/account" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://waistwrap.com/account" }],
  }),

  component: AccountPage,
});

function AccountPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/public/klaviyo-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), firstName: firstName.trim() || undefined }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setMessage("You're on the list.");
      setEmail("");
      setFirstName("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <section className="container-x py-20 md:py-28">
      <div className="mx-auto max-w-lg text-center">
        <div className="eyebrow">The WaistSnatch™ list</div>
        <h1 className="mt-5 font-display text-4xl md:text-5xl">Offers, first.</h1>
        <p className="mt-5 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
          Subscriber-only offers, restock notes and the occasional plain-spoken note on fit and wear. No noise.
        </p>



        <form onSubmit={onSubmit} className="mt-10 space-y-3 text-left" noValidate>
          <label className="block">
            <span className="eyebrow">First name (optional)</span>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              maxLength={80}
              autoComplete="given-name"
              className="mt-2 w-full border border-[color:var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[color:var(--navy)]"
            />
          </label>
          <label className="block">
            <span className="eyebrow">Email</span>
            <div className="relative mt-2">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                placeholder="you@domain.com"
                autoComplete="email"
                className="w-full border border-[color:var(--border)] bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-[color:var(--navy)]"
              />
            </div>
          </label>
          <button type="submit" disabled={status === "loading"} className="btn-primary w-full">
            {status === "loading" ? "Joining…" : "Join the list"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-sm ${status === "error" ? "text-[color:var(--destructive)]" : "text-[color:var(--muted-foreground)]"}`}
          >
            {message}
          </p>
        )}
        <p className="mt-6 text-[11px] text-[color:var(--muted-foreground)]">
          Unsubscribe any time. We never share your email.
        </p>
      </div>
    </section>
  );
}
