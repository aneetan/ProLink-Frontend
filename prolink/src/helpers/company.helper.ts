import type { FormData as CompanyData} from "../types/company.types";

export const createCompanyFormData = (data: CompanyData): FormData => {
  const formData = new FormData();
  
  console.log('=== Creating FormData ===');
  
  // Step 2.1: Add companyInfoSchema as JSON string
  const companyInfoString = JSON.stringify(data.companyInfo);
  formData.append('companyInfoSchema', companyInfoString);
  console.log('Added companyInfoSchema:', companyInfoString);
  
  // Step 2.2: Add servicePricingSchema as JSON string
  const servicePricingString = JSON.stringify(data.servicePricing);
  formData.append('servicePricingSchema', servicePricingString);
  console.log('Added servicePricingSchema:', servicePricingString);
  
  // Step 2.3: Add files with exact field names
  if (data.docs.logo && data.docs.logo instanceof File) {
    formData.append('logo', data.docs.logo);
    console.log('Added logo file:', data.docs.logo.name);
  } else {
    console.log('No logo file found');
  }
  
  if (data.docs.businessLicense && data.docs.businessLicense instanceof File) {
    formData.append('businessLicense', data.docs.businessLicense);
    console.log('Added businessLicense file:', data.docs.businessLicense.name);
  } else {
    console.log('No businessLicense file found');
  }
  
  if (data.docs.taxCertificate && data.docs.taxCertificate instanceof File) {
    formData.append('taxCertificate', data.docs.taxCertificate);
    console.log('Added taxCertificate file:', data.docs.taxCertificate.name);
  } else {
    console.log('No taxCertificate file found');
  }
  
  if (data.docs.ownerId && data.docs.ownerId instanceof File) {
    formData.append('ownerId', data.docs.ownerId);
    console.log('Added ownerId file:', data.docs.ownerId.name);
  } else {
    console.log('No ownerId file found');
  }
  
  // Step 2.4: Add userId
  formData.append('userId', data.userId!.toString());
  console.log('Added userId:', data.userId!.toString());
  
  console.log('=== FormData Creation Complete ===');
  return formData;
};