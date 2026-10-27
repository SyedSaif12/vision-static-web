"use client";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

export default function CopyButton({ value, label }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} copied`);
    } catch {
      toast.error("Could not copy. Please select and copy it manually.");
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label}`}
      className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
    >
      <Copy size={14} aria-hidden="true" />
    </button>
  );
}
