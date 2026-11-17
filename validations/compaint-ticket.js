import * as yup from "yup";

export const complaintSchema = yup.object({
  orderId: yup.string().nullable().optional(),
  complaintType: yup
    .string()
    .required("Complaint type is required"),

  describe: yup
    .string()
    .required("Description is required"),

  image: yup.array().optional(),
});
