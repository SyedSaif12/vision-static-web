"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { MapPin } from "lucide-react";
import { useAddressBook } from "@/components/v2/checkout/hooks/useAddressBook";
import { primaryButton } from "@/components/v2/checkout/ui/styles";
import AddressCard from "./_components/AddressCard";
import AddressModal from "./_components/AddressModal";
import ConfirmDialog from "./_components/ConfirmDialog";


export default function Addresses() {
  const profile = useSelector((state) => state.user?.data);
  const { addresses, add, update, remove, setDefault, hasDuplicate } =
    useAddressBook();

  const [form, setForm] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [busy, setBusy] = useState({ id: null, action: null });

  const handleSave = async (values) => {
    const { saveForNext, ...fields } = values;
    if (form.address) {
      await update(form.address.id, fields);
      toast.success("Address updated");
    } else {
      if (hasDuplicate(fields)) {
        throw new Error("You have already saved this address.");
      }
      await add(fields);
      toast.success("Address saved");
    }
    setForm(null);
  };

  const handleSetDefault = async (address) => {
    setBusy({ id: address.id, action: "default" });
    try {
      await setDefault(address.id);
      toast.success(`${address.label} is now your default address`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusy({ id: null, action: null });
    }
  };

  const handleConfirmDelete = async () => {
    await remove(toDelete.id); // throws → shown inside the dialog
    toast.success("Address deleted");
    setToDelete(null);
  };

  return (
    <section aria-labelledby="addresses-title">
      <div className="flex flex-wrap items-start justify-between mt-4 gap-4">
        <div>
          <h1 id="addresses-title" className="text-section-title text-gray-900">
            Saved addresses
          </h1>
          <p className="mt-1 text-gray-500">For faster checkout.</p>
        </div>
        <button
          type="button"
          onClick={() => setForm({ address: null })}
          className={`${primaryButton} !py-1 !px-3 !rounded-md !w-auto`}
        >
          Add new address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
          <MapPin
            className="mx-auto text-gray-400"
            size={32}
            aria-hidden="true"
          />
          <p className="mt-3 text-lg font-semibold text-gray-900">
            No saved addresses yet
          </p>
          <p className="mt-1 text-gray-500">
            Add one and checkout gets much faster.
          </p>
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              busyAction={busy.id === address.id ? busy.action : null}
              onEdit={(a) => setForm({ address: a })}
              onSetDefault={handleSetDefault}
              onDelete={setToDelete}
            />
          ))}
        </ul>
      )}

      {form && (
        <AddressModal
          key={form.address?.id ?? "new"}
          address={form.address}
          profile={profile}
          onSave={handleSave}
          onClose={() => setForm(null)}
        />
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete address?"
          message={`Your "${toDelete.label}" address (${toDelete.fullAddress}, ${toDelete.city}) will be removed. This can't be undone.`}
          onConfirm={handleConfirmDelete}
          onClose={() => setToDelete(null)}
        />
      )}
    </section>
  );
}
