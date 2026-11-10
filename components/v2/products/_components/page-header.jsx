import { buildBreadcrumbs } from "@/lib/product-query/breadcrumbs";
import { getDeals } from "@/lib/product-query/fetch-api";
import Link from "next/link";
import { Fragment } from "react";

const mappedQuery = {
  isFeatured: "Featured",
  deals: "Deals",
  isComingSoon: "Coming Soon",
  "open-box": "Open Box",
  refurbished: "Refusbished",
  "new-arrivals": "New Arrivals",
  "brand-new": "Brand New",
  "used-products": "Used Products",
};

const prettify = (label) => label.replace(/-/g, " ");

export function PageHeader({ query }) {
  const activeFilterKey = Object.keys(mappedQuery).find(
    (key) => query[key] === "true" || query[key] === true || query.tag === key,
  );

  const filterLabel = activeFilterKey ? mappedQuery[activeFilterKey] : null;

  const crumbs = buildBreadcrumbs(query, filterLabel);

  const heroData = activeFilterKey ? PAGE_HEADER_CONFIG[activeFilterKey] : null;

  const title = query.category ?? "All products";
  const brand = query?.subCategory ?? "";
  const pills = query?.name ?? "";

  return (
    <header className="">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="text-xs text-slate-500 md:text-sm lg:text-base"
      >
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <Fragment key={`${crumb.label}-${i}`}>
              {i > 0 && <span className="mx-1.5">/</span>}
              {isLast ? (
                <span aria-current="page" className="capitalize text-slate-800">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="capitalize hover:text-blue-700"
                >
                  {crumb.label}
                </Link>
              )}
            </Fragment>
          );
        })}
      </nav>
      {/* <nav
        aria-label="Breadcrumb"
        className="text-xs text-slate-500 md:text-sm lg:text-base"
      >
        <Link href="/" className="hover:text-blue-700">
          Home
        </Link>

        <span className="mx-1.5">/</span>

        <Link href={PRODUCTS_PATH} className="hover:text-blue-700">
          Products
        </Link>

        {query.category && (
          <>
            <span className="mx-1.5">/</span>
            <span className="capitalize text-slate-800">
              {prettify(query.category)}
            </span>
          </>
        )}

         {!!brand && (
          <>
            <span className="mx-1.5">/</span>
            <span className="capitalize text-slate-800">
              {prettify(brand)}
            </span>
          </>
        )}

         {!!pills && (
          <>
            <span className="mx-1.5">/</span>
            <span className="capitalize text-slate-800">
              {prettify(pills)}
            </span>
          </>
        )}

        {filterLabel && (
          <>
            <span className="mx-1.5">/</span>
            <span className="text-slate-800">
              {filterLabel}
            </span>
          </>
        )}
      </nav> */}

      {/* Dynamic Hero */}
      {heroData ? (
        <PageHeroBanner data={heroData} />
      ) : (
        /* Default Page Heading */
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 capitalize">
          {!pills && prettify(brand)} {prettify(pills)} {prettify(title)} price
          in Pakistan
        </h1>
      )}
    </header>
  );
}

