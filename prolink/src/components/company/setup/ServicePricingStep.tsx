import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import type { ServicePricing, StepProps } from "../../../types/company.types";
import { validateField } from "../../../helpers/validateCompanyInfo";
import { FaAngleLeft, FaArrowRight } from "react-icons/fa";


const ServicePricingStep: React.FC<StepProps> = ({ formData, updateFormData, onNext, onBack }) => {
  //service input
  const [currentServiceInput, setCurrentServiceInput] = useState<string>("");
  const [error, setError] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleServiceInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentServiceInput(e.target.value);
    setError(''); // Clear error when user types
  };

  const handleServiceKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addService();
    }
  };

  const addService = (): void => {
    const service = currentServiceInput.trim();
    
    // Validation checks
    if (!service) {
      setError('Service cannot be empty');
      return;
    }

    if (formData.servicePricing.servicesOffered.includes(service)) {
      setError('Service already exists');
      return;
    }

    if (formData.servicePricing.servicesOffered.length >= 5) {
      setError('Maximum 5 services allowed');
      return;
    }

    // Add service
    const updatedServices = [...formData.servicePricing.servicesOffered, service];
    updateServicePricing('servicesOffered', updatedServices);
    setCurrentServiceInput('');
    setError('');
  };


  const updateServicePricing = (field: keyof ServicePricing, value: string[] | string) => {
    updateFormData({
      servicePricing: {
        ...formData.servicePricing,
        [field]: value }
    });

    if(errors[field]) {
      setErrors(prev => ({ ...prev, [field]: ''}))
    }
  };

  const removeService = (serviceToRemove: string): void => {
    const updatedServices = formData.servicePricing.servicesOffered.filter(
      service => service !== serviceToRemove
    );
    updateServicePricing('servicesOffered', updatedServices);
    setError('');
  };

  const validateForm = (): boolean => {
      const newErrors: Record<string, string> = {};
      const fields: (keyof Omit<ServicePricing, "servicesOffered">)[] = [
        "priceRangeMin",
        "priceRangeMax",
        "avgDeliveryTime"
      ]
  
      fields.forEach(field => {
        const error = validateField(field, String(formData.servicePricing[field] ?? ''));
        if (error) {
          newErrors[field] = error;
        }
      });
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const handleBack = () => {
      onBack!();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Service & Pricing</h2>
      
      <form className="space-y-6" onSubmit={handleFormSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Services Offered
              <span className="text-xs text-gray-500 ml-2">
          ({formData.servicePricing.servicesOffered.length}/5) - Minimum 3 required
        </span>
          </label>
           {formData.servicePricing.servicesOffered.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {formData.servicePricing.servicesOffered.map((service, index) => (
            <div
              key={index}
              className='flex items-center px-3 py-1 rounded-full text-sm bg-teal-100 text-teal-800'
            >
              <span>{service}</span>
              <button
                type="button"
                onClick={() => removeService(service)}
                className="ml-2 focus:outline-none text-teal-600 hover:text-teal-800 cursor-pointer"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Textarea */}
      <textarea
        value={currentServiceInput}
        onChange={handleServiceInputChange}
        onKeyDown={handleServiceKeyDown}
        rows={3}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none
           bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed' 
        } ${error ? 'border-red-500' : ''}`}
        placeholder="e.g., Web Development, Mobile App Design, UI/UX Consulting"
      />
      
      {/* Error and Helper text */}
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
      
      <p className="text-xs text-gray-500 mt-1">
        Type and press Enter to add each service as a tag ({formData.servicePricing.servicesOffered.length}/5)
      </p>

      {/* Validation status */}
      {formData.servicePricing.servicesOffered.length < 3 && (
        <p className="text-xs text-amber-600 mt-1">
          {3 - formData.servicePricing.servicesOffered.length} more service(s) required
        </p>
      )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Price Range (Rs)
            </label>
            <input
              type="number"
              value={formData.servicePricing.priceRangeMin}
              onChange={(e) => updateServicePricing('priceRangeMin', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              placeholder="0"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Price Range (Rs)
            </label>
            <input
              type="number"
              value={formData.servicePricing.priceRangeMax}
              onChange={(e) => updateServicePricing('priceRangeMax', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              placeholder="10000"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Average Delivery Time
            </label>
            <input
              type="text"
              value={formData.servicePricing.avgDeliveryTime}
              onChange={(e) => updateServicePricing('avgDeliveryTime', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              placeholder="e.g., 2 weeks, 30 days"
            />
          </div>
        </div>
        <div className="flex items-center justify-between w-full md:col-span-2">
            <div>
              <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 rounded-lg font-medium transition-colors text-gray-700  cursor-pointer"
            >
               <div className='flex gap-1 items-center'>
                  <FaAngleLeft/> Back
             </div>
            </button>
            </div>
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

export default ServicePricingStep