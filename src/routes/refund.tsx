import { createFileRoute } from "@tanstack/react-router";
import { WWProse } from "@/components/site/WWPage";

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Seralie SilkBrush™" },
      { name: "description", content: "Refunds are issued within 365 days only when the SilkBrush™ is unopened or arrived with a defect. Opened packages cannot be refunded." },
      { property: "og:title", content: "Refund Policy — Seralie SilkBrush™" },
      { property: "og:description", content: "Refunds within 365 days if the item is unopened or defective. Opened packages cannot be refunded." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <WWProse
      eyebrow="Returns"
      title="365-day money-back guarantee."
      intro="We refund the product price within 365 days of delivery when the SilkBrush™ is unopened or arrived with a defect. Once a package has been opened, it can't be refunded — here is exactly how it works."
      sections={[
        {
          h: "What qualifies for a refund",
          p: (
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="font-bold text-[color:var(--cw-ink)]">Unopened.</strong> The brush is still in its original,
                factory-sealed packaging, unused, with all contents and any included gift intact.
              </li>
              <li>
                <strong className="font-bold text-[color:var(--cw-ink)]">Defective.</strong> The brush arrived with a
                manufacturing or material defect — for example broken or shedding bristles, a loose or cracked handle, or a
                failure that isn't caused by misuse.
              </li>
            </ul>
          ),
        },
        {
          h: "Opened packages cannot be refunded",
          p: (
            <p>
              If the packaging has been opened and the brush used, we're unable to issue a refund — even inside the 365-day
              window. The only exception for an opened item is a defect as described above. This applies to every SilkBrush™
              offer, including bundle and multi-pack orders. Please don't open an included gift if you may want to return the
              order, since an opened gift makes the order non-refundable.
            </p>
          ),
        },
        {
          h: "How to request a refund",
          p: (
            <p>
              Email support@seralie.com within 365 days of delivery with your order number and whether the item is unopened or
              defective. For defects, attach a photo or short video showing the issue. We'll confirm eligibility and send
              return instructions the same business day.
            </p>
          ),
        },
        {
          h: "What you get back",
          p: (
            <p>
              The full product price. Original shipping charges are not refunded, and return postage is the customer's
              responsibility unless the item arrived damaged, incorrect, or defective.
            </p>
          ),
        },
        {
          h: "Timing",
          p: (
            <p>
              Approved refunds are issued to the original payment method within 3 business days of the return being received,
              and usually land in 5–10 days depending on your bank.
            </p>
          ),
        },
        {
          h: "Damaged or wrong item",
          p: (
            <p>
              Send a photo. We reship immediately at our cost — no return needed. If you'd rather have your money back, a
              damaged or incorrect item is refunded in full.
            </p>
          ),
        },
        {
          h: "Cancellations",
          p: (
            <p>
              Email us within one hour of ordering and we'll cancel before dispatch, so nothing is charged and nothing needs
              to be returned.
            </p>
          ),
        },
      ]}
    />
  ),
});
