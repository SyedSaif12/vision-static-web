import dayjs from "dayjs";
import {
  ALLOWED_TRANSITIONS,
  DATE_FORMAT,
  DEFAULT_TIMELINE,
  ENUM_TO_STATUS_ID,
  EXCEPTIONS,
  FLOW,
  STATUS_ID_TO_ENUM,
  STEP_META,
} from "@/constant/orderStatus";

const isValidTimeline = (value) =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every((s) => s && typeof s.id === "string");

/** Backend se status string (JSON) ya array dono aa sakte hain. */
export const parseTimeline = (status) => {
  try {
    const parsed = typeof status === "string" ? JSON.parse(status) : status;
    return isValidTimeline(parsed) ? parsed : DEFAULT_TIMELINE;
  } catch {
    return DEFAULT_TIMELINE;
  }
};

/** Prisma enum value -> timeline id (confrimed -> confirmed) */
export const enumToStatusId = (value) => ENUM_TO_STATUS_ID[value] ?? value;

/** Timeline id -> Prisma enum value (confirmed -> confrimed) */
export const statusIdToEnum = (id) => STATUS_ID_TO_ENUM[id] ?? id;

/** Current status: pehle orderStatus, warna timeline ka last complete step */
export const getCurrentStatusId = (
  order,
  timeline = parseTimeline(order?.status),
) => {
  if (order?.orderStatus) return enumToStatusId(order.orderStatus);
  const completed = timeline.filter((s) => s.isComplete);
  return completed.length ? completed[completed.length - 1].id : "received";
};

export const getAllowedNextStatuses = (currentId) =>
  ALLOWED_TRANSITIONS[currentId] ?? [];

export const isTransitionAllowed = (currentId, nextId) =>
  getAllowedNextStatuses(currentId).includes(nextId);

/** Naya timeline: selected step complete + abhi ka time (dayjs). Original mutate nahi hota. */
export const buildUpdatedTimeline = (timeline, nextId) =>
  timeline.map((step) =>
    step.id === nextId
      ? { ...step, isComplete: true, dateTime: dayjs().format(DATE_FORMAT) }
      : step,
  );

export const formatStatusDate = (dateTime) =>
  dateTime ? dayjs(dateTime).format("DD MMM YYYY, hh:mm A") : "";

// Kitne orders delivered hain
export const countOrdersByStatus = (orders = [], statusId) =>
  Array.isArray(orders)
    ? orders.filter((o) => getCurrentStatusId(o) === statusId).length
    : 0;

// Kitne products (items) delivered hain (quantity ka sum)
export const countItemsByStatus = (orders = [], statusId) =>
  Array.isArray(orders)
    ? orders
        .filter((o) => getCurrentStatusId(o) === statusId)
        .reduce(
          (sum, o) =>
            sum +
            (o.orderItems ?? []).reduce((s, i) => s + (i.quantity ?? 0), 0),
          0,
        )
    : 0;

export const recentOrderItems = (orders = []) => {
  const now = dayjs();
  return Array.isArray(orders)
    ? orders.filter((order) => {
        const orderDate = dayjs(order.createdAt);
        return orderDate.isSame(now, "month");
      })
    : [];
};

export function parseStatus(raw) {
  let list = raw;
  if (typeof raw === "string") {
    try {
      list = JSON.parse(raw);
    } catch {
      list = [];
    }
  }
  return Array.isArray(list) ? list : [];
}

export function buildTimeline(order) {
  const byId = new Map(parseStatus(order?.status).map((s) => [s.id, s]));
  const isCod = order?.paymentMethod === "cod";
  const ended = EXCEPTIONS.find((id) => byId.get(id)?.isComplete);

  const describe = (id) => {
    const s = byId.get(id);
    const meta = STEP_META[id];
    return {
      id,
      title: s?.statusType || meta.title,
      hint:
        id === "delivered" && isCod
          ? "Open and check before you pay"
          : meta.hint,
      dateTime: s?.dateTime ?? null,
      isComplete: !!s?.isComplete,
    };
  };

  let nextAssigned = false;
  let steps = FLOW.map((id) => {
    const step = describe(id);
    if (step.isComplete) return { ...step, state: "done" };
    if (!ended && !nextAssigned) {
      nextAssigned = true;
      return { ...step, state: "current" };
    }
    return { ...step, state: "upcoming" };
  });

  // Rejected / Returned: adhoori steps hata do, aakhir mein red step lagao
  if (ended) {
    steps = steps.filter((s) => s.state === "done");
    steps.push({ ...describe(ended), state: "failed" });
  }

  const last = [...steps]
    .reverse()
    .find((s) => s.state === "done" || s.state === "failed");
  const tone = ended
    ? "failed"
    : last?.id === "delivered"
      ? "success"
      : "progress";

  return { steps, currentLabel: last?.title ?? "Received", tone };
}

export function formatStepDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const date = d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${date}, ${time}`;
}

export function formatOrderDate(value) {
  const d = new Date(value);
  if (!value || Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getOrderNumber(order) {
  const year =
    new Date(order?.createdAt).getFullYear() || new Date().getFullYear();
  return `#WG-${year}-${String(order?.id ?? "")
    .slice(-6)
    .toUpperCase()}`;
}

const PAYMENT_LABELS = {
  cod: "Cash on delivery",
  banktransfer: "Bank Transfer",
};
export function getPaymentLabel(method) {
  if (!method) return "";
  return (
    PAYMENT_LABELS[method] ??
    String(method)
      .replace(/[_-]+/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase())
  );
}

export function formatAddress(customer = {}) {
  return [
    customer.address ?? "",
    customer.apartment ?? "",
    customer.city ?? "",
    customer.postalCode ?? "",
    customer.country ?? "",
  ]
    .filter((v) => v && String(v).trim())
    .join(", ");
}
