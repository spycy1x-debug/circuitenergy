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
    <div className="my-10 flex justify-center">
      <Link
        to="/silkbrush-3"
        className="inline-flex min-h-16 w-full items-center justify-center gap-3 bg-[color:var(--cw-ink)] px-8 py-5 text-center text-[14px] font-bold uppercase tracking-[0.2em] text-[color:var(--cw-bg)] shadow-[0_18px_38px_-14px_rgba(23,23,23,0.6)] ring-2 ring-[color:var(--cw-brand-deep)]/60 ring-offset-4 ring-offset-[color:var(--cw-bg)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_46px_-14px_rgba(23,23,23,0.7)] active:translate-y-0 sm:w-auto sm:min-w-[22rem]"
      >
        {children}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-[color:var(--cw-brand-deep)]">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
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
          <h1 style={serif} className="mx-auto max-w-[18ch] text-[38px] leading-[1.06] sm:text-[52px]">
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