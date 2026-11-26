import { formatDate, initials } from "@/lib/blog/utils";

const Dot = () => (
  <span aria-hidden="true" className="h-[3px] w-[3px] rounded-full bg-faint" />
);

/** Author avatar · name · date · read time (card + featured ke liye) */
export default function PostMeta({ blog, className = "" }) {
  const date = formatDate(blog.publishedAt);

  return (
    <div
      className={`flex flex-wrap items-center gap-x-[9px] gap-y-1 text-[12px] text-faint ${className}`}
    >
      <span className="flex h-[27px] w-[27px] flex-none items-center justify-center rounded-full bg-light-50 font-heading text-[11px] font-extrabold text-primary">
        {initials(blog.author)}
      </span>
      <b className="font-heading text-[12.5px] font-semibold text-ink-50">
        {blog.author}
      </b>
      {date && (
        <>
          <Dot />
          <span>{date}</span>
        </>
      )}
      {blog.readTime && (
        <>
          <Dot />
          <span>{blog.readTime} min read</span>
        </>
      )}
    </div>
  );
}
