import { useState } from 'react';
import { FiFileText, FiUpload, FiX } from 'react-icons/fi';
import { validateRequirementForm } from '../../helpers/validateRequirement';
import type { RequirementFormData } from '../../types/requirement.types';
import { uploadToCloudinary } from '../../utils/cloudinary.utils';
import { getUserIdFromToken } from '../../utils/jwt.utils';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { addRequirement } from '../../api/requirement.api';
import { showSuccessToast } from '../../utils/toast.utils';

interface AddRequirementProps {
  onCancel?: () => void;
  onSuccess?: () => void;
}

const AddRequirement = ({ onCancel, onSuccess }: AddRequirementProps) => {
  const token = localStorage.getItem("token") || '';
  const [formData, setFormData] = useState<RequirementFormData>({
    title: '',
    description: '',
    workType: 'REMOTE',
    category: '',
    timeline: '',
    skills: [],
    attachment: '',
    urgency: 'MEDIUM',
    minimumBudget: 0,
    maximumBudget: 0
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const categories = ['IT Services', 'MEP', 'Other'];
  const timelines = ['2-4 weeks', '1-2 months', '2-4 months', '4+ months', 'Flexible'];
  const urgencyOptions = ['LOW', 'MEDIUM', 'HIGH'] as const;

  const mutation = useMutation<AxiosResponse, AxiosError, any>({
    mutationFn: addRequirement,
    onSuccess: (response) => {
      showSuccessToast("Requirement created");
      console.log(response);
    },
    onError: (e: AxiosError) => {
      if (e.response) {
        console.log('Error response data:', e.response);
        console.log('Error status:', e.response.status);
      }
    }
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    setValidationErrors(prev => ({
      ...prev,
      [field]: ''
    }));
  };

  const handleAddSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      const newSkills = [...formData.skills, currentSkill.trim()];
      handleInputChange('skills', newSkills);
      setCurrentSkill('');
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.skills;
        return newErrors;
      });
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const newSkills = formData.skills.filter(skill => skill !== skillToRemove);
    handleInputChange('skills', newSkills);
  };

    const handleFileUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      if (files.length === 0) return;
      const file = files[0];

      try {
        const fileUrl = await uploadToCloudinary(file);
        
        if (fileUrl) {
          handleInputChange('attachment', fileUrl);
        }
      } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        alert('Failed to upload file. Please try again.');
      }
    };

   const handleRemoveFile = () => {
    handleInputChange('attachment', '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate entire form
    const { isValid, errors } = validateRequirementForm(formData);
    if (isValid === true) {
      const submittedData = {
        ...formData,
        userId: getUserIdFromToken(token)
      }
      console.log('Submitting requirement:', submittedData);
      mutation.mutate(submittedData);

      setValidationErrors({});
      
      // Reset form and call success callback
      setFormData({
        title: '',
        description: '',
        workType: 'REMOTE',
        category: '',
        timeline: '',
        skills: [],
        attachment: '',
        urgency: 'MEDIUM',
        minimumBudget: 0,
        maximumBudget: 0
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } else {
      setValidationErrors(errors);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  // Helper to check if field has error
  const hasError = (field: string) => validationErrors[field];

  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        {/* Project Details Card */}
        <div className="p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-6">
            {/* Project Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title*
              </label>
              <input
                name="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., E-commerce Website Development"
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  hasError('title') ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {hasError('title') && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your project in detail..."
                rows={4}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical ${
                  hasError('description') ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {hasError('description') && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                {formData.description.length}/50 characters minimum
              </p>
            </div>

            {/* Category and Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    hasError('category') ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {hasError('category') && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeline *
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    hasError('timeline') ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="" disabled>Select timeline</option>
                  {timelines.map(timeline => (
                    <option key={timeline} value={timeline}>{timeline}</option>
                  ))}
                </select>
                {hasError('timeline') && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.timeline}</p>
                )}
              </div>
            </div>

            {/* Skills Required */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills Required *
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-blue-600 transition-colors"
                    >
                      <FiX className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  placeholder="Add required skills..."
                  className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Add Skill
                </button>
              </div>
              {hasError('skills') && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.skills}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Press enter to add the skill
              </p>
            </div>

            {/* Budget Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Budget (Rs)
                </label>
                <input
                  name="minimumBudget"
                  type="number"
                  value={formData.minimumBudget || ''}
                  onChange={(e) => handleInputChange('minimumBudget', parseInt(e.target.value) || 0)}
                  placeholder="0"
                  min={0}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    hasError('minimumBudget') ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {hasError('minimumBudget') && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.minimumBudget}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Budget (Rs)
                </label>
                <input
                  name="maximumBudget"
                  type="number"
                  value={formData.maximumBudget || ''}
                  onChange={(e) => handleInputChange('maximumBudget', parseInt(e.target.value) || 0)}
                  placeholder="10000"
                  min={0}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    hasError('maximumBudget') ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {hasError('maximumBudget') && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.maximumBudget}</p>
                )}
              </div>
            </div>

            {/* Work Type and Urgency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Type
                </label>
                <select
                  value={formData.workType}
                  onChange={(e) => handleInputChange('workType', e.target.value as any)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="REMOTE">Remote</option>
                  <option value="ONSITE">On-site</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => handleInputChange('urgency', e.target.value as any)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {urgencyOptions.map(option => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachment (if any)
              </label>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer block">
                    <FiUpload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-1 text-sm sm:text-base">
                      Click to upload files or drag and drop
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      PDF, DOC, JPG, PNG, ZIP (Max. 10MB each)
                    </p>
                  </label>
                </div>

                {/* File List */}
                  {formData.attachment && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-700 text-sm sm:text-base">
                        Uploaded File:
                      </h4>
                      <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                          <FiFileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm text-gray-700 truncate">
                            {formData.attachment.split('/').pop()}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="text-red-500 hover:text-red-700 flex-shrink-0 ml-2"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                  </div>
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 sm:mt-8">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-6 py-2 sm:px-8 sm:py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 order-1 sm:order-2"
            >
              {mutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="whitespace-nowrap">Posting Requirement...</span>
                </>
              ) : (
                'Post Requirement'
              )}
            </button>
          </div>
      </form>
    </div>
  );
};

export default AddRequirement;