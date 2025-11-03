import OnboardingStep5 from "@/components/Onboarding/Step5";
import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Complete Setup - Step 5 | Ahioma",
  description: "Finalize your account setup",
  // other metadata
};

const OnboardingStep5Page = () => {
  return (
    <main>
      <OnboardingStep5 />
    </main>
  );
};

export default OnboardingStep5Page;
