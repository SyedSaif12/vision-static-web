import Link from "next/link";
import {
  CorporateProcurementForm,
  FAQs,
  Icon,
  SectionHeading,
} from "./clientPage";

const benefits = [
  {
    icon: "receipt",
    title: "Genuine, from distributors",
    description:
      "Sourced in volume through authorised distribution. No grey stock, no surprises.",
  },
  {
    icon: "dollar",
    title: "Volume pricing",
    description:
      "Bulk discounts passed on to you, whether you buy new or certified refurbished at scale.",
    accent: "gold",
  },
  {
    icon: "file",
    title: "Proper tax invoices",
    description:
      "Sales-tax invoices and full documentation for your accounts, filing, and audit.",
  },
  {
    icon: "user",
    title: "Dedicated account manager",
    description:
      "One person who knows your account, from the first quote to reorders and support.",
  },
  {
    icon: "shield",
    title: "Warranty and support",
    description:
      "Brand warranty on new, WeGot warranty on refurbished, plus in-house repair support.",
  },
  {
    icon: "truck",
    title: "Delivery and setup",
    description:
      "Delivered to your office nationwide, with setup and asset tagging on request.",
  },
];

const equipment = [
  {
    icon: "laptop",
    title: "Laptops & desktops",
    description: "Business laptops, all-in-ones, and desktop PCs.",
  },
  {
    icon: "server",
    title: "Workstations & servers",
    description: "High-performance workstations, servers, and storage.",
  },
  {
    icon: "router",
    title: "Networking & security",
    description: "Routers, switches, firewalls, access points, cabling.",
  },
  {
    icon: "monitor",
    title: "Monitors & displays",
    description: "Office monitors, large displays, and conferencing screens.",
  },
  {
    icon: "printer",
    title: "Printers & scanners",
    description: "Office printers, MFPs, scanners, and consumables.",
  },
  {
    icon: "cpu",
    title: "GPUs & components",
    description: "Graphics cards, RAM, SSDs, and upgrade parts.",
  },
  {
    icon: "mouse",
    title: "Peripherals",
    description: "Keyboards, mice, headsets, webcams, docks.",
  },
  {
    icon: "zap",
    title: "Power & UPS",
    description: "UPS units, surge protection, and power backup.",
  },
];

const brands = [
  "Lenovo",
  "HP",
  "Dell",
  "Apple",
  "Asus",
  "Acer",
  "MSI",
  "Microsoft",
  "Nvidia",
  "Intel",
  "AMD",
  "Cisco",
  "TP-Link",
  "Ubiquiti",
  "Fortinet",
  "Logitech",
  "A4Tech",
  "Ronin",
  "Kingston",
  "Seagate",
  "WD",
  "Canon",
  "Epson",
  "APC",
];

const steps = [
  {
    title: "Share your requirement",
    description: "Send the list or fill the form above.",
  },
  {
    title: "We source and quote",
    description: "New or refurbished, at our best price.",
  },
  {
    title: "You approve the PO",
    description: "Confirm the quote and raise your order.",
  },
  {
    title: "We deliver and set up",
    description: "To your office, with setup on request.",
  },
  {
    title: "Invoice and warranty",
    description: "Tax invoice and warranty documents.",
  },
  {
    title: "Ongoing support",
    description: "Reorders and after-sales, one contact.",
  },
];

const audiences = [
  { icon: "building", label: "Offices & enterprises" },
  { icon: "zap", label: "Startups & scale-ups" },
  { icon: "graduation", label: "Schools & universities" },
  { icon: "landmark", label: "Government & NGOs" },
  { icon: "briefcase", label: "Resellers & integrators" },
  { icon: "users", label: "Remote & hybrid teams" },
];

