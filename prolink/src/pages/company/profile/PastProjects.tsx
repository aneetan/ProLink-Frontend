import React, { useState } from 'react';
import AddProjectModal from '../../../components/modal/AddProjectModal';
import ProjectCard from '../../../components/company/project/ProjectCard';
import type { Project } from '../../../types/company/project.types';

interface PastProjectsProps {
  projects: Project[];
  onProjectAdd: (project: Omit<Project, 'id'>) => void;
}

const PastProjects: React.FC<PastProjectsProps> = ({ projects, onProjectAdd }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddProject = (projectData: Omit<Project, 'id'>) => {
    onProjectAdd(projectData);
    setShowAddModal(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div className='flex gap-2'>
          <h2 className="text-xl font-semibold text-gray-900">Past Projects</h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {projects.length} projects
          </span>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-md hover:bg-[var(--primary-dark)] transition-colors text-sm font-medium"
        >
          + Add Past Project
        </button>
      </div>

      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No projects available</p>
          </div>
        ) : (
          projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <AddProjectModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddProject}
        />
      )}
    </div>
  );
};

export default PastProjects;