# AI Chat Image and Product Context Integration

## Overview

This document explains how the AI chat system in the Ahioma Next.js app integrates images from the `public` folder and hardcoded products/services into its context and responses.

## How It Works

### 1. **Frontend: AI Chat Component** (`src/ai/ai-chat.tsx`)

The AI chat component handles:
- **Language Detection**: Automatically detects user language (English, Igbo, Hausa, Yoruba)
- **Audio Transcription**: Supports voice input with transcription
- **Message Rendering**: Uses `MarkdownRenderer` to display messages, which supports Markdown image syntax
- **Language Injection**: Injects detected language into API requests via fetch override

**Key Features:**
- Auto-send audio transcription (configurable)
- Preview countdown before sending
- Language detection badge display
- Markdown rendering for rich text and images

### 2. **Backend: Chat API Route** (`src/app/(preview)/api/chat/route.ts`)

The API route:
- **Imports Hardcoded Products**: Loads product data from `src/components/Shop/shopData.ts`
- **Imports Image Context**: Gets available images from `src/lib/image-context.ts`
- **Builds System Prompt**: Combines language-specific prompts with product and image context
- **Streams Responses**: Uses Vercel AI SDK to stream responses with tool support

**System Prompt Includes:**
1. Language-specific instructions (from `src/lib/languages.ts`)
2. Hardcoded products list with prices, reviews, and image paths
3. Available images catalog with descriptions
4. Instructions on how to include images in responses

### 3. **Image Context Helper** (`src/lib/image-context.ts`)

Provides:
- **Image Catalog**: List of all available images organized by category
- **Image Lookup**: Helper functions to find images by product name
- **Context String**: Formatted string describing available images for AI system prompt

### 4. **Product Data** (`src/components/Shop/shopData.ts`)

Contains:
- **Product List**: Array of products with titles, prices, reviews, and image paths
- **Image Paths**: Each product has associated image paths in `imgs.previews` and `imgs.thumbnails`

## Image Integration Flow

```
User Query
    ↓
AI Chat Component (detects language)
    ↓
API Request (includes language + messages)
    ↓
Chat API Route
    ├─ Loads shopData (hardcoded products)
    ├─ Gets image context (available images)
    └─ Builds system prompt with:
        - Language instructions
        - Product data with image paths
        - Image catalog
        - Image usage guidelines
    ↓
AI Model (GPT-4o)
    ├─ Understands available products
    ├─ Knows available images
    └─ Generates response with Markdown image tags
    ↓
Streamed Response
    ↓
MarkdownRenderer Component
    └─ Renders Markdown (including images)
```

## How Images Are Included in Responses

### Markdown Image Syntax

The AI includes images using standard Markdown syntax:

```markdown
![Product Name](/images/products/product-name.png)
```

### Example Response

When a user asks "What perfumes do you have?", the AI might respond:

```markdown
We have several ELIM-BLISS PERFUME options:

![ELIM-BLISS PERFUME 3ml](/images/products/3ml.png)
- **3ml**: ₦600 (was ₦800)

![ELIM-BLISS PERFUME 6ml](/images/products/6ml.png)
- **6ml**: ₦1,200 (was ₦1,500)

![ELIM-BLISS PERFUME 10ml](/images/products/10ml.png)
- **10ml**: ₦2,400 (was ₦3,000)
```

### Frontend Rendering

The `MarkdownRenderer` component (`src/components/ui/markdown-renderer.tsx`) uses `react-markdown` which automatically:
- Parses Markdown image syntax
- Renders `<img>` tags with proper paths
- Handles image loading and display

## Available Images

### Product Images
Located in `/public/images/products/`:
- `pouch.png` - Chin Chin Pouch
- `chin.png` - Chin Chin Jar
- `model.png` - Photo Shoot service
- `gold.png` - Engraved Jewelry
- `bedding.png` - Bedding products
- `pams.png` - Handbags and Crossbags
- `diamond.png` - Fashion Wears & Accessories
- `thrift.png` - Thrift Clothing
- `power.png` - Power Bank
- `cray.png` - Food products
- `cake.png` - Cakes and Pastries
- `fabric.png` - Fabrics
- `w.png` - Female Clothes, Shoes, Bags
- `pot.png` - Home and Kitchen Appliances
- `img1.png`, `img2.png` - Perfumes
- `bank.png` - Power Bank
- `led.png` - Shoes, Clothes & Skincare
- `game.png` - Card Game
- `lotion.png` - HalfCast Lotion
- `bottle.png` - Bottled Chapman
- `3ml.png`, `6ml.png`, `10ml.png`, `30ml.png` - ELIM-BLISS PERFUME sizes
- `pto.png` - iPhone 12 Pro Max
- `wig.png` - Closure Wigs
- `tour.png` - Tourism Services
- `oat.png` - Oat Flour

