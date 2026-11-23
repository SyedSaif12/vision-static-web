"use client";

import BargainDialog from "@/components/BargainDialog";
import CartButton from "@/components/v2/cart/CartButton";
import { clampOrderQuantity, getMaxOrderQuantity } from "@/lib/product-stock";
import { useEffect, useState } from "react";
import {
  getProductStatusConfig,
  PRODUCT_STATUS,
} from "./_components/AllComponents";

function NotifyStockForm({
  buttonLabel = "Notify me when it is back",
  onSubmitNotify,
}) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitNotify?.(form);
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          placeholder="Name"
          aria-label="Name"
          className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-ink placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
        />
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          placeholder="Email"
          aria-label="Email"
          className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-ink placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
        />
        <input
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
          placeholder="Phone"
          aria-label="Phone"
          className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-ink placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="h-11 w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
      >
        {submitted ? "We'll notify you!" : buttonLabel}
      </button>
    </form>
  );
}

export default function ProductActions({
  product,
  statusConfig,
  disabled = false,
  onNotifySubmit,
  onPreOrder,
  onOnOrderRequest,
  onSeeSimilar,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [qty, setQty] = useState(1);

  const config =
    statusConfig ??
    getProductStatusConfig(product?.status, {
      product,
      isComingSoon: product?.isComingSoon,
    });

  const stockQuantity = product?.stockQuantity;
  const maxQty = getMaxOrderQuantity(stockQuantity);

  const isOutOfStock = maxQty === 0;
  const isDisabled = disabled || config.unavailable || isOutOfStock;

  const safeQty = clampOrderQuantity(qty, stockQuantity);

  useEffect(() => {
    setQty((current) => clampOrderQuantity(current, stockQuantity));
  }, [stockQuantity]);

  const dec = () => {
    setQty((current) => clampOrderQuantity(current - 1, stockQuantity));
  };

  const inc = () => {
    setQty((current) => clampOrderQuantity(current + 1, stockQuantity));
  };

  // 1. DISCONTINUED -> single blue CTA ("See HP EliteBook laptops in stock")
  if (config.status === PRODUCT_STATUS.DISCONTINUE) {
    const similarLabel = config.brand
      ? `See ${config.brand} products in stock`
      : "See similar products in stock";

    return (
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => onSeeSimilar?.(product)}
          className="h-11 w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
        >
          {similarLabel}
        </button>
      </div>
    );
  }

  // 2. OUT OF STOCK -> Name/Email/Phone + Notify button (WhatsApp CTA comes below in StatusAction)
  if (config.status === PRODUCT_STATUS.OUT_STOCK) {
    return (
      <div className="space-y-3">
        {/* <NotifyStockForm
          buttonLabel={config.notifyButtonLabel || "Notify me when it is back"}
          onSubmitNotify={(payload) =>
            onNotifySubmit?.({ ...payload, product, status: config.status })
          }
        /> */}
      </div>
    );
  }

  // 3. COMING SOON -> Name/Email/Phone + Notify button + Pre-order now (gold)
  if (config.status === PRODUCT_STATUS.COMING_SOON) {
    return (
      <div className="space-y-3">
        {/* <NotifyStockForm
          buttonLabel={config.notifyButtonLabel || "Notify me when it arrives"}
          onSubmitNotify={(payload) =>
            onNotifySubmit?.({ ...payload, product, status: config.status })
          }
        /> */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 gap-3">
            <CartButton
              label="Pre order now"
              quantity={safeQty}
              product={product}
              status={config.status}
              disabled={false}
              className="h-12 min-w-0 flex-1 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              btnClassName="!h-12 !rounded-xl !w-full"
            />
          </div>
        </div>

        {/* <button
          type="button"
          onClick={() => onPreOrder?.(product)}
          className="h-11 w-full cursor-pointer rounded-lg bg-gold px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-gold-600"
        >
          Pre-order now
        </button> */}
      </div>
    );
  }

  // 4. ON ORDER -> "Place on-order request" (outline) + "Bargain" (blue)
  if (config.status === PRODUCT_STATUS.ON_ORDER) {
    return (
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 gap-3">
          <CartButton
            label="Place on order request"
            quantity={safeQty}
            product={product}
            status={config.status}
            disabled={false}
            className="h-12 min-w-0 flex-1 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            btnClassName="!h-12 !rounded-xl !w-full"
          />
        </div>

        <div className="flex h-12 flex-1 rounded-xl lg:flex-grow-0 xl:flex-1">
          <button
            type="button"
            disabled={isDisabled}
            onClick={() => setOpenDialog(true)}
            className={`w-full cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isDisabled
                ? "bg-primary/50 hover:cursor-not-allowed hover:bg-primary/50"
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
  }

  // 5. IN STOCK (default) -> Qty + Add to cart + Bargain
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="flex flex-1 gap-3">
        <div
          className="inline-flex h-12 w-full flex-1 items-center justify-between rounded-xl border border-light-100 bg-white sm:w-32"
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

        <CartButton
          quantity={safeQty}
          product={product}
          status={config.status}
          disabled={isDisabled}
          className="h-12 min-w-0 flex-1 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          btnClassName="!h-12 !rounded-xl !w-full"
        />
      </div>

      <div className="flex h-12 flex-1 rounded-xl lg:flex-grow-0 xl:flex-1">
        <button
          type="button"
          disabled={isDisabled}
          onClick={() => setOpenDialog(true)}
          className={`w-full cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
            isDisabled
              ? "bg-primary/50 hover:cursor-not-allowed hover:bg-primary/50"
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
}
