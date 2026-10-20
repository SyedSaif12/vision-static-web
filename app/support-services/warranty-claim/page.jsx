import Link from "next/link";
import { MapPin, Globe, Check, Clock, MessageCircle } from "lucide-react";
import WarrantyForm from "./ClientPage";
import FaqAccordion from "./FaqAccordion";

export const metadata = {
  title: "Warranty Claim | WeGot",
  description:
    "Bought from WeGot and something went wrong? Learn about local and international warranty and claim in three simple steps.",
};

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_ADMIN_NUMBER ?? "923260220581";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const localPoints = [
  "Handled in Pakistan, through WeGot",
  "No sending the product abroad",
  "The fastest to resolve",
  "Bring it in, or we collect it",
];

const internationalPoints = [
  "Backed by the brand worldwide",
  "Not claimable locally in Pakistan",
  "Product is sent abroad to the brand",
  "Takes longer, and we guide you",
];

const steps = [
  {
    id: 1,
    title: "Tell us",
    description:
      "Fill the form below or message us on WhatsApp with your bill, the product, and the issue.",
  },
  {
    id: 2,
    title: "We check your cover",
    description:
      "We confirm whether it is local or international, and what it covers.",
  },
  {
    id: 3,
    title: "We handle it",
    description:
      "Local claims are sorted here. International claims we arrange with the brand abroad, and keep you updated.",
  },
];

const faqs = [
  {
    question:
      "What is the difference between local and international warranty?",
    answer:
      "Local warranty is honoured inside Pakistan and claimed through us, quickly. International warranty is the brand's worldwide cover, which cannot be claimed here, so the product is sent abroad to the brand and it takes longer.",
  },
  {
    question: "Do I need my bill or invoice?",
    answer:
      "Yes. Your bill or invoice is the proof of purchase, so please keep it handy. You can attach a photo of it when our team replies to your claim.",
  },
  {
    question: "How long does an international claim take?",
    answer:
      "Because the product is sent abroad to the brand, it takes longer than a local claim. The timeline depends on the brand, and we keep you updated at every step.",
  },
  {
    question: "What about a used device I bought from WeGot?",
    answer:
      "Used and refurbished devices are covered as stated on their product page. Share your bill and the device details with us and we will confirm exactly what your cover includes.",
  },
];

function Page() {
  return (
    <main className="min-h-screen bg-white text-ink">
      {/* Hero */}
      <section className="bg-gradient-to-b from-light to-white">
        <div className="mx-auto w-11/12 pb-12 pt-5 sm:pb-14 sm:pt-7">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-1.5 text-xs text-muted"
          >
            <Link href="/" className="transition hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/" className="transition hover:text-primary">
              Support & Services
            </Link>
            <span>/</span>
            <span className="text-ink">Warranty Claim</span>
          </nav>

          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Warranty Claim
          </h1>
          <p className="mt-3 font-heading text-xl font-extrabold text-ink sm:text-2xl">
            Warranty, <span className="text-primary">made simple.</span>
          </p>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
            Bought from WeGot and something went wrong? Here is exactly what
            your warranty covers, the difference between local and international
            warranty, and two easy ways to claim: a quick form, or a message on
            WhatsApp.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#claim-form"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-gold px-6 text-sm font-extrabold text-ink shadow-md shadow-gold/40 transition hover:bg-gold-600"
            >
              Claim my warranty
            </Link>
            <Link
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#25d366] px-6 text-sm font-extrabold text-white transition hover:bg-[#1fbd5a]"
            >
              <MessageCircle size={15} fill="currentColor" />
              Chat on WhatsApp
            </Link>
          </div>
        </div>
      </section>

      {/* Two kinds of warranty */}
      <section className="mx-auto w-11/12 py-12 sm:py-14">
        <div className="mb-8 text-center">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary">
            First, know your warranty
          </p>
          <h2 className="mt-2 font-heading text-2xl font-extrabold text-ink">
            Two kinds of warranty
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
            Most products come with one of these, and some come with both. Here
            is what each one means for you.
          </p>
        </div>

        <div className="mx-auto grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Local */}
          <article className="rounded-2xl border border-light-100 border-t-[3px] border-t-primary bg-white p-6 shadow-sm">
            <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-light-50 text-primary">
              <MapPin size={18} />
            </span>
            <span className="inline-block rounded-full bg-[#e8f8ee] px-2.5 py-1 text-[10px]  font-bold text-green">
              Claimed here, through us
            </span>
            <h3 className="mt-3 font-heading text-xl font-extrabold text-ink">
              Local warranty
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Cover that is honoured inside Pakistan. You claim it through us,
              nothing leaves the country.
            </p>
            <ul className="mt-4 space-y-3 pl-3">
              {localPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 text-xs text-ink-50"
                >
                  <Check size={14} className="shrink-0 text-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </article>

          {/* International */}
          <article className="rounded-2xl border border-light-100 border-t-[3px] border-t-gold bg-white p-6 shadow-sm">
            <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
              <Globe size={18} />
            </span>
            <span className="inline-block rounded-full bg-gold-50 px-2.5 py-1 text-[10px] font-bold text-gold-700">
              The brand&apos;s global cover
            </span>
            <h3 className="mt-3 font-heading text-xl font-extrabold text-ink">
              International warranty
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              The manufacturer&apos;s worldwide warranty. It cannot be claimed
              inside Pakistan. If an issue arises, the product is sent out of
              the country to the brand, so it takes longer. We guide you through
              the whole process.
            </p>
            <ul className="mt-4 space-y-3 pl-3">
              {internationalPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 text-xs text-ink-50"
                >
                  <Check size={14} className="shrink-0 text-gold-700" />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mx-auto mt-5 flex max-w-3xl items-start gap-3 rounded-xl border border-light-100 bg-light px-4 py-3 text-xs leading-5 text-ink-50">
          <Clock size={14} className="mt-0.5 shrink-0 text-primary" />
          <p>
            Some products carry both. For example, HP laptops usually come with{" "}
            <strong className="text-ink">local and international</strong>{" "}
            warranty, so you can choose. Dyson comes with a{" "}
            <strong className="text-ink">2-year international</strong> warranty
            and no local warranty. The exact warranty is printed on each product
            page.
          </p>
        </div>
      </section>

      {/* How to claim */}
      <section className="bg-surface py-12 sm:py-14">
        <div className="mx-auto w-11/12">
          <div className="mb-8 text-center">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary">
              How to claim
            </p>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-ink">
              Three simple steps
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.id}
                className="rounded-xl border border-light-100 bg-white p-5 shadow-sm"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white">
                  {step.id}
                </span>
                <h3 className="mt-4 text-sm font-extrabold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-muted">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Claim form */}
      <section
        id="claim-form"
        className="mx-auto w-11/12 scroll-mt-24 py-12 sm:py-14"
      >
        <div className="mb-8 text-center">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary">
            Start your claim
          </p>
          <h2 className="mt-2 font-heading text-2xl font-extrabold text-ink">
            Claim your warranty
          </h2>
          <p className="mt-3 text-sm text-muted">
            Fill the form, or send the same details on WhatsApp. Either way, our
            team takes it from there.
          </p>
        </div>

        <div className="mx-auto grid grid-cols-1 items-start gap-5 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-2xl border border-light-100 bg-white p-5 shadow-md sm:p-6">
            <h3 className="font-heading text-base font-extrabold text-ink">
              Warranty claim form
            </h3>
            <p className="mt-1 text-xs text-muted">
              Fields marked with an asterisk are required.
            </p>
            <WarrantyForm />
          </div>

          <aside className="rounded-2xl border border-[#d5f0df] bg-[#e8f8ee] p-6 text-center">
            <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#25d366] shadow-sm">
              <MessageCircle size={20} fill="currentColor" />
            </span>
            <h3 className="font-heading text-xl font-extrabold text-ink">
              Prefer WhatsApp?
            </h3>
            <p className="mt-2 text-sm leading-5 text-ink-50">
              Send us your name, bill date, the product, and the issue, and we
              will start your claim right away.
            </p>
            <Link
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex min-h-10 items-center justify-center rounded-lg bg-[#25d366] px-4 text-xs font-bold text-white transition hover:bg-[#1fbd5a]"
            >
              Chat on WhatsApp
            </Link>
            <div className="mt-4 border-t border-[#cdeadb] pt-4 text-[11px] leading-5 text-ink-50">
              <p>Or visit us: Shop 29, SAASI Arcade,</p>
              <p>Block 7, Clifton, Karachi</p>
              <p>Mon to Sat, 9am to 5:30pm</p>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-12 sm:py-14">
        <div className="mx-auto w-11/12">
          <div className="mb-8 text-center">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary">
              Good to know
            </p>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-ink">
              Warranty questions
            </h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto w-11/12 py-12 sm:py-14">
        <div className="rounded-2xl bg-gradient-to-br from-primary-200 via-primary-100 to-primary px-6 py-10 text-center text-white sm:py-12">
          <h2 className="font-heading text-xl font-extrabold sm:text-2xl">
            Have an issue? Let us sort your warranty.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-xs leading-5 text-white/80">
            Tell us the product and the problem. We will check your cover and
            take it from there, local or international.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="#claim-form"
              className="inline-flex min-h-10 items-center justify-center rounded-lg bg-gold px-5 text-xs font-extrabold text-ink shadow-md shadow-black/20 transition hover:bg-gold-600"
            >
              Claim my warranty
            </Link>
            <Link
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 text-xs font-bold text-white transition hover:bg-white/20"
            >
              <MessageCircle size={13} fill="currentColor" />
              Chat on WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Page;
