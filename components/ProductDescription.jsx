"use client";
import { useState } from "react";

export default function ProductDescription() {
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
    <div className="w-full  md:ml-auto bg-[#D9D9D9] p-4 md:p-10 shadow-sm mt-10">
      <h2 className="text-lg md:text-xl font-semibold mb-3 px-6 md:px-16 lg:px-32">
        Specifications
      </h2>

      <p className="text-black text-sm md:text-base mb-4 px-6 md:px-16 lg:px-32">
        {title}
      </p>

      {/* Table Expand/Collapse */}
      <div className="rounded-lg overflow-x-auto px-6 md:px-16 lg:px-32">
        <table className="w-full text-sm md:text-base">
          <tbody>
            {specs.map((item, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="bg-[#EBEBEB] p-2 md:p-3 text-black w-1/3 rounded-l-lg">
                  {item.label}
                </td>
                <td className="bg-white p-2 md:p-3 text-black  rounded-r-lg">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
