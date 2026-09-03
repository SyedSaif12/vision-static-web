import { Suspense } from "react";
import Loader from "@/components/Loading";
import { baseURL } from "@/redux/utils";
import ClientProductComponent from "./clientComponent";
import { stripHtml } from "@/helper/htmlConvertToText";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import { formatPrice } from "@/helper/formatPrice";

export async function generateMetadata({ params }) {
  // set metadata for SEO optimization
  const { slug } = await params;
  const res = await fetch(`${baseURL}products/${slug}`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  const product = data?.data;

  const productTitle = product?.productTitle;
  const currentYear = dayjs().year();

  return {
    title: `${productTitle} Price in Pakistan. ${currentYear}`,
    description: `Buy ${productTitle} at Rs ${formatPrice(product?.price)} in Pakistan. COD nationwide. Order online or inspect in Karachi.`,
    keywords: [
      product?.products?.category.name,
      product?.products?.subCategory.name,
      product?.productTitle,
    ],
    alternates: {
      canonical: `/product/${slug}`,
    },
    openGraph: {
      title: `${productTitle} Price in Pakistan. ${currentYear} | WeGot`,
      description: `Buy ${productTitle} at Rs ${formatPrice(product?.price)} in Pakistan. COD nationwide. Order online or inspect in Karachi.`,
      images: [product?.image?.[0]?.fileUrl],
    },
  };
}
// here is server component to fetch single product by slug and passing for ClientProductComponent
const page = async ({ params }) => {
  const { slug } = await params;
  const response = await fetch(`${baseURL}products/${slug}`, {
    // next: { revalidate: 60 },
    cache: "no-store",
  });
  const data = await response.json();
  const currentYear = dayjs().year();
  if (!data?.data) {
    return notFound();
  }

  return (
    <>
      {/* Additional information for SEO and Media Preview */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: `${data?.data?.productTitle} Price in Pakistan. ${currentYear} | WeGot`,
            image: data?.data?.image?.[0]?.fileUrl,
            description: stripHtml(data?.data?.seoContent) ?? "",
            brand: {
              "@type": "Brand",
              name: data?.data?.products?.subCategory?.name ?? "",
            },
            offers: {
              "@type": "Offer",
              price: formatPrice(data?.data?.price) ?? "",
              priceCurrency: "PKR",
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />
      {/* passing server feteched data for rendring */}
      <Suspense fallback={<Loader />}>
        {/* <Suspense
        fallback={
          <div className="w-screen h-screen absolute top-0 right-0 bottom-0 left-0 bg-red-700">
            <Loader />
          </div>
        }
      > */}
        <ClientProductComponent product={data?.data} />
      </Suspense>
    </>
  );
};

export default page;
