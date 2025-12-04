import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { PAYSTACK_CONFIG } from '@/lib/paystack';

// Webhook event types
interface PaystackWebhookEvent {
  event: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string | null;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: Record<string, any>;
    fees: number;
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: Record<string, any>;
    };
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
    };
  };
}

export async function POST(request: NextRequest) {
  try {
    // Get the raw body
    const body = await request.text();
    
    // Get the signature from headers
    const signature = request.headers.get('x-paystack-signature');
    
    if (!signature) {
      console.error('No Paystack signature found in webhook request');
      return NextResponse.json(
        { message: 'No signature found' },
        { status: 400 }
      );
    }

    // Verify the webhook signature
    const expectedSignature = createHmac('sha512', PAYSTACK_CONFIG.secretKey)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Invalid Paystack webhook signature');
      return NextResponse.json(
        { message: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Parse the webhook payload
    const event: PaystackWebhookEvent = JSON.parse(body);
    
    console.log(`Received Paystack webhook: ${event.event}`, {
      reference: event.data.reference,
      status: event.data.status,
      amount: event.data.amount,
    });

    // Handle different event types
    switch (event.event) {
      case 'charge.success':
        await handleChargeSuccess(event);
        break;
      
      case 'charge.failed':
        await handleChargeFailed(event);
        break;
      
      case 'transfer.success':
        await handleTransferSuccess(event);
        break;
      
      case 'transfer.failed':
        await handleTransferFailed(event);
        break;
      
      default:
        console.log(`Unhandled webhook event: ${event.event}`);
    }

    return NextResponse.json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Error processing Paystack webhook:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleChargeSuccess(event: PaystackWebhookEvent) {
  const { data } = event;
  
  try {
    console.log(`Payment successful for reference: ${data.reference}`, {
      amount: data.amount,
      email: data.customer.email,
      paid_at: data.paid_at,
    });

    // TODO: Implement your business logic here
    // Examples:
    // - Update order status in database
    // - Send confirmation email to customer
    // - Update inventory
    // - Create receipt/invoice
    // - Trigger fulfillment process
    
    // Example database update (replace with your actual implementation)
    // await updateOrderStatus(data.reference, 'paid', {
    //   paystack_transaction_id: data.id,
    //   amount_paid: data.amount,
    //   payment_method: data.channel,
    //   paid_at: data.paid_at,
    // });
    
    // Example email notification (replace with your actual implementation)
    // await sendPaymentConfirmationEmail(data.customer.email, {
    //   reference: data.reference,
    //   amount: data.amount,
    //   currency: data.currency,
    // });

  } catch (error) {
    console.error('Error handling charge success:', error);
    throw error;
  }
}

async function handleChargeFailed(event: PaystackWebhookEvent) {
  const { data } = event;
  
  try {
    console.log(`Payment failed for reference: ${data.reference}`, {
      message: data.message,
      gateway_response: data.gateway_response,
    });

    // TODO: Implement your business logic here
    // Examples:
    // - Update order status to failed
    // - Send payment failure notification
    // - Log failed payment attempt
    // - Trigger retry mechanism if applicable
    
  } catch (error) {
    console.error('Error handling charge failed:', error);
    throw error;
  }
}

async function handleTransferSuccess(event: PaystackWebhookEvent) {
  const { data } = event;
  
  try {
    console.log(`Transfer successful for reference: ${data.reference}`);
    
    // TODO: Handle successful transfers (if you're using Paystack for payouts)
    
  } catch (error) {
    console.error('Error handling transfer success:', error);
    throw error;
  }
}

async function handleTransferFailed(event: PaystackWebhookEvent) {
  const { data } = event;
  
  try {
    console.log(`Transfer failed for reference: ${data.reference}`);
    
    // TODO: Handle failed transfers
    
  } catch (error) {
    console.error('Error handling transfer failed:', error);
    throw error;
  }
}
