"use client";
import { useState } from "react";
import Image from "next/image";
import HblBankIcon from "@/assets/hblicon.svg";
import HblBankActiveIcon from "@/assets/hblActive.svg";
import JsBankIcon from "@/assets/jsbankicon.svg";
import BargainDialog from "@/components/BargainDialog";
import { formatPrice } from "@/helper/formatPrice";
import { useFetchedRates } from "@/hooks/useFetchedRates";

const BANK_ASSETS = {
  hbl: {
    label: 'HBL',
    logo: HblBankIcon,
    activeLogo: HblBankActiveIcon
  },
  js: {
    label: 'JS BANK',
    logo: JsBankIcon,
    activeLogo: JsBankIcon
  }
}

export default function Installments({ price }) {

  const response = useFetchedRates()

  const [activeBank, setActiveBank] = useState("hbl");
  const [expanded, setExpanded] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const selectedBankData = response && response?.[activeBank] ? Object.values(response[activeBank]) : [];

  // 🔥 Bargain Dialog State Fix
const installmentData = selectedBankData.map((item) => {
  // Markup calculate karne ka formula: (Price + (Price * Rate/100)) / Months
  const totalWithInterest = price + (price * (item.rates / 100));
  const perMonth = Math.floor(totalWithInterest / item.months);

  return {
    months: `${item.months} Months`,
    amount: `${formatPrice(perMonth)}`,
    interest: item.rates > 0 ? `(${item.rates}% Markup)` : "0% Markup" // Optional
  };
});

  
  return (
    <>
      <div className="w-full bg-[#E8E8E8] p-4 md:p-10 rounded-3xl shadow-sm mt-10">
        {/* Title */}
        <div className="flex items-center justify-between">
          <h2 className="text-base md:text-lg font-semibold">
            Installments From
          </h2>
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
          {
            response && Object.keys(response).map((bankId) => (
              <button
                key={bankId}
                onClick={() => setActiveBank(bankId)}
                className={`flex-1 flex items-center justify-center gap-1 md:gap-2 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${activeBank === bankId
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-black"
                  }`}
              >
                {/* <span>{bank.label}</span> */}
                {activeBank === bankId ? (
                  <Image src={BANK_ASSETS[bankId].activeLogo} alt="HBL" width={50} height={20} />
                ) : (
                  <Image src={BANK_ASSETS[bankId].logo} alt="HBL" width={50} height={20} />
                )}
              </button>
            ))
          }
        </div>

        {/* Installment Table */}
        {expanded && (
          <div className="bg-[#d1d1d1] rounded-3xl p-4 md:p-6 mt-4 md:mt-6 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-[13px] md:text-sm">
              <thead>
                <tr className="text-black border-b">
                  <th className="pb-2 md:pb-3">Months</th>
                  <th className="pb-2 md:pb-3">Amount</th>
                  <th className="pb-2 md:pb-3">Markups</th>
                </tr>
              </thead>

              <tbody>
                {installmentData.map((row, i) => (
                  <tr key={i} className="text-black border-b last:border-none">
                    <td className="py-2 md:py-3">{row.months}</td>
                    <td className="py-2 md:py-3">{row.amount}</td>
                    <td className="py-2 md:py-3">{row.interest}</td>
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
