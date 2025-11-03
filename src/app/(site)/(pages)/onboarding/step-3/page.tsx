import OnboardingStep3 from "@/components/Onboarding/Step3";
import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Product Categories - Step 3 | Ahioma",
  description: "Choose your product categories",
  // other metadata
};

const OnboardingStep3Page = () => {
  return (
    <main>
      <OnboardingStep3 />
    </main>
  );
};

export default OnboardingStep3Page;
