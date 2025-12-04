/**
 * Image Context Helper for AI Chat
 * Provides information about available images in the public folder
 * to help the AI understand what images are available and how to reference them
 */

export interface ImageInfo {
  path: string;
  category: string;
  description?: string;
}

/**
 * List of available images organized by category
 * This helps the AI understand what images are available and when to use them
 */
export const AVAILABLE_IMAGES: ImageInfo[] = [
  // Product Images
  { path: "/images/products/pouch.png", category: "products", description: "Chin Chin Pouch product" },
  { path: "/images/products/chin.png", category: "products", description: "Chin Chin Jar product" },
  { path: "/images/products/model.png", category: "products", description: "Photo Shoot service" },
  { path: "/images/products/gold.png", category: "products", description: "Engraved Jewelry" },
  { path: "/images/products/bedding.png", category: "products", description: "Bedding products" },
  { path: "/images/products/pams.png", category: "products", description: "Handbags and Crossbags" },
  { path: "/images/products/diamond.png", category: "products", description: "Fashion Wears & Accessories" },
  { path: "/images/products/thrift.png", category: "products", description: "Thrift Clothing" },
  { path: "/images/products/power.png", category: "products", description: "Power Bank" },
  { path: "/images/products/cray.png", category: "products", description: "Food products - Beans Powder, Tapioca, Crayfish" },
  { path: "/images/products/cake.png", category: "products", description: "Cakes and Pastries" },
  { path: "/images/products/fabric.png", category: "products", description: "Fabrics" },
  { path: "/images/products/w.png", category: "products", description: "Female Clothes, Shoes, Bags" },
  { path: "/images/products/pot.png", category: "products", description: "Home and Kitchen Appliances" },
  { path: "/images/products/img1.png", category: "products", description: "Perfumes" },
  { path: "/images/products/img2.png", category: "products", description: "Perfumes" },
  { path: "/images/products/bank.png", category: "products", description: "Power Bank" },
  { path: "/images/products/led.png", category: "products", description: "Shoes, Clothes & Skincare" },
  { path: "/images/products/game.png", category: "products", description: "Card Game" },
  { path: "/images/products/lotion.png", category: "products", description: "HalfCast Lotion" },
  { path: "/images/products/bottle.png", category: "products", description: "Bottled Chapman" },
  { path: "/images/products/3ml.png", category: "products", description: "ELIM-BLISS PERFUME 3ml" },
  { path: "/images/products/6ml.png", category: "products", description: "ELIM-BLISS PERFUME 6ml" },
  { path: "/images/products/10ml.png", category: "products", description: "ELIM-BLISS PERFUME 10ml" },
  { path: "/images/products/30ml.png", category: "products", description: "ELIM-BLISS PERFUME 30ml" },
  { path: "/images/products/pto.png", category: "products", description: "iPhone 12 Pro Max" },
  { path: "/images/products/wig.png", category: "products", description: "Closure Wigs" },
  { path: "/images/products/tour.png", category: "products", description: "Tourism Services" },
  { path: "/images/products/oat.png", category: "products", description: "Oat Flour" },
  
  // Category Images
  { path: "/images/categories/categories-01.png", category: "categories" },
  { path: "/images/categories/categories-02.png", category: "categories" },
  { path: "/images/categories/categories-03.png", category: "categories" },
  { path: "/images/categories/categories-04.png", category: "categories" },
  { path: "/images/categories/categories-05.png", category: "categories" },
  { path: "/images/categories/categories-06.png", category: "categories" },
  { path: "/images/categories/categories-07.png", category: "categories" },
  
  // Hero Images
  { path: "/images/hero/hero-001.png", category: "hero" },
  { path: "/images/hero/hero-01.png", category: "hero" },
  { path: "/images/hero/hero-02.png", category: "hero" },
  { path: "/images/hero/hero-03.png", category: "hero" },
  { path: "/images/hero/hero-bg.png", category: "hero" },
  
  // Arrivals
  { path: "/images/arrivals/arrivals-01.png", category: "arrivals" },
  { path: "/images/arrivals/arrivals-02.png", category: "arrivals" },
  { path: "/images/arrivals/arrivals-03.png", category: "arrivals" },
  { path: "/images/arrivals/arrivals-04.png", category: "arrivals" },
  { path: "/images/arrivals/arrivals-05.png", category: "arrivals" },
  { path: "/images/arrivals/arrivals-06.png", category: "arrivals" },
  { path: "/images/arrivals/arrivals-07.png", category: "arrivals" },
  { path: "/images/arrivals/arrivals-08.png", category: "arrivals" },
  { path: "/images/arrivals/arrivals-09.png", category: "arrivals" },
  { path: "/images/arrivals/arrivals-10.png", category: "arrivals" },
  { path: "/images/arrivals/arrivals-11.png", category: "arrivals" },
  { path: "/images/arrivals/arrivals-12.png", category: "arrivals" },
  
  // Promo Images
  { path: "/images/promo/promo-01.png", category: "promo" },
  { path: "/images/promo/promo-02.png", category: "promo" },
  { path: "/images/promo/promo-03.png", category: "promo" },
  
  // Logo
  { path: "/images/logo/logo.svg", category: "logo" },
  { path: "/images/logo/icon.png", category: "logo" },
];

/**
 * Get image context string for AI system prompt
 * Returns a formatted string describing available images
 */
export function getImageContextString(): string {
  const productImages = AVAILABLE_IMAGES.filter(img => img.category === "products");
  const otherImages = AVAILABLE_IMAGES.filter(img => img.category !== "products");
  
  let context = "## Available Images in Public Folder\n\n";
  
  context += "### Product Images\n";
  context += "The following product images are available. Use them when discussing specific products:\n\n";
  productImages.forEach(img => {
    context += `- \`${img.path}\`${img.description ? ` - ${img.description}` : ""}\n`;
  });
  
  context += "\n### Other Images\n";
  context += "Additional images available for general use:\n\n";
  otherImages.forEach(img => {
    context += `- \`${img.path}\`\n`;
  });
  
  context += "\n### How to Include Images\n";
  context += "When your response matches a product or service, include the relevant image using Markdown syntax:\n";
  context += "```markdown\n![Product Name](/images/products/product-name.png)\n```\n";
  context += "The frontend will automatically render these images in the chat.\n";
  
  return context;
}

/**
 * Find image path by product name or description
 */
export function findImageForProduct(productName: string): string | null {
  const normalizedName = productName.toLowerCase();
  
  // Try to find exact match in descriptions
  const exactMatch = AVAILABLE_IMAGES.find(img => 
    img.description && img.description.toLowerCase().includes(normalizedName)
  );
  if (exactMatch) return exactMatch.path;
  
  // Try partial match
  const partialMatch = AVAILABLE_IMAGES.find(img => 
    img.path.toLowerCase().includes(normalizedName.replace(/\s+/g, "-"))
  );
  if (partialMatch) return partialMatch.path;
  
  return null;
}

