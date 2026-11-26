import Link from "next/link";
import { blogHref } from "@/lib/blog/utils";
import PostThumb from "./PostThumb";
import PostMeta from "./PostMeta";

export default function PostCard({ blog }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-light-100 bg-white transition duration-150 hover:-translate-y-[3px] hover:border-[#dbe3f2] hover:drop-shadow-[0_10px_30px_rgba(16,30,66,0.09)]">
      <Link
        href={blogHref(blog.slug)}
        aria-label={blog.title}
        className="block"
      >
        <PostThumb
          src={blog.image}
          alt={blog.title}
          tag={blog.category?.name}
          className="aspect-[16/10]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 font-heading text-[16.5px] font-extrabold leading-[1.28] tracking-[-0.4px] text-ink transition-colors group-hover:text-primary">
          <Link href={blogHref(blog.slug)}>{blog.title}</Link>
        </h3>
        {blog.excerpt && (
          <p className="line-clamp-3 flex-1 text-[13px] leading-relaxed text-muted">
            {blog.excerpt}
          </p>
        )}
        <PostMeta
          blog={blog}
          className="mt-[15px] border-t border-light-200 pt-[14px]"
        />
      </div>
    </article>
  );
}
