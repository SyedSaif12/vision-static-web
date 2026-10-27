"use client";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { DELIVERY, NEW_ADDRESS, STEP, getStepIndex } from "./lib/constants";
import { formatPrice } from "@/lib/utils";
import { fullAddressLine } from "./lib/format";
import StepCard from "./StepCard";
import AddressStepBody from "./steps/AddressStepBody";
import SignedInStep from "./steps/SignedInStep";
import StepSkeleton from "./ui/Skeleton";

// Delivery + payment are only needed once the user reaches them → separate chunks.
const DeliveryStepBody = dynamic(() => import("./steps/DeliveryStepBody"), {
  loading: () => <StepSkeleton rows={3} />,
});
const PaymentStepBody = dynamic(() => import("./steps/PaymentStepBody"), {
  loading: () => <StepSkeleton rows={2} />,
});

export default function CheckoutSteps({
  profile,
  addressBook,
  flow,
  totals,
  isPlacing,
  onNotYou,
  onPlaceOrder,
  onWhatsApp,
}) {
  const { actions } = flow;
  const statusOf = (id) => {
    const diff = getStepIndex(id) - getStepIndex(flow.step);
    return diff < 0 ? "done" : diff === 0 ? "active" : "pending";
  };

  const profileName =
    `${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`.trim();
  const newAddressDefaults = flow.oneOffAddress ?? {
    fullName: profileName,
    phone: (profile?.phoneNo ?? "").replace(/\D/g, ""),
  };

  const handleSubmitNew = async (values) => {
    const { saveForNext, ...fields } = values;

    // User ne address save nahi karna, sirf is order ke liye use karna hai.
    if (!saveForNext) {
      actions.confirmAddress({ id: NEW_ADDRESS, ...fields }, { saved: false });
      return;
    }

    try {
      const saved = await addressBook.add(fields);

      // Database se saved address milne ke baad confirm karo.
      actions.confirmAddress(saved, { saved: true });
    } catch (error) {
      toast.error(
        error?.message || "Could not save the address. Please try again.",
      );
    }
  };

  const handleSubmitEdit = async (id, values) => {
    const { saveForNext, ...fields } = values;

    try {
      await addressBook.update(id, fields);
      toast.success("Address updated");
      return true;
    } catch (error) {
      toast.error(error?.message || "Could not update address.");
      return false;
    }
  };

  const handleRemove = async (id) => {
    try {
      await addressBook.remove(id);
      toast.success("Address removed");
    } catch (error) {
      toast.error(error?.message || "Could not remove address.");
    }
  };

  const confirmed = flow.confirmedAddress;
  const deliveryChoice = flow.deliveryOptions.find(
    (o) => o.id === flow.delivery,
  );

  return (
    <div className="space-y-4">
      <SignedInStep profile={profile} onNotYou={onNotYou} />

      <StepCard
        id="address"
        number={2}
        title="Delivery address"
        status={statusOf(STEP.ADDRESS)}
        summary={
          confirmed && `${confirmed.fullName} · ${fullAddressLine(confirmed)}`
        }
        onAction={() => actions.goTo(STEP.ADDRESS)}
      >
        <AddressStepBody
          addresses={addressBook.addresses}
          isReady={addressBook.isReady}
          choice={flow.choice}
          newAddressDefaults={newAddressDefaults}
          onChoose={actions.chooseAddress}
          onRemove={handleRemove}
          onConfirmSaved={(address) =>
            actions.confirmAddress(address, { saved: true })
          }
          onSubmitNew={handleSubmitNew}
          onSubmitEdit={handleSubmitEdit}
          onDraftCityChange={actions.setDraftCity}
        />
      </StepCard>

      <StepCard
        id="delivery"
        number={3}
        title="Delivery"
        status={statusOf(STEP.DELIVERY)}
        summary={
          deliveryChoice &&
          `${deliveryChoice.title} · ${
            deliveryChoice.fee === 0 ? "Free" : formatPrice(deliveryChoice.fee)
          }`
        }
        onAction={() => actions.goTo(STEP.DELIVERY)}
      >
        <DeliveryStepBody
          options={flow.deliveryOptions}
          value={flow.delivery}
          isKarachi={totals.isKarachi}
          onChoose={actions.chooseDelivery}
          onContinue={actions.confirmDelivery}
        />
      </StepCard>

      <StepCard
        id="payment"
        number={4}
        title="Payment"
        status={statusOf(STEP.PAYMENT)}
      >
        <PaymentStepBody
          value={flow.payment}
          totals={totals}
          isPlacing={isPlacing}
          onChoose={actions.choosePayment}
          onPlaceOrder={onPlaceOrder}
          onWhatsApp={onWhatsApp}
        />
      </StepCard>
    </div>
  );
}
