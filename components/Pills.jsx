"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function Pills({ data, select, setSelect }) {
  // const isSelected = data?.filter((item) => item.title === select);

  const searchParams = useSearchParams();
  const router = useRouter();

  const titleName = searchParams.get("name");
  const isSelected = select || titleName;

  const handleClick = (selectedData) => {
    setSelect(selectedData.name);

    const params = new URLSearchParams(searchParams.toString());
    params.set("name", selectedData.name);
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-4 place-items-center">
      {Array.isArray(data) &&
        data?.map((item) => (
          <button
            key={item.id.$oid}
            className={`${
              item?.title?.toLowerCase() === isSelected?.toLowerCase()
                ? "hover:cursor-not-allowed"
                : "hover:cursor-pointer"
            } group`}
            disabled={item?.title?.toLowerCase() === isSelected?.toLowerCase()}
            onClick={() => handleClick({ name: item.title, id: item.id })}
          >
            <div
              className={`bg-white group-hover:bg-orange-400 group-hover:border-transparent border-2 sm:border-[3px] ${
                item?.title?.toLowerCase() === isSelected?.toLowerCase()
                  ? "border-orange-400"
                  : "border-gray-300"
              } flex w-40 md:w-72 justify-between p-2 md:p-4 items-center rounded-full`}
            >
              <h1 className="text-blue-700 capitalize truncate whitespace-nowrap text-xs md:text-base group-hover:text-white md:font-semibold">
                {item?.title?.toLowerCase()}
              </h1>
              <div
                className={`w-10 md:w-16 border-[1px] md:border-2 group-hover:border-white group-hover:text-white ${
                  item?.title?.toLowerCase() === isSelected?.toLowerCase()
                    ? "bg-orange-400 border-orange-400 text-white"
                    : "border-gray-400 text-gray-400"
                } rounded-full flex justify-center items-center`}
              >
                <h1 className="text-xs md:text-base md:font-semibold">
                  {item.count}
                </h1>
              </div>
            </div>
          </button>
        ))}
    </div>
  );
}

export function PillsSkeleton({ count = 10 }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-4 place-items-center">
      {Array.from({ length: count }).map((_, idx) => (
        <button className="" key={idx}>
          <div className="bg-white animate-pulse border-[3px] flex w-72 justify-between p-4 items-center rounded-full">
            <h1 className="font-semibold"> </h1>
            <div className="w-16 h-7 border-2 bg-gray-300 rounded-full flex justify-center items-center">
              <h1 className=" font-semibold"> </h1>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
