"use client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import {
  CheckSquare,
  MessageSquare,
  Laptop,
  ShoppingCart,
  Check,
  ShoppingBag,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { overviewAction } from "@/redux/profile/overview/overviewSlice";
import {
  countOrdersByStatus,
  formatStatusDate,
  getCurrentStatusId,
  recentOrderItems,
} from "@/lib/orderStatus";
import { normalizeProduct } from "@/lib/utils";
import { BaseImage } from "@/components";
import PageLoader from "@/components/v2/loader";
import { getAllTicketsAction } from "@/redux/profile/complaint/complaintSlice";

const EMPTY_ORDERS = [];

export default function OverviewPage() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.data);
  const { data, isLoading } = useSelector((state) => state.overview);
  const { data: complaintList } = useSelector((state) => state.complaint);

  const orders = Array.isArray(data) ? data : EMPTY_ORDERS;
  const complaints = Array.isArray(complaintList) ? complaintList : EMPTY_ORDERS;

  const totalOrders = orders.length;
  const totalComplaints = complaints.length;

  const deliveredOrders = useMemo(
    () => countOrdersByStatus(orders, "delivered"),
    [orders],
  );

  const recentOrders = useMemo(() => recentOrderItems(orders), [orders]);

  const recentOrderCards = useMemo(() => {
    return recentOrders.map((order) => ({
      ...order,

      orderStatus: getCurrentStatusId(order),

      products: (Array.isArray(order?.orderItems) ? order.orderItems : []).map(
        (item) => normalizeProduct(item.productVariants),
      ),
    }));
  }, [recentOrders]);

  useEffect(() => {
    dispatch(overviewAction());
    dispatch(getAllTicketsAction({ paginate: false }))
  }, [dispatch]);

  if (isLoading && !orders.length) {
    return (
      <div>
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface py-4 sm:py-6 md:py-8 font-sans text-ink relative">
      <div className="w-full mx-auto space-y-6">
        {/* Header Subtitle */}
        <div className="space-y-2">
          <h2 className="text-section-title font-bold tracking-normal">
            Assalam O Aliekum, {user?.firstName ?? ""}
          </h2>
          <p className="text-body text-muted">
            Here is what is happening with your account.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 drop-shadow-sm md:grid-cols-3 gap-4">
          {/* Stat 1: Orders placed */}
          <div className="bg-white p-5 rounded-2xl border border-light-100 shadow-sm flex flex-col justify-between h-36">
            <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-brand" />
            </div>
            <div>
              <span className="text-3xl font-semibold text-ink block leading-none">
                {totalOrders ?? 0}
              </span>
              <span className="text-sm text-muted font-medium mt-1 block">
                Orders placed
              </span>
            </div>
          </div>

          {/* Stat 2: Delivered */}
          <div className="bg-white p-5 drop-shadow-sm rounded-2xl border border-light-100 shadow-sm flex flex-col justify-between h-36">
            <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-brand" />
            </div>
            <div>
              <span className="text-3xl font-semibold text-ink block leading-none">
                {deliveredOrders ?? 0}
              </span>
              <span className="text-sm text-muted font-medium mt-1 block">
                Delivered
              </span>
            </div>
          </div>

          {/* Stat 3: Open complaint */}
          <div className="bg-white p-5 drop-shadow-sm rounded-2xl border border-light-100 shadow-sm flex flex-col justify-between h-36">
            <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-brand" />
            </div>
            <div>
              <span className="text-3xl font-semibold text-ink block leading-none">
                {totalComplaints  }
              </span>
              <span className="text-sm text-muted font-medium mt-1 block">
                Open complaint
              </span>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        {
          !recentOrderCards.length ? (
            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-light-100 bg-white px-5 py-10 text-center shadow-sm">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>

              <h3 className="text-lg font-bold text-ink">
                No orders yet
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
                You haven't placed any orders yet. Explore our products
                and find something you love.
              </p>

              <Link
                href="/categories"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-button font-semibold text-white transition-colors hover:bg-brand-600"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-card-title text-ink">Recent orders</h2>
                <Link
                  href={`/profile/my-orders`}
                  className="text-body hover:text-primary text-ink hover:underline"
                >
                  View all
                </Link>
              </div>

              {/* Order Card */}
              {!!recentOrderCards.length &&
                recentOrderCards.map((order) => {
                  const orderStatus = order.orderStatus;
                  const products = order.products;
                  return (
                    <div
                      key={order.id}
                      className="bg-white p-5 drop-shadow-sm sm:p-6 rounded-2xl border border-light-100 space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-light-100 pb-4">
                        <div>
                          <h4 className="text-card-title text-ink">
                            Order{" "}
                            <span className="uppercase">
                              #WG-{new Date().getFullYear()}-{order.id.slice(-6)}
                            </span>
                          </h4>
                          <p className="text-xs text-faint mt-1 font-medium">
                            {formatStatusDate(order.createdAt)}
                          </p>
                        </div>
                        <span className="bg-brand-50 uppercase text-brand font-bold text-badge px-3 py-1 rounded-full">
                          {orderStatus ?? ""}
                        </span>
                      </div>

                      {/* Product Details */}
                      {!!products?.length &&
                        products.map((product, index) => (
                          <div
                            key={
                              product.id ?? product.slug ?? `${order.id}-${index}`
                            }
                            className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4"
                          >
                            <Link
                              href={
                                product.slug ? `/products/${product.slug}` : "/"
                              }
                              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-light p-2 sm:h-28 sm:w-28"
                            >
                              <BaseImage
                                src={product.image}
                                alt={product.alt}
                                fit="contain"
                                className="h-full w-full"
                              />
                            </Link>

                            <div className="min-w-0 flex-1">
                              {product.tag && (
                                <span className="inline-flex  items-center gap-1 rounded-md bg-brand-50 px-2 text-eyebrow font-bold text-primary">
                                  <Check size={12} />
                                  {product.tag}
                                </span>
                              )}
                              <Link
                                href={
                                  product.slug ? `/products/${product.slug}` : "/"
                                }
                                className="block text-base font-extrabold text-ink hover:text-primary"
                              >
                                <span className="line-clamp-1 max-w-sm">
                                  {product.name}
                                </span>{" "}
                              </Link>

                              {product.specs.length > 0 && (
                                <ul className="flex flex-wrap gap-1.5">
                                  {product.specs.map((spec, index) => (
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

                              {product.warranty && (
                                <p className="flex items-center gap-1.5 text-xs leading-5 text-ink-50">
                                  <Check
                                    size={13}
                                    className="shrink-0 text-green"
                                  />
                                  {product.warranty}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 pt-2">
                        <Link
                          href={`/profile/my-orders/${order.id}`}
                          className="bg-brand hover:bg-brand-600 text-white text-button px-5 py-2.5 rounded-xl transition-colors"
                        >
                          View order
                        </Link>
                        <Link
                          href={`/profile/my-orders/${order.id}`}
                          className="bg-white border border-light-100 hover:bg-surface text-ink font-bold text-button px-5 py-2.5 rounded-xl transition-colors"
                        >
                          Track
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          )
        }

      </div>
    </div>
  );
}
