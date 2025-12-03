import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { projectService } from "../api/project.api";
import type { Project } from "../types/company/project.types";

type UpdateProjectPayload = {
  id: number;
  updates: Partial<Project>;
};

interface ProjectsResponse {
  message: string;
  body: Project[];
}

export const useProjects = () => {
  return useQuery<ProjectsResponse, Error>({
    queryKey: ["projects"],
    queryFn: () => projectService.getProjects(),
    staleTime: 1000 * 60 * 5, // optional: 5 minutes cache
    retry: 1, // optional: retry once on failure
  });
};

export function useProjectMutation() {
   const queryClient = useQueryClient();

   const createProject = useMutation({
      mutationFn: projectService.addProject,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
   });

   const updateProject = useMutation<Project, Error, UpdateProjectPayload>({
    mutationFn: ({ id, updates }) =>
      projectService.updateProject(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", variables.id] });
    },
  });

  const deleteProject = useMutation({
    mutationFn: (id: number) => projectService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

   return { createProject, updateProject, deleteProject };
}
