import type { ServicePricing, StepProps } from "../../../types/company.types";


export default function ServicePricingStep({ formData, updateFormData }: StepProps) {
  const updateServicePricing = (field: keyof ServicePricing, value: string) => {
    updateFormData({
      servicePricing: { ...formData.servicePricing, [field]: value }
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Service & Pricing</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Services Offered *
          </label>
          <textarea
            value={formData.servicePricing.servicesOffered}
            onChange={(e) => updateServicePricing('servicesOffered', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none"
            placeholder="List the services you offer (e.g., Web Development, Mobile App Design, UI/UX Consulting)"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Price ($)
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
              Maximum Price ($)
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
              Avg. Delivery Time
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
      </div>
    </div>
  );
}