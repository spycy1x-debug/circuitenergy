/**
 * Framed image slot. Real photography gets a soft bordered frame so it sits
 * cleanly on the bone background; without a `src` it renders a placeholder.
 */
export function PhotoSlot({
  label,
  ratio = "4/5",
  className = "",
  src,
  alt = "",
}: {
  label: string;
  ratio?: string;
  className?: string;
  src?: string;
  alt?: string;
}) {
  const frame =
    "overflow-hidden rounded-2xl border border-[color:var(--sand-deep)]/60 bg-[color:var(--sand)]/50 p-1.5 shadow-[0_10px_30px_-18px_rgba(59,46,37,0.35)]";

  if (src) {
    return (
      <div className={`${frame} ${className}`}>
        <img
          src={src}
          alt={alt || label}
          loading="lazy"
          decoding="async"
          className="h-full w-full rounded-xl object-cover"
          style={{ aspectRatio: ratio }}
        />
      </div>
    );
  }
  return (
    <div className={`${frame} ${className}`}>
      <div
        className="flex items-center justify-center rounded-xl border border-dashed border-[color:var(--sand-deep)]"
        style={{ aspectRatio: ratio }}
        role="img"
        aria-label={`Image placeholder: ${label}`}
      >
        <span className="px-6 text-center caps-label text-[color:var(--muted-foreground)]">{label}</span>
      </div>
    </div>
  );
}
