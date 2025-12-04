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
import shopData from "@/components/Shop/shopData";
import { getImageContextString } from "@/lib/image-context";


export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";


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
    // Support multiple request shapes: { messages: [...] } or { input: 'text' } or { text: '...' }
    let messages: UIMessage[] | undefined = requestBody.messages;
    const language: SupportedLanguage = (requestBody.language || "en") as SupportedLanguage;

    // If messages missing, try to recover from a single text field
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      const fallbackText = requestBody.input || requestBody.text || requestBody.message;
      if (typeof fallbackText === 'string' && fallbackText.trim().length > 0) {
        messages = [
          {
            role: 'user',
            parts: [{ type: 'text', text: fallbackText }],
          } as any,
        ];
      } else {
        console.error('Malformed chat request body:', requestBody);
        return new Response(
          JSON.stringify({ error: 'No messages provided' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
    
    // Get appropriate system prompt based on language
    const systemPrompt = getSystemPrompt(language);

    // Rebuild messages to match convertToModelMessages expectations
    const sanitizedMessages: UIMessage[] = (messages as UIMessage[]).map((m: any) => {
      const role = m.role || 'user';

      // For assistant messages with tool calls, preserve the parts structure
      if (role === 'assistant' && Array.isArray(m.parts) && m.parts.some((p: any) => p.type === 'tool-call' || p.type === 'tool-result')) {
        // Keep tool parts as-is, but ensure text parts are properly formatted
        const parts = m.parts.map((p: any) => {
          if (p.type === 'text' && typeof p.text === 'string') return p;
          if (p.type === 'tool-call') return p;
          if (p.type === 'tool-result') return p;
          // fallback for malformed parts
          return { type: 'text', text: p?.text ?? p?.content ?? '' };
        });
        return { ...m, role, parts, content: undefined } as UIMessage;
      }

      // For tool role messages
      if (role === 'tool') {
        const parts = Array.isArray(m.parts) ? m.parts : [];
        return { ...m, role, parts, content: undefined } as UIMessage;
      }

      // For user and system messages, ensure we have parts array
      let parts: any[] = [];
      if (Array.isArray(m.parts)) {
        parts = m.parts.filter((p: any) => p && (p.type === 'text' || !p.type));
      }

      // Fallback to extracting text from string content
      if ((!parts || parts.length === 0) && typeof m.text === 'string') {
        parts = [{ type: 'text', text: m.text }];
      }
      if ((!parts || parts.length === 0) && typeof m.content === 'string') {
        parts = [{ type: 'text', text: m.content }];
      }

      // Ensure at least one valid part
      if (!parts || parts.length === 0) {
        parts = [{ type: 'text', text: '' }];
      }

      return { ...m, role, parts, content: undefined } as UIMessage;
    });

    let convertedMessages;
    try {
      convertedMessages = convertToModelMessages(sanitizedMessages);
    } catch (convertError) {
      console.error('Error converting messages. requestBody:', requestBody, 'convertError:', convertError);
      return new Response(
        JSON.stringify({ error: 'Failed to process messages', details: String(convertError) }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get image context information
    const imageContext = getImageContextString();
    
    // Format products data for the AI
    const productsContext = shopData.map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      discountedPrice: product.discountedPrice,
      reviews: product.reviews,
      imagePath: product.imgs?.previews?.[0] || product.imgs?.thumbnails?.[0] || null,
    }));

    const result = streamText({
      model: streamTextModel,
      messages: convertedMessages,
    system: `${systemPrompt}

## Your Role
You are a helpful shopping assistant for Ahioma marketplace. Answer questions about products, categories, orders, customers, and coupons.
Use the available tools for every request and rely on both database knowledge and the hardcoded product data provided below.
If the requested information isn't available, respond politely and clearly.
Keep answers concise, relevant, and easy to understand.
Use short sentences or bullet points when appropriate.

## Hardcoded Products and Services
The following products and services are available on Ahioma. Use this information when users ask about what Ahioma offers:

${JSON.stringify(productsContext, null, 2)}

When discussing a product, always include its image using Markdown image syntax. Match the product title to find the correct image path.

## Images Available in Public Folder
${imageContext}

## How to Include Images in Your Responses
When your answer matches a product or service, include the relevant image using Markdown syntax:
\`\`\`markdown
![Product Name](/images/products/product-name.png)
\`\`\`

The frontend will automatically render these images in the chat. Always include product images when discussing specific products.

## Image Usage Guidelines
1. **Product Images**: When discussing any product from the hardcoded list above, include its image using the imagePath provided
2. **Context Matching**: Use the file names and paths to understand what each image represents
3. **Always Include Images**: When answering questions about products, services, or what Ahioma offers, mix text and images to provide a rich, visual response
4. **Image Format**: Use standard Markdown image syntax: \`![alt text](/path/to/image.png)\`
5. **Multiple Products**: When listing multiple products, include an image for each product mentioned

## Response Style
- Be friendly, concise, and helpful
- Mix text and images naturally in your responses
- When showing products, always include their images
- Use bullet points or short paragraphs for clarity
- Include product details (price, reviews) when relevant

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
