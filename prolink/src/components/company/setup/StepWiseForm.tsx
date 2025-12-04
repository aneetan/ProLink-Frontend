import { useState } from 'react';
import ServicePricingStep from './ServicePricingStep';
import CompanyInfoStep from './CompanyInfoStep';
import type { FormData } from '../../../types/company/company.types';
import UploadDocuments from './UploadDocuments';

interface StepWiseProps {
   initialData: FormData;
   onSubmit: (formData: FormData) => void;
}

const StepWiseForm: React.FC<StepWiseProps> = ({initialData, onSubmit}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialData);

    const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

   const handleFinalSubmit = () => {
    onSubmit(formData);
  };

  const renderCurrentForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <CompanyInfoStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <ServicePricingStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <UploadDocuments
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleFinalSubmit} 
            onBack={prevStep}
          />
        );
      default:
        return null;
    }
  };

  const steps = [
    { number: 1, title: 'Company Info' },
    { number: 2, title: 'Service & Pricing' },
    { number: 3, title: 'Verification Document' },
  ];

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
        <div className="flex items-center space-x-4 ml-4 mb-2">
            <span className="text-sm text-gray-500">
               Step {currentStep} of {steps.length}
            </span>
         </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl p-6 sm:p-8">
          {renderCurrentForm()}
        </div>
      </div>
    </div>
  );
}

export default StepWiseForm;