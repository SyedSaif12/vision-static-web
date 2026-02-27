"use client";
import { useState } from "react";
import Image from "next/image";
import HblBankIcon from "@/assets/hblicon.svg";
import HblBankActiveIcon from "@/assets/hblActive.svg";
import JsBankIcon from "@/assets/jsbankicon.svg";
import { assets } from "@/assets/assets";
import BargainDialog from "@/components/BargainDialog";
import { formatPrice } from "@/helper/formatPrice";

export default function Installments({ price }) {
  const [activeBank, setActiveBank] = useState("HBL");
  const [expanded, setExpanded] = useState(true);

  // 🔥 Bargain Dialog State Fix
  const [openDialog, setOpenDialog] = useState(false);

  const banks = [
    {
      id: "HBL",
      label: "HBL",
      logo: HblBankIcon,
      activeLogo: HblBankActiveIcon,
    },
    { id: "JS", label: "JS BANK", logo: JsBankIcon, activeLogo: JsBankIcon },
  ];

  const installmentPlan = [
    {
      months: 3,
    },
    {
      months: 6,
    },
    {
      months: 12,
    },
    {
      months: 18,
    },
  ];

  const installmentData = installmentPlan.map((item) => ({
    months: `${item.months} Months`,
    amount: `${formatPrice(Math.floor(price / item.months))} Per Month`,
  }));

  return (
    <>
      <div className="w-full bg-[#E8E8E8] p-4 md:p-10 rounded-3xl shadow-sm mt-10">
        {/* Title */}
        <div className="flex items-center justify-between">
          <h2 className="text-base md:text-lg font-semibold">
            Installments From:
          </h2>

          <div className="flex items-center space-x-2 md:space-x-4">
            <Image src={HblBankIcon} alt="HBL" width={50} height={20} />
            <span className="text-black">|</span>
            <Image src={JsBankIcon} alt="JS Bank" width={60} height={20} />
          </div>
        </div>

        <hr className="my-3 md:my-4 border-black" />

        {/* Bullet Points */}
        <ul className="list-disc ml-4 md:ml-6 text-black space-y-1 text-[13px] md:text-[15px]">
          <li>
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s
          </li>
          <li>
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s
          </li>
        </ul>

        {/* Bank Tabs */}
        <div className="bg-white p-1 md:p-2 rounded-full flex items-center w-full max-w-sm mx-auto mt-4 md:mt-6">
          {banks.map((bank) => (
            <button
              key={bank.id}
              onClick={() => setActiveBank(bank.id)}
              className={`flex-1 flex items-center justify-center gap-1 md:gap-2 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                activeBank === bank.id
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-black"
              }`}
            >
              {/* <span>{bank.label}</span> */}
              {activeBank === bank.id ? (
                <Image src={bank.activeLogo} alt="HBL" width={50} height={20} />
              ) : (
                <Image src={bank.logo} alt="HBL" width={50} height={20} />
              )}
            </button>
          ))}
        </div>

        {/* Installment Table */}
        {expanded && (
          <div className="bg-[#d1d1d1] rounded-3xl p-4 md:p-6 mt-4 md:mt-6 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-[13px] md:text-sm">
              <thead>
                <tr className="text-black border-b">
                  <th className="pb-2 md:pb-3">Months</th>
                  <th className="pb-2 md:pb-3">Amount</th>
                </tr>
              </thead>

              <tbody>
                {installmentData.map((row, i) => (
                  <tr key={i} className="text-black border-b last:border-none">
                    <td className="py-2 md:py-3">{row.months}</td>
                    <td className="py-2 md:py-3">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Show Less */}
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

      {/* Bargain Dialog Render */}
      <BargainDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </>
  );
}
