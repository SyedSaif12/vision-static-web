export default function BankBadge({ code, className = "" }) {
  return (
    <span
      className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-xs font-extrabold text-primary ${className}`}
    >
      {code}
    </span>
  );
}
