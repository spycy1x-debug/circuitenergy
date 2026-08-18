import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Seralie" },
      {
        name: "description",
        content:
          "How Seralie handles your information when you order LED pimple patches or join our email list, including storage and deletion on request.",
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
              When you place an order we collect your name, email, shipping address and order details. Payment is
              processed by Shopify; we never see or store your card details.
            </p>
            <p>
              If you join our email list we collect your email address and, optionally, your first name.
            </p>
          </Section>

          <Section title="How we use your information">
            <p>
              To process and deliver your order, manage subscription renewals, send shipping updates, answer
              support requests, handle refunds, and — only if you opted in — send marketing emails.
            </p>
          </Section>

          <Section title="Who we share it with">
            <p>
              Only the services required to run the store: Shopify (orders, subscriptions and payment), our email
              provider, shipping carriers, and our US fulfilment facility.
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
              We use cookies to keep your cart intact between visits and to measure how the site is used. You can
              block cookies in your browser; the cart may not persist if you do.
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
