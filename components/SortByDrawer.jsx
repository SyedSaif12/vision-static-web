"use client";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const SORT_OPTIONS = [
  {
    key: "price",
    label: "Price",
    options: [
      { label: "Low to High", order: "asc" },
      { label: "High to Low", order: "desc" },
    ],
  },
  {
    key: "productTitle",
    label: "Name",
    options: [
      { label: "A → Z", order: "asc" },
      { label: "Z → A", order: "desc" },
    ],
  },
];

export default function SortByDrawer({
  sortOpen,
  sortOnClose,
  onApplySort,
  sort,
  setSort,
}) {
  const [openSection, setOpenSection] = useState({
    price: true,
    productTitle: true,
  });

  const [selectedSort, setSelectedSort] = useState(sort);

  useEffect(() => {
    document.body.style.overflow = sortOpen ? "hidden" : "auto";
  }, [sortOpen]);

  const toggle = (key) => {
    setOpenSection((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (orderBy, order) => {
    setSelectedSort({ orderBy, order });
  };

  const applySort = () => {
    setSort(selectedSort);
    onApplySort(selectedSort);
    sortOnClose();
  };

  return (
    <>
      {sortOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[999]"
          onClick={sortOnClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[80%] sm:w-[360px] bg-[#F3F3F3] z-[99999]
        transform transition-transform duration-300
        ${sortOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="bg-[#0A1A54] text-white px-6 py-5 text-center font-semibold">
          Sort By
          <button
            onClick={sortOnClose}
            className="absolute right-6 top-4 text-xl"
          >
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 space-y-4">
          {SORT_OPTIONS.map((section) => (
            <div
              key={section.key}
              className="bg-white rounded-2xl p-4 shadow-sm"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggle(section.key)}
              >
                <p className="font-semibold text-gray-700">{section.label}</p>
                <ChevronDown
                  className={`transition-transform ${
                    openSection[section.key] ? "rotate-0" : "-rotate-90"
                  }`}
                />
              </div>

              {openSection[section.key] && (
                <div className="mt-4 space-y-3">
                  {section.options.map((opt) => (
                    <label
                      key={`${section.key}-${opt.order}`}
                      className="flex justify-between items-center text-sm text-gray-700 cursor-pointer"
                    >
                      {opt.label}
                      <input
                        type="radio"
                        name="sort"
                        checked={
                          selectedSort.orderBy === section.key &&
                          selectedSort.order === opt.order
                        }
                        onChange={() => handleChange(section.key, opt.order)}
                      />
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-white">
          <button
            onClick={applySort}
            disabled={!selectedSort?.orderBy || !selectedSort?.order}
            className={`w-full py-3 rounded-xl font-medium ${
              !selectedSort?.orderBy || !selectedSort?.order
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0A1A54] text-white"
            }`}
          >
            Apply Sort
          </button>
        </div>
      </div>
    </>
  );
}
