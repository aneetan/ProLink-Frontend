export type PaymentType = 'ESEWA' | 'STRIPE';

export interface PaymentMethod {
  id: string;
  type: PaymentType; // 'ESEWA' | 'STRIPE'
  isDefault: boolean;
}

export interface EsewaPaymentMethod extends PaymentMethod {
  type: 'ESEWA';
  accountName: string;
  phoneNumber: string;  
}

export interface StripePaymentMethod extends PaymentMethod {
  type: 'STRIPE';
  publicKey: string;
  secretKey: string;
  businessName?: string;
}

