import { formatStatusDate } from "@/lib/orderStatus";
import Link from "next/link";

const ComplaintList = ({ complaints }) => {
    const data = normalizeComplaints(complaints)

    if (!data.length) {
        return (
            <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
                <p className="font-semibold text-gray-700">
                    No complaints found
                </p>
                <p className="mt-1 text-sm text-gray-500">
                    Your submitted complaints will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {data.map((complaint) => (
                <div
                    key={complaint.id}
                    className="rounded-2xl border border-[#e2e8f0] bg-white p-5 drop-shadow-md sm:p-6"
                >
                    {/* Ticket Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <h3 className="text-lg font-semibold text-[#17213b]">
                                { complaint.ticketNo ?? '' }
                            </h3>

                            <p className="mt-1 text-sm text-[#94a3b8]">
                                {complaint.orderNo}
                                {" · "}
                                opened {complaint.opened}
                            </p>
                        </div>

                        <StatusBadge status={complaint.statusType} />
                    </div>

                    {/* Complaint Description */}
                    <p className="mt-5 mb-2 text-[15px] leading-6 text-[#3f4d6c]">
                        <span className="font-medium">Reason:</span>{" "}
                        {complaint.describe}
                    </p>

                    {/* View Ticket */}
                    <Link
                        href={`/profile/complaints/${complaint.id}`}
                        className="rounded-md border border-[#e2e8f0] px-4 py-1 text-sm font-semibold text-[#17213b] transition-colors hover:border-[#2457e6] hover:text-[#2457e6]"
                    >
                        View ticket
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default ComplaintList

// Status Badge
const StatusBadge = ({ status }) => {
    const styles = {
        open: "bg-blue-50 text-blue-600",
        progress: "bg-[#eef3ff] text-[#2457e6]",
        in_progress: "bg-[#eef3ff] text-[#2457e6]",
        resolved: "bg-[#e9f9ef] text-[#29945c]",
        closed: "bg-gray-100 text-gray-600",
    };

    const normalizedStatus = (status || "open")
        .toLowerCase()
        .replaceAll(" ", "_");

    const labels = {
        open: "Open",
        progress: "In progress",
        in_progress: "In progress",
        resolved: "Resolved",
        closed: "Closed",
    };

    return (
        <span
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
                styles[normalizedStatus] || "bg-gray-100 text-gray-600"
            }`}
        >
            {labels[normalizedStatus] || status}
        </span>
    );
};


const normalizeComplaints = (complaints = []) => {
    if (!Array.isArray(complaints)) return [];
     return complaints.map((complaint) => {
        let status = [];
        try {
            status = Array.isArray(complaint.status)
                ? complaint.status
                : JSON.parse(complaint.status || "[]");
        } catch {
            status = [];
        }

        const images = Array.isArray(complaint.image)
            ? complaint.image.map((img) =>
                typeof img === "string" ? img : img.fileUrl
            )
            : [];

        return {
            id: complaint.id,
            orderId: complaint.orderId,
            orderNo: `Order #WG-${new Date().getFullYear()}-${complaint.id.slice(-6).toUpperCase()}`,
            ticketNo: `Ticket #CMP-${complaint.id.slice(-4).toUpperCase()}`,
            complaintType: complaint.complaintType,
            describe: complaint.describe,
            ownerDesc: complaint.ownerDesc,
            status: status,
            statusType: complaint.statusType,
            images: images,
            opened: formatStatusDate(complaint.createdAt)
        };
    });
}