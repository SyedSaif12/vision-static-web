"use client";
import { useState } from "react";

export default function ProductDescription() {
  const [expanded, setExpanded] = useState(true);

  const title =
    "Here is the specifications for Surface Laptop 7 x Elite 13.8 Inches 16GB RAM 512GB SSD macOS.";

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
    <div className="w-full md:w-1/2 md:ml-auto bg-[#E8E8E8] p-4 md:p-10 rounded-3xl shadow-sm mt-10">
      <h2 className="text-lg md:text-xl font-semibold mb-3">Description</h2>

      <p className="text-black text-sm md:text-base mb-4">{title}</p>

      {/* Table Expand/Collapse */}
      {expanded && (
        <div className="border rounded-lg overflow-x-auto">
          <table className="w-full text-sm md:text-base">
            <tbody>
              {specs.map((item, index) => (
                <tr
                  key={index}
                  className="bg-[#d1d1d1] border-b last:border-b-0"
                >
                  <td className="p-2 md:p-3 text-black w-1/3">{item.label}</td>
                  <td className="p-2 md:p-3 text-black">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Show More / Show Less Button */}
      <div className="mt-2 md:mt-4 flex justify-center">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 text-xs md:text-sm font-medium flex items-center gap-1"
        >
          {expanded ? "Show Less" : "Show More"}
          <span className="text-lg">{expanded ? "▴" : "▾"}</span>
        </button>
      </div>
    </div>
  );
}
