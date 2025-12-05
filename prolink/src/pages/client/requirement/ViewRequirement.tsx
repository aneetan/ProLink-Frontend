// Example usage component: RequirementCardDemo.tsx
import React from 'react';
import RequirementCard from '../../../components/cards/RequirementCard';
import NewRequirement from '../../../components/client/NewRequirement';

const ViewRequirement: React.FC = () => {
  const requirement = {
    title: 'Full-Stack Web Application Development',
    description: 'We need a comprehensive web application with React frontend and Node.js backend.',
    workType: 'REMOTE' as const,
    minimumBudget: 15000,
    maximumBudget: 25000,
    category: 'Web Development',
    timeline: '3-4 months',
    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    attachment: 'https://example.com/project-brief.pdf',
    urgency: 'HIGH' as const,
    userId: 12345
  };

   const handleEdit = () => {
    // Open edit modal or navigate to edit page
    console.log('Edit requirement');
  };

  const handleDelete = () => {
    if (window.confirm('Delete this requirement?')) {
      console.log('Delete requirement');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Project Requirement</h1>
          <NewRequirement/>
        </div>
        
        <div className="grid gap-6">
          <RequirementCard
             requirement={requirement}
              quotesCount={4}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewQuotes={() => window.location.href = '/quotes/123'}
              requirementId="123"
          />
          
          {/* You can add more cards or related components here */}
        </div>
      </div>
    </div>
  );
};

export default ViewRequirement;