import { formatAddress } from "@/lib/orderStatus";

export default function DeliveryCard({ customer }) {
  if (!customer) return null;

  const name = [customer.firstName, customer.lastName]
    .filter(Boolean)
    .join(" ");
  const line1 = [name, !customer.phoneNo ? customer.email : customer.phoneNo]
    .filter(Boolean)
    .join(" · ");

  return (
    <section className="rounded-2xl border border-light-100 bg-white p-5 shadow-sm sm:p-7">
      <h2 className="text-card-title font-bold text-ink">Delivery address</h2>
      <p className="mt-3 text-button font-medium capitalize text-ink">
        {line1}
      </p>
      <p className="mt-1 text-button capitalize text-muted">
        {formatAddress(customer)}
      </p>
    </section>
  );
}
