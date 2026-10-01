import axiosInstance from "@/lib/axiosInstance";

async function updateUser(id, payload) {
  const response = await axiosInstance.put(`users/${id}`, payload);
  return response.data;
}

async function logoutUser() {
  const response = await axiosInstance.post(`users/logout`);
  return response.data;
}

const userService = {
  updateUser,
  logoutUser,
};

export default userService;
