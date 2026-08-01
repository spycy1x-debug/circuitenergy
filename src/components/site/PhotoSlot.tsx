/**
 * Placeholder slot for real photography.
 * No stock or AI imagery — drop your own image in via the `src` prop.
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
  if (src) {
    return (
      <div className={`overflow-hidden bg-[color:var(--sand)] ${className}`} style={{ aspectRatio: ratio }}>
        <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div
      className={`flex items-center justify-center border border-dashed border-[color:var(--sand-deep)] bg-[color:var(--sand)]/60 ${className}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`Image placeholder: ${label}`}
    >
      <span className="px-6 text-center caps-label text-[color:var(--muted-foreground)]">{label}</span>
    </div>
  );
}
