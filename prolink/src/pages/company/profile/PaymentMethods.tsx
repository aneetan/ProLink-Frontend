import React, { useState } from 'react';
import type { PaymentMethod } from '../../../types/company/payment.type';

interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[];
  onPaymentMethodsUpdate: (methods: PaymentMethod[]) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ 
  paymentMethods, 
  onPaymentMethodsUpdate 
}) => {
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newPayment, setNewPayment] = useState<Omit<PaymentMethod, 'id'>>({
    type: 'ESEWA',
    accountName: '',
    accountNumber: '',
    isDefault: false
  });

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPayment.accountName.trim() && newPayment.accountNumber.trim()) {
      const updatedMethods = newPayment.isDefault 
        ? paymentMethods.map(method => ({ ...method, isDefault: false }))
        : [...paymentMethods];
      
      updatedMethods.push({
        id: Date.now().toString(),
        ...newPayment
      });
      
      onPaymentMethodsUpdate(updatedMethods);
      setNewPayment({ 
        type: 'ESEWA', 
        accountName: '', 
        accountNumber: '', 
        isDefault: false 
      });
      setShowAddPayment(false);
    }
  };

  const setDefaultPayment = (id: string) => {
    const updatedMethods = paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    }));
    onPaymentMethodsUpdate(updatedMethods);
  };

  const removePayment = (id: string) => {
    const updatedMethods = paymentMethods.filter(method => method.id !== id);
    onPaymentMethodsUpdate(updatedMethods);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
        <button
          onClick={() => setShowAddPayment(true)}
          className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-md hover:bg-[var(--primary-dark)] transition-colors text-sm font-medium"
        >
          Add Payment Method
        </button>
      </div>

      {/* Add Payment Form */}
      {showAddPayment && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Payment Method</h3>
          <form onSubmit={handleAddPayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={newPayment.type}
                onChange={(e) => setNewPayment({...newPayment, type: e.target.value as 'ESEWA' | 'STRIPE'})}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="ESEWA">eSewa</option>
                <option value="STRIPE">Stripe</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
              <input
                type="text"
                value={newPayment.accountName}
                onChange={(e) => setNewPayment({...newPayment, accountName: e.target.value})}
                placeholder="Account holder name"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
              <input
                type="text"
                value={newPayment.accountNumber}
                onChange={(e) => setNewPayment({...newPayment, accountNumber: e.target.value})}
                placeholder="Account number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="defaultPayment"
                checked={newPayment.isDefault}
                onChange={(e) => setNewPayment({...newPayment, isDefault: e.target.checked})}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="defaultPayment" className="ml-2 text-sm text-gray-700">
                Set as default payment method
              </label>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors text-sm font-medium"
              >
                Add Payment Method
              </button>
              <button
                type="button"
                onClick={() => setShowAddPayment(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Payment Methods List */}
      <div className="space-y-4">
        {paymentMethods.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No payment methods added</p>
          </div>
        ) : (
          paymentMethods.map(method => (
            <PaymentMethodCard 
              key={method.id} 
              method={method} 
              onSetDefault={setDefaultPayment}
              onRemove={removePayment}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Payment Method Card Sub-component
const PaymentMethodCard: React.FC<{
  method: PaymentMethod;
  onSetDefault: (id: string) => void;
  onRemove: (id: string) => void;
}> = ({ method, onSetDefault, onRemove }) => {
  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'eSewa': return '📱';
      case 'Stripe': return '💳';
      default: return '💰';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-2xl">{getPaymentIcon(method.type)}</span>
          <div>
            <p className="font-medium text-gray-900">{method.accountName}</p>
            <p className="text-sm text-gray-500">
              {method.accountNumber}
              {method.isDefault && (
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Default
                </span>
              )}
            </p>
            <p className="text-sm text-gray-500 capitalize">
              {method.type}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {!method.isDefault && (
            <button
              onClick={() => onSetDefault(method.id)}
              className="text-teal-600 hover:text-teal-800 text-sm font-medium"
            >
              Set Default
            </button>
          )}
          <button
            onClick={() => onRemove(method.id)}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;