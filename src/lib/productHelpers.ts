/**
 * Helpers to normalize API product data for UI display.
 */
import type { ApiProduct, ApiVariant } from "@/types/api";

/** Get the best display image for a product. */
export function getProductImage(product: ApiProduct): string {
  // Product-level image first
  if (product.productImage) return product.productImage;
  // Fallback to first variant image
  const variantImg = product.variants.find((v) => v.imageUrl)?.imageUrl;
  if (variantImg) return variantImg;
  // Placeholder
  return "/placeholder.svg";
}

/** Get all available images for gallery. */
export function getProductImages(product: ApiProduct): string[] {
  const imgs: string[] = [];
  if (product.productImage) imgs.push(product.productImage);
  if (product.stickerImage) imgs.push(product.stickerImage);
  product.variants.forEach((v) => {
    if (v.imageUrl && !imgs.includes(v.imageUrl)) imgs.push(v.imageUrl);
  });
  return imgs.length > 0 ? imgs : ["/placeholder.svg"];
}

/** Get display price (selling price). */
export function getSellingPrice(product: ApiProduct, variant?: ApiVariant): number {
  if (variant) return variant.sellingPrice;
  if (product.variants.length > 0) {
    return Math.min(...product.variants.map((v) => v.sellingPrice));
  }
  return product.wholesalePrice ?? product.mrp;
}

/** Get MRP (original price). */
export function getMrp(product: ApiProduct, variant?: ApiVariant): number {
  if (variant) return variant.mrp;
  if (product.variants.length > 0) {
    return product.variants[0].mrp;
  }
  return product.mrp;
}

/** Calculate discount percentage. */
export function getDiscount(product: ApiProduct, variant?: ApiVariant): number {
  const mrp = getMrp(product, variant);
  const selling = getSellingPrice(product, variant);
  if (mrp <= selling || mrp === 0) return 0;
  return Math.round(((mrp - selling) / mrp) * 100);
}

/** Check if product is in stock. */
export function isInStock(product: ApiProduct, variant?: ApiVariant): boolean {
  if (variant) return variant.stock.available;
  if (product.variants.length > 0) {
    return product.variants.some((v) => v.stock.available);
  }
  return true; // Non-variant products assumed available
}

/** Parse variant attributes JSON string. */
export function parseVariantAttributes(
  attrs: string | null
): Record<string, string> {
  if (!attrs) return {};
  try {
    return JSON.parse(attrs);
  } catch {
    return {};
  }
}
