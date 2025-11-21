"use client";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function DrawerFilter({
  open,
  onClose,
  selectedFilters,
  setSelectedFilters,
  onApplyFilters,
}) {
  const [openSection, setOpenSection] = useState({
    products: true,
    brands: true,
    colors: true,
    price: true,
  });

  const toggle = (key) => {
    setOpenSection((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [tempPrice, setTempPrice] = useState(selectedFilters.price);

  useEffect(() => {
    setTempPrice(selectedFilters.price);
  }, [open]);

  const handleCheckbox = (type, value) => {
    setSelectedFilters((prev) => {
      const exists = prev[type].includes(value);

      return {
        ...prev,
        [type]: exists
          ? prev[type].filter((x) => x !== value)
          : [...prev[type], value],
      };
    });
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[80%] sm:w-[360px] bg-[#F3F3F3] z-50 shadow-xl 
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="bg-[#0A1A54] text-white px-6 py-5 flex justify-between items-center">
          <div className="text-center w-full">
            <p className="font-semibold text-[18px]">Filters</p>
            <p className="text-[12px] opacity-80 -mt-1">
              53 Products Available
            </p>
          </div>
          <button onClick={onClose} className="absolute right-6 text-xl">
            ×
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-150px)] space-y-5 pb-20">
          <FilterSection
            title="Products"
            type="categories"
            open={openSection.products}
            onToggle={() => toggle("products")}
            items={[
              "Laptops",
              "Airbuds",
              "Leds",
              "Mobiles",
              "Processors",
              "Tablets",
              "Computers",
              "Printers",
            ]}
            selected={selectedFilters.categories}
            onSelect={handleCheckbox}
          />

          <FilterSection
            title="Brands"
            type="categories"
            open={openSection.brands}
            onToggle={() => toggle("brands")}
            items={[
              "HP",
              "Samsung",
              "Dell",
              "Lenovo",
              "Apple",
              "Asus",
              "Acer",
              "Sony",
            ]}
            selected={selectedFilters.categories}
            onSelect={handleCheckbox}
          />

          <FilterSection
            title="Colors"
            type="colors"
            open={openSection.colors}
            onToggle={() => toggle("colors")}
            items={["Black", "Silver", "Blue", "Gray", "White"]}
            selected={selectedFilters.colors}
            onSelect={handleCheckbox}
          />

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
                  <span>PKR {tempPrice[0]}</span>
                  <span>PKR {tempPrice[1]}</span>
                </div>

                <input
                  type="range"
                  min="700"
                  max="2100"
                  value={tempPrice[0]}
                  onChange={(e) =>
                    setTempPrice([Number(e.target.value), tempPrice[1]])
                  }
                  className="w-full mt-3"
                />
                <input
                  type="range"
                  min="700"
                  max="2100"
                  value={tempPrice[1]}
                  onChange={(e) =>
                    setTempPrice([tempPrice[0], Number(e.target.value)])
                  }
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 bg-white shadow-inner">
          <button
            onClick={() => {
              setSelectedFilters((prev) => ({
                ...prev,
                price: tempPrice,
              }));
              onApplyFilters();
              onClose();
            }}
            className="w-full bg-[#0A1A54] text-white py-3 rounded-xl font-medium text-[15px]"
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
  selected,
  onSelect,
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
                checked={selected.includes(item)}
                onChange={() => onSelect(type, item)}
                className="w-4 h-4 accent-blue-700 rounded"
              />
              {item}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
