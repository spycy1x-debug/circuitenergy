import { GUARANTEE_DAYS } from "@/lib/product-config";

export function GuaranteeBand() {
  return (
    <section className="bg-[color:var(--navy)] text-[color:var(--ivory)]">
      <div className="container-x max-w-2xl py-16 md:py-20 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-[color:var(--gold)]">
          <span className="font-display text-2xl text-[color:var(--gold)]">{GUARANTEE_DAYS}</span>
        </div>
        <div className="mt-6 caps-label text-[color:var(--gold)]">Feel the difference</div>
        <h2 className="mt-3 font-display text-3xl md:text-4xl text-[color:var(--ivory)]">
          {GUARANTEE_DAYS}-day money-back guarantee
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[color:var(--ivory)]/75">
          Give it 6–8 weeks — that is how long it usually takes to know. If you do not notice a
          difference within {GUARANTEE_DAYS} days, return your order and we refund you in full.
        </p>
      </div>
    </section>
  );
}
