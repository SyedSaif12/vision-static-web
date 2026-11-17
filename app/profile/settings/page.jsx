"use client";

import { updateUser } from "@/redux/user/userSlice";
import { profileSchema } from "@/validations/accounts";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const COUNTRY = [
  { value: "english", label: "English" },
  { value: "urdu", label: "Urdu" },
  { value: "roman-urdu", label: "Roman Urdu" },
];

const btnGold =
  "inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-primary px-5 py-[15px] font-heading text-[15px] font-bold text-white transition hover:bg-primary-200 disabled:cursor-not-allowed disabled:opacity-60";
const errText = "mt-1.5 text-xs text-red-600";
const label = "mb-2 block font-heading text-[13px] font-semibold text-ink-2";

function Settings() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: data?.firstName ?? "",
      lastName: data?.lastName ?? "",
      phoneNo: data?.phoneNo ?? "",
      email: data?.email ?? "",
      language: data?.language ?? "",
    },
  });

  useEffect(() => {
    reset({
      firstName: data?.firstName ?? "",
      lastName: data?.lastName ?? "",
      phoneNo: data?.phoneNo ?? "",
      email: data?.email ?? "",
      language: data?.language ?? "",
    });
  }, [data?.role, reset]);

  const onSubmit = async (payload) => {
    setIsSaving(true);
    try {
      await dispatch(updateUser({ id: data.id, payload })).unwrap();
      toast.success("Profile update!");
    } catch (err) {
      toast.error(
        err?.data?.message ||
          err?.message ||
          "Could not save profile. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="min-h-screen bg-surface py-4 sm:py-6 md:py-8 font-sans text-ink relative">
      <h1 className="mb-2 text-section-title tracking-normal font-bold">
        Profile
      </h1>
      <p className="mb-6 text-body text-muted">Your details and preferences.</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 md:p-6 rounded-2xl drop-shadow-lg"
      >
        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 gap-x-2">
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2"> */}
          <div>
            <label className={`${label} mt-4`}>First Name</label>
            <input
              {...register("firstName")}
              // autoComplete="off"
              placeholder="Enter first name"
              disabled={isSaving}
              className="input border-2 rounded-md py-2 px-4 mb-1 w-full disabled:opacity-60"
            />
            {errors.firstName && (
              <p className={errText}>{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className={`${label} mt-4`}>Last Name</label>
            <input
              {...register("lastName")}
              // autoComplete="off"
              placeholder="Enter last name"
              disabled={isSaving}
              className="input border-2 rounded-md py-2 px-4 mb-1 w-full disabled:opacity-60"
            />
            {errors.lastName && (
              <p className={errText}>{errors.lastName.message}</p>
            )}
          </div>
          {/* Phone */}
          <div>
            <label className={`${label} mt-4`}>Phone</label>
            <input
              // autoComplete="off"
              {...register("phoneNo", {
                onChange: (e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                },
              })}
              placeholder="03001234567"
              maxLength={11}
              disabled={isSaving}
              className="input border-2 rounded-md py-2 px-4 mb-1 w-full disabled:opacity-60"
            />
            {errors.phoneNo && (
              <p className={errText}>{errors.phoneNo.message}</p>
            )}
          </div>
          {/* email */}
          <div>
            <label className={`${label} mt-4`}>Email</label>
            <input
              // autoComplete="off"
              {...register("email")}
              placeholder="john@example.com"
              disabled={isSaving}
              className="input border-2 rounded-md py-2 px-4 mb-1 w-full disabled:opacity-60"
            />
            {errors.email && <p className={errText}>{errors.email.message}</p>}
          </div>
          {/* Country */}
          <div>
            <label className={`${label} mt-4`}>Language</label>
            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <div className="relative w-full">
                  <select
                    {...field}
                    // autoComplete="off"
                    disabled={isSaving}
                    className="appearance-none input border rounded-md py-2 px-4 mb-1 w-full disabled:opacity-60"
                  >
                    <option value="">Select language</option>
                    {COUNTRY.map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                  />
                </div>
              )}
            />
            {errors.country && (
              <p className={errText}>{errors.country.message}</p>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button type="submit" disabled={isSaving} className={btnGold}>
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
          {/* <button type="button" onClick={onSkip} disabled={isSaving} className={btnGhost}>
                        Skip for now
                    </button> */}
        </div>
      </form>
    </section>
  );
}

export default Settings;