export default function page() {
  return (
    <main className="min-h-screen overflow-hidden bg-white font-sans text-ink">
      {/* Hero + procurement quote form */}
      <section className="border-b border-light-100 bg-gradient-to-b from-light-50/80 via-light to-white">
        <div className="mx-auto w-11/12 pb-10 pt-7 sm:pb-12 sm:pt-9 lg:pb-14 lg:pt-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex items-center gap-2 text-xs md:text-sm lg:text-base text-faint"
          >
            <Link href="/" className="transition hover:text-primary">
              Home
            </Link>
            /<span>Corporate Procurement</span>
          </nav>

          <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.06fr] lg:gap-12 xl:gap-16">
            <div className="pt-1 lg:pt-1">
              <p className="mb-2 hidden text-sm font-bold uppercase tracking-[0.2em] text-primary lg:block">
                WeGot for business
              </p>
              <h1 className="font-heading text-2xl font-extrabold leading-[1.15] tracking-[-0.04em] text-ink sm:text-3xl lg:text-5xl">
                Corporate IT Procurement
              </h1>
              <p className="mt-2 text-base font-bold leading-6 text-ink sm:text-2xl">
                Your company&apos;s tech,{" "}
                <span className="text-primary">
                  sourced, supplied, and supported.
                </span>
              </p>
              <p className="mt-3 text-base leading-[1.85] text-muted">
                From a few laptops to a full office rollout, WeGot for Business
                handles IT procurement end to end. Brand new or certified
                refurbished, one point of contact, and proper invoicing.
              </p>
              <ul className="mt-5 space-y-3 text-base text-ink-50">
                {[
                  "Volume pricing, bulk discounts passed on to you",
                  "Brand new, or Aitbaar-certified refurbished at scale",
                  "Proper sales-tax invoices and full documentation",
                  "A dedicated account manager, delivery, and warranty",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Icon
                      name="check"
                      size={15}
                      className="mt-px text-primary"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-base leading-5 text-faint">
                Trusted by offices, startups, schools, government, and resellers
                across Pakistan.
              </p>
            </div>
            <CorporateProcurementForm />
          </div>
        </div>
      </section>

      {/* Why businesses procure through WeGot */}
      <section className="py-12 sm:py-14 lg:py-16">
        <div className="mx-auto w-11/12">
          <SectionHeading
            eyebrow="Why procure through WeGot"
            title="Built for how businesses actually buy"
          >
            One supplier for your whole tech stack, priced for volume, and
            documented properly for your accounts and audit.
          </SectionHeading>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-light-100 bg-white p-4 shadow-[0_2px_7px_rgba(15,24,48,0.055)] transition duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[0_8px_20px_rgba(15,24,48,0.08)] sm:p-5"
              >
                <span
                  className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl ${item.accent === "gold" ? "bg-gold-50 text-gold-700" : "bg-brand-50 text-primary"}`}
                >
                  <Icon name={item.icon} size={30} />
                </span>
                <h3 className="text-lg font-extrabold tracking-[-0.02em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-[1.7] text-muted sm:text-sm">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Brand new / refurbished */}
      <section
        id="refurbished"
        className="bg-light-50/70 py-12 sm:py-14 lg:py-16"
      >
        <div className="mx-auto w-11/12">
          <SectionHeading
            eyebrow="Two ways to buy"
            title="Brand new, or certified refurbished"
          >
            Kit out your team with the latest, save significantly with certified
            refurbished, or mix both across your order.
          </SectionHeading>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="rounded-2xl border border-primary/80 bg-white p-5 shadow-[0_3px_12px_rgba(15,24,48,0.04)] sm:p-6">
              <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-primary">
                <Icon name="laptop" size={30} />
              </span>
              <h3 className="font-heading text-lg font-extrabold text-ink">
                Brand new
              </h3>
              <p className="mt-2 text-base leading-5 text-muted">
                The latest laptops, workstations, and IT equipment, sealed and
                covered by full brand warranty.
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-ink-50">
                {[
                  "Latest models and configurations",
                  "Full manufacturer warranty",
                  "Volume pricing on bulk orders",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Icon name="check" size={20} className="mt-px text-green" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="#request-quote"
                // onClick={() => setPurchaseType("Brand new only")}
                className="mt-5 flex min-h-10 items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-primary-100"
              >
                Quote brand new
              </Link>
            </article>

            <article className="rounded-2xl border border-gold-600/80 bg-white p-5 shadow-[0_3px_12px_rgba(15,24,48,0.04)] sm:p-6">
              <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
                <Icon name="star" size={30} />
              </span>
              <h3 className="font-heading text-lg font-extrabold text-ink">
                Certified refurbished
              </h3>
              <p className="mt-2 text-base leading-5 text-muted">
                Aitbaar-certified devices at a fraction of new cost. Ideal for
                scaling teams and tight budgets.
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-ink-50">
                {[
                  "Tested by Aitbaar Squad, no grades, one standard",
                  "WeGot warranty on every unit",
                  "Big savings at scale",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Icon name="check" size={20} className="mt-px text-green" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="#request-quote"
                className="mt-5 flex min-h-10 items-center justify-center rounded-lg bg-gold px-4 py-2.5 text-sm font-extrabold text-[#171b2c] shadow-[0_4px_10px_rgba(255,207,36,0.25)] transition hover:bg-gold-600"
              >
                See our refurb technology <span className="ml-1">›</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Equipment categories */}
      <section className="py-12 sm:py-14 lg:py-16">
        <div className="mx-auto w-11/12">
          <SectionHeading eyebrow="The full stack" title="Equipment we supply">
            One order for everything your office and IT team needs.
          </SectionHeading>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {equipment.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-light-100 bg-white p-4 shadow-[0_2px_7px_rgba(15,24,48,0.045)] transition hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[0_8px_18px_rgba(15,24,48,0.07)] sm:min-h-[132px] sm:p-5"
              >
                <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-primary">
                  <Icon name={item.icon} size={30} />
                </span>
                <h3 className="text-lg font-extrabold tracking-[-0.015em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-base leading-[1.7] text-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="bg-light-50/75 py-12 sm:py-14 lg:py-16">
        <div className="mx-auto w-11/12">
          <SectionHeading
            eyebrow="Brands we source"
            title="The names your team already trusts"
          >
            Supplied new and as certified refurbished, across computing,
            networking, and peripherals.
          </SectionHeading>
          <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {brands.map((brand) => (
              <div
                key={brand}
                className="flex min-h-11 items-center justify-center rounded-lg border border-light-100 bg-white px-3 py-3 text-center text-base font-extrabold text-ink-50 shadow-[0_2px_6px_rgba(15,24,48,0.045)] transition hover:border-primary/30 hover:text-primary"
              >
                {brand}
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-[9px] leading-4 text-faint">
            Sample brand list, swap in your final line-up. Do not see a brand
            you need? Ask us, we source widely.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-12 sm:py-14 lg:py-16">
        <div className="mx-auto w-11/12">
          <SectionHeading
            eyebrow="How it works"
            title="Procurement in six simple steps"
          />
          <div className="mt-8 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-xl border border-light-100 bg-white px-3 py-4 text-center shadow-[0_2px_7px_rgba(15,24,48,0.055)] sm:min-h-[122px] sm:px-2.5 sm:py-4"
              >
                <span className="mx-auto mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-base font-extrabold text-white shadow-sm">
                  {index + 1}
                </span>
                <h3 className="text-lg font-extrabold leading-4 text-ink">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-[1.6] text-muted">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="bg-light-50/75 py-10 sm:py-12">
        <div className="mx-auto w-11/12">
          <SectionHeading
            eyebrow="Who we work with"
            title="Trusted by teams of every size"
          />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {audiences.map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-2 rounded-full border border-light-100 bg-white px-3.5 py-2.5 text-base font-semibold text-ink-50 shadow-[0_2px_6px_rgba(15,24,48,0.035)]"
              >
                <Icon name={item.icon} size={20} className="text-primary" />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQs />

      {/* Final call to action. Footer is intentionally not included. */}
      <section className="pb-10 sm:pb-12">
        <div className="mx-auto w-11/12">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-[#17429f] via-primary to-[#3f68ed] px-5 py-9 text-center text-white sm:px-10 sm:py-11 lg:rounded-[18px] lg:py-10">
            <h2 className="font-heading text-2xl font-extrabold tracking-[-0.03em] sm:text-4xl">
              Let us quote your next rollout
            </h2>
            <p className="mx-auto mt-3 text-base leading-[1.8] text-white/80">
              Tell us what your team needs. We will source it, price it, invoice
              it properly, and stand behind it.
            </p>
            <div className="mt-5 flex flex-col items-stretch justify-center gap-2 sm:flex-row sm:items-center">
              <Link
                href="#request-quote"
                className="inline-flex min-h-10 items-center justify-center rounded-lg bg-gold px-5 py-2.5 text-base font-extrabold text-[#171b2c] shadow-[0_5px_12px_rgba(255,207,36,0.28)] transition hover:bg-gold-600"
              >
                Request a quote{" "}
                <Icon name="arrow-right" size={13} className="ml-1.5" />
              </Link>
              <Link
                href="#refurbished"
                className="inline-flex min-h-10 items-center justify-center rounded-lg border border-white/30 bg-white/5 px-5 py-2.5 text-base font-bold text-white transition hover:bg-white/15"
              >
                See refurb technology
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
