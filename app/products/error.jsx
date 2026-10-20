"use client";

import Link from "next/link";
import { RotateCcw, Home, SearchX } from "lucide-react";

export default function ProductsError({
  error,
  reset,
}) {
  return (
    <main className="min-h-[calc(100vh-240px)] w-full">
      <div className="mx-auto flex min-h-[calc(100vh-240px)] w-11/12 items-center justify-center py-16">
        <div className="w-full max-w-2xl">
          {/* Error Card */}
          <div className="rounded-3xl border border-light-100 bg-white px-6 py-10 text-center shadow-sm sm:px-10 sm:py-14">
            {/* Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-25">
              <SearchX
                className="h-8 w-8 text-brand"
                strokeWidth={1.7}
              />
            </div>

            {/* Small Label */}
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Products
            </p>

            {/* Heading */}
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Products not found
            </h1>

            {/* Description */}
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
              We couldn&apos;t load the products right now. Please try
              again or go back to the homepage and continue shopping.
            </p>

            {/* Error message */}
            {error?.message && (
              <div className="mx-auto mt-5 max-w-lg rounded-xl border border-light-100 bg-surface px-4 py-3">
                <p className="break-words text-xs leading-5 text-faint">
                  {error.message}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {/* Retry */}
              <button
                type="button"
                onClick={reset}
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-brand
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-200
                  hover:bg-brand-600
                  active:scale-[0.98]
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-brand
                  sm:w-auto
                "
              >
                <RotateCcw className="h-4 w-4" />
                Try again
              </button>

              {/* Home */}
              <Link
                href="/"
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-light-100
                  bg-white
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-ink
                  transition-all
                  duration-200
                  hover:border-brand-50
                  hover:bg-brand-25
                  hover:text-brand
                  active:scale-[0.98]
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-brand
                  sm:w-auto
                "
              >
                <Home className="h-4 w-4" />
                Go to homepage
              </Link>
            </div>
          </div>

          {/* Bottom helper */}
          <p className="mt-5 text-center text-xs text-faint">
            If the problem continues, please try again after a moment.
          </p>
        </div>
      </div>
    </main>
  );
}