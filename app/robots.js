export const dynamic = "force-static";

export default function robots() {
  const publicUrl = (
    process.env.NEXT_PUBLIC_URL || "http://localhost:3000"
  ).replace(/\/+$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/", // allow for all public routes
        ],
        disallow: [
          "/api/",
          "/accounts/",
          "/profile/",
          "/cart/",
          "/checkout/",
          "/installment/",
          "/instalment-plan/",
          "/order-confirmation/",
        ],
      },
    ],
    sitemap: `${publicUrl}/sitemap.xml`,
  };
}
