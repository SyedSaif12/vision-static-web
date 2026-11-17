"use client";

import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Image as ImageIcon,
} from "lucide-react";

import { getTicketAction } from "@/redux/profile/complaint/complaintSlice";
import { formatStatusDate } from "@/lib/orderStatus";
import PageLoader from "@/components/v2/loader";

const Page = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { complaintId } = params;

  const { ticket, isLoading } = useSelector(
    (state) => state.complaint
  );

  useEffect(() => {
    if (complaintId) {
      dispatch(getTicketAction({ id: complaintId }));
    }
  }, [dispatch, complaintId]);

  // Normalize single ticket object
  const complaint = useMemo(() => {
    if (!ticket || !ticket.id) return null;

    return normalizeTicket(ticket);
  }, [ticket]);

  if (isLoading) {
    return (
     <div>
      <PageLoader />
     </div>
    );
  }

  if (!complaint) {
    return (
      <section className="mt-4 rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <h2 className="text-card-title text-ink">
          Ticket not found
        </h2>
        <p className="mt-2 text-sm text-muted">
          We couldn't find the requested complaint.
        </p>

        <Link
          href="/profile/complaints"
          className="mt-5 inline-flex items-center gap-2 text-button text-primary"
        >
          <ArrowLeft size={16} />
          Back to complaints
        </Link>
      </section>
    );
  }

  return (
    <div className="w-full space-y-4">

      {/* Back Navigation */}
      <Link
        href="/profile/complaints"
        className="inline-flex items-center gap-1 text-base text-muted transition-colors hover:text-primary"
      >
        <ArrowLeft size={17} />
        Back to complaints
      </Link>

      {/* Ticket Card */}
      <section className="w-full overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-md">

        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-[#eaf0f8] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">

          <div className="min-w-0">
            <h1 className="text-section-title text-ink">
              {complaint.ticketNo}
            </h1>

            <p className="mt-1 break-words text-sm text-faint sm:text-base">
              {complaint.orderNo}
              {" · "}
              opened {complaint.opened}
            </p>
          </div>

          <StatusBadge status={complaint.statusType} />
        </div>

        {/* Complaint Details */}
        <div className="space-y-0 px-5 pt-5 sm:px-7 sm:pt-6">

          {/* Reason */}
          <div className="flex flex-col gap-2 border-b border-[#eaf0f8] py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <span className="shrink-0 text-base text-muted">
              Reason
            </span>

            <span className="break-words text-base font-semibold text-ink sm:text-right">
              {complaint.complaintType || "N/A"}
            </span>
          </div>

          {/* User Note */}
          <div className="flex flex-col gap-2 border-b border-[#eaf0f8] py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <span className="shrink-0 text-base text-muted">
              Your note
            </span>

            <span className="break-words text-base font-semibold text-ink sm:text-right">
              {complaint.describe || "No additional note provided."}
            </span>
          </div>

        </div>

        {/* Status Timeline */}
        <div className="px-5 pb-6 pt-6 sm:px-7">

          <h2 className="mb-3 text-base font-bold text-ink">
            Status
          </h2>

          <StatusTimeline status={complaint.statusType} />

          {/* Admin Message */}
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#d9e5ff] bg-[#f6f9ff] px-4 py-5 sm:items-center sm:px-6">

            <MessageCircle
              size={19}
              className="mt-0.5 shrink-0 fill-primary text-primary"
            />

            <p className="text-base leading-6 text-[#3f4d6c]">
              {complaint.ownerDesc ||
                "Our team is on it. We will update you on WhatsApp, usually within one working day."}
            </p>

          </div>

          {/* Complaint Images */}
          {complaint.images.length > 0 && (
            <div className="mt-6">

              <h2 className="mb-3 text-base font-bold text-ink">
                Attached images
              </h2>

              <div className="flex flex-wrap gap-3">
                {complaint.images.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="relative h-20 w-20 overflow-hidden rounded-xl border border-[#e2e8f0] bg-light-50 sm:h-24 sm:w-24"
                  >
                    <Image
                      src={image}
                      alt={`Complaint attachment ${index + 1}`}
                      fill
                      unoptimized
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default Page;


/* --------------------------------
   Normalize Single Complaint
--------------------------------- */

const normalizeTicket = (complaint) => {
  let status = [];

  try {
    status = Array.isArray(complaint.status)
      ? complaint.status
      : JSON.parse(complaint.status || "[]");
  } catch {
    status = [];
  }

  const images = Array.isArray(complaint.image)
    ? complaint.image
        .map((img) =>
          typeof img === "string" ? img : img?.fileUrl
        )
        .filter(Boolean)
    : [];

  const id = complaint.id || "";

  return {
    id,
    orderId: complaint.orderId,

    orderNo: `Order #WG-${new Date().getFullYear()}-${id
      .slice(-6)
      .toUpperCase()}`,

    ticketNo: `Ticket #CMP-${id.slice(-4).toUpperCase()}`,

    complaintType: complaint.complaintType,
    describe: complaint.describe,
    ownerDesc: complaint.ownerDesc,

    status,
    statusType: complaint.statusType || "open",

    images,

    opened: complaint.createdAt
      ? formatStatusDate(complaint.createdAt)
      : "",
  };
};


/* --------------------------------
   Status Badge
--------------------------------- */

const StatusBadge = ({ status }) => {
  const normalizedStatus = normalizeStatus(status);

  const styles = {
    open: "bg-[#e9f9ef] text-[#29945c]",
    progress: "bg-[#eef3ff] text-primary",
    in_progress: "bg-[#eef3ff] text-primary",
    resolved: "bg-[#e9f9ef] text-[#29945c]",
    closed: "bg-gray-100 text-gray-600",
  };

  const labels = {
    open: "Open",
    progress: "In progress",
    in_progress: "In progress",
    resolved: "Resolved",
    closed: "Closed",
  };

  return (
    <span
      className={`inline-flex w-fit shrink-0 items-center rounded-full px-4 py-2 text-badge ${
        styles[normalizedStatus] || "bg-gray-100 text-gray-600"
      }`}
    >
      {labels[normalizedStatus] || status}
    </span>
  );
};


/* --------------------------------
   Status Timeline
--------------------------------- */

const StatusTimeline = ({ status }) => {
  const currentStatus = normalizeStatus(status);

  const steps = [
    { key: "open", label: "Open" },
    { key: "progress", label: "In progress" },
    { key: "resolved", label: "Resolved" },
  ];

  const currentIndex =
    currentStatus === "resolved" || currentStatus === "closed"
      ? 2
      : currentStatus === "progress" ||
        currentStatus === "in_progress"
      ? 1
      : 0;

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-3">

      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;

        return (
          <React.Fragment key={step.key}>

            <span
              className={`inline-flex shrink-0 items-center rounded-full px-4 py-2 text-badge ${
                isActive
                  ? "bg-[#eef3ff] text-primary"
                  : isCompleted
                  ? "bg-[#e9f9ef] text-[#29945c]"
                  : "bg-[#f5f7fb] text-muted"
              }`}
            >
              {step.label}
            </span>

            {index !== steps.length - 1 && (
              <ArrowRight
                size={17}
                className="shrink-0 text-ink"
              />
            )}

          </React.Fragment>
        );
      })}

    </div>
  );
};


/* --------------------------------
   Status Normalizer
--------------------------------- */

const normalizeStatus = (status) => {
  return (status || "open")
    .toLowerCase()
    .replaceAll(" ", "_");
};
