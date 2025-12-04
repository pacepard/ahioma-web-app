"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

const OnboardingStep5 = () => {
  const [products, setProducts] = useState([""]);

  const handleProductChange = (index: number, value: string) => {
    const newProducts = [...products];
    newProducts[index] = value;
    setProducts(newProducts);
  };

  const addMoreProduct = () => {
    setProducts([...products, ""]);
  };

  const removeProduct = (index: number) => {
    if (products.length > 1) {
      const newProducts = products.filter((_, i) => i !== index);
      setProducts(newProducts);
    }
  };

  const isFormValid = products.some(product => product.trim() !== "");

  return (
    <>
      <section className="overflow-hidden min-h-screen flex items-center py-5">
        <div className="w-full flex mx-auto px-4 sm:px-6 xl:px-0">
          {/* Image Section */}
          <div className="hidden lg:block px-5 lg:w-1/2 relative">
            <div 
              className=" h-[93vh] rounded-[16px] w-full bg-cover bg-center overflow-hidden relative "
              style={{
                backgroundImage: 'url("/images/onboarding/onboarding-four.png")',
              }}
            >
              <div 
                className="absolute inset-0 rounded-[16px] z-0"
                style={{
                  background: 'linear-gradient(to bottom, rgba(98, 98, 98, 0.1) , rgba(0, 0, 0, 0.8))',
                }}
              />
              <div className="absolute bottom-10 left-8 text-white max-w-md z-20">
                <h2 className="text-4xl font-bold mb-3 leading-tight">What’s for sale?</h2>
                <p className="text-lg opacity-90">List all products/goods you inted to sell and we’ll take it from there.</p>
              </div>
            </div>
          </div>
       
          {/* Product Listing Content */}
          <div className="max-w-[500px] w-full mx-auto bg-white h-[93vh] flex flex-col relative">
            {/* Header with Logo and Progress */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-10">
                <Image src="/images/logo/logo.svg" alt="Ahioma Logo" className="h-8" width={120} height={32} />
              </div>
              
              {/* Progress Bar */}
              <div className="w-full">
                <div className="flex space-x-2">
                  <div className="flex-1 h-1 bg-[#116735] rounded-full"></div>
                  <div className="flex-1 h-1 bg-[#116735] rounded-full"></div>
                  <div className="flex-1 h-1 bg-[#116735] rounded-full"></div>
                  <div className="flex-1 h-1 bg-[#116735] rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center px-8 py-12">
              {/* Product Icon */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center">
                 <Image src="/images/onboarding/product.svg" alt="" width={80} height={80} />
                </div>
              </div>

              {/* Title and Description */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-[#000000] mb-3">
                  Product For Sale
                </h1>
                <p className="text-[#6B6A6A] text-sm">
                  What products do you plan to sell?
                </p>
              </div>

              {/* Product Form - Scrollable Container */}
              <div className="mb-4">
                <div className="max-h-45 overflow-y-auto space-y-4 pr-2">
                  {products.map((product, index) => (
                    <div key={index} className="relative">
                      <input
                        type="text"
                        placeholder="Enter product name here"
                        value={product}
                        onChange={(e) => handleProductChange(index, e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
                      />
                      {products.length > 1 && (
                        <button
                          onClick={() => removeProduct(index)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Add More Button */}
              <div className="mb-8">
                <button
                  onClick={addMoreProduct}
                  className="flex items-center text-[#116735] font-medium hover:text-[#0D4A26] transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add more
                </button>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between p-6">
              <Link
                href="/onboarding/step-4"
                className="text-[#6B6A6A] font-medium hover:text-[#116735] transition-colors duration-200"
              >
                Previous
              </Link>
              {isFormValid ? (
                <Link
                  href="/onboarding/complete"
                  className="px-8 py-3 rounded-full font-semibold bg-[#116735] text-white hover:bg-[#0D4A26] transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Continue
                </Link>
              ) : (
                <button
                  disabled
                  className="px-8 py-3 rounded-full font-semibold bg-[#E5E5E5] text-[#BFBFBF] cursor-not-allowed"
                >
                  Continue
                </button>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default OnboardingStep5;