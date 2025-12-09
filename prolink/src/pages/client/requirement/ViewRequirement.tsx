import React from 'react';
import RequirementCard from '../../../components/cards/RequirementCard';
import NewRequirement from '../../../components/client/NewRequirement';
import { useNavigate } from 'react-router';
import { getRequirementsForUser } from '../../../api/requirement.api';
import { useQuery } from '@tanstack/react-query';
import {type AxiosResponse } from 'axios';
import type { ApiRequirementsResponse, RequirementResponse } from '../../../types/client/requirement.types';


const ViewRequirement: React.FC = () => {
  const navigate = useNavigate();

  const { data: apiResponse, isLoading, error } = useQuery<ApiRequirementsResponse, AxiosResponse>({
    queryKey: ["requirements"],
    queryFn: getRequirementsForUser
  });  

  // Extract requirements from the API response
  const requirements = apiResponse?.requirements || [];

   if (isLoading) {
    return <p className="p-8 text-gray-600">Loading requirements...</p>;
  }

  if (error) {
    return <p className="p-8 text-red-600">Something went wrong</p>;
  }

   const handleEdit = (requirementId: number) => {
    navigate(`/client/requirement/${requirementId}/edit`)
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
           {requirements.map((req: RequirementResponse) => (
            <RequirementCard
              key={req.id}
              requirement={req}
              quotesCount={req.bid.length}
              onEdit={() => handleEdit(req.id)}
              onDelete={handleDelete}
              onViewQuotes={() => navigate(`/client/${req.id}/quotes`)}
              isCompany={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewRequirement;