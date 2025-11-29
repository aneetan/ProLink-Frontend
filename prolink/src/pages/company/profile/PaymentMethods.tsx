import React, { useState } from 'react';

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_transfer' | 'digital_wallet';
  details: string;
  isDefault: boolean;
}

interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[];
  onPaymentMethodsUpdate: (methods: PaymentMethod[]) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ 
  paymentMethods, 
  onPaymentMethodsUpdate 
}) => {
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newPayment, setNewPayment] = useState({
    type: 'card' as const,
    details: '',
    isDefault: false
  });

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPayment.details.trim()) {
      const updatedMethods = newPayment.isDefault 
        ? paymentMethods.map(method => ({ ...method, isDefault: false }))
        : [...paymentMethods];
      
      updatedMethods.push({
        id: Date.now().toString(),
        ...newPayment
      });
      
      onPaymentMethodsUpdate(updatedMethods);
      setNewPayment({ type: 'card', details: '', isDefault: false });
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

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'card': return '💳';
      case 'bank_transfer': return '🏦';
      case 'digital_wallet': return '📱';
      default: return '💰';
    }
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
                onChange={(e) => setNewPayment({...newPayment, type: e.target.value as any})}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="card">Credit/Debit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="digital_wallet">Digital Wallet</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
              <input
                type="text"
                value={newPayment.details}
                onChange={(e) => setNewPayment({...newPayment, details: e.target.value})}
                placeholder="Card number, account details, etc."
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="defaultPayment"
                checked={newPayment.isDefault}
                onChange={(e) => setNewPayment({...newPayment, isDefault: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="defaultPayment" className="ml-2 text-sm text-gray-700">
                Set as default payment method
              </label>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
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
      case 'card': return '💳';
      case 'bank_transfer': return '🏦';
      case 'digital_wallet': return '📱';
      default: return '💰';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-2xl">{getPaymentIcon(method.type)}</span>
          <div>
            <p className="font-medium text-gray-900">{method.details}</p>
            <p className="text-sm text-gray-500 capitalize">
              {method.type.replace('_', ' ')}
              {method.isDefault && (
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Default
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {!method.isDefault && (
            <button
              onClick={() => onSetDefault(method.id)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
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