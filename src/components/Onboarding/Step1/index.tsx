"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const OnboardingStep1 = () => {
  return (
    <>
      <section className="overflow-hidden min-h-screen flex items-center py-5">
        <div className="w-full flex mx-auto px-4 sm:px-6 xl:px-0">
          {/* Image Section */}
          <div className="hidden lg:block px-5 lg:w-1/2 relative">
            <div 
              className=" h-[93vh] rounded-[16px] w-full bg-cover bg-center overflow-hidden relative "
              style={{
                backgroundImage: 'url("/images/signup/signup-image.png")',
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
       
          {/* AI Welcome Content */}
          <div className="max-w-[500px] w-full mx-auto  bg-white h-[93vh] flex flex-col justify-center">
            {/* Logo */}
            <div className="text-center mb-8">
              <Image src="/images/logo/logo.svg" alt="Ahioma Logo" className="h-10 mx-auto mb-6" width={120} height={40} />
            </div>

            {/* Main Content */}
            <div className="text-center mb-6 flex-1 flex flex-col justify-center">
              <h1 className="text-xl lg:text-2xl font-semibold text-[#000000] mb-3">
                Manage your store hands-free with AI
              </h1>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm lg:text-base">
                Skip the clicks and typing—just speak to manage your business! Your 
                new voice assistant can help you check orders, update inventory, track 
                sales, and navigate your dashboard using simple voice commands.
              </p>

              {/* Voice Assistant Icon */}
              <div className="mb-6">
              <Image src="/images/onboarding/orange-orb.svg" alt="Voice Assistant" className="h-40 mx-auto" width={160} height={160} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className=" flex items-center justify-between ">
              
                <Link
                  href="/"
                  className="text-[#116735] font-normal hover:text-[#0D4A26] transition-colors duration-200 text-sm"
                >
                  ← Skip the tour
                </Link>
                <Link
                href="/onboarding/step-2"
                className="  rounded-full py-2 bg-[#116735] p-2 text-white font-normal hover:bg-[#0D4A26] transition-colors duration-200"
              >
                Get Onboarded
              </Link>
              
                
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OnboardingStep1;
