'use client';

import React from 'react';
import { usePaystack, PaymentData } from '@/hooks/use-paystack';
import { formatCurrency } from '@/lib/paystack';
import { Loader2 } from 'lucide-react';

interface PaystackButtonProps {
  paymentData: PaymentData;
  onSuccess?: (response: any) => void;
  onError?: (error: Error) => void;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const PaystackButton: React.FC<PaystackButtonProps> = ({
  paymentData,
  onSuccess,
  onError,
  className = '',
  children,
  disabled = false,
}) => {
  const { initializePayment, isLoading, isVerifying, error } = usePaystack({
    onSuccess,
    onError,
  });

  const handlePayment = async () => {
    if (disabled || isLoading || isVerifying) return;

    // Validate payment data
    if (!paymentData.email || !paymentData.amount) {
      onError?.(new Error('Email and amount are required'));
      return;
    }

    if (paymentData.amount <= 0) {
      onError?.(new Error('Amount must be greater than zero'));
      return;
    }

    console.log('PaystackButton: Starting payment process...', paymentData);
    
    try {
      await initializePayment(paymentData);
    } catch (error) {
      console.error('PaystackButton: Payment failed:', error);
      onError?.(error instanceof Error ? error : new Error('Payment failed'));
    }
  };

  const isProcessing = isLoading || isVerifying;
  const buttonDisabled = disabled || isProcessing;

  const defaultClassName = `
    w-full flex items-center justify-center font-medium text-white bg-blue py-3 px-6 
    rounded-md ease-out duration-200 hover:bg-blue-dark disabled:opacity-50 
    disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue/20
  `.trim();

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={buttonDisabled}
      className={className || defaultClassName}
      aria-label={`Pay ${formatCurrency(paymentData.amount, paymentData.currency)}`}
    >
      {isProcessing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {isLoading && 'Initializing...'}
      {isVerifying && 'Verifying Payment...'}
      {!isProcessing && (
        children || `Pay ${formatCurrency(paymentData.amount, paymentData.currency)}`
      )}
    </button>
  );
};

export default PaystackButton;
