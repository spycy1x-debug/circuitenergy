import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import stripsBox from "@/assets/strips-box-marble.png.asset.json";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Seralie Whitening Strips" },
      { name: "description", content: "Shop Seralie purple color-correcting whitening strips — camera-ready in 30 minutes, whiter over time." },
      { property: "og:title", content: "Shop — Seralie Whitening Strips" },
      { property: "og:description", content: "Makeup for your teeth. Beauty, down to your smile." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <>
      <section className="bg-[#FAF6F0]">
        <div className="container-x pt-16 pb-10 md:pt-24 md:pb-14 text-center max-w-2xl mx-auto">
          <div className="eyebrow">The Collection</div>
          <h1 className="mt-5 font-display text-5xl md:text-6xl text-[#2E2528]">Shop <span className="italic text-[#5B3A6E]">Seralie</span></h1>
          <p className="mt-6 text-[15px] leading-8 text-[#5A4A52]">
            Purple color-correcting whitening strips. Instantly brighter, whiter over time.
          </p>
        </div>
      </section>

      <section className="bg-[#FAF6F0]">
        <div className="container-x pb-24 md:pb-32">
          <div className="max-w-3xl mx-auto">
            <Link to="/strips" className="group block">
              <div className="aspect-[4/5] bg-[#F5E9EE] overflow-hidden rounded-2xl">
                <img src={stripsBox.url} alt="Seralie Purple Whitening Strips" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="mt-8 text-center">
                <div className="eyebrow text-[#5B3A6E]">Makeup For Your Teeth</div>
                <h2 className="mt-3 font-display text-4xl md:text-5xl text-[#2E2528]">Whitening Strips</h2>
                <div className="mt-3 flex items-center justify-center gap-2 text-[11px] tracking-[0.18em] text-[#6B5D62]">
                  <div className="flex gap-0.5 text-[#5B3A6E]">
                    {[0,1,2,3,4].map(i => <Star key={i} className="h-3 w-3 fill-current" />)}
                  </div>
                  <span>4.7 · 2,000+ reviews</span>
                </div>
                <p className="mt-4 font-display text-2xl italic text-[#5A4A52]">From $31.99</p>
                <span
                  className="inline-flex items-center justify-center mt-6 px-8 py-3 rounded-full text-[11px] uppercase tracking-[0.24em] font-medium border transition-colors group-hover:bg-[#5B3A6E] group-hover:text-white"
                  style={{ color: "#5B3A6E", borderColor: "#5B3A6E" }}
                >
                  Brighten My Smile
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
