import React from 'react';
import RequirementCard from '../../../components/cards/RequirementCard';
import { useNavigate } from 'react-router';

const BidRequestPage: React.FC = () => {
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <h1 className='font-semibold text-2xl mb-2 text-gray-800'> Requested Quotes</h1>
      <p className=' text-base mb-4 text-gray-800'> See all the requirement with requested quotes! </p>
      <div className="max-w-6xl">
        <div className="grid grid-col-1 md:grid-cols-2 gap-6">
          <RequirementCard
              requirement={requirement}
              quotesCount={4}
              onViewQuotes={() => navigate("/client/requirement/quotes") }
              requirementId="123"
              isCompany={true}
          />
          
        </div>
      </div>
    </div>
  );
};

export default BidRequestPage;