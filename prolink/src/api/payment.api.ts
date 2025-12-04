import type { AxiosResponse } from "axios";
import type { Project } from "../types/company/project.types";
import { api } from "../lib/api";
import type { PaymentMethodUnion } from "../components/modal/AddPaymentModal";



// Project API functions
export const paymentService = {
  // Get all projects
  getPayment: async (): Promise<{ message: string; body: PaymentMethodUnion[] }> => {
    try {
      const response = await api.get<{ message: string; body: PaymentMethodUnion[] }>("/company/payments");
      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },

  // Add a new project
  addPayment: async (data: Omit<PaymentMethodUnion, "id">): Promise<{ message: string; body: PaymentMethodUnion }> => {
    try {
       const response = await api.post("/company/add-payment", data);
      return response.data;
    } catch (error) {
      console.error("Error adding payment:", error);
      throw error;
    }
  },

  // Update a project
   updatePaymentMethod: async (id: number, updates: Partial<PaymentMethodUnion>): Promise<PaymentMethodUnion> => {
    const response = await api.put(`/payment-methods/${id}`, updates);
    return response.data;
  },

  // Delete a project
   deletePaymentMethod: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/payment-methods/${id}`);
    return response.data;
  },

   setDefaultPaymentMethod: async (id: string): Promise<{ message: string; body: PaymentMethodUnion }> => {
      const response = await api.patch(`/payment-methods/${id}/default`, { isDefault: true });
      return response.data;
   },
};

// For backward compatibility
export const addProject = async (formData: Omit<Project, "id">): Promise<AxiosResponse<Project>> => {
  return await api.post<Project>("/company/add-project", formData);
};