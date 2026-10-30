"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getCartCount } from "@/redux/cart/cartSlice";
import { cartToggle, onToggle } from "@/redux/golbal-toggle/globalToggleSlice";
import { logout } from "@/redux/user/userSlice";
import SearchBar from "../products/_components/search-bar";
import DesktopHeader from "./DesktopHeader";
import DesktopNav from "./DesktopNav";
import MobileHeader from "./MobileHeader";
import MobileDrawer from "./MobileDrawer";
import MobileBottomNav from "./MobileBottomNav";
import { getSortedCategories } from "./nav-utils";

export default function ClientNavbar({ categories }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const cartCount = useSelector(getCartCount);
  const { data: user, loading: isUserLoading } = useSelector(
    (state) => state.user,
  );

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMount, setIsMount] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // "shop" | "support" | "why" | "user" | null
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);
  const isHoveringMenu = useRef(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      if (!isHoveringMenu.current) setOpenMenu(null);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => clearTimeout(closeTimer.current);
  }, []);

  // Page change hone par mobile drawer band
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const openHover = (name) => {
    clearTimeout(closeTimer.current);
    isHoveringMenu.current = true;
    setOpenMenu(name);
  };

  const closeHover = () => {
    clearTimeout(closeTimer.current);
    isHoveringMenu.current = false;
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  const handleMobileMenuClose = () => {
    setMobileOpen(false);
    dispatch(onToggle(false));
  };

  const handleMobileMenuOpen = () => {
    setMobileOpen(true);
    dispatch(onToggle(true));
  };

  const closeAll = () => {
    clearTimeout(closeTimer.current);
    isHoveringMenu.current = false;
    setOpenMenu(null);
  };

  const sortedCategories = getSortedCategories(categories);

  const handleLogout = () => dispatch(logout());
  const handleCartOpen = () => {
    router.push("/cart");
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 z-50 text-white bg-primary transition-[top] duration-[50ms] ${
          isScrolled ? "top-0" : "top-[36px]"
        }`}
      >
        {/* DESKTOP / TABLET (md+) — pehle jaisa */}
        <div className="hidden md:block">
          <DesktopHeader
            searchSlot={<SearchBar className="hidden flex-1 md:block" />}
            user={user}
            isMount={isMount}
            isUserLoading={isUserLoading}
            cartCount={cartCount}
            openMenu={openMenu}
            openHover={openHover}
            closeHover={closeHover}
            onLogout={handleLogout}
            onCartClick={handleCartOpen}
          />
          <DesktopNav
            sortedCategories={sortedCategories}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            openHover={openHover}
            closeHover={closeHover}
            closeAll={closeAll}
          />
        </div>

        {/* MOBILE (< md) */}
        <div className="md:hidden">
          <MobileHeader
            searchSlot={<SearchBar placeholder="Search laptops, phones..." />}
            isMount={isMount}
            cartCount={cartCount}
            user={user}
            onMenuClick={handleMobileMenuOpen}
            onCartClick={handleCartOpen}
          />
        </div>
      </header>

      {/* Mobile side drawer */}
      <MobileDrawer
        open={mobileOpen}
        onClose={handleMobileMenuClose}
        sortedCategories={sortedCategories}
        user={user}
        isMount={isMount}
        isUserLoading={isUserLoading}
        onLogout={handleLogout}
      />

      {/* Mobile bottom navigation (hamesha screen ke neeche) */}
      <MobileBottomNav
        isMount={isMount}
        cartCount={cartCount}
        user={user}
        onCartClick={handleCartOpen}
      />

      {/* Fixed navbar ke neeche content na chhupe */}
      <div className="h-[148px] md:h-[125px]" aria-hidden="true" />
    </>
  );
}
