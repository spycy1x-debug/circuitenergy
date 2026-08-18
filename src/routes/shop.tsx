import { createFileRoute, Link } from "@tanstack/react-router";
import { PATCH_GALLERY } from "@/components/site/PatchPage";
import { PRODUCT_TITLE, PRODUCT_SUBTITLE } from "@/lib/patch-config";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Seralie LED Pimple Patches" },
      {
        name: "description",
        content:
          "Shop Seralie LED pimple patches — hydrocolloid plus red and blue light, worn overnight. Free shipping over $40 and a 60-day money-back guarantee.",
      },
      { property: "og:title", content: "Shop — Seralie LED Pimple Patches" },
      {
        property: "og:description",
        content: "Hydrocolloid absorbs it. Red and blue light treat it. Overnight.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://seralie.com/shop" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://seralie.com/shop" }],
  }),
  component: ShopPage,
});

function ShopPage() {
  const hero = PATCH_GALLERY[0]!;
  return (
    <section className="container-x py-14 md:py-20">
      <div className="eyebrow">Shop</div>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">Everything we make</h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-[color:var(--muted-foreground)]">
        One product, done properly.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <Link to="/patches" className="group block">
          <div className="overflow-hidden border border-[color:var(--border)] bg-white">
            <img
              src={hero.src}
              alt={hero.alt}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
          <h2 className="mt-5 font-display text-2xl">{PRODUCT_TITLE}</h2>
          <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
            {PRODUCT_SUBTITLE} · 60 patches
          </p>
          <span className="mt-3 inline-block caps-label text-[color:var(--navy)]">View product</span>
        </Link>
      </div>
    </section>
  );
}
