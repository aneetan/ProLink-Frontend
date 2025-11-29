import React from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  completionDate: string;
  projectUrl?: string;
  imageUrl?: string;
}

interface PastProjectsProps {
  projects: Project[];
}

const PastProjects: React.FC<PastProjectsProps> = ({ projects }) => {
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
    </div>
  );
};

// Project Card Sub-component
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
          <p className="text-gray-600 mt-1">{project.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            Completed: {new Date(project.completionDate).toLocaleDateString()}
          </p>
        </div>
        {project.projectUrl && (
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            View Project
          </a>
        )}
      </div>
    </div>
  );
};

export default PastProjects;