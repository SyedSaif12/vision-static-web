"use client";
import { overviewAction } from "@/redux/profile/overview/overviewSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useOrder(id) {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.overview);

  useEffect(() => {
    dispatch(overviewAction());
  }, [dispatch]);

  const orders = Array.isArray(data) ? data : [];
  const order = orders.find((o) => o.id === id) ?? null;

  return { order, isLoading };
}
