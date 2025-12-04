"use client";
import React, { useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Login from "./Login";
import Shipping from "./Shipping";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import Coupon from "./Coupon";
import Billing from "./Billing";
import { PaystackButton } from "../Paystack";
import { PaymentData } from "@/hooks/use-paystack";
import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/store";
import { selectCartItems, selectTotalPrice, removeAllItemsFromCart } from "@/redux/features/cart-slice";
import { formatCurrency } from "@/lib/paystack";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

const Checkout = () => {
  const [customerEmail, setCustomerEmail] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  // Get cart data from Redux store
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectTotalPrice);
  
  const shippingFee = 15.00;
  const totalAmount = cartTotal + shippingFee;

  const handlePaymentSuccess = (response: any) => {
    setIsProcessingPayment(false);
    console.log("Payment successful:", response);
    
    // Clear cart after successful payment
    dispatch(removeAllItemsFromCart());
    
    // Note: The redirect to success page is handled in the usePaystack hook
    // We don't need to do anything else here as the user will be redirected
  };

  const handlePaymentError = (error: Error) => {
    setIsProcessingPayment(false);
    console.error("Payment error:", error);
    
    // Show more specific error messages and keep user on checkout page
    if (error.message.includes('configuration')) {
      toast.error("Payment system not configured. Please contact support.");
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
      toast.error("Network error. Please check your connection and try again.");
    } else if (error.message.includes('cancelled by user')) {
      toast.error("Payment was cancelled. You can try again when ready.");
    } else if (error.message.includes('Insufficient')) {
      toast.error("Insufficient funds. Please try a different payment method.");
    } else if (error.message.includes('Declined')) {
      toast.error("Payment was declined. Please try a different card or payment method.");
    } else {
      toast.error(`Payment failed: ${error.message}`);
    }
    
    // Keep user on checkout page to retry payment
    // No redirect on failure
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items before checkout.");
      return;
    }
    
    if (!customerEmail) {
      toast.error("Please provide your email address");
      return;
    }
    
    setIsProcessingPayment(true);
  };

  const paymentData: PaymentData = {
    email: customerEmail,
    amount: totalAmount,
    currency: "NGN",
    metadata: {
      order_items: cartItems.map(item => ({
        id: item.id,
        name: item.title,
        price: item.discountedPrice,
        quantity: item.quantity,
      })),
      shipping_fee: shippingFee,
      customer_email: customerEmail,
      cart_total: cartTotal,
    },
  };

  return (
    <>
      <Breadcrumb title={"Checkout"} pages={["checkout"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
              {/* <!-- checkout left --> */}
              <div className="lg:max-w-[670px] w-full">
                {/* <!-- login box --> */}
                <Login />

                {/* <!-- billing details --> */}
                <Billing onEmailChange={setCustomerEmail} />

                {/* <!-- address box two --> */}
                <Shipping />

                {/* <!-- others note box --> */}
                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                  <div>
                    <label htmlFor="notes" className="block mb-2.5">
                      Other Notes (optional)
                    </label>

                    <textarea
                      name="notes"
                      id="notes"
                      rows={5}
                      placeholder="Notes about your order, e.g. speacial notes for delivery."
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* // <!-- checkout right --> */}
              <div className="max-w-[455px] w-full">
                {/* <!-- order list box --> */}
                <div className="bg-white shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">
                      Your Order
                    </h3>
                  </div>

                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    {/* <!-- title --> */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <h4 className="font-medium text-dark">Product</h4>
                      </div>
                      <div>
                        <h4 className="font-medium text-dark text-right">
                          Subtotal
                        </h4>
                      </div>
                    </div>

                    {/* <!-- cart items --> */}
                    {cartItems.length > 0 ? (
                      cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-5 border-b border-gray-3">
                          <div>
                            <p className="text-dark">
                              {item.title} {item.quantity > 1 && `× ${item.quantity}`}
                            </p>
                          </div>
                          <div>
                            <p className="text-dark text-right">
                              {formatCurrency(item.discountedPrice * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-10 border-b border-gray-3">
                        <p className="text-gray-500 mb-3">Your cart is empty</p>
                        <a 
                          href="/shop-with-sidebar" 
                          className="text-blue hover:text-blue-dark underline text-sm"
                        >
                          Continue Shopping
                        </a>
                      </div>
                    )}

                    {/* <!-- shipping fee --> */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <p className="text-dark">Shipping Fee</p>
                      </div>
                      <div>
                        <p className="text-dark text-right">{formatCurrency(shippingFee)}</p>
                      </div>
                    </div>

                    {/* <!-- total --> */}
                    <div className="flex items-center justify-between pt-5">
                      <div>
                        <p className="font-medium text-lg text-dark">Total</p>
                      </div>
                      <div>
                        <p className="font-medium text-lg text-dark text-right">
                          {formatCurrency(totalAmount)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- coupon box --> */}
                <Coupon />

                {/* <!-- shipping box --> */}
                <ShippingMethod />

                {/* <!-- payment box --> */}
                <PaymentMethod />

                {/* <!-- checkout button --> */}
                {isProcessingPayment ? (
                  <PaystackButton
                    paymentData={paymentData}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
                  />
                ) : (
                  <button
                    type="submit"
                    disabled={cartItems.length === 0}
                    className={`w-full flex justify-center font-medium text-white py-3 px-6 rounded-md ease-out duration-200 mt-7.5 ${
                      cartItems.length === 0 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue hover:bg-blue-dark'
                    }`}
                  >
                    {cartItems.length === 0 ? 'Cart is Empty' : 'Proceed to Payment'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;
