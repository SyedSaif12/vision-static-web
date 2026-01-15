"use client";
import { useState } from "react";

export default function Seocontent() {
  const title =
    "Here is the specifications for Surface Laptop 7 X Elite 13.8 Inches 64GB RAM 1TB SSD Windows 11.";

  const specs = [
    { label: "Details/Processor", value: "Apple M4 Chip" },
    { label: "Details/Installed RAM", value: "16GB" },
    { label: "Details/Screen Size", value: "13.8 Inch" },
    { label: "Details/Operating System", value: "macOS" },
    { label: "Details/Storage Capacity", value: "512GB SSD" },
    {
      label: "Details/Processor Speed",
      value: "10 Core CPU - 4 performance cores",
    },
    { label: "Details/Processor Model", value: "M4 Chip" },
    { label: "Details/Processor Generation", value: "4th Gen" },
    { label: "Details/Chipset", value: "Apple Silicon" },
  ];

  return (
    <div className="w-full  md:ml-auto bg-white p-4 md:p-10 shadow-sm mt-10">
      <h2 className="text-lg md:text-xl font-semibold mb-3 px-6 md:px-16 lg:px-32">
        What is lorem ipsum
      </h2>

      <p className="text-black text-sm md:text-base mb-4 px-6 md:px-16 lg:px-32">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.{" "}
      </p>

      <h2 className="text-lg md:text-xl font-semibold mb-3 px-6 md:px-16 lg:px-32 mt-10">
        What is lorem ipsum
      </h2>

      <p className="text-black text-sm md:text-base mb-4 px-6 md:px-16 lg:px-32">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.{" "}
      </p>
      <h2 className="text-lg md:text-xl font-semibold mb-3 px-6 md:px-16 lg:px-32 mt-10">
        What is lorem ipsum
      </h2>

      <p className="text-black text-sm md:text-base mb-4 px-6 md:px-16 lg:px-32">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.{" "}
      </p>

      <h2 className="text-lg md:text-xl font-semibold mb-3 px-6 md:px-16 lg:px-32 mt-10">
        What is lorem ipsum
      </h2>

      <p className="text-black text-sm md:text-base mb-4 px-6 md:px-16 lg:px-32">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.{" "}
      </p>
    </div>
  );
}
