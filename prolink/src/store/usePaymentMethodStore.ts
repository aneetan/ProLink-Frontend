import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { PaymentMethod } from '../types/company/payment.type';

interface PaymentMethodStore {
  paymentMethods: PaymentMethod[];
  loading: boolean;
  error: string | null;
  editingPaymentMethod: PaymentMethod | null;
  showAddModal: boolean;
  
  // Actions
  setPaymentMethods: (methods: PaymentMethod[]) => void;
  addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => Promise<void>;
  updatePaymentMethod: (id: string, method: Omit<PaymentMethod, 'id'>) => Promise<void>;
  deletePaymentMethod: (id: string) => Promise<void>;
  setEditingPaymentMethod: (method: PaymentMethod | null) => void;
  setShowAddModal: (show: boolean) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Generate a temporary ID for optimistic updates
const generateTempId = () => `payment-temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const usePaymentMethodStore = create<PaymentMethodStore>()(
  devtools(
    (set, get) => ({
      paymentMethods: [],
      loading: false,
      error: null,
      editingPaymentMethod: null,
      showAddModal: false,

      setPaymentMethods: (paymentMethods) => set({ paymentMethods }),

      addPaymentMethod: async (methodData) => {
        const { paymentMethods } = get();
        const tempId = generateTempId();
        
        // Check if this should be default (only if it's the first one)
        const shouldBeDefault = paymentMethods.length === 0;
        
        // Optimistic update
        const newMethod: PaymentMethod = {
          ...methodData,
          id: tempId,
          isDefault: shouldBeDefault
        };

        set((state) => ({
          paymentMethods: [...state.paymentMethods, newMethod],
          loading: true,
          error: null,
          showAddModal: false
        }));

        try {
          // Replace with your actual API call
          const response = await fetch('/api/payment-methods', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...methodData, isDefault: shouldBeDefault }),
          });

          if (!response.ok) {
            throw new Error('Failed to add payment method');
          }

          const savedMethod = await response.json();

          // Replace temp method with saved method
          set((state) => ({
            paymentMethods: state.paymentMethods.map(m => 
              m.id === tempId ? { ...savedMethod } : m
            ),
            loading: false,
          }));
        } catch (error) {
          // Revert optimistic update on error
          set((state) => ({
            paymentMethods: state.paymentMethods.filter(m => m.id !== tempId),
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to add payment method',
            showAddModal: true
          }));
        }
      },

      updatePaymentMethod: async (id: string, updates: Omit<PaymentMethod, 'id'>) => {
        const { paymentMethods } = get();
        const methodToUpdate = paymentMethods.find(m => m.id === id);
        
        if (!methodToUpdate) {
          set({ error: 'Payment method not found' });
          return;
        }

        set({ loading: true, error: null });

        // Optimistic update
        const updatedMethod = { ...methodToUpdate, ...updates };
        const updatedMethods = paymentMethods.map(m => 
          m.id === id ? updatedMethod : m
        );

        set({ paymentMethods: updatedMethods, editingPaymentMethod: null });

        try {
          // Replace with your actual API call
          const response = await fetch(`/api/payment-methods/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
          });

          if (!response.ok) {
            throw new Error('Failed to update payment method');
          }

          const savedMethod = await response.json();

          // Update with server response
          set((state) => ({
            paymentMethods: state.paymentMethods.map(m => 
              m.id === id ? { ...savedMethod } : m
            ),
            loading: false,
          }));
        } catch (error) {
          // Revert optimistic update on error
          set((state) => ({
            paymentMethods: state.paymentMethods.map(m => 
              m.id === id ? methodToUpdate : m
            ),
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to update payment method',
            editingPaymentMethod: updatedMethod
          }));
        }
      },

      deletePaymentMethod: async (id: string) => {
        const { paymentMethods } = get();
        const methodToDelete = paymentMethods.find(m => m.id === id);
        
        if (!methodToDelete) {
          set({ error: 'Payment method not found' });
          return;
        }

        // Optimistic update
        set((state) => ({
          paymentMethods: state.paymentMethods.filter(m => m.id !== id),
          loading: true,
          error: null
        }));

        try {
          // Replace with your actual API call
          const response = await fetch(`/api/payment-methods/${id}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('Failed to delete payment method');
          }

          set({ loading: false });
        } catch (error) {
          // Revert optimistic update on error
          set((state) => ({
            paymentMethods: [methodToDelete, ...state.paymentMethods],
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to delete payment method'
          }));
        }
      },

      setEditingPaymentMethod: (method) => set({ editingPaymentMethod: method }),
      
      setShowAddModal: (show) => set({ showAddModal: show }),
      
      clearError: () => set({ error: null }),
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),
    }),
    { name: 'PaymentMethodStore' }
  )
);