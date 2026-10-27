import { DELIVERY, SAME_DAY, STORE } from "./constants";
import { getBaseShippingFee, isKarachi } from "./pricing";

function karachiClock(now) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Karachi",
    hour: "numeric",
    hourCycle: "h23",
    weekday: "short",
  }).formatToParts(now);
  return {
    hour: Number(parts.find((p) => p.type === "hour")?.value),
    weekday: parts.find((p) => p.type === "weekday")?.value,
  };
}

export function isSameDayOpen(now = new Date()) {
  const { hour, weekday } = karachiClock(now);
  return SAME_DAY.workingDays.includes(weekday) && hour < SAME_DAY.cutoffHour;
}

/** Delivery options for a city, including availability + the reason when disabled. */
export function getDeliveryOptions({ city, now = new Date() }) {
  const karachi = isKarachi(city);
  const fee = getBaseShippingFee(city);

  return [
    {
      id: DELIVERY.STANDARD,
      title: "Standard delivery",
      description: karachi
        ? "Next working day"
        : "Delivered to your door by courier",
      fee,
      available: true,
    },
    {
      id: DELIVERY.SAME_DAY,
      title: "Same-day delivery",
      description: "Today, when you order before 3 pm on a working day",
      fee,
      available: karachi && isSameDayOpen(now),
      unavailableReason: karachi
        ? "Closed for today. Order before 3 pm on a working day."
        : "Available in Karachi only",
    },
    {
      id: DELIVERY.PICKUP,
      title: `Pick up at our ${STORE.name} store`,
      description: "Ready in about 2 hours. We message you on WhatsApp.",
      fee: 0,
      available: karachi,
      unavailableReason: "Available for Karachi orders only",
    },
  ];
}
