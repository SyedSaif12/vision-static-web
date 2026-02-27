import { baseURL } from "@/redux/utils";
import ClientProductComponent from "./clientComponent";
import { stripHtml } from "@/helper/htmlConvertToText";

export async function generateMetadata({ params }) {
  // set metadata for SEO optimization
  const { slug } = await params;
  const res = await fetch(`${baseURL}products/${slug}`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  const product = data?.data;

  return {
    title: `${product.productTitle} | Buy Online in Pakistan`,
    description: product.description?.slice(0, 150) ?? "",
    keywords: [
      product?.products?.category.name,
      product?.products?.subCategory.name,
      product?.productTitle,
    ],
    openGraph: {
      title: product.productTitle,
      description:
        stripHtml(data?.data?.seoContent)?.slice(0, 160)?.trim() ?? "",
      images: [product.image?.[0]?.fileUrl],
    },
  };
}
// here is server component to fetch single product by slug and passing for ClientProductComponent
const page = async ({ params }) => {
  const { slug } = await params;
  const response = await fetch(`${baseURL}products/${slug}`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();

  return (
    <>
      {/* Additional information for SEO and Media Preview */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: data?.data?.productTitle,
            image: data?.data?.image?.[0]?.fileUrl,
            description: stripHtml(data?.data?.seoContent) ?? "",
            brand: {
              "@type": "Brand",
              name: data?.data?.products?.subCategory?.name ?? "",
            },
            offers: {
              "@type": "Offer",
              price: data?.data?.price ?? "",
              priceCurrency: "PKR",
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />
      {/* passing server feteched data for rendring */}
      <ClientProductComponent product={data?.data} />
    </>
  );
};

export default page;
