// Single source of truth for order statuses (admin panel side).

export const DATE_FORMAT = "YYYY-MM-DDTHH:mm:ss"; // backend DTO / existing data ke format jaisa

// Timeline ke ids (status JSON me yehi ids hain)
export const ORDER_STATUS = {
  RECEIVED: "received",
  CONFIRMED: "confirmed",
  PROCESSING: "processing",
  DISPATCHED: "dispatched",
  DELIVERED: "delivered",
  RETURNED: "returned",
  REJECTED: "rejected",
};

// Default timeline (jab backend se status null/invalid aaye)
export const DEFAULT_TIMELINE = [
  { id: "received", statusType: "Received", isComplete: true, dateTime: null },
  {
    id: "confirmed",
    statusType: "Confirmed",
    isComplete: false,
    dateTime: null,
  },
  {
    id: "processing",
    statusType: "Processing",
    isComplete: false,
    dateTime: null,
  },
  {
    id: "dispatched",
    statusType: "Dispatched",
    isComplete: false,
    dateTime: null,
  },
  {
    id: "delivered",
    statusType: "Delivered",
    isComplete: false,
    dateTime: null,
  },
  { id: "returned", statusType: "Returned", isComplete: false, dateTime: null },
  { id: "rejected", statusType: "Rejected", isComplete: false, dateTime: null },
];

// ⚠️ Prisma enum me typo hai: `confrimed`. Jab tak backend me fix na ho,
// yeh map orderStatus bhejte waqt use hota hai. Fix ke baad is map ko khali kar do.
export const STATUS_ID_TO_ENUM = {
  confirmed: "confrimed",
};
export const ENUM_TO_STATUS_ID = Object.fromEntries(
  Object.entries(STATUS_ID_TO_ENUM).map(([id, en]) => [en, id]),
);

// Sirf aage ki taraf transitions allowed hain (reverse nahi ho sakta)
export const ALLOWED_TRANSITIONS = {
  received: ["confirmed", "rejected"],
  confirmed: ["processing", "rejected"],
  processing: ["dispatched", "rejected"],
  dispatched: ["delivered", "returned"],
  delivered: ["returned"],
  returned: [],
  rejected: [],
};

export const FLOW = [
  "received",
  "confirmed",
  "processing",
  "dispatched",
  "delivered",
];
export const EXCEPTIONS = ["returned", "rejected"];

export const STEP_META = {
  received: { title: "Received", hint: "We have your order" },
  confirmed: { title: "Confirmed", hint: "Confirmed by our team" },
  processing: { title: "Processing", hint: "Packed and checked" },
  dispatched: { title: "Dispatched", hint: "Handed to courier" },
  delivered: { title: "Delivered", hint: "Delivered to your address" },
  returned: { title: "Returned", hint: "Return processed" },
  rejected: { title: "Rejected", hint: "This order could not be completed" },
};

// Select box ke colors
export const STATUS_STYLES = {
  received: "bg-primary text-white border-primary",
  confirmed: "bg-primary text-white border-primary",
  processing: "bg-primary text-white border-primary",
  dispatched: "bg-primary text-white border-primary",
  delivered: "bg-primary text-white border-primary",
  returned: "bg-primary text-white border-primary",
  rejected: "bg-primary text-white border-primary",
};
