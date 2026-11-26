'use client'
import React from "react";

import {
  getProductStatusConfig,
  PriceBlock,
  StockBadge,
  TypeBadge,
  WhatsAppCta,
} from "./AllComponents";
import ProductActions from "../ProductActions";
import { normalizeProduct } from "@/lib/utils";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const StatusAction = ({
  product,
  banks,
  showLowStock: externalLowStock,
  remainingStock: externalRemainingStock,
  unavailable: externalUnavailable,
}) => {
  const rawProduct = normalizeProduct(product);
  const router = useRouter()
  const state = getProductStatusConfig(product?.status || rawProduct.stock, {
    product,
    remainingStock: externalRemainingStock,
  });

  const unavailable = externalUnavailable ?? state.unavailable;
  const showLowStock = externalLowStock ?? state.showLowStock;
  const remainingStock = externalRemainingStock ?? state.remainingStock;
  const { colors } = state;

  function handleSimilarProduct(productPayload) {
    router.push(`/products?category=${productPayload.category}&subCategory=${productPayload.brand}`)
  }

  return (
    <div>
      {/* <PriceBlock product={product} banks={banks} /> */}
      <PriceBlock
        product={product}
        banks={banks}
        priceClassName={colors.priceClass}
        priceNote={state.priceNote}
      />
      <div className="mt-3">
        <div className="flex gap-2">
          {" "}
          {rawProduct?.type && <TypeBadge type={rawProduct?.type} />}
          <StockBadge
            status={state.status}
            isComingSoon={state.isComingSoon}
            badgeStyle={{
              bgColor: colors.badgeBg,
              textColor: colors.badgeText,
              borderColor: colors.badgeBorder,
              dotColor: colors.dotColor,
            }}
          />
        </div>
        {showLowStock && (
          <p
            role="status"
            className="mt-2 flex items-center gap-2 text-sm font-semibold text-red-600"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
            </span>
            Only {remainingStock} {remainingStock === 1 ? "item" : "items"} left
            — Order soon!
          </p>
        )}
        {state.noticeTitle && (
          <div
            className={`mt-3 rounded-xl border p-3.5 ${colors.boxBg} ${colors.boxBorder} ${colors.boxText}`}
          >
            <p className="text-sm font-semibold">
              {state.noticeTitle}{" "}
              {!!product?.expectedDate &&
                dayjs(product?.expectedDate).format("MMM DD YYYY")}
            </p>
            {state.noticeDescription && (
              <p className="mt-1 text-xs opacity-85">
                {state.noticeDescription}
              </p>
            )}
          </div>
        )}
      </div>
      <div className="mt-5 space-y-3">
        {state.showWhatsAppCta && state.isOnOrder && (
          <div className="mb-3">
            <WhatsAppCta
              title={product.productTitle}
              label={state.whatsappLabel}
            />
          </div>
        )}
        <ProductActions
          disabled={unavailable}
          statusConfig={state}
          onSeeSimilar={handleSimilarProduct}
          product={{
            id: rawProduct.id,
            slug: rawProduct.slug,
            brand: product?.products?.subCategory?.name,
            category: product?.products?.category?.name,
            name: rawProduct.name,
            specs: rawProduct.specs,
            oldPrice: rawProduct.oldPrice,
            price: rawProduct.price,
            tag: rawProduct.tag,
            warranty: rawProduct.warranty,
            image: rawProduct.image ?? null,
            stockQuantity: rawProduct.stockQuantity ?? null,
          }}
        />
        {state.showWhatsAppCta && !state.isOnOrder && (
          <WhatsAppCta
            title={product.productTitle}
            label={state.whatsappLabel}
          />
        )}
      </div>
    </div>
  );
};

export default StatusAction;
