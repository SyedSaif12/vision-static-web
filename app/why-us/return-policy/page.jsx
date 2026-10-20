import PolicyPage from "@/components/v2/policy-page/PolicyPage";
import { returnPolicy } from "../privacy-policy/policies";

export const metadata = returnPolicy.metadata;

export default function Page() {
  return <PolicyPage data={returnPolicy} stickyTop="7rem" />;
}
