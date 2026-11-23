export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}) {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url: path,
      title,
      description,
      siteName: "WeGot",
      locale: "en_PK",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
