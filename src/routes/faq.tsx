import { createFileRoute, Link } from "@tanstack/react-router";
import { SilkShell, Faq, Label, serif, sans } from "@/components/site/Silk";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Seralie SilkBrush™" },
      { name: "description", content: "Answers about the Seralie SilkBrush™ boar-bristle brush: how it works, hair types, care, shipping and our 30-day money-back guarantee." },
      { property: "og:title", content: "FAQ — Seralie SilkBrush™" },
      { property: "og:description", content: "How the SilkBrush™ works, care, shipping and returns." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <SilkShell>
      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <Label>FAQ</Label>
        <h1 style={serif} className="mt-4 text-[34px] leading-[1.06] md:text-[48px]">
          Questions, answered.
        </h1>
        <div className="mt-10">
          <Faq />
        </div>
        <Link
          to="/"
          style={sans}
          className="mt-12 inline-block rounded-full bg-[color:var(--cw-ink)] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-white"
        >
          Get My SilkBrush™ — $37.99
        </Link>
      </section>
    </SilkShell>
  );
}
