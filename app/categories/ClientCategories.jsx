import { formatName, getCategoryHref, getSubCategoryHref } from "@/lib/utils";
import React from "react";
import Link from "next/link";

const ClientCategories = ({ category }) => {
  return (
    <article
      className="
        mb-5
        break-inside-avoid
        overflow-hidden
        rounded-2xl
        border
        border-light-100
        bg-background
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      {/* Category Heading */}
      <div className="px-5 pt-5">
        <Link
          href={getCategoryHref(category.name)}
          className="
            inline-block
            text-xl
            font-semibold
            text-ink
            transition-colors
            duration-200
            hover:text-brand
          "
        >
          {formatName(category.name)}
        </Link>

        {/* Divider */}
        <div className="mt-4 h-px w-full bg-light-100" />
      </div>

      {/* Sub Categories */}
      <div className="px-3 pb-4 pt-3">
        {category.subCategories?.map((subCategory) => (
          <Link
            key={subCategory.id}
            href={getSubCategoryHref(category.name, subCategory.name)}
            className="
              group
              flex
              items-center
              rounded-lg
              px-2
              py-2
              text-base
              font-medium
              text-muted
              transition-all
              duration-200
              ease-out

              hover:bg-brand-25
              hover:text-brand
            "
          >
            <span
              className="
                transition-transform
                duration-200
                ease-out
                group-hover:translate-x-1
              "
            >
              {formatName(subCategory.name)}
            </span>
          </Link>
        ))}
      </div>
    </article>
  );
};

export default ClientCategories;
