import React, { useState, useEffect } from 'react';
import AddProjectModal from '../../../components/modal/AddProjectModal';
import ProjectCard from '../../../components/company/project/ProjectCard';
import type { Project } from '../../../types/company/project.types';
import { useProjectStore } from '../../../store/useProjectStore';

const PastProjects: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { 
    projects, 
    loading, 
    error,
    addProject, 
    deleteProject,
    setEditingProject,
    clearError 
  } = useProjectStore();

  // Clear errors when component mounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleAddProject = async (projectData: Omit<Project, 'id'>) => {
    try {
      await addProject(projectData);
      setShowAddModal(false);
    } catch (error) {
      console.error('Failed to add project:', error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    // You can open an edit modal here or navigate to edit page
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
          className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-md hover:bg-[var(--primary-dark)] transition-colors text-sm font-medium disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Adding...' : '+ Add Past Project'}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {loading && projects.length === 0 ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No projects available</p>
          </div>
        ) : (
          projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              onDelete={handleDeleteProject}
              onEdit={handleEditProject}
            />
          ))
        )}
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <AddProjectModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddProject}
          loading={loading}
        />
      )}
    </div>
  );
};

export default PastProjects;