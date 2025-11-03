import OnboardingStep1 from "@/components/Onboarding/Step1";
import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Welcome - Step 1 | Ahioma",
  description: "Welcome to Ahioma - Complete your profile setup",
  // other metadata
};

const OnboardingStep1Page = () => {
  return (
    <main>
      <OnboardingStep1 />
    </main>
  );
};

export default OnboardingStep1Page;
