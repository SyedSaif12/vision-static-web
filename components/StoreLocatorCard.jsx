import headerimage from "../assets/headerimage.png";

export default function StoreLocatorCard() {
  return (
    <div className="max-w-sm rounded-2xl shadow p-4 bg-white">
      <div className="w-full h-40 overflow-hidden rounded-xl mb-4">
        <img
          src="/mnt/data/076d1ca2-1fd3-4bf1-badf-810cadb21f66.png"
          alt="Store Image"
          className="w-full h-full object-cover"
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
