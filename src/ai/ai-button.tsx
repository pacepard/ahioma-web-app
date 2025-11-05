"use client"

import { MessageCircle } from "lucide-react"

interface AIChatButtonProps {
  onClick: () => void
}

export function AIChatButton({ onClick }: AIChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center z-40 group"
      aria-label="Open AI chat support"
    >
      <MessageCircle className="w-6 h-6 group-hover:scale-125 transition-transform" />
    </button>
  )
}
