export const APP_EVENTS = {
  OPEN_DEALS_SHEET: "wegot:open-deals-sheet",
};

export const emitEvent = (eventName, detail = {}) => {
  window.dispatchEvent(new CustomEvent(eventName, { detail }));
};
