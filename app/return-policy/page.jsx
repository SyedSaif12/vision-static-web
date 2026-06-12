import { BaseDescription } from "@/components/BaseDescription";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection"; // FIXED
import NewsLetter from "@/components/NewsLetter";

export async function generateMetadata() {
  return {
    title: `Return Policy | WeGot Pakistan`,
    description:
      "WeGot is a Pakistani tech company built for the people of Pakistan. We started with a simple belief: everyone deserves access to reliable technology at a fair price,",
    alternates: {
      canonical: `/return-policy`,
    },
  };
}

export default function ReturnPolicy() {
  return (
    <main className="min-h-screen bg-gray-100">
      <>
        <HeroSection title="Return Policy of WeGot" />
        <div className="w-11/12 lg:w-10/12 mx-auto bg-gray-100 mt-10">
          <div>
            <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">
              A Principle We Follow
            </h2>
            <p>
              The Prophet (ﷺ) said: <br />
              <strong>
                “One who takes back something bought by his brother, Allah
                Ta'ala will take back or forgive his sins on the Day of
                Qiyamah.”
              </strong>{" "}
              At <strong>WeGot</strong>, this principle shapes how we deal with
              our customers. We believe in fairness, honesty, and building
              long-term trust.
            </p>
            <span className="w-full border-b-[1px] border-black mt-3 mb-10 inline-block" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">
              WeGot Return Policy – 7 Day Easy Returns
            </h2>
            <p>
              At WeGot, we offer a 7-day return policy to make your purchase
              risk-free and reliable. If you are not satisfied with your
              product, you can request a return within 7 days of delivery.
            </p>
            <p>However, the following conditions must be met:</p>
            <ul className="list-disc pl-5 my-4">
              <li>The product must be unused and in original condition</li>
              <li>
                All original packaging, seals, and accessories must be intact
              </li>
              <li>The product must not show any signs of usage or damage</li>
            </ul>
            <span className="w-full border-b-[1px] border-black mt-3 mb-10 inline-block" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">
              Important Condition for Sealed Products
            </h2>
            <p>
              As part of the <strong>WeGot Return Policy</strong>, sealed
              products are treated with extra care.
            </p>
            <p>
              For example, if you purchase a{" "}
              <strong>seal-packed iPhone from WeGot</strong>, open the seal, and
              start using the device, it will no longer be eligible for return.
            </p>
            <p>
              Once a sealed product is opened, its{" "}
              <strong>
                value decreases and it cannot be sold as new again. This is why
                WeGot cannot accept returns on opened and used sealed products.
              </strong>
            </p>
            <p>
              We always recommend customers to confirm their decision before
              opening any sealed item.
            </p>
            <span className="w-full border-b-[1px] border-black mt-3 mb-10 inline-block" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">
              Return Approval Process at WeGot
            </h2>
            <p>
              At WeGot, every return request is reviewed carefully to ensure
              fairness.
            </p>
            <ul className="list-disc pl-5 my-4">
              <li>Customers must request a return within 7 days of delivery</li>
              <li>Our team will inspect the product condition</li>
              <li>
                If the product meets the return criteria, the return will be
                approved
              </li>
            </ul>
            <span className="w-full border-b-[1px] border-black mt-3 mb-10 inline-block" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">
              Order Processing & Transparency at WeGot
            </h2>
            <p>
              At WeGot, we focus heavily on transparency and customer trust.
            </p>
            <p>Once you place an order:</p>
            <ul className="list-disc pl-5 my-4">
              <li>You will receive a confirmation message and email</li>
              <li>
                The WeGot team will contact you within 24 hours via call or
                WhatsApp
              </li>
            </ul>
            <span className="w-full border-b-[1px] border-black mt-3 mb-10 inline-block" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">
              Delivery Policy
            </h2>
            <ul className="list-disc pl-5 my-4">
              <li>Karachi: Same-day delivery available through WeGot</li>
              <li>
                Nationwide Delivery: 2–4 working days depending on courier
                services
              </li>
            </ul>
            <span className="w-full border-b-[1px] border-black mt-3 mb-10 inline-block" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">
              WeGot Verification Process Before Dispatch
            </h2>
            <p>
              To ensure complete trust, WeGot follows a strict verification
              process before dispatching any product:
            </p>
            <ul className="list-disc pl-5 my-4">
              <li>
                A video of your exact product is shared (for example, the
                specific iPhone you ordered)
              </li>
              <li>A video of the packing process is provided</li>
              <li>The serial number is shared for verification at delivery</li>
              <li>The dispatch slip and tracking details are sent</li>
            </ul>
            <p>You stay updated throughout the entire process.</p>
            <span className="w-full border-b-[1px] border-black mt-3 mb-10 inline-block" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">
              Our Commitment at WeGot
            </h2>
            <p>
              At WeGot, our goal is not just to sell products but to build trust
              across Pakistan.
            </p>
            <ul className="list-disc pl-5 my-4">
              <li>No hidden conditions</li>
              <li>No misleading information</li>
              <li>Clear and transparent policies</li>
            </ul>
            <p>
              The <strong>WeGot Return Policy</strong> is designed to protect
              both the customer and the product quality, ensuring a fair
              experience for everyone. We are here to make technology buying in
              Pakistan simple, honest, and reliable.
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
