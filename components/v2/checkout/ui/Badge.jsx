import { cx } from "./cx";

const TONES = {
  neutral: "bg-gray-100 text-gray-700",
  brand: "bg-gray-100 text-primary",
  success: "bg-green-50 text-green-700",
  danger: "bg-red-50 text-red-600",
};

export default function Badge({ tone = "neutral", className, children }) {
  return (
    <span
      className={cx(
        "inline-flex items-center whitespace-nowrap rounded-md px-2 py-1 text-xs font-semibold",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
