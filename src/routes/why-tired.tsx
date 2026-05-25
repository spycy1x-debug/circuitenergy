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

function WhyTiredPage() {
  return (
    <article className="container-x py-16 max-w-3xl">
      <h1 className="text-4xl md:text-5xl">Why You're Tired (And It's Not What You Think)</h1>
      <p className="mt-5 text-lg text-body">It's not laziness. It's not stress. It's chemistry — and once you understand it, the fix becomes obvious.</p>

      <div className="mt-10 space-y-8 text-body leading-relaxed">
        <section>
          <h2 className="text-2xl mb-3">Your mitochondria are running on empty.</h2>
          <p>By age 40, your NAD+ levels have dropped by roughly 50%. NAD+ is the molecule every cell in your body uses to turn food into usable energy. When it declines, your mitochondria slow down — and you feel it as fatigue, brain fog, and the dreaded 2pm crash.</p>
        </section>
        <section>
          <h2 className="text-2xl mb-3">Your neurotransmitters are depleted.</h2>
          <p>Acetylcholine drives focus and memory. Dopamine drives motivation. Stress, age, and modern life burn through both faster than your body can rebuild them. The result: scattered thinking, poor recall, an inability to focus for more than 20 minutes.</p>
        </section>
        <section>
          <h2 className="text-2xl mb-3">Caffeine isn't the answer.</h2>
          <p>Stimulants borrow energy from tomorrow. They don't restore the underlying systems — they just mask the symptoms until they wear off. That's why coffee stopped working.</p>
        </section>
        <section>
          <h2 className="text-2xl mb-3">The actual fix.</h2>
          <p>Restore NAD+ at the cellular level with NMN. Replenish neurotransmitters with Alpha GPC, Huperzine A, Bacopa monnieri, L-Theanine, and L-Tyrosine. Together, they tackle both sides of the problem — energy and cognition.</p>
        </section>
      </div>

      <div className="mt-12 rounded-2xl bg-secondary p-8 text-center">
        <h2 className="text-2xl">Ready to fix it?</h2>
        <p className="mt-3 text-body">Start with Neural Performance for focus, NMN for cellular energy, or stack both.</p>
        <Link to="/shop" className="btn-primary mt-6">Shop Circuit</Link>
      </div>
    </article>
  );
}
