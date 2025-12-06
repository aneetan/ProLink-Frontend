import type { AxiosResponse } from "axios";
import { api } from "../lib/api";

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
};