import { createOpenAI } from "@ai-sdk/openai";

// Lazily initialize the OpenAI client to avoid throwing at module import time.
// Accept an optional model name and return the appropriate model handle.
export function openai(modelName?: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set. Please add it to your environment.");
  }

  const client = createOpenAI({ apiKey });

  // If the client is callable, call it with modelName. Otherwise try common API shapes.
  // Keep the return type loose (any) because the underlying SDK object shape may vary.
  const anyClient: any = client;

  if (typeof anyClient === "function") {
    return anyClient(modelName);
  }

  if (modelName && typeof anyClient.model === "function") {
    return anyClient.model(modelName);
  }

  // Fallback: return the client object itself
  return anyClient;
}

