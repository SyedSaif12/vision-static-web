import Link from "next/link";
import { Check } from "lucide-react";
import { BaseImage } from "@/components";
import { formatPrice, normalizeProduct } from "@/lib/utils";

const rs = (n) => formatPrice(Math.round(Number(n) || 0), "Rs ");

export default function OrderItemsCard({ order }) {
  const items = Array.isArray(order?.orderItems) ? order.orderItems : [];
  const shipping = Number(order?.shipping) || 0;
  const codFee = Number(order?.codFee) || 0;
  const isCod = order?.paymentMethod === "cod";

  return (
    <section className="rounded-2xl border border-light-100 bg-white p-5 shadow-sm sm:p-7">
      <h2 className="text-card-title font-bold text-ink">Items</h2>

      <ul className="mt-4 divide-y divide-light-100">
        {items.map((item, index) => {
          const product = normalizeProduct(item.productVariants);
          const qty = Number(item.quantity) || 1;
          const href = product.slug ? `/products/${product.slug}` : "/";

          return (
            <li
              key={item.id ?? index}
              className="flex items-start gap-3 py-4 sm:gap-4"
            >
              <Link
                href={href}
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-light p-2 sm:h-24 sm:w-24"
              >
                <BaseImage
                  src={product.image}
                  alt={product.alt}
                  fit="contain"
                  className="h-full w-full"
                />
              </Link>

              <div className="min-w-0 flex-1">
                {/* Title + Price */}
                <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between md:gap-3">
                  <Link
                    href={href}
                    className="min-w-0 text-sm font-extrabold text-ink hover:text-primary sm:text-base"
                  >
                    <span className="line-clamp-2">{product.name}</span>
                  </Link>

                  <div className="shrink-0 text-left md:text-right">
                    <p className="text-sm font-bold text-ink sm:text-base">
                      {rs(item.price * qty)}
                    </p>

                    {qty > 1 && (
                      <p className="mt-0.5 text-xs text-muted">
                        {qty} × {rs(item.price)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Product Specs */}
                {product.specs?.length > 0 && (
                  <ul className="mt-1.5 flex flex-wrap gap-1.5">
                    {product.specs.map((spec, i) => (
                      <li
                        key={`${spec}-${i}`}
                        title={spec}
                        className="line-clamp-1 max-w-32 truncate rounded-md bg-light px-2 py-1 text-xs text-ink-50"
                      >
                        {spec}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Warranty */}
                {product.warranty && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-ink-50">
                    <Check size={13} className="shrink-0 text-green" />
                    {product.warranty}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <dl className="divide-y divide-light-100 border-t border-light-100 text-sm">
        <div className="flex justify-between py-3">
          <dt className="text-muted">Subtotal</dt>
          <dd className="font-semibold text-ink">{rs(order.subTotal)}</dd>
        </div>
        <div className="flex justify-between py-3">
          <dt className="text-muted">Delivery</dt>
          <dd className="font-semibold text-ink">
            {shipping > 0 ? rs(shipping) : "Free"}
          </dd>
        </div>
        {codFee > 0 && (
          <div className="flex justify-between py-3">
            <dt className="text-muted">Cash on delivery fee</dt>
            <dd className="font-semibold text-ink">{rs(codFee)}</dd>
          </div>
        )}
        <div className="flex justify-between pt-3 text-base">
          <dt className="font-bold text-muted">
            Total{isCod ? " (cash on delivery)" : " (Bank Transfer)"}
          </dt>
          <dd className="font-extrabold text-ink">{rs(order.total)}</dd>
        </div>
      </dl>
    </section>
  );
}
