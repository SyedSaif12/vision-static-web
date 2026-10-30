import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "./add-to-cart-button";
import { BaseImage } from "@/components";
import CartButton from "../../cart/CartButton";

const STOCK_LABEL = {
  in_stock: { text: "In stock", cls: "text-emerald-700" },
  out_of_stock: { text: "Out of stock", cls: "text-red-600" },
  coming_soon: { text: "Coming soon", cls: "text-amber-700" },
};

export function ProductCard({ product, priority = false, tag = {} }) {
  const isTag =
    typeof tag === "object" && tag !== null && Object.keys(tag).length > 0;

  const saving = product?.oldPrice ? product?.oldPrice - product?.price : 0;
  const href = `/products/${product.slug}`;
  const stock = STOCK_LABEL[product.stock];
  const canBuy = product.stock === "in_stock";

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {isTag ? (
        <span
          style={{ backgroundColor: tag.color }}
          className="absolute top-3 right-3 z-10 rounded-md px-2 py-1 text-[11px] font-bold text-white capitalize"
        >
          {tag.name}
        </span>
      ) : product?.tag?.length > 0 ? (
        <span className="absolute top-3 right-3 z-10 rounded-md uppercase bg-primary px-2 py-1 text-[11px] font-bold text-white">
          {product?.tag}
        </span>
      ) : saving > 0 ? (
        <span className="absolute top-3 right-3 z-10 rounded-md bg-red-600 px-2 py-1 text-[11px] font-bold text-white">
          Save {formatPrice(saving)}
        </span>
      ) : null}

      <Link href={href} className="relative block aspect-[4/3] bg-slate-100">
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
            <p className="text-xs font-semibold text-slate-400 capitalize">
              {product?.brand}
            </p>
          )}
          {/* productTitle bohot lamba hota hai -> 2 lines par clamp, full title hover/tooltip me */}
          <h3
            title={product?.name}
            className="mt-0.5 line-clamp-1 text-input font-bold text-slate-900"
          >
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
            {product?.specs.map((s, idx) => (
              <li
                key={s + idx}
                title={s}
                className="max-w-full truncate rounded-md bg-slate-100 px-1 py-0.5 text-xs text-slate-700"
              >
                {s}
              </li>
            ))}
          </ul>
        )}

        {/* <div className="space-y-0.5 text-xs">
          {product?.warranty && (
            <p className="text-slate-600">{product?.warranty}</p>
          )}
          <p className={`font-medium ${stock?.cls}`}>{stock?.text}</p>
        </div> */}
        <div className="mt-auto pt-2">
          {product?.oldPrice || product?.price ? (
            <>
              {product?.oldPrice && (
                <p className="text-xs text-slate-400 line-through">
                  {formatPrice(product?.oldPrice)}
                </p>
              )}
              <p className="text-xl font-bold text-slate-900">
                {formatPrice(product?.price)}
              </p>
            </>
          ) : (
            ""
          )}
        </div>

        <div className="relative flex w-full gap-2 items-center justify-center z-10">
          {product?.oldPrice || product?.price ? (
            // <AddToCartButton productId={product?.id} disabled={!canBuy} />
            <>
              <Link
                className="text-primary border border-primary sm:w-20 px-2 sm:px-4 py-1.5 sm:py-1.5 flex items-center justify-center text-xs sm:text-sm font-bold rounded-full"
                href={href}
              >
                View
              </Link>
              <CartButton
                className="!w-36 !sm:w-40"
                btnClassName={
                  "!bg-primary !px-2 !py-2 !text-xs !sm:px-4 !sm:py-2 !sm:text-sm !text-white !hover:bg-primary-200 !rounded-full"
                }
                product={product}
                disabled={!canBuy}
              />
            </>
          ) : (
            <button
              type="button"
              className="w-full rounded-lg hover:bg-primary hover:text-white px-4 py-2.5 text-sm font-bold text-primary uppercase transition-colors  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              Coming Soon
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
