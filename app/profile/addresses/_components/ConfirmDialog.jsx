"use client";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import Modal from "./Modal";
import { secondaryButton } from "@/components/v2/checkout/ui/styles";

export default function ConfirmDialog({
  title,
  message,
  confirmLabel = "Delete",
  onConfirm, // async; throw to show an error
  onClose,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    setIsLoading(true);
    setError("");
    try {
      await onConfirm(); // parent closes the dialog on success
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };

  return (
    <Modal title={title} onClose={onClose} size="max-w-md">
      <p className="text-gray-600">{message}</p>
      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className={`${secondaryButton} sm:w-auto`}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading && (
            <LoaderCircle
              className="animate-spin"
              size={18}
              aria-hidden="true"
            />
          )}
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
