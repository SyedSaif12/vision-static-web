import axiosInstance from "@/lib/axiosInstance";

async function updateUser(id, payload) {
  const response = await axiosInstance.put(`users/${id}`, payload);
  return response.data;
}

async function logoutUser() {
  const response = await axiosInstance.post(`users/logout`);
  return response.data;
}

async function newAddress(payload) {
  const response = await axiosInstance.post(`users/new-address`, payload);
  return response.data;
}

// NOTE: these two paths are new – match them to your backend routes.
async function updateAddress(id, payload) {
  const response = await axiosInstance.put(`users/new-address/${id}`, payload);
  return response.data;
}

async function deleteAddress(id) {
  const response = await axiosInstance.delete(`users/new-address/${id}`);
  return response.data;
}

const userService = {
  updateUser,
  logoutUser,
  newAddress,
  updateAddress,
  deleteAddress,
};

export default userService;
