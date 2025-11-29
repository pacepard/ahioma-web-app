'use client';

import React, { useState } from 'react';
import { PaystackButton } from './index';
import { PaymentData } from '@/hooks/use-paystack';
import { formatCurrency } from '@/lib/paystack';
import { Mail, CreditCard, Shield, CheckCircle } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  currency?: string;
  metadata?: Record<string, any>;
  onSuccess?: (response: any) => void;
  onError?: (error: Error) => void;
  className?: string;
  showEmailInput?: boolean;
  defaultEmail?: string;
  title?: string;
  description?: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  currency = 'NGN',
  metadata = {},
  onSuccess,
  onError,
  className = '',
  showEmailInput = true,
  defaultEmail = '',
  title = 'Complete Your Payment',
  description = 'Secure payment powered by Paystack',
}) => {
  const [email, setEmail] = useState(defaultEmail);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (emailError && newEmail) {
      validateEmail(newEmail);
    }
  };

  const handlePayment = () => {
    if (showEmailInput && !validateEmail(email)) {
      return;
    }
  };

  const paymentData: PaymentData = {
    email: email || defaultEmail,
    amount,
    currency,
    metadata: {
      ...metadata,
      source: 'web_app',
      timestamp: new Date().toISOString(),
    },
  };

  const defaultFormClassName = `
    bg-white shadow-1 rounded-[10px] p-6 sm:p-8 space-y-6
  `.trim();

  return (
    <div className={className || defaultFormClassName}>
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center w-12 h-12 bg-blue/10 rounded-full mx-auto mb-4">
          <CreditCard className="w-6 h-6 text-blue" />
        </div>
        <h3 className="text-xl font-semibold text-dark">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>

      {/* Amount Display */}
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-600 mb-1">Amount to Pay</p>
        <p className="text-2xl font-bold text-dark">
          {formatCurrency(amount, currency)}
        </p>
      </div>

      {/* Email Input */}
      {showEmailInput && (
        <div className="space-y-2">
          <label htmlFor="payment-email" className="block text-sm font-medium text-dark">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="payment-email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email address"
              className={`
                w-full pl-10 pr-4 py-3 border rounded-md outline-none duration-200
                focus:border-blue focus:shadow-input focus:ring-2 focus:ring-blue/20
                ${emailError ? 'border-red-500' : 'border-gray-300'}
              `}
              required
            />
          </div>
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>
      )}

      {/* Security Notice */}
      <div className="flex items-start space-x-3 bg-green-50 p-4 rounded-lg">
        <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <p className="text-green-800 font-medium">Secure Payment</p>
          <p className="text-green-700">
            Your payment information is encrypted and secure. Powered by Paystack.
          </p>
        </div>
      </div>

      {/* Payment Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-gray-700">Bank Transfer</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-gray-700">Card Payment</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-gray-700">USSD Payment</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-gray-700">Mobile Money</span>
        </div>
      </div>

      {/* Payment Button */}
      <PaystackButton
        paymentData={paymentData}
        onSuccess={onSuccess}
        onError={onError}
        disabled={showEmailInput && (!email || !!emailError)}
      />

      {/* Terms */}
      <p className="text-xs text-gray-500 text-center">
        By proceeding, you agree to our{' '}
        <a href="/terms" className="text-blue hover:underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-blue hover:underline">
          Privacy Policy
        </a>
      </p>
    </div>
  );
};

export default PaymentForm;
