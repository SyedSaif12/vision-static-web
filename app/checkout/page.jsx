"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import { getCartAmount } from "@/redux/cart/cartSlice";
import arrow from "../../assets/arrow.png";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.products.items);
  const totalAmount = useSelector(getCartAmount);

  //   const [formData, setFormData] = useState({
  //     firstName: "",
  //     lastName: "",
  //     address: "",
  //     city: "",
  //     phone: "",
  //     payment: "cod",
  //   });

  const [formData, setFormData] = useState({
    payment: "cod", // default
  });

  const cartProducts = Object.entries(cartItems)
    .map(([id, qty]) => {
      const product = products.find((p) => p._id === id);
      return product ? { ...product, qty } : null;
    })
    .filter(Boolean);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    console.log("Order Data:", {
      shipping: formData,
      items: cartProducts,
      totalAmount,
    });

    alert("Order Placed Successfully ✅");
  };

  return (
    <>
      <HeroSection />

      <div className="bg-gray-100 px-4 sm:px-6 md:px-10 lg:px-24 xl:px-32 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT – SHIPPING */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 border-b-2 pb-4">
              Shipping Address
            </h2>

            <div>
              <h1 className="text-lg font-semibold mb-1 mt-4">
                Country / Region{" "}
              </h1>
              <input
                name="Country / Region"
                placeholder="Select your select country"
                className="input border rounded-full bg-[#E8E8E89C] py-2 px-4 w-full mb-4"
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-semibold mb-1 mt-4">
                  First Name
                </label>
                <input
                  name="firstName"
                  placeholder="Enter first name"
                  className="input border rounded-full bg-[#E8E8E89C] py-2 px-4 mb-4 w-full"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-1 mt-4">
                  Last Name
                </label>
                <input
                  name="lastName"
                  placeholder="Enter last name"
                  className="input border rounded-full bg-[#E8E8E89C] py-2 px-4 w-full mb-4"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label className="block text-lg mb-1 font-semibold mt-4">
                Address
              </label>
              <input
                name="Address"
                placeholder="Enter your address"
                className="input border rounded-full bg-[#E8E8E89C] py-2 px-4 w-full mb-4"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-lg  mb-1 font-semibold mt-4">
                Apartment, Suite, etc
              </label>
              <input
                name="Apartment"
                placeholder="Enter your Apartment"
                className="input border rounded-full bg-[#E8E8E89C] py-2 px-4 w-full"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-semibold mb-1 mt-4">
                  First Name
                </label>
                <input
                  name="City"
                  placeholder="Enter your City"
                  className="input border rounded-full bg-[#E8E8E89C] py-2 px-4 mb-4 w-full"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-1 mt-4">
                  Postal Code
                </label>
                <input
                  name="lastName"
                  placeholder="Enter Postal Code"
                  className="input border rounded-full bg-[#E8E8E89C] py-2 px-4 w-full mb-4"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-lg  mb-1 font-semibold mt-4">
                Phone
              </label>
              <input
                name="Phone"
                placeholder="Enter Phone"
                className="input border rounded-full bg-[#E8E8E89C] py-2 px-4 w-full"
                onChange={handleChange}
              />
            </div>

            <div>
              <h1 className="mt-6 font-semibold text-2xl text-black">
                Payments
              </h1>
              <p className="border-b-2 pb-4 mt-6 text-gray-500 font-semibold">
                All Transaction are secure and encrypted.
              </p>
            </div>

            <h3 className="font-semibold mt-6 mb-2">Payment Method</h3>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={formData.payment === "cod"}
                onChange={handleChange}
                className="hidden"
              />

              <span
                className={`w-5 h-5 flex items-center justify-center border rounded
      ${
        formData.payment === "cod"
          ? "border-blue-600 bg-blue-600"
          : "border-gray-400 bg-white"
      }`}
              >
                {formData.payment === "cod" && (
                  <img src={arrow} alt="checked" className="w-3 h-3" />
                )}
              </span>

              <span>Cash on Delivery</span>
            </label>

            {formData.payment === "cod" && (
              <div className="mt-4 bg-gray-100 p-4 rounded-md border">
                <div className="flex justify-between items-center font-semibold">
                  <p className="font-medium ">Cash on Delivery (COD)</p>
                  <p className="text-sm text-gray-500 font-semibold">
                    4% tax will apply to customers outside Karachi
                  </p>
                </div>

                <p className="text-sm mt-2 text-gray-700 font-semibold">
                  Will Pay Cash on receiving Parcel. Vision Tech is eligible to
                  cancel the order if the article doesn't allow COD.
                </p>
              </div>
            )}

            <label className="flex items-center gap-3 mt-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={formData.payment === "bank"}
                onChange={handleChange}
                className="hidden"
              />

              {/* Custom Checkbox Image */}
              <span
                className={`w-5 h-5 flex items-center justify-center border rounded
      ${
        formData.payment === "bank"
          ? "border-blue-600 bg-blue-600"
          : "border-gray-400 bg-white"
      }`}
              >
                {formData.payment === "bank" && (
                  <img src="/arrow.png" alt="checked" className="w-3 h-3" />
                )}
              </span>

              <span>Bank Deposit</span>
            </label>

            {formData.payment === "bank" && (
              <div className="mt-4 bg-gray-100 p-4 rounded-md border">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">Bank Deposit</p>
                  <p className="text-sm text-gray-500">
                    No Extra Charges for Bank Transfer
                  </p>
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
                    WhatsApp Deposit Slip / Transfer Message with Your Order
                    Number to
                    <strong> 092-301-4868585</strong>
                  </p>
                </div>
              </div>
            )}
            <div className="flex gap-6">
              <button
                onClick={placeOrder}
                className="w-full bg-white text-[#000DAF] py-3 rounded-full mt-6 border-2 border-[#000DAF]"
              >
                Proceed on Whatsapp
              </button>
              <button
                onClick={placeOrder}
                className="w-full bg-[#000DAF] text-white py-3 rounded-full mt-6"
              >
                Place Order
              </button>
            </div>
          </div>

          {/* RIGHT – ORDER SUMMARY */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            {cartProducts.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row gap-4 sm:items-center mb-4 border-b pb-4"
              >
                <Image
                  src={item.image[0]}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-2xl border border-[#FF8415] sm:w-[100px] sm:h-[100px]"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>

                <p className="font-semibold sm:text-right">
                  PKR {item.offerPrice * item.qty}
                </p>
              </div>
            ))}

            <div className="flex justify-between font-semibold text-lg mt-6">
              <span>SubTotal</span>
              <span>PKR {totalAmount}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-6">
              <span>Shipping</span>
              <span>PKR {totalAmount}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-6">
              <span>Total</span>
              <span className="font-semibold text-3xl">PKR {totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
