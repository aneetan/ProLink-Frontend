import type { RequirementFormData } from "../client/requirement.types";

export interface BidRequestData {
   id: number;
  userId: number;
  companyId: number;
  requirementId: number;
  requestedAt: Date;
  status?: "SENT" | "DECLINED";
  userName?: string;
  requirement?: RequirementFormData;
}