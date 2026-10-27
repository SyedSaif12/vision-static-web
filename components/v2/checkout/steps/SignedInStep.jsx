import StepCard from "../StepCard";
import { formatPhone } from "../lib/format";

export default function SignedInStep({ profile, onNotYou }) {
  const name = `${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`.trim();
  const phone = formatPhone(profile?.phoneNo ?? "");
  const summary = [name, phone].filter(Boolean).join(" • ") || profile?.email;

  return (
    <StepCard
      id="signin"
      number={1}
      title="Signed in"
      status="done"
      summary={summary}
      actionLabel="Not you?"
      onAction={onNotYou}
    />
  );
}
