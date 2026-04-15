import { useGetAllCardCategoriesMutation } from "@/redux/category/categorySlice";
import { useEffect } from "react";

const cardsConfig = [
  {
    title: "iPads",
    query: { category: "tablets", subCategory: "apple" },
  },
  {
    title: "Used Laptop",
    query: { category: "used-laptops" },
  },
  {
    title: "Gaming Consoles",
    query: { category: "gaming-console" },
  },
  {
    title: "Dyson",
    query: { category: "hair-straightener", subCategory: "dyson" },
  },
  {
    title: "Whoop Band",
    query: { category: "electronics", subCategory: "whoop" },
  },
  {
    title: "iPhones",
    query: { category: "mobiles", subCategory: "apple" },
  },
  {
    title: "Gaming Laptops",
    query: { category: "laptops", subCategory: "asus" },
  },
  {
    title: "Processor",
    query: { category: "processors" },
  },
  {
    title: "Monitors",
    query: { category: "led-monitors" },
  },
  {
    title: "Printers",
    query: { category: "printers" },
  },
  {
    title: "Macbook Air",
    query: {
      category: "laptops",
      subCategory: "apple",
      name: "apple macbook air",
    },
  },
  {
    title: "Macbook Pro",
    query: {
      category: "laptops",
      subCategory: "apple",
      name: "apple macbook pro",
    },
  },
  {
    title: "Apple Pencil",
    query: {
      category: "accesories",
      subCategory: "apple",
      name: "apple pencil",
    },
  },
  {
    title: "Apple Watch",
    query: { category: "watches", subCategory: "apple" },
  },
  {
    title: "Amazon Kindle",
    query: { category: "tablets", subCategory: "amazon-kindle" },
  },
];

// create custom hook for fetch all multi-category cards
export function useFetchAllCategoryCards() {
  const [setCards, { isLoading, data }] = useGetAllCardCategoriesMutation();

  useEffect(() => {
    setCards(cardsConfig);
  }, [setCards]);

  return {
    isLoading,
    data,
  };
}
