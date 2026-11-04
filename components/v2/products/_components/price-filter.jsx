"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { hrefFor, withPatch } from "@/lib/product-query/query";
import { buildPricePresets } from "@/lib/product-query/price-presets";


const toNum = (v) => {
  if (v === "" || v == null) return undefined;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
};

const input =
  "h-11 w-full rounded-xl border border-light-100 bg-white px-3 text-[16px] text-ink placeholder:text-faint focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand-50 lg:text-sm";

/**
 * Client component, lekin URL ka logic wahi query.js ke pure functions (hrefFor/withPatch).
 * Min/Max Enter ya Apply par, chips seedha <Link>.
 */
export function PriceFilter({ query, range }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [min, setMin] = useState(query.minPrice ?? "");
  const [max, setMax] = useState(query.maxPrice ?? "");

  // URL badle (chip / clear all) to inputs bhi sync
  useEffect(() => {
    setMin(query.minPrice ?? "");
    setMax(query.maxPrice ?? "");
  }, [query.minPrice, query.maxPrice]);

  const nextMin = toNum(min);
  const nextMax = toNum(max);
  const dirty = nextMin !== query.minPrice || nextMax !== query.maxPrice;

  const submit = (e) => {
    e.preventDefault();
    let [lo, hi] = [nextMin, nextMax];
    if (lo !== undefined && hi !== undefined && lo > hi) [lo, hi] = [hi, lo];
    startTransition(() =>
      router.push(hrefFor(withPatch(query, { minPrice: lo, maxPrice: hi })), {
        scroll: false,
      }),
    );
  };

  const presets = buildPricePresets(range);

  return (
    <div className="space-y-3">
      <h3 className="text-[15px] font-semibold text-ink">Price</h3>

      <form onSubmit={submit} className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            inputMode="numeric"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            placeholder="Min Rs"
            aria-label="Minimum price"
            className={input}
          />
          <span className="text-sm text-faint">to</span>
          <input
            type="number"
            min={0}
            inputMode="numeric"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            placeholder="Max Rs"
            aria-label="Maximum price"
            className={input}
          />
        </div>

        {dirty && (
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-xl bg-ink px-3 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            Apply price
          </button>
        )}
      </form>

      {presets.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => {
            const active =
              p.minPrice === query.minPrice && p.maxPrice === query.maxPrice;
            return (
              <Link
                key={p.label}
                href={hrefFor(
                  withPatch(query, { minPrice: p.minPrice, maxPrice: p.maxPrice }),
                )}
                scroll={false}
                aria-pressed={active}
                className={`rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "border-brand bg-brand text-white"
                    : "border-light-100 bg-white text-ink-50 hover:border-brand"
                }`}
              >
                {p.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}