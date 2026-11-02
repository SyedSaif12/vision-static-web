import Link from "next/link";
import { getProducts } from "@/lib/product-query/fetch-api";
import { hrefFor, selectProductPills } from "@/lib/product-query/query";

const chip =
  "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border px-4 py-3 text-sm font-semibold capitalize transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";

function countByChip(chips, products) {
  // lambe labels pehle, taake "hp 15 fd" pehle match ho, "hp 15" baad mein
  const sorted = [...chips].sort((a, b) => b.label.length - a.label.length);
  const counts = new Map(chips.map((c) => [c.id, 0]));

  for (const p of products ?? []) {
    const name = p.name?.toLowerCase().trim() ?? "";
    const match = sorted.find((c) => {
      const label = c.label.toLowerCase();
      // label ke baad space ya end ho, taake "hp 15" "hp 150" se match na kare
      return name === label || name.startsWith(label + " ");
    });
    if (match) counts.set(match.id, counts.get(match.id) + 1);
  }
  return counts;
}

export async function PillsBar({ query }) {
  if (!query.subCategory) return null;
  const activeTag = Boolean(query?.tag)

  const currentSubCategory = { ...query };
  delete currentSubCategory.name;
  console.log(currentSubCategory);

  const { chips: allChips, products } = await getProducts(currentSubCategory);
  let chips = allChips;

  if (activeTag) {
    const counts = countByChip(allChips, products);
    chips = allChips.map((c) => ({ ...c, count: counts.get(c.id) ?? 0 }));
  }

  if (!chips?.length) return null;

  const active = query.name?.toLowerCase();

  return (
    <nav aria-label="Models" className=" flex min-w-0 items-center gap-3">
      <span className="mr-2 hidden shrink-0 text-xs font-semibold tracking-wide text-slate-400 md:block">
        Models
      </span>

      <div
        className="
          flex min-w-0 flex-1 flex-nowrap items-center gap-3
          overflow-x-auto overscroll-x-contain
          pb-3 pt-1
          snap-x snap-mandatory
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {/* All */}
        <Link
          href={hrefFor(selectProductPills(query, undefined))}
          aria-current={!active ? "page" : undefined}
          className={`${chip} snap-start ${!active
            ? "border-blue-700 bg-blue-700 text-white"
            : "border-slate-200 bg-white text-slate-800 hover:border-blue-300"
            }`}
        >
          All
        </Link>

        {/* Models */}
        {chips.map((b) => {
          const selected = active === b.label.toLowerCase();

          return (
            <Link
              key={b.id ?? b.label}
              href={hrefFor(
                selectProductPills(query, selected ? undefined : b.label),
              )}
              aria-current={selected ? "page" : undefined}
              className={`${chip} snap-start ${selected
                ? "border-blue-700 bg-blue-700 text-white"
                : "border-slate-200 bg-white text-slate-800 hover:border-blue-300"
                }`}
            >
              <span>{b.label}</span>
              {
                !activeTag ? (
                  <span className="shrink-0 whitespace-nowrap text-xs text-slate-400">
                    ({b.count})
                  </span>
                ) : (
                  <span className="shrink-0 whitespace-nowrap text-xs text-slate-400">
                    ({b.count})
                  </span>
                )
              }

            </Link>
          );
        })}
      </div>
    </nav>
  );
}
