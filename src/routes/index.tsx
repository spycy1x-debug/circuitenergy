import { createFileRoute, Link } from "@tanstack/react-router";
import { PhotoSlot } from "@/components/site/PhotoSlot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Seralie — Keepsake Jewellery, Made From Your Photos" },
      {
        name: "description",
        content:
          "Fine jewellery engraved with the ones you love. Upload a photo, approve your digital proof, and we engrave it by hand-finished laser.",
      },
      { property: "og:title", content: "Seralie — Keepsake Jewellery, Made From Your Photos" },
      {
        property: "og:description",
        content: "Upload a photo, approve your digital proof, and we engrave. Quiet, wearable keepsakes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="container-x pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <h1 className="font-display text-4xl leading-[1.15] md:text-6xl md:leading-[1.1]">
              Keep them close.
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-8 text-[color:var(--muted-foreground)]">
              A pendant engraved with their portrait — quiet enough to wear every day.
            </p>
            <Link to="/necklace" className="btn-primary mt-9">
              Begin a keepsake
            </Link>
          </div>
          <div className="order-1 lg:order-2">
            <PhotoSlot
              label="Woman wearing an engraved Seralie pendant beside a framed photo of her dog"
              ratio="4/5"
              src={heroImg.url}
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-[color:var(--border)] bg-white">
        <div className="container-x py-16 md:py-24">
          <div className="max-w-xl">
            <div className="eyebrow">How it works</div>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">Three steps, no guesswork.</h2>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              { n: "01", t: "Upload a photo", d: "Any clear photo from your phone works." },
              { n: "02", t: "Approve your proof", d: "We send a digital proof within 48 hours. Nothing is engraved until you say yes." },
              { n: "03", t: "We engrave", d: "Hand-finished and shipped in 5–9 business days." },
            ].map((s) => (
              <div key={s.n}>
                <div className="font-display text-xl text-[color:var(--gold)]">{s.n}</div>
                <h3 className="mt-3 font-display text-2xl">{s.t}</h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted-foreground)]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand statement */}
      <section className="container-x py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-2xl leading-[1.6] md:text-3xl md:leading-[1.55]">
            Seralie makes keepsakes out of the ones you love — made to order, made to be worn for years, and
            made to look like jewellery first.
          </p>
        </div>
      </section>

      {/* Proof strip */}
      <section className="border-y border-[color:var(--border)] bg-[color:var(--sand)]/40">
        <div className="container-x py-14 grid gap-8 sm:grid-cols-3 text-center">
          {[
            { t: "Digital proof first", d: "You approve the engraving before we make it." },
            { t: "Made to order", d: "Each piece is engraved for one photo only." },
            { t: "30-day guarantee", d: "Wrong or not right? We remake it or refund you." },
          ].map((p) => (
            <div key={p.t}>
              <div className="font-display text-xl">{p.t}</div>
              <p className="mt-2 text-sm leading-7 text-[color:var(--muted-foreground)]">{p.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
