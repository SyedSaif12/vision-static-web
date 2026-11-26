export default function Loading() {
  return (
    <main aria-busy="true">
      <div className="h-[300px] animate-pulse bg-light" />
      <div className="mx-auto grid w-11/12 max-w-[1240px] gap-6 py-11 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-light-100">
            <div className="aspect-[16/10] animate-pulse bg-light-100" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-4/5 animate-pulse rounded bg-light-100" />
              <div className="h-3 w-full animate-pulse rounded bg-light-200" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-light-200" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
