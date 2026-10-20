"use client";

import { useState } from "react";

// Sirf yehi interactive hissa client hai. Cart logic (context/zustand/server action) yahan jorna.
export function AddToCartButton({ productId }) {
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      data-product-id={productId}
      onClick={() => setAdded(true)}
      className="w-full rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-bold text-slate-900 transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
    >
      {added ? "Added to cart" : "Add to cart"}
    </button>
  );
}
