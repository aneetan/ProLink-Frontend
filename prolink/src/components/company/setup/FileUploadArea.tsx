// components/FileUploadArea.tsx
import React, { useCallback } from 'react';
import type { VerificationDocuments } from './UploadDocuments';

export interface UploadedFile {
  file: File;
  previewUrl: string;
  cloudinaryUrl?: string;
  uploadProgress?: number;
  isUploading?: boolean;
}

interface FileUploadAreaProps {
  field: keyof VerificationDocuments;
  label: string;
  required?: boolean;
  uploadedFile: UploadedFile | null;
  onFileUpload: (field: keyof VerificationDocuments, file: File) => void;
  onFileRemove: (field: keyof VerificationDocuments) => void;
  isUploading?: boolean;
  uploadProgress?: number;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  field,
  label,
  required = false,
  uploadedFile,
  onFileUpload,
  onFileRemove,
  isUploading = false,
  uploadProgress = 0
}) => {
  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      onFileUpload(field, files[0]);
    }
  }, [field, onFileUpload]);

  const handleFileInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileUpload(field, files[0]);
    }
  }, [field, onFileUpload]);

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      alert('Please upload only JPEG, PNG, or PDF files');
      return false;
    }

    if (file.size > maxSize) {
      alert('File size must be less than 10MB');
      return false;
    }

    return true;
  };

  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      onFileUpload(field, file);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {!uploadedFile ? (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById(`${field}-input`)?.click()}
        >
          <div className="flex flex-col items-center justify-center">
            <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-gray-600">
              Drag & drop or <span className="text-blue-600 hover:text-blue-500">click to upload</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">Max file size: 10MB (JPEG, PNG, PDF)</p>
          </div>
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {uploadedFile.file.type.startsWith('image/') ? (
                <img
                  src={uploadedFile.previewUrl}
                  alt="Preview"
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                <div className="w-12 h-12 bg-red-100 rounded flex items-center justify-center">
                  <span className="text-red-600 font-bold text-sm">PDF</span>
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {uploadedFile.file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                {isUploading && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
                {uploadedFile.cloudinaryUrl && (
                  <p className="text-xs text-green-600 mt-1">✓ Uploaded successfully</p>
                )}
              </div>
            </div>
            {!isUploading && (
              <button
                type="button"
                onClick={() => onFileRemove(field)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      )}
      
      <input
        id={`${field}-input`}
        type="file"
        className="hidden"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleFileInput}
      />
    </div>
  );
};

export default FileUploadArea;