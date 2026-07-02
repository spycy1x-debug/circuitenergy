import { createFileRoute } from "@tanstack/react-router";
import { Mail, ShieldCheck, RotateCcw } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Seralie" },
      { name: "description", content: "Reach the Seralie team. Email support@seralie.com for questions about your order, product, or guarantee." },
      { property: "og:title", content: "Contact — Seralie" },
      { property: "og:description", content: "Real humans, thoughtful replies. Get in touch with Seralie." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="bg-[#FDF8EE]">
        <div className="container-x pt-16 pb-10 md:pt-24 md:pb-16 max-w-2xl mx-auto text-center">
          <div className="eyebrow">We're listening</div>
          <h1 className="mt-5 font-display text-5xl md:text-6xl text-[#3B2E25]">Get in <span className="italic text-[#AD9752]">touch</span>.</h1>
          <p className="mt-6 text-[15px] leading-8 text-[#5A483C]">
            Questions about your order, the ritual, or our guarantee — we'll respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="bg-[#F7EFDF]/50 border-y border-[#EADFC7]">
        <div className="container-x py-16 md:py-24 grid gap-12 lg:grid-cols-2 items-start max-w-5xl mx-auto">
          <div className="space-y-6">
            <InfoRow Icon={Mail} title="Email">
              <a href="mailto:support@seralie.com" className="font-display italic text-2xl text-[#AD9752] hover:text-[#94803F] transition-colors">
                support@seralie.com
              </a>
              <p className="text-xs text-[#7A6A5E] tracking-wide mt-2">Responses within 24 hours.</p>
            </InfoRow>
            <InfoRow Icon={ShieldCheck} title="30-Day Guarantee">
              <p className="text-sm text-[#5A483C] leading-7">Not satisfied? Every penny back, no questions asked.</p>
            </InfoRow>
            <InfoRow Icon={RotateCcw} title="Easy Returns">
              <p className="text-sm text-[#5A483C] leading-7">Hassle-free within 30 days of purchase.</p>
            </InfoRow>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="bg-[#FDF8EE] border border-[#EADFC7] p-8 md:p-10"
          >
            <div className="eyebrow">Send a note</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-[#3B2E25]">Say <span className="italic text-[#AD9752]">hello</span></h2>

            {sent ? (
              <div className="mt-8 border-l-2 border-[#AD9752] pl-4 py-2 text-sm text-[#3B2E25]">
                Thank you — we'll be in touch within 24 hours.
              </div>
            ) : (
              <div className="mt-8 space-y-5">
                <Field label="Name"><input required className="input" /></Field>
                <Field label="Email"><input type="email" required className="input" /></Field>
                <Field label="Subject"><input required className="input" /></Field>
                <Field label="Message"><textarea required rows={5} className="input resize-none" /></Field>
                <button className="btn-primary w-full mt-3">Send Message</button>
              </div>
            )}
            <style>{`.input{width:100%;padding:.9rem 1rem;border:1px solid #EADFC7;background:#FDF8EE;font-size:.9rem;color:#3B2E25;font-family:inherit;outline:none;transition:border-color .2s}.input:focus{border-color:#AD9752}`}</style>
          </form>
        </div>
      </section>
    </>
  );
}

function InfoRow({ Icon, title, children }: { Icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-5 pb-6 border-b border-[#EADFC7]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#AD9752] text-[#AD9752]">
        <Icon className="h-4 w-4" strokeWidth={1.4} />
      </div>
      <div className="flex-1">
        <div className="caps-label text-[#3B2E25]">{title}</div>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="caps-label text-[#5A483C] mb-2 block">{label}</span>
      {children}
    </label>
  );
}
