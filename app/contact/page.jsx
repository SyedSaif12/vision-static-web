"use client";
import HeroSection from "@/components/HeroSection";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <HeroSection title="Contact" />

      <div className="min-h-screen w-full bg-gray-100 p-6 flex items-center justify-center">
        <ContactForm />
      </div>
    </>
  );
}
