import Link from "next/link";
import { hrefFor, withPatch } from "@/lib/product-query/query";

function pageWindow(page, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, page - 1, page, page + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out = [];
  sorted.forEach((p, i) => {
    if (i && p - sorted[i - 1] > 1) out.push("…");
    out.push(p);
  });
  return out;
}

export function Pagination({
  query,
  page,
  totalPages,
  from,
  to,
  total,
}) {
  if (totalPages <= 1) return null;

  const go = (p) => hrefFor(withPatch(query, { page: p }));
  const base =
    "grid h-10 min-w-10 place-items-center rounded-lg border px-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";

  return (
    <nav aria-label="Pagination" className="mt-10 flex flex-col items-center gap-4">
      <p className="text-sm text-slate-500">
        Showing {from}–{to} of {total}
      </p>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={to}
        className="h-1 w-64 overflow-hidden rounded-full bg-slate-200"
      >
        <div className="h-full bg-blue-700" style={{ width: `${(to / total) * 100}%` }} />
      </div>

      <ul className="flex flex-wrap items-center gap-2">
        {page > 1 && (
          <li>
            <Link href={go(page - 1)} className={`${base} border-slate-200 bg-white text-slate-800 hover:border-blue-300`}>
              Previous
            </Link>
          </li>
        )}
        {pageWindow(page, totalPages).map((p, i) =>
          p === "…" ? (
            <li key={`gap-${i}`} aria-hidden className="px-1 text-slate-400">…</li>
          ) : (
            <li key={p}>
              <Link
                href={go(p)}
                aria-current={p === page ? "page" : undefined}
                className={`${base} ${p === page ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-800 hover:border-blue-300"}`}
              >
                {p}
              </Link>
            </li>
          ),
        )}
        {page < totalPages && (
          <li>
            <Link href={go(page + 1)} className={`${base} border-slate-200 bg-white text-slate-800 hover:border-blue-300`}>
              Next
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
