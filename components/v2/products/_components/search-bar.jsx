"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, LoaderCircle, X } from "lucide-react";
import { searchProducts } from "@/lib/product-query/search-action";
import { formatPrice } from "@/lib/utils";
import { BaseImage } from "@/components";
import ConditionalComponent from "../../ConditionalComponent";

const PRODUCT_PATH = "/products";
const PRODUCTS_LIST_PATH = "/products";
const MIN_CHARS = 3;
const DEBOUNCE_MS = 300;
const PREVIEW_LIMIT = 12;

const STOCK = {
  in_stock: { label: "In Stock", dot: "bg-green-600", text: "text-green-700" },
  out_of_stock: {
    label: "Out of Stock",
    dot: "bg-red-500",
    text: "text-red-600",
  },
  coming_soon: {
    label: "Coming Soon",
    dot: "bg-amber-500",
    text: "text-amber-600",
  },
};

export default function SearchBar({
  className = "",
  placeholder = "Search laptops, phones, brands, and more",
  onNavigate, // optional: mobile menu band karne ke liye
}) {
  const router = useRouter();
  const wrapRef = useRef(null);
  const reqId = useRef(0);

  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({ products: [], total: 0 });
  const [error, setError] = useState(false);
  const [active, setActive] = useState(-1);
  const inputRef = useRef(null);

  const showClear = !loading && term.length > 0;

  const clear = () => {
    setTerm("");
    setOpen(false);
    inputRef.current?.focus();
  };

  const query = term.trim();
  const canSearch = query.length >= MIN_CHARS;

  // Debounced fetch
  useEffect(() => {
    if (!canSearch) {
      reqId.current++;
      setResults({ products: [], total: 0 });
      setLoading(false);
      setError(false);
      return;
    }
    const id = ++reqId.current;
    setLoading(true);
    const t = setTimeout(async () => {
      const data = await searchProducts(query, PREVIEW_LIMIT);
      if (id !== reqId.current) return;
      setResults({ products: data.products, total: data.total });
      setError(Boolean(data.error));
      setActive(-1);
      setLoading(false);
    }, DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [query, canSearch]);

  // Bahar click par band
  useEffect(() => {
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const close = () => {
    setOpen(false);
    setActive(-1);
    onNavigate?.();
  };

  // View all: ab frontend URL bhi update hota hai (backend jaisa hi)
  const goAll = () => {
    if (!canSearch) return;
    const params = new URLSearchParams({ searchQuery: query });
    router.push(`${PRODUCTS_LIST_PATH}?${params}`);
    close();
  };

  const goProduct = (p) => {
    router.push(`${PRODUCT_PATH}/${p.slug}`);
    close();
  };

  const onKeyDown = (e) => {
    const n = results.products.length;
    if (e.key === "ArrowDown" && n) {
      e.preventDefault();
      setOpen(true);
      setActive((a) => (a + 1) % n);
    } else if (e.key === "ArrowUp" && n) {
      e.preventDefault();
      setActive((a) => (a <= 0 ? n - 1 : a - 1));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (active >= 0 && results.products[active])
      goProduct(results.products[active]);
    else goAll();
  };

  const showPanel = open && canSearch;

  return (
    <div
      ref={wrapRef}
      className={`relative max-w-[622px] h-[48px] sm:h-[54px] pt-1 ${className}`}
    >
      <form
        onSubmit={onSubmit}
        className="flex items-center rounded-lg sm:rounded-xl bg-white p-1 sm:p-1.5 pl-5"
      >
        <input
          ref={inputRef}
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls="search-suggestions"
          className="min-w-0 flex-1 bg-transparent sm:py-2 text-sm text-ink outline-none placeholder:text-faint"
        />
        <button
          type={showClear ? "button" : "submit"}
          onClick={showClear ? clear : undefined}
          aria-label="Search"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold text-black hover:bg-gold"
        >
          <ConditionalComponent
            condition={loading}
            ifComponent={<LoaderCircle size={22} className="animate-spin" />}
            elseComponent={
              <ConditionalComponent
                condition={results?.products?.length > 0}
                ifComponent={<X size={23} onClick={() => setTerm("")} />}
                elseComponent={<Search size={18} />}
              />
            }
          />
        </button>
      </form>

      {showPanel && (
        <div
          id="search-suggestions"
          role="listbox"
          className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-2xl bg-white text-ink shadow-2xl"
        >
          <p className="px-5 py-3 text-sm text-faint">
            {loading
              ? "Searching…"
              : error
                ? "Something went wrong. Please try again."
                : results.total > 0
                  ? `Found ${results.total} matching result${results.total === 1 ? "" : "s"} for "${query}"`
                  : `No results found for "${query}"`}
          </p>

          {results.products.length > 0 && (
            <ul className="max-h-[360px] overflow-y-auto px-2 pb-2">
              {results.products.map((p, i) => {
                const stock = STOCK[p.stock] ?? STOCK.out_of_stock;
                const isActive = i === active;
                return (
                  <li
                    key={p.id || p.slug}
                    role="option"
                    aria-selected={isActive}
                  >
                    <button
                      type="button"
                      onClick={() => goProduct(p)}
                      onMouseEnter={() => setActive(i)}
                      className={`flex w-full items-center gap-4 rounded-lg px-3 py-3 text-left transition-colors ${
                        isActive ? "bg-primary text-white" : "hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white">
                        <BaseImage
                          src={p.image}
                          alt={p.name}
                          className="size-full"
                          imgClassName="p-1"
                          fit="contain"
                          sizes="64px"
                        />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-bold">
                          {p.name}
                        </span>
                        {p.specs.length > 0 && (
                          <span
                            className={`block truncate text-sm ${isActive ? "text-white/80" : "text-faint"}`}
                          >
                            {p.specs.join(", ")}
                          </span>
                        )}
                      </span>

                      <span className="shrink-0 text-right">
                        <span
                          className={`block font-bold ${isActive ? "text-gold" : "text-ink"}`}
                        >
                          {formatPrice(p.price, "Rs ")}
                        </span>
                        {p.oldPrice && (
                          <span className="block text-xs text-faint line-through">
                            {formatPrice(p.oldPrice, "Rs ")}
                          </span>
                        )}
                        <span className="mt-0.5 inline-flex items-center gap-1.5 text-xs">
                          <span
                            className={`size-1.5 rounded-full ${stock.dot}`}
                          />
                          <span
                            className={isActive ? "text-white/90" : stock.text}
                          >
                            {stock.label}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {results.total > 0 && (
            <div className="flex justify-end border-t border-slate-100 bg-white p-3">
              <button
                type="button"
                onClick={goAll}
                className="rounded-lg bg-gold px-6 py-3 text-sm font-bold uppercase text-black hover:brightness-95"
              >
                View all ({results.total} results)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
