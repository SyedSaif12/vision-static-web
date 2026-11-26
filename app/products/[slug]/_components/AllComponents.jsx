import Link from "next/link";
import { formatPrice, humanize } from "@/lib/utils";
import sanitizeHtml from "sanitize-html";
import { hrefFor } from "@/lib/product-query/query";

// Rich text editor jo tags banata hai, sirf wahi allow hain
const SANITIZE_OPTIONS = {
  allowedTags: [
    "p",
    "br",
    "strong",
    "b",
    "em",
    "i",
    "u",
    "s",
    "ul",
    "ol",
    "li",
    "h2",
    "h3",
    "h4",
    "a",
    "blockquote",
    "span",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  // Har link safe rahe
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", {
      target: "_blank",
      rel: "noopener noreferrer nofollow",
    }),
  },
};

export const BUYING_GUIDES = {
  title: "Product buying guide",
  text: "A short guide from the WeGot team to help you choose the right one.",
  // url: "https://www.youtube.com/@wegotpk",
  url: "https://www.youtube.com/embed/54Ej0JdngZI?si=vhZx6QiMXfhbbFhv",
};

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_ADMIN_NUMBER || "923260220581";

export const STOCK = {
  in_stock: {
    label: "In stock",
    schema: "https://schema.org/InStock",
    cls: "bg-green/10 text-green",
    dot: "bg-green",
  },
  out_stock: {
    label: "Out of stock",
    schema: "https://schema.org/OutOfStock",
    cls: "bg-red/10 text-red",
    dot: "bg-red",
  },
  on_order: {
    label: "On Order",
    schema: "https://schema.org/PreOrder",
    cls: "bg-gold-50 text-gold-700",
    dot: "bg-gold-600",
  },
};

export const PRODUCT_STATUS = {
  IN_STOCK: "in_stock",
  OUT_STOCK: "out_stock",
  ON_ORDER: "on_order",
  DISCONTINUE: "discontinued",
  COMING_SOON: "coming_soon",
};

// Colors matched to your 5 status states (badge, callout box, dot, price style)
export const STATUS_COLOR_SCHEME = {
  [PRODUCT_STATUS.IN_STOCK]: {
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    badgeBorder: "border-emerald-200",
    dotColor: "bg-emerald-500",
    boxBg: "bg-emerald-50/70",
    boxBorder: "border-emerald-200",
    boxText: "text-emerald-950",
    priceClass: "text-slate-900",
  },
  [PRODUCT_STATUS.OUT_STOCK]: {
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-700",
    badgeBorder: "border-rose-200",
    dotColor: "bg-rose-500",
    boxBg: "bg-rose-50/80",
    boxBorder: "border-rose-100",
    boxText: "text-rose-950",
    priceClass: "text-slate-900",
  },
  [PRODUCT_STATUS.ON_ORDER]: {
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-800",
    badgeBorder: "border-amber-200",
    dotColor: "bg-amber-500",
    boxBg: "bg-amber-50/80",
    boxBorder: "border-amber-200",
    boxText: "text-amber-950",
    priceClass: "text-slate-900",
  },
  [PRODUCT_STATUS.COMING_SOON]: {
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    badgeBorder: "border-blue-200",
    dotColor: "bg-blue-600",
    boxBg: "bg-slate-50",
    boxBorder: "border-blue-100",
    boxText: "text-slate-900",
    priceClass: "text-slate-900",
  },
  [PRODUCT_STATUS.DISCONTINUE]: {
    badgeBg: "bg-slate-100",
    badgeText: "text-slate-600",
    badgeBorder: "border-slate-200",
    dotColor: "bg-slate-500",
    boxBg: "bg-slate-50",
    boxBorder: "border-slate-200",
    boxText: "text-slate-900",
    priceClass: "text-slate-400 line-through",
  },
};

