import { createFileRoute } from "@tanstack/react-router";
import { WWProse } from "@/components/site/WWPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — WaistSnatch™" },
      { name: "description", content: "The terms that apply when you browse this site or order a WaistSnatch™ adjustable WaistSnatch™." },
      { property: "og:title", content: "Terms of Service — WaistSnatch™" },
      { property: "og:description", content: "Terms that apply to orders placed with WaistSnatch™." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <WWProse
      cta={false}
      eyebrow="Legal"
      title="Terms of service."
      sections={[
        { h: "Agreement", p: <p>By using this site or placing an order, you agree to these terms. If you do not agree, please do not use the site.</p> },
        { h: "Orders and pricing", p: <p>Prices are in USD and may change. We may cancel and refund an order if an item is mispriced or unavailable.</p> },
        { h: "Acceptable use", p: <p>You may not misuse the site, attempt unauthorised access, or copy site content commercially without written permission. All brand names, text and imagery belong to WaistSnatch™.</p> },
        { h: "Product use", p: <p>WaistSnatch™ is an apparel compression garment, not a medical device. Do not wear it over an injury, and speak with a clinician before use if you are pregnant, recovering from surgery, or have a circulatory or respiratory condition.</p> },
        { h: "Liability", p: <p>To the extent permitted by law, WaistSnatch™ is not liable for indirect or consequential losses arising from use of the site or products. Nothing here limits liability that cannot be limited by law.</p> },
        { h: "Contact", p: <p>support@seralie.com</p> },
      ]}
    />
  ),
});
