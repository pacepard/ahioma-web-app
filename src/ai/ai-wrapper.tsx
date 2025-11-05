// "use client"

// import type React from "react"
// import { useState } from "react"


// import { AIChatButton } from "@/ai/ai-button"

// interface AIButtonWrapperProps {
//   children: React.ReactNode
// }

// export function AIButtonWrapper({ children }: AIButtonWrapperProps) {
//   const [isOpen, setIsOpen] = useState(false)

//   return (
//     <>
//       {children}
//       <AIChatButton onClick={() => setIsOpen(true)} />
//       {isOpen && <AIChat onClose={() => setIsOpen(false)} />}
//     </>
//   )
// }


// "use client"

// import { useState } from 'react'
// import { CustomChat } from './CustomChat' // Adjust the path as needed
// import { AIChatButton } from './AIChatButton' // Adjust the path as needed

// export function ChatWidget() {
//   // 1. State to track if the chat window is open
//   const [isChatOpen, setIsChatOpen] = useState(false)

//   // 2. Handler function to toggle the state
//   const toggleChat = () => {
//     setIsChatOpen(prev => !prev)
//   }

//   return (
//     <>
//       {/* 3. Conditionally render CustomChat based on the state */}
//       {isChatOpen && (
//         <div className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-6 sm:w-[400px] sm:h-[600px] bg-white shadow-2xl rounded-xl z-50 flex flex-col">
//           <div className="flex justify-between items-center p-4 border-b">
//             <h2 className="text-lg font-semibold">AI Assistant</h2>
//             <button onClick={toggleChat} className="text-gray-500 hover:text-gray-800">
//               &times; {/* Close button */}
//             </button>
//           </div>
//           <div className="flex-grow overflow-hidden">
//              {/* The CustomChat component */}
//              <CustomChat /> 
//           </div>
//         </div>
//       )}

//       {/* 4. The floating button, which always renders */}
//       {/* It passes the toggleChat function to the AIChatButton's onClick prop */}
//       {!isChatOpen && <AIChatButton onClick={toggleChat} />}
      
//       {/* Optional: Render the button *inside* the chat container or with a different visual/functionality when open */}
//       {/* For simplicity, the example above just hides the button when the chat is open. */}
//       {/* If you want the close button to be the AIChatButton, you'll need to slightly modify the AIChatButton component */}
//     </>
//   )
// }