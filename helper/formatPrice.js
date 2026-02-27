export const formatPrice = (value) => {
  if (value === null || value === undefined || isNaN(value)) return "N/A";

  return new Intl.NumberFormat("en-PK").format(value);
};
