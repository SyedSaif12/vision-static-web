const bar = "animate-pulse rounded bg-slate-200 motion-reduce:animate-none";

export function BrandBarSkeleton() {
  return (
    <div className="mt-6 flex gap-3" aria-hidden>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className={`${bar} h-10 w-24 rounded-xl`} />
      ))}
    </div>
  );
}

export function FiltersSkeleton() {
  return (
    <div className="space-y-5 rounded-2xl border border-slate-200 p-5" aria-hidden>
      <div className={`${bar} h-5 w-20`} />
      <div className={`${bar} h-10 w-full`} />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className={`${bar} h-4 w-full`} />
      ))}
    </div>
  );
}

export function ResultsSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading products">
      <div className={`${bar} h-9 w-full`} />
      <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="overflow-hidden rounded-2xl border border-slate-200">
            <div className={`${bar} aspect-[4/3] rounded-none`} />
            <div className="space-y-3 p-4">
              <div className={`${bar} h-3 w-16`} />
              <div className={`${bar} h-5 w-3/4`} />
              <div className={`${bar} h-6 w-1/3`} />
              <div className={`${bar} h-10 w-full rounded-lg`} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