const BASE_STATUS_RULES = {
  [PRODUCT_STATUS.IN_STOCK]: {
    label: "In stock",
    priceNote: "",
    noticeTitle: "",
    noticeDescription: "",
    isAvailable: true,
    isUnavailable: false,
    isInStock: true,
    isOutOfStock: false,
    isOnOrder: false,
    isComingSoon: false,
    isDiscontinued: false,
    canBuyDirectly: true,
    canAddToCart: true,
    canBargain: true,
    canPreOrder: false,
    canPlaceOnOrderRequest: false,
    showNotifyForm: false,
    showWhatsAppCta: true,
    whatsappLabel: "WhatsApp us now",
    showSimilarInStockCta: false,
  },
  [PRODUCT_STATUS.OUT_STOCK]: {
    label: "Out of stock",
    priceNote: "",
    noticeTitle: "Out of stock right now",
    noticeDescription: "Get a message when it is back.",
    isAvailable: false,
    isUnavailable: true,
    isInStock: false,
    isOutOfStock: true,
    isOnOrder: false,
    isComingSoon: false,
    isDiscontinued: false,
    canBuyDirectly: false,
    canAddToCart: false,
    canBargain: false,
    canPreOrder: false,
    canPlaceOnOrderRequest: false,
    showNotifyForm: true,
    notifyButtonLabel: "Notify me when it is back",
    showWhatsAppCta: true,
    whatsappLabel: "Ask on WhatsApp when it will be back",
    showSimilarInStockCta: false,
  },
  [PRODUCT_STATUS.ON_ORDER]: {
    label: "On order",
    priceNote: "price confirmed on call",
    noticeTitle: "On order · usually 1 to 3 working days",
    noticeDescription:
      "We get this from a distributor. Some items with no distributor in Pakistan can take longer. Our team will call you to confirm price and delivery time.",
    isAvailable: true,
    isUnavailable: false,
    isInStock: false,
    isOutOfStock: false,
    isOnOrder: true,
    isComingSoon: false,
    isDiscontinued: false,
    canBuyDirectly: true,
    canAddToCart: true,
    canBargain: true,
    canPreOrder: false,
    canPlaceOnOrderRequest: true,
    showNotifyForm: false,
    showWhatsAppCta: true,
    whatsappLabel: "WhatsApp us now",
    showSimilarInStockCta: false,
  },
  [PRODUCT_STATUS.COMING_SOON]: {
    label: "Coming soon",
    priceNote: "expected price",
    noticeTitle: "Expected arrival",
    noticeDescription:
      "Date and price are expected, not confirmed, and can change.",
    isAvailable: false,
    isUnavailable: true,
    isInStock: false,
    isOutOfStock: false,
    isOnOrder: false,
    isComingSoon: false,
    isDiscontinued: false,
    canBuyDirectly: true,
    canAddToCart: true,
    canBargain: false,
    canPreOrder: true,
    canPlaceOnOrderRequest: false,
    showNotifyForm: true,
    notifyButtonLabel: "Notify me when it arrives",
    showWhatsAppCta: true,
    whatsappLabel: "WhatsApp us",
    showSimilarInStockCta: false,
  },
  [PRODUCT_STATUS.DISCONTINUE]: {
    label: "Discontinued",
    priceNote: "Was",
    noticeTitle: "This product is discontinued",
    noticeDescription: "It is no longer sold. We keep this page for reference.",
    isAvailable: false,
    isUnavailable: true,
    isInStock: false,
    isOutOfStock: false,
    isOnOrder: false,
    isComingSoon: false,
    isDiscontinued: true,
    canBuyDirectly: false,
    canAddToCart: false,
    canBargain: false,
    canPreOrder: false,
    canPlaceOnOrderRequest: false,
    showNotifyForm: false,
    showWhatsAppCta: false,
    whatsappLabel: "",
    showSimilarInStockCta: true,
  },
};

export function normalizeStatus(status, isComingSoon = false) {
  if (isComingSoon) return PRODUCT_STATUS.COMING_SOON;

  const normalized = String(status || "")
    .trim()
    .toLowerCase();

  if (normalized === "discontinue") return PRODUCT_STATUS.DISCONTINUE; // legacy
  if (Object.values(PRODUCT_STATUS).includes(normalized)) {
    return normalized;
  }

  return PRODUCT_STATUS.IN_STOCK;
}

/**
 * Main resolver function:
 * Pass `status` (or full `product` + helpers) and get booleans, color scheme, and section flags.
 */
