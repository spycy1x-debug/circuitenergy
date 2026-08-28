import { Link } from "@tanstack/react-router";
import { SilkShell, Label, serif, sans } from "@/components/site/Silk";

export function WWProse({
  eyebrow,
  title,
  intro,
  sections,
  cta = true,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  sections: { h: string; p: React.ReactNode }[];
  cta?: boolean;
}) {
  return (
    <SilkShell>
      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <Label>{eyebrow}</Label>
        <h1 style={serif} className="mt-4 text-[34px] leading-[1.06] md:text-[48px]">
          {title}
        </h1>
        {intro && (
          <p style={sans} className="mt-5 text-[15px] leading-8 text-[color:var(--cw-muted)]">
            {intro}
          </p>
        )}

        <div className="mt-10 space-y-9">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 style={serif} className="text-[22px] leading-tight">
                {s.h}
              </h2>
              <div style={sans} className="mt-3 space-y-3 text-[14px] leading-7 text-[color:var(--cw-muted)]">
                {s.p}
              </div>
            </div>
          ))}
        </div>

        {cta && (
          <div className="mt-14 border-t border-[color:var(--cw-line)] pt-10">
            <Link
              to="/"
              style={sans}
              className="inline-block rounded-full bg-[color:var(--cw-ink)] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-white"
            >
              Get My SilkBrush™ — $37.99
            </Link>
          </div>
        )}
      </section>
    </SilkShell>
  );
}
