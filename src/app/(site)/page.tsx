//import { AIChatButton } from "@/ai/ai-button/";
import { AIChatButton } from "@/ai/ai-button";
import { AIButtonWrapper } from "@/ai/ai-wrapper";
import Chat from "@/ai/chat";
import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ahiaoma - shop locally made good and services",
  description: "made for your household",
  // other metadata
};

export default function HomePage() {
  return (
    <>

    <AIButtonWrapper>

      <Home />

    </AIButtonWrapper>
      
      
      
    </>
  );
}
