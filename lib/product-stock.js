
export const MAX_ITEM_QTY = 10;

/**
 * null / undefined => normal flow (max 10)
 * 5               => max 5
 * 2               => max 2
 * 0               => out of stock
 */
export function getMaxOrderQuantity(stockQuantity) {
  if (stockQuantity == null) {
    return MAX_ITEM_QTY;
  }

  const stock = Number(stockQuantity);

  if (!Number.isFinite(stock)) {
    return MAX_ITEM_QTY;
  }

  return Math.min(
    MAX_ITEM_QTY,
    Math.max(0, Math.floor(stock))
  );
}

/**
 * Quantity ko available stock aur max limit ke andar rakhta hai.
 */
export function clampOrderQuantity(quantity, stockQuantity) {
  const maxQty = getMaxOrderQuantity(stockQuantity);

  if (maxQty === 0) return 0;

  const qty = Number(quantity);

  if (!Number.isFinite(qty)) return 1;

  return Math.min(maxQty, Math.max(1, Math.floor(qty)));
}
