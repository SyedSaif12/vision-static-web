"use client";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useCorporateMutation } from "@/redux/popup/popupSlice";
import toast from "react-hot-toast";
import { LoaderCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

// Validation schema
const procurementSchema = yup.object({
  companyName: yup
    .string()
    .trim()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters"),

  yourName: yup
    .string()
    .trim()
    .required("Your name is required")
    .min(3, "Name must be at least 3 characters"),

  jobPosition: yup.string().trim().optional(),

  workEmail: yup
    .string()
    .trim()
    .email("Enter a valid work email")
    .required("Work email is required"),

  phoneWhatsapp: yup
    .string()
    .trim()
    .required("Phone / WhatsApp number is required")
    .matches(/^\+?[0-9][0-9\s()-]{7,19}$/, "Enter a valid phone number"),

  newOrRefurbished: yup
    .string()
    .oneOf(
      ["Either, quote me both", "Brand new only", "Certified refurbished only"],
      "Please select a valid purchase type",
    )
    .required("Purchase type is required"),

  whatDoYouNeed: yup
    .string()
    .trim()
    .required("Please describe your requirements")
    .min(10, "Requirements must be at least 10 characters"),
});

const faqs = [
  {
    question: "Do you provide proper tax invoices?",
    answer:
      "Yes. Corporate orders come with sales-tax invoices and full documentation for your accounts, filing, and audit.",
  },
  {
    question: "Can you supply certified refurbished at scale?",
    answer:
      "Yes. We can source certified refurbished laptops, workstations, and other IT equipment for larger teams, subject to availability.",
  },
  {
    question: "Do you offer credit or payment terms?",
    answer:
      "Payment terms can be discussed for approved business accounts and larger or recurring procurement orders.",
  },
  {
    question: "Do you deliver outside Karachi?",
    answer:
      "Yes. We deliver nationwide. Delivery, setup, and asset tagging can be arranged according to your rollout requirements.",
  },
  {
    question: "Is there warranty and support on corporate orders?",
    answer:
      "New devices are covered by the relevant manufacturer warranty. Certified refurbished devices include WeGot warranty and after-sales support.",
  },
];

const iconNodes = {
  check: <path d="m5 12 4 4L19 6" />,
  receipt: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M8 8h8M8 12h5M8 16h8" />
    </>
  ),
  dollar: (
    <>
      <path d="M12 2v20M17 6.5c-.8-1.1-2.3-1.7-4.5-1.7-2.4 0-4 1.2-4 3s1.6 2.8 4.5 3.4 4.5 1.4 4.5 3.5-1.8 3.6-4.6 3.6c-2.1 0-3.8-.7-4.9-2" />
    </>
  ),
  file: (
    <>
      <path d="M6 3.5h8l4 4V20H6z" />
      <path d="M14 3.5V8h4M9 12h6M9 16h6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c.5-3.2 3.1-5 7-5s6.5 1.8 7 5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 19 6v5c0 4.7-3 7.8-7 10-4-2.2-7-5.3-7-10V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  truck: (
    <>
      <path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" />
      <circle cx="7.5" cy="18" r="1.8" />
      <circle cx="17.5" cy="18" r="1.8" />
    </>
  ),
  laptop: (
    <>
      <rect x="5" y="4" width="14" height="11" rx="1.5" />
      <path d="M3 19h18l-1.5-3H4.5z" />
    </>
  ),
  server: (
    <>
      <rect x="4" y="4" width="16" height="6" rx="1.5" />
      <rect x="4" y="14" width="16" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01M11 7h6M11 17h6" />
    </>
  ),
  router: (
    <>
      <rect x="4" y="9" width="16" height="10" rx="2" />
      <path d="M8 9 6.5 4M16 9l1.5-5M8 14h.01M12 14h.01M16 14h.01" />
    </>
  ),
  monitor: (
    <>
      <rect x="3.5" y="4" width="17" height="12" rx="1.5" />
      <path d="M12 16v4M8 20h8" />
    </>
  ),
  printer: (
    <>
      <path d="M7 8V4h10v4M6 17H4V9h16v8h-2" />
      <path d="M7 14h10v6H7zM17 11h.01" />
    </>
  ),
  cpu: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </>
  ),
  mouse: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="5" />
      <path d="M12 3v6" />
    </>
  ),
  zap: <path d="m13 2-9 12h7l-1 8 10-13h-7z" />,
  star: (
    <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
  ),
  building: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
      <path d="M8 9h2M14 9h2M8 13h2M14 13h2M10 20v-3h4v3M7 2.5h10" />
    </>
  ),
  graduation: (
    <>
      <path d="m2.5 9 9.5-5 9.5 5-9.5 5z" />
      <path d="M6 11v5c3.5 3 8.5 3 12 0v-5M21.5 9v6" />
    </>
  ),
  landmark: (
    <>
      <path d="m3 9 9-5 9 5M4 10h16M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18" />
    </>
  ),
  package: (
    <>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z" />
      <path d="m4.5 7.8 7.5 4.4 7.5-4.4M12 12.2V21" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20c.4-3.2 2.2-5 5.5-5s5.1 1.8 5.5 5M16 5.5a3 3 0 0 1 0 5.8M17 15c2.3.4 3.5 2 3.8 4.5" />
    </>
  ),
  box: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 9h6v6H9z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: (
    <path d="M7 3H4.5C3.7 3 3 3.7 3 4.5 3 13.6 10.4 21 19.5 21c.8 0 1.5-.7 1.5-1.5V17l-5-2-2 2c-3-1.2-5.3-3.5-6.5-6.5l2-2z" />
  ),
  message: (
    <>
      <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l1.2-3.2A7.5 7.5 0 1 1 20 11.5Z" />
      <path d="M8 11h8M8 14h5" />
    </>
  ),
  chevron: <path d="m7 10 5 5 5-5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" />
    </>
  ),
  headphones: (
    <>
      <path d="M4 13v-2a8 8 0 0 1 16 0v2" />
      <rect x="3" y="12" width="4" height="7" rx="1.5" />
      <rect x="17" y="12" width="4" height="7" rx="1.5" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="m19.4 15 .1.1 1.1 1.7-1.8 3.1-2-.6a7.7 7.7 0 0 1-1.6.9l-.4 2.1h-3.6l-.4-2.1a7.7 7.7 0 0 1-1.6-.9l-2 .6-1.8-3.1 1.1-1.7a7 7 0 0 1 0-1.9l-1.1-1.7 1.8-3.1 2 .6a7.7 7.7 0 0 1 1.6-.9l.4-2.1h3.6l.4 2.1a7.7 7.7 0 0 1 1.6.9l2-.6 1.8 3.1-1.1 1.7a7 7 0 0 1 0 1.9Z" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V2.5h6V4M8 10h8M8 14h8M8 18h5" />
    </>
  ),
  computer: (
    <>
      <rect x="3.5" y="4" width="17" height="12" rx="1.5" />
      <path d="M12 16v4M8 20h8" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </>
  ),
};

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

