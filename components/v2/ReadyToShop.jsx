import Link from "next/link";
import { ShieldCheck, Banknote, MapPin, RotateCcw } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "100% authentic",
    description: "Official or WeGot warranty",
  },
  {
    icon: Banknote,
    title: "Cash on delivery",
    description: "Or online and bank transfer",
  },
  {
    icon: MapPin,
    title: "Physical Store",
    description: "Clifton, Karachi · in person",
  },
  {
    icon: RotateCcw,
    title: "Easy returns",
    description: "Simple returns and repair",
  },
];

export default function ReadyToShop() {
  return (
    <section className="w-full border-y border-[#e5eaf4]">
      {/* CTA Section */}
      <div className="bg-[#f6f9ff] border-b border-[#e5eaf4] px-5 py-9 md:py-9">
        <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:gap-6">
          <div className="text-center">
            <h2 className="text-[22px] font-bold leading-7 text-[#17213b]">
              Ready to shop?
            </h2>

            <p className="mt-2 text-[14px] leading-6 text-[#64748b]">
              Browse the full range, all genuine and warranted.
            </p>
          </div>

          <Link
            href="/categories"
            className="inline-flex h-[48px] min-w-[106px] items-center justify-center rounded-xl bg-[#ffcf24] px-[22px] py-[13px] text-[15px] font-bold text-[#111827] shadow-[0_8px_20px_rgba(255,207,36,0.25)] transition hover:bg-[#f5c20c]"
          >
            Shop now
          </Link>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mx-auto grid w-full grid-cols-2 md:grid-cols-4">
        {benefits.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`
                flex flex-col justify-center gap-3
                px-4 py-5 md:flex-row md:items-center md:gap-4
                md:px-8 md:py-8 lg:px-12
                ${index % 2 === 0 ? "border-r" : ""}
                ${index < 2 ? "border-b md:border-b-0" : ""}
                ${index !== 3 ? "md:border-r" : "md:border-r-0"}
                border-[#edf0f7]
              `}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#eef3ff] md:h-[50px] md:w-[50px]">
                <Icon
                  size={18}
                  strokeWidth={2.2}
                  className="text-[#1a56db] md:size-[24px]"
                />
              </div>

              <div>
                <h3 className="text-[13px] font-bold leading-5 md:text-[14px] text-[#17213b]">
                  {item.title}
                </h3>

                <p className="mt-1 text-[11.5px] leading-4 text-[#64748b]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
