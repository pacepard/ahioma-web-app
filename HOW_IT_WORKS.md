# How AI Chat Image & Product Context Works

## Quick Overview

The AI chat system in Ahioma automatically:
1. ✅ **Knows about all products** hardcoded in the app
2. ✅ **Knows about all images** in the `public` folder
3. ✅ **Includes images in responses** using Markdown syntax
4. ✅ **Matches products to images** automatically

## Architecture Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERACTION                          │
│  "What perfumes do you have?"                               │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              AI CHAT COMPONENT                               │
│  (src/ai/ai-chat.tsx)                                        │
│  • Detects language                                          │
│  • Sends request with language                               │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              CHAT API ROUTE                                  │
│  (src/app/(preview)/api/chat/route.ts)                      │
│                                                              │
│  1. Loads shopData (hardcoded products)                     │
│  2. Gets image context (available images)                   │
│  3. Builds system prompt with:                              │
│     • Language instructions                                 │
│     • Product list with image paths                         │
│     • Image catalog                                         │
│     • Image usage guidelines                                │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              AI MODEL (GPT-4o)                               │
│  • Understands available products                            │
│  • Knows available images                                   │
│  • Generates response with Markdown image tags              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              STREAMED RESPONSE                               │
│  "We have ELIM-BLISS PERFUME:                               │
│   ![3ml](/images/products/3ml.png)                          │
│   ![6ml](/images/products/6ml.png)                          │
│   ![10ml](/images/products/10ml.png)"                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              MARKDOWN RENDERER                               │
│  (src/components/ui/markdown-renderer.tsx)                  │
│  • Parses Markdown                                           │
│  • Renders images automatically                             │
└─────────────────────────────────────────────────────────────┘
```

## Key Components

### 1. **Product Data** (`src/components/Shop/shopData.ts`)
```typescript
{
  title: "ELIM-BLISS PERFUME - 3ml",
  price: 800.0,
  discountedPrice: 600.0,
  imgs: {
    previews: ["/images/products/3ml.png"]
  }
}
```

### 2. **Image Context** (`src/lib/image-context.ts`)
- Lists all available images
- Maps images to products
- Provides context string for AI

### 3. **System Prompt** (in `route.ts`)
Includes:
- Product list with image paths
- Image catalog
- Instructions: "When discussing products, include images using Markdown"

### 4. **Markdown Renderer** (`src/components/ui/markdown-renderer.tsx`)
- Uses `react-markdown`
- Automatically renders `![alt](/path)` as images

## How Images Are Added to Responses

### The AI Receives This Context:

```markdown
## Hardcoded Products and Services
[
  {
    "id": 5,
    "title": "ELIM-BLISS PERFUME - 3ml",
    "price": 800.0,
    "discountedPrice": 600.0,
    "imagePath": "/images/products/3ml.png"
  },
  ...
]

## Images Available in Public Folder
- `/images/products/3ml.png` - ELIM-BLISS PERFUME 3ml
- `/images/products/6ml.png` - ELIM-BLISS PERFUME 6ml
- ...

## How to Include Images
When your answer matches a product, include the image:
![Product Name](/images/products/product-name.png)
```

### The AI Generates This Response:

```markdown
We have several ELIM-BLISS PERFUME options:

![ELIM-BLISS PERFUME 3ml](/images/products/3ml.png)
- **3ml**: ₦600 (was ₦800)

![ELIM-BLISS PERFUME 6ml](/images/products/6ml.png)
- **6ml**: ₦1,200 (was ₦1,500)
```

### The Frontend Renders:

- Text with formatted pricing
- Images displayed automatically
- Clean, visual product presentation

## Example: Complete Flow

### User Query:
"What products do you sell?"

### System Prompt Includes:
- All 20+ products from `shopData.ts`
- All available images from `image-context.ts`
- Instructions to include images

### AI Response:
```markdown
Ahioma offers a variety of products:

**Food Items:**
![Chin Chin Pouch](/images/products/pouch.png)
Thechinchingirl - Chin Chin Pouch: ₦2,500

![Oat Flour](/images/products/oat.png)
Amyx Foods - Oat Flour: ₦5,000

**Fashion:**
![Engraved Jewelry](/images/products/gold.png)
Adorn by Tee - Engraved Jewelry: ₦11,000

... (more products with images)
```

### Frontend Display:
- ✅ Product names
- ✅ Prices
- ✅ Product images
- ✅ Formatted layout

## Benefits

1. **Automatic**: No manual image insertion needed
2. **Context-Aware**: AI knows which image matches which product
3. **Rich Responses**: Visual + textual information
4. **Maintainable**: Add products/images, AI automatically knows about them
5. **Multi-language**: Works with all supported languages

## Files Modified/Created

1. ✅ `src/lib/image-context.ts` - Image catalog helper
2. ✅ `src/app/(preview)/api/chat/route.ts` - Updated to include products & images
3. ✅ `AI_CHAT_IMAGE_CONTEXT.md` - Full documentation
4. ✅ `HOW_IT_WORKS.md` - This summary

## Testing

To test:
1. Ask: "What products do you have?"
2. AI should respond with product list + images
3. Ask: "Show me perfumes"
4. AI should show perfume products with their images
5. Images should render in the chat interface

## Summary

The AI chat system now:
- ✅ Has access to all hardcoded products
- ✅ Knows about all images in public folder
- ✅ Automatically includes images in responses
- ✅ Matches products to their images
- ✅ Renders images via Markdown

All of this happens automatically - just ask about products and the AI will include relevant images!