export function Icon({ name, size = 18, className = "" }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
    >
      {iconNodes[name]}
    </svg>
  );
}

export function FAQs() {
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <section className="py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-11/12">
        <SectionHeading
          eyebrow="Good to know"
          title="Corporate procurement questions"
        />
        <div className="mt-7 overflow-hidden rounded-xl border border-light-100 bg-white shadow-[0_3px_10px_rgba(15,24,48,0.055)]">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={faq.question}
                className={index !== 0 ? "border-t border-light-100" : ""}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-5 px-4 py-4 text-left transition hover:bg-light-50/60 sm:px-5"
                >
                  <span className="text-lg font-extrabold leading-5 text-ink">
                    {faq.question}
                  </span>
                  <Icon
                    name={isOpen ? "minus" : "plus"}
                    size={14}
                    className="text-primary"
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-md leading-[1.8] text-muted sm:px-5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CorporateProcurementForm() {
  const [postCorporate, { isLoading, isSuccess, data: currentData }] =
    useCorporateMutation();

  const formMethods = useForm({
    resolver: yupResolver(procurementSchema),
    defaultValues: {
      companyName: "",
      yourName: "",
      jobPosition: "",
      workEmail: "",
      phoneWhatsapp: "",
      newOrRefurbished: "Either, quote me both",
      whatDoYouNeed: "",
    },
    mode: "onSubmit",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = formMethods;

  useEffect(() => {
    if (isSuccess) {
      reset();

      toast.success(
        currentData?.message ||
          "Your procurement request has been submitted successfully.",
        {
          position: "top-right",
          duration: 3000,
        },
      );
    }
  }, [isSuccess, currentData, reset]);

  const onSubmit = async (payload) => {
    try {
      await postCorporate(payload).unwrap();
    } catch (error) {
      toast.error(
        error?.data?.message || "Something went wrong. Please try again.",
        {
          position: "top-right",
          duration: 3000,
        },
      );
    }
  };

  const inputClass =
    "w-full rounded-lg border border-light-100 bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-[#9298a5] focus:border-primary focus:ring-2 focus:ring-primary/10";

  const labelClass = "mb-1.5 block text-base font-semibold text-ink-50";

  const errorClass = "mt-1 text-sm text-red-500";

  return (
    <div>
      <FormProvider {...formMethods}>
        <form
          id="request-quote"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="rounded-2xl border border-white bg-white p-5 shadow-[0_10px_30px_rgba(15,24,48,0.09)] sm:p-6 lg:p-6 xl:p-7"
        >
          <h2 className="font-heading text-lg font-extrabold tracking-[-0.02em] text-ink">
            Request a quote
          </h2>

          <p className="mt-2 text-sm leading-5 text-muted">
            Share a few details and our procurement team replies, usually within
            one working day.
          </p>

          <div className="mt-5 space-y-3.5">
            {/* Company name */}
            <div>
              <label htmlFor="company" className={labelClass}>
                Company name <span className="text-red-500">*</span>
              </label>

              <input
                id="company"
                type="text"
                autoComplete="organization"
                placeholder="Your company or organisation"
                {...register("companyName")}
                aria-invalid={!!errors.companyName}
                className={inputClass}
              />

              {errors.companyName && (
                <p className={errorClass}>{errors.companyName.message}</p>
              )}
            </div>

            {/* Name and position */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Your name <span className="text-red-500">*</span>
                </label>

                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Full name"
                  {...register("yourName")}
                  aria-invalid={!!errors.yourName}
                  className={inputClass}
                />

                {errors.yourName && (
                  <p className={errorClass}>{errors.yourName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="position" className={labelClass}>
                  Job position
                </label>

                <input
                  id="position"
                  type="text"
                  placeholder="e.g. IT Manager"
                  {...register("jobPosition")}
                  aria-invalid={!!errors.jobPosition}
                  className={inputClass}
                />

                {errors.jobPosition && (
                  <p className={errorClass}>{errors.jobPosition.message}</p>
                )}
              </div>
            </div>

            {/* Email and phone */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className={labelClass}>
                  Work email <span className="text-red-500">*</span>
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@company.com"
                  {...register("workEmail")}
                  aria-invalid={!!errors.workEmail}
                  className={inputClass}
                />

                {errors.workEmail && (
                  <p className={errorClass}>{errors.workEmail.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone / WhatsApp <span className="text-red-500">*</span>
                </label>

                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+92 326 0220581"
                  {...register("phoneWhatsapp")}
                  aria-invalid={!!errors.phoneWhatsapp}
                  className={inputClass}
                />

                {errors.phoneWhatsapp && (
                  <p className={errorClass}>{errors.phoneWhatsapp.message}</p>
                )}
              </div>
            </div>

            {/* Purchase type */}
            <div>
              <label htmlFor="purchaseType" className={labelClass}>
                New or refurbished?
              </label>

              <div className="relative">
                <select
                  id="purchaseType"
                  {...register("newOrRefurbished")}
                  aria-invalid={!!errors.newOrRefurbished}
                  className={`${inputClass} appearance-none pr-9`}
                >
                  <option value="Either, quote me both">
                    Either, quote me both
                  </option>
                  <option value="Brand new only">Brand new only</option>
                  <option value="Certified refurbished only">
                    Certified refurbished only
                  </option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-50"
                />
              </div>

              {errors.newOrRefurbished && (
                <p className={errorClass}>{errors.newOrRefurbished.message}</p>
              )}
            </div>

            {/* Requirements */}
            <div>
              <label htmlFor="requirements" className={labelClass}>
                What do you need? <span className="text-red-500">*</span>
              </label>

              <textarea
                id="requirements"
                rows={3}
                placeholder="e.g. 20 business laptops, 5 workstations, 2 network switches, 30 monitors"
                {...register("whatDoYouNeed")}
                aria-invalid={!!errors.whatDoYouNeed}
                className={`${inputClass} resize-y py-3 leading-5`}
              />

              {errors.whatDoYouNeed && (
                <p className={errorClass}>{errors.whatDoYouNeed.message}</p>
              )}
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-extrabold text-[#171b2c] shadow-[0_4px_10px_rgba(255,207,36,0.28)] transition focus:outline-none focus:ring-2 focus:ring-gold-600 focus:ring-offset-2 ${
              isLoading
                ? "cursor-not-allowed bg-gold/70"
                : "bg-gold hover:bg-gold-600"
            }`}
          >
            {isLoading && <LoaderCircle size={20} className="animate-spin" />}

            <span>
              {isLoading ? "Submitting request..." : "Send procurement request"}
            </span>
          </button>

          <p
            aria-live="polite"
            className="mt-2 text-center text-sm leading-5 text-faint"
          >
            Share your requirements and our procurement team will get back to
            you.
          </p>
        </form>
      </FormProvider>
    </div>
  );
}

export function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="mx-auto max-w-[620px] text-center">
      <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-2.5 font-heading text-2xl font-extrabold leading-tight tracking-[-0.035em] text-ink sm:text-4xl">
        {title}
      </h2>
      {children && (
        <p className="mx-auto mt-3 max-w-[570px] text-sm leading-[1.8] text-muted sm:text-base">
          {children}
        </p>
      )}
    </div>
  );
}

export function CorporateProcurementPage() {
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
