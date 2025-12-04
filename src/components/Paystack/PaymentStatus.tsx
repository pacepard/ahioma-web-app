'use client';

import React from 'react';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/paystack';

export type PaymentStatusType = 'success' | 'failed' | 'pending' | 'processing';

interface PaymentStatusProps {
  status: PaymentStatusType;
  reference?: string;
  amount?: number;
  currency?: string;
  message?: string;
  onRetry?: () => void;
  onContinue?: () => void;
  className?: string;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({
  status,
  reference,
  amount,
  currency = 'NGN',
  message,
  onRetry,
  onContinue,
  className = '',
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'success':
        return {
          icon: CheckCircle,
          iconColor: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          title: 'Payment Successful!',
          defaultMessage: 'Your payment has been processed successfully.',
        };
      case 'failed':
        return {
          icon: XCircle,
          iconColor: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          title: 'Payment Failed',
          defaultMessage: 'Your payment could not be processed. Please try again.',
        };
      case 'pending':
        return {
          icon: Clock,
          iconColor: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          title: 'Payment Pending',
          defaultMessage: 'Your payment is being processed. Please wait.',
        };
      case 'processing':
        return {
          icon: AlertCircle,
          iconColor: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          title: 'Processing Payment',
          defaultMessage: 'Please wait while we process your payment.',
        };
      default:
        return {
          icon: AlertCircle,
          iconColor: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          title: 'Payment Status Unknown',
          defaultMessage: 'Unable to determine payment status.',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const defaultClassName = `
    bg-white shadow-1 rounded-[10px] p-6 sm:p-8 text-center space-y-6
  `.trim();

  return (
    <div className={className || defaultClassName}>
      {/* Status Icon and Background */}
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${config.bgColor} ${config.borderColor} border-2`}>
        <Icon className={`w-8 h-8 ${config.iconColor}`} />
      </div>

      {/* Status Title */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-dark">{config.title}</h3>
        <p className="text-gray-600">
          {message || config.defaultMessage}
        </p>
      </div>

      {/* Payment Details */}
      {(amount || reference) && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          {amount && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Amount:</span>
              <span className="font-semibold text-dark">
                {formatCurrency(amount, currency)}
              </span>
            </div>
          )}
          {reference && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Reference:</span>
              <span className="font-mono text-sm text-dark">{reference}</span>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {status === 'failed' && onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-blue text-white font-medium rounded-md hover:bg-blue-dark transition-colors duration-200"
          >
            Try Again
          </button>
        )}
        
        {status === 'success' && onContinue && (
          <button
            onClick={onContinue}
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors duration-200"
          >
            Continue Shopping
          </button>
        )}
        
        {(status === 'pending' || status === 'processing') && (
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue"></div>
            <span className="text-sm">Please wait...</span>
          </div>
        )}
      </div>

      {/* Additional Information */}
      {status === 'success' && (
        <div className="text-sm text-gray-500 space-y-1">
          <p>A confirmation email has been sent to your email address.</p>
          <p>Keep your reference number for future inquiries.</p>
        </div>
      )}

      {status === 'failed' && (
        <div className="text-sm text-gray-500 space-y-1">
          <p>If you continue to experience issues, please contact support.</p>
          <p>No charges have been made to your account.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentStatus;
