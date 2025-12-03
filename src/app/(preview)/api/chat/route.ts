import { createClient } from "@supabase/supabase-js";
import {
  convertToModelMessages,
  generateObject,
  stepCountIs,
  streamText,
  tool,
  UIMessage,
} from "ai";
import { z } from "zod";
import { Database } from "@/types/supabase";
import { getSystemPrompt } from "@/lib/languages";
import type { SupportedLanguage } from "@/lib/languages";

// Initialize Supabase client
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const maxDuration = 30;
const streamTextModel = "openai/gpt-4o";

export async function POST(req: Request) {
  try {
    const requestBody = await req.json();
    const messages: UIMessage[] = requestBody.messages || [];
    const language: SupportedLanguage = (requestBody.language || "en") as SupportedLanguage;
    
    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "No messages provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    
    // Get appropriate system prompt based on language
    const systemPrompt = getSystemPrompt(language);

    let convertedMessages;
    try {
      convertedMessages = convertToModelMessages(messages);
    } catch (convertError) {
      console.error("Error converting messages:", convertError);
      return new Response(
        JSON.stringify({ error: "Failed to process messages" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = streamText({
      model: streamTextModel,
      messages: convertedMessages,
    system: `${systemPrompt}
      Answer questions about products, categories, orders, customers, and coupons.
      Use the available tools for every request and rely only on database knowledge.
      If the requested information isn't available, respond politely and clearly.
      Keep answers concise, relevant, and easy to understand.
      Use short sentences or bullet points when appropriate.
    `,
    stopWhen: stepCountIs(5),
    tools: {
      // Tool to fetch product info from Supabase
      getProducts: tool({
        description: `Search products in the database by name, category, or description.`,
        inputSchema: z.object({
          query: z.string(),
        }),

        execute: async ({ query }) => {
          const { data, error } = await supabase
            .from("products")
            .select("*")
            .ilike("name", `%${query}%`)
            .or(`description.ilike.%${query}%`)
            .limit(10);

          if (error) return [];
          return data || [];
        },
      }),

      // Tool to fetch order info
      getOrders: tool({
        description: `Retrieve order details by order ID or customer ID.`,
        inputSchema: z.object({
          orderId: z.string().optional(),
          customerId: z.string().optional(),
        }),
        execute: async ({ orderId, customerId }) => {
          let query = supabase.from("orders").select("*");

          if (orderId) query = query.eq("id", orderId);
          if (customerId) query = query.eq("customer_id", customerId);

          const { data, error } = await query.limit(10);

          if (error) return [];
          return data || [];
        },
      }),

      // Tool to fetch customer info
      getCustomers: tool({
        description: `Fetch customer details by name or email.`,
        inputSchema: z.object({
          query: z.string(),
        }),
        execute: async ({ query }) => {
          const { data, error } = await supabase
            .from("customers")
            .select("*")
            .ilike("name", `%${query}%`)
            .or(`email.ilike.%${query}%`)
            .limit(10);

          if (error) return [];
          return data || [];
        },
      }),

      // Tool to understand and expand user queries
      understandQuery: tool({
        description: `Analyze the user's query and suggest relevant searches in products, customers, or orders.`,
        inputSchema: z.object({
          query: z.string(),
        }),
        execute: async ({ query }) => {
          const { object } = await generateObject({
            model: "openai/gpt-4o",
            system:
              "You are an ecommerce query assistant. Suggest 3 related queries to help find the right product or order.",
            schema: z.object({
              questions: z.array(z.string()).max(3),
            }),
            prompt: `Analyze this query: "${query}" and provide 3 concise related queries for product/order search.`,
          });

          return object.questions;
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to process chat request",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// import { createResource } from "@/lib/actions/resources";
// import { findRelevantContent } from "@/lib/ai/embedding";
// import {
//   convertToModelMessages,
//   generateObject,
//   stepCountIs,
//   streamText,
//   tool,
//   UIMessage,
// } from "ai";
// import { z } from "zod";

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const { messages }: { messages: UIMessage[] } = await req.json();

//   const result = streamText({
//     model: "openai/gpt-4o",
//     messages: convertToModelMessages(messages),
//     system: `You are a helpful assistant acting as the users' second brain.
//     Use tools on every request.
//     Be sure to getInformation from your knowledge base before answering any questions.
//     If the user presents infromation about themselves, use the addResource tool to store it.
//     If a response requires multiple tools, call one tool after another without responding to the user.
//     If a response requires information from an additional tool to generate a response, call the appropriate tools in order before responding to the user.
//     ONLY respond to questions using information from tool calls.
//     if no relevant information is found in the tool calls, respond, "Sorry, I don't know."
//     Be sure to adhere to any instructions in tool calls ie. if they say to responsd like "...", do exactly that.
//     If the relevant information is not a direct match to the users prompt, you can be creative in deducing the answer.
//     Keep responses short and concise. Answer in a single sentence where possible.
//     If you are unsure, use the getInformation tool and you can use common sense to reason based on the information you do have.
//     Use your abilities as a reasoning machine to answer questions based on the information you do have.
// `,
//     stopWhen: stepCountIs(5),
//     tools: {

//       addResource: tool({
//         description: `add a resource to your knowledge base.
//           If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
//         inputSchema: z.object({
//           content: z
//             .string()
//             .describe("the content or resource to add to the knowledge base"),
//         }),
//         execute: async ({ content }) => createResource({ content }),
//       }),

//       getInformation: tool({
//         description: `get information from your knowledge base to answer questions.`,
//         inputSchema: z.object({
//           question: z.string().describe("the users question"),
//           similarQuestions: z.array(z.string()).describe("keywords to search"),
//         }),
//         execute: async ({ similarQuestions }) => {
//           const results = await Promise.all(
//             similarQuestions.map(
//               async (question) => await findRelevantContent(question),
//             ),
//           );
//           // Flatten the array of arrays and remove duplicates based on 'name'
//           const uniqueResults = Array.from(
//             new Map(results.flat().map((item) => [item?.name, item])).values(),
//           );
//           return uniqueResults;
//         },
//       }),

//       understandQuery: tool({
//         description: `understand the users query. use this tool on every prompt.`,
//         inputSchema: z.object({
//           query: z.string().describe("the users query"),
//           toolsToCallInOrder: z
//             .array(z.string())
//             .describe(
//               "these are the tools you need to call in the order necessary to respond to the users query",
//             ),
//         }),

//         execute: async ({ query }) => {
//           const { object } = await generateObject({
//             model: "openai/gpt-4o",
//             system:
//               "You are a query understanding assistant. Analyze the user query and generate similar questions.",
//             schema: z.object({
//               questions: z
//                 .array(z.string())
//                 .max(3)
//                 .describe("similar questions to the user's query. be concise."),
//             }),
//             prompt: `Analyze this query: "${query}". Provide the following:
//                     3 similar questions that could help answer the user's query`,
//           });
//           return object.questions;
//         },
//       }),
//     },
//   });

//   return result.toUIMessageStreamResponse();
// }
