// src/app/api/transcribe-audio/route.ts

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";


import OpenAI from "openai";

const transcriptionModel = "gpt-4o-mini-transcribe";
// or: const transcriptionModel = "gpt-4o-transcribe";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audio = formData.get("audio");

    if (!audio || !(audio instanceof File)) {
      return new Response(
        JSON.stringify({ error: "Audio file missing in 'audio' field" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY as string,
    });

    const result = await client.audio.transcriptions.create({
      file: audio,
      model: transcriptionModel,
      response_format: "json",
    });

    // Extract detected language from result
    // Whisper returns the detected language in the response
    const detectedLanguage = (result as any).language || "en";

    return new Response(
      JSON.stringify({ 
        transcription: result.text,
        language: detectedLanguage 
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err: any) {
    console.error("Transcription error:", err);

    return new Response(
      JSON.stringify({
        error: err?.message ?? "Failed to transcribe",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}