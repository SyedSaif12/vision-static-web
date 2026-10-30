"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  LockKeyhole,
  Truck,
  Video,
  Check,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { BaseImage } from "@/components";
import { formatPrice } from "@/lib/utils";
import {
  getCartAmount,
  removeFromCart,
  updateCartQuantity,
} from "@/redux/cart/cartSlice";

const MAX_ITEM_QTY = 10;
const SHIPPING_FEE = 200;

function CartItem({ item, onRemove, onQuantity }) {
  const title = item.productTitle || item.name || "Product";
  const unitPrice = Number(item.price || item.oldPrice || 0);

  const specifications = useMemo(() => {
    const attributes = item.attributes;

    if (!attributes || typeof attributes !== "object") {
      return [];
    }

    return Object.entries(attributes)
      .filter(
        ([key, value]) =>
          key.toLowerCase() !== "brand" &&
          typeof value === "string" &&
          value.trim(),
      )
      .slice(0, 3)
      .map(([, value]) => value);
  }, [item.attributes]);

  return (
    <article className="rounded-2xl border border-light-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex flex-col md:flex-row items-start gap-3 sm:gap-5">
        {/* LEFT: Image and product details */}
        <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
          <Link
            href={item.slug ? `/products/${item.slug}` : "/"}
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-light p-2 sm:h-28 sm:w-28"
          >
            <BaseImage
              src={item.image}
              alt={title}
              fit="contain"
              className="h-full w-full"
            />
          </Link>

          <div className="min-w-0 flex-1">
            {item.tag && (
              <span className="inline-flex  items-center gap-1 rounded-md bg-brand-50 px-2 text-eyebrow font-bold text-primary">
                <Check size={12} />
                {item.tag}
              </span>
            )}
            <Link
              href={item.slug ? `/products/${item.slug}` : "/"}
              className="block text-base font-extrabold text-ink hover:text-primary"
            >
              <span className="line-clamp-1 max-w-sm">{title}</span>{" "}
            </Link>

            {specifications.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {specifications.map((spec, index) => (
                  <li
                    key={`${spec}-${index}`}
                    title={spec}
                    className="truncate line-clamp-1 max-w-32 rounded-md bg-light px-2 py-1 text-xs text-ink-50"
                  >
                    {spec}
                  </li>
                ))}
              </ul>
            )}

            {item.warranty && (
              <p className="flex items-center gap-1.5 text-xs leading-5 text-ink-50">
                <Check size={13} className="shrink-0 text-green" />
                {item.warranty}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT: Price and action buttons */}
        <div className="flex md:w-[104px] shrink-0 md:flex-col items-center md:items-end gap-3 sm:w-[145px]">
          <p className="text-right text-sm font-extrabold leading-5 text-ink sm:text-lg">
            {formatPrice(unitPrice * item.qty)}
          </p>

          <div className="flex items-center overflow-hidden rounded-lg border border-light-100 bg-white">
            <button
              type="button"
              aria-label={`Decrease ${title} quantity`}
              disabled={item.qty <= 1}
              onClick={() => onQuantity(item.id, -1)}
              className="flex h-8 w-7 items-center justify-center text-ink transition hover:bg-light disabled:cursor-not-allowed disabled:opacity-40 sm:h-9 sm:w-9"
            >
              <Minus size={14} />
            </button>

            <span
              aria-live="polite"
              className="min-w-7 text-center text-sm font-bold text-ink sm:min-w-9"
            >
              {item.qty}
            </span>

            <button
              type="button"
              aria-label={`Increase ${title} quantity`}
              disabled={item.qty >= MAX_ITEM_QTY}
              onClick={() => onQuantity(item.id, 1)}
              className="flex h-8 w-7 items-center justify-center text-ink transition hover:bg-light disabled:cursor-not-allowed disabled:opacity-40 sm:h-9 sm:w-9"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="inline-flex items-center gap-1 text-xs text-muted transition hover:text-red sm:text-sm"
          >
            <Trash2 size={13} />
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}

function OrderSummary({ subtotal, itemCount }) {
  const shipping = itemCount > 0 ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;

  return (
    <aside className="h-fit rounded-2xl border border-light-100 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-6">
      <h2 className="text-lg font-extrabold text-ink">Order summary</h2>

      <div className="mt-5 space-y-4 text-sm">
        <div className="flex items-center justify-between gap-3">
          <span className="text-muted">
            Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>
          <span className="font-bold text-ink">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-muted">Delivery to Karachi</span>
          <span className="font-bold text-ink">{formatPrice(shipping)}</span>
        </div>
      </div>

      <div className="my-5 border-t border-light-100" />

      <div className="flex items-center justify-between gap-3">
        <span className="text-lg font-extrabold text-ink">Total</span>
        <span className="text-xl font-extrabold text-ink">
          {formatPrice(total)}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-muted">
        Pay online, by bank transfer, in installments, or cash on delivery. Your
        final delivery and payment options are handled on the checkout page.
      </p>

      <Link
        href="/checkout"
        aria-disabled={itemCount === 0}
        tabIndex={itemCount === 0 ? -1 : undefined}
        className={`mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-center text-button font-extrabold text-ink shadow-sm transition hover:bg-gold-600 ${
          itemCount === 0 ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <LockKeyhole size={16} />
        Proceed to checkout
      </Link>

      <div className="mt-4 flex gap-3 rounded-xl bg-green/10 p-3 text-sm leading-5 text-green-800">
        <Video size={18} className="mt-0.5 shrink-0" />
        <p>
          We send you a video of your exact unit on WhatsApp before dispatch.
        </p>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs text-muted">We accept</p>
        <div className="flex flex-wrap gap-2">
          {[
            "VISA",
            "Mastercard",
            "Bank transfer",
            "Installments",
            "Cash on delivery",
          ].map((method) => (
            <span
              key={method}
              className="rounded-md border border-light-100 px-2 py-1 text-xs font-semibold text-ink"
            >
              {method}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const subtotal = useSelector(getCartAmount);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const products = useMemo(
    () =>
      Object.entries(cartItems ?? {}).map(([id, item]) => ({
        id,
        ...item.product,
        qty: item.quantity,
      })),
    [cartItems],
  );

  const itemCount = products.reduce((sum, item) => sum + item.qty, 0);

  const changeQuantity = (id, delta) => {
    const current = cartItems?.[id]?.quantity ?? 0;
    const next = current + delta;

    if (next < 1 || next > MAX_ITEM_QTY) return;

    dispatch(updateCartQuantity({ itemId: id, quantity: next }));
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  if (!mounted) {
    return <div className="min-h-[400px] bg-surface" />;
  }

  return (
    <main className="min-h-[60vh] bg-surface py-6 sm:py-8">
      <div className="mx-auto w-[92%] max-w-7xl">
        <nav className="mb-5 text-sm text-muted" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="text-ink">Cart</span>
        </nav>

        <div className="mb-6 flex items-center gap-3">
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
            Your cart
          </h1>
          <span className="text-sm text-muted">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        </div>

        {products.length === 0 ? (
          <section className="rounded-2xl border border-light-100 bg-white px-5 py-14 text-center shadow-sm">
            <h2 className="text-xl font-extrabold text-ink">
              Your cart is empty
            </h2>
            <p className="mt-2 text-sm text-muted">
              Add a product to your cart to continue.
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex rounded-xl bg-primary px-6 py-3 text-button font-bold text-white transition hover:bg-primary-100"
            >
              Continue shopping
            </Link>
          </section>
        ) : (
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_330px] xl:grid-cols-[minmax(0,1fr)_350px]">
            <section className="space-y-4" aria-label="Cart items">
              {products.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeItem}
                  onQuantity={changeQuantity}
                />
              ))}
            </section>

            <OrderSummary
              subtotal={Number(subtotal) || 0}
              itemCount={itemCount}
            />
          </div>
        )}
      </div>
    </main>
  );
}
