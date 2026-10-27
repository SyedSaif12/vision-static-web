"use client";
import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";

import Loading from "@/components/Loading";
import { onToggle } from "@/redux/golbal-toggle/globalToggleSlice";

import CheckoutFooter from "./CheckoutFooter";
import CheckoutHeader from "./CheckoutHeader";
import CheckoutStepper from "./CheckoutStepper";
import CheckoutSteps from "./CheckoutSteps";
import OrderSummary from "./summary/OrderSummary";

import { useAddressBook } from "./hooks/useAddressBook";
import { useCheckoutCart } from "./hooks/useCheckoutCart";
import { useCheckoutFlow } from "./hooks/useCheckoutFlow";
import { usePlaceOrder } from "./hooks/usePlaceOrder";

import { ROUTES } from "./lib/constants";
import { calculateOrderTotals } from "./lib/pricing";
import { buildOrderPayload } from "./lib/orderPayload";
import { buildWhatsAppMessage, openWhatsAppOrder } from "./lib/whatsapp";
import { primaryButton } from "./ui/styles";
import { logout } from "@/redux/user/userSlice";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const profile = useSelector((state) => state.user?.data);

  const cart = useCheckoutCart();
  const addressBook = useAddressBook();
  const flow = useCheckoutFlow({ addresses: addressBook.addresses });
  const { submit, isPlacing, isPlaced } = usePlaceOrder();

  // Hide the site-wide navbar/footer while checking out (same as before).
  useEffect(() => {
    dispatch(onToggle(true));
    return () => {
      dispatch(onToggle(false));
    };
  }, [dispatch]);

  // Live totals for the summary (follows the address being picked).
  const totals = useMemo(
    () =>
      calculateOrderTotals({
        subtotal: cart.subtotal,
        city: flow.city,
        deliveryMethod: flow.delivery,
        paymentMethod: flow.payment,
      }),
    [cart.subtotal, flow.city, flow.delivery, flow.payment],
  );

  // logout if not you
  const handleLogout = () => dispatch(logout());

  // Totals locked to the confirmed address – this is what gets submitted.
  const getOrderContext = () => {
    const { confirmedAddress, delivery, payment } = flow;
    if (!confirmedAddress || !payment) return null;
    return {
      address: confirmedAddress,
      deliveryMethod: delivery,
      paymentMethod: payment,
      products: cart.products,
      totals: calculateOrderTotals({
        subtotal: cart.subtotal,
        city: confirmedAddress.city,
        deliveryMethod: delivery,
        paymentMethod: payment,
      }),
    };
  };

  const handlePlaceOrder = () => {
    const ctx = getOrderContext();
    if (!ctx) return;
    if (ctx.products.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    submit(buildOrderPayload(ctx));
  };

  const handleWhatsApp = () => {
    const ctx = getOrderContext();
    if (!ctx) return;
    const message = buildWhatsAppMessage({
      ...ctx,
      deliveryOption: flow.deliveryOptions.find((o) => o.id === flow.delivery),
    });
    if (!openWhatsAppOrder(message)) {
      toast.error("WhatsApp ordering is not available right now.");
    }
  };

  if (!cart.hasMounted || isPlaced) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      <CheckoutHeader />

      <main className="mx-auto w-[92%] max-w-6xl py-6 md:py-10">
        <Link
          href={ROUTES.cart}
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          Back to cart
        </Link>
        <h1 className="mb-4 mt-3 text-3xl font-extrabold text-gray-900">
          Checkout
        </h1>

        {cart.products.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
            <p className="text-lg font-semibold text-gray-900">
              Your cart is empty
            </p>
            <p className="mt-1 text-gray-600">
              Add something to your cart to check out.
            </p>
            <Link
              href={ROUTES.home}
              className={`${primaryButton} mx-auto mt-5 !w-auto`}
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <CheckoutStepper current={flow.step} />

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
              <div className="order-2 lg:order-1">
                <CheckoutSteps
                  profile={profile}
                  addressBook={addressBook}
                  flow={flow}
                  totals={totals}
                  isPlacing={isPlacing}
                  onNotYou={handleLogout} // logout
                  onPlaceOrder={handlePlaceOrder}
                  onWhatsApp={handleWhatsApp}
                />
              </div>

              <OrderSummary
                className="order-1 lg:sticky lg:top-24 lg:order-2"
                products={cart.products}
                itemCount={cart.itemCount}
                totals={totals}
                onRemove={cart.remove}
                onQuantity={cart.changeQuantity}
              />
            </div>
          </>
        )}
      </main>

      <CheckoutFooter />
    </div>
  );
}
