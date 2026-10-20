import PolicyPage from "@/components/v2/policy-page/PolicyPage";
import { privacyPolicy } from "./policies";

export const metadata = privacyPolicy.metadata;

export default function Page() {
  return <PolicyPage data={privacyPolicy} stickyTop="7rem" />;
}