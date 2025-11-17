export interface CompanyInfo {
  name: string;
  registrationNo: string;
  description: string;
  establishedYear: string;
  serviceCategory: string;
  websiteUrl: string;
}

export interface ServicePricing {
  servicesOffered: string[];
  priceRangeMin: number;
  priceRangeMax: number;
  avgDeliveryTime: string;
}

export interface VerificationDocuments {
  logo: string;
  taxCertificate: string;
  businessLicense: string;
  ownerId: string;
}

export interface PastProject {
  title: string;
  description: string;
  image: string;
  year: string;
}

export interface PaymentMethod {
  type: string;
  details: string;
}

export interface FormData {
  companyInfo: CompanyInfo;
  servicePricing: ServicePricing;
  docs: VerificationDocuments;
  userId: number | null;
}

// Component props types
export interface StepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack?: () => void;
}

export interface CreateCompanyRequest {
  formData: FormData;
}