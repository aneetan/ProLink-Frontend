import axios from 'axios';
import { API_URL } from '../utils/url.utils';


// Create axios instance with auth token
const apiClient = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export const similarCompaniesApi = {
  // Get similar companies for a requirement
  getSimilarCompanies: async (requirementId: number) => {
    const response = await apiClient.get(`/client/${requirementId}/similar-companies`, {
    });
    return response.data;
  },

  // Refresh similar companies (force refetch)
  refreshSimilarCompanies: async (requirementId: number, topK = 5) => {
    const response = await apiClient.get(`/client/${requirementId}/similar-companies`, {
      params: { topK },
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    return response.data;
  }
};

export default similarCompaniesApi;