"use client";
import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronDown } from "lucide-react";
import { useFetchCityNameList } from "@/hooks/useFetchedCityNameList";
import { ADDRESS_LABELS, HOME_CITY } from "../lib/constants";
import { addressSchema } from "../lib/schemas";
import Field from "../ui/Field";
import { cx } from "../ui/cx";
import { inputClass, primaryButton, secondaryButton } from "../ui/styles";

/** The create form's submit button lives outside the card, so it targets the form by id. */
export const NEW_ADDRESS_FORM_ID = "new-address-form";

const stripNonDigits = (e) => {
  e.target.value = e.target.value.replace(/\D/g, "");
};

export default function AddressForm({
  formId = NEW_ADDRESS_FORM_ID,
  mode = "create", // "create" | "edit"
  defaultValues,
  onSubmit,
  onCancel,
  onCityChange,
}) {
  const isEdit = mode === "edit";
  const { isListLoading, cityNameList } = useFetchCityNameList();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      city: HOME_CITY,
      area: "",
      fullAddress: "",
      landmark: "",
      email: "",
      label: ADDRESS_LABELS[0],
      saveForNext: true,
      ...defaultValues,
    },
  });

  const city = useWatch({ control, name: "city" });

  useEffect(() => {
    onCityChange?.(city);
  }, [city, onCityChange]);

  const cities = useMemo(() => {
    const list =
      Array.isArray(cityNameList) && cityNameList.length
        ? cityNameList
        : [HOME_CITY];
    return city && !list.includes(city) ? [city, ...list] : list;
  }, [cityNameList, city]);

  // Prefix ids with the form id: the create and edit forms can be mounted together.
  const fid = (name) => `${formId}-${name}`;
  const fieldProps = (name) => ({
    id: fid(name),
    "aria-invalid": errors[name] ? "true" : undefined,
    "aria-describedby": errors[name] ? `${fid(name)}-error` : undefined,
  });

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mt-1 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2"
    >
      <Field
        id={fid("fullName")}
        label="Full name"
        error={errors.fullName?.message}
      >
        <input
          {...register("fullName")}
          {...fieldProps("fullName")}
          autoComplete="name"
          placeholder="Ahmed Raza"
          className={inputClass(errors.fullName)}
        />
      </Field>

      <Field id={fid("phone")} label="Phone" error={errors.phone?.message}>
        <input
          {...register("phone", { onChange: stripNonDigits })}
          {...fieldProps("phone")}
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={11}
          placeholder="03001234567"
          className={inputClass(errors.phone)}
        />
      </Field>

      <Field id={fid("city")} label="City" error={errors.city?.message}>
        <div className="relative">
          <select
            {...register("city")}
            {...fieldProps("city")}
            autoComplete="address-level2"
            className={cx(inputClass(errors.city), "appearance-none pr-10")}
          >
            {cities.map((name, idx) => (
              <option key={`${name}-${idx}`} value={name}>
                {name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>
        {isListLoading && (
          <p className="mt-1 text-xs text-gray-500">Loading cities…</p>
        )}
      </Field>

      <Field id={fid("area")} label="Area" error={errors.area?.message}>
        <input
          {...register("area")}
          {...fieldProps("area")}
          autoComplete="address-level3"
          placeholder="e.g. Clifton, Gulshan-e-Iqbal"
          className={inputClass(errors.area)}
        />
      </Field>

      <Field
        id={fid("fullAddress")}
        label="Full address"
        error={errors.fullAddress?.message}
        className="sm:col-span-2"
      >
        <input
          {...register("fullAddress")}
          {...fieldProps("fullAddress")}
          autoComplete="street-address"
          placeholder="House, street, block"
          className={inputClass(errors.fullAddress)}
        />
      </Field>

      <Field
        id={fid("landmark")}
        label="Nearest landmark"
        hint="optional"
        error={errors.landmark?.message}
      >
        <input
          {...register("landmark")}
          {...fieldProps("landmark")}
          placeholder="Helps the rider find you"
          className={inputClass(errors.landmark)}
        />
      </Field>

      <Field
        id={fid("email")}
        label="Email"
        hint="optional, for the invoice"
        error={errors.email?.message}
      >
        <input
          {...register("email")}
          {...fieldProps("email")}
          type="email"
          autoComplete="email"
          className={inputClass(errors.email)}
        />
      </Field>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <fieldset className="flex flex-wrap items-center gap-2">
          <legend className="sr-only">Save address as</legend>
          <span aria-hidden="true" className="mr-1 text-sm text-gray-500">
            Save as
          </span>
          {ADDRESS_LABELS.map((label) => (
            <label key={label} className="cursor-pointer">
              <input
                type="radio"
                value={label}
                {...register("label")}
                className="peer sr-only"
              />
              <span className="inline-block rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-semibold text-gray-600 transition-colors peer-checked:bg-primary peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2">
                {label}
              </span>
            </label>
          ))}
        </fieldset>

        {!isEdit && (
          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              {...register("saveForNext")}
              className="h-4 w-4 rounded border-gray-300 accent-primary"
            />
            Save for next time
          </label>
        )}
      </div>

      {isEdit && (
        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${primaryButton} sm:w-auto`}
          >
            {isSubmitting ? "Saving…" : "Save changes"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className={`${secondaryButton} sm:w-auto`}
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
}
