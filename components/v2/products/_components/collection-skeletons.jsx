const bar = "animate-pulse rounded bg-slate-200 motion-reduce:animate-none";

export function NewArrivalsSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading new arrivals"
      className="mx-auto w-11/12 py-6"
    >
      <div className="flex min-w-0 gap-4 overflow-hidden">
        {/* =========================================
            LEFT FEATURED PANEL
        ========================================= */}
        <div
          className="
            relative
            hidden
            h-[494px]
            w-[285px]
            shrink-0
            overflow-hidden
            rounded-2xl
            bg-slate-200
            p-7
            sm:block
            lg:w-[285px]
          "
        >
          {/* decorative star */}
          <div
            className={`${bar} absolute right-[-20px] top-[-20px] h-36 w-36 rounded-full opacity-60`}
          />

          <div className="absolute bottom-8 left-7 right-7 space-y-5">
            {/* JUST LANDED */}
            <div className={`${bar} h-3 w-24`} />

            {/* Heading */}
            <div className="space-y-2">
              <div className={`${bar} h-9 w-full`} />
              <div className={`${bar} h-9 w-4/5`} />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className={`${bar} h-4 w-full`} />
              <div className={`${bar} h-4 w-[90%]`} />
              <div className={`${bar} h-4 w-[65%]`} />
            </div>

            {/* Button */}
            <div className={`${bar} h-12 w-48 rounded-xl`} />
          </div>
        </div>

        {/* =========================================
            RIGHT PRODUCTS AREA
        ========================================= */}
        <div className="min-w-0 flex-1">
          {/* Product horizontal row */}
          <div className="flex gap-4 overflow-hidden pb-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="
                  w-[220px]
                  shrink-0
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  sm:w-[225px]
                  lg:w-[230px]
                "
              >
                {/* Image */}
                <div className="relative">
                  <div className={`${bar} h-[165px] w-full rounded-none`} />

                  {/* JUST IN badge */}
                  <div
                    className={`${bar} absolute right-3 top-3 h-7 w-14 rounded-md`}
                  />
                </div>

                {/* Content */}
                <div className="space-y-3 p-4">
                  {/* Brand */}
                  <div className={`${bar} h-3 w-12`} />

                  {/* Product title */}
                  <div className="space-y-2">
                    <div className={`${bar} h-4 w-full`} />
                    <div className={`${bar} h-4 w-[85%]`} />
                  </div>

                  {/* Specs */}
                  <div className="flex flex-wrap gap-2">
                    <div className={`${bar} h-6 w-12 rounded-md`} />
                    <div className={`${bar} h-6 w-14 rounded-md`} />
                    <div className={`${bar} h-6 w-20 rounded-md`} />
                  </div>

                  {/* Stock */}
                  <div className={`${bar} h-4 w-16`} />

                  {/* Old price */}
                  <div className={`${bar} h-4 w-20`} />

                  {/* Current price */}
                  <div className={`${bar} h-6 w-28`} />

                  {/* Add to cart */}
                  <div className={`${bar} mt-2 h-10 w-full rounded-lg`} />
                </div>
              </div>
            ))}
          </div>

          {/* Fake horizontal scrollbar */}
          <div className="px-1">
            <div className="h-2 w-full rounded-full bg-slate-100">
              <div className={`${bar} h-2 w-[38%] rounded-full`} />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          MOBILE VERSION
      ========================================= */}
      <div className="mt-4 sm:hidden">
        <div className="mb-4">
          <div className="space-y-2">
            <div className={`${bar} h-3 w-24`} />
            <div className={`${bar} h-8 w-3/4`} />
            <div className={`${bar} h-4 w-full`} />
            <div className={`${bar} h-4 w-4/5`} />
          </div>

          <div className={`${bar} mt-4 h-11 w-44 rounded-xl`} />
        </div>
      </div>
    </section>
  );
}
