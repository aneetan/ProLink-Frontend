import React from 'react';
import type { Project } from '../../../types/company/project.types';

interface ProjectCardProps {
  project: Project;
  onDelete?: (id: string) => void;
  onEdit?: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete, onEdit }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{project.title}</h3>
          <p className="text-gray-600 mt-1">{project.description}</p>
          <div className="mt-2 text-sm text-gray-500">
            Completed: {new Date(project.completionDate).toLocaleDateString()}
          </div>
          {project.projectUrl && (
            <a 
              href={project.projectUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm mt-1 inline-block"
            >
              View Project →
            </a>
          )}
        </div>
        
        {(onDelete || onEdit) && (
          <div className="flex space-x-2">
            {onEdit && (
              <button
                onClick={() => onEdit(project)}
                className="text-blue-600 hover:text-blue-800 p-1"
                title="Edit project"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(project.id!)}
                className="text-red-600 hover:text-red-800 p-1"
                title="Delete project"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;