"use client";
import HeroSection from "@/components/HeroSection";
import ContactForm from "@/components/ContactForm";
import NewsLetter from "@/components/NewsLetter";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <HeroSection title="Contact" />

      <div className="min-h-screen w-full bg-gray-100 p-6 flex items-center justify-center">
        <ContactForm />
      </div>
      <NewsLetter className="bg-gray-100 pt-14" />
      <Footer />
    </>
  );
}