### Other Image Categories
- **Categories**: `/images/categories/`
- **Hero**: `/images/hero/`
- **Arrivals**: `/images/arrivals/`
- **Promo**: `/images/promo/`
- **Logo**: `/images/logo/`

## System Prompt Structure

The complete system prompt includes:

1. **Language-Specific Instructions**
   - Determined by user's detected language
   - Ensures responses match user's language preference

2. **Product Context**
   ```json
   [
     {
       "id": 34,
       "title": "Thechinchingirl - Chin Chin Pouch",
       "price": 3000.0,
       "discountedPrice": 2500.0,
       "reviews": 0,
       "imagePath": "/images/products/pouch.png"
     },
     ...
   ]
   ```

3. **Image Catalog**
   - List of all available images
   - Descriptions of what each image represents
   - Instructions on how to use them

4. **Usage Guidelines**
   - When to include images
   - How to format image tags
   - Best practices for visual responses

## Key Features

### ✅ Automatic Image Inclusion
- AI automatically includes product images when discussing products
- Images are matched to products based on product data

### ✅ Rich Visual Responses
- Responses can mix text and images naturally
- Multiple products can be shown with their images

### ✅ Language Support
- System prompts adapt to user's language
- Image descriptions work across all supported languages

### ✅ Product Discovery
- AI can answer questions about what Ahioma offers
- Uses hardcoded product data as source of truth
- Can combine database products with hardcoded products

## Example Interactions

### User: "What products do you have?"

**AI Response:**
```markdown
Ahioma offers a wide variety of products and services:

**Food & Beverages:**
![Chin Chin Pouch](/images/products/pouch.png)
- Thechinchingirl - Chin Chin Pouch: ₦2,500 (was ₦3,000)

![Oat Flour](/images/products/oat.png)
- Amyx Foods - Oat Flour: ₦5,000 (was ₦6,000)

**Fashion & Accessories:**
![Engraved Jewelry](/images/products/gold.png)
- Adorn by Tee - Engraved Jewelry: ₦11,000 (was ₦15,000)

... (more products)
```

### User: "Show me perfumes"

**AI Response:**
```markdown
Here are our perfume options:

![ELIM-BLISS PERFUME 3ml](/images/products/3ml.png)
**ELIM-BLISS PERFUME - 3ml**
Price: ₦600 (Discounted from ₦800)
Reviews: 0

![ELIM-BLISS PERFUME 6ml](/images/products/6ml.png)
**ELIM-BLISS PERFUME - 6ml**
Price: ₦1,200 (Discounted from ₦1,500)
Reviews: 0

![ELIM-BLISS PERFUME 10ml](/images/products/10ml.png)
**ELIM-BLISS PERFUME - 10ml**
Price: ₦2,400 (Discounted from ₦3,000)
Reviews: 0
```

## Technical Implementation

### Adding New Products

1. Add product to `src/components/Shop/shopData.ts`
2. Ensure image exists in `/public/images/products/`
3. Add image entry to `src/lib/image-context.ts` if needed
4. The AI will automatically include it in responses

### Adding New Images

1. Add image file to appropriate folder in `/public/images/`
2. Add entry to `AVAILABLE_IMAGES` in `src/lib/image-context.ts`
3. Update product data if it's a product image
4. AI will be aware of the new image in next request

### Modifying System Prompt

Edit the system prompt in `src/app/(preview)/api/chat/route.ts`:
- Modify instructions for image usage
- Add new guidelines
- Update product context format

## Best Practices

1. **Always Include Images**: When discussing products, always include their images
2. **Match Product to Image**: Use the `imagePath` from product data
3. **Descriptive Alt Text**: Use product name as alt text
4. **Multiple Products**: Show images for each product when listing multiple items
5. **Contextual Images**: Use category/hero images when discussing general topics

## Troubleshooting

### Images Not Showing
- Check image path matches file in `/public/images/`
- Verify Markdown syntax is correct: `![alt](/path/to/image.png)`
- Ensure image file exists in public folder

### Wrong Images
- Verify product `imagePath` in `shopData.ts` is correct
- Check `image-context.ts` has correct mapping
- Review system prompt includes correct image paths

### Products Not Found
- Verify product exists in `shopData.ts`
- Check product data is properly formatted
- Ensure system prompt includes product context

