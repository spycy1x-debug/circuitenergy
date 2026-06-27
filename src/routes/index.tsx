import { createFileRoute, Link } from "@tanstack/react-router";
import heroAsset from "@/assets/hero-founder.png.asset.json";
const heroImg = heroAsset.url;
import neuralImg from "@/assets/neural-bottle.png";
import nmnImg from "@/assets/nmn-bottle.png";
import {
  Coffee,
  TrendingDown,
  Leaf,
  Pill,
  ShieldCheck,
  ChevronDown,
  Star,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Circuit — Calm Focus All Day. No Jitters. No Crash." },
      {
        name: "description",
        content:
          "Sharp at 9am, useless by 3pm? Circuit is the calm upgrade to coffee — one capsule for steady, all-day focus. 30-day money-back guarantee.",
      },
      { property: "og:title", content: "Circuit — Get Your Afternoon Back" },
      {
        property: "og:description",
        content:
          "The calm, no-crash upgrade to coffee. Clinically-studied ingredients in one capsule a day. 30-day money-back guarantee.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

const faqs = [
  {
    q: "How is this different from another coffee?",
    a: "Coffee spikes you, then drops you. Circuit pairs a low, balanced dose of caffeine with L-Theanine and clinically-studied focus ingredients — so you get calm, steady focus instead of a wired-and-tired crash.",
  },
  {
    q: "Will it make me jittery?",
    a: "No. The caffeine in Circuit is intentionally low and paired with L-Theanine, which is clinically shown to smooth caffeine out. Most people say it feels like clean focus, not a buzz.",
  },
  {
    q: "When will I actually feel it?",
    a: "Most people feel calmer focus in the first few days. The bigger shift — no more 3pm wall — usually settles in within 1–2 weeks of taking it daily.",
  },
  {
    q: "Can I still drink my coffee?",
    a: "Yes. Many customers swap one of their afternoon coffees for Circuit and keep their morning cup. Just keep total caffeine reasonable.",
  },
  {
    q: "What if it doesn't work for me?",
    a: "Try it for 30 days. If you don't feel a real difference, we refund every penny. No forms, no questions.",
  },
  {
    q: "How do I take it?",
    a: "One capsule in the morning with water. That's it. No stack to build, no powder to mix.",
  },
];

function HomePage() {
  return (
    <>
      {/* HERO — problem-aware, one idea, lots of breathing room */}
      <section className="relative isolate overflow-hidden border-b border-border flex items-center min-h-[640px] md:min-h-[720px]">
        <img
          src={heroImg}
          alt="Professional staying focused into the afternoon"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
          loading="eager"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(12,17,23,0.94) 0%, rgba(12,17,23,0.8) 40%, rgba(12,17,23,0.4) 70%, rgba(12,17,23,0.15) 100%)",
          }}
        />
        <div className="container-x relative py-20 md:py-28">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase mb-7 border border-white/15 bg-white/10 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "var(--energy)" }} />
              <span className="text-white/90">The calm upgrade to coffee</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
              Sharp at 9am.
              <br />
              <span
                className="italic"
                style={{
                  background: "var(--gradient-energy)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Useless by 3pm?
              </span>
            </h1>
            <p className="mt-7 text-lg md:text-xl text-white/85 max-w-xl leading-relaxed">
              <strong className="font-semibold text-white">Calm focus all day — no jitters, no crash.</strong> One
              capsule. Your 3rd coffee is lying to you.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/product/$slug"
                params={{ slug: "neural-performance" }}
                className="btn-primary shadow-xl shadow-black/30 inline-flex items-center gap-2"
              >
                Get my afternoon back <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-5 text-xs text-white/65">
              30-day money-back guarantee · Made in USA · Third-party tested
            </p>
          </div>
        </div>
      </section>

      {/* BELIEF 1 — The crash isn't willpower. It's chemistry. */}
      <section className="py-24 md:py-32">
        <div className="container-x max-w-3xl">
          <div className="text-xs font-semibold tracking-[0.22em] uppercase text-muted-foreground mb-5">
            Belief 01 — The problem
          </div>
          <h2 className="text-3xl md:text-5xl leading-[1.1]">
            Your crash isn't a willpower problem.
            <br />
            <span className="text-muted-foreground">It's chemistry.</span>
          </h2>
          <p className="mt-7 text-lg leading-relaxed text-body">
            You're not lazy. You're not getting old. <strong className="text-ink font-semibold">Your brain runs low on focus fuel by the afternoon</strong> — and the more coffee you pour on it, the harder it falls.
          </p>
        </div>
      </section>

      {/* BELIEF 2 — More coffee works against you */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-x grid gap-14 md:grid-cols-2 items-center max-w-6xl">
          <div>
            <div className="text-xs font-semibold tracking-[0.22em] uppercase text-muted-foreground mb-5">
              Belief 02 — Why coffee makes it worse
            </div>
            <h2 className="text-3xl md:text-5xl leading-[1.1]">
              Your 3rd coffee is lying to you.
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-body">
              Caffeine spikes you, then drops you. <strong className="text-ink font-semibold">It all hits at 2pm</strong> — wired and tired, rereading the same email, doing your worst work at your most important hours.
            </p>
          </div>
          <div className="relative">
            <div className="rounded-2xl bg-white border border-border p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Coffee className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-semibold text-ink">Coffee, all day</span>
              </div>
              <CoffeeCurve />
              <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
                Spike. Drop. Spike. Drop. By 3pm you're running on fumes — and tomorrow it starts again.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BELIEF 3 — The calm focus fix */}
      <section className="py-24 md:py-32">
        <div className="container-x max-w-3xl text-center">
          <div className="text-xs font-semibold tracking-[0.22em] uppercase text-muted-foreground mb-5">
            Belief 03 — The fix
          </div>
          <h2 className="text-3xl md:text-5xl leading-[1.1]">
            Calm focus. Steady. All day.
          </h2>
          <p className="mt-7 text-lg leading-relaxed text-body">
            <strong className="text-ink font-semibold">The right ingredients, in the right combination</strong> — not more caffeine. Still sharp at 5pm. Something left for the people who matter.
          </p>
        </div>
      </section>

      {/* BELIEF 4 — Circuit delivers it */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-x max-w-6xl">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-xs font-semibold tracking-[0.22em] uppercase text-muted-foreground mb-5">
              Belief 04 — How Circuit does it
            </div>
            <h2 className="text-3xl md:text-5xl leading-[1.1]">
              Clinically-studied ingredients. One capsule.
            </h2>
            <p className="mt-6 text-lg text-body">
              <strong className="text-ink font-semibold">L-Theanine-balanced caffeine</strong> plus the focus compounds your brain actually uses.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { name: "Alpha-GPC", role: "Sharper focus and recall." },
              { name: "L-Theanine + Caffeine", role: "Calm energy, no jitters, no crash." },
              { name: "Bacopa monnieri", role: "Memory and mental endurance over time." },
              { name: "L-Tyrosine", role: "Holds focus through stress and heavy work." },
              { name: "Phosphatidylserine", role: "Keeps brain cells responsive." },
              { name: "Huperzine A", role: "Preserves the chemistry behind attention." },
            ].map((i) => (
              <div key={i.name} className="rounded-2xl bg-white border border-border p-7">
                <div className="text-base font-display font-bold text-ink">{i.name}</div>
                <p className="mt-2 text-sm text-body leading-relaxed">{i.role}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-muted-foreground">
            Clinically-studied compounds · Third-party tested · Made in USA
          </p>
        </div>
      </section>

      {/* BELIEF 5 — What you'll feel + timeline */}
      <section className="py-24 md:py-32">
        <div className="container-x max-w-4xl">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-[0.22em] uppercase text-muted-foreground mb-5">
              Belief 05 — What you'll feel
            </div>
            <h2 className="text-3xl md:text-5xl leading-[1.1]">
              What users notice.
            </h2>
            <p className="mt-6 text-lg text-body">
              <strong className="text-ink font-semibold">It builds in stages.</strong> No spike, no drama — just a baseline that gets quieter and sharper.
            </p>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              { when: "Days 1–3", note: "Calmer focus. No coffee jitters." },
              { when: "Weeks 1–2", note: "The 3pm wall goes away. Still sharp at 5." },
              { when: "Month 2+", note: "Clear thinking becomes the new normal." },
            ].map((s, i) => (
              <div key={s.when} className="border-l-2 pl-5" style={{ borderColor: "var(--energy)" }}>
                <div className="text-xs font-mono text-muted-foreground mb-2">0{i + 1}</div>
                <div className="font-display text-lg font-bold text-ink">{s.when}</div>
                <p className="mt-2 text-body text-sm leading-relaxed">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS / PROOF — light, one-quote-each, no clutter */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-x max-w-5xl">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl leading-[1.1]">Real people. Real workdays.</h2>
            <div className="mt-5 flex items-center justify-center gap-2 text-sm text-body">
              <div className="flex">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-energy text-energy" />
                ))}
                <Star className="h-4 w-4 fill-energy/40 text-energy" />
              </div>
              <span className="font-semibold">4.8 / 5 · 500+ verified reviews</span>
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                q: "Calm focus, no jitters, no crash. I'm still sharp at 5pm — first time in years.",
                name: "Marcus T., 34",
                role: "Software engineer",
              },
              {
                q: "I used to reread the same email five times after lunch. That's gone. One capsule, done.",
                name: "Sarah K., 42",
                role: "Consultant",
              },
              {
                q: "Replaced my second and third coffee. Way less wired-and-tired. Way more done.",
                name: "Daniel W., 38",
                role: "Founder",
              },
            ].map((t) => (
              <figure key={t.name} className="rounded-2xl bg-white border border-border p-7">
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-energy text-energy" />
                  ))}
                </div>
                <blockquote className="text-body text-base leading-relaxed">"{t.q}"</blockquote>
                <figcaption className="mt-5 text-xs font-semibold text-muted-foreground">
                  — {t.name} · {t.role} · Verified
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ONE-CAPSULE SIMPLICITY */}
      <section className="py-24 md:py-32">
        <div className="container-x grid gap-14 md:grid-cols-2 items-center max-w-6xl">
          <div className="order-2 md:order-1">
            <div className="text-xs font-semibold tracking-[0.22em] uppercase text-muted-foreground mb-5">
              Simple to try
            </div>
            <h2 className="text-3xl md:text-5xl leading-[1.1]">One capsule. That's the routine.</h2>
            <p className="mt-7 text-lg text-body leading-relaxed">
              <strong className="text-ink font-semibold">Take it in the morning with water.</strong> No powders, no stacks, no rituals. Made in USA. Third-party tested.
            </p>
            <div className="mt-8 space-y-3">
              {[
                { icon: Pill, t: "1 capsule, every morning" },
                { icon: Leaf, t: "Clinically-studied ingredients" },
                { icon: ShieldCheck, t: "Third-party tested · Made in USA" },
              ].map((i) => (
                <div key={i.t} className="flex items-center gap-3 text-body">
                  <i.icon className="h-5 w-5 text-energy shrink-0" />
                  <span className="font-medium">{i.t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2 relative bg-secondary rounded-3xl p-10 flex justify-center">
            <img src={neuralImg} alt="Circuit Neural Performance bottle" className="max-h-[460px] object-contain" />
          </div>
        </div>
      </section>

      {/* GUARANTEE — risk reversal */}
      <section className="py-24 md:py-32 bg-ink text-white">
        <div className="container-x max-w-3xl text-center">
          <div className="mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-7" style={{ background: "var(--gradient-energy)" }}>
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-white text-3xl md:text-5xl leading-[1.1]">Try it for 30 days. Risk nothing.</h2>
          <p className="mt-6 text-lg text-white/80 leading-relaxed">
            <strong className="font-semibold text-white">If it doesn't change your afternoon, we refund every penny.</strong> No forms. No questions. Keep the bottle.
          </p>
        </div>
      </section>

      {/* BUNDLES / PRODUCTS — Neural primary, NMN secondary */}
      <section id="products" className="py-24 md:py-32">
        <div className="container-x max-w-6xl">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl leading-[1.1]">Get your afternoon back.</h2>
            <p className="mt-6 text-lg text-body">
              <strong className="text-ink font-semibold">Staying sharp all day is your edge.</strong> Your income. Your evenings.
            </p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <ProductCard
                hero
                slug="neural-performance"
                image={neuralImg}
                title="Circuit Neural Performance"
                subtitle="Calm focus, all day"
                price="$42.99"
                desc="The calm upgrade to coffee. **L-Theanine-balanced caffeine** plus clinically-studied focus ingredients — one capsule, every morning."
                benefits={[
                  "No 3pm crash",
                  "Calm focus, no jitters",
                  "Still sharp at 5pm",
                  "One capsule a day",
                ]}
                cta="Get my afternoon back"
              />
            </div>
            <ProductCard
              slug="nmn"
              image={nmnImg}
              title="Circuit NMN"
              subtitle="Cellular energy support"
              price="$49.99"
              desc="A foundational add-on for cellular energy and healthy aging. **Optional** — start with Neural Performance."
              benefits={["Supports cellular energy", "Daily NAD+ support", "One capsule a day"]}
              cta="View NMN"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-x max-w-3xl">
          <h2 className="text-3xl md:text-5xl text-center leading-[1.1]">Questions, answered.</h2>
          <div className="mt-12 space-y-3">
            {faqs.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* EMAIL */}
      <section className="bg-ink text-white py-20">
        <div className="container-x max-w-2xl text-center">
          <h2 className="text-white text-2xl md:text-4xl leading-[1.1]">Stay sharp.</h2>
          <p className="mt-4 text-white/70">
            Short, useful notes on focus, energy, and getting more out of your workday.
          </p>
          <KlaviyoInlineForm />
          <p className="mt-4 text-xs text-white/50">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  );
}

function CoffeeCurve() {
  // Simple inline SVG showing spike-and-crash pattern
  return (
    <svg viewBox="0 0 320 140" className="w-full h-auto" role="img" aria-label="Coffee spike-and-crash energy pattern">
      <defs>
        <linearGradient id="coffeeFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--energy)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--energy)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="110" x2="320" y2="110" stroke="currentColor" strokeOpacity="0.1" />
      <path
        d="M0,110 C20,108 30,40 60,40 C90,40 95,115 130,115 C160,115 170,55 200,55 C230,55 235,120 270,120 C295,120 305,100 320,98 L320,140 L0,140 Z"
        fill="url(#coffeeFill)"
      />
      <path
        d="M0,110 C20,108 30,40 60,40 C90,40 95,115 130,115 C160,115 170,55 200,55 C230,55 235,120 270,120 C295,120 305,100 320,98"
        fill="none"
        stroke="var(--energy)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <g className="text-[10px] fill-current text-muted-foreground" style={{ font: "10px var(--font-sans)" }}>
        <text x="0" y="135">9am</text>
        <text x="148" y="135">1pm</text>
        <text x="298" y="135">5pm</text>
      </g>
      {/* crash marker */}
      <g transform="translate(130,115)">
        <circle r="4" fill="var(--destructive)" />
        <text x="8" y="4" className="fill-current" style={{ font: "600 11px var(--font-sans)", fill: "var(--destructive)" }}>
          crash
        </text>
      </g>
    </svg>
  );
}

function KlaviyoInlineForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/public/klaviyo-subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setMessage("You're on the list — check your inbox shortly.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <>
      <form className="mt-7 flex flex-col sm:flex-row gap-3 justify-center" onSubmit={onSubmit} noValidate>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={255}
          placeholder="you@example.com"
          autoComplete="email"
          className="flex-1 max-w-sm rounded-md bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === "success" ? "Subscribed" : status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {status === "error" && <p className="mt-3 text-sm text-[oklch(0.78_0.16_30)]">{message}</p>}
      {status === "success" && <p className="mt-3 text-sm text-[oklch(0.85_0.15_150)]">{message}</p>}
    </>
  );
}

function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-ink">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function ProductCard(props: {
  hero?: boolean;
  slug: string;
  image: string;
  title: string;
  subtitle: string;
  price: string;
  desc: string;
  benefits: string[];
  cta: string;
}) {
  return (
    <div
      className={`group relative rounded-3xl bg-white overflow-hidden border ${props.hero ? "border-ink/15 shadow-xl" : "border-border shadow-sm"} p-8 flex flex-col transition-all duration-300 hover:shadow-2xl`}
    >
      {props.hero && (
        <div
          className="absolute top-5 right-5 z-10 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] font-bold px-3 py-1.5 rounded-full text-white shadow-lg"
          style={{ background: "var(--gradient-energy)" }}
        >
          Start here
        </div>
      )}
      <div className="relative aspect-square rounded-2xl mb-6 overflow-hidden ring-1 ring-border bg-secondary">
        <img
          src={props.image}
          alt={props.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="relative">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-bold">{props.subtitle}</div>
        <h3 className="text-2xl md:text-3xl mt-1.5 leading-tight">{props.title}</h3>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <span className="text-3xl font-display font-bold text-ink">{props.price}</span>
          <span className="text-sm text-muted-foreground">/ bottle</span>
        </div>
        <p className="mt-4 text-body text-sm leading-relaxed">{renderBold(props.desc)}</p>
        <ul className="mt-5 space-y-2">
          {props.benefits.map((b) => (
            <li key={b} className="flex items-center gap-2.5 text-sm text-body font-medium">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-energy shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto pt-7 relative">
        <Link
          to="/product/$slug"
          params={{ slug: props.slug }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: props.hero ? "var(--gradient-energy)" : "var(--ink)",
          }}
        >
          {props.cta} <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="mt-3 text-xs text-muted-foreground text-center">30-day money-back guarantee</p>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-xl bg-white border overflow-hidden transition-all duration-300 ${open ? "border-ink/20 shadow-sm" : "border-border hover:border-ink/15"}`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className="font-display font-semibold text-ink">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 transition-all duration-300 ${open ? "rotate-180 text-ink" : "text-muted-foreground"}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-body text-sm leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

// keep symbol referenced to avoid tree-shake warnings on unused decorative icons
void TrendingDown;