export function getProductStatusConfig(statusInput, options = {}) {
  const {
    product = {},
    isComingSoon = Boolean(product?.isComingSoon),
    remainingStock: rawRemainingStock,
    tags = [],
    specs = [],
    faqItems = [],
    stripHtml = (html = "") =>
      String(html)
        .replace(/<[^>]*>/g, "")
        .trim(),
  } = options;

  const status = normalizeStatus(statusInput ?? product?.status, isComingSoon);
  const colors =
    STATUS_COLOR_SCHEME[status] || STATUS_COLOR_SCHEME[PRODUCT_STATUS.IN_STOCK];
  const rules =
    BASE_STATUS_RULES[status] || BASE_STATUS_RULES[PRODUCT_STATUS.IN_STOCK];

  const remainingStock =
    rawRemainingStock !== undefined
      ? rawRemainingStock
      : product?.stockQuantity == null
        ? null
        : Number(product.stockQuantity);

  const showLowStock =
    rules.isInStock &&
    !rules.isUnavailable &&
    remainingStock !== null &&
    Number.isFinite(remainingStock) &&
    remainingStock > 0 &&
    remainingStock <= 10;

  const brand =
    product?.attributes?.brand || product?.products?.subCategory?.name || "";

  const sections = {
    hasTags: Array.isArray(tags) && tags.length > 0,
    hasSpecs: Array.isArray(specs) && specs.length > 0,
    hasOverview: Boolean(stripHtml(product?.seoContent)),
    hasExpertReview: Boolean(stripHtml(product?.expertReview)),
    hasWhatsInTheBox: Boolean(stripHtml(product?.hasWhatsInTheBox)),
    hasFaqs: Array.isArray(faqItems) && faqItems.length > 0,
  };

  return {
    status,
    colors,
    ...rules,
    unavailable: rules.isUnavailable,
    remainingStock,
    showLowStock,
    brand,
    sections,
  };
}

/* -------------------------------------------------------------------------- */
/*  Small UI components                                                        */
/* -------------------------------------------------------------------------- */

