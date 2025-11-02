import type { PaymentMethod, StepProps } from "../../../types/company.types";

export const PAYMENT_TYPES = [
  'Bank Transfer',
  'Credit Card',
  'Digital Wallet',
  'Cash',
  'Escrow'
];


export default function PaymentMethodsStep({ formData, updateFormData }: StepProps) {
  const addPaymentMethod = () => {
    updateFormData({
      paymentMethods: [
        ...formData.paymentMethods,
        { type: '', details: '' }
      ]
    });
  };

  const updatePaymentMethod = (index: number, field: keyof PaymentMethod, value: string) => {
    const updatedMethods = formData.paymentMethods.map((method, i) =>
      i === index ? { ...method, [field]: value } : method
    );
    updateFormData({ paymentMethods: updatedMethods });
  };

  const removePaymentMethod = (index: number) => {
    updateFormData({
      paymentMethods: formData.paymentMethods.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
        <button
          type="button"
          onClick={addPaymentMethod}
          className="px-4 py-2  text-blue-500 rounded-lg transition-colors flex items-center space-x-2"
        >
          <span>+ Add Method</span>
        </button>
      </div>

      <div className="space-y-6">
        {formData.paymentMethods.map((method, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Payment Method {index + 1}</h3>
              <button
                type="button"
                onClick={() => removePaymentMethod(index)}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Type
                </label>
                <select
                  value={method.type}
                  onChange={(e) => updatePaymentMethod(index, 'type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                >
                  <option value="">Select type</option>
                  {PAYMENT_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Details
                </label>
                <input
                  type="text"
                  value={method.details}
                  onChange={(e) => updatePaymentMethod(index, 'details', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  placeholder="Account number, email, or wallet ID"
                />
              </div>
            </div>
          </div>
        ))}

        {formData.paymentMethods.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <p className="text-gray-500 mb-4">No payment methods added yet</p>
            <button
              type="button"
              onClick={addPaymentMethod}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Add Payment Method
            </button>
          </div>
        )}
      </div>
    </div>
  );
}