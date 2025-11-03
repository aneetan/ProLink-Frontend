// components/UploadDocuments.tsx
import { useState } from 'react';
import type { CompanyVerificationData, StepProps } from '../../../types/company.types';
import { ALLOWED_FILE_TYPES, ALLOWED_LOGO_TYPES, DOCUMENT_TYPES, MAX_FILE_SIZE } from '../../../utils/docs.utils';
import DocumentUploadArea from './DocumentUploadArea';
import { validateFileSize, validateFileType } from '../../../helpers/validateFiles';

const defaultDocs= {
  logo: null,
  businessLicense: null,
  taxCertificate: null,
  ownerId: null
}

const UploadDocuments: React.FC<StepProps> = ({ 
  formData,
  updateFormData,
  onNext,
  onBack
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);

  const docs = formData.docs || defaultDocs;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Check each required document individually
    DOCUMENT_TYPES.forEach(docType => {
      const document = docs[docType.value as keyof CompanyVerificationData];
      if (!document) {
        newErrors[docType.value] = `${docType.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileSelect = (type: string, file: File) => {
    // Clear previous errors for this type
    if (errors[type]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[type];
        return newErrors;
      });
    }

     // Validate file type with specific rules for logo
    if (!validateFileType(file, ALLOWED_FILE_TYPES)) {
      setErrors(prev => ({ 
        ...prev, 
        [type]: 'Only JPEG, PNG, and PDF files are allowed' 
      }));
      return;
    }

    // Additional validation for logo - prevent PDF files
    if (type === 'logo' && !validateFileType(file, ALLOWED_LOGO_TYPES)) {
      setErrors(prev => ({ 
        ...prev, 
        [type]: 'Only JPEG and PNG files are allowed for logo' 
      }));
      return;
    }

    // Validate file size
    if (!validateFileSize(file, MAX_FILE_SIZE)) {
      setErrors(prev => ({ 
        ...prev, 
        [type]: 'File size must be less than 10MB' 
      }));
      return;
    }

    // Update form data with the file
     updateFormData({
      docs: {
        ...docs,
        [type]: file
      }
    });
  };

  const removeDocument = (type: string) => {
     updateFormData({
      docs: {
        ...docs,
        [type]: null
      }
    });

    // Also remove any error for this type
    if (errors[type]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[type];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const getDocumentForType = (type: string) => {
    return docs[type as keyof typeof docs] as File | null;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Company Verification</h2>
      <p className="text-gray-600 mb-4 text-sm">
        Please provide the following documents for company verification. All documents are mandatory and will be stored separately in our database.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <p className="text-sm text-gray-600 mb-6">
            Upload clear, readable copies of the following documents. Max file size: 10MB (JPEG, PNG, PDF)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DOCUMENT_TYPES.map((docType) => {
              const document = getDocumentForType(docType.value);
              const error = errors[docType.value];

              return (
                <div key={docType.value}>
                  <DocumentUploadArea
                    docType={docType}
                    document={document}
                    isRequired={true}
                    isDragging={isDragging}
                    onFileSelect={handleFileSelect}
                    onRemoveDocument={removeDocument}
                    onDragStateChange={setIsDragging}
                  />
                  {error && (
                    <p className="text-red-500 text-xs mt-2">{error}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!Object.values(formData).every(Boolean)}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadDocuments;