'use client';

import React, { useState } from 'react';
import { PaystackButton } from './index';
import { PaymentData } from '@/hooks/use-paystack';

const PaymentStatusDemo = () => {
  const [lastResult, setLastResult] = useState<any>(null);

  const testPaymentData: PaymentData = {
    email: 'test@example.com',
    amount: 100, // ₦1.00 for testing
    currency: 'NGN',
    metadata: {
      test: true,
      demo: 'payment_status_demo',
    },
  };

  const handleSuccess = (response: any) => {
    setLastResult({
      type: 'success',
      message: 'Payment completed successfully! Redirecting to success page...',
      data: response,
    });
  };

  const handleError = (error: Error) => {
    setLastResult({
      type: 'error',
      message: error.message,
      data: error,
    });
  };

  return (
    <div className="bg-white shadow-1 rounded-[10px] p-6 sm:p-8 space-y-6">
      <h3 className="text-xl font-semibold text-dark">Payment Status Demo</h3>
      
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Payment Flow:</h4>
          <ol className="text-sm text-blue-700 space-y-1">
            <li>1. Click &quot;Pay ₦1.00&quot; → Shows &quot;Initializing...&quot;</li>
            <li>2. Popup opens → Shows &quot;Verifying Payment...&quot;</li>
            <li>3. Complete payment → Verification happens</li>
            <li>4. Result shown below based on Paystack response</li>
          </ol>
        </div>

        <PaystackButton
          paymentData={testPaymentData}
          onSuccess={handleSuccess}
          onError={handleError}
        />

        {lastResult && (
          <div className={`p-4 rounded-lg ${
            lastResult.type === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <h4 className={`font-medium mb-2 ${
              lastResult.type === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>
              {lastResult.type === 'success' ? '✅ Success' : '❌ Error'}
            </h4>
            <p className={`text-sm mb-2 ${
              lastResult.type === 'success' ? 'text-green-700' : 'text-red-700'
            }`}>
              {lastResult.message}
            </p>
            <details className="text-xs">
              <summary className="cursor-pointer">View Raw Response</summary>
              <pre className="mt-2 bg-gray-100 p-2 rounded overflow-auto">
                {JSON.stringify(lastResult.data, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-medium text-yellow-800 mb-2">What Paystack Returns:</h4>
        <div className="text-sm text-yellow-700 space-y-2">
          <p><strong>Success:</strong> data.status = &quot;success&quot;</p>
          <p><strong>Failed:</strong> data.status = &quot;failed&quot;</p>
          <p><strong>Pending:</strong> data.status = &quot;pending&quot;</p>
          <p><strong>Cancelled:</strong> Popup closed by user</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusDemo;
