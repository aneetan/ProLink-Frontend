import React, { useState } from 'react';
import { useSimilarCompanies } from '../../hooks/useSimilarCompanies';
import CompanyCard from '../../components/cards/CompanyCards';

// Define TypeScript interfaces
interface CompanyMetadata {
  name: string;
  description: string;
  serviceCategory: string;
  services: string[];
  priceRangeMin: number;
  priceRangeMax: number;
  avgDeliveryTime: string;
  establishedYear: string;
  [key: string]: any;
}

export interface CompanySimilarity {
  id: number;
  score: number;
  text: string;
  metadata: CompanyMetadata;
}

interface SimilarCompaniesData {
  success: boolean;
  requirementId: number;
  matches: CompanySimilarity[];
  totalMatches: number;
}

interface SimilarCompaniesProps {
  topK?: number;
}

const SimilarCompanies: React.FC<SimilarCompaniesProps> = ({ topK = 5 }) => {
  // Get requirementId from URL params
//   const { requirementId } = useParams<{ requirementId: string }>();
  const requirementId  = "1";
  const parsedRequirementId = requirementId ? parseInt(requirementId) : null;

  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    refetch,
    isFetching 
  } = useSimilarCompanies(parsedRequirementId!, topK);

  if (!parsedRequirementId) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Requirement Not Found</h3>
            <p className="text-gray-600">Please check the URL or select a valid requirement.</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen  py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
            <p className="mt-4 text-lg text-gray-700 font-medium">Finding similar companies...</p>
            <p className="text-gray-500">Searching through our database for the best matches</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen  py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Error loading companies</h3>
            <p className="text-gray-600 mb-6">{error?.message || 'An error occurred while loading companies'}</p>
            <button 
              onClick={() => refetch()} 
              className="bg-[var(--primary-light)] hover:bg-[var(--primary-color)] text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { matches, totalMatches } = data as SimilarCompaniesData;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className=" w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Similar Companies
              </h1>
              <p className="text-gray-600">
                Top (5) Companies that match your requirement
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm text-sm font-medium text-gray-700">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {totalMatches} companies found
              </span>
              <button 
                onClick={() => refetch()} 
                disabled={isFetching}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-200 disabled:opacity-50"
              >
                {isFetching ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600 mr-2"></div>
                    Refreshing...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {totalMatches === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Companies Found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We couldn't find any similar companies for requirement #{parsedRequirementId}. 
              Try adjusting your search criteria or check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {matches.map((company) => (
              <CompanyCard key={company.id} company={company}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimilarCompanies;