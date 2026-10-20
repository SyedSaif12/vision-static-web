import { getInstallmentPlan } from "@/lib/product-query/fetch-api";
import { getBankPlans, getAllMonths } from "@/lib/instalment";
import { SITE_URL, jsonLd } from "./_lib/constants";
import { getFaqs } from "./_lib/faqs";

import Hero from "./_components/Hero";
import Highlights from "./_components/Highlights";
import HowItWorks from "./_components/HowItWorks";
import InstalmentCalculator from "./_components/InstalmentCalculator";
import BankComparison from "./_components/BankComparison";
import Requirements from "./_components/Requirements";
import InstalmentFaq from "./_components/InstalmentFaq";
import FinalCta from "./_components/FinalCta";
import SectionHeading from "./_components/SectionHeading";

// Bank rates kabhi kabhi badlte hain, is liye har ghante fresh data
export const revalidate = 3600;

const TITLE = "Credit Card Instalment Plans in Pakistan | WeGot";
const DESCRIPTION =
  "Buy laptops, phones and appliances on easy credit card instalments. Compare HBL, UBL, Meezan and more, and see your exact monthly payment with WeGot.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/instalment-plan` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/instalment-plan`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "WeGot",
    locale: "en_PK",
  },
  robots: { index: true, follow: true },
};

export default async function InstalmentPlanPage() {
  let raw = {};
  try {
    raw = await getInstallmentPlan();
  } catch {
    raw = {};
  }

  const banks = getBankPlans(raw);
  const months = getAllMonths(banks);
  const hasZeroMarkup = banks.some((b) => b.plans.some((p) => p.markup === 0));
  const hasIslamic = banks.some((b) => b.islamic);
  const faqs = getFaqs({ hasZeroMarkup, hasIslamic });

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqLd) }}
      />

      <Hero months={months} />
      <Highlights
        months={months}
        hasZeroMarkup={hasZeroMarkup}
        hasIslamic={hasIslamic}
      />
      <HowItWorks />

      {banks.length ? (
        <>
          <InstalmentCalculator banks={banks} />
          <BankComparison
            banks={banks}
            months={months}
            hasZeroMarkup={hasZeroMarkup}
          />
        </>
      ) : (
        <section id="calculator" className="scroll-mt-40 py-12 md:py-16">
          <div className="mx-auto w-11/12">
            <SectionHeading
              title="Bank rates are updating"
              subtitle="We could not load the current bank rates right now. Please check back shortly or message us on WhatsApp for exact plans."
            />
          </div>
        </section>
      )}

      <Requirements />
      <InstalmentFaq items={faqs} />
      <FinalCta />
    </main>
  );
}
