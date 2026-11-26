import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, Eye } from "lucide-react";
import { getBlog } from "@/lib/blog/api";
import {
  SITE_URL,
  blogHref,
  formatDate,
  formatViews,
  jsonLd,
  listHref,
  sanitizeBlogHtml,
} from "@/lib/blog/utils";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Article not found",
      robots: { index: false, follow: false },
    };
  }

  const url = `${SITE_URL}${blogHref(blog.slug)}`;
  const title = blog.metaTitle || blog.title;
  const description = blog.metaDescription || blog.excerpt || undefined;

  return {
    title,
    description,
    keywords: blog.keywords.length ? blog.keywords : undefined,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "WeGot",
      locale: "en_PK",
      publishedTime: blog.publishedAt || undefined,
      authors: [blog.author],
      images: blog.image ? [{ url: blog.image, alt: blog.title }] : undefined,
    },
    twitter: {
      card: blog.image ? "summary_large_image" : "summary",
      title,
      description,
      images: blog.image ? [blog.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  const html = sanitizeBlogHtml(blog.content);
  const date = formatDate(blog.publishedAt);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.metaDescription || blog.excerpt || undefined,
    image: blog.image || undefined,
    datePublished: blog.publishedAt || undefined,
    author: { "@type": "Person", name: blog.author },
    publisher: { "@type": "Organization", name: "WeGot" },
    mainEntityOfPage: `${SITE_URL}${blogHref(blog.slug)}`,
    keywords: blog.keywords.length ? blog.keywords.join(", ") : undefined,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articleLd) }}
      />

      <article>
        <header className="border-b border-light-200 bg-gradient-to-b from-light to-white">
          <div className="mx-auto w-11/12 max-w-[820px] pb-9 pt-10">
            <nav
              aria-label="Breadcrumb"
              className="mb-[18px] flex flex-wrap items-center gap-2 text-[12.5px] text-muted"
            >
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span aria-hidden="true" className="opacity-50">
                &rsaquo;
              </span>
              <Link href="/blogs" className="hover:text-primary">
                Blog
              </Link>
              <span aria-hidden="true" className="opacity-50">
                &rsaquo;
              </span>
              <span aria-current="page" className="line-clamp-1">
                {blog.title}
              </span>
            </nav>

            {blog.category && (
              <Link
                href={listHref({ category: blog.category.slug })}
                className="mb-4 inline-flex items-center gap-[9px] rounded-full bg-light-50 px-3.5 py-[5px] font-heading text-[11.5px] font-bold uppercase tracking-[1.4px] text-primary transition hover:bg-[#dce8ff]"
              >
                <span className="h-0.5 w-[18px] rounded-sm bg-gold" />
                {blog.category.name}
              </Link>
            )}

            <h1 className="font-heading text-[27px] font-extrabold leading-[1.1] tracking-[-1.2px] text-ink sm:text-[34px] md:text-[44px]">
              {blog.title}
            </h1>

            <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px] text-muted">
              {date && (
                <li className="flex items-center gap-1.5">
                  <CalendarDays size={16} />
                  <time dateTime={blog.publishedAt}>{date}</time>
                </li>
              )}
              {blog.readTime && (
                <li className="flex items-center gap-1.5">
                  <Clock size={16} />
                  {blog.readTime} min read
                </li>
              )}
              <li className="flex items-center gap-1.5">
                <Eye size={16} />
                {formatViews(blog.views)} {blog.views === 1 ? "view" : "views"}
              </li>
            </ul>
          </div>
        </header>

        <div className="mx-auto w-11/12 max-w-[820px] py-10">
          {blog.image && (
            <figure className="mb-10 overflow-hidden rounded-[22px] border border-light-100 drop-shadow-[0_10px_30px_rgba(16,30,66,0.09)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blog.image}
                alt={blog.title}
                className="aspect-[16/9] w-full object-cover"
              />
            </figure>
          )}

          {html ? (
            <div
              className="prose prose-lg max-w-none text-ink-50
                prose-headings:font-heading prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-ink
                prose-h1:text-[32px] prose-h2:mt-10 prose-h2:text-[26px] prose-h3:text-[21px]
                prose-p:leading-[1.8]
                prose-a:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-ink
                prose-blockquote:rounded-r-xl prose-blockquote:border-l-4 prose-blockquote:border-gold prose-blockquote:bg-light prose-blockquote:px-5 prose-blockquote:py-1 prose-blockquote:font-medium prose-blockquote:not-italic prose-blockquote:text-ink
                prose-li:marker:text-primary
                prose-code:rounded prose-code:bg-light-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.9em] prose-code:font-semibold prose-code:text-primary-200 prose-code:before:content-none prose-code:after:content-none
                prose-pre:rounded-xl prose-pre:bg-ink prose-pre:text-white
                prose-img:rounded-2xl"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <p className="text-muted">This article has no content yet.</p>
          )}

          <div className="mt-12 border-t border-light-100 pt-6">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 font-heading text-[14px] font-bold text-primary"
            >
              <ArrowLeft size={18} strokeWidth={2.2} />
              Back to all articles
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
