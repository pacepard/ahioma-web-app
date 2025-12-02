'use client';

import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Link from "next/link";
import { formatCurrency } from "@/lib/paystack";
import { useSearchParams } from "next/navigation";
import { getOrderDetails, clearPaymentData, isValidOrderReference } from "@/lib/payment-utils";

interface OrderDetails {
  reference: string;
  amount: number;
  currency: string;
  email: string;
  gateway_response: string;
  paid_at: string;
  channel: string;
}

const OrderSuccess = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get order details securely using only the reference
    const reference = searchParams.get('ref') || searchParams.get('reference'); // Support both for backward compatibility
    
    if (reference) {
      // Validate reference format first
      if (!isValidOrderReference(reference)) {
        console.warn('Invalid order reference format:', reference);
        setLoading(false);
        return;
      }
      
      const details = getOrderDetails(reference);
      if (details) {
        setOrderDetails(details);
      } else {
        // If no details found, this might be an invalid/expired link
        console.warn('No order details found for reference:', reference);
      }
    }
    
    setLoading(false);
    
    // Clean up any remaining payment data for security
    return () => {
      clearPaymentData();
    };
  }, [searchParams]);

  return (
    <>
      <Breadcrumb title={"Order Success"} pages={["order-success"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="bg-white rounded-xl shadow-1 px-4 py-10 sm:py-15 lg:py-20 xl:py-25">
            <div className="text-center">
              {/* Success Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h2 className="font-bold text-green-600 text-4xl lg:text-[45px] lg:leading-[57px] mb-5">
                Order Placed Successfully!
              </h2>

              <h3 className="font-medium text-dark text-xl sm:text-2xl mb-3">
                Thank you for your purchase
              </h3>

              <p className="max-w-[491px] w-full mx-auto mb-7.5 text-gray-600">
                Your payment has been processed successfully and your order is being prepared. 
                You will receive an email confirmation shortly.
              </p>

              {/* Loading State */}
              {loading && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue"></div>
                  <span className="ml-3 text-gray-600">Loading order details...</span>
                </div>
              )}

              {/* No Order Details Found */}
              {!loading && !orderDetails && (
                <div className="max-w-[600px] w-full mx-auto mb-8">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <div>
                        <h4 className="font-medium text-yellow-800">Order Details Not Available</h4>
                        <p className="text-yellow-700 text-sm mt-1">
                          We couldn&apos;t retrieve your order details. This may be due to an expired session or invalid link.
                          Please check your email for order confirmation or contact support.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Details */}
              {!loading && orderDetails && (
                <div className="max-w-[600px] w-full mx-auto mb-8">
                  <div className="bg-gray-50 rounded-lg p-6 text-left">
                    <h4 className="font-semibold text-lg text-dark mb-4 text-center">
                      Order Details
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">Order Reference:</span>
                        <span className="font-mono text-sm text-dark">{orderDetails.reference}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">Amount Paid:</span>
                        <span className="font-semibold text-lg text-green-600">
                          {formatCurrency(orderDetails.amount / 100, orderDetails.currency)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="text-dark capitalize">{orderDetails.channel}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">Status:</span>
                        <span className="text-green-600 font-medium">{orderDetails.gateway_response}</span>
                      </div>
                      
                      {orderDetails.email && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                          <span className="text-gray-600">Email:</span>
                          <span className="text-dark">{orderDetails.email}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Date & Time:</span>
                        <span className="text-dark">
                          {new Date(orderDetails.paid_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Next Steps */}
              <div className="max-w-[600px] w-full mx-auto mb-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-lg text-blue-800 mb-4">
                    What happens next?
                  </h4>
                  <div className="text-left space-y-3 text-blue-700">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        1
                      </div>
                      <p>You&apos;ll receive an email confirmation with your order details</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        2
                      </div>
                      <p>Our team will prepare your order for shipping</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        3
                      </div>
                      <p>You&apos;ll get a tracking number once your order ships</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/shop-with-sidebar"
                  className="inline-flex items-center gap-2 font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark"
                >
                  <svg
                    className="fill-current"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 18.8 10.5 18S9.8 16.5 9 16.5 7.5 17.2 7.5 18 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 18.8 21.5 18S20.8 16.5 20 16.5 18.5 17.2 18.5 18 19.2 19.5 20 19.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                  Continue Shopping
                </Link>

                <Link
                  href="/"
                  className="inline-flex items-center gap-2 font-medium text-blue bg-white border border-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue hover:text-white"
                >
                  <svg
                    className="fill-current"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.6654 9.37502C17.0105 9.37502 17.2904 9.65484 17.2904 10C17.2904 10.3452 17.0105 10.625 16.6654 10.625H8.95703L8.95703 15C8.95703 15.2528 8.80476 15.4807 8.57121 15.5774C8.33766 15.6742 8.06884 15.6207 7.89009 15.442L2.89009 10.442C2.77288 10.3247 2.70703 10.1658 2.70703 10C2.70703 9.83426 2.77288 9.67529 2.89009 9.55808L7.89009 4.55808C8.06884 4.37933 8.33766 4.32586 8.57121 4.42259C8.80475 4.51933 8.95703 4.74723 8.95703 5.00002L8.95703 9.37502H16.6654Z"
                      fill=""
                    />
                  </svg>
                  Back to Home
                </Link>
              </div>

              {/* Support Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Need help? Contact our support team at{" "}
                  <a href="mailto:support@ahiaoma.com" className="text-blue hover:underline">
                    support@ahiaoma.com
                  </a>{" "}
                  or call{" "}
                  <a href="tel:+2348000000000" className="text-blue hover:underline">
                    +234 800 000 0000
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderSuccess;
