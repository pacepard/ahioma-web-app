import { NextRequest, NextResponse } from 'next/server';
import { PAYSTACK_CONFIG } from '@/lib/paystack';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;

    // Validate reference format (should match our generation pattern)
    if (!reference || !reference.startsWith('ahiaoma_')) {
      return NextResponse.json(
        { valid: false, message: 'Invalid reference format' },
        { status: 400 }
      );
    }

    // Sanitize reference
    const sanitizedReference = reference.replace(/[^a-zA-Z0-9_-]/g, '');
    if (sanitizedReference !== reference) {
      return NextResponse.json(
        { valid: false, message: 'Invalid characters in reference' },
        { status: 400 }
      );
    }

    // Optional: Verify with Paystack (for extra security)
    try {
      const response = await fetch(`${PAYSTACK_CONFIG.baseUrl}/transaction/verify/${reference}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${PAYSTACK_CONFIG.secretKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        return NextResponse.json({
          valid: true,
          exists: data.status && data.data,
          status: data.data?.status || 'unknown'
        });
      } else {
        return NextResponse.json({
          valid: true,
          exists: false,
          message: 'Transaction not found in Paystack'
        });
      }
    } catch (error) {
      // If Paystack verification fails, still allow if reference format is valid
      console.warn('Paystack verification failed:', error);
      return NextResponse.json({
        valid: true,
        exists: false,
        message: 'Could not verify with payment provider'
      });
    }

  } catch (error) {
    console.error('Error validating order reference:', error);
    return NextResponse.json(
      { valid: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
