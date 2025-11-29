import React from 'react';
import type { CompanyInfo, ServicePricing } from '../../../types/company.types';

interface CompanyProfileProps {
  companyInfo: CompanyInfo;
  servicePricing: ServicePricing;
}

const CompanyProfile: React.FC<CompanyProfileProps> = ({ companyInfo, servicePricing }) => {
  return (
    <div className="space-y-6">
      {/* Company Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--primary-color)]">{companyInfo.name}</h1>
            <p className="text-gray-600 mt-2">{companyInfo.serviceCategory}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Est. {companyInfo.establishedYear}</p>
            <a 
              href={companyInfo.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Visit Website
            </a>
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Company Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">About Us</h3>
            <p className="text-gray-600 leading-relaxed">{companyInfo.description}</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Registration Number</label>
              <p className="mt-1 text-gray-900">{companyInfo.registrationNo}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Established</label>
              <p className="mt-1 text-gray-900">{companyInfo.establishedYear}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <p className="mt-1 text-gray-900">{companyInfo.serviceCategory}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services & Pricing */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Services & Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Services Offered</h3>
            <ul className="space-y-2">
              {servicePricing.servicesOffered.map((service, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price Range</label>
              <p className="mt-1 text-gray-900">
                ${servicePricing.priceRangeMin.toLocaleString()} - ${servicePricing.priceRangeMax.toLocaleString()}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Average Delivery Time</label>
              <p className="mt-1 text-gray-900">{servicePricing.avgDeliveryTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;