import StoreLocatorCard from "@/components/StoreLocatorCard";
import HeroSection from "@/components/HeroSection";
import HomeProducts from "@/components/HomeProducts";
import headerimage from "@/assets/headerimage.png";

export default function StoreLocatorPage() {
  const stores = [
    {
      id: 1,
      name: "APPLESHOP",
      type: "COMPUTER ACCESSORIES STORE",
      address:
        "Plot Bc-05, Khayan-e-Iqbal Road, Block 7 Zone A Block 7 Clifton, Karachi, 75600, Pakistan",
      imgSrc: headerimage,
    },
    {
      id: 2,
      name: "APPLEHUB.PK",
      type: "COMPUTER ACCESSORIES STORE",
      address:
        "Plot Bc-05, Khayan-e-Iqbal Road, Block 7 Zone A Block 7 Clifton, Karachi, 75600, Pakistan",
      imgSrc: headerimage,
    },
    {
      id: 3,
      name: "CLIFTON SASSI ARCADE",
      type: "COMPUTER ACCESSORIES STORE",
      address:
        "Plot Bc-05, Khayan-e-Iqbal Road, Block 7 Zone A Block 7 Clifton, Karachi, 75600, Pakistan",
      imgSrc: headerimage,
    },
  ];

  return (
    <>
      <HeroSection />
      <div className="px-6 md:px-16 lg:px-32 bg-gray-100">
        <div className="w-full flex justify-center items-start p-6">
          <div className="w-full max-w-7xl bg-gray-100 p-4 grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl">
            {/* Left Side Store List */}
            <div className="md:col-span-1 flex flex-col gap-4 overflow-y-auto h-[90vh] pr-2">
              {stores.map((store) => (
                <StoreLocatorCard key={store.id} {...store} />
              ))}
            </div>

            {/* Right Side Map */}
            <div className="md:col-span-2 rounded-2xl overflow-hidden shadow bg-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.2831119177623!2d67.02893877523963!3d24.857190745497868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33dfb30ff2a11%3A0xda96e3b9a9e8f365!2sClifton%20Block%207!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <HomeProducts />
      </div>
    </>
  );
}
