// components/DocumentUploadArea.tsx
import { type ChangeEvent, type DragEvent } from 'react';
import DocumentPreview from './DocumentPreview';
import { ALLOWED_FILE_TYPES } from '../../../utils/docs.utils';

interface DocumentUploadAreaProps {
  docType: { value: string; label: string };
  document: File | null;
  isRequired: boolean;
  isDragging: boolean;
  onFileSelect: (type: string, file: File) => void;
  onRemoveDocument: (type: string) => void;
  onDragStateChange: (dragging: boolean) => void;
}

const DocumentUploadArea: React.FC<DocumentUploadAreaProps> = ({
  docType,
  document,
  isRequired,
  isDragging,
  onFileSelect,
  onRemoveDocument,
  onDragStateChange
}) => {
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDragStateChange(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDragStateChange(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDragStateChange(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileSelect(docType.value, files[0]);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onFileSelect(docType.value, e.target.files[0]);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
        isDragging ? 'border-teal-400 bg-teal-50' : 'border-gray-300'
      } ${document ? 'bg-green-50 border-green-300' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="text-center">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {docType.label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </span>
          {document && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Uploaded
            </span>
          )}
        </div>

        {document ? (
          <DocumentPreview
            document={document}
            onRemove={() => onRemoveDocument(docType.value)}
          />
        ) : (
          <>
            <div className="text-4xl mb-3">📎</div>
            <p className="text-sm text-gray-500 mb-3">
              Drag & drop or click to upload
            </p>
            <input
              type="file"
              id={`file-${docType.value}`}
              className="hidden"
              accept={ALLOWED_FILE_TYPES.join(',')}
              onChange={handleFileInput}
            />
            <label
              htmlFor={`file-${docType.value}`}
              className="inline-block bg-teal-500 text-white px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-teal-600 transition-colors"
            >
              Choose File
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default DocumentUploadArea;