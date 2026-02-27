"use client";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { formatPrice } from "@/helper/formatPrice";

export default function DrawerFilter({
  data,
  open,
  onClose,
  selectedFilters,
  setSelectedFilters,
  onApplyFilters,
  productCount = 0,
}) {
  const checked = data && Object.entries(data?.filters);

  const [openSection, setOpenSection] = useState({});

  useEffect(() => {
    if (!data?.filters) return;

    const initialState = {};
    data &&
      Object.keys(data?.filters).forEach((key) => {
        initialState[key] = true;
      });

    setOpenSection(initialState);
  }, [data]);

  const toggle = (key) => {
    setOpenSection((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const [tempPrice, setTempPrice] = useState([0, 0]);

  useEffect(() => {
    if (data?.price?.length === 2) {
      setTempPrice(data.price);
    }
  }, [data]);
  const priceMin = data?.price?.[0] ?? 700; // fallback
  const priceMax = data?.price?.[1] ?? 2100;

  const handleCheckbox = (type, value) => {
    setSelectedFilters((prev) => {
      const current = prev[type] || [];
      const exists = current.includes(value);

      return {
        ...prev,
        [type]: exists
          ? current.filter((x) => x !== value) // uncheck
          : [...current, value], // check
      };
    });
  };

  const handlePriceChange = (min, max) => {
    setSelectedFilters((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
      // price: { minPrice: min, maxPrice: max },
    }));
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-[999]"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[80%] sm:w-[360px] bg-[#F3F3F3] z-[99999] shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="bg-[#0A1A54] text-white px-6 py-5 flex justify-between items-center">
          <div className="text-center w-full">
            <p className="font-semibold text-[18px]">Filters</p>
            <p className="text-[12px] opacity-80 -mt-1">
              {productCount} Products Available
            </p>
          </div>
          <button onClick={onClose} className="absolute right-6 text-xl">
            ×
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-150px)] space-y-5 pb-20">
          {checked
            ?.filter(
              (filter) =>
                filter?.[0] &&
                Array.isArray(filter?.[1]) &&
                filter[1].length > 0,
            )
            .map((filter, idx) => {
              return (
                <FilterSection
                  key={idx}
                  title={filter[0]}
                  type={filter[0]}
                  open={openSection[filter[0]]}
                  onToggle={() => toggle(filter[0])}
                  items={filter[1]}
                  selectedFilters={selectedFilters}
                  handleCheckbox={handleCheckbox}
                />
              );
            })}

          {/* PRICE */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggle("price")}
            >
              <p className="font-semibold text-gray-700">Price</p>
              <ChevronDown
                className={`transition-transform ${
                  openSection.price ? "rotate-0" : "-rotate-90"
                }`}
              />
            </div>

            {openSection.price && (
              <div className="mt-4">
                <div className="flex justify-between text-[13px] text-gray-600">
                  <span className="font-semibold">
                    PKR {formatPrice(tempPrice[0])}
                  </span>
                  <span className="font-semibold">
                    PKR {formatPrice(tempPrice[1])}
                  </span>
                </div>

                <input
                  type="range"
                  min={priceMin}
                  max={priceMax}
                  value={tempPrice[0]}
                  onChange={(e) => {
                    const newMin = Math.min(
                      Number(e.target.value),
                      tempPrice[1],
                    );
                    setTempPrice([newMin, tempPrice[1]]);
                    handlePriceChange(newMin, tempPrice[1]);
                  }}
                  className="w-full mt-3"
                />
                <input
                  type="range"
                  min={priceMin}
                  max={priceMax}
                  value={tempPrice[1]}
                  onChange={(e) => {
                    const newMax = Math.max(
                      Number(e.target.value),
                      tempPrice[0],
                    );
                    setTempPrice([tempPrice[0], newMax]);
                    handlePriceChange(tempPrice[0], newMax);
                  }}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 bg-white shadow-inner">
          <button
            onClick={() => {
              onApplyFilters(selectedFilters);
              onClose();
            }}
            disabled={
              !selectedFilters || // selectedFilters empty ya undefined
              Object.values(selectedFilters).every(
                (arr) => !arr || (Array.isArray(arr) && arr.length === 0),
              )
            }
            className={`w-full py-3 rounded-xl font-medium text-[15px] 
    ${
      !selectedFilters ||
      Object.values(selectedFilters).every(
        (arr) => !arr || (Array.isArray(arr) && arr.length === 0),
      )
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-[#0A1A54] text-white"
    }
  `}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}

/* ============ REUSABLE SECTION ============ */
function FilterSection({
  title,
  items,
  type,
  selectedFilters,
  handleCheckbox,
  open,
  onToggle,
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <p className="font-semibold text-gray-700">{title}</p>
        <ChevronDown
          className={`transition-transform ${open ? "rotate-0" : "-rotate-90"}`}
        />
      </div>

      {open && (
        <div className="mt-3 space-y-3">
          {items.map((item, i) => (
            <label key={i} className="flex gap-3 items-center text-gray-700">
              <input
                type="checkbox"
                checked={selectedFilters[type]?.includes(item.label) || false}
                onChange={() => handleCheckbox(type, item.label)}
                className="w-4 h-4 accent-blue-700 rounded"
              />
              <span className="font-semibold">{item.label}</span>({item.count})
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
