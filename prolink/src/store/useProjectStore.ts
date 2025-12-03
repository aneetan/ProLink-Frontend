import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Project } from '../types/company/project.types';

interface ProjectStore {
  projects: Project[];
  loading: boolean;
  error: string | null;
  editingProject: Project | null;
  
  // Actions
  setProjects: (projects: Project[]) => void;
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  setEditingProject: (project: Project | null) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Generate a temporary ID for optimistic updates
const generateTempId = () => `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useProjectStore = create<ProjectStore>()(
  devtools(
    (set, get) => ({
      projects: [],
      loading: false,
      error: null,
      editingProject: null,

      setProjects: (projects) => set({ projects }),

      addProject: async (projectData) => {
        const tempId = generateTempId();
        const companyId = Number(localStorage.getItem("token")) || null;
        
        // Optimistic update
        const newProject: Project = {
          ...projectData,
          id: tempId,
          companyId
        };

        set((state) => ({
          projects: [newProject, ...state.projects],
          loading: true,
          error: null
        }));

        try {
          // Replace with your actual API call
          const response = await fetch('/api/projects', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
          });

          if (!response.ok) {
            throw new Error('Failed to add project');
          }

          const savedProject = await response.json();

          // Replace temp project with saved project
          set((state) => ({
            projects: state.projects.map(p => 
              p.id === tempId ? { ...savedProject } : p
            ),
            loading: false,
          }));
        } catch (error) {
          // Revert optimistic update on error
          set((state) => ({
            projects: state.projects.filter(p => p.id !== tempId),
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to add project'
          }));
        }
      },

      updateProject: async (id: string, updates: Partial<Project>) => {
        set({ loading: true, error: null });

        try {
          // Replace with your actual API call
          const response = await fetch(`/api/projects/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
          });

          if (!response.ok) {
            throw new Error('Failed to update project');
          }

          const updatedProject = await response.json();

          set((state) => ({
            projects: state.projects.map(p => 
              p.id === id ? { ...p, ...updatedProject } : p
            ),
            loading: false,
            editingProject: null,
          }));
        } catch (error) {
          set({
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to update project'
          });
        }
      },

      deleteProject: async (id: string) => {
        const { projects } = get();
        const projectToDelete = projects.find(p => p.id === id);
        
        // Optimistic update
        set((state) => ({
          projects: state.projects.filter(p => p.id !== id),
          loading: true,
          error: null
        }));

        try {
          // Replace with your actual API call
          const response = await fetch(`/api/projects/${id}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('Failed to delete project');
          }

          set({ loading: false });
        } catch (error) {
          // Revert optimistic update on error
          set((state) => ({
            projects: projectToDelete 
              ? [projectToDelete, ...state.projects] 
              : state.projects,
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to delete project'
          }));
        }
      },

      setEditingProject: (project) => set({ editingProject: project }),
      
      clearError: () => set({ error: null }),
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),
    }),
    { name: 'ProjectStore' }
  )
);