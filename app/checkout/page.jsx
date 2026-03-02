"use client";

import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import { getCartAmount, clearCart } from "@/redux/cart/cartSlice";
import { usePostCheckoutMutation } from "@/redux/checkout/checkoutSlice";
import arrow from "@/assets/arrow.png";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { formatPrice } from "@/helper/formatPrice";

// Validation Schema
const checkoutSchema = yup.object({
  country: yup.string().required("Country is required"),
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  address: yup
    .string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),
  apartment: yup.string().required("Appartment is required"),
  city: yup.string().required("City is required"),
  postalCode: yup.string().matches(/^\d{5}$/, "Postal code must be 5 digits"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^03\d{9}$/, "Phone must be in format 03XXXXXXXXX"),
  payment: yup
    .string()
    .oneOf(["cod", "banktransfer"], "Invalid payment method")
    .required("Payment method is required"),
});

const CITIES = [
  { value: "karachi", label: "Karachi" },
  { value: "lahore", label: "Lahore" },
  { value: "islamabad", label: "Islamabad" },
  { value: "rawalpindi", label: "Rawalpindi" },
  { value: "faisalabad", label: "Faisalabad" },
];

const COUNTRY = [{ value: "pakistan", label: "Pakistan" }];

const CheckoutPage = () => {
  const [loader, setLoader] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const subtotal = useSelector(getCartAmount);
  const dispatch = useDispatch();
  const router = useRouter();

  const [postCheckout] = usePostCheckoutMutation();

  const formMethods = useForm({
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      country: "",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      postalCode: "",
      phone: "",
      payment: "banktransfer",
    },
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = formMethods;

  const watchPayment = watch("payment");
  const watchCity = watch("city");

  // Convert cart items to array with product details
  const cartProducts = Object.entries(cartItems).map(([id, item]) => ({
    id,
    ...item.product,
    qty: item.quantity,
  }));

  // Calculate fees and totals
  const calculations = useMemo(() => {
    const COD_FEE_PERCENTAGE = 0.04; // 4%
    const SHIPPING_FEE = 200;

    // Apply COD fee only if payment is COD and city is NOT Karachi
    const shouldApplyCODFee = watchPayment === "cod" && watchCity !== "karachi";
    const codFee = shouldApplyCODFee ? subtotal * COD_FEE_PERCENTAGE : 0;
    const total = subtotal + codFee + SHIPPING_FEE;

    return {
      subtotal,
      codFee,
      shippingFee: SHIPPING_FEE,
      total,
      shouldApplyCODFee,
    };
  }, [subtotal, watchPayment, watchCity]);

  const onSubmit = async (data) => {
    setLoader(true);
    if (cartProducts.length === 0) {
      setLoader(false);
      alert("Your cart is empty!");
      return;
    }

    // Format data according to API requirements
    const orderPayload = {
      country: data.country,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      appartment: data.apartment, // Note: API uses "appartment" (typo)
      city: data.city,
      postalCode: data.postalCode,
      phoneNo: data.phone,
      shipping: calculations.shippingFee,
      applyCode: calculations.shouldApplyCODFee,
      paymentMethod: data.payment,
      items: cartProducts.map((item) => ({
        variantId: item.id,
        quantity: item.qty,
      })),
    };

    try {
      const response = await postCheckout(orderPayload).unwrap();
      toast.success(response.message || "Order Placed Successfully", {
        position: "top-right",
      });
      // Clear cart after successful order
      dispatch(clearCart());
      setLoader(false);
      // Redirect to order confirmation or home page
      router.push("/order-confirmation");
    } catch (error) {
      setLoader(false);
      toast.error(
        error?.data?.message || "Failed to place order. Please try again.",
      );
    }
  };

  const handleOrder = () => {
    const formData = watch();

    // Validate required fields
    const requiredFields = [
      "country",
      "firstName",
      "lastName",
      "address",
      "city",
      "phone",
    ];
    for (let field of requiredFields) {
      if (!formData[field]?.trim()) {
        // alert(
        //   `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`
        // );
        toast(
          `Please fill the ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`,
          {
            className: "font-bold",
          },
        );
        return;
      }
    }

    const message = `
  *New Order Request*

  *Customer Details:*
  Country:${formData.country}
  Name: ${formData.firstName} ${formData.lastName}
  Phone: ${formData.phone}
  Address: ${formData.address}${
    formData.apartment ? `, ${formData.apartment}` : ""
  }
  City: ${CITIES.find((c) => c.value === formData.city)?.label || formData.city}
  Postal Code: ${formData.postalCode || "N/A"}

  *Order Items:*
  ${cartProducts
    .map(
      (item) =>
        `${item.productTitle} x ${item.qty} = PKR ${
          (item.price || item.oldPrice) * item.qty
        }`,
    )
    .join("\n")}

  *Payment:* ${formData.payment === "cod" ? "Cash on Delivery" : "Bank Deposit"}

  *Order Summary:*
  Subtotal: PKR ${calculations.subtotal.toFixed(2)}
  ${
    calculations.codFee > 0
      ? `COD Fee (4%): PKR ${calculations.codFee.toFixed(2)}`
      : ""
  }
  Shipping: PKR ${calculations.shippingFee}
  *Total: PKR ${calculations.total.toFixed(2)}*
      `.trim();

    const whatsappNumber = process.env.NEXT_PUBLIC_ADMIN_NUMBER;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank",
    );
  };

  return (
    <>
      <HeroSection title="Checkout" />

      <div className="bg-gray-100 px-4 sm:px-6 md:px-10 lg:px-24 xl:px-32 py-8 md:py-12">
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* LEFT – SHIPPING */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 border-b-2 pb-4">
                  Shipping Address
                </h2>

                {/* Country */}
                <div>
                  <label className="block text-lg font-semibold mb-1 mt-4">
                    Country / Region <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="input border rounded-full bg-[#E8E8E89C] py-2 px-4 mb-1 w-full"
                      >
                        <option value="">Select Country</option>
                        {COUNTRY.map((country) => (
                          <option key={country.value} value={country.value}>
                            {country.label}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm mb-2">
                      {errors.country.message}
                    </p>
                  )}
                </div>

                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-lg font-semibold mb-1 mt-4">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("firstName")}
                      placeholder="Enter first name"
                      className="input border rounded-full bg-[#E8E8E89C] py-2 px-4 mb-1 w-full"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mb-2">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-lg font-semibold mb-1 mt-4">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("lastName")}
                      placeholder="Enter last name"
                      className="input border rounded-full bg-[#E8E8E89C] py-2 px-4 mb-1 w-full"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mb-2">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-lg mb-1 font-semibold mt-4">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("address")}
                    placeholder="Enter your address"
                    className="input border rounded-full bg-[#E8E8E89C] py-2 px-4 w-full mb-1"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mb-2">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* Apartment */}
                <div>
                  <label className="block text-lg mb-1 font-semibold mt-4">
                    Apartment, Suite, etc
                  </label>
                  <input
                    {...register("apartment")}
                    placeholder="Enter your Apartment"
                    className="input border rounded-full bg-[#E8E8E89C] py-2 px-4 w-full mb-1"
                  />
                  {errors.apartment && (
                    <p className="text-red-500 text-sm mb-2">
                      {errors.apartment.message}
                    </p>
                  )}
                </div>

                {/* City & Postal Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-lg font-semibold mb-1 mt-4">
                      City <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="city"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="input border rounded-full bg-[#E8E8E89C] py-2 px-4 mb-1 w-full"
                        >
                          <option value="">Select City</option>
                          {CITIES.map((city) => (
                            <option key={city.value} value={city.value}>
                              {city.label}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mb-2">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-lg font-semibold mb-1 mt-4">
                      Postal Code
                    </label>
                    <input
                      {...register("postalCode")}
                      placeholder="Enter Postal Code"
                      className="input border rounded-full bg-[#E8E8E89C] py-2 px-4 mb-1 w-full"
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm mb-2">
                        {errors.postalCode.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-lg mb-1 font-semibold mt-4">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("phone")}
                    placeholder="03001234567"
                    className="input border rounded-full bg-[#E8E8E89C] py-2 px-4 w-full mb-1"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mb-2">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Payment Section */}
                <div>
                  <h1 className="mt-6 font-semibold text-2xl text-black">
                    Payment
                  </h1>
                  <p className="border-b-2 pb-4 mt-6 text-gray-500 font-semibold">
                    All transactions are secure and encrypted.
                  </p>
                </div>

                <h3 className="font-semibold mt-6 mb-2">Payment Method</h3>

                {/* COD Option */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    {...register("payment")}
                    type="radio"
                    value="cod"
                    className="hidden"
                  />
                  <span
                    className={`w-5 h-5 flex items-center justify-center border rounded ${
                      watchPayment === "cod"
                        ? "border-blue-600 bg-blue-600"
                        : "border-gray-400 bg-white"
                    }`}
                  >
                    {watchPayment === "cod" && (
                      <img src={arrow.src} alt="checked" className="w-3 h-3" />
                    )}
                  </span>
                  <span>Cash on Delivery (COD)</span>
                </label>

                {watchPayment === "cod" && (
                  <div className="mt-4 bg-gray-100 p-4 rounded-md border">
                    <div className="flex justify-between items-center font-semibold">
                      <p className="font-medium">Cash on Delivery (COD)</p>
                      {calculations.shouldApplyCODFee ? (
                        <p className="text-sm text-red-600 font-semibold">
                          4% COD fee applies
                        </p>
                      ) : (
                        <p className="text-sm text-green-600 font-semibold">
                          No COD fee for Karachi
                        </p>
                      )}
                    </div>
                    <p className="text-sm mt-2 text-gray-700 font-semibold">
                      {calculations.shouldApplyCODFee
                        ? "Pay cash when you receive your parcel. A 4% COD processing fee will be added to your total."
                        : "Pay cash when you receive your parcel. No COD fee for Karachi customers!"}
                    </p>
                  </div>
                )}

                {/* Bank Option */}
                <label className="flex items-center gap-3 mt-3 cursor-pointer">
                  <input
                    {...register("payment")}
                    type="radio"
                    value="banktransfer"
                    className="hidden"
                  />
                  <span
                    className={`w-5 h-5 flex items-center justify-center border rounded ${
                      watchPayment === "banktransfer"
                        ? "border-blue-600 bg-blue-600"
                        : "border-gray-400 bg-white"
                    }`}
                  >
                    {watchPayment === "banktransfer" && (
                      <img src={arrow.src} alt="checked" className="w-3 h-3" />
                    )}
                  </span>
                  <span>Bank Deposit</span>
                </label>

                {watchPayment === "banktransfer" && (
                  <div className="mt-4 bg-gray-100 p-4 rounded-md border">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">Bank Deposit</p>
                      <p className="text-sm text-green-600">No Extra Charges</p>
                    </div>
                    <div className="text-sm text-gray-700 space-y-1 font-semibold">
                      <p>
                        <strong>Meezan Bank</strong>
                      </p>
                      <p>Account Title: GYM ARMOUR</p>
                      <p>Account No: 0105 3673 42</p>
                      <p>Branch Code: 0216</p>
                      <p>IBAN: PK48 MEZN 0002 1601 0536 7342</p>
                      <p className="mt-2">
                        WhatsApp Deposit Slip to{" "}
                        <strong>092-301-4868585</strong>
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="md:flex gap-6">
                  <button
                    type="button"
                    onClick={handleOrder}
                    className="w-full bg-white text-[#000DAF] py-3 rounded-full mt-6 border-2 border-[#000DAF] hover:bg-[#000DAF] hover:text-white transition-colors"
                  >
                    Proceed on WhatsApp
                  </button>
                  <button
                    disabled={loader}
                    type="submit"
                    className="w-full bg-[#000DAF] text-white py-3 rounded-full mt-6 hover:bg-[#000DAF]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="flex justify-center gap-4">
                      Place Order{" "}
                      {loader && <LoaderCircle className="animate-spin" />}
                    </span>
                  </button>
                </div>
              </div>

              {/* RIGHT – ORDER SUMMARY */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 border-b-2 pb-4">
                  Order Summary
                </h2>

                {cartProducts.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Your cart is empty
                  </p>
                ) : (
                  <>
                    {Array.isArray(cartProducts) &&
                      cartProducts?.length > 0 &&
                      cartProducts?.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col sm:flex-row gap-4 sm:items-center mb-4 border-b pb-4"
                        >
                          <Image
                            src={item.image[0]?.fileUrl || "/placeholder.png"}
                            alt={item.productTitle || "Product"}
                            width={100}
                            height={100}
                            className="rounded-2xl border border-[#FF8415] sm:w-[100px] sm:h-[100px] object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{item.productTitle}</p>
                            <p className="text-sm text-gray-500">
                              Qty: {item.qty}
                            </p>
                          </div>
                          <p className="font-semibold sm:text-right">
                            PKR{" "}
                            {formatPrice(
                              (item.price || item.oldPrice) * item.qty,
                            )}
                          </p>
                        </div>
                      ))}

                    <div className="mt-6 space-y-3">
                      <div className="flex justify-between text-gray-700">
                        <span>Subtotal</span>
                        <span>PKR {formatPrice(calculations.subtotal)}</span>
                      </div>

                      {calculations.codFee > 0 && (
                        <div className="flex justify-between text-red-600">
                          <span>COD Fee (4%)</span>
                          <span>PKR {formatPrice(calculations.codFee)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-gray-700">
                        <span>Shipping</span>
                        <span>PKR {calculations.shippingFee.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between font-bold text-2xl mt-4 pt-4 border-t-2">
                        <span>Total</span>
                        <span className="text-[#000DAF]">
                          PKR {formatPrice(calculations.total)}
                        </span>
                      </div>

                      {calculations.shouldApplyCODFee && (
                        <p className="text-xs text-gray-500 mt-2">
                          * Total includes 4% COD processing fee
                        </p>
                      )}

                      {watchCity === "karachi" && watchPayment === "cod" && (
                        <p className="text-xs text-green-600 mt-2">
                          ✓ No COD fee for Karachi deliveries
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default CheckoutPage;
