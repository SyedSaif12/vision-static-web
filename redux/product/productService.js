import { productsDummyData } from "@/assets/assets";

export const productsService = {
  getProducts: async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(productsDummyData);
      }, 500);
    });
  },

  getProductById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = productsDummyData.find((item) => item._id === id);
        resolve(product || null);
      }, 500);
    });
  },
};
