import OnboardingStep4 from "@/components/Onboarding/Step4";
import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Store Setup - Step 4 | Ahioma",
  description: "Set up your store preferences",
  // other metadata
};

const OnboardingStep4Page = () => {
  return (
    <main>
      <OnboardingStep4 />
    </main>
  );
};

export default OnboardingStep4Page;
