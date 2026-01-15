import { BaseDescription } from "@/components/BaseDescription";
import HeroSection from "@/components/HeroSection"; // FIXED

export default function AboutUs() {
  return (
    <main className="min-h-screen">
      <>
        <HeroSection title="About Us" />
        <BaseDescription />
      </>
    </main>
  );
}
