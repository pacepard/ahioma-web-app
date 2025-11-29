import { NextRequest, NextResponse } from 'next/server';
import { PAYSTACK_CONFIG, validatePaystackConfig } from '@/lib/paystack';

export async function GET(
  request: NextRequest,
  { params }: { params: { reference: string } }
) {
  try {
    // Validate Paystack configuration
    if (!validatePaystackConfig()) {
      return NextResponse.json(
        { status: false, message: 'Paystack configuration is invalid' },
        { status: 500 }
      );
    }

    const { reference } = params;

    // Validate reference
    if (!reference || typeof reference !== 'string') {
      return NextResponse.json(
        { status: false, message: 'Invalid transaction reference' },
        { status: 400 }
      );
    }

    // Sanitize reference (allow only alphanumeric, underscore, and hyphen)
    const sanitizedReference = reference.replace(/[^a-zA-Z0-9_-]/g, '');
    if (sanitizedReference !== reference) {
      return NextResponse.json(
        { status: false, message: 'Invalid characters in reference' },
        { status: 400 }
      );
    }

    // Make request to Paystack API
    const response = await fetch(`${PAYSTACK_CONFIG.baseUrl}/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_CONFIG.secretKey}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Paystack verification error:', data);
      return NextResponse.json(
        { 
          status: false, 
          message: data.message || 'Failed to verify transaction' 
        },
        { status: response.status }
      );
    }

    // Additional validation of transaction data
    if (data.status && data.data) {
      const transaction = data.data;
      
      // Log successful verification (you might want to save this to database)
      console.log(`Transaction verified: ${reference}`, {
        status: transaction.status,
        amount: transaction.amount,
        email: transaction.customer?.email,
        paid_at: transaction.paid_at,
      });

      // You can add additional business logic here, such as:
      // - Updating order status in database
      // - Sending confirmation emails
      // - Updating inventory
      // - Creating receipts
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error verifying Paystack transaction:', error);
    return NextResponse.json(
      { 
        status: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
