import OnboardingStep2 from "@/components/Onboarding/Step2";
import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Business Info - Step 2 | Ahioma",
  description: "Tell us about your business",
  // other metadata
};

const OnboardingStep2Page = () => {
  return (
    <main>
      <OnboardingStep2 />
    </main>
  );
};

export default OnboardingStep2Page;
