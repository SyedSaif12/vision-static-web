import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogHref } from "@/lib/blog/utils";
import PostThumb from "./PostThumb";
import PostMeta from "./PostMeta";

export default function FeaturedPost({ blog }) {
  return (
    <article className="group mb-11 grid overflow-hidden rounded-[22px] border border-light-100 bg-white drop-shadow-[0_10px_30px_rgba(16,30,66,0.09)] md:grid-cols-[1.15fr_1fr]">
      <Link href={blogHref(blog.slug)} aria-label={blog.title} className="block">
        <PostThumb
          src={blog.image}
          alt={blog.title}
          className="min-h-[220px] md:h-full"
          glyphClass="h-[84px] w-[84px]"
          priority
        />
      </Link>

      <div className="flex flex-col justify-center px-[26px] py-[30px] md:px-[38px] md:py-10">
        <span className="mb-3.5 flex items-center gap-[9px] font-heading text-[11.5px] font-bold uppercase tracking-[1.4px] text-primary before:h-0.5 before:w-[26px] before:rounded-sm before:bg-gold before:content-['']">
          Editor&apos;s pick{blog.category ? ` · ${blog.category.name}` : ""}
        </span>
        <h2 className="mb-3 font-heading text-[23px] font-extrabold leading-[1.18] tracking-[-0.6px] text-ink md:text-[28px]">
          {blog.title}
        </h2>
        {blog.excerpt && (
          <p className="mb-5 line-clamp-4 text-[14.5px] text-muted">
            {blog.excerpt}
          </p>
        )}
        <PostMeta blog={blog} className="mb-[22px]" />
        <Link
          href={blogHref(blog.slug)}
          className="inline-flex items-center gap-2 self-start font-heading text-[14px] font-bold text-primary"
        >
          Read the guide
          <ArrowRight
            size={18}
            strokeWidth={2.2}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
