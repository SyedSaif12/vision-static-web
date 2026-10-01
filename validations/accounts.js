import * as yup from "yup";

const PK_PHONE = /^(03\d{9}|92\d{10})$/;

export const phoneSchema = yup.object({
  phone: yup
    .string()
    .required("WhatsApp number is required")
    .transform((v) => (v || "").replace(/\s+/g, ""))
    .matches(PK_PHONE, "Enter it as 03XX XXXXXXX or 92XX XXXXXXX"),
});

export const emailStepSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
});

export const otpSchema = yup.object({
  otp: yup
    .string()
    .required("Enter the 6 digit code")
    .matches(/^\d{6}$/, "Code must be 6 digits"),
});

export const profileSchema = yup.object({
  // country: yup.string(),
  firstName: yup.string().min(2, "First name must be at least 2 characters"),
  lastName: yup.string(),
  // address: yup.string().min(5, "Address must be at least 5 characters"),
  // apartment: yup.string(),
  // city: yup.string(),
  // postalCode: yup
  //     .string()
  //     .test("postal-format", "Postal code must be 5 digits", (v) => !v || /^\d{5}$/.test(v)),
  phoneNo: yup
    .string()
    .test(
      "phone-format",
      "Phone must be in format 03XXXXXXXXX",
      (v) => !v || /^03\d{9}$/.test(v),
    ),
});

export const cardSchema = yup.object({
  cardNumber: yup
    .string()
    .required("Card number is required")
    .transform((v) => (v || "").replace(/\s+/g, ""))
    .matches(/^\d{13,19}$/, "Enter a valid card number"),
  expiry: yup
    .string()
    .required("Expiry is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY"),
  cvc: yup
    .string()
    .required("CVC is required")
    .matches(/^\d{3,4}$/, "Enter a valid CVC"),
});
