"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import AddressForm, { NEW_ADDRESS_FORM_ID } from "../address/AddressForm";
import SavedAddressCard from "../address/SavedAddressCard";
import { NEW_ADDRESS } from "../lib/constants";
import { addressToFormValues } from "../lib/addresses";
import OptionCard from "../ui/OptionCard";
import StepSkeleton from "../ui/Skeleton";
import { primaryButton } from "../ui/styles";

export default function AddressStepBody({
  addresses,
  isReady,
  choice,
  newAddressDefaults,
  onChoose,
  onRemove, // (id) => Promise
  onConfirmSaved,
  onSubmitNew, // (values) => Promise
  onSubmitEdit, // (id, values) => Promise<boolean>
  onDraftCityChange,
}) {
  const [editingId, setEditingId] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  if (!isReady) return <StepSkeleton rows={3} />;

  const isNew = choice === NEW_ADDRESS;
  const selected = addresses.find((a) => a.id === choice);

  const handleChoose = (id) => {
    if (id !== editingId) setEditingId(null);
    onChoose(id);
  };

  const handleEdit = (id) => {
    onChoose(id);
    setEditingId(id);
  };

  const handleRemove = async (id) => {
    setBusyId(id);
    try {
      await onRemove(id);
    } finally {
      setBusyId(null);
    }
  };

  const handleSubmitNew = async (values) => {
    setIsSaving(true);
    try {
      await onSubmitNew(values);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmitEdit = async (id, values) => {
    if (await onSubmitEdit(id, values)) setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        {addresses.length
          ? "Choose a saved address or add a new one."
          : "Add the address we should deliver to."}
      </p>

      <div
        role="radiogroup"
        aria-label="Delivery address"
        className="space-y-3"
      >
        {addresses.map((address) => {
          const isEditing = editingId === address.id;
          return (
            <SavedAddressCard
              key={address.id}
              address={address}
              checked={choice === address.id}
              isEditing={isEditing}
              isBusy={busyId === address.id}
              onChange={handleChoose}
              onEdit={handleEdit}
              onRemove={handleRemove}
            >
              <AddressForm
                formId={`edit-address-${address.id}`}
                mode="edit"
                defaultValues={addressToFormValues(address)}
                onSubmit={(values) => handleSubmitEdit(address.id, values)}
                onCancel={() => setEditingId(null)}
              />
            </SavedAddressCard>
          );
        })}

        <OptionCard
          name="address"
          value={NEW_ADDRESS}
          checked={isNew}
          onChange={handleChoose}
          icon={Plus}
          title="Add a new address"
          description="Deliver somewhere else. We save it for next time."
          keepMounted
        >
          <AddressForm
            defaultValues={newAddressDefaults}
            onSubmit={handleSubmitNew}
            onCityChange={onDraftCityChange}
          />
        </OptionCard>
      </div>

      <button
        type={isNew ? "submit" : "button"}
        form={isNew ? NEW_ADDRESS_FORM_ID : undefined}
        disabled={isSaving || (!isNew && !!editingId)}
        onClick={isNew ? undefined : () => selected && onConfirmSaved(selected)}
        className={`${primaryButton} sm:w-auto`}
      >
        {isSaving ? "Saving address…" : "Deliver to this address"}
      </button>
    </div>
  );
}
