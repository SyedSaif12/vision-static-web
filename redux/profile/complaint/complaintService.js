import axiosInstance from "@/lib/axiosInstance";
import { uploadImage } from "@/redux/utils/media-upload";

export const complaintService = {
    async createTicket(payload) {
        const newImages = payload?.image?.filter((img) => img instanceof File);

        if (newImages && newImages.length) {
            payload.image = [
                ...payload?.image?.filter((img) => !(img instanceof File)),
                ...(await uploadImage(payload, 'image')),
            ];
        }
        const response = await axiosInstance.post('complaint/ticket', payload)
        return response.data
    },
    async getAllComplaints(params) {
        const response = await axiosInstance.get(`complaint/ticket`, { params });
        return response.data;
    },
    async getComplaint(id) {
        const response = await axiosInstance.get(`complaint/ticket/${id}`);
        return response.data;
    },
};
