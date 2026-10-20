"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  X,
  ChevronDown,
  Tag,
  BriefcaseBusiness,
  MapPin,
  MessageCircle,
  LogOut,
  LoaderCircle,
} from "lucide-react";
import { getCategoryHref, getSubCategoryHref } from "@/lib/utils";
import { supportLinks, whyLinks } from "./nav-config";

const linkCls =
  "flex items-center gap-3 rounded-lg px-3 py-3 font-semibold active:bg-slate-100";

/* MOBILE — slide-in side drawer (hamburger se khulta hai) */
export default function MobileDrawer({
  open,
  onClose,
  sortedCategories,
  user,
  isMount,
  isUserLoading,
  onLogout,
}) {
  const [shopOpen, setShopOpen] = useState(false);
  const [openCat, setOpenCat] = useState(null);
  const [supportOpen, setSupportOpen] = useState(false);
  const [whyOpen, setWhyOpen] = useState(false);

  // Drawer khula ho to background scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[70] md:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        className={`absolute left-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white text-ink shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between bg-primary px-4 text-white">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-1 text-xl font-extrabold"
          >
            WEGOT
            <Tag size={24} strokeWidth={3} className="fill-gold text-gold" />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-2 active:bg-white/10"
          >
            <X size={24} />
          </button>
        </div>

        {isMount && user?.role && (
          <div className="border-b px-4 py-3 text-sm">
            <span className="text-faint">Signed in as </span>
            <span className="font-semibold capitalize">
              {user?.firstName} {user?.lastName}
            </span>
          </div>
        )}

        <div className="flex-1 space-y-1 overflow-y-auto p-3 pb-6">
          {/* Shop by category */}
          <button
            onClick={() => setShopOpen(!shopOpen)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-3 font-semibold active:bg-slate-100"
          >
            Shop by category
            <ChevronDown
              size={18}
              className={`transition-transform ${shopOpen ? "rotate-180" : ""}`}
            />
          </button>

          {shopOpen && (
            <div className="space-y-1 pl-3">
              {sortedCategories.map((category) => {
                const isOpen = openCat === category.id;
                return (
                  <section key={category.id}>
                    <div className="flex items-center justify-between">
                      <Link
                        href={getCategoryHref(category.name)}
                        onClick={onClose}
                        className="flex-1 py-2.5 text-[15px] font-bold capitalize"
                      >
                        {category.name?.replaceAll("-", " ")}
                      </Link>
                      {category.subCategories?.length > 0 && (
                        <button
                          onClick={() =>
                            setOpenCat(isOpen ? null : category.id)
                          }
                          aria-label={`Toggle ${category.name}`}
                          className="p-2"
                        >
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {isOpen && (
                      <ul className="mb-2 space-y-2 border-l pl-4">
                        {category.subCategories?.slice(0, 7).map((sub) => (
                          <li key={sub.id}>
                            <Link
                              href={getSubCategoryHref(category.name, sub.name)}
                              onClick={onClose}
                              className="block text-sm capitalize text-faint"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                );
              })}

              <Link
                href="/categories"
                onClick={onClose}
                className="block py-2 text-sm font-semibold text-brand"
              >
                View all categories ›
              </Link>
            </div>
          )}

          <Link
            href="/products?tag=deals"
            onClick={onClose}
            className={linkCls}
          >
            Deals
          </Link>
          <Link
            href="/products?tag=refurbished"
            onClick={onClose}
            className={linkCls}
          >
            Refurbished
          </Link>
          <Link href="/instalment-plan" onClick={onClose} className={linkCls}>
            Instalment Plan
          </Link>

          {/* Support & Services */}
          <button
            onClick={() => setSupportOpen(!supportOpen)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-3 font-semibold active:bg-slate-100"
          >
            Support & Services
            <ChevronDown
              size={18}
              className={`transition-transform ${
                supportOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {supportOpen && (
            <div className="space-y-1 pl-6">
              {supportLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="block py-2 text-sm text-faint"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {/* Why Us */}
          <button
            onClick={() => setWhyOpen(!whyOpen)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-3 font-semibold active:bg-slate-100"
          >
            Why Us
            <ChevronDown
              size={18}
              className={`transition-transform ${whyOpen ? "rotate-180" : ""}`}
            />
          </button>
          {whyOpen && (
            <div className="space-y-1 pl-6">
              {whyLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="block py-2 text-sm text-faint"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          <Link
            href="/corporate-procurement"
            onClick={onClose}
            className={linkCls}
          >
            <BriefcaseBusiness size={19} />
            Corporate Procurement
          </Link>
          <Link
            href="/why-us/why-wegot#store"
            onClick={onClose}
            className={linkCls}
          >
            <MapPin size={19} />
            Visit Store
          </Link>

          {isMount && user?.role && (
            <button onClick={onLogout} className={`${linkCls} w-full text-red`}>
              <LogOut size={19} />
              Logout
              {isUserLoading && (
                <LoaderCircle className="size-4 animate-spin" />
              )}
            </button>
          )}
        </div>

        <div className="shrink-0 border-t p-3">
          <Link
            href="/support-services/contact-us"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-full bg-green px-5 py-3 font-semibold text-white"
          >
            <MessageCircle size={18} />
            Shop with Expert
          </Link>
        </div>
      </aside>
    </div>
  );
}
