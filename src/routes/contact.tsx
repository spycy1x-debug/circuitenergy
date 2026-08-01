import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Clock, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Seralie" },
      {
        name: "description",
        content: "Questions about a proof, an order, or an engraving? Email support@seralie.com — we reply within 24 hours.",
      },
      { property: "og:title", content: "Contact — Seralie" },
      { property: "og:description", content: "We reply within 24 hours. 30-day guarantee on every piece." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", order: "", message: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}\nOrder: ${form.order || "n/a"}\n${form.email}`,
    );
    window.location.href = `mailto:support@seralie.com?subject=${encodeURIComponent(
      `Seralie enquiry from ${form.name || "a customer"}`,
    )}&body=${body}`;
    setSent(true);
  }

  return (
    <section className="container-x py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="max-w-xl">
          <div className="eyebrow">Contact</div>
          <h1 className="mt-4 font-display text-4xl md:text-5xl">We're here.</h1>
          <p className="mt-5 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
            Questions about a proof, an engraving, or an order already on its way — write to us and a real person
            will answer.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-8">
            <Info Icon={Mail} title="Email">
              <a href="mailto:support@seralie.com" className="font-display text-xl hover:text-[color:var(--gold)]">
                support@seralie.com
              </a>
            </Info>
            <Info Icon={Clock} title="Response time">
              Within 24 hours, Monday to Friday.
            </Info>
            <Info Icon={ShieldCheck} title="30-day guarantee">
              If a piece arrives wrong or isn't what you approved, we remake it or refund you. No argument.
            </Info>
          </div>

          <form onSubmit={onSubmit} className="border border-[color:var(--border)] bg-white p-7 space-y-4">
            <Field label="Name">
              <input required value={form.name} onChange={set("name")} maxLength={100} className={inputCls} />
            </Field>
            <Field label="Email">
              <input required type="email" value={form.email} onChange={set("email")} maxLength={255} className={inputCls} />
            </Field>
            <Field label="Order number (optional)">
              <input value={form.order} onChange={set("order")} maxLength={40} className={inputCls} />
            </Field>
            <Field label="Message">
              <textarea required rows={5} value={form.message} onChange={set("message")} maxLength={1500} className={inputCls} />
            </Field>
            <button type="submit" className="btn-primary w-full">Send message</button>
            {sent && (
              <p className="text-xs text-[color:var(--muted-foreground)]">
                Your email client should have opened. If not, write to support@seralie.com directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "mt-2 w-full border border-[color:var(--border)] bg-transparent px-4 py-3 text-sm outline-none focus:border-[color:var(--charcoal)]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      {children}
    </label>
  );
}

function Info({
  Icon,
  title,
  children,
}: {
  Icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <Icon className="mt-1 h-4 w-4 shrink-0 text-[color:var(--gold)]" strokeWidth={1.5} />
      <div>
        <div className="eyebrow">{title}</div>
        <div className="mt-2 text-sm leading-7 text-[color:var(--muted-foreground)]">{children}</div>
      </div>
    </div>
  );
}
