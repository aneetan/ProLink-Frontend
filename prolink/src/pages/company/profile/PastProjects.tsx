import React, { useState } from "react";
import AddProjectModal from "../../../components/modal/AddProjectModal";
import type { Project } from "../../../types/company/project.types";
import { useProjectMutation, useProjects } from "../../../hooks/useProjectMutation";
import ProjectCard from "../../../components/company/project/ProjectCard";

const PastProjects: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // React Query
  const { data, isLoading, error } = useProjects();
  const projects = data?.body || [];
  const { createProject, updateProject, deleteProject } = useProjectMutation();

  // Add
  const handleAddProject = (projectData: Omit<Project, 'id'> | Project) => {
    createProject.mutate(projectData as Omit<Project, 'id'>, {
      onSuccess: () => {
        setShowModal(false);
        setEditingProject(null);
      },
    });
  };

  // Edit
  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  // Update
  const handleUpdateProject = (updatedProject: Omit<Project, 'id'> | Project) => {
    if (!editingProject) return;

    // Type guard to check if it's a full Project with id
    if ('id' in updatedProject) {
      updateProject.mutate(
        { id: updatedProject.id!, updates: updatedProject },
        {
          onSuccess: () => {
            setEditingProject(null);
            setShowModal(false);
          },
        }
      );
    } else {
      // Handle case where id might not be passed
      updateProject.mutate(
        { id: editingProject.id!, updates: updatedProject },
        {
          onSuccess: () => {
            setEditingProject(null);
            setShowModal(false);
          },
        }
      );
    }
  };

  // Delete
  const handleDeleteProject = (id: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject.mutate(id);
    }
  };

  // Handle save based on mode
  const handleSave = (project: Omit<Project, 'id'> | Project) => {
    if (editingProject) {
      handleUpdateProject(project);
    } else {
      handleAddProject(project);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Past Projects</h2>
        <button
          onClick={() => {
            setEditingProject(null);
            setShowModal(true);
          }}
          className="bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white px-4 py-2 rounded-md"
        >
          + Add Past Project
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-500">Failed to load projects</p>}

      {/* Loading */}
      {isLoading ? (
        <p>Loading...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onDelete={() => handleDeleteProject(project.id!)}
            onEdit={() => handleEditProject(project)}
          />
        ))
      )}

      {/* Modal */}
      {showModal && (
        <AddProjectModal
          onClose={() => {
            setShowModal(false);
            setEditingProject(null);
          }}
          onSave={handleSave}
          project={editingProject}
          loading={editingProject ? updateProject.isPending : createProject.isPending}
          isEdit={!!editingProject}
        />
      )}
    </div>
  );
};

export default PastProjects;