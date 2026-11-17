"use client";

import BargainDialog from "@/components/BargainDialog";
import CartButton from "@/components/v2/cart/CartButton";
import { clampOrderQuantity, getMaxOrderQuantity } from "@/lib/product-stock";
import { useEffect, useState } from "react";

export default function ProductActions({ product, disabled = false }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [qty, setQty] = useState(1);

  const stockQuantity = product?.stockQuantity;
  const maxQty = getMaxOrderQuantity(stockQuantity);

  const isOutOfStock = maxQty === 0;
  const isDisabled = disabled || isOutOfStock;

  const safeQty = clampOrderQuantity(qty, stockQuantity);

  // Stock change hone par selected quantity adjust karo
  useEffect(() => {
    setQty((current) => clampOrderQuantity(current, stockQuantity));
  }, [stockQuantity]);

  const dec = () => {
    setQty((current) => clampOrderQuantity(current - 1, stockQuantity));
  };

  const inc = () => {
    setQty((current) => clampOrderQuantity(current + 1, stockQuantity));
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="flex-1 flex gap-3">
        {/* Quantity Selector */}
        <div
          className="flex-1 inline-flex h-12 w-full items-center justify-between rounded-xl border border-light-100 bg-white sm:w-32"
          role="group"
          aria-label="Quantity"
        >
          <button
            type="button"
            onClick={dec}
            disabled={isDisabled || safeQty <= 1}
            aria-label="Decrease quantity"
            className="h-full w-11 text-lg text-ink disabled:text-faint"
          >
            −
          </button>

          <span
            className="min-w-6 text-center text-sm font-semibold text-ink"
            aria-live="polite"
          >
            {safeQty}
          </span>

          <button
            type="button"
            onClick={inc}
            disabled={isDisabled || safeQty >= maxQty}
            aria-label="Increase quantity"
            className="h-full w-11 text-lg text-ink disabled:text-faint"
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <CartButton
          quantity={safeQty}
          product={product}
          disabled={isDisabled}
          className="h-12 min-w-0 flex-1 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          btnClassName="!h-12 !rounded-xl !w-full"
        />
      </div>

      {/* Bargain */}
      <div className="h-12 flex-1 lg:flex-grow-0 xl:flex-1 flex rounded-xl">
        <button
          type="button"
          disabled={isDisabled}
          onClick={() => setOpenDialog(true)}
          className={`w-full rounded-lg cursor-pointer px-4 py-2.5 bg-primary hover:bg-primary-200 text-white text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
            isDisabled
              ? "hover:cursor-not-allowed bg-primary/50 hover:bg-primary/50"
              : ""
          }`}
        >
          Bargain
        </button>
      </div>

      <BargainDialog
        id={product?.id}
        productName={product?.name}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </div>
  );

  // return (
  //   <div className="flex flex-col gap-3 sm:flex-row">
  //     <div className="flex-1 flex gap-3">
  //       <div
  //         className="flex-1 inline-flex h-12 w-full items-center justify-between rounded-xl border border-light-100 bg-white sm:w-32"
  //         role="group"
  //         aria-label="Quantity"
  //       >
  //         <button
  //           type="button"
  //           onClick={dec}
  //           disabled={disabled || qty <= 1}
  //           aria-label="Decrease quantity"
  //           className="h-full w-11 text-lg text-ink disabled:text-faint"
  //         >
  //           −
  //         </button>
  //         <span
  //           className="min-w-6 text-center text-sm font-semibold text-ink"
  //           aria-live="polite"
  //         >
  //           {qty}
  //         </span>
  //         <button
  //           type="button"
  //           onClick={inc}
  //           disabled={disabled || qty >= 10}
  //           aria-label="Increase quantity"
  //           className="h-full w-11 text-lg text-ink disabled:text-faint"
  //         >
  //           +
  //         </button>
  //       </div>

  //       <CartButton
  //         quantity={qty}
  //         product={product}
  //         disabled={disabled}
  //         className="h-12 min-w-0 flex-1 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  //         btnClassName="!h-12 !rounded-xl !w-full"
  //       />
  //     </div>

  //     <div className="h-12 flex-1 lg:flex-grow-0 xl:flex-1 flex rounded-xl focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
  //       <button
  //         type="button"
  //         disabled={disabled}
  //         onClick={() => {
  //           if (disabled) return;
  //           setOpenDialog(true);
  //         }}
  //         className={`w-full ${disabled && "hover:cursor-not-allowed bg-primary/50 hover:bg-primary/50"} rounded-lg cursor-pointer px-4 py-2.5 bg-primary hover:bg-primary-200 text-white text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2`}
  //       >
  //         Bargain
  //       </button>
  //     </div>

  //     <BargainDialog
  //       id={product?.id}
  //       productName={product?.title}
  //       open={openDialog}
  //       onClose={() => setOpenDialog(false)}
  //     />
  //   </div>
  // );
}
