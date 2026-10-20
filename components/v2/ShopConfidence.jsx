import React from "react";
import { ShieldCheck, CheckCircle2, RotateCcw, MapPin } from "lucide-react";

const features = [
  {
    id: "1",
    icon: ShieldCheck,
    title: "Genuine, or money back",
    description: "Every product authentic, or a full refund.",
  },
  {
    id: "2",
    icon: CheckCircle2,
    title: "Warranty on everything",
    description: "Official or WeGot cover, new and used.",
  },
  {
    id: "3",
    icon: RotateCcw,
    title: "7-day easy returns",
    description: "Simple returns and real repair support.",
  },
  {
    id: "4",
    icon: MapPin,
    title: "Real shop, real people",
    description: "Visit Clifton, or ask an expert any time.",
  },
];

export default function ShopConfidence() {
  return (
    <section className="w-full bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Top Subtitle / Tag */}
        <span className="text-xs font-bold tracking-widest text-primary uppercase">
          OUR PROMISE
        </span>

        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ink mt-2 mb-3">
          Shop with total confidence
        </h2>

        {/* Subtitle Description */}
        <p className="text-xs sm:text-sm md:text-base text-muted max-w-2xl mx-auto mb-12 sm:mb-16">
          We are new, so we do not ask for your trust. We earn it on every
          order.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon Box */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-light-50 rounded-2xl flex items-center justify-center text-primary mb-4 transition-transform group-hover:scale-105">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2]" />
                </div>

                {/* Feature Title */}
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-ink mb-1">
                  {feature.title}
                </h3>

                {/* Feature Description */}
                <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-[240px]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
