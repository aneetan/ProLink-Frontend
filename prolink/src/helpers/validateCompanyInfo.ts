import type { CompanyInfo, ServicePricing } from "../types/company.types";

export const validateField = (field: keyof CompanyInfo | keyof Omit<ServicePricing, 'servicesOffered'>, value: string): string => {
   switch(field){
      case 'name':
         if (!value.trim()) return 'Company name is required';
         if (value.trim().length < 2) return 'Company name must be at least 2 characters';
         if (value.trim().length > 100) return 'Company name must be less than 100 characters';
         return '';
      
      case 'registrationNo': 
         if (!value.trim()) return 'Registration number is required';
         if (isNaN(Number(value.trim()))) return 'Invalid Registration number';
         return '';

      case 'establishedYear': {
         const year = parseInt(value);
        const currentYear = new Date().getFullYear();
        if (!value.trim()) return 'Established year is required';
       
        if (isNaN(year)) return 'Please enter a valid year';
        if (year < 1900) return 'Year must be after 1900';
        if (year > currentYear) return `Year cannot be in the future`;
        return '';
      }
      
      case 'serviceCategory':
        if (!value.trim()) return 'Service category is required';
        return '';
      
      case 'websiteUrl':
        if (value.trim()) {
          try {
            const url = new URL(value);
            if (!['http:', 'https:'].includes(url.protocol)) {
              return 'Website URL must start with http:// or https://';
            }
          } catch {
            return 'Please enter a valid website URL';
          }
        }
        return '';
      
      case 'description':
        if (!value.trim()) return 'Company description is required';
        if (value.trim().length < 10) return 'Description must be at least 10 characters';
        if (value.trim().length > 1000) return 'Description must be less than 1000 characters';
        return '';
      
      case "priceRangeMin":
        if (!value.trim()) return 'Min price range is required';
        return '';

      case "priceRangeMax":
        if (!value.trim()) return 'Max price range is required';
        return '';


      case "avgDeliveryTime":
        if (!value.trim()) return 'Delivery time is required';
        return '';
      
      default:
        return '';
   }
} 