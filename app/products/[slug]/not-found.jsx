import { Home, RotateCcw, SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-240px)] w-full">
      <div className="mx-auto flex min-h-[calc(100vh-240px)] w-11/12 items-center justify-center py-16">
        <div className="w-full max-w-2xl">
          {/* Error Card */}
          <div className="rounded-3xl border border-light-100 bg-white px-6 py-10 text-center shadow-sm sm:px-10 sm:py-14">
            <h1 className="text-7xl md:text-9xl font-extrabold text-muted">
              404
            </h1>
            {/* Heading */}
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-faint sm:text-3xl">
              No Products Found
            </h2>

            {/* Description */}
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
              Your search did not match and products <br />
              Please try again.
            </p>

            {/* Actions */}
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
