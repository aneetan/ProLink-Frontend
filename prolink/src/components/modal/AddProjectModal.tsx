import { useState } from "react";
import type { Project } from "../../types/company/project.types";
import { getUserIdFromToken } from "../../utils/jwt.utils";

interface AddProjectModalProps {
  onClose: () => void;
  onSave: (project: Omit<Project, 'id'>) => void;
  loading?: boolean;
  project?: Partial<Project>
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ onClose, onSave, loading = false }) => {
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    completionDate: '',
    projectUrl: '',
    imageUrl: ''
  });
  const token = localStorage.getItem("token") || null;
  const userId = getUserIdFromToken(token!);
  const [errors, setErrors] = useState<Partial<Record<keyof Omit<Project, 'id'>, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Omit<Project, 'id'>, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }

    if (!formData.completionDate) {
      newErrors.completionDate = 'Completion date is required';
    } else {
      const selectedDate = new Date(formData.completionDate);
      const today = new Date();
      if (selectedDate > today) {
        newErrors.completionDate = 'Completion date cannot be in the future';
      }
    }

    if (!formData.projectUrl) {
      newErrors.projectUrl = 'Project url is required';
    } else if (formData.projectUrl && !isValidUrl(formData.projectUrl)) {
      newErrors.projectUrl = 'Please enter a valid URL';
    }

    if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()  && !loading) {
      onSave({
        ...formData,
        projectUrl: formData.projectUrl || undefined,
        imageUrl: formData.imageUrl || undefined,
        userId: userId
      });
    }
  };

  const handleChange = (field: keyof Omit<Project, 'id'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Add New Project</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Project Title *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter project title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                className={`w-full p-2 border resize-none rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Describe the project and your role"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <label htmlFor="completionDate" className="block text-sm font-medium text-gray-700 mb-1">
                Completion Date *
              </label>
              <input
                type="date"
                id="completionDate"
                value={formData.completionDate}
                onChange={(e) => handleChange('completionDate', e.target.value)}
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.completionDate ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.completionDate && <p className="text-red-500 text-sm mt-1">{errors.completionDate}</p>}
            </div>

            <div>
              <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Project URL
              </label>
              <input
                type="url"
                id="projectUrl"
                value={formData.projectUrl}
                onChange={(e) => handleChange('projectUrl', e.target.value)}
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.projectUrl ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="https://example.com"
              />
              {errors.projectUrl && <p className="text-red-500 text-sm mt-1">{errors.projectUrl}</p>}
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL (if any)
              </label>
              <input
                type="url"
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  errors.imageUrl ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>}
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[var(--primary-color)] text-white px-4 py-2 rounded-md hover:bg-[var(--primary-dark)] transition-colors font-medium"
              >
                 {loading ? 'Adding...' : 'Add Project'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;