"use client";
import { useState } from "react";
import { ChevronDown, Video } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { COD_FEE_RATE, PAYMENT, SUMMARY_NOTE } from "../lib/constants";
import { cx } from "../ui/cx";
import OrderSummaryItem from "./OrderSummaryItem";

function Line({ label, value, className }) {
  return (
    <div className={cx("flex items-start justify-between gap-4", className)}>
      <span>{label}</span>
      <span className="shrink-0">{value}</span>
    </div>
  );
}

/** Right-hand summary on desktop; collapsible bar on mobile. */
export default function OrderSummary({
  products,
  itemCount,
  totals,
  onRemove,
  onQuantity,
  className,
}) {
  const [open, setOpen] = useState(false);
  const pct = `${COD_FEE_RATE * 100}%`;

  return (
    <aside
      aria-label="Order summary"
      className={cx("rounded-2xl border border-gray-200 bg-white shadow-sm", className)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between p-4 lg:hidden"
      >
        <span className="flex items-center gap-2 font-semibold text-gray-900">
          Your order
          <ChevronDown
            size={18}
            aria-hidden="true"
            className={cx("transition-transform", open && "rotate-180")}
          />
        </span>
        <span className="font-bold text-gray-900">{formatPrice(totals.total)}</span>
      </button>

      <div className={cx(open ? "block" : "hidden", "p-5 pt-0 lg:block lg:p-6")}>
        <h2 className="mb-4 hidden text-lg font-bold text-gray-900 lg:block">
          Your order
        </h2>

        <ul className="space-y-4 border-b border-gray-200 pb-4">
          {products.map((item) => (
            <OrderSummaryItem
              key={item.id}
              item={item}
              onRemove={onRemove}
              onQuantity={onQuantity}
            />
          ))}
        </ul>

        <div className="space-y-2.5 py-4 text-gray-700">
          <Line
            label={`Subtotal (${itemCount} ${itemCount === 1 ? "item" : "items"})`}
            value={<span className="font-semibold text-gray-900">{formatPrice(totals.subtotal)}</span>}
          />

          {totals.codFee > 0 && (
            <Line
              className="text-red-600"
              label={
                <span className="flex flex-col">
                  <span>COD fee ({pct})</span>
                  <span className="text-sm">
                    Choose bank transfer and the {pct} fee is waived.
                  </span>
                </span>
              }
              value={formatPrice(totals.codFee)}
            />
          )}

          <Line
            label="Delivery"
            value={
              <span className="font-semibold text-gray-900">
                {totals.shippingFee === 0 ? "Free" : formatPrice(totals.shippingFee)}
              </span>
            }
          />
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <span className="text-xl font-bold text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">{formatPrice(totals.total)}</span>
        </div>

        {totals.shouldApplyCODFee && (
          <p className="mt-2 text-xs text-red-600">
            * Total includes {pct} COD processing fee
          </p>
        )}

        {totals.isKarachi && totals.paymentMethod === PAYMENT.COD && totals.shippingFee > 0 && (
          <p className="mt-2 text-xs text-green-700">
            Delivery charges {formatPrice(totals.shippingFee)} apply
          </p>
        )}

        {SUMMARY_NOTE && (
          <div className="mt-4 flex gap-3 rounded-xl bg-green-50 p-4 text-sm text-green-800">
            <Video size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            <p>{SUMMARY_NOTE}</p>
          </div>
        )}
      </div>
    </aside>
  );
}
