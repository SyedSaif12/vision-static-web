import axiosInstance from "@/lib/axiosInstance";

export async function uploadImage(payload, key = 'images') {
  const formData = new FormData();
  payload[key].forEach((file) => {
    formData.append('images', file);
  });

  const uploadImages = await axiosInstance.post(
    `file/upload`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return uploadImages?.data?.imageData || [];
}