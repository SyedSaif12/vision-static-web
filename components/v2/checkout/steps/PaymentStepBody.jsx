"use client";
import { Banknote, Landmark, Lock, LoaderCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { COD_FEE_RATE, PAYMENT } from "../lib/constants";
import BankDetails from "../payment/BankDetails";
import CodNotice from "../payment/CodNotice";
import Badge from "../ui/Badge";
import OptionCard from "../ui/OptionCard";
import { primaryButton, secondaryButton } from "../ui/styles";

export default function PaymentStepBody({
  value,
  totals,
  isPlacing,
  onChoose,
  onPlaceOrder,
  onWhatsApp,
}) {
  return (
    <div className="space-y-4">
      <div role="radiogroup" aria-label="Payment method" className="space-y-3">
        <OptionCard
          name="payment-method"
          value={PAYMENT.BANK}
          checked={value === PAYMENT.BANK}
          onChange={onChoose}
          icon={Landmark}
          title="Bank transfer"
          description="Transfer to our bank account, then WhatsApp us the slip."
          badge={<Badge tone="success">No extra charge</Badge>}
        >
          <BankDetails total={totals.total} />
        </OptionCard>

        <OptionCard
          name="payment-method"
          value={PAYMENT.COD}
          checked={value === PAYMENT.COD}
          onChange={onChoose}
          icon={Banknote}
          title="Cash on delivery"
          description="Pay in cash when you receive your parcel."
          badge={
            totals.isKarachi ? (
              <Badge>Pay on delivery</Badge>
            ) : (
              <Badge tone="danger">+{COD_FEE_RATE * 100}% fee</Badge>
            )
          }
        >
          <CodNotice totals={totals} />
        </OptionCard>
      </div>

      <button
        type="button"
        disabled={!value || isPlacing}
        onClick={onPlaceOrder}
        className={primaryButton}
      >
        {isPlacing ? (
          <>
            <LoaderCircle className="animate-spin" size={18} aria-hidden="true" />
            Placing order…
          </>
        ) : value ? (
          `Place order · ${formatPrice(totals.total)}`
        ) : (
          <>
            <Lock size={16} aria-hidden="true" />
            Choose a payment method
          </>
        )}
      </button>

      <button
        type="button"
        disabled={!value || isPlacing}
        onClick={onWhatsApp}
        className={secondaryButton}
      >
        Order via WhatsApp
      </button>

      <p className="text-center text-sm text-gray-500">
        By placing your order you agree to our Return, Warranty and Payment policies.
      </p>
    </div>
  );
}
