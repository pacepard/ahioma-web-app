"use client";

import { AIChatButton } from "@/ai/ai-button";
import { AIChat } from "@/ai/ai-chat";
import CustomChat from "@/ai/chat";
import { LoadingIcon, LogoIcon } from "@/components/Icons/icons";
import { Chat } from "@/components/ui/chat";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Bot } from "lucide-react";
import { useState } from "react";

interface AIButtonWrapperProps {
  children: React.ReactNode;
}

export function AIButtonWrapper({ children }: AIButtonWrapperProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      {children}

      <AIChatButton onClick={() => setIsDialogOpen(true)} />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogOverlay className="bg-black/5 backdrop-blur-sm" />

        <DialogContent
          className="sm:max-w-2xl  flex flex-col p-10 overflow-hidden 
                     rounded-xl shadow-2xl border-none bg-white/95 backdrop-blur
                     data-[state=open]:duration-500 data-[state=open]:ease-out
                     "
        >
          <DialogHeader className="p-4 border-b border-gray-100 bg-gray-50/50">
            <DialogTitle className="flex items-center text-lg font-semibold text-gray-800">
              <LogoIcon /> Buy with Ahioma AI
            </DialogTitle>

            <DialogDescription className="text-sm text-gray-600 pt-1">
              Ask me anything about Ahiaoma products, services, or local
              businesses.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-10">
            <AIChat onClose={() => setIsDialogOpen(false)} />
              
          </div>


        </DialogContent>
      </Dialog>
    </>
  );
}
