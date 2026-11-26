import Link from "next/link";

export const metadata = {
  title: "Article not found",
  robots: { index: false, follow: false },
};

export default function BlogNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-11/12 max-w-xl flex-col items-center justify-center text-center">
      <p className="font-heading text-[11.5px] font-bold uppercase tracking-[1.6px] text-primary">
        404
      </p>
      <h1 className="mt-2 font-heading text-3xl font-extrabold text-ink">
        We couldn&apos;t find that article
      </h1>
      <p className="mt-3 text-muted">
        It may have been moved, unpublished, or the link is incorrect.
      </p>
      <Link
        href="/blogs"
        className="mt-6 rounded-xl bg-primary px-6 py-3 font-heading text-sm font-bold text-white transition hover:bg-primary-100"
      >
        Back to all articles
      </Link>
    </main>
  );
}
