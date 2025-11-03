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
  priceRangeMin: string;
  priceRangeMax: string;
  avgDeliveryTime: string;
}

export interface VerificationDocument {
  id: string;
  type: string;
  file: File | null;
  previewUrl?: string;
  status: 'pending' | 'uploaded' | 'rejected';
  uploadedAt?: Date;
}

export interface CompanyVerificationData {
  logo: File | null;
  businessLicense: File | null;
  taxCertificate: File | null;
  ownerId: File | null;
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


export type  FormData = {
  companyInfo: CompanyInfo;
  servicePricing: ServicePricing;
  docs: CompanyVerificationData
};



export interface StepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack?: () => void;
}