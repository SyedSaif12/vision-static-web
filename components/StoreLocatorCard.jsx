import Image from "next/image";
import storeLocator from "@/assets/storeslocationimage.png";

export default function StoreLocatorCard() {
  return (
    <div className="w-full rounded-2xl shadow p-4 bg-white">
      {/* Top section */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        {/* Image */}
        <div className="w-full sm:w-40 h-30 relative overflow-hidden rounded-xl">
          <Image
            src={storeLocator}
            alt="Store Image"
            fill
            className="object-cover"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center">
          <h2 className="text-base md:text-lg font-semibold text-black">
            APPLESHOP
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            COMPUTER ACCESSORIES STORE
          </p>
        </div>
      </div>

      {/* Address */}
      <p className="mt-3 text-sm text-gray-700 leading-relaxed">
        Plot Bc-05, Khayan-e-Iqbal Road, Block 7 Zone A Block 7 Clifton,
        Karachi, 75600, Pakistan
      </p>
    </div>
  );
}
