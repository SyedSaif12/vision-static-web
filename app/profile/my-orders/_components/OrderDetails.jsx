"use client";

import Link from "next/link";
import PageLoader from "@/components/v2/loader";
import OrderStatusTimeline from "./OrderStatusTimeline";
import OrderItemsCard from "./OrderItemsCard";
import DeliveryCard from "./DeliveryCard";
import useOrder from "@/hooks/useOrder";
import {
  buildTimeline,
  formatOrderDate,
  getOrderNumber,
  getPaymentLabel,
} from "@/lib/orderStatus";

const PILL = {
  progress: "bg-brand-50 text-primary",
  success: "bg-green/10 text-green",
  failed: "bg-red/10 text-red",
};

export default function OrderDetails({ id }) {
  const { order, isLoading } = useOrder(id);

  if (!order && isLoading) return <PageLoader />;

  if (!order) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-section-title font-bold text-ink">
          Order not found
        </h2>
        <p className="mt-2 text-sm text-muted">
          We could not find this order in your account.
        </p>
        <Link
          href="/profile/my-orders"
          className="mt-4 inline-block text-sm font-semibold text-primary"
        >
          ← Back to orders
        </Link>
      </div>
    );
  }

  const timeline = buildTimeline(order);

  return (
    <div className="min-h-screen space-y-6 bg-surface py-4 font-sans text-ink sm:py-6 md:py-8">
      <div>
        <Link
          href="/profile/my-orders"
          className="text-sm text-muted hover:text-primary"
        >
          ← Back to orders
        </Link>

        <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-section-title font-bold">
              Order {getOrderNumber(order)}
            </h1>
            <p className="mt-1.5 text-sm text-muted">
              Placed {formatOrderDate(order.createdAt)}
              {order.paymentMethod && (
                <> · {getPaymentLabel(order.paymentMethod)}</>
              )}
            </p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-badge font-bold ${PILL[timeline.tone]}`}
          >
            {timeline.currentLabel}
          </span>
        </div>
      </div>

      <OrderStatusTimeline steps={timeline.steps} />
      <OrderItemsCard order={order} />
      <DeliveryCard customer={order.customer} />
    </div>
  );
}
