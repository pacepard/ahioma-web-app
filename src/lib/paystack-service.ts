import { 
  PAYSTACK_CONFIG, 
  PaystackTransaction, 
  PaystackResponse, 
  PaystackVerificationResponse,
  generateTransactionReference,
  convertToKobo
} from './paystack';

export class PaystackService {
  private static instance: PaystackService;
  
  private constructor() {}
  
  public static getInstance(): PaystackService {
    if (!PaystackService.instance) {
      PaystackService.instance = new PaystackService();
    }
    return PaystackService.instance;
  }

  /**
   * Initialize a transaction on the server side
   */
  async initializeTransaction(transaction: PaystackTransaction): Promise<PaystackResponse> {
    try {
      console.log('PaystackService: Initializing transaction...', transaction);
      
      const requestBody = {
        ...transaction,
        amount: convertToKobo(transaction.amount),
        reference: transaction.reference || generateTransactionReference(),
      };
      
      console.log('PaystackService: Request body:', requestBody);
      
      const response = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('PaystackService: Response status:', response.status);
      
      const data = await response.json();
      console.log('PaystackService: Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      if (!data.status) {
        throw new Error(data.message || 'Failed to initialize transaction');
      }

      return data;
    } catch (error) {
      console.error('Error initializing Paystack transaction:', error);
      throw error;
    }
  }

  /**
   * Verify a transaction on the server side
   */
  async verifyTransaction(reference: string): Promise<PaystackVerificationResponse> {
    try {
      const response = await fetch(`/api/paystack/verify/${reference}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PaystackVerificationResponse = await response.json();
      
      if (!data.status) {
        throw new Error(data.message || 'Failed to verify transaction');
      }

      return data;
    } catch (error) {
      console.error('Error verifying Paystack transaction:', error);
      throw error;
    }
  }

  /**
   * Load Paystack inline script dynamically
   */
  loadPaystackScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if script is already loaded
      if (window.PaystackPop) {
        resolve();
        return;
      }

      // Check if script is already in DOM
      const existingScript = document.querySelector(`script[src="${PAYSTACK_CONFIG.scriptUrl}"]`);
      if (existingScript) {
        existingScript.addEventListener('load', () => resolve());
        existingScript.addEventListener('error', reject);
        return;
      }

      // Create and load script
      const script = document.createElement('script');
      script.src = PAYSTACK_CONFIG.scriptUrl;
      script.async = true;
      
      script.onload = () => {
        if (window.PaystackPop) {
          resolve();
        } else {
          reject(new Error('Paystack script loaded but PaystackPop not available'));
        }
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load Paystack script'));
      };

      document.head.appendChild(script);
    });
  }

  /**
   * Open Paystack payment popup
   */
  async openPaymentPopup(config: PaystackPopupConfig): Promise<PaystackPopupResponse> {
    try {
      await this.loadPaystackScript();

      return new Promise((resolve, reject) => {
        const handler = window.PaystackPop.setup({
          key: PAYSTACK_CONFIG.publicKey,
          email: config.email,
          amount: convertToKobo(config.amount),
          currency: config.currency || 'NGN',
          ref: config.reference || generateTransactionReference(),
          metadata: config.metadata || {},
          channels: config.channels,
          callback: (response: PaystackPopupResponse) => {
            resolve(response);
          },
          onClose: () => {
            reject(new Error('Payment was cancelled by user'));
          },
        });

        handler.openIframe();
      });
    } catch (error) {
      console.error('Error opening Paystack popup:', error);
      throw error;
    }
  }
}

// Types for Paystack popup
export interface PaystackPopupConfig {
  email: string;
  amount: number;
  currency?: string;
  reference?: string;
  metadata?: Record<string, any>;
  channels?: string[];
}

export interface PaystackPopupResponse {
  reference: string;
  status: string;
  message: string;
  trans: string;
  transaction: string;
  trxref: string;
}

// Extend Window interface for PaystackPop
declare global {
  interface Window {
    PaystackPop: {
      setup: (config: any) => {
        openIframe: () => void;
      };
    };
  }
}

// Export singleton instance
export const paystackService = PaystackService.getInstance();
