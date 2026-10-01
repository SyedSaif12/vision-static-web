"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { StorageKey } from "@/lib/utils";

const PROTECTED_ROUTES = [
  "/checkout",
  "/order-confirmation",
  "/account/orders",
  "/account/profile",
];
const GUEST_ONLY_ROUTES = ["/accounts/login", "/accounts/signup"];

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const storageKeys = StorageKey();

  const [status, setStatus] = useState("checking"); // 'checking' | 'authorized' | 'redirecting'

  useEffect(() => {
    const userCookie = Cookies.get(storageKeys.user);
    let isLoggedIn = false;
    try {
      isLoggedIn = !!(userCookie && JSON.parse(userCookie)?.role);
    } catch {
      isLoggedIn = false;
    }

    const isProtected = PROTECTED_ROUTES.some((route) =>
      pathname.startsWith(route),
    );
    const isGuestOnly = GUEST_ONLY_ROUTES.some((route) =>
      pathname.startsWith(route),
    );

    if (isProtected && !isLoggedIn) {
      setStatus("redirecting");
      router.replace("/accounts/login");
      return;
    }

    if (isGuestOnly && isLoggedIn) {
      setStatus("redirecting");
      router.replace("/checkout");
      return;
    }

    setStatus("authorized");
  }, [pathname, router, storageKeys.tokens]);

  // Sirf un routes par block karein jinka check chal raha hai
  const needsGuard =
    PROTECTED_ROUTES.some((route) => pathname.startsWith(route)) ||
    GUEST_ONLY_ROUTES.some((route) => pathname.startsWith(route));

  if (needsGuard && status !== "authorized") {
    return null; // ya loader
  }

  return <>{children}</>;
}
// 'use client';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Cookies from 'js-cookie';
// import { StorageKey } from '@/lib/utils';

// export default function AuthGuard({ children }) {
//   const router = useRouter();
//   const storageKeys = StorageKey();

//   useEffect(() => {
//     const tokens = JSON.parse(Cookies.get(storageKeys.tokens) || '{}')
//     const user = JSON.parse(Cookies.get(storageKeys.user) || '{}')
//     // console.log(user.role);

//     if (!tokens?.accessToken) {
//       router.push('/accounts/login');
//     }
//   }, [router, storageKeys]);

//   return <>{children}</>;
// }
