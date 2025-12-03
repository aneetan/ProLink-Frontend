import React from 'react';
import AddPaymentModal from '../../../components/modal/AddPaymentModal';
import type { PaymentMethod } from '../../../types/company/payment.type';
import { usePaymentMethodStore } from '../../../store/usePaymentMethodStore';

const PaymentMethods: React.FC = () => {
  const {
    paymentMethods,
    loading,
    error,
    editingPaymentMethod,
    showAddModal,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    setEditingPaymentMethod,
    setShowAddModal,
    clearError
  } = usePaymentMethodStore();

  const handleAddPayment = async (methodData: Omit<PaymentMethod, 'id'>) => {
    try {
      await addPaymentMethod(methodData);
    } catch (error) {
      console.error('Failed to add payment method:', error);
    }
  };

  const handleUpdatePayment = async (methodData: Omit<PaymentMethod, 'id'>) => {
    if (editingPaymentMethod) {
      try {
        await updatePaymentMethod(editingPaymentMethod.id, methodData);
      } catch (error) {
        console.error('Failed to update payment method:', error);
      }
    }
  };

  const handleDeletePayment = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      await deletePaymentMethod(id);
    }
  };

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'ESEWA': return '📱';
      case 'STRIPE': return '💳';
      default: return '💰';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-md hover:bg-[var(--primary-dark)] transition-colors text-sm font-medium disabled:opacity-50"
          disabled={loading}
        >
          Add Payment Method
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          <button
            onClick={clearError}
            className="float-right text-red-800 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}

      {/* Payment Methods List */}
      <div className="space-y-4">
        {loading && paymentMethods.length === 0 ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading payment methods...</p>
          </div>
        ) : paymentMethods.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No payment methods added</p>
          </div>
        ) : (
          paymentMethods.map(method => (
            <div key={method.id} className="border border-gray-200 rounded-lg p-4">
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
                    <p className="text-sm text-gray-500">
                      {method.type}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setEditingPaymentMethod(method)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:opacity-50"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePayment(method.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                    disabled={loading}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Payment Modal */}
      {showAddModal && (
        <AddPaymentModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddPayment}
          loading={loading}
        />
      )}

      {/* Edit Payment Modal */}
      {editingPaymentMethod && (
        <AddPaymentModal
          onClose={() => setEditingPaymentMethod(null)}
          onSave={handleUpdatePayment}
          editingMethod={editingPaymentMethod}
          loading={loading}
        />
      )}
    </div>
  );
};

export default PaymentMethods;