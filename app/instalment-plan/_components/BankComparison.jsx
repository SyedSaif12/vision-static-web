import { formatRate } from "@/lib/instalment";
import BankBadge from "./BankBadge";
import SectionHeading from "./SectionHeading";

export default function BankComparison({ banks, months, hasZeroMarkup }) {
  return (
    <section className="bg-surface py-12 md:py-16">
      <div className="mx-auto w-11/12">
        <SectionHeading
          eyebrow="Compare the banks"
          title="What each bank charges"
          subtitle={`Total markup added over the full plan, by tenure. Lower is cheaper.${
            hasZeroMarkup
              ? " Many banks charge nothing on their shortest plan."
              : ""
          }`}
        />

        <div className="mx-auto mt-8 overflow-x-auto rounded-2xl border border-light-100 bg-white shadow-sm">
          <table className="w-full min-w-[32rem] text-sm">
            <caption className="sr-only">
              Bank markup by instalment tenure
            </caption>
            <thead>
              <tr className="border-b border-light-100 text-xs text-muted">
                <th
                  scope="col"
                  className="sticky left-0 bg-white p-4 text-left font-medium"
                >
                  Bank
                </th>
                {months.map((m) => (
                  <th
                    key={m}
                    scope="col"
                    className="p-4 text-right font-medium"
                  >
                    {m} months
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-light-100">
              {banks.map((bank) => (
                <tr key={bank.key}>
                  <th
                    scope="row"
                    className="sticky left-0 bg-white p-4 text-left font-semibold text-ink"
                  >
                    <span className="flex items-center gap-3">
                      <BankBadge code={bank.code} />
                      <span className="whitespace-nowrap">{bank.label}</span>
                      {bank.islamic && (
                        <span className="rounded-full bg-gold-50 px-2 py-0.5 text-xs font-medium text-gold-700">
                          Islamic
                        </span>
                      )}
                    </span>
                  </th>
                  {months.map((m) => {
                    const plan = bank.plans.find((p) => p.months === m);
                    return (
                      <td
                        key={m}
                        className="p-4 text-right font-semibold text-ink"
                      >
                        {!plan ? (
                          <span className="text-faint">—</span>
                        ) : plan.markup === 0 ? (
                          <span className="text-green">Free</span>
                        ) : (
                          formatRate(plan.markup)
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-center text-xs text-faint">
          Rates are provided by the banks and may change. Your bank confirms the
          final plan at checkout.
        </p>
      </div>
    </section>
  );
}
