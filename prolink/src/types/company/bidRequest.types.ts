import type { RequirementFormData } from "../client/requirement.types";

type BidStatus = 'DECLINED' | 'ACCEPTED' | 'INITIATED' | 'PENDING'

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

// Types
export interface BidFormData {
  id?: number;
  amount: number;
  message: string;
  deliveryTime: string;
  termsAccepted: boolean;
  companyId?: number;
  requirementId?: number;
  status?: BidStatus;
  submittedDate?: Date;
}