import Link from "next/link";
import { formatPrice, humanize } from "@/lib/utils";

export const BUYING_GUIDES = {
  title: "Product buying guide",
  text: "A short guide from the WeGot team to help you choose the right one.",
  url: "https://www.youtube.com/@wegotpk",
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
  out_of_stock: {
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

  // TODO: apne asli category/brand routes yahan set karo
  const items = [
    { name: "Home", href: "/" },
    category && {
      name: humanize(category),
      href: `/products?category=${category}`,
    },
    brand && {
      name: humanize(brand),
      href: `/products?category=${category}&subCategory=${brand}`,
    },
    titleName && {
      name: humanize(titleName),
      href: `/products?category=${category}&subCategory=${brand}&name=${product.products?.title}`,
    },
    { name: `${humanize(product?.productTitle).slice(0, 40)}...` },
  ].filter(Boolean);

  return (
    <nav
      aria-label="Breadcrumb"
      className="text-xs md:text-sm lg:text-base text-muted"
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-1.5">
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

export function PriceBlock({ product, banks }) {
  const { price, oldPrice } = product;
  const hasDiscount = oldPrice && oldPrice > price;
  const off = hasDiscount
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;
  const plan = banks[0]?.plans.at(-1);
  const monthly = plan
    ? Math.round((price * (1 + plan.markup / 100)) / plan.months)
    : null;

  return (
    <div>
      <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
        <p className="font-heading text-3xl font-extrabold text-ink sm:text-4xl">
          {formatPrice(price, "Rs ")}
        </p>
        {hasDiscount && (
          <>
            <p className="pb-1 text-base text-faint line-through">
              {formatPrice(oldPrice, "Rs ")}
            </p>
            <span className="mb-1 rounded-md bg-red/10 px-2 py-0.5 text-xs font-bold text-red">
              {off}% off
            </span>
          </>
        )}
      </div>
      {monthly && (
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

export function StockBadge({ status, isComingSoon }) {
  const s = isComingSoon
    ? {
        label: "Coming soon",
        cls: "bg-gold-50 text-gold-700",
        dot: "bg-gold-600",
      }
    : (STOCK[status] ?? {
        label: humanize(status),
        cls: "bg-light-200 text-muted",
        dot: "bg-faint",
      });
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${s.cls}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
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

export function WhatsAppCta({ title }) {
  const text = encodeURIComponent(`Hi WeGot, I want to ask about: ${title}`);
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-12 items-center justify-center gap-2 rounded-xl border border-green/40 bg-white text-sm font-semibold text-green transition hover:bg-green/5"
    >
      <Icon path={ICONS.whatsapp} className="h-4 w-4" />
      Ask about this product on WhatsApp
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

export function SectionTabs({
  hasSpecs,
  hasOverview,
  hasExpertReview,
  hasFaqs,
  hasWhatsInTheBox,
}) {
  const tabs = [
    hasSpecs && { href: "#specifications", label: "Specifications" },
    hasOverview && { href: "#overview", label: "Overview" },
    hasExpertReview && { href: "#expert-review", label: "Expert Review" },
    hasWhatsInTheBox && {
      href: "#whats-in-the-box",
      label: "Whats In The Box",
    },
    hasFaqs && { href: "#faqs", label: "FAQs" },
    { href: "#buying-guide", label: "Buying guide" },
  ].filter(Boolean);
  return (
    <nav
      aria-label="Product sections"
      className="sticky top-0 z-20 -mx-4 overflow-x-auto border-b border-light-100 bg-surface/95 px-4 backdrop-blur sm:mx-0 sm:px-0"
    >
      <ul className="flex gap-6 whitespace-nowrap">
        {tabs.map((t) => (
          <li key={t.href}>
            <a
              href={t.href}
              className="inline-block border-b-2 border-transparent py-3 text-sm font-semibold text-muted transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:text-primary"
            >
              {t.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
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

// Category-wise guide: iframe load nahi hoti (performance), click par YouTube khulta hai
export function BuyingGuide({ guide = BUYING_GUIDES }) {
  if (!Object.entries(guide).length > 0) return null;
  return (
    <section
      id="buying-guide"
      aria-labelledby="guide-title"
      className="scroll-mt-16"
    >
      <div className="flex items-center justify-between gap-4">
        <h2
          id="guide-title"
          className="font-heading text-xl font-bold text-ink"
        >
          {guide.title}
        </h2>
        <a
          href={guide.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-light-100 bg-white px-4 py-1.5 text-xs font-semibold text-primary hover:bg-brand-50"
        >
          Watch on YouTube
        </a>
      </div>
      <a
        href={guide.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch the ${guide.title} on YouTube`}
        className="group relative mt-4 flex aspect-video items-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary-200 via-primary-100 to-ink p-6 sm:p-12"
      >
        <div className="max-w-md">
          <p className="text-xs font-semibold text-gold">WeGot video</p>
          <p className="mt-1 font-heading text-2xl font-extrabold text-white sm:text-4xl">
            {guide.title}
          </p>
          <p className="mt-2 text-sm text-white/70">{guide.text}</p>
        </div>
        <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-red text-white shadow-lg transition group-hover:scale-105 sm:left-2/3">
          <Icon path={ICONS.play} className="ml-1 h-7 w-7 fill-white" />
        </span>
      </a>
    </section>
  );
}
