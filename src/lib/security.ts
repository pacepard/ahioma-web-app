// Security utilities for Paystack integration

import { createHmac } from 'crypto';

// Input validation and sanitization
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

export const validateAmount = (amount: number): boolean => {
  return (
    typeof amount === 'number' &&
    !isNaN(amount) &&
    isFinite(amount) &&
    amount > 0 &&
    amount <= 100000000 // Max 1 million naira in kobo
  );
};

export const validateCurrency = (currency: string): boolean => {
  const supportedCurrencies = ['NGN', 'USD', 'GHS', 'ZAR', 'KES'];
  return supportedCurrencies.includes(currency.toUpperCase());
};

export const validateReference = (reference: string): boolean => {
  // Allow only alphanumeric, underscore, and hyphen
  const referenceRegex = /^[a-zA-Z0-9_-]+$/;
  return (
    typeof reference === 'string' &&
    reference.length >= 1 &&
    reference.length <= 100 &&
    referenceRegex.test(reference)
  );
};

// Sanitize user input
export const sanitizeString = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
};

export const sanitizeMetadata = (metadata: any): Record<string, any> => {
  if (!metadata || typeof metadata !== 'object') return {};
  
  const sanitized: Record<string, any> = {};
  
  Object.keys(metadata).forEach(key => {
    const sanitizedKey = sanitizeString(key);
    if (sanitizedKey && sanitizedKey.length <= 50) {
      const value = metadata[key];
      
      if (typeof value === 'string') {
        sanitized[sanitizedKey] = sanitizeString(value);
      } else if (typeof value === 'number' && isFinite(value)) {
        sanitized[sanitizedKey] = value;
      } else if (typeof value === 'boolean') {
        sanitized[sanitizedKey] = value;
      }
    }
  });
  
  return sanitized;
};

// Rate limiting utilities
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export const checkRateLimit = (
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000 // 1 minute
): { allowed: boolean; remaining: number; resetTime: number } => {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);
  
  if (!entry || now > entry.resetTime) {
    // Create new entry or reset expired entry
    const resetTime = now + windowMs;
    rateLimitStore.set(identifier, { count: 1, resetTime });
    return { allowed: true, remaining: maxRequests - 1, resetTime };
  }
  
  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: entry.resetTime };
  }
  
  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count, resetTime: entry.resetTime };
};

// Webhook signature verification
export const verifyWebhookSignature = (
  payload: string,
  signature: string,
  secret: string
): boolean => {
  try {
    const expectedSignature = createHmac('sha512', secret)
      .update(payload)
      .digest('hex');
    
    return signature === expectedSignature;
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
};

// Environment validation
export const validateEnvironment = (): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  // Check required environment variables
  if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
    errors.push('NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY is not set');
  }
  
  if (!process.env.PAYSTACK_SECRET_KEY) {
    errors.push('PAYSTACK_SECRET_KEY is not set');
  }
  
  // Validate key formats
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  if (publicKey && !publicKey.startsWith('pk_')) {
    errors.push('Invalid public key format');
  }
  
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (secretKey && !secretKey.startsWith('sk_')) {
    errors.push('Invalid secret key format');
  }
  
  // Check if using test keys in production
  if (process.env.NODE_ENV === 'production') {
    if (publicKey && publicKey.includes('test')) {
      errors.push('Using test public key in production');
    }
    if (secretKey && secretKey.includes('test')) {
      errors.push('Using test secret key in production');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// CSRF protection for API routes
export const generateCSRFToken = (): string => {
  return createHmac('sha256', process.env.PAYSTACK_SECRET_KEY || 'fallback')
    .update(Date.now().toString())
    .digest('hex')
    .substring(0, 32);
};

export const validateCSRFToken = (token: string, maxAge: number = 3600000): boolean => {
  try {
    // In a real implementation, you would store and validate tokens properly
    // This is a simplified version for demonstration
    return token.length === 32 && /^[a-f0-9]+$/.test(token);
  } catch (error) {
    return false;
  }
};

// Request origin validation
export const validateOrigin = (origin: string | null): boolean => {
  if (!origin) return false;
  
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_APP_URL,
    'http://localhost:3000',
    'https://localhost:3000',
  ].filter(Boolean);
  
  return allowedOrigins.includes(origin);
};

// IP address utilities
export const getClientIP = (request: Request): string => {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const remoteAddr = request.headers.get('remote-addr');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  return realIP || remoteAddr || 'unknown';
};

// Security headers for API responses
export const getSecurityHeaders = (): Record<string, string> => {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'self'",
  };
};
