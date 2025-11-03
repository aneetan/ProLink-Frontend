import { useState, type ChangeEvent, type DragEvent } from 'react';

interface VerificationDocument {
  id: string;
  type: string;
  file: File | null;
  previewUrl?: string;
  status: 'pending' | 'uploaded' | 'rejected';
  uploadedAt?: Date;
}

interface CompanyVerificationFormData {
  companyName: string;
  registrationNumber: string;
  taxId: string;
  documents: VerificationDocument[];
}

interface CompanyVerificationFormProps {
  onSubmit: (data: CompanyVerificationFormData) => void;
  initialData?: Partial<CompanyVerificationFormData>;
}

const DOCUMENT_TYPES = [
  { value: 'logo', label: 'Company Logo'},
  { value: 'business_license', label: 'Business License' },
  { value: 'tax_certificate', label: 'Tax Registration Certificate' },
  { value: 'owner_id', label: 'Owner Identity' },
] as const;

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const UploadDocuments: React.FC<CompanyVerificationFormProps> = ({ 
  onSubmit, 
  initialData 
}) => {
  const [formData, setFormData] = useState<CompanyVerificationFormData>({
    companyName: initialData?.companyName || '',
    registrationNumber: initialData?.registrationNumber || '',
    taxId: initialData?.taxId || '',
    documents: initialData?.documents || [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = 'Registration number is required';
    }

    if (!formData.taxId.trim()) {
      newErrors.taxId = 'Tax ID is required';
    }

    if (formData.documents.length === 0) {
      newErrors.documents = 'At least one document is required';
    }

    // Check for required document types
    const requiredTypes = ['business_license', 'tax_certificate', 'owner_id'];
    const existingTypes = formData.documents.map(doc => doc.type);
    const missingTypes = requiredTypes.filter(type => !existingTypes.includes(type));

    if (missingTypes.length > 0) {
      newErrors.documents = `Missing required documents: ${missingTypes.map(type => 
        DOCUMENT_TYPES.find(d => d.value === type)?.label
      ).join(', ')}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileSelect = (type: string, file: File) => {
    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        documents: 'Only JPEG, PNG, and PDF files are allowed'
      }));
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setErrors(prev => ({
        ...prev,
        documents: 'File size must be less than 10MB'
      }));
      return;
    }

    const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined;

    const newDocument: VerificationDocument = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      file,
      previewUrl,
      status: 'pending',
      uploadedAt: new Date()
    };

    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents.filter(doc => doc.type !== type), newDocument]
    }));

    if (errors.documents) {
      setErrors(prev => ({ ...prev, documents: '' }));
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, type: string) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(type, files[0]);
    }
  };

  const removeDocument = (documentId: string) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter(doc => doc.id !== documentId)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getDocumentForType = (type: string) => {
    return formData.documents.find(doc => doc.type === type);
  };

  const getFileIcon = (fileType: string) => {
    if (fileType === 'application/pdf') return '📄';
    return '🖼️';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Company Verification</h2>
      <p className="text-gray-600 mb-4 text-sm">
        Please provide the following documents for company verification. All documents will be reviewed by our admin team.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Required Documents */}
        <div>
          <p className="text-sm text-gray-600 mb-6">
            Upload clear, readable copies of the following documents. Max file size: 10MB (JPEG, PNG, PDF)
          </p>

          {errors.documents && (
            <p className="text-red-500 text-sm mb-4">{errors.documents}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DOCUMENT_TYPES.map((docType) => {
              const document = getDocumentForType(docType.value);
              const isRequired = ['business_license', 'tax_certificate', 'owner_id'].includes(docType.value);

              return (
                <div
                  key={docType.value}
                  className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                    isDragging ? 'border-teal-400 bg-teal-50' : 'border-gray-300'
                  } ${document ? 'bg-green-50 border-green-300' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, docType.value)}
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
                      <div className="mt-4 p-3 bg-white rounded border">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-lg mr-2">
                              {getFileIcon(document.file?.type || '')}
                            </span>
                            <div>
                              <p className="text-sm font-medium text-gray-700 truncate">
                                {document.file?.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {document.uploadedAt?.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeDocument(document.id)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            ×
                          </button>
                        </div>
                        {document.previewUrl && (
                          <div className="mt-3">
                            <img
                              src={document.previewUrl}
                              alt="Preview"
                              className="max-h-32 mx-auto rounded border"
                            />
                          </div>
                        )}
                      </div>
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
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            if (e.target.files?.[0]) {
                              handleFileSelect(docType.value, e.target.files[0]);
                            }
                          }}
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
            })}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadDocuments;