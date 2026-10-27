// ─────────────────────────────────────────────────────────────
// Checkout constants. Business rules & copy live here so ops/marketing
// changes never require touching components.
// ─────────────────────────────────────────────────────────────

export const BRAND = {
  name: "WeGot",
  logoSrc: '/images/logo-wegot-dark.png', // e.g. "/logo.png" – falls back to a text wordmark when null
};

export const ROUTES = {
  home: "/",
  cart: "/cart",
  login: "/accounts/login",
  orderConfirmation: "/order-confirmation",
  product: (slug) => `/products/${slug}`,
};

// ── Steps ────────────────────────────────────────────────────
export const STEP = {
  SIGN_IN: "signin",
  ADDRESS: "address",
  DELIVERY: "delivery",
  PAYMENT: "payment",
};

export const STEPS = [
  { id: STEP.SIGN_IN, number: 1, label: "Signed in" },
  { id: STEP.ADDRESS, number: 2, label: "Address" },
  { id: STEP.DELIVERY, number: 3, label: "Delivery" },
  { id: STEP.PAYMENT, number: 4, label: "Payment" },
];

export const getStepIndex = (id) => STEPS.findIndex((s) => s.id === id);

// ── Pricing rules (unchanged from the previous checkout) ─────
export const HOME_CITY = "Karachi";
export const SHIPPING_FEE = { KARACHI: 200, OTHER: 400 };
export const COD_FEE_RATE = 0.04; // 4%, only for COD outside Karachi
export const MAX_ITEM_QTY = 10;
export const COUNTRY_VALUE = "pakistan";

// ── Options ──────────────────────────────────────────────────
export const NEW_ADDRESS = "new";
export const ADDRESS_LABELS = ["Home", "Office", "Parents", "Other"];

export const DELIVERY = {
  STANDARD: "standard",
  SAME_DAY: "same-day",
  PICKUP: "pickup",
};

export const PAYMENT = {
  BANK: "banktransfer", // API value
  COD: "cod", // API value
};

// ── Business copy / config (edit to match your policies) ─────
export const SAME_DAY = {
  cutoffHour: 15, // 3 pm Pakistan time
  workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

export const STORE = { name: "Clifton" };

export const DELIVERY_NOTES = {
  karachi:
    "Open-parcel in Karachi: open and check your order before you pay the rider.",
};

// Green reassurance box under the order summary. Set to null to hide.
export const SUMMARY_NOTE =
  "We will send you a video of your exact unit on WhatsApp before we ship it. Approve it, or tell us if anything is not right.";

export const BANK_DETAILS = {
  bankName: "Bank Alfalah",
  accountTitle: "VISION TECH",
  accountNumber: "00311009188805",
  branchCode: "0031",
  iban: "PK27ALFH0031001009188805",
  whatsapp: "+92 3260220581",
};

export const FOOTER_LINKS = [
  { label: "Privacy", href: "/why-us/privacy-policy" },
  { label: "Return policy", href: "/why-us/return-policy" },
  { label: "Order procedure", href: "/why-us/order-procedure" },
  // { label: "Terms", href: "/terms" },
];

export const SUPPORT_WHATSAPP = process.env.NEXT_PUBLIC_ADMIN_NUMBER;

/**
 * The order API currently accepts the legacy payload. When false, new data
 * (area, landmark, delivery method) is folded into `appartment` so nothing is
 * lost. Flip to true once the backend accepts the extra fields.
 */
export const INCLUDE_EXTENDED_ORDER_FIELDS = false;
