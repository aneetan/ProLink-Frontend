import { useState } from 'react';
import type { FormData } from '../../types/company.types';
import CompanyInfoStep from '../../components/company/setup/CompanyInfoStep';
import ServicePricingStep from '../../components/company/setup/ServicePricingStep';
import PaymentMethodsStep from '../../components/company/setup/PaymentMethodSteps';
import { FaAngleLeft } from 'react-icons/fa6';
import { FaArrowRight } from 'react-icons/fa';
import UploadDocuments from '../../components/company/setup/UploadDocuments';

export default function CompanyProfileSetup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    companyInfo: {
      name: '',
      registrationNo: '',
      description: '',
      establishedYear: '',
      logo: '',
      serviceCategory: '',
      websiteUrl: ''
    },
    servicePricing: {
      servicesOffered: [],
      priceRangeMin: '',
      priceRangeMax: '',
      avgDeliveryTime: ''
    },
    pastProjects: [],
    paymentMethods: []
  });

  const steps = [
    { number: 1, title: 'Company Info' },
    { number: 2, title: 'Service & Pricing' },
    { number: 3, title: 'Verification Document' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Profile setup completed!');
  };

  const renderStep = () => {
    const stepProps = { formData, updateFormData };
    
    switch (currentStep) {
      case 1:
        return <CompanyInfoStep {...stepProps} />;
      case 2:
        return <ServicePricingStep {...stepProps} />;
      case 3:
        return <UploadDocuments onSubmit={handleSubmit} {...stepProps} />;
      default:
        return <CompanyInfoStep {...stepProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Company Profile Setup
          </h1>
          <p className="text-sm text-gray-600">
            Complete your profile to start getting clients
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between relative">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center flex-1">
                <div className="flex items-center">
                  {/* Connector line */}
                  {index > 0 && (
                    <div
                      className={`flex-1 h-1 ${
                        currentStep > step.number ? 'bg-teal-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                  
                  {/* Step circle */}
                  <div
                    className={`flex items-center justify-center w-7 h-7 rounded-full border-2 ${
                      currentStep >= step.number
                        ? 'bg-teal-600 border-teal-600 text-white'
                        : 'border-gray-300 text-gray-500'
                    } font-semibold text-sm transition-all duration-300`}
                  >
                    {currentStep > step.number ? '✓' : step.number}
                  </div>

                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 ${
                        currentStep > step.number ? 'bg-teal-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
                
                {/* Step title */}
                <span
                  className={`text-xs sm:text-sm font-medium mt-2 ${
                    currentStep >= step.number ? 'text-teal-600' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700  cursor-pointer'
              }`}
            >
               <div className='flex gap-1 items-center'>
                  <FaAngleLeft/> Back
             </div>
            </button>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Step {currentStep} of {steps.length}
              </span>
              
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium flex  gap-2 items-center"
                >
                  Next <FaArrowRight/>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors font-medium"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}