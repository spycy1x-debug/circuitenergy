import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Circuit Energy" },
      { name: "description", content: "How Circuit Energy collects, uses, and protects your personal information, including order details, email subscriptions, and website usage data." },
      { property: "og:title", content: "Privacy Policy — Circuit Energy" },
      { property: "og:description", content: "Learn how Circuit Energy handles your personal information, marketing communications, cookies, and your privacy rights." },
    ],
  }),
  component: PrivacyPage,
});

const serif = { fontFamily: '"Instrument Serif", Georgia, serif' };
const EFFECTIVE = "June 1, 2026";

function PrivacyPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[oklch(0.15_0.03_245)] text-white">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, oklch(0.6 0.18 200 / 0.5), transparent 55%), radial-gradient(ellipse at 10% 90%, oklch(0.55 0.18 30 / 0.5), transparent 50%), linear-gradient(135deg, oklch(0.18 0.05 250), oklch(0.12 0.04 245))",
          }}
        />
        <div className="container-x py-16 md:py-20 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur">
            Legal
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl leading-[0.95] text-white">
            Privacy <em style={serif} className="italic font-normal text-[oklch(0.85_0.15_200)]">Policy</em>.
          </h1>
          <p className="mt-4 text-white/70">Effective {EFFECTIVE}</p>
        </div>
      </section>

      {/* BODY */}
      <section className="container-x py-14 md:py-20 max-w-3xl">
        <div className="prose-style space-y-10 text-body">
          <Intro />
          <Block n="1" title="Who We Are">
            <p>
              Circuit Energy ("Circuit," "we," "us," or "our") sells dietary supplements — including Circuit Neural Performance and Circuit NMN — direct to consumers through circuitenergy.co (the "Site"). This Privacy Policy explains what information we collect from visitors and customers, how we use it, who we share it with, and the choices you have. By using the Site or purchasing our products, you agree to the practices described below.
            </p>
            <p>Contact: <a className="text-primary underline" href="mailto:support@circuitenergy.co">support@circuitenergy.co</a></p>
          </Block>

          <Block n="2" title="Information We Collect">
            <p>We only collect information that helps us fulfill orders, run our store, comply with the law, and improve your experience. Specifically:</p>
            <ul>
              <li><strong>Order information:</strong> name, shipping and billing address, email address, phone number, and the products you purchase.</li>
              <li><strong>Payment information:</strong> processed directly by our PCI-compliant payment processors (such as Shopify Payments, Stripe, PayPal, or Shop Pay). We do not store full card numbers on our servers.</li>
              <li><strong>Account information:</strong> if you create an account, your login credentials and order history.</li>
              <li><strong>Email subscriptions:</strong> the email address you submit to our newsletter, welcome offer, or back-in-stock forms, along with the consent timestamp and source.</li>
              <li><strong>Customer service messages:</strong> the content of emails, contact-form submissions, and reviews you send us.</li>
              <li><strong>Device & usage data:</strong> IP address, browser type, device identifiers, referring URL, pages viewed, and timestamps, collected automatically through cookies, pixels, and similar technologies.</li>
            </ul>
            <p><strong>We do not knowingly collect personal information from children under 16.</strong> Our products are not sold to or intended for minors.</p>
          </Block>

          <Block n="3" title="How We Use Your Information">
            <p>We use the information above for the following purposes, each of which has a lawful basis (contract performance, our legitimate business interests, your consent, or a legal obligation):</p>
            <ul>
              <li>Process, ship, and confirm your orders, including sending transactional emails (order confirmations, shipping updates, returns).</li>
              <li>Provide customer support and respond to your inquiries.</li>
              <li>Send marketing emails about new products, promotions, restocks, and educational content — only if you opt in. You can unsubscribe at any time.</li>
              <li>Detect, prevent, and investigate fraud, chargebacks, and abuse of the Site.</li>
              <li>Improve our products, formulas, content, and user experience through analytics.</li>
              <li>Comply with applicable laws, including tax, accounting, FDA, FTC, and consumer-protection regulations.</li>
            </ul>
          </Block>

          <Block n="4" title="Email Marketing — Lawful Basis & Consent">
            <p>When you enter your email into one of our forms (e.g., the welcome discount popup, footer signup, or checkout opt-in), you are giving express consent to receive marketing emails from Circuit Energy. We retain a record of when and where that consent was given. Every marketing email we send includes a one-click unsubscribe link, and we honor opt-out requests promptly in accordance with the U.S. <strong>CAN-SPAM Act</strong>, Canada's <strong>CASL</strong>, the EU/UK <strong>GDPR</strong> and the <strong>ePrivacy Directive</strong>, and other applicable laws. Withdrawing consent does not affect the lawfulness of processing before withdrawal.</p>
          </Block>

          <Block n="5" title="Cookies and Tracking Technologies">
            <p>We use first- and third-party cookies, pixels, and SDKs to operate the Site, remember your cart, measure performance, and personalize advertising. Categories include:</p>
            <ul>
              <li><strong>Strictly necessary</strong> — required for checkout, login, and security.</li>
              <li><strong>Analytics</strong> — e.g., Shopify Analytics, Google Analytics, to understand traffic and improve the Site.</li>
              <li><strong>Advertising</strong> — e.g., Meta Pixel, TikTok Pixel, Google Ads, to measure ad performance and show relevant ads.</li>
            </ul>
            <p>You can control cookies through your browser settings and opt out of interest-based advertising via tools like the Digital Advertising Alliance (optout.aboutads.info) or the Network Advertising Initiative (optout.networkadvertising.org). Disabling cookies may break parts of the Site, including checkout.</p>
          </Block>

          <Block n="6" title="Service Providers We Share Data With">
            <p>We share personal information only with vendors that need it to provide services to us, under contracts that require them to safeguard it. These include:</p>
            <ul>
              <li><strong>E-commerce platform & checkout:</strong> Shopify.</li>
              <li><strong>Payment processing:</strong> Shopify Payments, Stripe, PayPal, Shop Pay.</li>
              <li><strong>Email & SMS marketing:</strong> Klaviyo (or equivalent).</li>
              <li><strong>Shipping & fulfillment:</strong> our 3PL partners and carriers (USPS, UPS, FedEx, DHL).</li>
              <li><strong>Analytics & advertising:</strong> Google, Meta, TikTok, and similar networks.</li>
              <li><strong>Hosting & infrastructure:</strong> Cloudflare and Supabase.</li>
              <li><strong>Customer support tools and lab-testing partners</strong> as needed.</li>
            </ul>
            <p>We never sell your personal information for money. We may share limited identifiers with advertising partners for targeted advertising; under California law this may be considered a "sale" or "sharing." You can opt out — see Section 9.</p>
          </Block>

          <Block n="7" title="How Long We Keep Your Information">
            <p>We retain order, tax, and accounting records for the period required by law (typically up to 7 years). Marketing data is retained until you unsubscribe or request deletion. Support tickets are retained for up to 3 years for quality assurance.</p>
          </Block>

          <Block n="8" title="Data Security">
            <p>Circuit uses industry-standard administrative, technical, and physical safeguards — including HTTPS/TLS encryption, access controls, and reputable infrastructure providers — to protect personal information. No method of transmission over the internet is 100% secure, but we work continuously to protect your data.</p>
          </Block>

          <Block n="9" title="Your Privacy Rights">
            <p>Depending on where you live, you may have the following rights:</p>
            <ul>
              <li><strong>Access</strong> — request a copy of the personal information we hold about you.</li>
              <li><strong>Correction</strong> — ask us to fix inaccurate information.</li>
              <li><strong>Deletion</strong> — ask us to delete your personal information, subject to legal retention requirements.</li>
              <li><strong>Portability</strong> — receive your data in a portable format.</li>
              <li><strong>Opt-out of marketing</strong> — unsubscribe at any time using the link in our emails.</li>
              <li><strong>Opt-out of "sale" or "sharing"</strong> for targeted advertising (California, Colorado, Connecticut, Virginia, and similar U.S. state laws).</li>
              <li><strong>Withdraw consent</strong> where processing is based on consent (GDPR/UK GDPR).</li>
              <li><strong>Lodge a complaint</strong> with your local data-protection authority.</li>
            </ul>
            <p>To exercise any of these rights, email <a className="text-primary underline" href="mailto:support@circuitenergy.co">support@circuitenergy.co</a> from the address on your account. We will respond within the timeframe required by applicable law (typically 30–45 days). We will not discriminate against you for exercising your rights.</p>
          </Block>

          <Block n="10" title="Health, FDA & FTC Disclosures">
            <p>Statements about Circuit Energy products have not been evaluated by the U.S. Food and Drug Administration. Our products are dietary supplements and are not intended to diagnose, treat, cure, or prevent any disease. Customer testimonials reflect individual experiences and are not guarantees of results. Always consult your healthcare provider before starting any supplement, especially if you are pregnant, nursing, taking medication, or have a medical condition.</p>
          </Block>

          <Block n="11" title="International Transfers">
            <p>Circuit operates from the United States. If you access the Site from outside the U.S., your information will be transferred to, stored, and processed in the U.S. and other countries where our service providers operate. Where required, we use appropriate safeguards such as Standard Contractual Clauses for international transfers.</p>
          </Block>

          <Block n="12" title="Third-Party Links">
            <p>The Site may link to third-party websites or embed third-party content. We are not responsible for the privacy practices of those third parties. Please review their policies before providing information.</p>
          </Block>

          <Block n="13" title="Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. The "Effective" date at the top reflects the latest revision. Material changes will be communicated through the Site or by email where appropriate.</p>
          </Block>

          <Block n="14" title="Contact Us">
            <p>Questions, requests, or complaints about this Privacy Policy? Reach us at:</p>
            <p className="not-italic"><strong>Circuit Energy</strong><br/>Email: <a className="text-primary underline" href="mailto:support@circuitenergy.co">support@circuitenergy.co</a></p>
          </Block>

          <div className="pt-6 text-sm text-muted-foreground">
            See also: <Link to="/contact" className="text-primary underline">Contact</Link>.
          </div>
        </div>
      </section>

      <style>{`
        .prose-style h2 { font-family: var(--font-display, inherit); }
        .prose-style ul { list-style: disc; padding-left: 1.25rem; margin-top: .5rem; }
        .prose-style li { margin-top: .35rem; }
        .prose-style p { line-height: 1.7; }
      `}</style>
    </>
  );
}

function Intro() {
  return (
    <p className="text-lg">
      Your privacy matters. This policy explains, in plain language, what we collect when you visit circuitenergy.co or buy from us, why we collect it, and the control you have over it.
    </p>
  );
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl text-ink leading-tight">
        <span className="text-primary/60 font-mono text-base mr-2">{n.padStart(2, "0")}</span>
        {title}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
