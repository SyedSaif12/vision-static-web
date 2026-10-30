import { Pencil, Trash2 } from "lucide-react";
import Badge from "../ui/Badge";
import OptionCard from "../ui/OptionCard";
import { formatPrice } from "@/lib/utils";
import { formatPhone } from "../lib/format";
import { getBaseShippingFee } from "../lib/pricing";
import toast from "react-hot-toast";

const iconButton =
  "rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40";

const btn = "px-5 py-1 rounded-md text-white";
export default function SavedAddressCard({
  address,
  checked,
  isEditing,
  isBusy,
  onChange,
  onEdit,
  onRemove,
  children, // the edit form, shown while isEditing
}) {
  const label = address.label || "saved";

  const handleRemove = () => {
    toast.custom((t) => (
      <div className="bg-white shadow-lg rounded-xl p-4 border border-gray-200">
        <p className="font-medium text-gray-900">
          Remove your "{label}" address?
        </p>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => {
              onRemove(address.id);
              toast.dismiss(t.id);
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Remove
          </button>

          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <OptionCard
      name="address"
      value={address.id}
      checked={checked}
      onChange={onChange}
      title={
        <span className="flex items-center gap-2">
          {address.label || "Address"}
          {address.isDefault && <Badge>Default</Badge>}
        </span>
      }
      description={
        <>
          <span className="block">{address.fullName}</span>
          <span className="block">{formatPhone(address.phone)}</span>
          <span className="block">
            {[address.fullAddress, address.area].filter(Boolean).join(", ")},{" "}
            <strong className="font-semibold text-gray-900">
              {address.city}
            </strong>
          </span>
          {address.landmark && (
            <span className="block">Near {address.landmark}</span>
          )}
        </>
      }
      badge={
        <Badge>{formatPrice(getBaseShippingFee(address.city))} delivery</Badge>
      }
      actions={
        !isEditing && (
          <div className="mr-3 flex items-center">
            <button
              type="button"
              disabled={isBusy}
              onClick={() => onEdit(address.id)}
              aria-label={`Edit ${label} address`}
              className={`${iconButton} hover:text-gray-700`}
            >
              <span className={`${btn} md:hidden bg-primary`}>edit</span>
              <Pencil
                className="hidden md:block"
                size={16}
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              disabled={isBusy}
              onClick={handleRemove}
              aria-label={`Remove ${label} address`}
              className={`${iconButton} hover:text-red-600`}
            >
              <span className={`${btn} md:hidden bg-red`}>delete</span>
              <Trash2
                className="hidden md:block"
                size={16}
                aria-hidden="true"
              />
            </button>
          </div>
        )
      }
    >
      {isEditing ? children : null}
    </OptionCard>
  );
}
