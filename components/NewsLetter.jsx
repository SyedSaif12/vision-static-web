"use client";
import React from "react";
import Image from "next/image";
import { Headset, PackageSearch, ScanFace, Truck } from "lucide-react";

const NewsLetter = (props) => {
  const features = [
    {
      title: "Transparent Buying Process",
      description: "Video Before Dispatch",
      icon: <PackageSearch size={40} className="text-white" />,
    },
    {
      title: "Authenticity Guaranteed",
      description: "Original Products Only",
      icon: <ScanFace size={40} className="text-white" />,
    },
    {
      title: "Support After Delivery",
      description: "We're Here When You Need Us.",
      icon: <Headset size={40} className="text-white" />,
    },
    {
      title: "Safe Delivery",
      description: "Right To Your Doorstep.",
      icon: <Truck size={40} className="text-white" />,
    },
  ];

  return (
    <div {...props}>
      <section className="w-full bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-6 flex justify-center">
                  {feature.icon ? (
                    <div className="size-20 rounded-full bg-blue-600 flex justify-center items-center">
                      {feature.icon}
                    </div>
                  ) : (
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  )}
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
