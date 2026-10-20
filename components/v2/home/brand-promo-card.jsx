import Link from "next/link";
import { isDarkColor, normalizeHex } from "./color";
import { brandHref } from "@/lib/product-query/fetch-api";

export function BrandPromoCard({ section }) {
  const bg = normalizeHex(section.bgColor);
  const dark = isDarkColor(bg);

  return (
    <div
      style={{ backgroundColor: bg }}
      className={`flex flex-col justify-evenly gap-6 rounded-2xl p-6 ${dark ? "text-white" : "text-slate-900"}`}
    >
      <div>
        <h3 className="text-3xl font-bold tracking-tight">{section.heading}</h3>
        {section.description && (
          <p className={`mt-3 text-base ${dark ? "text-white/80" : "text-slate-700"}`}>
            {section.description}
          </p>
        )}
      </div>

      {section.checkBoxText.length > 0 && (
        <ul className=" space-y-3 text-sm">
          {section.checkBoxText.map((text) => (
            <li key={text} className="flex items-start gap-3">
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                className="mt-0.5 size-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m3 8.5 3.2 3.2L13 4.8" />
              </svg>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      )}

      <Link
        href={brandHref(section)}
        className="w-fit rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Shop {section.heading}
      </Link>
    </div>
  );
}
