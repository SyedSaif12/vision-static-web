"use client";
import {
  LayoutGridIcon,
  MessageSquare,
  ShoppingCart,
  MapPin,
  UserRound,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const links = [
  { name: "Overview", href: "/profile/overview", icon: LayoutGridIcon },
  { name: "My Orders", href: "/profile/my-orders", icon: ShoppingCart },
  { name: "Complaints", href: "/profile/complaints", icon: MessageSquare },
  { name: "Addresses", href: "/profile/addresses", icon: MapPin },
  { name: "Profile", href: "/profile/settings", icon: UserRound },
  { name: "Logout", icon: LogOut, isLogout: true },
];

const MainSection = ({ children }) => {
  const { data: user } = useSelector((state) => state.user);
  const [isMount, setIsMount] = useState(false);

  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleLogout() {
    try {
      // Example: backend logout API call
      // await logoutApi();

      // Agar authentication cookie backend se manage ho rahi hai
      // to backend ko cookie clear karni hogi.

      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  if (!isMount) {
    return null;
  }
  return (
    <div className="mx-auto lg:flex lg:items-start lg:gap-4 lg:py-6">
    {/* <div className="mx-auto 2xl:flex 2xl:items-start 2xl:gap-4 2xl:py-6"> */}
      {/* ===== Sidebar / Tab bar ===== */}
      <aside
        className={`
          sticky ${isScrolled ? "top-[105px] md:top-[65px]" : "top-[125px] md:top-[60px]"} z-40
          lg:top-[125px] lg:w-60 2xl:w-72 lg:shrink-0 lg:bg-transparent
        `}
      >
      {/* <aside
        className={`
          sticky ${isScrolled ? "top-[105px] md:top-[65px]" : "top-[125px] md:top-[60px]"} z-40
          2xl:top-[125px] 2xl:w-72 2xl:shrink-0 2xl:bg-transparent
        `}
      > */}
        <nav className="flex flex-col gap-2 p-2 lg:gap-1 lg:py-4">
        {/* <nav className="flex flex-col gap-2 p-2 2xl:gap-1 2xl:p-3"> */}
          {/* Profile card: sirf 2xl par */}
          <div className="hidden flex-col items-center gap-1 rounded-2xl bg-white p-5 drop-shadow-md lg:flex">
          {/* <div className="hidden flex-col items-center gap-1 rounded-2xl bg-white p-5 drop-shadow-md 2xl:flex"> */}
            <div className="flex h-16 w-16 uppercase items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
              {user?.firstName?.slice(0, 1) ?? ""}
              {!user?.lastName
                ? user?.firstName?.slice(1, 2)
                : (user?.lastName?.slice(0, 1) ?? "")}
            </div>
            <p className="font-semibold">
              {user?.firstName ?? ""} {user?.lastName ?? ""}
            </p>
            <p className="text-sm text-gray-500">
              {!user?.phoneNo ? user?.email : (user?.phoneNo ?? "")}
            </p>
          </div>

          <div className="flex w-full justify-between rounded-2xl bg-white p-2 drop-shadow-md lg:flex-col">
          {/* <div className="flex w-full justify-between rounded-2xl bg-white p-2 drop-shadow-md 2xl:flex-col"> */}
            {links.map((item) => {
              const isActive =
                (!item.isLogout && pathname === item.href) ||
                pathname.startsWith(item.href);

              const Icon = item.icon;

              const className = `
    flex shrink-0 items-center gap-3 whitespace-nowrap rounded-xl
    px-4 py-3 text-[13.5px] font-semibold
    ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}
  `;

              if (item.isLogout) {
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={handleLogout}
                    className={`${className} text-red hover:bg-red-50`}
                  >
                    <Icon className="h-3 w-3 xs:h-4 xs:w-4" />
                    <span className="hidden md:block">{item.name}</span>
                  </button>
                );
              }

              return (
                <Link key={item.name} href={item.href} className={className}>
                  <Icon className="h-3 w-3 xs:h-4 xs:w-4" />
                  <span className="hidden md:block">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* ===== Main content ===== */}
      <main className="min-w-0 flex-1 pt-6 lg:px-0 lg:pt-0">
      {/* <main className="min-w-0 flex-1 pt-6 2xl:px-0 2xl:pt-0"> */}
        {children}
      </main>
    </div>
  );
};

export default MainSection;
