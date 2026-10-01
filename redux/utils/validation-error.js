import toast from "react-hot-toast";

export const errorHandler = (error) => {
  const res = error?.response?.data;
  let message = 'Something went wrong';
  if (res?.errors) {
    const fieldErrors = Object.values(res.errors)?.[0];
    message = fieldErrors || res.message || message;
  } else if (res?.message) {
    message = res.message;
  }

  toast.error(message);
  return message;
};
