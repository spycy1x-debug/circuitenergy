import { Link } from "@tanstack/react-router";
import { WaistWrapShell, Label, serif, sans } from "@/components/site/WaistWrap";

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
    <WaistWrapShell>
      <section className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <Label>{eyebrow}</Label>
        <h1 style={serif} className="mt-4 text-[36px] leading-[1.06] md:text-[52px]">
          {title}
        </h1>
        {intro && (
          <p style={sans} className="mt-5 text-[15px] leading-8 text-[color:var(--cw-muted)]">
            {intro}
          </p>
        )}

        <div className="mt-12 space-y-10">
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
          <div className="mt-16 border-t border-[color:var(--cw-line)] pt-10">
            <Link
              to="/waistwrap"
              style={sans}
              className="inline-block rounded-full bg-[color:var(--cw-brand)] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90"
            >
              Shop WaistSnatch™ — $39
            </Link>
          </div>
        )}
      </section>
    </WaistWrapShell>
  );
}
