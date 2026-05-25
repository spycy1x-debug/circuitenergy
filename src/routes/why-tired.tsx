import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/why-tired")({
  head: () => ({
    meta: [
      { title: "Why You're Tired — The Real Science | Circuit Energy" },
      { name: "description", content: "The real reason you're foggy and exhausted: declining NAD+ and depleted neurotransmitters. Here's the science and how to fix it." },
    ],
  }),
  component: WhyTiredPage,
});

const serif = { fontFamily: '"Instrument Serif", Georgia, serif' };

function WhyTiredPage() {
  return (
    <article className="relative overflow-hidden">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[oklch(0.15_0.03_245)] text-white">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at 20% 10%, oklch(0.45 0.15 30 / 0.55), transparent 55%), radial-gradient(ellipse at 90% 80%, oklch(0.55 0.18 200 / 0.45), transparent 50%), linear-gradient(135deg, oklch(0.18 0.05 250), oklch(0.12 0.04 245))",
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
        <div className="container-x py-20 md:py-28 max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.75_0.2_55)] animate-pulse" />
            The Real Science
          </span>
          <h1 className="mt-6 text-5xl md:text-7xl leading-[0.95] text-white">
            Why You're <span style={serif} className="italic font-normal text-[oklch(0.85_0.15_70)]">Tired</span>
            <br />
            <span className="text-white/70">(and it's not what</span>
            <br />
            <span className="text-white/70">you think).</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl">
            It's not laziness. It's not stress. It's <em style={serif} className="text-[oklch(0.9_0.12_70)] not-italic-0">chemistry</em> — and once
            you understand it, the fix becomes obvious.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/shop" className="btn-white">Shop the fix</Link>
            <a href="#science" className="btn-outline border-white/40 text-white hover:bg-white hover:text-ink">Read the science</a>
          </div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section className="border-y border-ink/10 bg-[oklch(0.97_0.01_70)]">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 divide-x divide-ink/10">
          {[
            { n: "50%", l: "NAD+ drop by age 40" },
            { n: "2pm", l: "the daily crash" },
            { n: "20m", l: "average ​ span" },
            { n: "0", l: "what caffeine restores" },
          ].map((s) => (
            <div key={s.l} className="px-4 py-6 text-center">
              <div style={serif} className="text-4xl md:text-5xl text-ink leading-none">{s.n}</div>
              <div className="mt-2 text-xs md:text-sm text-body uppercase tracking-wider">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTIONS */}
      <section id="science" className="container-x py-20 md:py-28 max-w-5xl">
        <Block
          num="01"
          tone="amber"
          kicker="The Energy Problem"
          title={<>Your mitochondria are running on <em style={serif} className="italic font-normal">empty</em>.</>}
          body="By age 40, your NAD+ levels have dropped by roughly 50%. NAD+ is the molecule every cell in your body uses to turn food into usable energy. When it declines, your mitochondria slow down — and you feel it as fatigue, brain fog, and the dreaded 2pm crash."
          icon="⚡"
        />
        <Block
          num="02"
          tone="violet"
          kicker="The Focus Problem"
          title={<>Your neurotransmitters are <em style={serif} className="italic font-normal">depleted</em>.</>}
          body="Acetylcholine drives focus and memory. Dopamine drives motivation. Stress, age, and modern life burn through both faster than your body can rebuild them. The result: scattered thinking, poor recall, an inability to focus for more than 20 minutes."
          icon="🧠"
        />
        <Block
          num="03"
          tone="rose"
          kicker="The Caffeine Trap"
          title={<>Caffeine isn't the <em style={serif} className="italic font-normal">answer</em>.</>}
          body="Stimulants borrow energy from tomorrow. They don't restore the underlying systems — they just mask the symptoms until they wear off. That's why coffee stopped working."
          icon="☕"
        />
        <Block
          num="04"
          tone="emerald"
          kicker="The Actual Fix"
          title={<>Restore the <em style={serif} className="italic font-normal">system</em>, not the symptom.</>}
          body="Restore NAD+ at the cellular level with NMN. Replenish neurotransmitters with Alpha GPC, Huperzine A, Bacopa monnieri, L-Theanine, and L-Tyrosine. Together, they tackle both sides of the problem — energy and cognition."
          icon="🔋"
        />
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.95 0.04 70), oklch(0.92 0.06 30) 60%, oklch(0.88 0.08 350))",
          }}
        />
        <div className="container-x relative py-20 md:py-24 text-center max-w-3xl">
          <h2 className="text-4xl md:text-6xl text-ink leading-tight">
            Ready to <em style={serif} className="italic font-normal">fix it?</em>
          </h2>
          <p className="mt-5 text-lg text-body">
            Start with Neural Performance for ​, NMN for cellular ​, or stack both.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/shop" className="btn-primary">Shop Circuit</Link>
            <Link to="/product/$slug" params={{ slug: "circuit-nmn" }} className="btn-outline">View NMN</Link>
          </div>
        </div>
      </section>
    </article>
  );
}

const tones: Record<string, { bg: string; ring: string; text: string }> = {
  amber:   { bg: "oklch(0.96 0.06 70)",  ring: "oklch(0.75 0.18 55)",  text: "oklch(0.45 0.15 55)" },
  violet:  { bg: "oklch(0.96 0.04 290)", ring: "oklch(0.65 0.17 290)", text: "oklch(0.42 0.16 290)" },
  rose:    { bg: "oklch(0.96 0.04 20)",  ring: "oklch(0.7 0.17 20)",   text: "oklch(0.48 0.18 20)" },
  emerald: { bg: "oklch(0.96 0.05 160)", ring: "oklch(0.65 0.15 160)", text: "oklch(0.4 0.12 160)" },
};

function Block({
  num, kicker, title, body, icon, tone,
}: {
  num: string; kicker: string; title: React.ReactNode; body: string; icon: string; tone: keyof typeof tones;
}) {
  const t = tones[tone];
  return (
    <div className="group relative grid md:grid-cols-[120px_1fr] gap-6 md:gap-10 py-10 border-b border-ink/10 last:border-0">
      <div className="flex md:flex-col items-center md:items-start gap-4">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-2xl text-3xl shadow-sm transition-transform group-hover:-rotate-3"
          style={{ background: t.bg, boxShadow: `inset 0 0 0 1px ${t.ring}` }}
        >
          <span>{icon}</span>
        </div>
        <div style={serif} className="text-5xl text-ink/20 leading-none">{num}</div>
      </div>
      <div>
        <div
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold"
          style={{ color: t.text }}
        >
          <span className="h-px w-6" style={{ background: t.ring }} />
          {kicker}
        </div>
        <h2 className="mt-3 text-3xl md:text-5xl text-ink leading-[1.05]">{title}</h2>
        <p className="mt-5 text-lg text-body leading-relaxed max-w-2xl">{body}</p>
      </div>
    </div>
  );
}
