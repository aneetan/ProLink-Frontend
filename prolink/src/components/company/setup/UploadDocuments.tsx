import React, { useState } from 'react';
import type { StepProps, VerificationDocuments } from '../../../types/company.types';
import { uploadToCloudinary } from '../../../utils/cloudinary.utils';

interface Document {
  id: string;
  file: File;
  previewUrl: string | null;
  type: 'logo' | 'taxCertificate' | 'businessLicense' | 'ownerId';
  name: string;
  size: number;
  cloudinaryUrl?: string;
  uploadStatus: 'idle' | 'uploading' | 'success' | 'error';
}

const UploadDocuments: React.FC<StepProps> = ({ 
  formData, 
  updateFormData, 
  onNext, 
  onBack 
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const documentTypes = [
    {
      type: 'logo' as const,
      label: 'Company Logo',
      description: 'PNG, JPG, SVG (Max 5MB)',
      required: true,
      accept: 'image/*'
    },
    {
      type: 'taxCertificate' as const,
      label: 'Tax Certificate',
      description: 'PDF, JPG, PNG (Max 10MB)',
      required: true,
      accept: '.pdf,.jpg,.jpeg,.png'
    },
    {
      type: 'businessLicense' as const,
      label: 'Business License',
      description: 'PDF, JPG, PNG (Max 10MB)',
      required: true,
      accept: '.pdf,.jpg,.jpeg,.png'
    },
    {
      type: 'ownerId' as const,
      label: 'Owner ID',
      description: 'PDF, JPG, PNG (Max 10MB)',
      required: false,
      accept: '.pdf,.jpg,.jpeg,.png'
    }
  ];

  const uploadFileToCloudinary = async (file: File, type: Document['type']): Promise<string> => {
    try {
      const cloudinaryUrl = await uploadToCloudinary(file);
      return cloudinaryUrl;
    } catch (error) {
      console.error(`Error uploading ${type} to Cloudinary:`, error);
      throw new Error(`Failed to upload ${type}`);
    }
  };

  const handleFileSelect = async (type: Document['type'], event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    const maxSize = type === 'logo' ? 5 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`File size too large. Maximum size: ${type === 'logo' ? '5MB' : '10MB'}`);
      return;
    }

    const documentId = `${type}-${Date.now()}`;
    const newDocument: Document = {
      id: documentId,
      file,
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      type,
      name: file.name,
      size: file.size,
      uploadStatus: 'uploading'
    };

     // Add document immediately with uploading status
    setDocuments(prev => {
      const filtered = prev.filter(doc => doc.type !== type);
      return [...filtered, newDocument];
    });

    setUploading(true);

    try {
      const cloudinaryUrl = await uploadFileToCloudinary(file, type);

      setDocuments(prev => prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, cloudinaryUrl, uploadStatus: 'success' }
          : doc
      ));

      updateFormData({
        docs: {
          ...formData.docs,
          [type === 'logo' ? 'logo' : 
          type === 'taxCertificate' ? 'taxCertificate' :
          type === 'businessLicense' ? 'businessLicense' : 'ownerId']: cloudinaryUrl
        }
      });

    } catch(e) {
      // Update document with error status
      setDocuments(prev => prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, uploadStatus: 'error' }
          : doc
      ));
      
    } finally {
      setUploading(false)
    }
  };

  const handleRemoveFile = (documentId: string) => {
    setDocuments(prev => {
      const removedDoc = prev.find(doc => doc.id === documentId);
      const updated = prev.filter(doc => doc.id !== documentId);
      
      // Update form data
      if (removedDoc) {
        const docsData: VerificationDocuments = { ...formData.docs };
        
        if (removedDoc.type === 'logo') docsData.logo = '';
        if (removedDoc.type === 'taxCertificate') docsData.taxCertificate = '';
        if (removedDoc.type === 'businessLicense') docsData.businessLicense = '';
        if (removedDoc.type === 'ownerId') docsData.ownerId = '';
        
        updateFormData({ docs: docsData });
      }
      
      return updated;
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent, type: Document['type']) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (!file) return;

    // Create a fake event to reuse handleFileSelect
    const fakeEvent = { target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>;
    
    handleFileSelect(type, fakeEvent);
  };

  const getDocumentForType = (type: Document['type']) => {
    return documents.find(doc => doc.type === type);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType === 'application/pdf') return '📄';
    return '📎';
  };

  const isStepComplete = () => {
     const requiredDocs = documentTypes.filter(doc => doc.required);
    return requiredDocs.every(doc => {
      const document = getDocumentForType(doc.type);
      return document && document.uploadStatus === 'success';
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStepComplete() && onNext) {
      onNext();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Company Verification
        </h2>
        <p className="text-gray-600 text-sm mb-2">
          Please provide the following documents for company verification. All documents are mandatory and will be
          stored separately in our database.
        </p>
        <p className="text-gray-600 text-sm">
          Upload clear, readable copies of the following documents. Max file size: 10MB (JPEG, PNG, PDF)
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {documentTypes.map((docType) => {
            const existingDoc = getDocumentForType(docType.type);

            return (
              <div 
                key={docType.type} 
                className="bg-gray-50 rounded-lg p-4 sm:p-6 border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-base sm:text-lg">
                      {docType.label}
                      {docType.required && <span className="text-red-500 text-sm">*</span>}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{docType.description}</p>
                    
                    {existingDoc && (
                      <div className="mt-3 p-3 bg-white rounded-lg border border-green-200">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{getFileIcon(existingDoc.file.type)}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">{existingDoc.name}</p>
                            <p className="text-sm text-gray-500">{formatFileSize(existingDoc.size)}</p>

                            {existingDoc.uploadStatus === 'uploading' && (
                              <p className="text-xs text-blue-500 mt-1">Uploading to cloud...</p>
                            )}
                            {existingDoc.uploadStatus === 'error' && (
                              <p className="text-xs text-red-500 mt-1">Upload failed. Please try again.</p>
                            )}
                            {existingDoc.uploadStatus === 'success' && (
                              <p className="text-xs text-green-500 mt-1">Uploaded successfully!</p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(existingDoc.id)}
                            className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
                            aria-label="Remove file"
                          >
                            ✕
                          </button>
                        </div>
                        
                        {/* Preview for images */}
                        {existingDoc.previewUrl && (
                          <div className="mt-3">
                            <img
                              src={existingDoc.previewUrl}
                              alt="Preview"
                              className="max-w-20 sm:max-w-24 max-h-20 sm:max-h-24 object-cover rounded border"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex-shrink-0">
                    <input
                      type="file"
                      id={docType.type}
                      accept={docType.accept}
                      onChange={(e) => handleFileSelect(docType.type, e)}
                      className="hidden"
                    />
                    <label
                      htmlFor={docType.type}
                      className={`inline-flex items-center justify-center w-full sm:w-auto gap-2 px-4 py-3 rounded-lg border-2 border-dashed cursor-pointer transition-all ${
                        dragOver 
                          ? 'border-teal-500 bg-teal-50' 
                          : 'border-gray-300 hover:border-teal-400 hover:bg-teal-50'
                      } ${existingDoc ? 'border-green-200 bg-green-50' : 'border-gray-300'}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, docType.type)}
                    >
                      <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                        {existingDoc ? 'Change File' : 'Choose File'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors order-2 sm:order-1"
          >
            Back
          </button>
          
          <button
            type="submit"
            disabled={!isStepComplete()}
            className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 order-1 sm:order-2"
          >
            Complete Registration
            <span>→</span>
          </button>
        </div>
      </form>

      {/* Mobile responsive improvements */}
      <div className="sm:hidden mt-4">
        <p className="text-xs text-gray-500 text-center">
          Swipe horizontally if content is not fully visible
        </p>
      </div>
    </div>
  );
};

export default UploadDocuments;