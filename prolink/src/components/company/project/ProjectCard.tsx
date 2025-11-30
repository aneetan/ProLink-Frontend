import type { Project } from "../../../types/project.types";

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

export default ProjectCard;