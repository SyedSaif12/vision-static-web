"use client";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { usePostPopupMutation } from "@/redux/popup/popupSlice";
import toast from "react-hot-toast";
import {
    CircleAlert,
    LoaderCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

const contactSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .min(3, "Name must be at least 3 characters above."),

  lastName: yup
    .string()
    .required("Last name is required")
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

  selectSubject: yup
    .string()
    .nullable()
    .required("Select the correct one of them"),

  message: yup
    .string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters above."),
});

const Inquiry = [
    {
        id: 1,
        group: "radio-btn",
        title: "Product Inquiry",
        description:
            "Ask about specifications, features, compatibility, or product details before purchasing.",
    },
    {
        id: 2,
        group: "radio-btn",
        title: "Order & Pricing Information",
        description:
            "Check availability, request a quotation, confirm pricing, or ask about payment and delivery options.",
    },
    {
        id: 3,
        group: "radio-btn",
        title: "Technical Support & Guidance",
        description:
            "Get help with upgrades, troubleshooting, setup assistance, or performance-related questions.",
    },
    {
        id: 4,
        group: "radio-btn",
        title: "Corporate / Bulk Orders",
        description:
            "For business purchases, institutional orders, partnerships, or volume pricing discussions.",
    },
    {
        id: 5,
        group: "radio-btn",
        title: "Other",
        description: "For anything that does not fall under the categories above.",
    },
];

export default function ContactPage() {
  const router = useRouter();
  const [postContact, { isLoading, isSuccess, data: currentData }] =
    usePostPopupMutation();

    const formMethods = useForm({
      resolver: yupResolver(contactSchema),
      defaultValues: {
        isContact: true,
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        selectSubject: "",
        message: "",
      },
    });
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = formMethods;

     useEffect(() => {
    if (isSuccess) {
      reset();
      toast.success(
        currentData?.message || "Your details submit successfully.",
        {
          position: "top-right",
          duration: 2000,
        },
      );

      router.push("/");
    }
  }, [isSuccess, currentData]);
  
    const onSubmit = async (payload) => {
      try {
        postContact(payload).unwrap();
      } catch (error) {
        toast.error(
          "Error: something went wrong!",
        {
          position: "top-right",
          duration: 2000,
        },
      ) 
      }
    };


    return (
        <div className="p-10 w-full">
              <FormProvider {...formMethods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm">First Name</label>
                      <input
                        type="text"
                        {...register("firstName")}
                        className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mb-2">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm">Last Name</label>
                      <input
                        type="text"
                        {...register("lastName")}
                        className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mb-2">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm">Email</label>
                      <input
                        type="email"
                        {...register("email")}
                        className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mb-2">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm">Phone Number</label>
                      <input
                        type="text"
                        {...register("phoneNo")}
                        className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
                      />
                      {errors.phoneNo && (
                        <p className="text-red-500 text-sm mb-2">
                          {errors.phoneNo.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold block mb-2">
                      Select Subject?
                    </label>
                    {errors.selectSubject && (
                      <p className="text-red-500 text-sm mb-2">
                        {errors.selectSubject.message}
                      </p>
                    )}
                    <div className="flex flex-col gap-4 text-sm">
                      {Inquiry.map((item, i) => (
                        <label
                          key={item.id}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            value={item.title}
                            {...register("selectSubject")}
                            className="accent-blue-600"
                          />
                          {item.title}

                          <span className="group relative">
                            <CircleAlert
                              size={13}
                              className="text-yellow-600"
                            />
                            <p
                              className="
                                              pointer-events-none
                                              absolute bottom-full mb-2
                                              left-1/2 -translate-x-1/2
                                              w-36 sm:w-60 lg:w-96
                                              opacity-0 scale-95
                                              transition-all duration-200
                                              group-hover:opacity-100 group-hover:scale-100
                                              bg-black text-white text-xs
                                              rounded-md px-3 py-2
                                              shadow-lg z-50"
                            >
                              {item.description}
                            </p>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-300">Message</label>
                    <textarea
                      placeholder="Write your message.."
                      {...register("message")}
                      className="w-full border-b border-gray-300 focus:border-black outline-none py-2 h-24 resize-none"
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mb-2">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <div className="flex">
                    <button
                    disabled={isLoading}
                      type="submit"
                      className={`${isLoading ? 'hover:cursor-not-allowed !bg-primary/70 !hover:bg-primary/70' : 'bg-primary hover:bg-primary-200'} w-full flex justify-center items-center gap-3 text-white font-medium px-8 py-3 rounded-lg`}
                    >
                      <span>Send Message</span>
                      {isLoading && <LoaderCircle size={20} className="animate-spin" />}
                    </button>
                  </div>
                </form>
              </FormProvider>
            </div>
    )
}