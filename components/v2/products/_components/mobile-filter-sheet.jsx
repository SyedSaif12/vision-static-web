"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import BottomSheet from "../../navbar/BottomSheet";
import { useDispatch } from "react-redux";
import { onToggle } from "@/redux/golbal-toggle/globalToggleSlice";
import { SortSelect } from "./sort-select";
import { selectedSortOptions } from "@/lib/product-query/query";

/**
 * Sirf open/close state client me. Andar ka content (children) server se aata hai,
 * aur filters <Link> hain, to tap par URL badalta hai aur sheet khuli rehti hai
 * (counts update hote hain). "Show N" dabane par band.
 */
export function MobileFilterSheet({ query, activeCount, showLabel, clearHref, canClear, children }) {
    const dispatch = useDispatch()
    const sorting = selectedSortOptions(query)
    const [open, setOpen] = useState(false);
    const close = useCallback(() => {
        dispatch(onToggle(false))
        setOpen(false)
    }, []);

    function handleOpenFilter() {
        dispatch(onToggle(true))
        setOpen(true)
    }

    return (
        <div className="flex gap-3">
            <button
                type="button"
                onClick={handleOpenFilter}
                aria-haspopup="dialog"
                className="inline-flex items-center gap-2 rounded-xl border border-light-100 bg-white px-4 py-3 text-sm font-semibold text-ink shadow-sm active:bg-surface"
            >
                <SlidersHorizontal size={16} aria-hidden />
                Filters
                {activeCount > 0 && (
                    <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-brand px-1.5 text-xs font-bold text-white">
                        {activeCount}
                    </span>
                )}
            </button>

            <SortSelect
                hidden={false}
                options={sorting.sortOptions}
                value={sorting.sortOptions[Math.max(sorting.currentSort, 0)].href}
            />

            <BottomSheet open={open} onClose={close} title="Filters" maxHeight="90dvh">
                {children}

                {/* sticky footer: scroll area ke andar, bottom par chipka hua */}
                <div className="sticky -bottom-6 -mx-5 -mb-6 mt-6 flex gap-3 border-t border-light-100 bg-white px-5 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                    {canClear ? (
                        <Link
                            href={clearHref}
                            scroll={false}
                            className="rounded-xl border-[1.5px] border-light-100 bg-white px-5 py-3.5 text-base font-bold text-ink"
                        >
                            Clear all
                        </Link>
                    ) : (
                        <span
                            aria-disabled
                            className="rounded-xl border-[1.5px] border-light-100 bg-surface px-5 py-3.5 text-base font-bold text-faint"
                        >
                            Clear all
                        </span>
                    )}
                    <button
                        type="button"
                        onClick={close}
                        className="flex-1 rounded-xl bg-brand px-4 py-3.5 text-base font-bold text-white active:bg-brand-600"
                    >
                        {showLabel}
                    </button>
                </div>
            </BottomSheet>
        </div>
    );
}