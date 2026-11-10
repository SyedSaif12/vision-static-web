"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import BottomSheet from "./BottomSheet";
import useDragScroll from "@/hooks/useDragScroll";
import { mobileNavItems } from "./nav-config";
import ShopSheetContent from "./ShopSheetContent";
import DealsSheetContent from "./DealsSheetContent";
import { useDispatch } from "react-redux";
import { onToggle } from "@/redux/golbal-toggle/globalToggleSlice";
import { APP_EVENTS } from "@/lib/events";
const SHEETS = {
  shop: {
    title: "Shop by category",
    maxHeight: "80dvh",
    Content: ShopSheetContent,
  },
  deals: { title: "Deals", maxHeight: "80dvh", Content: DealsSheetContent },
};

const pill =
  "flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 text-menu font-heading transition-colors";

export default function MobileNavRow() {
  const dispatch = useDispatch();
  const [openSheet, setOpenSheet] = useState(null); // "shop" | "deals" | null
  const { ref, handlers } = useDragScroll();
  const open = (item) => {
    dispatch(onToggle(true));
    setOpenSheet(item.sheet);
  };
  const close = () => {
    dispatch(onToggle(false));
    setOpenSheet(null);
  };

  useEffect(() => {
    const handleOpenDeals = () => {
      open({ sheet: "deals" });
    };

    window.addEventListener(APP_EVENTS.OPEN_DEALS_SHEET, handleOpenDeals);

    return () => {
      window.removeEventListener(APP_EVENTS.OPEN_DEALS_SHEET, handleOpenDeals);
    };
  }, []);

  const active = openSheet ? SHEETS[openSheet] : null;

  return (
    <>
      {/* md:hidden => sirf mobile par show hoga */}
      <div className="relative w-full md:hidden">
        <div
          ref={ref}
          {...handlers}
          className="flex gap-3 overflow-x-auto overscroll-x-contain px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ cursor: "grab", touchAction: "pan-x" }}
        >
          {mobileNavItems.map((item) => {
            const base = `${pill} ${
              item.accent
                ? "border-red-200 bg-red-50 text-red-500"
                : "border-gray-200 bg-white text-slate-900"
            }`;

            if (item.type === "sheet") {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => open(item)}
                  className={base}
                >
                  {item.label}
                  {item.hasArrow && <ChevronDown size={14} />}
                </button>
              );
            }
            return (
              <Link
                key={item.id}
                href={item.href}
                draggable={false}
                className={base}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      <BottomSheet
        open={!!active}
        onClose={close}
        title={active?.title}
        maxHeight={active?.maxHeight}
      >
        {active && <active.Content onNavigate={close} />}
      </BottomSheet>
    </>
  );
}
