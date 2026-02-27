import { useGetAllCardCategoriesMutation } from "@/redux/category/categorySlice";
import { useEffect } from "react";

const cardsConfig = [
  {
    title: "iPads",
    query: { category: "tablets", subCategory: "apple" },
  },
  {
    title: "Used Laptop",
    query: { category: "used-laptop" },
  },
  {
    title: "Gaming Consoles",
    query: { category: "gaming-consoles" },
  },
  {
    title: "Dyson",
    query: { category: "Dyson" },
  },
  {
    title: "Whoop Band",
    query: { category: "whoop-band" },
  },
  {
    title: "Whoop Band",
    query: { category: "whoop-band" },
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
    query: { category: "processor" },
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
    query: { category: "pencil", subCategory: "apple" },
  },
  {
    title: "Apple Watch",
    query: { category: "watches", subCategory: "apple" },
  },
  {
    title: "Amazon Kindle",
    query: { category: "laptops", subCategory: "kindle" },
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
