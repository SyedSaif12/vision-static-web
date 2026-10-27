import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { BaseImage } from "@/components";
import { formatPrice } from "@/lib/utils";
import { MAX_ITEM_QTY, ROUTES } from "../lib/constants";
import { getUnitPrice } from "../lib/pricing";

const qtyButton =
  "flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40";

export default function OrderSummaryItem({ item, onRemove, onQuantity }) {
  const title = item.productTitle || "Product";

  return (
    <li className="flex gap-3">
      <div className="relative shrink-0">
        <BaseImage
          src={item.image}
          alt={title}
          fit="cover"
          className="h-16 w-16 rounded-xl"
        />
        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-gray-900 px-1 text-xs font-bold text-white">
          {item.qty}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <Link
          href={ROUTES.product(item.slug)}
          className="line-clamp-2 text-sm font-semibold text-gray-900 hover:text-blue-700 hover:underline"
        >
          {title}
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            className={qtyButton}
            disabled={item.qty <= 1}
            onClick={() => onQuantity(item.id, -1)}
            aria-label={`Decrease quantity of ${title}`}
          >
            <Minus size={14} aria-hidden="true" />
          </button>
          <span className="min-w-[1.25rem] text-center text-sm" aria-live="polite">
            {item.qty}
          </span>
          <button
            type="button"
            className={qtyButton}
            disabled={item.qty >= MAX_ITEM_QTY}
            onClick={() => onQuantity(item.id, 1)}
            aria-label={`Increase quantity of ${title}`}
          >
            <Plus size={14} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${title} from cart`}
            className="ml-1 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-600"
          >
            <Trash2 size={15} aria-hidden="true" />
          </button>
        </div>
      </div>

      <p className="shrink-0 text-sm font-semibold text-gray-900">
        {formatPrice(getUnitPrice(item) * item.qty)}
      </p>
    </li>
  );
}
