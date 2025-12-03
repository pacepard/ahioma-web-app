"use client";

import { useChat } from "@ai-sdk/react";

import { ChatContainer, ChatForm, ChatMessages } from "@/components/ui/chat";
import { MessageInput } from "@/components/ui/message-input";
import { MessageList } from "@/components/ui/message-list";
import { PromptSuggestions } from "@/components/ui/prompt-suggestions";
import { useState, useEffect } from "react";
import { 
  detectLanguageFromText, 
  detectUserLanguage,
  formatLanguageCode
} from "@/lib/language-detection";
import { 
  getPromptSuggestions, 
  type SupportedLanguage 
} from "@/lib/languages";

export interface IAIChat {
  onClose: () => void;
}

export function AIChat({ onClose }: IAIChat) {

  const [detectedLanguage, setDetectedLanguage] = useState<SupportedLanguage>("en");
  
  // Override fetch globally to include language parameter
  useEffect(() => {
    
    const originalFetch = globalThis.fetch;
    
    (globalThis as any).fetch = function(url: string | Request, options?: RequestInit) {
      try {
        if (typeof url === 'string' && url.includes('/api/chat') && options?.body) {
          const opts = { ...options };
          if (typeof opts.body === 'string') {
            const body = JSON.parse(opts.body);
            body.language = detectedLanguage;
            opts.body = JSON.stringify(body);
          }
          return originalFetch(url, opts);
        }
      } catch (e) {
        console.error("Error in fetch override:", e);
      }
      return originalFetch(url, options);
    };
    
    return () => {
      (globalThis as any).fetch = originalFetch;
    };
  }, [detectedLanguage]);
  
  const { messages, setMessages, status, sendMessage, stop } = useChat();

  const [input, setInput] = useState("");
  const isLoading = status === "submitted" || status === "streaming";
  const lastMessage = messages.at(-1);
  const isEmpty = messages.length === 0;
  // Typing should indicate the AI is generating a response
  const isTyping = isLoading;

  const renderedMessages = messages.map((m: any) => {
    // If it already has text, use it
    if (m.text || m.content) return { ...m, content: m.text ?? m.content };

    // If it has parts (common for AI messages), concatenate the text parts
    if (Array.isArray(m.parts)) {
      const content = m.parts
        .filter((p: any) => p.type === "text" && p.text)
        .map((p: any) => p.text)
        .join(" ");
      return { ...m, content };
    }

    return { ...m, content: "" };
  });

  /**
   * 🎤 Function to handle audio transcription
   * This is passed to MessageInput and called when recording stops.
   * It calls the Vercel API Route you need to create: /api/transcribe-audio
   * Returns the transcribed text (MessageInput expects Promise<string>)
   */
  const transcribeAudio = async (blob: Blob): Promise<string> => {
    // Create a File object from the Blob to send via FormData
    const audioFile = new File([blob], "audio-message.webm", {
      type: blob.type,
      lastModified: Date.now(),
    });

    try {
      const formData = new FormData();
      formData.append("audio", audioFile);

      // Call the API route
      const response = await fetch("/api/transcribe-audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let errorBody = await response.text();
        try {
          errorBody = JSON.parse(errorBody).error || errorBody;
        } catch {}

        throw new Error(
          `Transcription failed: ${response.status} - ${errorBody}`
        );
      }

      const { transcription, language } = await response.json();
      
      // Auto-detect language from audio result
      const detectedLang = detectUserLanguage(transcription, language) as SupportedLanguage;
      setDetectedLanguage(detectedLang);
      
      return transcription;
    } catch (error) {
      console.error("Error during transcription:", error);
      // Return a visible message for the user
      return `[Transcription Error: ${
        (error as Error).message || "Failed to connect to API"
      }]`;
    }
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInput(e.target.value);
  };

  // Function to handle transcription text being placed in the input
  const handleTranscriptionComplete = (transcription: string) => {
    // Set the transcribed text into the input field
    setInput(transcription);
    // Auto-detect language from transcription text
    const detectedLang = detectLanguageFromText(transcription);
    setDetectedLanguage(detectedLang);
  };

  //    // Fix: Define 'append' for PromptSuggestions to use. It should send the suggestion text.
  // const append = ({ text }: { text: string }) => {

  //   sendMessage({ text, role: "user" });
  // };

  // Fix: Define 'append' for PromptSuggestions to use. It should send the suggestion text.
  const append = (payload: { text?: string; content?: string; role?: string } | string) => {
    // Normalize payload to a text string. PromptSuggestions sends { role, content }
    const text = typeof payload === 'string' ? payload : payload.text ?? payload.content ?? '';

    if (!text || text.trim().length === 0) return;

    // Auto-detect language from suggestion text
    const detectedLang = detectLanguageFromText(text);
    setDetectedLanguage(detectedLang);
    
    // Send message using useChat
    sendMessage({ text, role: 'user' });
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() !== "") {
      // Auto-detect language from input
      const detectedLang = detectLanguageFromText(input);
      setDetectedLanguage(detectedLang);

      // Send message using useChat (language will be added to request)
      sendMessage({ text: input, role: "user" });
      setInput("");
    }
  };

  return (
    <ChatContainer>
      {isEmpty ? (
        <PromptSuggestions
          append={append as any}
          suggestions={getPromptSuggestions(detectedLanguage)}
          label="Start a conversation with these prompts:"
        />
      ) : null}

      {!isEmpty ? (
        <ChatMessages messages={renderedMessages as any}>
          <MessageList messages={renderedMessages as any} isTyping={isTyping} />
        </ChatMessages>
      ) : null}

      <ChatForm
        className="mt-auto"
        isPending={isLoading || isTyping}
        handleSubmit={handleSubmit}
      >
        {({ files, setFiles }) => (
          <>
            {/* Language Detection Badge */}
            <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span>Language:</span>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded font-semibold">
                {formatLanguageCode(detectedLanguage)}
              </span>
            </div>
            
            <MessageInput
              value={input}
              onChange={handleInputChange}
              allowAttachments
              files={files}
              setFiles={setFiles}
              stop={stop}
              isGenerating={isLoading}
              transcribeAudio={transcribeAudio}
              onTranscriptionComplete={handleTranscriptionComplete}
              className="
                bg-neutral-100 
                dark:bg-neutral-700 
                text-neutral-700
                dark:text-neutral-300 
                placeholder:text-neutral-400 
                dark:placeholder:text-neutral-400
                [&_input]:bg-neutral-100
                [&_input]:dark:bg-neutral-700
                [&_textarea]:bg-neutral-100
                [&_textarea]:dark:bg-neutral-700
                [&_input]:text-neutral-700
                [&_input]:dark:text-neutral-300
                [&_textarea]:text-neutral-700
                [&_textarea]:dark:text-neutral-300
              "
            />
          </>
        )}
      </ChatForm>
    </ChatContainer>
  );
}
