export const dynamic = "force-static";
export default function robots() {
  const public_url = process.env.NEXT_PUBLIC_URL;
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/", // allow for all public routes
        ],
        disallow: ["/checkout/", "/installment/", "/order-confirmation/"],
      },
    ],
    sitemap: `${public_url}/sitemap.xml`,
  };
}
