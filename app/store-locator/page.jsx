import StoreLocatorCard from "@/components/StoreLocatorCard";
import HeroSection from "@/components/HeroSection";
import headerimage from "@/assets/headerimage.png";
import ShowAllSubCategories from "@/components/ShowAllSubCategories";
import Footer from "@/components/Footer";

export default function StoreLocatorPage() {
  const stores = [
    {
      id: 1,
      name: "Vision Tech",
      type: "Computer accessories store",
      address:
        "Shop# 29, Ground Floor, SAASI Arcade, 7 Block, near Sohny Sweets, Zone C - Block 7 Zone A Block 7 Clifton, Karachi, 75600",
      imgSrc: headerimage,
    },
  ];

  return (
    <>
      <HeroSection
        title="Store Locator"
        offer="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
      />

      <div className="px-6 md:px-16 lg:px-32 bg-gray-100">
        <div className="w-full flex justify-center items-start p-6">
          <div className="w-full max-w-7xl bg-gray-100 p-4 grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl">
            {/* Left Side Store List */}
            <div className="md:col-span-1 flex flex-col gap-4 overflow-y-auto h-[90vh] pr-2">
              {stores.map((store) => (
                <StoreLocatorCard key={store.id} stores={store} />
              ))}
            </div>

            {/* Right Side Map */}
            <div className="md:col-span-2 rounded-2xl overflow-hidden shadow bg-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d338.4292432081471!2d67.03373287073228!3d24.829472196575384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33de8b7301099%3A0x621ef94dece7ba1!2sVision%20Tech!5e1!3m2!1sen!2s!4v1775056947997!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <ShowAllSubCategories />
      </div>
      <Footer />
    </>
  );
}
