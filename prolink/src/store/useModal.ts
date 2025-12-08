import { useState, useCallback } from 'react';

export interface ModalState {
  isOpen: boolean;
  title: string;
  description: string;
  type: 'ACCEPT' | 'DECLINE' | 'CONFIRM' | 'WARNING';
  onConfirm?: () => Promise<void> | void;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  additionalContent?: React.ReactNode;
}

export const useModal = () => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    title: '',
    description: '',
    type: 'CONFIRM'
  });
  const [isLoading, setIsLoading] = useState(false);

  const openModal = useCallback((config: Omit<ModalState, 'isOpen'>) => {
    setModalState({
      ...config,
      isOpen: true
    });
  }, []);

  const closeModal = useCallback(() => {
    if (!isLoading) {
      setModalState(prev => ({ ...prev, isOpen: false }));
    }
  }, [isLoading]);

  const handleConfirm = useCallback(async () => {
    if (modalState.onConfirm) {
      try {
        setIsLoading(true);
        await modalState.onConfirm();
        closeModal();
      } catch (error) {
        console.error('Error in modal confirmation:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      closeModal();
    }
  }, [modalState.onConfirm, closeModal]);

  return {
    modalState: {
      ...modalState,
      isLoading
    },
    openModal,
    closeModal,
    handleConfirm
  };
};