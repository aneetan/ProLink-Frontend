import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Loader2, X } from 'lucide-react';

export type ModalType = 'ACCEPT' | 'DECLINE' | 'CONFIRM' | 'WARNING';

export interface AcceptDeclineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
  title: string;
  description: string;
  type?: ModalType;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  isDestructive?: boolean;
  additionalContent?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

const AcceptDeclineModal: React.FC<AcceptDeclineModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  title,
  description,
  type = 'CONFIRM',
  confirmText,
  cancelText ,
  isLoading = false,
  isDestructive = false,
  additionalContent,
  size = 'md',
  showCloseButton = true,
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-xl',
    xl: 'max-w-2xl'
  };

  const modalConfig = {
    ACCEPT: {
      icon: <CheckCircle className="w-12 h-12 text-emerald-600" />,
      borderColor: 'border-emerald-200',
      iconBgColor: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      confirmButtonColor: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500',
      confirmText: confirmText || 'Accept',
    },
    DECLINE: {
      icon: <XCircle className="w-12 h-12 text-rose-600" />,
      borderColor: 'border-rose-200',
      iconBgColor: 'bg-rose-100',
      iconColor: 'text-rose-600',
      confirmButtonColor: 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500',
      confirmText: confirmText || 'Decline',
    },
    CONFIRM: {
      icon: <AlertCircle className="w-12 h-12 text-blue-600" />,
      borderColor: 'border-blue-200',
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      confirmButtonColor: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      confirmText: confirmText || 'Confirm',
    },
    WARNING: {
      icon: <AlertCircle className="w-12 h-12 text-amber-600" />,
      borderColor: 'border-amber-200',
      iconBgColor: 'bg-amber-100',
      iconColor: 'text-amber-600',
      confirmButtonColor: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
      confirmText: confirmText || 'Proceed',
    }
  };

  const config = modalConfig[type];

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && !isLoading) {
      onClose();
    }
    if (e.key === 'Enter' && !isLoading) {
      onConfirm();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop with subtle animation */}
      <div 
        className="fixed inset-0 bg-black/50 bg-opacity-50 transition-opacity duration-300 ease-out"
        onClick={handleBackdropClick}
      />

      {/* Modal Container - Positioned at top center */}
      <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0 pt-8 sm:pt-16">
        <div 
          className={`relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all duration-300 ease-out ${sizeClasses[size]} animate-scale-in`}
          style={{
            animation: 'scaleIn 0.3s ease-out',
          }}
        >
          {/* Close button in top right corner */}
          {showCloseButton && !isLoading && (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
              disabled={isLoading}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          )}

          {/* Modal Content */}
          <div className="bg-white px-6 pb-6 pt-8 sm:p-8">
            <div className="flex flex-col items-center text-center">
              {/* Icon with subtle shadow */}
              <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full ${config.iconBgColor} shadow-lg`}>
                {config.icon}
              </div>
              
              {/* Text Content */}
              <div className="w-full">
                <h3 
                  className="text-2xl font-bold text-gray-900 mb-4"
                  id="modal-title"
                >
                  {title}
                </h3>
                
                <div className="mb-6">
                  <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
                    {description}
                  </p>
                  
                  {/* Additional Content */}
                  {additionalContent && (
                    <div className="mt-6">
                      {additionalContent}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Actions with border top */}
          <div className={`border-t border-gray-200 px-6 py-6 sm:px-8 ${isDestructive ? 'bg-rose-50' : 'bg-gray-50'}`}>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-4">
              {/* Cancel Button */}
              <button
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
                className={`mt-3 sm:mt-0 inline-flex w-full justify-center rounded-xl px-5 py-3.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 shadow-sm hover:bg-gray-50 hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 sm:w-auto transition-all duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {cancelText || 'Cancel'}
              </button>
              
              {/* Confirm Button */}
              <button
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
                className={`inline-flex w-full justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${config.confirmButtonColor} transform hover:-translate-y-0.5 transition-all duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  config.confirmText
                )}
              </button>
            </div>
            
            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  <span className="text-gray-700 font-medium">Processing...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptDeclineModal;