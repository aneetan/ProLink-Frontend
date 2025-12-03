import type { AxiosResponse } from "axios";
import axios from "axios";
import type { Project } from "../types/company/project.types";
import { API_URL } from "../utils/url.utils";

// Get token from localStorage
const getAuthToken = () => localStorage.getItem("token");

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized access");
    }
    return Promise.reject(error);
  }
);

// Project API functions
export const projectService = {
  // Get all projects
  getProjects: async (): Promise<{ message: string; body: Project[] }> => {
    try {
      const response = await api.get<{ message: string; body: Project[] }>("/company/projects");
      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },

  // Add a new project
  addProject: async (formData: Omit<Project, "id">): Promise<Project> => {
    try {
      const response = await api.post<Project>("/company/add-project", formData);
      return response.data;
    } catch (error) {
      console.error("Error adding project:", error);
      throw error;
    }
  },

  // Update a project
  updateProject: async (id: number, updates: Partial<Project>): Promise<Project> => {
    try {
      const response = await api.patch<Project>(`/company/projects/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  },

  // Delete a project
  deleteProject: async (id: number): Promise<void> => {
    try {
      await api.delete(`/company/projects/${id}`);
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  },

  // Get single project by ID
  getProjectById: async (id: string): Promise<Project> => {
    try {
      const response = await api.get<Project>(`/company/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching project:", error);
      throw error;
    }
  }
};

// For backward compatibility
export const addProject = async (formData: Omit<Project, "id">): Promise<AxiosResponse<Project>> => {
  return await api.post<Project>("/company/add-project", formData);
};