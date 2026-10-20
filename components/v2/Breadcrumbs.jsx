import { formatName } from "@/lib/utils";
import Link from "next/link";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="w-full overflow-hidden">
      <ol
        className="
          flex
          min-w-0
          items-center
          gap-2
          overflow-x-auto
          whitespace-nowrap
          scrollbar-none
        "
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.name}-${index}`}
              className="flex shrink-0 items-center gap-2"
            >
              {isLast ? (
                <span
                  aria-current="page"
                  className="
                    text-xs md:text-sm lg:text-base
                    font-medium
                    text-muted
                  "
                >
                  {formatName(item.name)}
                </span>
              ) : (
                <Link
                  href={item.href || "#"}
                  className="
                    text-xs md:text-sm lg:text-base
                    font-medium
                    text-faint
                    transition-colors
                    duration-200
                    hover:text-brand
                  "
                >
                  {formatName(item.name)}
                </Link>
              )}

              {!isLast && (
                <span
                  aria-hidden="true"
                  className="
                    text-xs md:text-sm lg:text-base
                    text-faint
                  "
                >
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
