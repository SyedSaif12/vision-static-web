import React from "react";
import ClientCategory from "./ClientCategory";
import { categories } from "../navbar/nav-config";

const Category = () => {
  return (
    <div>
      <ClientCategory categoryData={categories} />
    </div>
  );
};

export default Category;
