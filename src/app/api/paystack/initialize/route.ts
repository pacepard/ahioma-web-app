import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('API Route: Initialize transaction called');
    
    // Get environment variables
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    
    console.log('Environment check:', {
      publicKey: publicKey ? 'Set' : 'Missing',
      secretKey: secretKey ? 'Set' : 'Missing',
    });
    
    // Check if environment variables are set
    if (!publicKey || !secretKey) {
      console.error('Missing Paystack API keys');
      return NextResponse.json(
        { 
          status: false, 
          message: 'Paystack API keys not configured. Please check your environment variables.',
          debug: {
            publicKey: publicKey ? 'Set' : 'Missing',
            secretKey: secretKey ? 'Set' : 'Missing',
          }
        },
        { status: 500 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    console.log('Request body:', body);
    
    // Basic validation
    if (!body.email || !body.amount) {
      return NextResponse.json(
        { status: false, message: 'Email and amount are required' },
        { status: 400 }
      );
    }
    
    // Prepare Paystack request
    const paystackData = {
      email: body.email,
      amount: body.amount,
      currency: body.currency || 'NGN',
      reference: body.reference,
      metadata: body.metadata || {},
    };
    
    console.log('Calling Paystack API with:', paystackData);
    
    // Call Paystack API
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paystackData),
    });
    
    const paystackResult = await paystackResponse.json();
    console.log('Paystack response:', paystackResult);
    
    if (!paystackResponse.ok) {
      console.error('Paystack API error:', paystackResult);
      return NextResponse.json(
        { 
          status: false, 
          message: paystackResult.message || 'Failed to initialize transaction with Paystack',
          debug: paystackResult
        },
        { status: paystackResponse.status }
      );
    }
    
    return NextResponse.json(paystackResult);
    
  } catch (error) {
    console.error('API Route error:', error);
    return NextResponse.json(
      { 
        status: false, 
        message: 'Internal server error',
        debug: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}