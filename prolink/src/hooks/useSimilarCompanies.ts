import { useQuery } from '@tanstack/react-query';
import similarCompaniesApi from '../api/similarity.api';

export const useSimilarCompanies = (requirementId: number, topK = 5) => {
  return useQuery({
    queryKey: ['similarCompanies', requirementId, topK],
    queryFn: () => similarCompaniesApi.getSimilarCompanies(requirementId),
    enabled: !!requirementId, // Only run if requirementId exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};