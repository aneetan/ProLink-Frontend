import type { AxiosResponse } from "axios";
import { api } from "../../lib/api";
import type { NotificationData } from "../../types/notification.type";



// Project API functions
export const notificationService = {
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
  quoteRequest: async (data: {userId: number, userName: string, requirementId: number}): Promise<AxiosResponse> => {
    try {
      const response = await api.post("/notification/send-quote-request", data);
      return response.data;
    } catch (error) {
      console.error("Error sending quote request notification:", error);
      throw error;
    }
  },

};