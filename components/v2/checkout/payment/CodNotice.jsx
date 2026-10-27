import { formatPrice } from "@/lib/utils";
import { COD_FEE_RATE } from "../lib/constants";

/** Red warning (4% fee outside Karachi) or green delivery note (Karachi). */
export default function CodNotice({ totals }) {
  const pct = `${COD_FEE_RATE * 100}%`;

  if (!totals.isKarachi) {
    return (
      <div className="mt-1 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        <p className="font-semibold">{pct} tax fee applies</p>
        <p className="mt-1">
          Pay cash when you receive your parcel. A {pct} tax and delivery
          charges of {formatPrice(totals.shippingFee)} will be added to your
          total. Choose bank transfer and the {pct} fee is waived.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-1 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
      <p className="font-semibold">
        {totals.shippingFee > 0
          ? `Delivery charges ${formatPrice(totals.shippingFee)} apply`
          : "No delivery charges for store pickup"}
      </p>
      <p className="mt-1">
        Pay cash when you receive your parcel. No extra COD fee for Karachi.
      </p>
    </div>
  );
}
