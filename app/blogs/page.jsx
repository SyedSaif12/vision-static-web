import Link from "next/link";
import { getBlogs, getBlogCategories, PAGE_SIZE } from "@/lib/blog/api";
import { SITE_URL, listHref } from "@/lib/blog/utils";
import BlogHero from "./_components/BlogHero";
import CategoryFilter from "./_components/CategoryFilter";
import FeaturedPost from "./_components/FeaturedPost";
import PostCard from "./_components/PostCard";
import BlogSidebar from "./_components/BlogSidebar";

const MAX_PAGES = 20;
const TITLE = "Blog – Buying Guides, Reviews & Tech Tips";
const DESCRIPTION =
  "Honest advice on laptops, phones, and appliances. Buying guides, reviews, and tech tips made for Pakistan, written by the WeGot team.";

const first = (v) => (Array.isArray(v) ? v[0] : v);

export async function generateMetadata({ searchParams }) {
  const sp = await searchParams;
  const filtered = Boolean(first(sp?.category) || first(sp?.search));

  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `${SITE_URL}/blogs` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/blogs`,
      title: TITLE,
      description: DESCRIPTION,
      siteName: "WeGot",
      locale: "en_PK",
    },
    // filter / search results duplicate content hain
    robots: { index: !filtered, follow: true },
  };
}

export default async function BlogsPage({ searchParams }) {
  const sp = await searchParams;
  const category = first(sp?.category)?.trim() || "";
  const search = first(sp?.search)?.trim() || "";
  const page = Math.min(
    Math.max(parseInt(first(sp?.page), 10) || 1, 1),
    MAX_PAGES,
  );

  // "Load more" ka matlab: ab tak ki saari posts dobara (page * PAGE_SIZE)
  const [list, categories] = await Promise.all([
    getBlogs({ page: 1, limit: page * PAGE_SIZE, category, search }).catch(
      () => null,
    ),
    getBlogCategories(),
  ]);

  const failed = list === null;
  const blogs = list?.blogs ?? [];
  const isDefaultView = !category && !search;

  // Pehli post "Editor's pick", baqi grid me
  const featured = isDefaultView ? blogs[0] : null;
  const gridPosts = featured ? blogs.slice(1) : blogs;

  const popular = [...blogs]
    .filter((b) => b.views > 0)
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);

  const activeCategory = categories.find((c) => c.slug === category);

  return (
    <main>
      <BlogHero search={search} category={category} />

      <section className="py-11 md:py-[60px]">
        <div className="mx-auto w-11/12 max-w-[1240px]">
          <CategoryFilter
            categories={categories}
            active={category}
            search={search}
          />

          {(search || activeCategory) && !failed && (
            <p className="mb-6 text-center text-sm text-muted">
              {list.total} {list.total === 1 ? "result" : "results"}
              {search && (
                <>
                  {" "}
                  for <b className="text-ink">&ldquo;{search}&rdquo;</b>
                </>
              )}
              {activeCategory && <> in {activeCategory.name}</>} ·{" "}
              <Link href="/blogs" className="font-semibold text-primary">
                Clear
              </Link>
            </p>
          )}

          {failed ? (
            <p className="py-[50px] text-center text-sm text-muted">
              We couldn&apos;t load the articles right now. Please try again in
              a moment.
            </p>
          ) : (
            <>
              {featured && <FeaturedPost blog={featured} />}

              {(gridPosts.length > 0 || !featured) && (
              <div className="grid items-start gap-[38px] lg:grid-cols-[1fr_322px]">
                <div>
                  {gridPosts.length > 0 ? (
                    <div className="grid gap-6 min-[561px]:grid-cols-2">
                      {gridPosts.map((b) => (
                        <PostCard key={b.id} blog={b} />
                      ))}
                    </div>
                  ) : (
                    !featured && (
                      <p className="py-[50px] text-center text-sm text-muted">
                        No posts{" "}
                        {search || activeCategory ? "match your search" : "yet"}
                        . Check back soon.
                      </p>
                    )
                  )}

                  {list.hasMore && (
                    <div className="mt-9 text-center">
                      <Link
                        href={listHref({ category, search, page: page + 1 })}
                        scroll={false}
                        className="inline-flex items-center justify-center rounded-[13px] border-[1.5px] border-light-100 bg-white px-[26px] py-[15px] font-heading text-[15px] font-bold text-ink transition hover:border-primary hover:text-primary"
                      >
                        Load more posts
                      </Link>
                    </div>
                  )}
                </div>

                <BlogSidebar popular={popular} categories={categories} />
              </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
