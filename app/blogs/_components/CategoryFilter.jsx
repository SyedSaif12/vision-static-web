import Link from "next/link";
import { listHref } from "@/lib/blog/utils";

const base =
  "rounded-full border-[1.5px] px-[18px] py-[9px] font-heading text-[13px] font-bold transition";
const on = "border-primary bg-primary text-white";
const off =
  "border-light-100 bg-white text-muted hover:border-primary hover:text-primary";

export default function CategoryFilter({ categories, active, search }) {
  if (!categories.length) return null;

  return (
    <nav
      aria-label="Filter by category"
      className="mb-[34px] flex flex-wrap justify-center gap-[9px]"
    >
      <Link
        href={listHref({ search })}
        scroll={false}
        aria-current={!active ? "true" : undefined}
        className={`${base} ${!active ? on : off}`}
      >
        All posts
      </Link>
      {categories.map((c) => {
        const isActive = active === c.slug;
        return (
          <Link
            key={c.slug}
            href={listHref({ category: c.slug, search })}
            scroll={false}
            aria-current={isActive ? "true" : undefined}
            className={`${base} ${isActive ? on : off}`}
          >
            {c.name}
          </Link>
        );
      })}
    </nav>
  );
}
