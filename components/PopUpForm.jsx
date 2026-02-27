"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import EnrollNow from "@/assets/enrollnow.png";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostPopupMutation } from "@/redux/popup/popupSlice";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

// Validation Schema
const popUpSchema = yup.object({
  firstName: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters above."),

  email: yup
    .string()
    .email("Enter a valid email")
    .required("Address is required"),
  isContact: yup
    .boolean("Choose the correct one [ true, false ]")
    .required("IsContact is required."),

  phoneNo: yup
    .string()
    .required("Phone number is required")
    .matches(/^03\d{9}$/, "Phone must be in format 03XXXXXXXXX"),

  interestProducts: yup
    .string()
    .required("Required must be product details")
    .min(3, "First name must be at least 2 characters above."),

  minPrice: yup
    .number("Required number only")
    .required("Minimum price required"),

  maxPrice: yup
    .number("Required number only")
    .required("mMaximum price required"),
});

export default function PopUpForm({ open, setOpen }) {
  const [postPopup, { isLoading, isSuccess, data: currentData }] =
    usePostPopupMutation();
  const formMethods = useForm({
    resolver: yupResolver(popUpSchema),
    defaultValues: {
      isContact: false,
      firstName: "",
      email: "",
      phoneNo: "",
      interestProducts: "",
      minPrice: null,
      maxPrice: null,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = formMethods;

  const onSubmit = async (data) => {
    postPopup(data).unwrap();
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      reset();
      toast.success(
        currentData?.message || "Your details submit successfully.",
        {
          position: "top-right",
          duration: 2000,
        },
      );
    }
  }, [isSuccess, currentData, setOpen]);

  return (
    <div className="w-full max-w-6xl bg-white rounded-2xl relative shadow-lg overflow-hidden flex flex-col lg:flex-row">
      {isLoading && (
        <div className="w-full absolute flex justify-center items-center h-full">
          <LoaderCircle size={80} className="animate-spin text-orange-400" />
        </div>
      )}

      {/* LEFT IMAGE */}
      <div className="w-full lg:w-[40%] h-full">
        <Image
          src={EnrollNow}
          alt="popup image"
          width={600}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="p-10 w-full lg:w-[55%]">
        <h2 className="text-3xl font-bold mb-10">
          Enroll Now for Latest Update
        </h2>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {/* ROW 1 → Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <label className="text-sm font-medium">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  {...register("firstName")}
                  type="text"
                  className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mb-2">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mb-2">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* ROW 2 → Phone + Product */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <label className="text-sm font-medium">
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <input
                  {...register("phoneNo")}
                  type="text"
                  className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
                />
                {errors.phoneNo && (
                  <p className="text-red-500 text-sm mb-2">
                    {errors.phoneNo.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">
                  Which Product Are You Looking?
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("interestProducts")}
                  className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
                />
                {errors.interestProducts && (
                  <p className="text-red-500 text-sm mb-2">
                    {errors.interestProducts.message}
                  </p>
                )}
              </div>
            </div>

            {/* ROW 3 → Min + Max Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <label className="text-sm font-medium">
                  Min Price<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("minPrice")}
                  className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
                />
                {errors.minPrice && (
                  <p className="text-red-500 text-sm mb-2">
                    {errors.minPrice.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">
                  Max Price<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("maxPrice")}
                  className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
                />
                {errors.maxPrice && (
                  <p className="text-red-500 text-sm mb-2">
                    {errors.maxPrice.message}
                  </p>
                )}
              </div>
            </div>

            {/* BUTTON */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-full"
              >
                Submit
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
