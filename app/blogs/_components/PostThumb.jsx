import { BookOpen } from "lucide-react";

/** Cover image, ya image na ho to artifact jaisa gradient + glyph placeholder. */
export default function PostThumb({
  src,
  alt = "",
  tag,
  className = "",
  glyphClass = "h-14 w-14",
  priority = false,
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#eef3ff] to-[#dbe6ff] text-primary ${className}`}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      ) : (
        <>
          <BookOpen className={`${glyphClass} opacity-90`} strokeWidth={1.4} />
          <span className="absolute bottom-2.5 right-3 font-heading text-[10.5px] font-extrabold tracking-[0.6px] opacity-50">
            WEGOT
          </span>
        </>
      )}
      {tag && (
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-[5px] font-heading text-[11px] font-bold text-primary">
          {tag}
        </span>
      )}
    </div>
  );
}
