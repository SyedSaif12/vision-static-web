import axiosInstance from "@/lib/axiosInstance";

export const overviewService = {
  async getAllOrders() {
    const params = {
      paginate: false,
    };
    const response = await axiosInstance.get(`orders`, { params });
    return response.data;
  },
  async getOrder(id) {
    const response = await axiosInstance.get(`orders/${id}`);
    return response.data;
  },
};
