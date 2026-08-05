import { createFileRoute, Link } from "@tanstack/react-router";
import { PhotoSlot } from "@/components/site/PhotoSlot";
import { PRODUCT_TITLE } from "@/lib/product-config";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Seralie Keepsake Jewellery" },
      {
        name: "description",
        content: "Shop Seralie keepsake jewellery — photo-engraved pendants made to order in gold, silver, and rose gold.",
      },
      { property: "og:title", content: "Shop — Seralie Keepsake Jewellery" },
      { property: "og:description", content: "Photo-engraved pendants, made to order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <section className="container-x py-16 md:py-24">
      <div className="max-w-xl">
        <div className="eyebrow">The collection</div>
        <h1 className="mt-4 font-display text-4xl md:text-5xl">Shop</h1>
        <p className="mt-5 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
          Each piece is engraved to order from a photo you send us. New pieces are added slowly.
        </p>
      </div>

      <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <Link to="/necklace" className="group block">
          <PhotoSlot label="Photo Necklace — product image" ratio="4/5" className="transition-opacity group-hover:opacity-90" />
          <h2 className="mt-5 font-display text-2xl">{PRODUCT_TITLE}</h2>
          <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">Gold · Silver · Rose Gold</p>
          <p className="mt-3 caps-label text-[color:var(--charcoal)]">Configure →</p>
        </Link>

        <div className="border border-dashed border-[color:var(--sand-deep)] p-10 flex flex-col justify-center text-center">
          <div className="eyebrow">Coming next</div>
          <p className="mt-4 font-display text-2xl">Portrait pieces</p>
          <p className="mt-3 text-sm leading-7 text-[color:var(--muted-foreground)]">
            The same engraving, made for the people you love.
          </p>
          <Link to="/account" className="btn-outline mt-7 self-center">
            Be told first
          </Link>
        </div>

        <div className="hidden lg:flex flex-col justify-end">
          <PhotoSlot label="Editorial still life" ratio="4/5" />
        </div>
      </div>
    </section>
  );
}
