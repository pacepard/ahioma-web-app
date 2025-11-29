'use client';

import { useState, useCallback } from 'react';
import { paystackService, PaystackPopupConfig, PaystackPopupResponse } from '@/lib/paystack-service';
import { PaystackTransaction, generateTransactionReference } from '@/lib/paystack';
import { redirectToOrderSuccess, OrderDetails } from '@/lib/payment-utils';
import toast from 'react-hot-toast';

export interface UsePaystackOptions {
  onSuccess?: (response: PaystackPopupResponse) => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
}

export interface PaymentData {
  email: string;
  amount: number;
  currency?: string;
  metadata?: Record<string, any>;
  channels?: string[];
}

export const usePaystack = (options: UsePaystackOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializePayment = useCallback(async (paymentData: PaymentData) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('Initializing payment with data:', paymentData);

      // Generate unique reference
      const reference = generateTransactionReference();
      console.log('Generated reference:', reference);

      // Initialize transaction on server
      console.log('Calling initializeTransaction...');
      const initResponse = await paystackService.initializeTransaction({
        email: paymentData.email,
        amount: paymentData.amount,
        currency: paymentData.currency || 'NGN',
        reference,
        metadata: paymentData.metadata,
        channels: paymentData.channels,
      });

      console.log('Initialize response:', initResponse);

      if (!initResponse.status) {
        throw new Error(initResponse.message || 'Failed to initialize payment');
      }

      // Open payment popup
      const popupConfig: PaystackPopupConfig = {
        email: paymentData.email,
        amount: paymentData.amount,
        currency: paymentData.currency || 'NGN',
        reference: initResponse.data.reference,
        metadata: paymentData.metadata,
        channels: paymentData.channels,
      };

      // Set loading to false before opening popup, set verifying to true
      setIsLoading(false);
      setIsVerifying(true);
      
      const popupResponse = await paystackService.openPaymentPopup(popupConfig);
      
      // Verify payment on server
      const verificationResponse = await paystackService.verifyTransaction(popupResponse.reference);
      
      console.log('Verification response:', verificationResponse);
      
      if (verificationResponse.status && verificationResponse.data) {
        const paymentStatus = verificationResponse.data.status;
        
        if (paymentStatus === 'success') {
          toast.success('Payment successful! Redirecting...');
          
          // Prepare order details for success page
          const orderDetails: OrderDetails = {
            reference: verificationResponse.data.reference,
            amount: verificationResponse.data.amount,
            currency: verificationResponse.data.currency,
            email: verificationResponse.data.customer?.email || paymentData.email,
            gateway_response: verificationResponse.data.gateway_response,
            paid_at: verificationResponse.data.paid_at,
            channel: verificationResponse.data.channel
          };
          
          // Call success callback
          options.onSuccess?.(popupResponse);
          
          // Redirect to success page
          redirectToOrderSuccess(orderDetails);
          
          return { 
            success: true, 
            reference: popupResponse.reference, 
            data: verificationResponse.data,
            amount: verificationResponse.data.amount,
            gateway_response: verificationResponse.data.gateway_response
          };
        } else if (paymentStatus === 'failed') {
          const failureReason = verificationResponse.data.gateway_response || 'Payment was declined';
          throw new Error(`Payment failed: ${failureReason}`);
        } else if (paymentStatus === 'pending') {
          throw new Error('Payment is still being processed. Please wait a moment and check your email for confirmation.');
        } else {
          throw new Error(`Payment status: ${paymentStatus}. Please contact support if you were charged.`);
        }
      } else {
        throw new Error('Unable to verify payment. Please contact support if you were charged.');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment failed';
      setError(errorMessage);
      toast.error(errorMessage);
      options.onError?.(error instanceof Error ? error : new Error(errorMessage));
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
      setIsVerifying(false);
    }
  }, [options]);

  const verifyPayment = useCallback(async (reference: string) => {
    try {
      setIsVerifying(true);
      setError(null);

      const response = await paystackService.verifyTransaction(reference);
      
      if (response.status && response.data.status === 'success') {
        return { success: true, data: response.data };
      } else {
        throw new Error(response.message || 'Payment verification failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Verification failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsVerifying(false);
    }
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    initializePayment,
    verifyPayment,
    resetError,
    isLoading,
    isVerifying,
    error,
  };
};
