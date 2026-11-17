import {
  formatPhone,
  fullAddressLine,
} from "@/components/v2/checkout/lib/format";
import Badge from "@/components/v2/checkout/ui/Badge";
import { cx } from "@/components/v2/checkout/ui/cx";

const actionButton =
  "rounded-lg border px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

export default function AddressCard({
  address,
  busyAction, // "default" | null – this card is waiting on an API call
  onEdit,
  onSetDefault,
  onDelete,
}) {
  const label = address.label || "Address";

  return (
    <li
      className={cx(
        "flex flex-col rounded-2xl border bg-white p-5 shadow-sm",
        address.isDefault ? "border-primary" : "border-gray-200",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-bold text-gray-900">{label}</h3>
        {address.isDefault && <Badge tone="brand">Default</Badge>}
      </div>

      <div className="mt-3 space-y-1 text-sm text-gray-600">
        <p>
          {address.fullName} · {formatPhone(address.phone)}
        </p>
        <p>{fullAddressLine(address)}</p>
        {address.landmark && <p>Near {address.landmark}</p>}
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        <button
          type="button"
          onClick={() => onEdit(address)}
          disabled={Boolean(busyAction)}
          aria-label={`Edit ${label} address`}
          className={cx(
            actionButton,
            "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
          )}
        >
          Edit
        </button>

        {!address.isDefault && (
          <button
            type="button"
            onClick={() => onSetDefault(address)}
            disabled={Boolean(busyAction)}
            aria-label={`Set ${label} as default address`}
            className={cx(
              actionButton,
              "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
            )}
          >
            {busyAction === "default" ? "Setting…" : "Set default"}
          </button>
        )}

        <button
          type="button"
          onClick={() => onDelete(address)}
          disabled={Boolean(busyAction)}
          aria-label={`Delete ${label} address`}
          className={cx(
            actionButton,
            "border-gray-200 bg-white text-red-600 hover:border-red-200 hover:bg-red-50",
          )}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
