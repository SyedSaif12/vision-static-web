"use client";
import { usePostBargainMutation } from "@/redux/bargain/bargainSlice";
import * as Yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { trimPayload } from "@/helper/trimPayload";
import toast from "react-hot-toast";

const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  city: Yup.string().required("City is required"),
  phoneNo: Yup.string().required("Phone is required"),
});

const BargainDialog = ({ open, onClose, id }) => {
  const [submitBargain, { isLoading }] = usePostBargainMutation();

  const formMethods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = formMethods;

  const onSubmit = async (data) => {
    try {
      data.variantsId = id;
      const res = await submitBargain(trimPayload(data)).unwrap();
      toast.success(res.message || "Bargain created sucessfully", {
        position: "top-right",
      });
      formMethods.reset();
      onClose();
    } catch (err) {
      throw new Error("something went wrong!");
    }
  };

  if (!open) return null;

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="fixed inset-0 bg-black/40 z-50 px-4 overflow-y-auto flex justify-center items-center">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
              onClick={onClose}
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">
              Bargain on Price
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              At VisionTech we challenge all the websites for the lowest price.
              We can ensure that we don't just meet the price but beat it for
              you. So go on right ahead, let us know the details and give us
              some hours. We'll get you a better rate and great price overall!
              Happy challenging! Love, VisionTech.
            </p>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm mb-1">Name</label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Enter Name"
                  className="w-full bg-gray-100 rounded-full px-5 py-3 text-gray-500 outline-none"
                />
                <p className="text-red-600">{errors.name?.message}</p>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm mb-1">
                  Enter Email
                </label>
                <input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  name="email"
                  {...register("email")}
                  className="w-full bg-gray-100 rounded-full px-5 py-3 text-gray-600 outline-none"
                />
                <p className="text-red-600">{errors.email?.message}</p>
              </div>

              {/* City */}
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm mb-1">City</label>
                <select
                  {...register("city")}
                  className="w-full bg-gray-100 rounded-full px-5 py-3
                text-gray-500 outline-none"
                >
                  <option value="">Select city</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                </select>
                <p className="text-red-600">{errors.city?.message}</p>
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Enter phone number (Format 0332-2861735)"
                  name="phoneNo"
                  {...register("phoneNo")}
                  className="w-full bg-gray-100 rounded-full px-5 py-3 text-gray-500 outline-none"
                />
                <p className="text-red-600">{errors.phoneNo?.message}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-10">
              <button
                onClick={onClose}
                className="px-6 py-2 md:px-10 md:py-3 rounded-full border border-blue-500 text-blue-600 font-medium hover:bg-blue-50 transition"
              >
                Cancel
              </button>

              <button
                className="px-6 py-2 md:px-10 md:py-3 rounded-full bg-blue-700 text-white font-medium hover:bg-blue-800 transition"
                isLoading={isLoading}
                type="submit"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default BargainDialog;
