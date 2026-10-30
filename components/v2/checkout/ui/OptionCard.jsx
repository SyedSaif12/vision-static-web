import { cx } from "./cx";

/**
 * Accessible radio "card". The whole header row is a <label> around a real
 * radio input, so keyboard + screen readers work natively.
 */
export default function OptionCard({
  name,
  value,
  checked,
  disabled = false,
  onChange,
  icon: Icon,
  title,
  description,
  badge,
  actions,
  keepMounted = false,
  children,
}) {
  const showBody = children && (checked || keepMounted);

  return (
    <div
      className={cx(
        "rounded-2xl border bg-white transition-colors",
        checked ? "border-primary ring-1 ring-primary" : "border-gray-200",
        !checked && !disabled && "hover:border-gray-300",
        disabled && "bg-gray-50",
      )}
    >
      <div className="flex flex-col md:flex-row items-center">
        <label
          className={cx(
            "flex min-w-0 flex-1 items-center gap-3 p-4 sm:gap-4",
            disabled ? "cursor-not-allowed" : "cursor-pointer",
          )}
        >
          <input
            type="radio"
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={() => onChange(value)}
            className="peer sr-only"
          />
          <span
            aria-hidden="true"
            className={cx(
              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
              checked ? "border-primary" : "border-gray-300",
              disabled && "border-gray-200",
            )}
          >
            {checked && (
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            )}
          </span>

          {Icon && (
            <span
              aria-hidden="true"
              className={cx(
                "hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 sm:flex",
                disabled ? "text-gray-400" : "text-primary",
              )}
            >
              <Icon size={20} />
            </span>
          )}

          <span className="min-w-0 flex-1">
            <span
              className={cx(
                "block font-semibold",
                disabled ? "text-gray-500" : "text-gray-900",
              )}
            >
              {title}
            </span>
            {description && (
              <span className="mt-0.5 block text-xs text-gray-600">
                {description}
              </span>
            )}
          </span>

          {badge && (
            <span className="shrink-0 self-start sm:self-center">{badge}</span>
          )}
        </label>
        {actions}
      </div>

      {showBody && (
        <div hidden={!checked} className="px-4 pb-4 sm:px-5 sm:pb-5">
          {children}
        </div>
      )}
    </div>
  );
}
