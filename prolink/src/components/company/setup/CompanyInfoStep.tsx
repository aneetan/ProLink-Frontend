import React, { useState } from "react";
import type { CompanyInfo, StepProps } from "../../../types/company.types";
import { validateField } from "../../../helpers/validateCompanyInfo";
import { FaArrowRight } from "react-icons/fa";

const SERVICE_CATEGORIES = [
  'MEP (Mechanical, Electrical and Plumbing)',
  'IT (Information Technology)',
  'Others'
];

const CompanyInfoStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
  onNext
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateCompanyInfo = (field: keyof CompanyInfo, value: string) => {
    updateFormData({
      companyInfo: { ...formData.companyInfo, [field]: value }
    });

    //Clear error when user starts typing
    if(errors[field]) {
      setErrors(prev => ({ ...prev, [field]: ''}))
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const fields: (keyof CompanyInfo)[] = [
      'name', 
      'registrationNo', 
      'establishedYear', 
      'serviceCategory', 
      'description'
    ]

    fields.forEach(field => {
      const error = validateField(field, formData.companyInfo[field] || '');
      if (error) {
        newErrors[field] = error;
      }
    });

    if (formData.companyInfo.websiteUrl) {
      const websiteError = validateField('websiteUrl', formData.companyInfo.websiteUrl);
      if (websiteError) {
        newErrors.websiteUrl = websiteError;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Information</h2>       

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleFormSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
            <span className="text-red-500 text-xs"> * </span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.companyInfo.name}
            onChange={(e) => updateCompanyInfo('name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            placeholder="Enter company name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1 flex items-center"> {errors.name} </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Registration Number
            <span className="text-red-500 text-xs"> * </span>
          </label>
          <input
            type="text"
            name="registrationNo"
            value={formData.companyInfo.registrationNo}
            onChange={(e) => updateCompanyInfo('registrationNo', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            placeholder="Enter registration number"
          />
          {errors.registrationNo && (
            <p className="text-red-500 text-xs mt-1 flex items-center"> {errors.registrationNo} </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Established Year
            <span className="text-red-500 text-xs"> * </span>
          </label>
          <input
            type="number"
            name="establishedYear"
            value={formData.companyInfo.establishedYear}
            onChange={(e) => updateCompanyInfo('establishedYear', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            placeholder="YYYY"
            min="1900"
            max={new Date().getFullYear()}
          />
          {errors.establishedYear && (
            <p className="text-red-500 text-xs mt-1 flex items-center"> {errors.establishedYear} </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Category
            <span className="text-red-500 text-xs"> * </span>
          </label>
          <select
            name="serviceCategory"
            value={formData.companyInfo.serviceCategory}
            onChange={(e) => updateCompanyInfo('serviceCategory', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
          >
            <option value="">Select category</option>
            {SERVICE_CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.serviceCategory && (
            <p className="text-red-500 text-xs mt-1 flex items-center"> {errors.serviceCategory} </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website URL
          </label>
          <input
            type="url"
            name="websiteUrl"
            value={formData.companyInfo.websiteUrl}
            onChange={(e) => updateCompanyInfo('websiteUrl', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            placeholder="https://example.com"
          />
          {errors.websiteUrl && (
            <p className="text-red-500 text-xs mt-1 flex items-center"> {errors.websiteUrl} </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Description <span className="text-red-500 text-xs"> * </span>
          </label>
          <textarea
            name="description"
            value={formData.companyInfo.description}
            onChange={(e) => updateCompanyInfo('description', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none"
            placeholder="Tell us about your company, mission, and values..."
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1 flex items-center"> {errors.description} </p>
          )}
        </div>

        <div className="flex items-center justify-between w-full md:col-span-2">
          <div></div>
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium flex  gap-2 items-center"
          >
            Next <FaArrowRight/>
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompanyInfoStep;