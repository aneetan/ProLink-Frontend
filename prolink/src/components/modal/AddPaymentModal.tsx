import React, { useEffect, useState } from "react";
import type { PaymentType, EsewaPaymentMethod, StripePaymentMethod } from "../../types/company/payment.type";

export type PaymentMethodUnion = EsewaPaymentMethod | StripePaymentMethod;

interface AddPaymentModalProps {
  onClose: () => void;
  onSave: (method: Omit<PaymentMethodUnion, "id"> | PaymentMethodUnion) => void;
  loading?: boolean;
  payment?: PaymentMethodUnion | null;
  isEdit?: boolean;
  existingEsewa?: boolean;
  existingStripe?: boolean;
}

const getEmptyForm = (type?: PaymentType): Omit<PaymentMethodUnion, "id"> => {
  if (type === "ESEWA") {
    return {
      type: "ESEWA",
      accountName: "",
      phoneNumber: "",
      isDefault: false,
    } as Omit<EsewaPaymentMethod, "id">;
  }
  
  if (type === "STRIPE") {
    return {
      type: "STRIPE",
      publicKey: "",
      secretKey: "",
      businessName: "",
      isDefault: false,
    } as Omit<StripePaymentMethod, "id">;
  }
  
  // Return a minimal object when no type is selected yet
  return {
    type: "" as PaymentType,
    isDefault: false,
  };
};

const AddPaymentModal: React.FC<AddPaymentModalProps> = ({
  onClose,
  onSave,
  loading = false,
  payment = null,
  isEdit = false,
  existingEsewa = false,
  existingStripe = false,
}) => {
  const [formData, setFormData] = useState<Omit<PaymentMethodUnion, "id">>(getEmptyForm());
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form
  useEffect(() => {
    if (isEdit && payment) {
      const { id, ...rest } = payment;
      setFormData(rest);
    } else {
      setFormData(getEmptyForm());
    }
  }, [payment, isEdit]);

  // Handle type change
  const handleTypeChange = (type: PaymentType) => {
    if (isEdit) return;
    
    // Clear all errors
    setErrors({});
    
    // Reset form with new type
    setFormData(getEmptyForm(type));
  };

  // Validation functions
  const validateEsewa = (data: Omit<EsewaPaymentMethod, "id">) => {
    const err: Record<string, string> = {};
    
    if (existingEsewa && !isEdit) {
      err.type = "Only one eSewa method allowed";
    }
    
    if (!data.accountName.trim()) {
      err.accountName = "Account name required";
    }
    
    if (!data.phoneNumber.trim()) {
      err.phoneNumber = "ESEWA phone number required";
    } else if (!/^\d+$/.test(data.phoneNumber.trim())) {
      err.phoneNumber = "Phone number must contain only digits";
    }
    
    return err;
  };

  const validateStripe = (data: Omit<StripePaymentMethod, "id">) => {
    const err: Record<string, string> = {};
    
    if (existingStripe && !isEdit) {
      err.type = "Only one Stripe method allowed";
    }
    
    if (!data.publicKey.trim()) {
      err.publicKey = "Public key required";
    }
    
    if (!data.secretKey.trim()) {
      err.secretKey = "Secret key required";
    }
    
    return err;
  };

  const validateForm = () => {
    let err: Record<string, string> = {};

    if (!formData.type) {
      err.type = "Select a payment type";
      setErrors(err);
      return false;
    }

    if (formData.type === "ESEWA") {
      err = validateEsewa(formData as Omit<EsewaPaymentMethod, "id">);
    } else if (formData.type === "STRIPE") {
      err = validateStripe(formData as Omit<StripePaymentMethod, "id">);
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value 
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isEdit && payment) {
      onSave({ ...formData, id: payment.id } as PaymentMethodUnion);
    } else {
      onSave(formData);
    }
  };

  // Helper to check if formData is of specific type
  const isEsewa = (data: Omit<PaymentMethodUnion, "id">): data is Omit<EsewaPaymentMethod, "id"> => {
    return data.type === "ESEWA";
  };

  const isStripe = (data: Omit<PaymentMethodUnion, "id">): data is Omit<StripePaymentMethod, "id"> => {
    return data.type === "STRIPE";
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit Payment Method" : "Add Payment Method"}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 text-xl hover:text-gray-800 hover:bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Payment Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Payment Type *</label>
            <select
              value={formData.type || ""}
              disabled={isEdit}
              onChange={(e) => handleTypeChange(e.target.value as PaymentType)}
              className={`w-full border p-2 rounded ${isEdit ? "bg-gray-100 cursor-not-allowed" : ""}`}
            >
              <option value="">Select Type</option>
              <option value="ESEWA">ESEWA</option>
              <option value="STRIPE">Stripe</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
          </div>

          {/* ESEWA Fields */}
          {isEsewa(formData) && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Account Name *</label>
                <input
                  type="text"
                  value={formData.accountName}
                  onChange={(e) => handleChange("accountName", e.target.value)}
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter account name"
                />
                {errors.accountName && <p className="text-red-500 text-sm mt-1">{errors.accountName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">ESEWA Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter phone number"
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>
            </div>
          )}

          {/* Stripe Fields */}
          {isStripe(formData) && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Public Key *</label>
                <input
                  type="text"
                  value={formData.publicKey}
                  onChange={(e) => handleChange("publicKey", e.target.value)}
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="pk_..."
                />
                {errors.publicKey && <p className="text-red-500 text-sm mt-1">{errors.publicKey}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Secret Key *</label>
                <input
                  type="password"
                  value={formData.secretKey}
                  onChange={(e) => handleChange("secretKey", e.target.value)}
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="sk_..."
                />
                {errors.secretKey && <p className="text-red-500 text-sm mt-1">{errors.secretKey}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Business Name (Optional)</label>
                <input
                  type="text"
                  value={formData.businessName || ""}
                  onChange={(e) => handleChange("businessName", e.target.value)}
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter business name"
                />
              </div>
            </div>
          )}

          {/* Default Checkbox */}
          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="isDefault"
              checked={formData.isDefault}
              onChange={(e) => handleChange("isDefault", e.target.checked)}
              className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
            />
            <label htmlFor="isDefault" className="text-sm text-gray-700">
              Set as default payment method
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-teal-600 text-white px-4 py-2.5 rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading 
                ? (isEdit ? "Updating..." : "Saving...")
                : (isEdit ? "Update" : "Save")
              }
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2.5 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentModal;