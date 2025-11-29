// Paystack configuration and utilities
export const PAYSTACK_CONFIG = {
  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
  secretKey: process.env.PAYSTACK_SECRET_KEY || '',
  baseUrl: 'https://api.paystack.co',
  scriptUrl: 'https://js.paystack.co/v1/inline.js',
} as const;

export interface PaystackTransaction {
  email: string;
  amount: number; // Amount in kobo (multiply by 100 for naira)
  currency?: string;
  reference?: string;
  callback_url?: string;
  metadata?: Record<string, any>;
  channels?: string[];
  split_code?: string;
  subaccount?: string;
  transaction_charge?: number;
  bearer?: string;
}

export interface PaystackResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerificationResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string | null;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: Record<string, any>;
    log: any;
    fees: number;
    fees_split: any;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
      account_name: string | null;
    };
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: Record<string, any>;
      risk_action: string;
      international_format_phone: string | null;
    };
    plan: any;
    split: any;
    order_id: any;
    paidAt: string;
    createdAt: string;
    requested_amount: number;
    pos_transaction_data: any;
    source: any;
    fees_breakdown: any;
  };
}

// Generate a unique transaction reference
export const generateTransactionReference = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `ahiaoma_${timestamp}_${random}`;
};

// Convert amount from Naira to Kobo
export const convertToKobo = (amount: number): number => {
  return Math.round(amount * 100);
};

// Convert amount from Kobo to Naira
export const convertToNaira = (amount: number): number => {
  return amount / 100;
};

// Validate Paystack configuration
export const validatePaystackConfig = (): boolean => {
  console.log('Validating Paystack config:', {
    publicKey: PAYSTACK_CONFIG.publicKey ? 'Set' : 'Missing',
    secretKey: PAYSTACK_CONFIG.secretKey ? 'Set' : 'Missing',
    isClient: typeof window !== 'undefined'
  });
  
  if (!PAYSTACK_CONFIG.publicKey) {
    console.error('Paystack public key is not configured. Please set NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY in your .env.local file');
    return false;
  }
  
  if (!PAYSTACK_CONFIG.secretKey && typeof window === 'undefined') {
    console.error('Paystack secret key is not configured. Please set PAYSTACK_SECRET_KEY in your .env.local file');
    return false;
  }
  
  return true;
};

// Format currency for display
export const formatCurrency = (amount: number, currency: string = 'NGN'): string => {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  });
  
  return formatter.format(amount);
};
