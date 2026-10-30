"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Tag, ShoppingCart, UserRound } from "lucide-react";
import { BOTTOM_NAV_HEIGHT } from "./nav-config";

/* MOBILE (< md) — screen ke bottom par hamesha fixed navigation bar */
export default function MobileBottomNav({
  isMount,
  cartCount,
  user,
  onCartClick,
}) {
  const pathname = usePathname();

  const accountHref =
    isMount && user?.role ? "/accounts/profile" : "/accounts/login";

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  const items = [
    { label: "Home", href: "/", icon: Home },
    { label: "Categories", href: "/categories", icon: LayoutGrid },
    { label: "Deals", href: "/products?tag=deals", icon: Tag },
    { label: "Cart", icon: ShoppingCart, isCart: true },
    { label: "Account", href: accountHref, icon: UserRound },
  ];

  const base =
    "relative flex flex-1 flex-col items-center justify-center gap-0.5 text-menu font-medium transition-colors";

  return (
    <nav
      aria-label="Bottom navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white shadow-[0_-2px_12px_rgba(0,0,0,0.08)] md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex" style={{ height: BOTTOM_NAV_HEIGHT }}>
        {items.map(({ label, href, icon: Icon, isCart }) => {
          const active = !isCart && isActive(href);
          const color = active ? "text-brand" : "text-faint";

          return (
            <li key={label} className="flex flex-1">
              {isCart ? (
                <button
                  onClick={onCartClick}
                  className={`${base} ${color}`}
                  aria-label="Open cart"
                >
                  <span className="relative">
                    <Icon size={20} />
                    <span
                      suppressHydrationWarning
                      className="absolute -right-2.5 -top-2 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-red px-1 text-[11px] font-bold text-white"
                    >
                      {isMount ? cartCount : 0}
                    </span>
                  </span>
                  {label}
                </button>
              ) : (
                <Link
                  href={href}
                  className={`${base} ${color}`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
