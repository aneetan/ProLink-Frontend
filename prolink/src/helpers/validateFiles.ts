// utils/validation.ts

/**
 * Validates if a file type is allowed
 * @param file - The file to validate
 * @param allowedTypes - Array of allowed MIME types
 * @returns boolean - True if file type is allowed
 */
export const validateFileType = (file: File | null, allowedTypes: string[]): boolean => {
  const fileExtension = file!.name.split('.').pop()?.toLowerCase();
  const fileType = file!.type;
  
  return allowedTypes.some(allowedType => 
    fileType.includes(allowedType) || 
    fileExtension === allowedType.replace('image/', '').replace('application/', '')
  );
};

/**
 * Validates if a file size is within the limit
 * @param file - The file to validate
 * @param maxSize - Maximum allowed file size in bytes
 * @returns boolean - True if file size is within limit
 */
export const validateFileSize = (file: File, maxSize: number): boolean => {
  if (!file || file.size === undefined) {
    return false;
  }
  return file.size <= maxSize;
};

/**
 * Gets a user-friendly error message for file validation
 * @param file - The file that failed validation
 * @param allowedTypes - Array of allowed MIME types
 * @param maxSize - Maximum allowed file size in bytes
 * @returns string - User-friendly error message
 */
export const getFileValidationErrorMessage = (
  file: File,
  allowedTypes: string[],
  maxSize: number
): string => {
  if (!validateFileType(file, allowedTypes)) {
    const allowedExtensions = allowedTypes.map(type => {
      switch (type) {
        case 'image/jpeg':
        case 'image/jpg':
          return 'JPEG';
        case 'image/png':
          return 'PNG';
        case 'application/pdf':
          return 'PDF';
        default:
          return type.split('/')[1]?.toUpperCase() || type;
      }
    }).filter((value, index, self) => self.indexOf(value) === index);

    return `File type not allowed. Please upload ${allowedExtensions.join(', ')} files only.`;
  }

  if (!validateFileSize(file, maxSize)) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(0);
    return `File size too large. Maximum allowed size is ${maxSizeMB}MB.`;
  }

  return '';
};

/**
 * Validates both file type and size in one call
 * @param file - The file to validate
 * @param allowedTypes - Array of allowed MIME types
 * @param maxSize - Maximum allowed file size in bytes
 * @returns { isValid: boolean; errorMessage: string }
 */
export const validateFile = (
  file: File,
  allowedTypes: string[],
  maxSize: number
): { isValid: boolean; errorMessage: string } => {
  const errorMessage = getFileValidationErrorMessage(file, allowedTypes, maxSize);
  return {
    isValid: !errorMessage,
    errorMessage
  };
};

/**
 * Gets file extension from MIME type
 * @param mimeType - The MIME type of the file
 * @returns string - File extension
 */
export const getFileExtension = (mimeType: string): string => {
  const extensions: { [key: string]: string } = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'application/pdf': 'pdf',
  };
  return extensions[mimeType] || 'file';
};

/**
 * Formats file size to human readable format
 * @param bytes - File size in bytes
 * @returns string - Formatted file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};