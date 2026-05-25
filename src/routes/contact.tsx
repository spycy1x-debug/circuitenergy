import { createFileRoute } from "@tanstack/react-router";
import { Mail, ShieldCheck, RotateCcw } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact Circuit Energy" }, { name: "description", content: "Get in touch with Circuit Energy. Email support.circuit@gmail.com for questions about your order, products, or guarantee." }] }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <section className="container-x py-16 grid gap-12 lg:grid-cols-2 items-start">
      <div>
        <h1 className="text-4xl md:text-5xl">Get in Touch</h1>
        <p className="mt-4 text-lg text-body">Questions about your order, the products, or our guarantee? We'd love to help.</p>
        <div className="mt-8 space-y-4">
          <div className="flex items-start gap-4 rounded-xl bg-secondary p-5">
            <Mail className="h-5 w-5 text-primary mt-0.5"/>
            <div>
              <div className="font-display font-semibold text-ink">Email Support</div>
              <a href="mailto:support.circuit@gmail.com" className="text-primary hover:underline">support.circuit@gmail.com</a>
              <p className="text-xs text-muted-foreground mt-1">We typically respond within 24 hours.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl bg-secondary p-5">
            <ShieldCheck className="h-5 w-5 text-success mt-0.5"/>
            <div>
              <div className="font-display font-semibold text-ink">60-Day Guarantee</div>
              <p className="text-sm text-body">Not satisfied? We'll refund every penny — no questions asked.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl bg-secondary p-5">
            <RotateCcw className="h-5 w-5 text-primary mt-0.5"/>
            <div>
              <div className="font-display font-semibold text-ink">Easy Returns</div>
              <p className="text-sm text-body">Hassle-free returns within 60 days of purchase.</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={(e)=>{e.preventDefault();setSent(true);}} className="rounded-2xl border border-border p-8 space-y-4">
        <h2 className="text-2xl">Send us a message</h2>
        {sent ? (
          <div className="rounded-lg bg-success/10 text-success p-5 text-sm font-medium">Thanks! We'll be in touch within 24 hours.</div>
        ) : (
          <>
            <Field label="Name"><input required className="input"/></Field>
            <Field label="Email"><input type="email" required className="input"/></Field>
            <Field label="Subject"><input required className="input"/></Field>
            <Field label="Message"><textarea required rows={5} className="input resize-none"/></Field>
            <button className="btn-primary w-full">Send Message</button>
          </>
        )}
        <style>{`.input{width:100%;padding:.75rem 1rem;border:1px solid var(--color-border);border-radius:.5rem;background:white;font-size:.95rem;color:var(--color-ink)}.input:focus{outline:none;border-color:var(--color-primary);box-shadow:0 0 0 3px color-mix(in oklab,var(--color-primary) 20%,transparent)}`}</style>
      </form>
    </section>
  );
}

function Field({label,children}:{label:string;children:React.ReactNode}){
  return <label className="block"><span className="text-sm font-medium text-ink mb-1.5 block">{label}</span>{children}</label>;
}
