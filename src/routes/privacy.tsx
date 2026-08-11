import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Seralie" },
      {
        name: "description",
        content:
          "How Seralie handles your information when you order NOURISH™ or join our email list, including storage and deletion on request.",
      },
      { property: "og:title", content: "Privacy Policy — Seralie" },
      { property: "og:description", content: "How we handle your data and your rights over it." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://seralie.com/privacy" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://seralie.com/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <section className="container-x py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="eyebrow">Legal</div>
        <h1 className="mt-4 font-display text-4xl md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-xs text-[color:var(--muted-foreground)]">
          Last updated {new Date().getFullYear()}
        </p>

        <div className="mt-12 space-y-10">
          <Section title="What we collect">
            <p>
              When you place an order we collect your name, email, shipping address, order details, and the photos
              and engraving text you upload. Payment is processed by Shopify; we never see or store your card
              details.
            </p>
            <p>
              If you join our email list we collect your email address and, optionally, your first name.
            </p>
          </Section>

          <Section title="The photos you upload">
            <p>
              Photos you upload are used for one purpose: to create your digital proof and engrave your piece. We
              do not sell them, license them, or use them in advertising, and we will never publish a photo of
              your pet or family without asking you first in writing.
            </p>
            <p>
              Uploaded photos are stored in a private, access-controlled cloud storage bucket. Each file is
              reachable only through an expiring private link attached to your order — files are not publicly
              browsable or indexed by search engines.
            </p>
            <p>
              We keep your photo for up to 12 months after your order so we can remake your piece if something
              goes wrong. After that it is deleted automatically.
            </p>
            <p>
              <strong className="font-medium text-[color:var(--charcoal)]">Deletion on request:</strong> email
              support@seralie.com from the address on your order and we will permanently delete your uploaded
              photos, and confirm it, within 30 days. You can ask for this at any time, including before your
              order ships (though we can't engrave without a photo).
            </p>
          </Section>

          <Section title="How we use your information">
            <p>
              To produce and deliver your order, send proofs and shipping updates, answer support requests, handle
              refunds, and — only if you opted in — send marketing emails.
            </p>
          </Section>

          <Section title="Who we share it with">
            <p>
              Only the services required to run the store: Shopify (orders and payment), our cloud storage
              provider (uploaded photos), our email provider (order and marketing emails), shipping carriers, and
              our engraving partner, who receives your photo and engraving text solely to produce your piece.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              You can ask us for a copy of the data we hold about you, ask us to correct it, or ask us to delete
              it. Email support@seralie.com and we will respond within 30 days.
            </p>
          </Section>

          <Section title="Cookies and analytics">
            <p>
              We use cookies to keep your bag intact between visits and to measure how the site is used. You can
              block cookies in your browser; the bag may not persist if you do.
            </p>
          </Section>

          <Section title="Contact">
            <p>Questions about this policy: support@seralie.com.</p>
          </Section>
        </div>
      </div>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-[color:var(--muted-foreground)]">{children}</div>
    </div>
  );
}
