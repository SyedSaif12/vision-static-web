import { BaseDescription } from "@/components/BaseDescription";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import NewsLetter from "@/components/NewsLetter";

const faqStructure = [
  {
    id: 1,
    question: `Do you have a physical store?`,
    answer: `Yes, we do have a physical store where customers can visit and purchase products directly. You can also order online through our social media or WhatsApp.`,
    link: `https://share.google/Gu44g8ZD6NATIHaW6`,
  },
  {
    id: 2,
    question: `Do you offer Cash on Delivery (COD)?`,
    answer: `Yes, we offer Cash on Delivery in many cities across Pakistan. Availability may vary depending on the product and location.`,
  },
  {
    id: 3,
    question: `What does International Warranty mean?`,
    answer: `Some products come with International Warranty instead of local warranty.
    For example, brands like Dyson provide 2-year international warranty, but they do not have an official service center in Pakistan.
    In such cases:`,
    order: [
      `The warranty is directly backed by the brand itself.`,
      `If a warranty claim is required, Vision Tech will assist you with the process.`,
      `We help send the product from Pakistan to the brand’s official service center abroad and arrange its return once repaired or replaced.`,
      `Please note that international warranty cannot be claimed locally in Pakistan.`,
    ],
  },
  {
    id: 4,
    question: `Do you accept returns?`,
    answer: `Yes, we accept returns only if the product is in the same condition as it was dispatched.
    For example:`,
    order: [
      `If you order an iPhone, it will be delivered seal packed.`,
      `The seal must remain unopened for the product to be eligible for return.`,
      `Opened or used products cannot be returned.`,
    ],
  },
  {
    id: 5,
    question: `Do you offer same-day delivery in Karachi?`,
    answer: `Yes. For customers in Karachi, we offer same-day delivery for orders placed before 3 PM.`,
  },
  {
    id: 6,
    question: `Do you have a repair team?`,
    answer: `Yes, we have a dedicated repair team for various tech products. We repair:`,
    order: [
      `iPhones`,
      `Laptops`,
      `MacBooks`,
      `Mobile phones`,
      `Other tech devices`,
      `You can visit our Vision Tech Lab for repair services.`,
    ],
  },
  {
    id: 7,
    question: `What is the order confirmation process?`,
    answer: `Once you place an order:`,
    order: [
      `You will receive a confirmation call and WhatsApp message from our team.`,
      `After confirmation, we prepare your order for dispatch.`,
    ],
  },
  {
    id: 8,
    question: `How do you ensure product authenticity before dispatch?`,
    answer: `Before dispatching your order:`,
    order: [
      `We share a video of the product.`,
      `The video clearly shows the product name, serial number, and condition.`,
      `This allows you to verify the product before shipment.`,
    ],
  },
  {
    id: 9,
    question: `How can I verify the product after receiving it?`,
    answer: `When you receive the parcel:`,
    order: [
      `Check the serial number shown in the video shared earlier.`,
      `Match it with the serial number on the product box or device.`,
      `This ensures you received the exact same product.`,
    ],
  },
  {
    id: 10,
    question: `Are your products original?`,
    answer: `Yes. All products sold by Vision Tech are 100% original and authentic.`,
  },
  {
    id: 11,
    question: `Do you sell sealed products?`,
    answer: `Yes. Most products such as iPhones and branded electronics are delivered factory sealed, unless otherwise clearly mentioned.`,
  },
  {
    id: 12,
    question: `Do you ship all over Pakistan?`,
    answer: `Yes, we deliver products nationwide across Pakistan through trusted courier partners.`,
  },
  {
    id: 13,
    question: `How long does delivery take outside Karachi?`,
    answer: `Delivery usually takes 1–3 working days, depending on the city and courier service.`,
  },
  {
    id: 14,
    question: `How can I place an order?`,
    answer: `You can place an order through:`,
    order: [
      `WhatsApp`,
      `Instagram`,
      `Facebook messages`,
      `Directly visiting our physical store`,
      `Our team will guide you through the process.`,
    ],
  },
  {
    id: 15,
    question: `How can I contact Vision Tech?`,
    answer: `You can contact us through:`,
    order: [
      `WhatsApp`,
      `Instagram`,
      `Facebook messages`,
      `visiting our physical store`,
      `Our team is always available to assist you.`,
    ],
  },
];

export default function FAQs() {
  return (
    <main className="min-h-screen">
      <>
        <HeroSection title="Vision Tech – Frequently Asked Questions (FAQ)" />
        <BaseDescription items={faqStructure} />
        <NewsLetter className="bg-gray-100 pt-14" />
        <Footer />
      </>
    </main>
  );
}
