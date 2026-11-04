import Link from "next/link";
import { hrefFor, selectedTagFilter } from "@/lib/product-query/query";

const chip =
  "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-semibold capitalize transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";

const filteredTags = [
  { tag: "refurbished", label: "Refurbished" },
  { tag: "brand-new", label: "Brand New" },
  { tag: "used", label: "Used" },
  { tag: "open-box", label: "Open Box" },
];

export async function TagFilters({ query }) {
  const active = query?.tag?.toLowerCase();

  return (
    <nav aria-label="Brands" className="mt-6 flex min-w-0 items-center gap-3">
      <span className="mr-2 hidden shrink-0 md:block text-xs font-semibold tracking-wide text-slate-400">
        Types
      </span>
      <div
        className="
                 flex min-w-0 flex-1 flex-nowrap items-center gap-3
          overflow-x-auto overscroll-x-contain
          pt-1
          snap-x snap-mandatory
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
              "
      >
        <div className="snap-start">
          <Link
            href={hrefFor(selectedTagFilter(query, undefined))}
            aria-current={!active ? "page" : undefined}
            className={`${chip} ${!active ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-white text-slate-800 hover:border-blue-300"}`}
          >
            All
          </Link>
        </div>
        {filteredTags.map((b) => {
          const selected = active === b.tag.toLowerCase();
          const content = <>{b.label}</>;

          return (
            <div key={b.id ?? b.label} className="snap-start">
              <Link
                href={hrefFor(
                  selectedTagFilter(query, selected ? undefined : b.tag),
                )}
                aria-current={selected ? "page" : undefined}
                className={`${chip} ${selected ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-white text-slate-800 hover:border-blue-300"}`}
              >
                {content}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
