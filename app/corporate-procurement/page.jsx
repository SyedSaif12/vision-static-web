import { createPageMetadata } from "@/lib/seo";
import { CorporateProcurementPage } from "./clientPage";

export const metadata = createPageMetadata({
  title: "Corporate Procurement & Bulk IT Solutions",
  description:
    "Bulk laptops, office hardware, and enterprise IT procurement services across Pakistan from WeGot.",
  path: "/corporate-procurement",
});

const page = () => {
  return <CorporateProcurementPage />;
};

export default page;
