'use client'
import { primaryButton } from "@/components/v2/checkout/ui/styles";
import PageLoader from "@/components/v2/loader";
import { getAllTicketsAction } from "@/redux/profile/complaint/complaintSlice";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ComplaintList from "./_components/ComplaintList";
const EMPTY_DATA = []
const Complaints = () => {
  const dispatch = useDispatch()
  const { data, isLoading } = useSelector((state) => state.complaint)

  const complaints = Array.isArray(data) ? data : EMPTY_DATA

  useEffect(() => {
    // if (!!complaints.length) return
    dispatch(getAllTicketsAction({ paginate: false }))
  }, [dispatch])


  if (isLoading && !complaints.length) {
    return (
      <div>
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="bg-surface py-4 sm:py-6 md:py-8 font-sans text-ink relative">
      <div className="w-full mx-auto space-y-6">
        {/* Header Subtitle */}
        <div className="space-y-2 flex justify-between items-center">
          <div>
            <h2 className="text-section-title font-bold tracking-normal">
              Complaints
            </h2>
            <p className="text-body text-muted">
              Raise an issue and track it to resolved.
            </p>
          </div>
          <div>
            <Link
              href={`/profile/complaints/new`}
              className={`${primaryButton} !py-1 !px-3 !rounded-md !w-auto`}
            >File a complaint</Link>
          </div>
        </div>

        <ComplaintList complaints={complaints} />
      </div>
    </div>
  )
};

export default Complaints;
