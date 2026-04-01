import {
  fetchChipsAndFilters,
  fetchInitialProductOnServerSide,
} from "@/lib/fetchProducts";
import React from "react";
import ProductsClient from "./_clientComponent/ProductsClient";

export async function generateMetadata({ params, searchParams }) {
  const { mainCategory, subCategory } = await params;
  const { name } = await searchParams;

  const formatText = (str) => {
    if (!str) return "";
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const categoryTitle = formatText(mainCategory);
  const subCategoryTitle = formatText(subCategory);
  const pillTitle = name ? ` - ${formatText(name)}` : "";

  return {
    title: `${subCategoryTitle}${pillTitle} | ${categoryTitle} | price in pakistan`,
    description: `Shop the latest ${subCategoryTitle} ${pillTitle} in Pakistan at Vision Tech. Explore premium ${categoryTitle} products with official warranty and fast shipping.`,
    alternates: {
      canonical: `/${mainCategory}/${subCategory}${name ? `?name=${name}` : ""}`,
    },
  };
}

const page = async ({ params, searchParams }) => {
  const { mainCategory, subCategory } = await params;
  const { name } = await searchParams;

  const [initialData, chipsAndFilters] = await Promise.all([
    fetchInitialProductOnServerSide({
      category: mainCategory,
      subCategory: subCategory,
      name: name,
    }),
    fetchChipsAndFilters({
      category: mainCategory,
      subCategory: subCategory,
    }),
  ]);

  const {
    response,
    category,
    subCategory: subCategoryName,
    name: pillsName,
    page,
    limit,
  } = initialData;

  return (
    <ProductsClient
      initialData={response?.data?.list || []}
      initialTotal={response?.total || 0}
      initialChips={chipsAndFilters?.chips || []}
      initialFilters={chipsAndFilters?.filters}
      initialSelectedPills={pillsName}
      category={category}
      subCategory={subCategoryName}
      page={page}
      limit={limit}
    />
  );
};

export default page;
