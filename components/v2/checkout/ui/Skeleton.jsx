export default function StepSkeleton({ rows = 2 }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-live="polite">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-20 animate-pulse rounded-2xl bg-gray-100" />
      ))}
    </div>
  );
}
