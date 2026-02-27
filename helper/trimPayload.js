export function trimPayload(payload) {
  const trimmedData = Object.fromEntries(
    Object.entries(payload).map(([key, value]) => [
      key,
      typeof value === "string" ? value.trim() : value,
    ])
  );

  return trimmedData;
}
