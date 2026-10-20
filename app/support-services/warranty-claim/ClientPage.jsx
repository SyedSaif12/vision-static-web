"use client";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
// NOTE: apni warranty API ki mutation yahan lagayen (abhi popup wali use ho rahi hai)
import { useWarrantyClaimMutation } from "@/redux/popup/popupSlice";

const warrantySchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters."),

  phoneNo: yup
    .string()
    .required("Phone number is required")
    .matches(/^03\d{9}$/, "Phone must be in format 03XXXXXXXXX"),

  email: yup.string().trim().email("Enter a valid email").required(),

  billDate: yup.string().trim().required("Bill / purchase date is required"),

  productName: yup.string().trim().required("Product name is required"),

  issue: yup
    .string()
    .trim()
    .required("Please describe the issue")
    .min(10, "Issue must be at least 10 characters."),
});

const inputClass =
  "w-full rounded-lg border border-light-100 bg-white px-3 py-2.5 text-xs text-ink placeholder:text-faint outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10";

const labelClass = "mb-1.5 block text-[11px] font-bold text-ink";

function FieldError({ error }) {
  if (!error) return null;
  return <p className="mt-1 text-xs text-red">{error.message}</p>;
}

export default function WarrantyForm() {
  const [postClaim, { isLoading }] = useWarrantyClaimMutation();

  const formMethods = useForm({
    resolver: yupResolver(warrantySchema),
    defaultValues: {
      fullName: "",
      phoneNo: "",
      email: "",
      billDate: "",
      productName: "",
      issue: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = formMethods;

  const onSubmit = async (payload) => {
    try {
      const res = await postClaim(payload).unwrap();
      toast.success(res?.message || "Your claim has been submitted.", {
        position: "top-right",
        duration: 2000,
      });
      reset();
    } catch (error) {
      toast.error(error?.data?.message || "Error: something went wrong!", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 space-y-4"
        noValidate
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className={labelClass}>
              Your name *
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Full name"
              {...register("fullName")}
              className={inputClass}
            />
            <FieldError error={errors.fullName} />
          </div>

          <div>
            <label htmlFor="phoneNo" className={labelClass}>
              Phone / WhatsApp *
            </label>
            <input
              id="phoneNo"
              type="tel"
              placeholder="03XX XXXXXXX"
              {...register("phoneNo")}
              className={inputClass}
            />
            <FieldError error={errors.phoneNo} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register("email")}
              className={inputClass}
            />
            <FieldError error={errors.email} />
          </div>

          <div>
            <label htmlFor="billDate" className={labelClass}>
              Bill / purchase date *
            </label>
            <input
              id="billDate"
              type="text"
              placeholder="e.g. 12 Aug 2026"
              {...register("billDate")}
              className={inputClass}
            />
            <FieldError error={errors.billDate} />
          </div>
        </div>

        <div>
          <label htmlFor="productName" className={labelClass}>
            Product name *
          </label>
          <input
            id="productName"
            type="text"
            placeholder="e.g. HP Pavilion 14, Dyson V11"
            {...register("productName")}
            className={inputClass}
          />
          <FieldError error={errors.productName} />
        </div>

        <div>
          <label htmlFor="issue" className={labelClass}>
            What is the issue? *
          </label>
          <textarea
            id="issue"
            placeholder="Describe the fault. Attach your bill or invoice photo when our team replies."
            {...register("issue")}
            className={`${inputClass} h-24 resize-y`}
          />
          <FieldError error={errors.issue} />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-gold text-xs font-extrabold text-ink shadow-md shadow-gold/40 transition ${
            isLoading ? "cursor-not-allowed opacity-70" : "hover:bg-gold-600"
          }`}
        >
          <span>Submit claim</span>
          {isLoading && <LoaderCircle size={16} className="animate-spin" />}
        </button>
      </form>
    </FormProvider>
  );
}
