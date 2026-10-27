import * as yup from "yup";
import { ADDRESS_LABELS } from "./constants";

export const addressSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^03\d{9}$/, "Phone must be in format 03XXXXXXXXX"),
  city: yup.string().required("City is required"),
  area: yup
    .string()
    .trim()
    .required("Area is required")
    .min(2, "Area must be at least 2 characters"),
  fullAddress: yup
    .string()
    .trim()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),
  landmark: yup.string().trim(),
  email: yup.string().trim().email("Enter a valid email address"),
  label: yup.string().oneOf(ADDRESS_LABELS).required(),
  saveForNext: yup.boolean(),
});
