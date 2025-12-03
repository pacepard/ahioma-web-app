"use client";

import { useChat } from "@ai-sdk/react";

import { ChatContainer, ChatForm, ChatMessages } from "@/components/ui/chat";
import { MessageInput } from "@/components/ui/message-input";
import { MessageList } from "@/components/ui/message-list";
import { PromptSuggestions } from "@/components/ui/prompt-suggestions";
import { useState, useEffect, useRef } from "react";
import {
  detectLanguageFromText,
  detectUserLanguage,
  formatLanguageCode,
} from "@/lib/language-detection";
import { getPromptSuggestions, type SupportedLanguage } from "@/lib/languages";

export interface IAIChat {
  onClose: () => void;
}

export function AIChat({ onClose }: IAIChat) {
  const [detectedLanguage, setDetectedLanguage] = useState<SupportedLanguage>("en");
  const languageRef = useRef<SupportedLanguage>("en");

  // Preview auto-send state (UI placeholders; logic hooks added)
  const [previewText, setPreviewText] = useState<string | null>(null);
  const [previewCountdown, setPreviewCountdown] = useState<number>(0);
  const previewTimerRef = useRef<number | null>(null);
  // if true, send transcription immediately to the API (no preview)
  const [autoSendImmediately, setAutoSendImmediately] = useState<boolean>(true);

  // Keep ref in sync so fetch override can read synchronously
  useEffect(() => {
    languageRef.current = detectedLanguage;
  }, [detectedLanguage]);

  // Override global fetch once to inject language into /api/chat requests.
  useEffect(() => {
    const originalFetch = globalThis.fetch;

    (globalThis as any).fetch = function (url: string | Request, options?: RequestInit) {
      try {
        if (typeof url === "string" && url.includes("/api/chat") && options?.body) {
          const opts = { ...options } as RequestInit & { body?: any };
          if (typeof opts.body === "string") {
            const body = JSON.parse(opts.body);
            body.language = languageRef.current || "en";
            opts.body = JSON.stringify(body);
          }
          return originalFetch(url, opts as RequestInit);
        }
      } catch (e) {
        console.error("Error in fetch override:", e);
      }
      return originalFetch(url, options as any);
    };

    return () => {
      (globalThis as any).fetch = originalFetch;
    };
  }, []);

  const { messages, setMessages, status, sendMessage, stop } = useChat();

  const [input, setInput] = useState("");
  const isLoading = status === "submitted" || status === "streaming";
  const lastMessage = messages.at(-1);
  const isEmpty = messages.length === 0;
  const isTyping = isLoading;

  const renderedMessages = messages.map((m: any) => {
    if (m.text || m.content) return { ...m, content: m.text ?? m.content };

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
   * Transcribe audio via API route /api/transcribe-audio
   * Returns the transcription string (MessageInput expects Promise<string>)
   */
  const transcribeAudio = async (blob: Blob): Promise<string> => {
    const audioFile = new File([blob], "audio-message.webm", {
      type: blob.type,
      lastModified: Date.now(),
    });

    try {
      const formData = new FormData();
      formData.append("audio", audioFile);

      const response = await fetch("/api/transcribe-audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let errorBody = await response.text();
        try {
          errorBody = JSON.parse(errorBody).error || errorBody;
        } catch {}

        throw new Error(`Transcription failed: ${response.status} - ${errorBody}`);
      }

      const { transcription, language } = await response.json();

      const detectedLang = detectUserLanguage(transcription, language) as SupportedLanguage;
      setDetectedLanguage(detectedLang);

      return transcription;
    } catch (error) {
      console.error("Error during transcription:", error);
      return `[Transcription Error: ${(error as Error).message || "Failed to connect to API"}]`;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInput(e.target.value);
  };

  const handleTranscriptionComplete = (transcription: string) => {
    const detectedLang = detectLanguageFromText(transcription);
    setDetectedLanguage(detectedLang);

    // Safety: only auto-send if there are at least 3 words
    const wordCount = transcription.trim().split(/\s+/).filter(Boolean).length;

    if (autoSendImmediately && wordCount >= 3) {
      // send immediately
      doSend(transcription);
      return;
    }

    // otherwise fallback to preview flow
    startPreviewAutoSend(transcription);
  };

  // Start the preview card and begin countdown (auto-send after expiry)
  const startPreviewAutoSend = (transcription: string) => {
    // always populate input so user can edit if needed
    setInput(transcription);
    setPreviewText(transcription);

    // Safety: only auto-send if there are at least 3 words
    const wordCount = transcription.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount < 3) {
      setPreviewCountdown(0);
      return;
    }

    const initial = 3; // seconds
    setPreviewCountdown(initial);

    // Clear any existing timer
    if (previewTimerRef.current) {
      window.clearInterval(previewTimerRef.current);
      previewTimerRef.current = null;
    }

    previewTimerRef.current = window.setInterval(() => {
      setPreviewCountdown((c) => {
        if (c <= 1) {
          // time's up — send and clear
          if (previewTimerRef.current) {
            window.clearInterval(previewTimerRef.current);
            previewTimerRef.current = null;
          }
          doSend(transcription);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  const doSend = (text: string) => {
    if (!text || text.trim().length === 0) return;

    // clear timer and preview state
    if (previewTimerRef.current) {
      window.clearInterval(previewTimerRef.current);
      previewTimerRef.current = null;
    }
    setPreviewText(null);
    setPreviewCountdown(0);

    // send message — fetch override injects languageRef
    sendMessage({ text, role: "user" });
    setInput("");
  };

  const handleEdit = () => {
    // stop auto-send and allow user to edit in the input
    if (previewTimerRef.current) {
      window.clearInterval(previewTimerRef.current);
      previewTimerRef.current = null;
    }
    setPreviewCountdown(0);
    setPreviewText(null);
    // input already contains the transcription
  };

  const handleCancel = () => {
    if (previewTimerRef.current) {
      window.clearInterval(previewTimerRef.current);
      previewTimerRef.current = null;
    }
    setPreviewCountdown(0);
    setPreviewText(null);
    setInput("");
  };

  // If the user edits the input while countdown running, cancel the auto-send
  useEffect(() => {
    if (previewText !== null && previewCountdown > 0 && input !== previewText) {
      if (previewTimerRef.current) {
        window.clearInterval(previewTimerRef.current);
        previewTimerRef.current = null;
      }
      setPreviewCountdown(0);
      setPreviewText(null);
    }
  }, [input]);

  const append = (payload: { text?: string; content?: string; role?: string } | string) => {
    const text = typeof payload === "string" ? payload : payload.text ?? payload.content ?? "";
    if (!text || text.trim().length === 0) return;

    const detectedLang = detectLanguageFromText(text);
    setDetectedLanguage(detectedLang);

    sendMessage({ text, role: "user" });
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() !== "") {
      const detectedLang = detectLanguageFromText(input);
      setDetectedLanguage(detectedLang);

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

      <ChatForm className="mt-auto" isPending={isLoading || isTyping} handleSubmit={handleSubmit}>
        {({ files, setFiles }) => (
          <>
            {/* Language Detection Badge */}
            <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span>Language:</span>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded font-semibold">
                {formatLanguageCode(detectedLanguage)}
              </span>
            </div>
            <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={autoSendImmediately}
                  onChange={() => setAutoSendImmediately((s) => !s)}
                  className="w-4 h-4"
                />
                <span className="text-xs">Auto-send audio</span>
              </label>
            </div>

              {/* Preview card for auto-send with confirmation */}
              {previewText !== null ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="mx-4 mb-3 p-3 rounded border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="text-sm text-neutral-900 dark:text-neutral-100">Preview: {previewText}</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      {previewCountdown > 0 ? `Sending in ${previewCountdown}s` : "Ready to send"}
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => doSend(previewText)}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
                    >
                      Send
                    </button>

                    <button
                      type="button"
                      onClick={handleEdit}
                      className="px-3 py-1 text-sm border rounded border-neutral-300 dark:border-neutral-600"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-3 py-1 text-sm text-red-600 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : null}

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
