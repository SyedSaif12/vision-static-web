"use client";
import React from "react";
import Image from "next/image";
import SupportIcon from "@/assets/Support.svg";
import AccountIcon from "@/assets/Account.svg";
import SavingIcon from "@/assets/Saving.svg";

const NewsLetter = (props) => {
  const features = [
    {
      title: "Product Support",
      description:
        "Up to 3 years on-site warranty available for your peace of mind.",
      image: SupportIcon,
    },
    {
      title: "Personal Account",
      description:
        "With big discounts, free delivery and a dedicated support specialist.",
      image: AccountIcon,
    },
    {
      title: "Amazing Savings",
      description:
        "Up to 70% off new Products, you can be sure of the best price.",
      image: SavingIcon,
    },
  ];

  return (
    <div {...props}>
      <section className="w-full bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-6 flex justify-center">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsLetter;
