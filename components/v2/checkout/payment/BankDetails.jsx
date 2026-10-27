import { formatPrice } from "@/lib/utils";
import { BANK_DETAILS } from "../lib/constants";
import CopyButton from "./CopyButton";

function Row({ label, value, copyable }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <dt className="text-gray-500">{label}</dt>
      <dd className="flex items-center gap-1 text-right font-semibold text-gray-900">
        <span className="break-all">{value}</span>
        {copyable && <CopyButton value={value} label={label} />}
      </dd>
    </div>
  );
}

export default function BankDetails({ total }) {
  return (
    <div className="mt-1 rounded-xl bg-gray-50 p-4 text-sm">
      <dl className="divide-y divide-gray-200">
        <Row label="Bank" value={BANK_DETAILS.bankName} />
        <Row label="Account title" value={BANK_DETAILS.accountTitle} />
        <Row label="Account no." value={BANK_DETAILS.accountNumber} copyable />
        <Row label="Branch code" value={BANK_DETAILS.branchCode} />
        <Row label="IBAN" value={BANK_DETAILS.iban} copyable />
        <Row label="Amount to transfer" value={formatPrice(total)} />
      </dl>
      <p className="mt-3 text-gray-700">
        WhatsApp your deposit slip to <strong>{BANK_DETAILS.whatsapp}</strong>
      </p>
    </div>
  );
}
