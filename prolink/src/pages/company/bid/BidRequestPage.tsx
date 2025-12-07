import React from 'react';
import RequirementCard from '../../../components/cards/RequirementCard';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { requestBidService } from '../../../api/bid.api';
import type { RequirementsWithBidsResponse } from '../../../types/company/bidRequest.types';
import { getUserIdFromToken } from '../../../utils/jwt.utils';

const BidRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = React.useState({
    status: 'all',
    page: 1,
    limit: 10,
  });

  const token = localStorage.getItem("token");
  const companyId = getUserIdFromToken(token);

  // Use React Query directly
  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery<RequirementsWithBidsResponse>({
    queryKey: ['requirements-with-bids', companyId, filters], // Unique key for caching
    queryFn: () => requestBidService.getRequirementsWithBidRequests({
      companyId,
      status: filters.status === 'all' ? undefined : filters.status,
      page: filters.page,
      limit: filters.limit,
    }),
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  // Navigate to quotes page
  const handleViewQuotes = (requirementId: string, bidRequestId?: string) => {
    // Navigate to quotes page with both requirementId and bidRequestId if needed
    navigate(`/company/requirement/${requirementId}/quotes${bidRequestId ? `?bid=${bidRequestId}` : ''}`);
  };

  // Handle error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-red-800 mb-2">
            Failed to load requirements
          </h3>
          <p className="text-red-600 mb-4">
            {(error as Error)?.message || 'An error occurred'}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Extract data from API response
  const bidRequests = apiResponse?.data?.requirements || [];
  const pagination = apiResponse?.data?.pagination;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="font-semibold text-2xl mb-2 text-gray-800">Requested Quotes</h1>
          <p className="text-base mb-4 text-gray-800">
            See all the requirements with requested quotes!
          </p>
        </div>
      </div>

      {bidRequests.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <p className="text-gray-500 text-lg">No requested quotes found</p>
          <p className="text-gray-400 mt-2">
            {filters.status !== 'all' 
              ? `No ${filters.status} quotes found` 
              : 'You have no requested quotes yet'}
          </p>
        </div>
      ) : (
        <>
          <div className="max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bidRequests.map((bidRequest) => (
                <RequirementCard
                  key={bidRequest.id}
                  requirement={bidRequest.requirement}  
                  quotesCount={1}  
                  onViewQuotes={() => handleViewQuotes(
                    bidRequest.requirementId.toString(),
                    bidRequest.id.toString()
                  )}
                  isCompany={true}
                />
              ))}
            </div>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={filters.page === 1 || isFetching}
                onClick={() => handlePageChange(filters.page - 1)}
              >
                Previous
              </button>
              
              <span className="text-gray-700">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              
              <button
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={filters.page >= pagination.totalPages || isFetching}
                onClick={() => handlePageChange(filters.page + 1)}
              >
                Next
              </button>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-4 text-gray-600 text-sm">
            Showing {bidRequests.length} of {pagination?.total || 0} requested quotes
            {isFetching && <span className="ml-2 text-blue-500">Updating...</span>}
          </div>
        </>
      )}
    </div>
  );
};

export default BidRequestPage;