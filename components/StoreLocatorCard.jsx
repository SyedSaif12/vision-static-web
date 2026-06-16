import Image from "next/image";
import storeLocator from "@/assets/storeslocationimage.png";

export default function StoreLocatorCard({ stores }) {
  return (
    <div className="w-full rounded-2xl shadow p-4 bg-white border border-gray-100">
      {/* Top section: Mobile aur desktop dono par flex-row hi rakha hai */}
      <div className="flex gap-4 w-full items-center">
        {/* 🟢 Image wrapper fixed dimensions ke sath taake responsive kharab na ho */}
        <div className="w-24 h-24 sm:w-32 sm:h-24 relative overflow-hidden rounded-xl shrink-0">
          <Image
            src={storeLocator}
            alt="Store Image"
            fill
            className="object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-center">
          <h2 className="text-base font-semibold text-black leading-tight">
            {stores?.name}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {stores?.type}
          </p>
        </div>
      </div>

      {/* Address */}
      <p className="mt-3 text-xs sm:text-sm text-gray-700 leading-relaxed border-t border-gray-100 pt-2">
        {stores?.address}
      </p>
    </div>
  );
}
