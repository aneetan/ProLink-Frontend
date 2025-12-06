export interface RequirementFormData {
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