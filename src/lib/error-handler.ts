// Comprehensive error handling for Paystack integration

export class PaystackError extends Error {
  public code: string;
  public statusCode: number;
  public details?: any;

  constructor(message: string, code: string = 'PAYSTACK_ERROR', statusCode: number = 500, details?: any) {
    super(message);
    this.name = 'PaystackError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class ValidationError extends PaystackError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends PaystackError {
  constructor(message: string = 'Authentication failed') {
    super(message, 'AUTH_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}

export class NetworkError extends PaystackError {
  constructor(message: string = 'Network request failed') {
    super(message, 'NETWORK_ERROR', 503);
    this.name = 'NetworkError';
  }
}

export class PaymentError extends PaystackError {
  constructor(message: string, details?: any) {
    super(message, 'PAYMENT_ERROR', 402, details);
    this.name = 'PaymentError';
  }
}

// Error handler utility functions
export const handlePaystackApiError = (error: any): PaystackError => {
  // Handle different types of errors from Paystack API
  if (error.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return new ValidationError(
          data.message || 'Invalid request parameters',
          data.errors
        );
      case 401:
        return new AuthenticationError(
          data.message || 'Invalid API key or unauthorized access'
        );
      case 404:
        return new PaystackError(
          data.message || 'Resource not found',
          'NOT_FOUND',
          404
        );
      case 429:
        return new PaystackError(
          'Too many requests. Please try again later.',
          'RATE_LIMIT',
          429
        );
      case 500:
      case 502:
      case 503:
      case 504:
        return new NetworkError(
          'Paystack service is temporarily unavailable. Please try again.'
        );
      default:
        return new PaystackError(
          data.message || 'An error occurred while processing your request',
          'API_ERROR',
          status
        );
    }
  }
  
  // Handle network errors
  if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
    return new NetworkError('Unable to connect to Paystack. Please check your internet connection.');
  }
  
  // Handle timeout errors
  if (error.code === 'ECONNABORTED') {
    return new NetworkError('Request timeout. Please try again.');
  }
  
  // Handle generic errors
  return new PaystackError(
    error.message || 'An unexpected error occurred',
    'UNKNOWN_ERROR'
  );
};

// Client-side error handler
export const handleClientError = (error: any): string => {
  if (error instanceof PaystackError) {
    switch (error.code) {
      case 'VALIDATION_ERROR':
        return error.message;
      case 'AUTH_ERROR':
        return 'Authentication failed. Please contact support.';
      case 'NETWORK_ERROR':
        return 'Connection failed. Please check your internet and try again.';
      case 'PAYMENT_ERROR':
        return error.message || 'Payment failed. Please try again.';
      case 'RATE_LIMIT':
        return 'Too many attempts. Please wait a moment and try again.';
      default:
        return 'Something went wrong. Please try again or contact support.';
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
};

// Server-side error logger
export const logError = (error: any, context: string, additionalData?: any) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    context,
    error: {
      name: error.name,
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      stack: error.stack,
    },
    additionalData,
  };
  
  // In production, you would send this to your logging service
  console.error('Paystack Error:', errorLog);
  
  // You can integrate with services like:
  // - Sentry
  // - LogRocket
  // - DataDog
  // - CloudWatch
  // - Custom logging service
};

// Retry mechanism for failed requests
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: any;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on certain error types
      if (error instanceof ValidationError || error instanceof AuthenticationError) {
        throw error;
      }
      
      // Don't retry on the last attempt
      if (attempt === maxRetries) {
        break;
      }
      
      // Calculate delay with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
};
