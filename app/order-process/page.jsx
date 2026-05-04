import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import NewsLetter from "@/components/NewsLetter";

export default function ReturnPolicy() {
  return (
    <main className="min-h-screen bg-gray-100">
      <>
        <HeroSection title="Order Processing Method – Vision Tech" />
        <div className="w-11/12 lg:w-10/12 mx-auto bg-gray-100 mt-10">
          <div>
            <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">
              Order Process
            </h2>
            <p>
              At Vision Tech, we know that ordering tech online can feel
              uncertain. That’s why we’ve built a clear, step-by-step order
              process focused on transparency, communication, and trust. From
              the moment you place your order to the time it reaches your
              doorstep, you stay informed at every stage.
            </p>
            <span className="w-full border-b-[1px] border-black mt-3 mb-10 inline-block" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">
              What Happens After You Place an Order
            </h2>
            <p>
              Once you place an order on the Vision Tech website, our process
              starts immediately.
            </p>
            <p>
              You will receive a confirmation through email or message so you
              know your order has been received. After that, a member of the
              Vision Tech team will personally contact you within 24 hours
              through call or WhatsApp to confirm your order details, answer any
              questions, and make sure everything is correct before moving
              forward.
            </p>
            <p>
              We believe this step is important because it avoids confusion and
              ensures you get exactly what you expect.
            </p>
            <span className="w-full border-b-[1px] border-black mt-3 mb-10 inline-block" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">
              Product Verification Before Dispatch
            </h2>
            <p>
              At Vision Tech, we don’t just pack and ship blindly. We make sure
              you know exactly what you are receiving. Before dispatching your
              order:
            </p>
            <ul className="list-disc pl-5 my-4">
              <li>
                We share a video of your actual product <br /> For example, if
                you ordered an iPhone 17 Pro Max, we show that exact unit in the
                video
              </li>
              <li>
                We share a video of the packing process <br /> So you can see
                how your product is being safely prepared
              </li>
              <li>
                We provide the serial number of the device <br /> You can verify
                this at the time of delivery for complete peace of mind
              </li>
            </ul>
            <p>
              This process is part of our commitment to transparency and helps
              eliminate any doubts.
            </p>
            <span className="w-full border-b-[1px] border-black mt-3 mb-10 inline-block" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">
              Dispatch & Tracking Updates
            </h2>
            <p>Once your order is packed and ready:</p>
            <ul className="list-disc pl-5 my-4">
              <li>We share the dispatch slip and tracking details</li>
              <li>
                You will continue to receive updates from the Vision Tech team
                regarding your order status
              </li>
            </ul>
            <p>You are never left guessing where your order is.</p>
            <span className="w-full border-b-[1px] border-black mt-3 mb-10 inline-block" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">
              Delivery Timeline
            </h2>
            <p>Vision Tech offers fast and reliable delivery options:</p>
            <ul className="list-disc pl-5 my-4">
              <li>Karachi: Same-day delivery available</li>
              <li>
                Other cities across Pakistan: Delivery typically takes 2 to 4
                working days, depending on the courier service
              </li>
            </ul>
            <p>
              We always try to ensure your order reaches you as quickly and
              safely as possible.
            </p>
            <span className="w-full border-b-[1px] border-black mt-3 mb-10 inline-block" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">
              Our Focus on Trust
            </h2>
            <p>
              Everything we do at Vision Tech is built around one goal: earning
              your trust. From confirmation calls to product videos and live
              updates, we make sure you feel confident about your purchase. We
              understand the concerns people have when ordering tech online in
              Pakistan, and we’ve designed our process to remove those concerns.
            </p>
            <span className="w-full border-b-[1px] border-black mt-3 mb-10 inline-block" />
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl mb-5 font-semibold">
              Why Vision Tech’s Process is Different
            </h2>
            <p>
              At Vision Tech, you’re not just placing an order on a website.
              You’re dealing with a real team that communicates, verifies, and
              supports you throughout the journey. Our order processing method
              is simple, honest, and customer-focused—because for us, trust
              matters more than anything.
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
