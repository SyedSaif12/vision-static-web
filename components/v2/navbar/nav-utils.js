import { excludeCategory, categorySequence } from "./nav-config";

export function getSortedCategories(categories = []) {
  return [...categories]
    .filter((item) => !excludeCategory.includes(item.name.toLowerCase()))
    .sort((a, b) => {
      const indexA = categorySequence.indexOf(a.name.toLowerCase());
      const indexB = categorySequence.indexOf(b.name.toLowerCase());

      // Sequence mein na hone wali categories end mein jayengi
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;

      return indexA - indexB;
    });
}
