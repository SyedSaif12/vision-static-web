"use client";
import { useState } from "react";
import Modal from "./Modal";
import AddressForm from "@/components/v2/checkout/address/AddressForm";
import { addressToFormValues } from "@/components/v2/checkout/lib/addresses";

/**
 * Add / edit an address in a popup. `address` = null → create.
 * `onSave(values)` must throw on failure; the message is shown inline.
 */
export default function AddressModal({ address, profile, onSave, onClose }) {
  const [error, setError] = useState("");
  const isEdit = Boolean(address);

  const defaultValues = isEdit
    ? addressToFormValues(address)
    : {
        fullName:
          `${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`.trim(),
        phone: (profile?.phoneNo ?? "").replace(/\D/g, ""),
      };

  const handleSubmit = async (values) => {
    setError("");
    try {
      await onSave(values);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Modal
      title={isEdit ? "Edit address" : "Add new address"}
      onClose={onClose}
    >
      {error && (
        <p
          role="alert"
          className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}
      <AddressForm
        formId={isEdit ? `profile-edit-${address.id}` : "profile-new-address"}
        mode={isEdit ? "edit" : "create"}
        showActions
        showSaveToggle={false}
        submitLabel={isEdit ? "Save changes" : "Save address"}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}
