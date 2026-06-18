import HeroSection from "@/components/HeroSection";
import ContactForm from "@/components/ContactForm";
import NewsLetter from "@/components/NewsLetter";
import Footer from "@/components/Footer";

export async function generateMetadata() {
  return {
    title: `Contact Us | WeGot Pakistan`,
    description:
      "WeGot is a Pakistani tech company built for the people of Pakistan. We started with a simple belief: everyone deserves access to reliable technology at a fair price,",
    alternates: {
      canonical: `/contact`,
    },
  };
}

export default function ContactPage() {
  return (
    <>
      <HeroSection singlePage={true} title="Contact" />

      <div className="min-h-screen w-full bg-gray-100 p-6 flex items-center justify-center">
        <ContactForm />
      </div>
      <NewsLetter className="bg-gray-100 pt-14" />
      <Footer />
    </>
  );
}
