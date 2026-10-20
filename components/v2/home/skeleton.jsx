const bar = "animate-pulse rounded bg-slate-200 motion-reduce:animate-none";

export function BrandSectionsSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading brand sections"
      className="mx-auto min-h-[560px] max-w-[1400px] px-4 py-10 sm:px-8"
    >
      <div className={`${bar} h-3 w-20`} />
      <div className={`${bar} mt-4 h-8 w-72`} />
      <div className={`${bar} mt-4 h-4 w-96 max-w-full`} />

      <div className="mt-6 grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
        <div className={`${bar} hidden h-[460px] rounded-2xl lg:block`} />
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-[260px] shrink-0 overflow-hidden rounded-2xl border border-slate-200">
              <div className={`${bar} aspect-[4/3] rounded-none`} />
              <div className="space-y-3 p-4">
                <div className={`${bar} h-3 w-16`} />
                <div className={`${bar} h-5 w-3/4`} />
                <div className={`${bar} h-6 w-1/3`} />
                <div className={`${bar} h-10 w-full rounded-lg`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
