import { getBrandSections } from "@/lib/product-query/fetch-api";
import { BrandSection } from "./brand-section";

export async function BrandSections({ maxProducts }) {
  let sections;
  try {
    sections = await getBrandSections();
  } catch (error) {
    // home page ka ek section fail ho to poora page crash nahi hona chahiye
    console.error("[BrandSections]", error);
    return null;
  }
  if (!sections?.length) return null;

  return (
    <div className="mx-auto w-11/12">
      {sections.map((section) => (
        <BrandSection key={section.id} section={section} maxProducts={maxProducts} />
      ))}
    </div>
  );
}
