import React, { useState } from "react";
import AddPaymentModal, { type PaymentMethodUnion } from "../../../components/modal/AddPaymentModal";
import { usePaymentMethodMutations, usePaymentMethods } from "../../../hooks/usePaymentMethodMutation";

const PaymentMethods: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState<PaymentMethodUnion | null>(null);

  // React Query hooks
  const { data, isLoading, error } = usePaymentMethods();
  const paymentMethods = data?.body || [];
  
  const { createPaymentMethod, updatePaymentMethod, deletePaymentMethod } = usePaymentMethodMutations();

  // Check existing types for validation
  const existingEsewa = paymentMethods.some(method => method.type === 'ESEWA');
  const existingStripe = paymentMethods.some(method => method.type === 'STRIPE');

  // Handle add payment method
  const handleAddPayment = (methodData: Omit<PaymentMethodUnion, "id"> | PaymentMethodUnion) => {
    createPaymentMethod.mutate(methodData as Omit<PaymentMethodUnion, "id">, {
      onSuccess: () => {
        setShowModal(false);
        setEditingPayment(null);
      },
    });
  };

  // Handle edit payment method
  const handleEditPayment = (payment: PaymentMethodUnion) => {
    setEditingPayment(payment);
    setShowModal(true);
  };

  // Handle update payment method
  const handleUpdatePayment = (updatedPayment: Omit<PaymentMethodUnion, "id"> | PaymentMethodUnion) => {
    if (!editingPayment) return;

    // Check if it's a full PaymentMethodUnion with id
    if ('id' in updatedPayment) {
      updatePaymentMethod.mutate(
        { id: updatedPayment.id, updates: updatedPayment },
        {
          onSuccess: () => {
            setEditingPayment(null);
            setShowModal(false);
          },
        }
      );
    } else {
      // Handle case where id might not be passed
      updatePaymentMethod.mutate(
        { id: editingPayment.id, updates: updatedPayment },
        {
          onSuccess: () => {
            setEditingPayment(null);
            setShowModal(false);
          },
        }
      );
    }
  };

  // Handle delete payment method
  const handleDeletePayment = (id: string) => {
    if (window.confirm("Are you sure you want to delete this payment method?")) {
      deletePaymentMethod.mutate(id);
    }
  };

  // Handle save based on mode
  const handleSave = (payment: Omit<PaymentMethodUnion, "id"> | PaymentMethodUnion) => {
    if (editingPayment) {
      handleUpdatePayment(payment);
    } else {
      handleAddPayment(payment);
    }
  };

  // Get payment icon
  const getPaymentIcon = (type: string) => {
    switch (type) {
      case "ESEWA":
        return "📱";
      case "STRIPE":
        return "💳";
      default:
        return "💰";
    }
  };

  // Get display text for payment method
  const getPaymentDisplayText = (method: PaymentMethodUnion) => {
    if (method.type === "ESEWA") {
      return `${method.accountName} • ${method.phoneNumber}`;
    } else if (method.type === "STRIPE") {
      return `${method.businessName || "Stripe Account"}`;
    }
    return "Unknown Payment Method";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
        <button
          onClick={() => {
            setEditingPayment(null);
            setShowModal(true);
          }}
          className="bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white px-4 py-2 rounded-md disabled:opacity-50"
          disabled={isLoading || createPaymentMethod.isPending}
        >
          + Add Payment Method
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Failed to load payment methods
        </div>
      )}

      {/* Payment Methods List */}
      <div className="space-y-4">
        {isLoading && paymentMethods.length === 0 ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading payment methods...</p>
          </div>
        ) : paymentMethods.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No payment methods added</p>
            <p className="text-sm text-gray-400 mt-1">
              Add your first payment method to start accepting payments
            </p>
          </div>
        ) : (
          paymentMethods.map((method) => (
            <div
              key={method.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{getPaymentIcon(method.type)}</span>
                  <div>
                    <p className="font-medium text-gray-900">
                      {method.type === "ESEWA"
                        ? method.accountName
                        : method.businessName || "Stripe Account"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {getPaymentDisplayText(method)}
                      {method.isDefault && (
                        <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                      {method.type.toLowerCase()}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEditPayment(method)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:opacity-50"
                    disabled={
                      updatePaymentMethod.isPending ||
                      deletePaymentMethod.isPending
                    }
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePayment(method.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                    disabled={
                      updatePaymentMethod.isPending ||
                      deletePaymentMethod.isPending
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Payment Modal */}
      {(showModal || editingPayment) && (
        <AddPaymentModal
          onClose={() => {
            setShowModal(false);
            setEditingPayment(null);
          }}
          onSave={handleSave}
          payment={editingPayment}
          loading={
            editingPayment
              ? updatePaymentMethod.isPending
              : createPaymentMethod.isPending
          }
          isEdit={!!editingPayment}
          existingEsewa={existingEsewa && !editingPayment?.id}
          existingStripe={existingStripe && !editingPayment?.id}
        />
      )}
    </div>
  );
};

export default PaymentMethods;