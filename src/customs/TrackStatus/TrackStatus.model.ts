export interface TrackStatusProps {
  appliedDate?: string;
  status: string;
  alignment?: "vertical" | "horizontal";
}

export const StatusOrder = [
  "application sent",
  "application viewed",
  "resume viewed",
  "application rejected",
  "application considered",
  "awaiting recruiter action",
];

export const StatusPendingOrder = [
  "application sent",
  "application viewed",
  "resume viewed",
  "awaiting recruiter action",
];
