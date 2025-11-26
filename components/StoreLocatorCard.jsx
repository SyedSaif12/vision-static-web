import Image from "next/image";
import storeLocator from "@/assets/storeslocationimage.png";

export default function StoreLocatorCard() {
  return (
    <div className="max-w-sm rounded-2xl shadow p-4 bg-white">
      <div className="w-full h-40 overflow-hidden rounded-xl mb-4 relative">
        <Image
          src={storeLocator}
          alt="Store Image"
          fill
          className="object-cover"
        />
      </div>
      <h2 className="text-lg font-semibold">APPLESHOP</h2>
      <p className="text-sm text-gray-500 mb-3">COMPUTER ACCESSORIES STORE</p>
      <p className="text-sm text-gray-700 leading-relaxed">
        Plot Bc-05, Khayan-e-Iqbal Road, Block 7 Zone A Block 7 Clifton,
        Karachi, 75600, Pakistan
      </p>
    </div>
  );
}
