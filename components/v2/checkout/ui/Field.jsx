export default function Field({ id, label, hint, error, className, children }) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-gray-900"
      >
        {label}
        {hint && <span className="ml-1 font-normal text-gray-500">({hint})</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
