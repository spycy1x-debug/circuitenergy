import { createFileRoute } from "@tanstack/react-router";
import { WWProse } from "@/components/site/WWPage";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How The Seralie SilkBrush™ Works" },
      { name: "description", content: "How the Seralie SilkBrush™ works: brush dry hair in small sections and the boar bristles help smooth frizz and distribute natural oils for a shinier, straighter-looking finish." },
      { property: "og:title", content: "How The Seralie SilkBrush™ Works" },
      { property: "og:description", content: "Brush. Smooth. Shine. Done." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorks,
});

function HowItWorks() {
  return (
    <WWProse
      eyebrow="How it works"
      title="Brush. Smooth. Shine. Done."
      intro="The SilkBrush™ is a boar-bristle brush designed to smooth the hair's surface while distributing your hair's natural oils through the lengths."
      sections={[
        { h: "01 · Start", p: <p>Use on dry hair.</p> },
        { h: "02 · Brush", p: <p>Work through small sections of hair, root to end.</p> },
        { h: "03 · Finish", p: <p>Enjoy a smoother, shinier, straighter-looking finish.</p> },
        { h: "Why boar bristles", p: <p>Boar bristles can help distribute natural oils from the scalp through the lengths of the hair while smoothing the hair surface, helping hair appear shinier and more polished.</p> },
        { h: "What it isn't", p: <p>The SilkBrush™ is not a permanent chemical straightening treatment. It creates a straighter-looking, more polished finish as you brush. Results vary by hair type, texture and humidity.</p> },
        { h: "Care", p: <p>Remove loose hair from the bristles regularly and clean the brush according to the manufacturer's care instructions.</p> },
      ]}
    />
  );
}
