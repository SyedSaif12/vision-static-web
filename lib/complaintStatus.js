import { COMPLAINT_STATUS_STEPS } from "@/constant/complaintStatus";

export const buildComplaintStatus = (currentStatus) => {
  const currentIndex = COMPLAINT_STATUS_STEPS.findIndex(
    (item) => item.id === currentStatus,
  );

  return COMPLAINT_STATUS_STEPS.map((item, index) => ({
    ...item,
    isComplete: currentIndex >= index,
  }));
};
