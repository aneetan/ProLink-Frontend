export const DOCUMENT_TYPES = [
  { value: 'logo', label: 'Company Logo' },
  { value: 'business_license', label: 'Business License' },
  { value: 'tax_certificate', label: 'Tax Registration Certificate' },
  { value: 'owner_id', label: 'Owner Identity' },
] as const;

export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
export const ALLOWED_LOGO_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
export const MAX_FILE_SIZE = 10 * 1024 * 1024;