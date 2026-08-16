import { ImageIcon, PlayCircle } from "lucide-react";

type Props = {
  ratio?: "4/5" | "1/1" | "16/9";
  label: string;
  dimensions?: string;
  video?: boolean;
  className?: string;
};

const RATIO: Record<string, string> = {
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
  "16/9": "aspect-video",
};

export function MediaPlaceholder({
  ratio = "1/1",
  label,
  dimensions,
  video = false,
  className = "",
}: Props) {
  const Icon = video ? PlayCircle : ImageIcon;
  return (
    <div
      className={`grid ${RATIO[ratio]} w-full place-items-center rounded-xl border-2 border-dashed border-[color:var(--brand)]/45 bg-[color:var(--brand-soft)] p-4 text-center ${className}`}
    >
      <div>
        <Icon
          className="mx-auto h-8 w-8 text-[color:var(--brand)]"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--brand)]">
          {label}
        </div>
        {dimensions && (
          <div className="mt-1 text-[10px] text-[color:var(--muted-ink)]">{dimensions}</div>
        )}
      </div>
    </div>
  );
}
