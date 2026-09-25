import { Link } from "@tanstack/react-router";
import { Label, P, serif, SilkShell } from "@/components/site/Silk";

type AdvertorialPageProps = {
  headline: string;
  image: string;
  imageAlt: string;
  story: string;
  ctaLabels: [string, string, string];
};

function StoryCta({ children }: { children: string }) {
  return (
    <div className="my-9 flex justify-center">
      <Link
        to="/silkbrush-3"
        className="inline-flex min-h-14 w-full items-center justify-center bg-[color:var(--cw-ink)] px-6 py-4 text-center text-[12px] font-bold uppercase tracking-[0.16em] text-[color:var(--cw-bg)] transition hover:opacity-85 sm:w-auto sm:min-w-80"
      >
        {children}
      </Link>
    </div>
  );
}

function MechanismSection() {
  return (
    <aside className="my-11 border-y border-[color:var(--cw-line)] bg-[color:var(--cw-surface)] px-5 py-8 sm:px-8">
      <Label>Why the bristles matter</Label>
      <h2 style={serif} className="mt-3 text-[26px] leading-tight sm:text-[31px]">
        How the <P>premium boar bristles</P> help smooth difficult hair
      </h2>
      <ul className="mt-6 grid gap-5 text-[15px] leading-7 text-[color:var(--cw-muted)]">
        <li><P>Distribute natural oils:</P> The bristles help move oils from the scalp through the lengths, helping dry-looking areas appear shinier and more polished.</li>
        <li><P>Smooth the surface:</P> Dense bristles pass over the outer surface of the hair, helping lay down flyaways and create a sleeker, more controlled appearance.</li>
        <li><P>Work section by section:</P> Brushing smaller sections from root to end gives the bristles more contact with uneven, frizzy areas that need attention.</li>
        <li><P>No added heat required:</P> SilkBrush™ creates a smoother, straighter-looking finish through brushing rather than functioning as a heated straightener.</li>
      </ul>
      <p className="mt-5 text-[12px] leading-6 text-[color:var(--cw-muted)]">
        Results vary by hair type, texture, and humidity. SilkBrush™ is not a chemical or permanent straightening treatment.
      </p>
    </aside>
  );
}

export function AdvertorialPage({ headline, image, imageAlt, story, ctaLabels }: AdvertorialPageProps) {
  const paragraphs = story
    .replaceAll(/https:\/\/seralie\.com\/silkbrush-3\/?/g, "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const firstBreak = Math.max(1, Math.ceil(paragraphs.length * 0.2));
  const mechanismBreak = Math.max(firstBreak + 1, Math.ceil(paragraphs.length * 0.56));

  return (
    <SilkShell>
      <article className="mx-auto max-w-[760px] px-5 py-10 sm:px-8 md:py-16">
        <div className="text-center">
          <Label>Advertorial · Seralie Haircare</Label>
          <h1 style={serif} className="mx-auto mt-4 max-w-[18ch] text-[38px] leading-[1.06] sm:text-[52px]">
            {headline}
          </h1>
        </div>

        <figure className="mt-8 overflow-hidden border border-[color:var(--cw-line)] bg-[color:var(--cw-surface)]">
          <img src={image} alt={imageAlt} className="max-h-[760px] w-full object-cover object-top" fetchPriority="high" />
        </figure>

        <StoryCta>{ctaLabels[0]}</StoryCta>

        <div className="text-[17px] leading-[1.9] text-[color:var(--cw-ink)] sm:text-[18px]">
          {paragraphs.map((paragraph, index) => (
            <div key={`${index}-${paragraph.slice(0, 24)}`}>
              <p className="mb-5 whitespace-pre-line">{paragraph}</p>
              {index + 1 === firstBreak && <StoryCta>{ctaLabels[1]}</StoryCta>}
              {index + 1 === mechanismBreak && <MechanismSection />}
            </div>
          ))}
        </div>

        <StoryCta>{ctaLabels[2]}</StoryCta>
        <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--cw-brand-deep)]">
          <span>Free shipping</span>
          <span>365-day money-back guarantee</span>
          <span>Secure checkout</span>
        </div>
      </article>
    </SilkShell>
  );
}