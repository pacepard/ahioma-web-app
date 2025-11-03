"use client";
import Link from "next/link";
import React, { useState } from "react";

const OnboardingStep4 = () => {
  const [formData, setFormData] = useState({
    nin: "",
    bvn: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isFormValid = formData.nin && formData.bvn;

  return (
    <>
      <section className="overflow-hidden min-h-screen flex items-center py-5">
        <div className="w-full flex mx-auto px-4 sm:px-6 xl:px-0">
          {/* Image Section */}
          <div className="hidden lg:block px-5 lg:w-1/2 relative">
            <div 
              className=" h-[93vh] rounded-[16px] w-full bg-cover bg-center overflow-hidden relative "
              style={{
                backgroundImage: 'url("/images/onboarding/onboarding-three.png")',
              }}
            >
              <div 
                className="absolute inset-0 rounded-[16px] z-0"
                style={{
                  background: 'linear-gradient(to bottom, rgba(98, 98, 98, 0.1) , rgba(0, 0, 0, 0.8))',
                }}
              />
              <div className="absolute bottom-10 left-8 text-white max-w-md z-20">
                <h2 className="text-4xl font-bold mb-3 leading-tight">Get Verified</h2>
                <p className="text-lg opacity-90">Your verification status guarantess buyers trust.</p>
              </div>
            </div>
          </div>
       
          {/* Identity Verification Content */}
          <div className="max-w-[500px] w-full mx-auto bg-white h-[93vh] flex flex-col relative">
            {/* Header with Logo and Progress */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-10">
                <img src="/images/logo/logo.svg" alt="Ahioma Logo" className="h-8" />
                <div className="text-sm text-gray-500">Step 3 of 4</div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full">
                <div className="flex space-x-2">
                  <div className="flex-1 h-1 bg-[#116735] rounded-full"></div>
                  <div className="flex-1 h-1 bg-[#116735] rounded-full"></div>
                  <div className="flex-1 h-1 bg-[#116735] rounded-full"></div>
                  <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center px-8 py-12">
              {/* Verification Icon */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center">
                 <img src="/images/onboarding/verify.png" alt="" />
                </div>
              </div>

              {/* Title and Description */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-[#000000] mb-3">
                  Verify Identity
                </h1>
                <p className="text-[#6B6A6A] text-sm">
                  We need to verify your identity to ensure platform security
                </p>
              </div>

              {/* Verification Form */}
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIN(National Identification Number)
                  </label>
                  <input
                    type="text"
                    name="nin"
                    placeholder="Enter your 11 digit BVN"
                    value={formData.nin}
                    onChange={handleInputChange}
                    maxLength={11}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    BVN(Bank Verification Number)
                  </label>
                  <input
                    type="text"
                    name="bvn"
                    placeholder="Enter your 11 digit BVN"
                    value={formData.bvn}
                    onChange={handleInputChange}
                    maxLength={11}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between p-6">
              <Link
                href="/onboarding/step-3"
                className="text-[#6B6A6A] font-medium hover:text-[#116735] transition-colors duration-200"
              >
                Previous
              </Link>
              {isFormValid ? (
                <Link
                  href="/onboarding/complete"
                  className="px-8 py-3 rounded-full font-semibold bg-[#116735] text-white hover:bg-[#0D4A26] transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Save and Continue
                </Link>
              ) : (
                <button
                  disabled
                  className="px-8 py-3 rounded-full font-semibold bg-[#E5E5E5] text-[#BFBFBF] cursor-not-allowed"
                >
                  Save and Continue
                </button>
              )}
            </div>

           
          </div>
        </div>
      </section>
    </>
  );
};

export default OnboardingStep4;