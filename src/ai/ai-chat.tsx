"use client";

import { useChat } from "@ai-sdk/react";

import { ChatContainer, ChatForm, ChatMessages } from "@/components/ui/chat";
import { MessageInput } from "@/components/ui/message-input";
import { MessageList } from "@/components/ui/message-list";
import { PromptSuggestions } from "@/components/ui/prompt-suggestions";
import { useState } from "react";

export interface IAIChat {
  onClose: () => void;
}

export function AIChat({ onClose }: IAIChat) {
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

      const { transcription } = await response.json();
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
  };

  //    // Fix: Define 'append' for PromptSuggestions to use. It should send the suggestion text.
  // const append = ({ text }: { text: string }) => {

  //   sendMessage({ text, role: "user" });
  // };

    // Fix: Define 'append' for PromptSuggestions to use. It should send the suggestion text.
  const append = ({ text }: { text: string }) => {

      setMessages((prev) => [
    ...prev,
    {
      id: crypto.randomUUID(),
      role: "user",
      text,
    } as any, // cast to any to satisfy TS for the optimistic render
  ]);
     const newMessage = {
    id: crypto.randomUUID(),
    role: "user" as const,
    text,
    parts: [{ type: "text", text }],
    content: text,
  };


  sendMessage({ text: newMessage.text as string, role: "user" });
    setInput("");
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() !== "") {
      sendMessage({ text: input, role: "user" });
      setInput("");
    }
  };

  return (
    <ChatContainer>
      {isEmpty ? (
        <PromptSuggestions
          append={append as any}
          suggestions={[
            "List services available on Ahioma?",
            "How do I track my order?",
            "Tell me the artisans in Orlu.",
            "What are your return policies?",
          ]}
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
        )}
      </ChatForm>
    </ChatContainer>
  );
}
