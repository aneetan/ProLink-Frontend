export interface PaymentMethod {
  id: string;
  type: 'ESEWA' | 'STRIPE';
  accountName: string;
  accountNumber: string;
  isDefault: boolean;
}