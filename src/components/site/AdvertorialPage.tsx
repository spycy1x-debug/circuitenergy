import { Link } from "@tanstack/react-router";
import { Label, serif, SilkShell } from "@/components/site/Silk";

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


export function AdvertorialPage({ headline, image, imageAlt, story, ctaLabels }: AdvertorialPageProps) {
  const paragraphs = story
    .replaceAll(/https:\/\/seralie\.com\/silkbrush-3\/?/g, "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const firstBreak = Math.max(1, Math.ceil(paragraphs.length * 0.2));

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