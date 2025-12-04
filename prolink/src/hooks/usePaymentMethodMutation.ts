// hooks/usePaymentMethodMutation.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PaymentMethodUnion } from "../components/modal/AddPaymentModal";
import { paymentService } from "../api/payment.api";

type PaymentMethodResponse = {
  message: string;
  body: PaymentMethodUnion[];
};

type UpdatePaymentPayload = {
  id: string;
  updates: Partial<PaymentMethodUnion>;
};

export const usePaymentMethods = () => {
  return useQuery<PaymentMethodResponse, Error>({
    queryKey: ["paymentMethods"],
    queryFn: () => paymentService.getPayment(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 1,
  });
};

export function usePaymentMethodMutations() {
  const queryClient = useQueryClient();

  const createPaymentMethod = useMutation({
    mutationFn: (data: Omit<PaymentMethodUnion, "id">) => 
      paymentService.addPayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
    },
    onError: (error: Error) => {
      console.error("Failed to create payment method:", error);
    },
  });

  const updatePaymentMethod = useMutation<PaymentMethodUnion, Error, UpdatePaymentPayload>({
    mutationFn: ({ id, updates }) =>
      paymentService.updatePaymentMethod(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
      queryClient.invalidateQueries({ queryKey: ["paymentMethod", variables.id] });
    },
    onError: (error: Error) => {
      console.error("Failed to update payment method:", error);
    },
  });

  const deletePaymentMethod = useMutation({
    mutationFn: (id: string) => paymentService.deletePaymentMethod(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
    },
    onError: (error: Error) => {
      console.error("Failed to delete payment method:", error);
    },
  });

  return { createPaymentMethod, updatePaymentMethod, deletePaymentMethod };
}