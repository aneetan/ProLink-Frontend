export interface CompanyInfo {
  name: string;
  registrationNo: string;
  description: string;
  establishedYear: string;
  logo: string;
  serviceCategory: string;
  websiteUrl: string;
}

export interface ServicePricing {
  servicesOffered: string[];
  priceRangeMin: string;
  priceRangeMax: string;
  avgDeliveryTime: string;
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
  pastProjects: PastProject[];
  paymentMethods: PaymentMethod[];
};

export interface StepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}