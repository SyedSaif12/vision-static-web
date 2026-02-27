"use client";
import { useState } from "react";

export default function ProductDescription({ description, title }) {
  const specifications = Object.entries(description)?.map(([key, value]) => ({
    label: key.replace(/_/g, " "),
    value,
  }));

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
            {specifications?.map((item, index) => {
              return (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="bg-[#EBEBEB] capitalize p-2 md:p-3 text-black w-1/3 rounded-l-lg">
                    {item.label}
                  </td>
                  <td className="bg-white p-2 md:p-3 capitalize text-black  rounded-r-lg">
                    {item.value}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
