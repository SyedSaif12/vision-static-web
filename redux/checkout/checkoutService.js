import axiosInstance from "@/lib/axiosInstance";

async function placeOrder(payload) {
  const response = await axiosInstance.post(`orders`, payload);
  return response.data;
}

async function getorders(params) {
  const response = await axiosInstance.get(`orders`, {
    params
  });
  return response.data;
}

async function getorder(id) {
  const response = await axiosInstance.post(`orders/${id}`);
  return response.data;
}

const orderService = {
  placeOrder,
  getorders,
  getorder
};

export default orderService;
