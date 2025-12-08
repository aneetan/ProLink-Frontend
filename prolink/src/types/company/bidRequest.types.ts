import type { RequirementFormData } from "../client/requirement.types";

export enum BidStatus { 'DECLINED' , 'ACCEPTED' , 'INITIATED' , 'PENDING'}

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
  status?: string;
  submittedDate?: Date;
}

export interface RequirementsWithBidsResponse {
  success: boolean;
  message: string;
  data: {
    requirements: BidRequestData[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface GetRequirementsWithBidsParams {
  companyId: number;
  status?: string;
  page?: number;
  limit?: number;
}


// Update your Quote type
export interface Quote {
  id: number;
  amount: number;
  deliveryTime: string;
  message?: string;
  status?: string;
  submittedDate?: string;
  companyName?: string; // For backward compatibility
  companyId?: number;
  company?: {
    id: number;
    name: string;
    docs?: Array<{
      logo?: string;
    }>;
  };
}