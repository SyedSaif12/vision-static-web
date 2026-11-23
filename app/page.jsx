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
import ReadyToShop from "@/components/v2/ReadyToShop";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
// import MobileNavRow from "@/components/v2/navbar/MobileNavRow";
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

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

const Home = async () => {
  return (
    <>
      {/* <MobileNavRow /> */}
      {/* hero banner  */}
      <hr className="mt-2.5 md:hidden" />
      <HeroBanner />
      {/* process cards  */}
      <ProcessCards />
      {/* popup content model for 25 delay in seconds */}
      {/* ready to shop section  */}
      <ReadyToShop />
      <PopupContactModal />
      {/* all categories section  */}
      <Category />
      {/* featured production section  */}
      <SectionErrorBoundary>
        <Suspense fallback={<NewArrivalsSkeleton />}>
          <Featured />
        </Suspense>
      </SectionErrorBoundary>

      {/* new arrival product section  */}
      <SectionErrorBoundary>
        <Suspense fallback={<NewArrivalsSkeleton />}>
          <NewArrivals />
        </Suspense>
      </SectionErrorBoundary>

      {/* eid deals product section  */}
      <SectionErrorBoundary>
        <Suspense fallback={<NewArrivalsSkeleton />}>
          <Deals />
        </Suspense>
      </SectionErrorBoundary>

      {/* open box product section  */}
      <SectionErrorBoundary>
        <Suspense fallback={<NewArrivalsSkeleton />}>
          <OpenBox />
        </Suspense>
      </SectionErrorBoundary>

      {/* coming soon product section  */}
      <SectionErrorBoundary>
        <Suspense fallback={<NewArrivalsSkeleton />}>
          <ComingSoon />
        </Suspense>
      </SectionErrorBoundary>

      {/* refurbished product section  */}
      <SectionErrorBoundary>
        <Suspense fallback={<NewArrivalsSkeleton />}>
          <Refurbished />
        </Suspense>
      </SectionErrorBoundary>

      {/* reviews section  */}
      <Reviews />

      {/* shop by brand sections  */}
      {/* <main> */}
      <SectionErrorBoundary>
        <LazyBrandSections />
      </SectionErrorBoundary>
      {/* </main> */}
      {/* shop confidence markup  */}
      <ShopConfidence />
    </>
  );
};

export default Home;
