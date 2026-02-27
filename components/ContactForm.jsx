"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import CallIcon from "@/assets/callicon.png";
import LocationIcon from "@/assets/locationicon.png";
import TwitterIcon from "@/assets/twitericon.svg";
import InstaIcon from "@/assets/instawhiteicon.svg";
import DiscordIcon from "@/assets/discordicon.svg";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircleAlert } from "lucide-react";
import { usePostPopupMutation } from "@/redux/popup/popupSlice";
import toast from "react-hot-toast";
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

export default function ContactForm() {
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

  const onSubmit = async (data) => {
    postContact(data).unwrap();
  };

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

  return (
    <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
      {/* LEFT PANEL */}
      <div className="bg-[#0A1A54] text-white p-10 relative w-full lg:w-[40%]">
        <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
        <p className="text-sm mb-10">Say something to start a live chat!</p>

        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <Image src={CallIcon} alt="phone" className="w-6 h-6" />
            {/* <p>(00) 1234 5678</p> */}
            <span>03312405800</span>
            <span>03260220581</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xl">✉️</span>
            <p>contact@visiontechpk.com</p>
          </div>

          <div className="flex items-start gap-4">
            <Image src={LocationIcon} alt="location" className="w-6 h-6" />
            <p>
              Shop# 29, Ground Floor, SAASI Arcade, Block-7, Clifton Near Sohny
              Sweets, Karachi, Pakistan.
            </p>
          </div>
        </div>

        <div className="flex gap-5 mt-10 lg:absolute lg:bottom-10 lg:left-10">
          <Image
            src={TwitterIcon}
            alt="twitter"
            className="w-6 h-6 cursor-pointer"
          />
          <Image
            src={InstaIcon}
            alt="instagram"
            className="w-6 h-6 cursor-pointer"
          />
          <Image
            src={DiscordIcon}
            alt="discord"
            className="w-6 h-6 cursor-pointer"
          />
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="p-10 w-full lg:w-[70%]">
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
                      <CircleAlert size={13} className="text-yellow-600" />
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

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-full"
              >
                Send Message
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
