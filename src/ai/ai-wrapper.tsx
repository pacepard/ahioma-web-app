"use client";

import { AIChatButton } from "@/ai/ai-button";
import { AIChat } from "@/ai/ai-chat";
import { LoadingIcon, LogoIcon } from "@/components/Icons/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
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
          className="sm:max-w-2xl !flex !flex-col !gap-0 h-[99vh] max-h-[500px] !p-0 overflow-hidden 
                     rounded-xl shadow-2xl border-none bg-white/95 backdrop-blur
                     data-[state=open]:duration-500 data-[state=open]:ease-out
                     [&>*:first-child]:block
                     "
        >
          <DialogHeader 
            className="!flex !flex-col p-4 border-b border-gray-100 bg-gray-50/50 flex-shrink-0 z-10 relative w-full !text-left"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <DialogTitle 
              className="flex items-center gap-2 text-lg font-semibold text-gray-800 w-full"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <div className="flex-shrink-0" style={{ display: 'block' }}>
                <LogoIcon />
              </div>
              <span className="flex-1 whitespace-nowrap" style={{ display: 'block' }}>Buy with Ahioma AI</span>
            </DialogTitle>

            <DialogDescription 
              className="text-sm text-gray-600 pt-1"
              style={{ display: 'block' }}
            >
              Ask me anything about Ahiaoma products, services, or local
              businesses.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 min-h-0 overflow-hidden relative">
            <AIChat onClose={() => setIsDialogOpen(false)} />
          </div>

        </DialogContent>
      </Dialog>
    </>
  );
}
