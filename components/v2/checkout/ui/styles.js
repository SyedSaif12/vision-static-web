import { cx } from "./cx";

export const inputClass = (hasError) =>
  cx(
    "h-12 w-full rounded-xl border bg-white px-4 text-base text-gray-900 outline-none transition-colors",
    "placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary",
    hasError ? "border-red-500" : "border-gray-300",
  );

const buttonBase =
  "inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

export const primaryButton = cx(
  buttonBase,
  "bg-primary text-white hover:bg-primary-100",
);

export const secondaryButton = cx(
  buttonBase,
  "border-2 border-primary bg-white text-primary hover:bg-primary-100 hover:text-white",
);

export const linkButton =
  "text-sm font-semibold text-primary hover:underline focus-visible:underline";