export async function PageHeroBanner({ data }) {
  if (!data) return null;

  let {
    title,
    label,
    description,
    eyebrow,
    color,
    blendColor,
    cards = [],
  } = data;

  if (label === "Deals") {
    const dealsData = await getDeals();
    if (dealsData) {
      title = dealsData.heading ?? title;
      description = dealsData.description ?? description;
      eyebrow = dealsData.eyeBrow ?? eyebrow;
      cards = dealsData?.cards ?? [];
    }
  }

  const visibleCards = cards.filter((card) => card.title || card.description);

  return (
    <section
      className="mt-5 overflow-hidden rounded-[24px] h-[196px] px-6 py-3 md:px-10 md:py-5"
      style={{
        "--hero-color": color,
        "--hero-blend-color": blendColor,
        background: `
          linear-gradient(
            110deg,
            color-mix(in srgb, var(--hero-blend-color) 0%, var(--hero-color)),
            color-mix(in srgb, var(--hero-blend-color) 100%, var(--hero-color))
          )
        `,
      }}
    >
      <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1.4fr]">
        {/* Left Content */}
        <div>
          {eyebrow && (
            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-eyebrow font-bold tracking-widest text-white">
              {eyebrow}
            </span>
          )}

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white md:text-4xl">
            {title}
          </h2>

          {description && (
            <p className="mt-4 max-w-2xl text-sm leading-5 text-white md:text-base">
              {description}
            </p>
          )}
        </div>

        {/* Right Cards */}
        {visibleCards.length > 0 && (
          <div className="hidden md:grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {visibleCards.map((card, index) => (
              <div
                key={`${card.title || "card"}-${index}`}
                className="flex min-h-[96px] flex-col justify-center rounded-lg border border-white/40 bg-white/15 px-5 py-2 backdrop-blur-sm"
              >
                {card.title && (
                  <h3 className="text-base font-bold text-white">
                    {card.title}
                  </h3>
                )}

                {card.description && (
                  <p className="mt-2 text-sm leading-4 text-white">
                    {card.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export const PAGE_HEADER_CONFIG = {
  isFeatured: {
    label: "Featured",
    title: "Featured Products",
    description:
      "Our best picks right now, across laptops, phones, Dyson, audio and more. Choose a category to see only what you need.",

    eyebrow: "Handpicked by the WeGot team",

    color: "#143D9B",
    blendColor: "#4367DE",

    // cards: [
    //   {
    //     title: "Premium Selection",
    //     description: "Carefully selected products for you.",
    //   },
    //   {
    //     title: "Quality Assured",
    //     description: "Every product meets our quality standards.",
    //   },
    //   {
    //     title: "Best Prices",
    //     description: "Shop premium products at competitive prices.",
    //   },
    // ],
  },

  deals: {
    label: "Deals",
    title: "Exclusive Deals",
    description:
      "Discover amazing deals and save more on your favorite products.",

    // Eyebrow optional
    color: "#143D9B",
    blendColor: "#4367DE",

    cards: [
      {
        title: "Limited Offers",
        description: "Grab exciting deals before they expire.",
      },
      {
        title: "Best Prices",
        description: "Get more value for your money.",
      },
    ],
  },

  isComingSoon: {
    label: "Coming Soon",
    title: "Coming Soon",
    description: "Get ready for the latest products and exciting new arrivals.",

    color: "#143D9B",
    blendColor: "#4367DE",

    cards: [
      {
        title: "Upcoming Products",
        description: "Explore products arriving soon.",
      },
    ],
  },

  "open-box": {
    label: "Open Box",
    title: "Open Box Deals",
    description:
      "Box opened, product unused. Checked by Aitebaar Squad and sold with warranty, for less.",

    eyebrow: "NEW · LIMITED STOCK",

    color: "#7E4D12",
    blendColor: "#EF9A2C",

    cards: [
      {
        title: "Box opened",
        description: "Opened for display, or returned unused within 7 days.",
      },
      {
        title: "Checked",
        description: "Tested by Aitebaar Squad before sale.",
      },
      {
        title: "Warranty",
        description: "Sold with warranty, at a lower price.",
      },
    ],
  },

  // refurbished: {
  //   label: "Refurbished",
  //   title: "Refurbished Products",
  //   description:
  //     "Quality-tested refurbished products at affordable prices.",

  //   color: "#0891B2",
  //   blendColor: "#EF9A2C",

  //   cards: [
  //     {
  //       title: "Quality Tested",
  //       description: "Professionally inspected products.",
  //     },
  //     {
  //       title: "Affordable",
  //       // Description optional
  //     },
  //   ],
  // },

  "new-arrivals": {
    label: "New Arrivals",
    title: "Latest Arrivals",
    description:
      "Discover the latest technology and products available in our store.",

    eyebrow: "JUST ARRIVED",

    color: "#143D9B",
    blendColor: "#4367DE",

    // Cards optional
  },

  // "brand-new": {
  //   label: "Brand New",
  //   title: "Brand New Products",
  //   description:
  //     "Shop brand-new products with original packaging and warranty.",

  //   color: "#0D9488",
  //   blendColor: "#EF9A2C",
  // },

  // "used-products": {
  //   label: "Used Products",
  //   title: "Pre-Owned Products",
  //   description:
  //     "Explore carefully selected pre-owned products at great prices.",

  //   eyebrow: "VALUE FOR MONEY",

  //   color: "#475569",
  //   blendColor: "#EF9A2C",

  //   cards: [
  //     {
  //       title: "Inspected",
  //       description: "Products checked before listing.",
  //     },
  //   ],
  // },
};
