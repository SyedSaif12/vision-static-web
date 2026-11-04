import { getFilters } from "@/lib/product-query/fetch-api";
import { FilterGroup } from "./filter-group";
import { PriceFilter } from "./price-filter";

/**
 * Filters ka asli content: price + dynamic groups.
 * Desktop sidebar aur mobile sheet dono yahi render karte hain.
 * openCount: pehle itne groups khule (mobile par 2, desktop par sab).
 */
export async function FilterPanel({ query, openCount = Infinity }) {
  const { filters, price } = await getFilters(query.category, query.subCategory);
  const groups = Object.entries(filters);

  return (
    <div className="space-y-5">
      <PriceFilter query={query} range={price} />

      {groups.map(([key, options], i) => (
        <FilterGroup
          key={key}
          paramKey={key}
          options={options}
          query={query}
          defaultOpen={i < openCount}
        />
      ))}

      {!groups.length && (
        <p className="text-sm text-muted">
          {query.category
            ? "Is category ke liye filters available nahi hain."
            : "Zyada filters dekhne ke liye pehle category select karo."}
        </p>
      )}
    </div>
  );
}