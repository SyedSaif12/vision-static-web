import { userDummyData } from "@/assets/assets";

export const userService = {
  getUserData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(userDummyData);
      }, 500);
    });
  },
};
