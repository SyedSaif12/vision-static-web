import { PRODUCTS_PATH, toSearchParams } from "@/lib/product-query/query";
import { formatPrice } from "@/lib/utils";

/**
 * Plain GET <form>: submit par browser khud URL banata hai (/products?...&minPrice=..).
 * Koi client JS nahi. Baqi current params hidden inputs me carry hote hain.
 */
export function PriceFilter({
  query,
  range,
}) {
  const carried = toSearchParams({ ...query, minPrice: undefined, maxPrice: undefined, page: 1 });

  const input =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-blue-700";

  return (
    <form action={PRODUCTS_PATH} method="get" className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-900">Price</h3>

      {[...carried.entries()].map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}

      <div className="flex items-center gap-2">
        <input
          name="minPrice"
          type="number"
          min={0}
          inputMode="numeric"
          defaultValue={query.minPrice}
          placeholder={range ? String(range[0]) : "Min Rs"}
          aria-label="Minimum price"
          className={input}
        />
        <span className="text-sm text-slate-400">to</span>
        <input
          name="maxPrice"
          type="number"
          min={0}
          inputMode="numeric"
          defaultValue={query.maxPrice}
          placeholder={range ? String(range[1]) : "Max Rs"}
          aria-label="Maximum price"
          className={input}
        />
      </div>

      {range && (
        <p className="text-xs text-slate-500">
          {formatPrice(range[0])} – {formatPrice(range[1], 'Rs')}
        </p>
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
      >
        Apply price
      </button>
    </form>
  );
}
