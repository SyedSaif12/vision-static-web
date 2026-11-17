export const COMPLAINT_ROUTES = {
  CREATE: "/complaints/new",
  DETAILS: (id) => `/complaints/${id}`,
};

export const COMPLAINT_STATUS = {
  open: {
    label: "Open",
    className: "bg-amber-50 text-amber-600",
  },
  progress: {
    label: "In Progress",
    className: "bg-[#edf3ff] text-[#155eef]",
  },
  resolved: {
    label: "Resolved",
    className: "bg-[#e9f9ef] text-[#079455]",
  },
  closed: {
    label: "Closed",
    className: "bg-gray-100 text-gray-600",
  },
};

export const COMPLAINT_STATUS_STEPS = [
  { id: "open", type: "Open" },
  { id: "progress", type: "In Progress" },
  { id: "resolved", type: "Resolved" },
  { id: "closed", type: "Closed" },
];
