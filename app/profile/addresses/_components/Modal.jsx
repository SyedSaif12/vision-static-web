"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

/**
 * Accessible modal built on the native <dialog>: focus trap, Esc to close and
 * inert background come from the browser. Mount it only while it is open.
 *
 * Note: toasts render *under* a modal's backdrop, so show errors inline in here.
 */
export default function Modal({
  title,
  onClose,
  size = "max-w-2xl",
  children,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="modal-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose(); // click on the backdrop
      }}
      className={`m-auto max-h-[90vh] w-[92%] animate-[modalEnter_350ms_ease-out_forwards] ${size} overflow-y-auto rounded-2xl border-0 bg-white p-0 shadow-xl backdrop:bg-black/50`}
    >
      <div className="p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 id="modal-title" className="text-xl font-bold text-gray-900">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
