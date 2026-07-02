import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import nmnBottle from "@/assets/nmn-new-1.jpeg.asset.json";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Seralie NMN" },
      { name: "description", content: "Shop Seralie NMN — 500 mg pure β-NMN for radiance, cellular energy, and healthy aging." },
      { property: "og:title", content: "Shop — Seralie NMN" },
      { property: "og:description", content: "Beauty and healthy aging, from within. Shop the ritual." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <>
      <section className="bg-[#FDF8EE]">
        <div className="container-x pt-16 pb-10 md:pt-24 md:pb-14 text-center max-w-2xl mx-auto">
          <div className="eyebrow">The Collection</div>
          <h1 className="mt-5 font-display text-5xl md:text-6xl text-[#3B2E25]">Shop <span className="italic text-[#AD9752]">Seralie</span></h1>
          <p className="mt-6 text-[15px] leading-8 text-[#5A483C]">
            A considered ritual for radiance, cellular energy, and healthy aging.
          </p>
        </div>
      </section>

      <section className="bg-[#FDF8EE]">
        <div className="container-x pb-24 md:pb-32">
          <div className="max-w-3xl mx-auto">
            <Link to="/product/$slug" params={{ slug: "nmn" }} className="group block">
              <div className="aspect-[4/5] bg-[#F7EFDF] overflow-hidden">
                <img src={nmnBottle.url} alt="Seralie NMN" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="mt-8 text-center">
                <div className="eyebrow text-[#AD9752]">Beauty & Longevity</div>
                <h2 className="mt-3 font-display text-4xl md:text-5xl text-[#3B2E25]">Seralie NMN</h2>
                <div className="mt-3 flex items-center justify-center gap-2 text-[11px] tracking-[0.18em] text-[#7A6A5E]">
                  <div className="flex gap-0.5 text-[#AD9752]">
                    {[0,1,2,3,4].map(i => <Star key={i} className="h-3 w-3 fill-current" />)}
                  </div>
                  <span>4.8 · 400+ reviews</span>
                </div>
                <p className="mt-4 font-display text-2xl italic text-[#5A483C]">$42.99</p>
                <span className="btn-gold-ghost mt-6">Discover the Ritual</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
