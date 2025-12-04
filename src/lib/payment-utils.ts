// Payment utility functions

export interface OrderDetails {
  reference: string;
  amount: number;
  currency: string;
  email: string;
  gateway_response: string;
  paid_at: string;
  channel: string;
}

/**
 * Redirect to order success page with order details (secure version)
 */
export const redirectToOrderSuccess = (orderDetails: OrderDetails, delay: number = 1500) => {
  // Store sensitive details in sessionStorage (more secure than localStorage)
  const sessionKey = `order_${orderDetails.reference}`;
  sessionStorage.setItem(sessionKey, JSON.stringify(orderDetails));
  
  // Also store in localStorage as fallback (will be cleared after use)
  localStorage.setItem('lastSuccessfulOrder', JSON.stringify(orderDetails));
  
  // Only pass the reference in URL - much safer
  const params = new URLSearchParams({
    ref: orderDetails.reference
  });
  
  // Redirect after delay to show success message
  setTimeout(() => {
    window.location.href = `/order-success?${params.toString()}`;
  }, delay);
};

/**
 * Securely retrieve order details by reference
 */
export const getOrderDetails = (reference: string): OrderDetails | null => {
  if (!reference) return null;
  
  // Try to get from sessionStorage first (most secure)
  const sessionKey = `order_${reference}`;
  const sessionData = sessionStorage.getItem(sessionKey);
  
  if (sessionData) {
    try {
      const orderDetails = JSON.parse(sessionData);
      // Clear from sessionStorage after retrieval for security
      sessionStorage.removeItem(sessionKey);
      return orderDetails;
    } catch (error) {
      console.error('Error parsing session order data:', error);
    }
  }
  
  // Fallback to localStorage
  const localData = localStorage.getItem('lastSuccessfulOrder');
  if (localData) {
    try {
      const orderDetails = JSON.parse(localData);
      // Verify the reference matches for security
      if (orderDetails.reference === reference) {
        // Clear from localStorage after use
        localStorage.removeItem('lastSuccessfulOrder');
        return orderDetails;
      }
    } catch (error) {
      console.error('Error parsing local order data:', error);
    }
  }
  
  return null;
};

/**
 * Clear sensitive payment data from storage
 */
export const clearPaymentData = () => {
  localStorage.removeItem('lastSuccessfulOrder');
  localStorage.removeItem('pendingPayment');
  
  // Clear all order session data
  Object.keys(sessionStorage).forEach(key => {
    if (key.startsWith('order_')) {
      sessionStorage.removeItem(key);
    }
  });
};

/**
 * Get payment status message based on Paystack response
 */
export const getPaymentStatusMessage = (status: string, gateway_response?: string): string => {
  switch (status) {
    case 'success':
      return 'Payment completed successfully!';
    case 'failed':
      return `Payment failed: ${gateway_response || 'Transaction was declined'}`;
    case 'pending':
      return 'Payment is being processed. Please wait for confirmation.';
    case 'abandoned':
      return 'Payment was cancelled by user.';
    default:
      return `Payment status: ${status}`;
  }
};

/**
 * Format payment method display name
 */
export const formatPaymentMethod = (channel: string): string => {
  const channelMap: Record<string, string> = {
    'card': 'Credit/Debit Card',
    'bank': 'Bank Transfer',
    'ussd': 'USSD',
    'mobile_money': 'Mobile Money',
    'qr': 'QR Code',
    'eft': 'Electronic Transfer'
  };
  
  return channelMap[channel] || channel.charAt(0).toUpperCase() + channel.slice(1);
};

/**
 * Validate order reference format
 */
export const isValidOrderReference = (reference: string): boolean => {
  if (!reference || typeof reference !== 'string') return false;
  
  // Should start with 'ahiaoma_' and contain only safe characters
  const pattern = /^ahiaoma_\d+_[a-zA-Z0-9]+$/;
  return pattern.test(reference) && reference.length <= 100;
};

/**
 * Validate order reference with server
 */
export const validateOrderReference = async (reference: string): Promise<{valid: boolean, exists?: boolean, message?: string}> => {
  if (!isValidOrderReference(reference)) {
    return { valid: false, message: 'Invalid reference format' };
  }
  
  try {
    const response = await fetch(`/api/orders/validate/${reference}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error validating reference:', error);
    return { valid: false, message: 'Validation failed' };
  }
};
