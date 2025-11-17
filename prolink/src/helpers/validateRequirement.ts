export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateRequirementForm = (formData: any): ValidationResult => {
  const errors: Record<string, string> = {};

  // Required fields validation
  if (!formData.title?.trim()) {
    errors.title = 'Project title is required';
  } else if (formData.title.length < 10) {
    errors.title = 'Title must be at least 10 characters long';
  }

  if (!formData.description?.trim()) {
    errors.description = 'Project description is required';
  } else if (formData.description.length < 50) {
    errors.description = 'Description must be at least 50 characters long';
  }

  if (!formData.category) {
    errors.category = 'Category is required';
  }

  if (!formData.timeline) {
    errors.timeline = 'Timeline is required';
  }

  // Budget validation
  if (formData.minimumBudget < 0) {
    errors.minimumBudget = 'Minimum budget cannot be negative';
  }

  if (formData.maximumBudget < 0) {
    errors.maximumBudget = 'Maximum budget cannot be negative';
  }

  if (formData.minimumBudget > formData.maximumBudget) {
    errors.maximumBudget = 'Maximum budget must be greater than minimum budget';
  }

  // Skills validation
  if (formData.skills.length === 0) {
    errors.skills = 'At least one skill is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};