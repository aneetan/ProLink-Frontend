import React, { useState, useEffect } from 'react';
import type { PaymentMethod } from '../../types/company/payment.type';

interface AddPaymentModalProps {
  onClose: () => void;
  onSave: (method: Omit<PaymentMethod, 'id'>) => void;
  editingMethod?: PaymentMethod | null;
  loading?: boolean;
}

const AddPaymentModal: React.FC<AddPaymentModalProps> = ({ 
  onClose, 
  onSave, 
  editingMethod = null,
  loading = false 
}) => {
  const [formData, setFormData] = useState<Omit<PaymentMethod, 'id'>>({
    type: 'ESEWA',
    accountName: '',
    accountNumber: '',
    isDefault: false
  });

  useEffect(() => {
    if (editingMethod) {
      setFormData({
        type: editingMethod.type,
        accountName: editingMethod.accountName,
        accountNumber: editingMethod.accountNumber,
        isDefault: editingMethod.isDefault
      });
    }
  }, [editingMethod]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.accountName.trim() && formData.accountNumber.trim() && !loading) {
      onSave(formData);
    }
  };

  const handleChange = (field: keyof Omit<PaymentMethod, 'id'>, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingMethod ? 'Edit Payment Method' : 'Add Payment Method'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={loading}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value as 'ESEWA' | 'STRIPE')}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
                required
              >
                <option value="ESEWA">eSewa</option>
                <option value="STRIPE">Stripe</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Name *
              </label>
              <input
                type="text"
                value={formData.accountName}
                onChange={(e) => handleChange('accountName', e.target.value)}
                placeholder="Account holder name"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Number *
              </label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => handleChange('accountNumber', e.target.value)}
                placeholder="Account number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={loading}
              />
            </div>

            {!editingMethod && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="defaultPayment"
                  checked={formData.isDefault}
                  onChange={(e) => handleChange('isDefault', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  disabled={loading}
                />
                <label htmlFor="defaultPayment" className="ml-2 text-sm text-gray-700">
                  Set as default payment method
                </label>
              </div>
            )}

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[var(--primary-color)] text-white px-4 py-2 rounded-md hover:bg-[var(--primary-dark)] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : (editingMethod ? 'Update' : 'Add Payment Method')}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentModal;