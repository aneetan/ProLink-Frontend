export interface RequirementFormData {
  id?: number;
  title: string;
  description: string;
  workType: 'REMOTE' | 'ONSITE';
  minimumBudget: number;
  maximumBudget: number;
  category: string;
  timeline: string;
  skills: string[];
  attachment?: string;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH';
  userId?: number;
}

export interface BidForRequirement {
  id: number;
  amount: number;
  status: string; 
  company: {
    name: string;
  };
}

export interface BidRequestForRequirement {
  id: number;
  userId: number;
  companyId: number;
  requirementId: number;
  requestedAt: string;  
  status: string;
}


export interface RequirementResponse {
  id: number;
  title: string;
  description: string;
  workType: "REMOTE" | "ONSITE";
  minimumBudget: number;
  maximumBudget: number;
  category: string;
  timeline: string;
  skills: string[];
  attachment: string;
  urgency: "LOW" | "MEDIUM" | "HIGH";
  createdAt: string;
  updatedAt: string;
  userId: number;

  // Relations
  bid: BidForRequirement[];
  bidRequest: BidRequestForRequirement[];
}

export interface ApiRequirementsResponse {
  success: boolean;
  requirements: RequirementResponse[];
}
