"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

const OnboardingStep3 = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    location: "",
    phone: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isFormValid = formData.fullName && formData.email && formData.location && formData.phone;

  return (
    <>
      <section className="overflow-hidden min-h-screen flex items-center py-5">
        <div className="w-full flex mx-auto px-4 sm:px-6 xl:px-0">
          {/* Image Section */}
          <div className="hidden lg:block px-5 lg:w-1/2 relative">
            <div 
              className=" h-[93vh] rounded-[16px] w-full bg-cover bg-center overflow-hidden relative "
              style={{
                backgroundImage: 'url("/images/onboarding/onboarding-two.png")',
              }}
            >
              <div 
                className="absolute inset-0 rounded-[16px] z-0"
                style={{
                  background: 'linear-gradient(to bottom, rgba(98, 98, 98, 0.1) , rgba(0, 0, 0, 0.8))',
                }}
              />
              <div className="absolute bottom-10 left-8 text-white max-w-md z-20">
                <h2 className="text-4xl font-bold mb-3 leading-tight">Let’s get to know you</h2>
                <p className="text-lg opacity-90">Let’s get to know you
                Verified sellers get 100% more orders on our platform</p>
              </div>
            </div>
          </div>
       
          {/* Profile Setup Content */}
          <div className="max-w-[500px] w-full mx-auto bg-white h-[93vh] flex flex-col relative">
            {/* Header with Logo and Progress */}
            <div className="p-6 ">
              <div className="flex items-center justify-between mb-10">
                <Image src="/images/logo/logo.svg" alt="Ahioma Logo" className="h-8" width={120} height={32} />
                <div className="text-sm text-gray-500">Step 2 of 4</div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full">
                <div className="flex space-x-2">
                  <div className="flex-1 h-1 bg-[#116735] rounded-full"></div>
                  <div className="flex-1 h-1 bg-[#116735] rounded-full"></div>
                  <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
                </div>
              </div>
             
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center px-8 py-12">
              {/* User Profile Icon */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center">
                 <Image src="/images/onboarding/person.svg" alt="" width={80} height={80} />
                </div>
              </div>

              {/* Title and Description */}
              <div className="text-center mb-5">
                <h1 className="text-2xl font-semibold text-[#000000] mb-3">
                  Setup your profile
                </h1>
                <p className="text-[#6B6A6A] text-sm">
                  Provide your basic information to setup your account with Ahioma
                </p>
              </div>

              {/* Profile Form */}
              <div className="space-y-4 mb-4">
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Your fullname"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="location"
                    placeholder="Product Location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between p-6 ">
              <Link
                href="/onboarding/step-2"
                className="text-[#6B6A6A] font-medium hover:text-[#116735] transition-colors duration-200"
              >
                Previous
              </Link>
              {isFormValid ? (
                <Link
                  href="/onboarding/step-4"
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

export default OnboardingStep3;