export function Icon({ path, className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

export const ICONS = {
  shield: "M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z M9 12l2 2 4-4",
  box: "M21 8l-9-5-9 5v8l9 5 9-5V8z M3 8l9 5 9-5 M12 13v8",
  truck:
    "M3 7h11v9H3z M14 10h4l3 3v3h-7z M7 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M17 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  cash: "M3 7h18v10H3z M12 14a2 2 0 100-4 2 2 0 000 4z",
  store: "M4 9l1-5h14l1 5 M4 9v11h16V9 M4 9h16 M10 20v-6h4v6",
  whatsapp:
    "M3 21l1.6-4.8A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4-1L3 21z M9 9c0 3 3 6 6 6l1-1.5-2-1-1 .5c-1-.5-1.5-1-2-2l.5-1-1-2L9 9z",
  chevron: "M6 9l6 6 6-6",
  play: "M8 5v14l11-7z",
};

export function Breadcrumb({ product }) {
  const category = product.products?.category?.name;
  const brand = product.products?.subCategory?.name;
  const titleName = product.products?.title;

  const base = {
    page: 1,
    limit: 12,
    filters: {},
  };

  const items = [
    {
      name: "Home",
      href: "/",
    },
    category && {
      name: humanize(category),
      href: hrefFor({
        ...base,
        category,
      }),
    },
    brand && {
      name: humanize(brand),
      href: hrefFor({
        ...base,
        category,
        subCategory: brand,
      }),
    },
    titleName && {
      name: humanize(titleName),
      href: hrefFor({
        ...base,
        category,
        subCategory: brand,
        name: titleName,
      }),
    },
    {
      name: `${humanize(product?.productTitle).slice(0, 40)}...`,
    },
  ].filter(Boolean);

  return (
    <nav
      aria-label="Breadcrumb"
      className="text-xs md:text-sm lg:text-base text-muted"
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={`${item.name}-${i}`} className="flex items-center gap-1.5">
            {item.href ? (
              <Link href={item.href} className="hover:text-primary">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-ink">
                {item.name}
              </span>
            )}

            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ProductDescription({ html, className = "" }) {
  if (!html || typeof html !== "string") return null;

  const clean = sanitizeHtml(html, SANITIZE_OPTIONS).trim();
  if (!clean) return null;

  return (
    <div
      className={`
        prose prose-sm mt-3 max-w-none text-ink-50
        prose-p:my-2
        prose-ul:my-2 prose-ol:my-2
        prose-li:my-0.5 prose-li:marker:text-primary
        prose-strong:text-ink
        prose-a:text-primary
        ${className}
      `}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}

export function PriceBlock({ product, banks, priceClassName, priceNote }) {
  const { price, oldPrice, status, isComingSoon } = product;
  const hasDiscount = oldPrice && oldPrice > price;
  const off = hasDiscount
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;
  const plan = banks?.[0]?.plans?.at(-1);
  const monthly = plan
    ? Math.round((price * (1 + plan.markup / 100)) / plan.months)
    : null;

  const isDiscontinued = status === "discontinue" || status === "discontinued";
  const resolvedPriceClass =
    priceClassName || (isDiscontinued ? "text-faint line-through" : "text-ink");

  const displayAmount = isDiscontinued && !price && oldPrice ? oldPrice : price;

  return (
    <div>
      {isDiscontinued && !!displayAmount && (
        <p className="mb-1 text-sm font-medium text-faint line-through">
          Was {formatPrice(displayAmount, "Rs ")}
        </p>
      )}

      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        {!isDiscontinued && (
          <p
            className={`font-heading text-3xl font-extrabold sm:text-4xl ${resolvedPriceClass}`}
          >
            {!!displayAmount ? (
              formatPrice(displayAmount, "Rs ")
            ) : (
              <span className="text-lg sm:text-2xl">
                Pricing will be announced soon! <br /> Stay tuned
              </span>
            )}
          </p>
        )}

        {!!priceNote && !isDiscontinued && (
          <span className="text-xs font-medium text-muted">{priceNote}</span>
        )}

        {!isDiscontinued && !!hasDiscount && (
          <>
            <p className="pb-1 text-base text-faint line-through">
              {!!oldPrice && formatPrice(oldPrice, "Rs ")}
            </p>
            <span className="mb-1 rounded-md bg-red/10 px-2 py-0.5 text-xs font-bold text-red">
              {off}% off
            </span>
          </>
        )}
      </div>

      {!isDiscontinued && !isComingSoon && !!monthly && (
        <p className="mt-1.5 text-sm text-green">
          or about {formatPrice(monthly, "Rs ")} a month on credit card
          instalments ·{" "}
          <Link href="#instalments" className="underline underline-offset-2">
            see plans
          </Link>
        </p>
      )}
    </div>
  );
}

export function StockBadge({ status, isComingSoon, badgeStyle }) {
  const FALLBACK_STOCK = {
    in_stock: {
      label: "In stock",
      cls: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      dot: "bg-emerald-500",
    },
    out_stock: {
      label: "Out of stock",
      cls: "bg-rose-50 text-rose-700 border border-rose-200",
      dot: "bg-rose-500",
    },
    on_order: {
      label: "On order",
      cls: "bg-amber-50 text-amber-800 border border-amber-200",
      dot: "bg-amber-500",
    },
    coming_soon: {
      label: "Coming soon",
      cls: "bg-blue-50 text-blue-700 border border-blue-200",
      dot: "bg-blue-600",
    },
    discontinued: {
      label: "Discontinued",
      cls: "bg-slate-100 text-slate-600 border border-slate-200",
      dot: "bg-slate-500",
    },
  };

  function formatStatusLabel(status, isComingSoon) {
    if (isComingSoon) return "Coming soon";
    if (status && FALLBACK_STOCK[status]) return FALLBACK_STOCK[status].label;
    return humanize(status || "in_stock");
  }
  const normalizedKey = isComingSoon ? "coming_soon" : status;
  const fallback = FALLBACK_STOCK[normalizedKey] ?? {
    label: humanize(status),
    cls: "bg-light-200 text-muted",
    dot: "bg-faint",
  };

  const label = badgeStyle?.label ?? formatStatusLabel(status, isComingSoon);
  const badgeClasses = badgeStyle
    ? `${badgeStyle.bgColor || ""} ${badgeStyle.textColor || ""} ${badgeStyle.borderColor || ""}`.trim()
    : fallback.cls;
  const dotClass = badgeStyle?.dotColor || fallback.dot;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${badgeClasses}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
      {label}
    </span>
  );
}

export function TypeBadge({ type }) {
  const TYPE = {
    refurbished: {
      label: "Refurbished",
      cls: "bg-green/10 text-green",
      dot: "bg-green",
    },
    used: {
      label: "Used",
      cls: "bg-light-200 text-muted",
      dot: "bg-faint",
    },
    "brand-new": {
      label: "Brand New",
      cls: "bg-blue-50 text-blue-600",
      dot: "bg-blue-600",
    },
    "open-box": {
      label: "Open Box",
      cls: "bg-orange-50 text-orange-800",
      dot: "bg-orange-800",
    },
  };
  const s = TYPE[type];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${s?.cls}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s?.dot}`} />
      {s?.label}
    </span>
  );
}

export function WhatYouGet({ warranty }) {
  const rows = [
    { icon: ICONS.shield, text: warranty || "Brand warranty" },
    { icon: ICONS.box, text: "100% authentic, genuine stock only" },
    { icon: ICONS.truck, text: "Free delivery across Pakistan" },
  ];
  return (
    <div className="rounded-xl border border-green/20 bg-green/5 p-4">
      <h2 className="text-sm font-bold text-ink">What you get</h2>
      <ul className="mt-2 space-y-2">
        {rows.map((r) => (
          <li
            key={r.text}
            className="flex items-center gap-2.5 text-sm text-ink-50"
          >
            <Icon path={r.icon} className="h-4 w-4 shrink-0 text-green" />
            {r.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WhatsAppCta({ title, label }) {
  const text = encodeURIComponent(`Hi WeGot, I want to ask about: ${title}`);
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-12 items-center justify-center gap-2 rounded-xl border border-green/40 bg-white text-sm font-semibold text-green transition hover:bg-green/5"
    >
      <Icon path={ICONS.whatsapp} className="h-4 w-4" />
      {label ?? " Ask about this product on WhatsApp"}
    </a>
  );
}

export function DeliveryInfo() {
  const rows = [
    {
      icon: ICONS.truck,
      title: "Free delivery, 4-5 working days",
      body: "Nationwide shipping to Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Faisalabad and all major cities.",
    },
    {
      icon: ICONS.cash,
      title: "Cash on delivery available",
      body: "Pay online, by bank transfer, instalments or when you receive your order.",
    },
    {
      icon: ICONS.store,
      title: "See it at our Clifton store",
      body: "Shop 29, SAASI Arcade, Block 7, Clifton, Karachi.",
    },
  ];
  return (
    <ul className="divide-y divide-light-100 rounded-xl border border-light-100">
      {rows.map((r) => (
        <li key={r.title} className="flex gap-3 p-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-primary">
            <Icon path={r.icon} className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">{r.title}</p>
            <p className="mt-0.5 text-sm text-muted">{r.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function SpecsTable({ title, specs }) {
  if (!specs.length) return null;
  return (
    <section
      id="specifications"
      aria-labelledby="specs-title"
      className="scroll-mt-16"
    >
      <h2 id="specs-title" className="font-heading text-xl font-bold text-ink">
        Specifications
      </h2>
      <p className="mt-1 text-sm text-muted">{title}</p>

      <div className="mt-4 overflow-hidden rounded-2xl border border-light-100 bg-white">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">{title} specifications</caption>
          <thead>
            <tr>
              <th
                colSpan={2}
                className="bg-primary px-4 py-3 text-xs font-bold tracking-wide text-white"
              >
                Full specifications
              </th>
            </tr>
          </thead>
          <tbody>
            {specs.map((s, i) => (
              <tr key={s.key} className={i % 2 === 0 ? "bg-light" : "bg-white"}>
                <th
                  scope="row"
                  className="w-2/5 px-4 py-3.5 align-top font-medium text-muted sm:w-1/3"
                >
                  {s.label}
                </th>
                <td className="break-words px-4 py-3.5 font-medium text-ink">
                  {s.key === "official_page" && /^https?:\/\//.test(s.value) ? (
                    <a
                      href={s.value}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-primary underline underline-offset-2"
                    >
                      {s.value}
                    </a>
                  ) : (
                    s.value
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function SeoContent({ html, id = "overview" }) {
  if (!html) return null;
  // Backend trusted hai. Agar CMS se editors likhte hain to yahan sanitize-html laga lena.
  const cleaned = html.replace(/\$class_name_str/g, "");
  return (
    <section id={id} aria-label="Product overview" className="scroll-mt-16">
      <div
        className="prose prose-sm max-w-none rounded-2xl border border-light-100 bg-white p-5 prose-headings:font-heading prose-headings:text-ink prose-a:text-primary prose-strong:text-ink sm:p-7"
        dangerouslySetInnerHTML={{ __html: cleaned }}
      />
    </section>
  );
}

export function FaqSection({ items }) {
  if (!items.length) return null;
  return (
    <section id="faqs" aria-labelledby="faq-title" className="scroll-mt-16">
      <h2 id="faq-title" className="font-heading text-xl font-bold text-ink">
        Frequently asked questions
      </h2>
      <div className="mt-4 space-y-3">
        {items.map((item, i) => (
          <details
            key={item.q}
            open={i === 0}
            className="group rounded-xl border border-light-100 bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-sm font-semibold text-ink">
              <h3 className="text-sm font-semibold">{item.q}</h3>
              <Icon
                path={ICONS.chevron}
                className="h-4 w-4 shrink-0 text-muted transition group-open:rotate-180"
              />
            </summary>
            <div
              className="px-4 pb-4 text-sm leading-relaxed text-ink-50 [&_strong]:text-ink"
              dangerouslySetInnerHTML={{ __html: item.a }}
            />
          </details>
        ))}
      </div>
    </section>
  );
}
