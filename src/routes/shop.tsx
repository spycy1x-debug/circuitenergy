import { createFileRoute, Link } from "@tanstack/react-router";
import { GALLERY } from "@/lib/gallery";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Seralie NOURISH™" },
      {
        name: "description",
        content:
          "Shop NOURISH™ — digestive support and daily essentials in one capsule. Free US shipping and a 60-day money-back guarantee.",
      },
      { property: "og:title", content: "Shop — Seralie NOURISH™" },
      {
        property: "og:description",
        content: "Digestive support and daily essentials in one capsule.",
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
  return (
    <section className="container-x py-14 md:py-20">
      <div className="eyebrow">Shop</div>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">Everything we make</h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-[color:var(--muted-foreground)]">
        One formula, done properly.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <Link to="/nourish" className="group block">
          <div className="overflow-hidden border border-[color:var(--border)] bg-white">
            <img
              src={GALLERY[0]!.url}
              alt={GALLERY[0]!.alt}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
          <h2 className="mt-5 font-display text-2xl">NOURISH™</h2>
          <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
            Digestive Support + Daily Essentials · 60 capsules
          </p>
          <span className="mt-3 inline-block caps-label text-[color:var(--navy)]">View product</span>
        </Link>
      </div>
    </section>
  );
}
