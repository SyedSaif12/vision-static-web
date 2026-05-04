import { BaseDescription } from "@/components/BaseDescription";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection"; // FIXED
import NewsLetter from "@/components/NewsLetter";

export default function Instalment() {
  return (
    <main className="min-h-screen bg-gray-100">
      <>
        <HeroSection title="Installment Plans at Vision Tech" />
        <div className="w-11/12 lg:w-10/12 mx-auto mt-10">
          <div>
            <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">
              Making Tech More Affordable
            </h2>
            <p>
              At Vision Tech, we understand that not everyone wants to pay the
              full amount upfront. That’s why we offer easy installment options
              through major banks in Pakistan, so you can get the tech you need
              without financial stress. Our goal is simple: make premium
              technology accessible to more people across Pakistan.
            </p>
            <span className="w-full border-b-[1px] border-black mt-3 mb-10 inline-block" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">
              How to Purchase on Installment
            </h2>
            <p>Buying on installment is simple and straightforward:</p>
            <ul className="list-decimal pl-5 my-4">
              <li>Choose the product you want from Vision Tech</li>
              <li>
                Make the payment using your credit card at checkout or in-store
              </li>
              <li>
                Request your bank to convert the transaction into installments
              </li>
              <li>
                Your bank will divide the amount into monthly payments based on
                your selected plan
              </li>
            </ul>
            <p>
              Please note: Installment conversion is handled directly by your
              bank after the transaction is completed.
            </p>
            <span className="w-full border-b-[1px] border-black mt-3 mb-10 inline-block" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">
              Bank Alfalah Credit Card Plans
            </h2>
            <p>
              If you are using a Bank Alfalah credit card, the following
              installment options are available:
            </p>
            <ul className="list-disc pl-5 my-4">
              <li>3 Months – 8%</li>
              <li>6 Months – 13%</li>
              <li>9 Months – 19%</li>
              <li>12 Months – 24%</li>
            </ul>
            <span className="w-full border-b-[1px] border-black mt-3 mb-10 inline-block" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">
              HBL Credit Card Plans
            </h2>
            <p>For HBL credit card users:</p>
            <ul className="list-disc pl-5 my-4">
              <li>6 Months – 12%</li>
              <li>12 Months – 24% (2% per month)</li>
            </ul>
            <span className="w-full border-b-[1px] border-black mt-3 mb-10 inline-block" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">
              Other Banks We Support
            </h2>
            <p>
              We also facilitate installment payments through multiple banks in
              Pakistan. Rates and plans may vary depending on your bank:
            </p>
            <ul className="list-disc pl-5 my-4">
              <li>Standard Chartered Bank</li>
              <li>MCB Bank</li>
              <li>UBL</li>
              <li>Faysal Bank</li>
              <li>Meezan Bank</li>
              <li>Askari Bank</li>
              <li>Bank Islamic</li>
              <li>Allied Bank</li>
            </ul>
            <p>
              For exact installment plans and charges, please contact your bank
              directly, as each bank has its own policies and rates.
            </p>
            <span className="w-full border-b-[1px] border-black mt-3 mb-10 inline-block" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">
              Important Note
            </h2>
            <p>
              All installment charges, markups, and percentages are applied by
              the bank, not by Vision Tech. Vision Tech only receives the
              original product price. We do not add any hidden charges,
              interest, or extra fees on installment purchases
            </p>
            <span className="w-full border-b-[1px] border-black mt-3 mb-10 inline-block" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">
              Our Commitment
            </h2>
            <p>
              We are here to make your buying experience simple, transparent,
              and stress-free. Whether you choose to pay upfront or through
              installments, you will always get honest pricing and full clarity.
              If you need help selecting the right product or understanding
              installment options, our team is always here to guide you.
            </p>
            <span className="w-full border-b-[1px] border-black mt-3 mb-10 inline-block" />
          </div>
        </div>
        <NewsLetter className="bg-gray-100 pt-14" />
        <Footer />
      </>
    </main>
  );
}
