"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

const OnboardingStep2 = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const languages = [
    { code: "en", name: "English", native: "English" },
    { code: "ig", name: "Igbo", native: "Igbo" },
    { code: "ha", name: "Hausa", native: "هَوُسَ" },
    { code: "yo", name: "Yoruba", native: "Yoruba" }
  ];

  return (
    <>
      <section className="overflow-hidden min-h-screen flex items-center py-5">
        <div className="w-full flex mx-auto px-4 sm:px-6 xl:px-0">
          {/* Image Section */}
          <div className="hidden lg:block px-5 lg:w-1/2 relative">
            <div 
              className=" h-[93vh] rounded-[16px] w-full bg-cover bg-center overflow-hidden relative "
              style={{
                backgroundImage: 'url("/images/onboarding/onboarding-one.png")',
              }}
            >
              <div 
                className="absolute inset-0 rounded-[16px] z-0"
                style={{
                  background: 'linear-gradient(to bottom, rgba(98, 98, 98, 0.1) , rgba(0, 0, 0, 0.8))',
                }}
              />
              <div className="absolute bottom-10 left-8 text-white max-w-md z-20">
                <h2 className="text-4xl font-bold mb-3 leading-tight">Sell your goods with ease</h2>
                <p className="text-lg opacity-90">Join thousands of trusted sellers on our platform</p>
              </div>
            </div>
          </div>
       
          {/* Language Selection Content */}
          <div className="max-w-[500px] w-full mx-auto bg-white h-[93vh] flex flex-col relative">
            {/* Header with Logo and Progress */}
            <div className="flex items-center justify-between p-6 mb-8">
              <Image src="/images/logo/logo.svg" alt="Ahioma Logo" className="h-8" width={120} height={32} />
              <div className="text-sm text-gray-500">Step 1 of 4</div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full">
                <div className="flex space-x-2">
                  <div className="flex-1 h-1 bg-[#116735] rounded-full"></div>
                  <div className="flex-1 h-1 bg-gray-200  rounded-full"></div>
                  <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
                </div>
              </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center px-8 py-12">
              {/* Globe Icon */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center">
                  <Image src="/images/onboarding/globe.svg" alt="" width={80} height={80} />
                </div>
              </div>

              {/* Title and Description */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-[#000000] mb-3">
                  Choose your preferred language
                </h1>
                <p className="text-[#6B6A6A] text-sm">
                  Select your preferred language for voice commands and responses
                </p>
              </div>

              {/* Language Options */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => setSelectedLanguage(language.code)}
                    className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                      selectedLanguage === language.code
                        ? 'border-[#116735] bg-green-50 shadow-lg ring-2 ring-green-200'
                        : 'border-[#BFBFBF] bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    <div className={`font-medium ${
                      selectedLanguage === language.code 
                        ? 'text-[#116735]' 
                        : 'text-[#BFBFBF]'
                    }`}>
                      {language.name}
                    </div>
                    <div className={`text-sm ${
                      selectedLanguage === language.code 
                        ? 'text-[#116735]' 
                        : 'text-[#BFBFBF]'
                    }`}>
                      {language.native}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between p-6 ">
              <Link
                href="/onboarding/step-1"
                className="text-[#6B6A6A] font-medium hover:text-[#116735] transition-colors duration-200"
              >
                Previous
              </Link>
              {selectedLanguage ? (
                <Link
                  href="/onboarding/step-3"
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

export default OnboardingStep2;
