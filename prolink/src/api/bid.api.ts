import type { AxiosResponse } from "axios";
import { api } from "../lib/api";
import type { BidFormData, GetRequirementsWithBidsParams, RequirementsWithBidsResponse } from "../types/company/bidRequest.types";

export const requestBidService = {
  // Get all notification for user
  getNotificationForUser: async (): Promise<AxiosResponse> => {
    try {
      const response = await api.get<AxiosResponse>("/notification/user-notification");
      return response.data;
    } catch (error) {
      console.error("Error fetching notification:", error);
      throw error;
    }
  },

  // send new notification about quote request
  requestBidWithNotifications: async (data: {userId: number, userName: string, requirementId: number, companyId: number}): Promise<AxiosResponse> => {
      try {
         const response = await api.post("/client/request-bid", data);
         return response.data;
      } catch (error) {
         console.error("Error sending quote request notification:", error);
         throw error;
      }
   },

  getRequirementsWithBidRequests: async (
    params: GetRequirementsWithBidsParams
  ): Promise<RequirementsWithBidsResponse> => {
    try{
      // Build query string
      const queryParams = new URLSearchParams();
      
      // Required parameter
      queryParams.append('companyId', String(params.companyId));
      
      // Optional parameters
      if (params.status) queryParams.append('status', params.status);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());

      const response = await api.get(`/company/requirements-with-bids?${queryParams}`);
      return response.data;
    } catch (e) {
      console.log(e)
    }
  },

  // send new quote to client
  sendQuote: async (data: BidFormData): Promise<AxiosResponse> => {
      try {
         const response = await api.post("/company/submit-quote", data);
         return response.data;
      } catch (error) {
         console.error("Error sending quote to client:", error);
         throw error;
      }
   },

   //get Quote for a requirement
  getQuoteForRequirement: async (requirementId: string | number) => {
    const response = await api.get(`/client/${requirementId}/quote`);
    return response.data;
  },
  
};