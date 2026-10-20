import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import PopupContactModal from "@/components/PopupContactModal";
import Reviews from "@/components/Reviews";
import {
  Category,
  HeroBanner,
  ProcessCards,
  ShopConfidence,
} from "@/components";
import { NewArrivalsSkeleton } from "@/components/v2/products";
import { LazyBrandSections } from "@/components/v2/home/lazy-brand-sections";
export const revalidate = 86400; // 1 day

const Featured = dynamic(() => import("@/components/v2/home/offers/featured"));
const NewArrivals = dynamic(
  () => import("@/components/v2/home/offers/new-arrivals"),
);
const Deals = dynamic(() => import("@/components/v2/home/offers/deals"));
const OpenBox = dynamic(() => import("@/components/v2/home/offers/open-box"));
const ComingSoon = dynamic(
  () => import("@/components/v2/home/offers/coming-soon"),
);
const Refurbished = dynamic(
  () => import("@/components/v2/refurbished/Refurbished"),
);

const Home = async () => {
  return (
    <>
      {/* hero banner  */}
      <HeroBanner />
      {/* process cards  */}
      <ProcessCards />
      {/* popup content model for 25 delay in seconds */}
      <PopupContactModal />
      {/* all categories section  */}
      <Category />
      {/* featured production section  */}
      <Suspense fallback={<NewArrivalsSkeleton />}>
        <Featured />
      </Suspense>

      {/* new arrival product section  */}
      <Suspense fallback={<NewArrivalsSkeleton />}>
        <NewArrivals />
      </Suspense>

      {/* eid deals product section  */}
      <Suspense fallback={<NewArrivalsSkeleton />}>
        <Deals />
      </Suspense>

      {/* open box product section  */}
      <Suspense fallback={<NewArrivalsSkeleton />}>
        <OpenBox />
      </Suspense>

      {/* coming soon product section  */}
      <Suspense fallback={<NewArrivalsSkeleton />}>
        <ComingSoon />
      </Suspense>

      {/* refurbished product section  */}
      <Suspense fallback={<NewArrivalsSkeleton />}>
        <Refurbished />
      </Suspense>

      {/* reviews section  */}
      <Reviews />

      {/* shop by brand sections  */}
      {/* <main> */}
      <LazyBrandSections />
      {/* </main> */}
      {/* shop confidence markup  */}
      <ShopConfidence />
    </>
  );
};

export default Home;
