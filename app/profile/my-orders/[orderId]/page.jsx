"use client";
import { useParams } from "next/navigation";
import OrderDetails from "../_components/OrderDetails";

const page = () => {
  const params = useParams();
  const { orderId } = params;
  return <OrderDetails id={orderId} />;
};

export default page;
