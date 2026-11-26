"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function BaseLink({
  href,
  active = false,
  className = "",
  loadingClassName = "",
  showChildren = true,
  children,
  ...props
}) {
  const [clicked, setClicked] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setClicked(false);
  }, [pathname, searchParams]);

  const showLoading = clicked || isPending;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      aria-busy={showLoading || undefined}
      onClick={(e) => {
        if (
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          e.button !== 0
        ) {
          return;
        }
        setClicked(true);
        startTransition(() => {});
      }}
      //   className={`${className} relative inline-flex items-center justify-center gap-2 ${
      //     showLoading ? "pointer-events-none opacity-85" : ""
      //   }`}
      className={`${className} relative inline-flex items-center justify-center gap-2 ${
        showLoading ? `pointer-events-none ${loadingClassName}` : ""
      }`}
      {...props}
    >
      {showLoading && (
        <span
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {(!showLoading || showChildren) && children}
    </Link>
  );
}
