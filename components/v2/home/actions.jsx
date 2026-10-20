"use server";

import { Suspense } from "react";
import { BrandSections } from "./brand-sections";
import { BrandSectionsSkeleton } from "./skeleton";

export async function loadBrandSections() {
  return (
    <Suspense fallback={<BrandSectionsSkeleton />}>
      <BrandSections />
    </Suspense>
  );
}
