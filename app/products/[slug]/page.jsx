import { notFound } from "next/navigation";
import ProductActions from "./ProductActions";
import ProductGallery from "./ProductGallery";
import { getInstallmentPlan, getSingleProduct } from "@/lib/product-query/fetch-api";
import { formatPrice, humanize, stripHtml, getTags, getBankPlans, getSpecs, parseFaq, jsonLd } from "@/lib/utils";
import InstalmentTable from "./InstalmentTable";
import { STOCK, BuyingGuide, FaqSection, SeoContent, SectionTabs, SpecsTable, DeliveryInfo, WhatsAppCta, WhatYouGet, StockBadge, PriceBlock, Breadcrumb, BUYING_GUIDES } from './_components/AllComponents'
const SITE_URL = (
  process.env.NEXT_PUBLIC_URL || "http://localhost:3000"
).replace(/\/$/, "");

const REVALIDATE_SECONDS = 3600;

/* -------------------------------------------------------------------------- */
/*  SEO                                                                        */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getSingleProduct(slug);

  if (!product) {
    return {
      title: "Product not found | WeGot",
      robots: { index: false, follow: false },
    };
  }

  const url = `${SITE_URL}/products/${product.slug}`;
  const image = product.image?.[0]?.fileUrl;
  const title = `${product.productTitle} Price in Pakistan | WeGot`;
  const metaTitle = product?.meta_title
  const metaDescription = product?.meta_description
  // description backend se nahi li: usme purani price likhi hai (699,999 vs 714,999)
  const description = `Buy ${product.productTitle} at ${formatPrice(
    product.price,
    "Rs ",
  )} in Pakistan. Genuine product, ${product.attributes?.warranty || "warranty included"}, free delivery and cash on delivery from WeGot.`;

  return {
    title: metaTitle || title,
    description: metaDescription || description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: metaTitle || title,
      description: metaDescription || description,
      siteName: "WeGot",
      locale: "en_PK",
      images: image ? [{ url: image, alt: product.productTitle }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle || title,
      description: metaDescription || description,
      images: image ? [image] : undefined,
    },
    robots: { index: true, follow: true },
  };
}

/* -------------------------------------------------------------------------- */
/*  Structured data                                                            */
/* -------------------------------------------------------------------------- */

function StructuredData({ product, faqItems }) {
  const url = `${SITE_URL}/products/${product.slug}`;
  const images = (product.image || []).map((i) => i.fileUrl).filter(Boolean);
  const category = product.products?.category?.name;
  const brand =
    product.attributes?.brand || product.products?.subCategory?.name;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.productTitle,
    image: images,
    description: stripHtml(product.description),
    sku: product.productId,
    mpn: product.productId,
    brand: brand ? { "@type": "Brand", name: humanize(brand) } : undefined,
    category: category ? humanize(category) : undefined,
    url,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "PKR",
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability: product.isComingSoon
        ? "https://schema.org/PreOrder"
        : (STOCK[product.status]?.schema ?? "https://schema.org/InStock"),
      seller: { "@type": "Organization", name: "WeGot" },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { name: "Home", item: SITE_URL },
      category && { name: humanize(category), item: `${SITE_URL}/${category}` },
      { name: product.productTitle, item: url },
    ]
      .filter(Boolean)
      .map((el, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: el.name,
        item: el.item,
      })),
  };

  const faqLd = faqItems.length
    ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.text },
      })),
    }
    : null;

  return (
    <>
      {[productLd, breadcrumbLd, faqLd].filter(Boolean).map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(d) }}
        />
      ))}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const results = await Promise.allSettled([
    getSingleProduct(slug),
    getInstallmentPlan()
  ])

  const [productResult, instalmentResult] = results
  const product = productResult.status === 'fulfilled' ? productResult.value : null
  const instalmentBanks = getBankPlans(
    instalmentResult.status === "fulfilled" ? instalmentResult.value : {},
  );
  if (!product) notFound();

  const tags = getTags(product);
  const specs = getSpecs(product.attributes);
  const faqItems = parseFaq(product.faq);
  const brand =
    product.attributes?.brand || product.products?.subCategory?.name;
  const hasSpecs = specs.length > 0;
  const hasOverview = !!stripHtml(product.seoContent);
  const hasExpertReview = !!stripHtml(product?.expertReview);
  const hasWhatsInTheBox = !!stripHtml(product?.hasWhatsInTheBox);
  const hasFaqs = faqItems.length > 0;
  const unavailable = product.status === "out_of_stock" || product.isComingSoon;
  
  return (
    <main className="bg-surface pb-16">
      <StructuredData product={product} faqItems={faqItems} />

      <div className="mx-auto w-11/12 pt-5">
        <Breadcrumb product={product} />

        {/* Hero */}
        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          <ProductGallery
            key={product.slug}
            images={product.image}
            title={product.productTitle}
            tags={tags}
          />

          <div className="rounded-2xl border border-light-100 bg-white p-5 sm:p-7">
            {brand && (
              <p className="text-sm font-medium text-muted">
                {humanize(brand)}
              </p>
            )}
            <h1 className="mt-1 font-heading text-xl font-extrabold leading-snug text-ink sm:text-2xl">
              {product.productTitle}
            </h1>

            <hr className="my-4 border-light-100" />

            <PriceBlock product={product} banks={instalmentBanks} />
            <div className="mt-3">
              <StockBadge
                status={product.status}
                isComingSoon={product.isComingSoon}
              />
            </div>

            <div className="mt-5 space-y-3">
              <ProductActions
                disabled={unavailable}
                product={{
                  id: product.productId,
                  slug: product.slug,
                  title: product.productTitle,
                  price: product.price,
                  image: product.image?.[0]?.fileUrl ?? null,
                }}
              />
              <WhatsAppCta title={product.productTitle} />
            </div>

            <div className="mt-5 space-y-4">
              <WhatYouGet warranty={product.attributes?.warranty} />
              <DeliveryInfo />
              {instalmentBanks.length > 0 && (
                <InstalmentTable price={product.price} banks={instalmentBanks} />
              )}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="mt-10">
          <SectionTabs hasSpecs={hasSpecs}
            hasOverview={hasOverview}
            hasExpertReview={hasExpertReview}
            hasWhatsInTheBox={hasWhatsInTheBox}
            hasFaqs={hasFaqs} />
          <div className="mt-8 space-y-12">
            <SpecsTable title={product.productTitle} specs={specs} />
            <SeoContent html={product.seoContent} />
            <SeoContent html={product.expertReview} id="expert-review" />
            <SeoContent html={product.whatsInTheBox} id="whats-in-the-box" />
            <FaqSection items={faqItems} />
            <BuyingGuide guide={BUYING_GUIDES} />
          </div>
        </div>
      </div>
    </main>
  );
}
