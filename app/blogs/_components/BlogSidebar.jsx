import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { blogHref, listHref } from "@/lib/blog/utils";
import { whatsappLink } from "@/app/instalment-plan/_lib/constants";

function CardTitle({ children }) {
  return (
    <h4 className="mb-4 flex items-center gap-[9px] font-heading text-[15px] font-extrabold text-ink">
      <span className="h-4 w-1 rounded-sm bg-gold" />
      {children}
    </h4>
  );
}

const card =
  "rounded-2xl border border-light-100 bg-white p-6 drop-shadow-[0_3px_10px_rgba(16,30,66,0.05)]";

export default function BlogSidebar({ popular, categories }) {
  return (
    <aside className="flex flex-col gap-[22px] max-[980px]:flex-row max-[980px]:flex-wrap max-[560px]:flex-col">
      {popular.length > 0 && (
        <div className={`${card} max-[980px]:min-w-[260px] max-[980px]:flex-1`}>
          <CardTitle>Most read</CardTitle>
          <ul>
            {popular.map((b, i) => (
              <li
                key={b.id}
                className="group flex items-start gap-[13px] border-b border-light-200 py-3 first:pt-0 last:border-b-0 last:pb-0"
              >
                <span className="w-[22px] flex-none font-heading text-[20px] font-extrabold leading-[1.1] text-[#cdd8ee]">
                  {i + 1}
                </span>
                <Link href={blogHref(b.slug)}>
                  <b className="block font-heading text-[13.5px] font-bold leading-[1.3] text-ink transition-colors group-hover:text-primary">
                    {b.title}
                  </b>
                  <small className="text-[11.5px] text-faint">
                    {[b.category?.name, b.readTime && `${b.readTime} min`]
                      .filter(Boolean)
                      .join(" · ")}
                  </small>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {categories.length > 0 && (
        <div className={`${card} max-[980px]:min-w-[260px] max-[980px]:flex-1`}>
          <CardTitle>Browse by topic</CardTitle>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={listHref({ category: c.slug })}
                className="rounded-full border border-light-100 bg-surface px-[13px] py-[7px] text-[12.5px] font-semibold text-muted transition hover:border-[#dce8ff] hover:bg-light-50 hover:text-primary"
              >
                {c.name}
                {c.count !== null && (
                  <span className="ml-1.5 text-faint">{c.count}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-[#cdeeda] bg-[#eafaf0] px-6 py-[26px] text-center max-[980px]:min-w-[260px] max-[980px]:flex-1">
        <span className="mx-auto mb-3.5 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-white text-green">
          <MessageCircle size={24} fill="currentColor" strokeWidth={0} />
        </span>
        <h4 className="mb-[7px] font-heading text-[16px] font-extrabold text-ink">
          Get new posts on WhatsApp
        </h4>
        <p className="mb-4 text-[13px] text-ink-50">
          New guides, honest reviews, and deal alerts. No spam, just the useful
          stuff.
        </p>
        <a
          href={whatsappLink("Hi WeGot, please add me to blog updates.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center rounded-xl bg-green px-[22px] py-[13px] font-heading text-[14px] font-bold text-white transition hover:brightness-95"
        >
          Join on WhatsApp
        </a>
      </div>
    </aside>
  );
}
