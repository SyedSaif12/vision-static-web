import { BaseDescription } from "@/components/BaseDescription";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection"; // FIXED
import NewsLetter from "@/components/NewsLetter";

export default function Instalment() {
  return (
    <main className="min-h-screen">
      <>
        <HeroSection title="Installment" />
        <BaseDescription />
        <NewsLetter className="bg-gray-100 pt-14" />
        <Footer />
      </>
    </main>
  );
}
