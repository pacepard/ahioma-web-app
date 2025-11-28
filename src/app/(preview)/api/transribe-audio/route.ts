// src/app/api/transcribe-audio/route.ts

import OpenAI from "openai";

// Set a higher body parser limit for file uploads (optional, but often necessary)
export const config = {
  api: {
    bodyParser: false, // Must disable body parser to handle file uploads
  },
};

const transcriptionModel = "gpt-4o-mini-tts";

// Highest quality const transcriptionModel = "gpt-4o-transcribe";

// Cheaper and still very good const transcriptionModel = "gpt-4o-mini-transcribe";

// Next.js standard way to handle a file upload using FormData/Request
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    // Assuming the audio file is sent under the 'audio' field
    const audioFile = formData.get("audio");

    if (!audioFile || !(audioFile instanceof File)) {
      return new Response(
        JSON.stringify({ error: "No audio file found in 'audio' field." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // real transcription
    const transcription = await client.audio.transcriptions.create({
      file: audioFile,
      model: transcriptionModel, 
      response_format: "json",
    });

    return new Response(
      JSON.stringify({transcription: transcription.text}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {

    console.error("Transcription API Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to process transcription request." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Next.js standard way to handle a file upload using FormData/Request
// export async function POST(req: Request) {

//   try {
//     const formData = await req.formData();
//     // Assuming the audio file is sent under the 'audio' field
//     const audioFile = formData.get('audio');

//     if (!audioFile || !(audioFile instanceof File)) {
//       return new Response(
//         JSON.stringify({ error: "No audio file found in 'audio' field." }),
//         { status: 400, headers: { 'Content-Type': 'application/json' } }
//       );
//     }

//     // --- STEP 1: Process the Audio File (Replace with actual transcription logic) ---

//     // In a real application, you would:
//     // 1. Save the file temporarily or stream it to an external service (e.g., OpenAI, AWS Transcribe).
//     // 2. Wait for the transcription result.

//     // Example of using a file reader (for demonstration purposes only, use a streaming API in production):
//     const buffer = await audioFile.arrayBuffer();
//     const fileSizeMB = (buffer.byteLength / (1024 * 1024)).toFixed(2);

//     // --- STEP 2: Return the Transcription ---

//     // Placeholder for a successful transcription response
//     const transcriptionResult = {
//       text: "The quick brown fox jumps over the lazy dog.",
//       duration: 5.2, // seconds
//       file_size_mb: fileSizeMB,
//       status: "success"
//     };

//     return new Response(
//       JSON.stringify(transcriptionResult),
//       { status: 200, headers: { 'Content-Type': 'application/json' } }
//     );

//   } catch (error) {
//     console.error("Transcription API Error:", error);
//     return new Response(
//       JSON.stringify({ error: "Failed to process transcription request." }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }
