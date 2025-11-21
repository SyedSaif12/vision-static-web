"use client";
import { useState } from "react";
import Image from "next/image";

export default function Installments() {
  const [activeBank, setActiveBank] = useState("HBL");
  const [expanded, setExpanded] = useState(true);

  const banks = [
    { id: "HBL", label: "HBL", logo: "/hbl.png" },
    { id: "JS", label: "JS BANK", logo: "/jsbank.png" },
  ];

  const installmentData = [
    { months: "3 Months", amount: "82,161 Per Month" },
    { months: "6 Months", amount: "42,190 Per Month" },
    { months: "12 Months", amount: "22,453 Per Month" },
    { months: "18 Months", amount: "16,002 Per Month" },
  ];

  return (
    <div className="w-full md:w-1/2 md:ml-auto bg-[#E8E8E8] p-6 md:p-10 rounded-3xl shadow-sm mt-10">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Installments From:</h2>

        <div className="flex items-center space-x-4">
          <Image src="/hbl.png" alt="HBL" width={60} height={30} />
          <span className="text-black">|</span>
          <Image src="/jsbank.png" alt="JS Bank" width={90} height={30} />
        </div>
      </div>

      <hr className="my-4 border-black" />

      {/* Bullet Points */}
      <ul className="list-disc ml-6 text-black space-y-1 text-[15px]">
        <li>
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s
        </li>
        <li>
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s
        </li>
      </ul>

      {/* Bank Tabs */}
      <div className="bg-white p-2 rounded-full flex items-center w-full max-w-sm mx-auto mt-6">
        {banks.map((bank) => (
          <button
            key={bank.id}
            onClick={() => setActiveBank(bank.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-sm font-medium transition-all ${
              activeBank === bank.id
                ? "bg-orange-500 text-white shadow-md"
                : "text-black"
            }`}
          >
            <span>{bank.label}</span>
          </button>
        ))}
      </div>

      {/* Installment Table */}
      {expanded && (
        <div className="bg-[#d1d1d1] rounded-3xl p-6 mt-6 shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="text-black border-b">
                <th className="pb-3">Months</th>
                <th className="pb-3">Amount</th>
              </tr>
            </thead>

            <tbody>
              {installmentData.map((row, i) => (
                <tr key={i} className="text-black border-b last:border-none">
                  <td className="py-3">{row.months}</td>
                  <td className="py-3">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Show Less */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 text-sm font-medium flex items-center gap-1"
        >
          {expanded ? "Show Less" : "Show More"}
          <span className="text-lg">{expanded ? "▴" : "▾"}</span>
        </button>
      </div>
    </div>
  );
}
