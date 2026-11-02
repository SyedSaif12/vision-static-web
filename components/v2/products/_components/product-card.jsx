import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { BaseImage } from "@/components";
import CartButton from "../../cart/CartButton";
import { CursorTooltip } from "./cursor-tooltip";

export function ProductCard({ product, priority = false, tag = {} }) {
  const isTag =
    typeof tag === "object" && tag !== null && Object.keys(tag).length > 0;

  const saving = product?.oldPrice ? product?.oldPrice - product?.price : 0;
  const href = `/products/${product.slug}`;
  const canBuy = product.stock === "in_stock";
  const hasPrice = Boolean(product?.oldPrice || product?.price);

  // Tooltip ka content: poora name + specs
  const tooltipContent = (
    <>
      <p className="font-semibold capitalize">{product?.name}</p>
    </>
  );

  return (
    <CursorTooltip content={tooltipContent} className="h-full">
      <article className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white">
        {/* Badge */}
        {isTag ? (
          <span
            style={{ backgroundColor: tag.color }}
            className="absolute right-3 top-3 z-10 rounded-md px-2 py-0.5 text-[9px] font-bold capitalize text-white sm:py-1 sm:text-[11px]"
          >
            {tag.name}
          </span>
        ) : product?.tag?.length > 0 ? (
          <span className="absolute right-3 top-3 z-10 rounded-md bg-primary px-2 py-0.5 text-[9px] font-bold uppercase text-white sm:py-1 sm:text-[11px]">
            {product.tag}
          </span>
        ) : saving > 0 ? (
          <span className="absolute right-3 top-3 z-10 rounded-md bg-red-600 px-2 py-0.5 text-[9px] font-bold text-white sm:py-1 sm:text-[11px]">
            Save {formatPrice(saving)}
          </span>
        ) : null}

        {/* Image (rounded corners yahan, article par overflow-hidden nahi) */}
        <Link
          href={href}
          className="relative block aspect-[4/4] overflow-hidden rounded-t-2xl bg-slate-100 md:aspect-[4/3]"
        >
          <BaseImage
            src={product?.image}
            alt={product?.alt}
            fit="contain"
            priority={priority}
            sizes="(min-width:1280px) 25vw, (min-width:640px) 40vw, 100vw"
            className="h-full w-full"
            imgClassName="p-6"
            fallbackClassName="h-full w-full"
          />
        </Link>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div>
            {product?.brand && (
              <p className="text-xs font-semibold capitalize text-slate-400">
                {product.brand}
              </p>
            )}

            {/* title attribute nahi, warna browser ka default tooltip bhi aayega */}
            <h3 className="mt-0.5 line-clamp-2 text-input font-bold text-slate-900">
              {/* after:inset-0 => poora card clickable (article relative hai) */}
              <Link
                href={href}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {product?.name}
              </Link>
            </h3>
          </div>

          {product?.specs?.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {product.specs.map((s, idx) => (
                <li
                  key={s + idx}
                  className="max-w-full truncate rounded-md bg-slate-100 px-1 py-0.5 text-note text-slate-700 sm:text-xs"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}

          {/* Price */}
          <div className="mt-auto pt-2">
            {hasPrice && (
              <>
                {product?.oldPrice && (
                  <p className="text-xs text-slate-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </p>
                )}
                <p className="text-button-lg font-bold text-slate-900 md:text-xl">
                  {formatPrice(product?.price)}
                </p>
              </>
            )}
          </div>

          {/* Buttons (z-10 => overlay link ke upar, clickable rahte hain) */}
          <div className="relative z-10 flex w-full items-center justify-center gap-2">
            {hasPrice ? (
              <>
                <Link
                  className="flex items-center justify-center rounded-full border border-primary px-2 py-1.5 text-[10px] font-bold text-primary sm:w-20 sm:px-4 sm:text-xs md:text-sm"
                  href={href}
                >
                  View
                </Link>
                <CartButton
                  className="!w-28 sm:!w-36 md:!w-40"
                  btnClassName="!bg-primary !px-0.5 md:!px-2 py-2 !text-[10px] sm:!text-xs sm:!px-4 sm:!py-2 md:!text-sm !text-white hover:!bg-primary-200 !rounded-full"
                  product={product}
                  disabled={!canBuy}
                />
              </>
            ) : (
              <button
                type="button"
                className="w-full rounded-lg px-4 py-2.5 text-sm font-bold uppercase text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                Coming Soon
              </button>
            )}
          </div>
        </div>
      </article>
    </CursorTooltip>
  );
}