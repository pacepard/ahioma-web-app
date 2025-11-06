"use client"

import { BotIcon } from "lucide-react"

interface AIChatButtonProps {
  onClick: () => void
}

export function AIChatButton({ onClick }: AIChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-orange-dark bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl hover:shadow-2xl hover:scale-[1.05] transition-all duration-300 flex items-center justify-center z-40 group focus:outline-none focus:ring-4 focus:ring-blue-300"
      aria-label="Open AI chat support"
    >
      <BotIcon className="w-7 h-7 group-hover:scale-110 transition-transform" />
    </button>
  )
}

