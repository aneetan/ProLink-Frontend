interface DocumentPreviewProps {
  document: File;
  onRemove: () => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ document, onRemove }) => {
  const getFileIcon = (fileType: string) => {
    if (fileType === 'application/pdf') return '📄';
    return '🖼️';
  };

  const previewUrl = document.type.startsWith('image/') ? URL.createObjectURL(document) : undefined;

  return (
    <div className="mt-4 p-3 bg-white rounded border">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-lg mr-2">
            {getFileIcon(document.type)}
          </span>
          <div>
            <p className="text-sm font-medium text-gray-700 truncate">
              {document.name}
            </p>
            <p className="text-xs text-gray-500">
              {(document.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 ml-2 text-lg"
        >
          ×
        </button>
      </div>
      {previewUrl && (
        <div className="mt-3">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-h-32 mx-auto rounded border"
          />
        </div>
      )}
    </div>
  );
};

export default DocumentPreview;