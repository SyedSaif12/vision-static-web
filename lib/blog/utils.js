import dayjs from "dayjs";
import sanitizeHtml from "sanitize-html";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const DEFAULT_AUTHOR = "WeGot Team";

const str = (v) => (typeof v === "string" && v.trim() ? v.trim() : null);
const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

const firstArray = (...candidates) => candidates.find(Array.isArray) ?? [];

const stripTags = (html = "") =>
  sanitizeHtml(String(html), { allowedTags: [], allowedAttributes: {} })
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/* -------------------------------------------------------------------------- */
/*  Normalizers: backend shape ko ek jaisa banate hain                         */
/* -------------------------------------------------------------------------- */

export function normalizeCategory(raw) {
  if (!raw) return null;
  if (typeof raw === "string") return { name: raw, slug: raw, count: null };

  const name = str(raw.name) ?? str(raw.title);
  if (!name) return null;

  return {
    name,
    slug: str(raw.slug) ?? str(raw._id) ?? str(raw.id) ?? name,
    count: num(
      raw.publishedBlogsCount ??
        raw.blogCount ??
        raw.blogsCount ??
        raw.totalBlogs ??
        raw.count ??
        raw._count?.blogs,
    ),
  };
}

function normalizeImage(raw) {
  if (!raw) return null;
  if (typeof raw === "string") return str(raw);
  if (Array.isArray(raw)) return normalizeImage(raw[0]);
  return str(raw.fileUrl) ?? str(raw.url) ?? str(raw.src);
}

function normalizeKeywords(raw) {
  if (Array.isArray(raw)) return raw.map(str).filter(Boolean);
  if (typeof raw === "string")
    return raw
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
  return [];
}

export function estimateReadTime(html = "") {
  const words = stripTags(html).split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function normalizeBlog(raw) {
  if (!raw || typeof raw !== "object") return null;
  const slug = str(raw.slug);
  const title = str(raw.title);
  if (!slug || !title) return null;

  const content = typeof raw.content === "string" ? raw.content : "";
  const authorName =
    typeof raw.author === "string"
      ? str(raw.author)
      : (str(raw.author?.name) ?? str(raw.authorName));

  return {
    id: raw._id ?? raw.id ?? slug,
    slug,
    title,
    excerpt:
      str(raw.excerpt) ??
      str(raw.shortDescription) ??
      str(raw.description) ??
      (content ? stripTags(content).slice(0, 180) : ""),
    content,
    image: normalizeImage(
      raw.coverImage ?? raw.image ?? raw.thumbnail ?? raw.featuredImage,
    ),
    category: normalizeCategory(raw.category ?? raw.categories?.[0]),
    author: authorName ?? DEFAULT_AUTHOR,
    publishedAt: raw.publishedAt ?? raw.createdAt ?? null,
    readTime:
      num(raw.readTime ?? raw.readingTime) ??
      (content ? estimateReadTime(content) : null),
    views: num(raw.views ?? raw.viewCount) ?? 0,
    metaTitle: str(raw.metaTitle) ?? str(raw.meta_title),
    metaDescription: str(raw.metaDescription) ?? str(raw.meta_description),
    keywords: normalizeKeywords(raw.keywords),
  };
}

export function normalizeBlogList(json, limit) {
  const data = json?.data ?? json;
  const rows = firstArray(
    data,
    data?.blogs,
    data?.rows,
    data?.items,
    data?.docs,
    data?.results,
    json?.blogs,
  );
  const pg = data?.pagination ?? json?.pagination ?? json?.meta ?? {};
  const total = num(
    pg.total ?? pg.totalCount ?? pg.totalItems ?? data?.total ?? json?.total,
  );

  const blogs = rows.map(normalizeBlog).filter(Boolean);
  const totalPages = num(pg.totalPages ?? pg.pages ?? data?.totalPages);
  const currentPage = num(pg.page ?? data?.page ?? json?.page) ?? 1;
  const hasMore =
    totalPages !== null
      ? currentPage < totalPages
      : total !== null
        ? rows.length < total
        : rows.length >= limit;

  return { blogs, total: total ?? blogs.length, hasMore };
}

export function normalizeCategoryList(json) {
  const data = json?.data ?? json;
  return firstArray(data, data?.categories, data?.rows, data?.items)
    .map(normalizeCategory)
    .filter(Boolean);
}

/* -------------------------------------------------------------------------- */
/*  Display helpers                                                           */
/* -------------------------------------------------------------------------- */

export const formatDate = (value) => {
  const d = dayjs(value);
  return value && d.isValid() ? d.format("D MMM YYYY") : "";
};

export const initials = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("") || "WG";

export const formatViews = (n) =>
  new Intl.NumberFormat("en-US", { notation: "compact" }).format(n || 0);

export const blogHref = (slug) => `/blogs/${encodeURIComponent(slug)}`;

/** /blogs?category=..&search=..&page=.. (khali values chhor deta hai) */
export function listHref({ category, search, page } = {}) {
  const p = new URLSearchParams();
  if (category) p.set("category", category);
  if (search) p.set("search", search);
  if (page && page > 1) p.set("page", String(page));
  const qs = p.toString();
  return qs ? `/blogs?${qs}` : "/blogs";
}

/* -------------------------------------------------------------------------- */
/*  Rich text sanitizer (CMS editor output)                                   */
/* -------------------------------------------------------------------------- */

const SANITIZE_OPTIONS = {
  allowedTags: [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "br",
    "hr",
    "strong",
    "b",
    "em",
    "i",
    "u",
    "s",
    "sub",
    "sup",
    "mark",
    "ul",
    "ol",
    "li",
    "a",
    "blockquote",
    "pre",
    "code",
    "span",
    "div",
    "img",
    "figure",
    "figcaption",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel", "title"],
    img: ["src", "alt", "title", "width", "height", "loading"],
    th: ["colspan", "rowspan"],
    td: ["colspan", "rowspan"],
    code: ["class"],
    pre: ["class"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: { img: ["http", "https"] },
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", {
      target: "_blank",
      rel: "noopener noreferrer",
    }),
    img: sanitizeHtml.simpleTransform("img", { loading: "lazy" }, true),
  },
};

export const sanitizeBlogHtml = (html) =>
  typeof html === "string" ? sanitizeHtml(html, SANITIZE_OPTIONS).trim() : "";

export const jsonLd = (data) => JSON.stringify(data).replace(/</g, "\\u003c");
