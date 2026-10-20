"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <>
      <div className="bg-gray-100 min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We've received your order and will process
            it shortly.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h2 className="font-semibold text-lg mb-2">What's Next?</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>You will receive a confirmation email shortly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Our team will contact you within 24 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Your order will be delivered in 4-5 business days</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => router.push("/")}
              className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-200 transition-colors"
            >
              Continue Shopping
            </button>
          </div>

          {/* Support Info */}
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-500">
              Need help? Contact us at{" "}
              <Link
                href="tel:+923260220581"
                className="text-primary font-semibold"
              >
                +92 326 0220581
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
