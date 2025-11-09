import type { PastProject, StepProps } from "../../../types/company.types";

export default function PastProjectsStep({ formData, updateFormData }: StepProps) {
  const addPastProject = () => {
    updateFormData({
      pastProjects: [
        ...formData.pastProjects,
        { title: '', description: '', image: '', year: '' }
      ]
    });
  };

  const updatePastProject = (index: number, field: keyof PastProject, value: string) => {
    const updatedProjects = formData.pastProjects.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );
    updateFormData({ pastProjects: updatedProjects });
  };

  const removePastProject = (index: number) => {
    updateFormData({
      pastProjects: formData.pastProjects.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Past Projects</h2>
        <button
          type="button"
          onClick={addPastProject}
          className="px-4 py-2 text-blue-500 rounded-lg cursor-pointer transition-colors flex items-center space-x-2"
        >
          <span>+ Add Project</span>
        </button>
      </div>

      <div className="space-y-6">
        {formData.pastProjects.map((project, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Project {index + 1}</h3>
              <button
                type="button"
                onClick={() => removePastProject(index)}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => updatePastProject(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  placeholder="Project name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Completion Year
                </label>
                <input
                  type="number"
                  value={project.year}
                  onChange={(e) => updatePastProject(index, 'year', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  placeholder="YYYY"
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) => updatePastProject(index, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none"
                  placeholder="Describe the project, your role, and achievements..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Image URL
                </label>
                <input
                  type="url"
                  value={project.image}
                  onChange={(e) => updatePastProject(index, 'image', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  placeholder="https://example.com/project-image.jpg"
                />
              </div>
            </div>
          </div>
        ))}

        {formData.pastProjects.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <p className="text-gray-500 mb-4">No projects added yet</p>
            <button
              type="button"
              onClick={addPastProject}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Add Your First Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}