"use client";
import { Clock, Store, Truck } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { DELIVERY, DELIVERY_NOTES } from "../lib/constants";
import Badge from "../ui/Badge";
import OptionCard from "../ui/OptionCard";
import { primaryButton } from "../ui/styles";

const ICONS = {
  [DELIVERY.STANDARD]: Truck,
  [DELIVERY.SAME_DAY]: Clock,
  [DELIVERY.PICKUP]: Store,
};

export default function DeliveryStepBody({
  options,
  value,
  isKarachi,
  onChoose,
  onContinue,
}) {
  return (
    <div className="space-y-4">
      <div role="radiogroup" aria-label="Delivery method" className="space-y-3">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            name="delivery-method"
            value={option.id}
            checked={value === option.id}
            disabled={!option.available}
            onChange={onChoose}
            icon={ICONS[option.id]}
            title={option.title}
            description={option.available ? option.description : option.unavailableReason}
            badge={
              option.fee === 0 ? (
                <Badge tone="success">Free</Badge>
              ) : (
                <Badge tone="brand">{formatPrice(option.fee)}</Badge>
              )
            }
          />
        ))}
      </div>

      {isKarachi && value !== DELIVERY.PICKUP && (
        <p className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">
          {DELIVERY_NOTES.karachi}
        </p>
      )}

      <button
        type="button"
        onClick={() => onContinue(value)}
        className={`${primaryButton} sm:w-auto`}
      >
        Continue to payment
      </button>
    </div>
  );
}
