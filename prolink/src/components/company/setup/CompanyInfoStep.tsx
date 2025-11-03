import type { CompanyInfo, StepProps } from "../../../types/company.types";


const SERVICE_CATEGORIES = [
  'MEP (Mechanical, Electrical and Plumbing)',
  'IT (Information Technology)',
  'Others'
];

const CompanyInfoStep = ({ formData, updateFormData }: StepProps) => {
  const updateCompanyInfo = (field: keyof CompanyInfo, value: string) => {
    updateFormData({
      companyInfo: { ...formData.companyInfo, [field]: value }
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateCompanyInfo('logo', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Information</h2>
      
      {/* Logo Upload */}
      {/* <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center mb-4 overflow-hidden bg-gray-50">
          {formData.companyInfo.logo ? (
            <img 
              src={formData.companyInfo.logo} 
              alt="Company Logo" 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-sm">Logo</span>
          )}
        </div>
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
          <span className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm">
            Upload Logo
          </span>
        </label>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={formData.companyInfo.name}
            onChange={(e) => updateCompanyInfo('name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Registration Number
          </label>
          <input
            type="text"
            value={formData.companyInfo.registrationNo}
            onChange={(e) => updateCompanyInfo('registrationNo', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            placeholder="Enter registration number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Established Year
          </label>
          <input
            type="number"
            value={formData.companyInfo.establishedYear}
            onChange={(e) => updateCompanyInfo('establishedYear', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            placeholder="YYYY"
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Category
          </label>
          <select
            value={formData.companyInfo.serviceCategory}
            onChange={(e) => updateCompanyInfo('serviceCategory', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
          >
            <option value="">Select category</option>
            {SERVICE_CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website URL
          </label>
          <input
            type="url"
            value={formData.companyInfo.websiteUrl}
            onChange={(e) => updateCompanyInfo('websiteUrl', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            placeholder="https://example.com"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Description *
          </label>
          <textarea
            value={formData.companyInfo.description}
            onChange={(e) => updateCompanyInfo('description', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none"
            placeholder="Tell us about your company, mission, and values..."
          />
        </div>
      </div>
    </div>
  );
}

export default CompanyInfoStep;