import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { X } from 'lucide-react';
import type { BidFormData } from '../../types/company/bidRequest.types';

interface BidModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BidFormData) => void;
  currentHighestBid?: number;
  itemName?: string;
}

const BidModal: React.FC<BidModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentHighestBid = 0,
  itemName = 'Item'
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BidFormData>({
    defaultValues: {
      amount: currentHighestBid + 10,
      message: '',
      deliveryTime: "1-4 Days",
      termsAccepted: false
    }
  });


  const handleFormSubmit: SubmitHandler<BidFormData> = (data) => {
    onSubmit(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Submit Your Bid
              </h3>
              <p className="text-sm text-gray-500">
                For: {itemName}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="rounded-full p-1 hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
            {/* Current Highest Bid */}
            {currentHighestBid > 0 && (
              <div className="mb-6 p-3 bg-red-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-600">
                  Current Highest Bid: <span className="font-semibold">Rs. {currentHighestBid.toFixed(2)}</span>
                </p>
              </div>
            )}

            {/* Bid Amount */}
            <div className="mb-6">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
               Bid Amount (Rs)
            </label>
            <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">Rs</span>
               </div>
               <input
                  id="amount"
                  type="number"
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.amount ? 'border-red-300' : 'border-gray-300'
                  }`}
                  {...register('amount', {
                  required: 'Bid amount is required',
                  valueAsNumber: true, // Convert input value to number
                  min: {
                     value: 1,
                     message: 'Bid must be at least Rs 1'
                  },
                  validate: {
                     positive: (value) => value > 0 || 'Bid amount must be greater than 0',
                     ...(currentHighestBid > 0 ? {
                        higherThanCurrent: (value) => 
                        value > currentHighestBid || 
                        `Bid must be higher than current bid (Rs ${currentHighestBid.toFixed(2)})`
                     } : {})
                  }
                  })}
               />
            </div>
            {errors.amount && (
               <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
            )}
            </div>

            {/* Delivery Time */}
            <div className="mb-6">
              <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Delivery Time 
              </label>
              <select
                id="deliveryTime"
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.deliveryTime ? 'border-red-300' : 'border-gray-300'
                }`}
                {...register('deliveryTime', {
                  required: 'Delivery time is required',
                  min: { value: 1, message: 'Minimum delivery time is 1 day' },
                  max: { value: 90, message: 'Maximum delivery time is 90 days' }
                })}
              >
                <option value="1-4 days">1-4 Days</option>
                <option value="1 week">1 week</option>
                <option value="2-3 weeks"> 2-3 weeks</option>
                <option value='1 month'> 1 month</option>
                <option value=">1 month">1 month +</option>
              </select>
              {errors.deliveryTime && (
                <p className="mt-1 text-sm text-red-600">{errors.deliveryTime.message}</p>
              )}
            </div>

            {/* Message */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message (Optional)
              </label>
              <textarea
                id="message"
                rows={3}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add any notes or conditions for your bid..."
                {...register('message', {
                  maxLength: {
                    value: 500,
                    message: 'Message cannot exceed 500 characters'
                  }
                })}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="mb-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="termsAccepted"
                    type="checkbox"
                    className="h-4 w-4 text-[var(--primary-light)] focus:ring-teal-700 border-gray-300 rounded"
                    {...register('termsAccepted', {
                      required: 'You must accept the terms and conditions'
                    })}
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="termsAccepted" className="text-sm text-gray-700">
                    I agree to the{' '}
                    <button
                      type="button"
                      className="text-[var(--primary-light)] hover:text-[var(--primary-dark)] underline"
                      onClick={() => alert('Terms and conditions modal would open here')}
                    >
                      Terms and conditions
                    </button>
                  </label>
                  {errors.termsAccepted && (
                    <p className="mt-1 text-sm text-red-600">{errors.termsAccepted.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 border-t pt-6">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--primary-light)] hover:bg-[var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Bid'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BidModal;