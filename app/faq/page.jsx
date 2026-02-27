import { BaseDescription } from "@/components/BaseDescription";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import NewsLetter from "@/components/NewsLetter";

export default function FAQs() {
  return (
    <main className="min-h-screen">
      <>
        <HeroSection title="FAQs" />
        <BaseDescription />
        <NewsLetter className="bg-gray-100 pt-14" />
        <Footer />
      </>
    </main>
  );
}
