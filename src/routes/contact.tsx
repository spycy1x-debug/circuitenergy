import { createFileRoute } from "@tanstack/react-router";
import { Mail, ShieldCheck, RotateCcw } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact Circuit Energy" }, { name: "description", content: "Get in touch with Circuit Energy. Email support.circuit@gmail.com for questions about your order, products, or guarantee." }] }),
  component: ContactPage,
});

const serif = { fontFamily: '"Instrument Serif", Georgia, serif' };

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[oklch(0.15_0.03_245)] text-white">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, oklch(0.6 0.18 200 / 0.5), transparent 55%), radial-gradient(ellipse at 10% 90%, oklch(0.55 0.18 30 / 0.5), transparent 50%), linear-gradient(135deg, oklch(0.18 0.05 250), oklch(0.12 0.04 245))",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0 / 0.6) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="container-x py-20 md:py-24 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.7_0.18_200)] animate-pulse" />
            We're listening
          </span>
          <h1 className="mt-6 text-5xl md:text-7xl leading-[0.95] text-white">
            Get in <em style={serif} className="italic font-normal text-[oklch(0.85_0.15_200)]">touch</em>.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl">
            Questions about your order, the products, or our guarantee? Real humans, <em style={serif} className="italic text-white">fast replies</em>.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container-x py-16 md:py-20 grid gap-10 lg:grid-cols-2 items-start">
        <div className="space-y-4">
          <InfoCard
            tone="amber"
            icon={<Mail className="h-5 w-5" />}
            title="Email Support"
          >
            <a href="mailto:support.circuit@gmail.com" className="text-ink font-semibold hover:underline">support.circuit@gmail.com</a>
            <p className="text-xs text-muted-foreground mt-1">We typically respond within 24 hours.</p>
          </InfoCard>
          <InfoCard
            tone="emerald"
            icon={<ShieldCheck className="h-5 w-5" />}
            title="60-Day Guarantee"
          >
            <p className="text-sm text-body">Not satisfied? We'll refund every penny — no questions asked.</p>
          </InfoCard>
          <InfoCard
            tone="violet"
            icon={<RotateCcw className="h-5 w-5" />}
            title="Easy Returns"
          >
            <p className="text-sm text-body">Hassle-free returns within 60 days of purchase.</p>
          </InfoCard>

          <div className="rounded-2xl p-6 mt-2 text-white relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, oklch(0.25 0.06 250), oklch(0.18 0.05 245))" }}>
            <div style={serif} className="text-3xl md:text-4xl leading-tight">
              "Best support team I've ever <em className="italic">dealt with</em>."
            </div>
            <div className="mt-3 text-sm text-white/70">— Marcus T., verified customer</div>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="relative rounded-3xl p-8 md:p-10 overflow-hidden"
          style={{
            background: "linear-gradient(160deg, oklch(0.98 0.03 70), white 60%, oklch(0.97 0.02 290))",
            boxShadow: "0 20px 60px -20px oklch(0.2 0.05 245 / 0.25), inset 0 0 0 1px oklch(0.9 0.02 245)"
          }}
        >
          <div aria-hidden className="absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl opacity-50"
            style={{ background: "oklch(0.85 0.12 55)" }} />
          <div className="relative">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[oklch(0.45_0.15_55)]">
              <span className="h-px w-6 bg-[oklch(0.75_0.18_55)]" />
              Send a message
            </div>
            <h2 className="mt-2 text-4xl md:text-5xl text-ink leading-tight">
              Say <em style={serif} className="italic font-normal">hello</em>.
            </h2>

            {sent ? (
              <div className="mt-6 rounded-xl bg-success/10 text-success p-5 text-sm font-medium border border-success/20">
                Thanks! We'll be in touch within 24 hours.
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <Field label="Name"><input required className="input" /></Field>
                <Field label="Email"><input type="email" required className="input" /></Field>
                <Field label="Subject"><input required className="input" /></Field>
                <Field label="Message"><textarea required rows={5} className="input resize-none" /></Field>
                <button className="btn-primary w-full mt-2">Send Message →</button>
              </div>
            )}
          </div>
          <style>{`.input{width:100%;padding:.85rem 1rem;border:1px solid var(--color-border);border-radius:.75rem;background:white;font-size:.95rem;color:var(--color-ink);transition:all .15s}.input:focus{outline:none;border-color:var(--color-primary);box-shadow:0 0 0 3px color-mix(in oklab,var(--color-primary) 20%,transparent)}`}</style>
        </form>
      </section>
    </>
  );
}

const tones: Record<string, { bg: string; ring: string; text: string }> = {
  amber:   { bg: "oklch(0.96 0.06 70)",  ring: "oklch(0.75 0.18 55)",  text: "oklch(0.45 0.15 55)" },
  violet:  { bg: "oklch(0.96 0.04 290)", ring: "oklch(0.65 0.17 290)", text: "oklch(0.42 0.16 290)" },
  emerald: { bg: "oklch(0.96 0.05 160)", ring: "oklch(0.65 0.15 160)", text: "oklch(0.4 0.12 160)" },
};

function InfoCard({ tone, icon, title, children }: { tone: keyof typeof tones; icon: React.ReactNode; title: string; children: React.ReactNode }) {
  const t = tones[tone];
  return (
    <div
      className="group flex items-start gap-4 rounded-2xl bg-white p-5 transition-all hover:-translate-y-0.5"
      style={{ boxShadow: `inset 0 0 0 1px ${t.ring}33, 0 4px 16px -8px ${t.ring}55` }}
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:-rotate-6"
        style={{ background: t.bg, color: t.text }}
      >
        {icon}
      </div>
      <div>
        <div style={serif} className="text-2xl text-ink leading-tight">{title}</div>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-ink/70 mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}
