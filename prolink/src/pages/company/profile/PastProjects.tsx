import React, { useState } from "react";
import AddProjectModal from "../../../components/modal/AddProjectModal";
import type { Project } from "../../../types/company/project.types";
import { useProjectMutation, useProjects } from "../../../hooks/useProjectMutation";
import ProjectCard from "../../../components/company/project/ProjectCard";

const PastProjects: React.FC = () => {
  // Local UI state (NO Zustand)
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // React Query
  const { data, isLoading, error } = useProjects();
  const projects = data?.body || [];
  const { createProject, updateProject, deleteProject } = useProjectMutation();

  // Add
  const handleAddProject = (projectData: Omit<Project, "id">) => {
    console.log(projectData)
    createProject.mutate(projectData, {
      onSuccess: () => {
        setShowAddModal(false);
      },
    });
  };

  // Edit
  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowAddModal(true); // open modal as edit mode
  };

  // Update
  const handleUpdateProject = (updates: Partial<Project>) => {
    if (!editingProject) return;

    updateProject.mutate(
      { id: editingProject.id!, updates },
      {
        onSuccess: () => {
          setEditingProject(null);
          setShowAddModal(false);
        },
      }
    );
  };

  // Delete
  const handleDeleteProject = (id: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject.mutate(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Past Projects</h2>

        <button
          onClick={() => {
            setEditingProject(null); // reset editing
            setShowAddModal(true);
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
      {showAddModal && (
        <AddProjectModal
          onClose={() => {
            setShowAddModal(false);
            setEditingProject(null);
          }}
          onSave={
            editingProject
              ? handleUpdateProject
              : handleAddProject
          }
          project={editingProject || undefined}
          loading={
            createProject.isPending || updateProject.isPending
          }
        />
      )}
    </div>
  );
};

export default PastProjects;
