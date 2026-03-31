/**
 * Helpers to normalize API product data for UI display.
 * Updated for NEW API response structure.
 */
import type { ApiProduct, ApiProductDetail, ApiVariant, ApiProductImage } from "@/types/api";

const ASSET_BASE = import.meta.env.VITE_BASE_URL || "https://www.rephyl.com";

/** Prepend base URL to relative image/file paths. */
export function resolveImageUrl(path: string | null | undefined): string {
  if (!path) return "/placeholder.svg";
  if (path.startsWith("http")) return path;
  // Ensure path starts with /api/files/ for the backend file serving
  if (path.startsWith("/")) return `${ASSET_BASE}${path}`;
  return `${ASSET_BASE}/api/files/${path}`;
}

/**
 * Parse imagePath which can be:
 * - { path: '{"path":"actual/path.jpg","originalName":"img.jpg"}', originalName: null }
 * - { path: "direct/path.jpg", originalName: "img.jpg" }
 * - null
 */
function parseImagePath(imagePath: ApiProductImage | null): string | null {
  if (!imagePath?.path) return null;
  try {
    // Try parsing as nested JSON (the API sometimes double-encodes)
    const parsed = JSON.parse(imagePath.path);
    if (typeof parsed === "object" && parsed.path) {
      return parsed.path;
    }
    return imagePath.path;
  } catch {
    return imagePath.path;
  }
}

/** Get the best display image for a product (list view). */
export function getProductImage(product: ApiProduct): string {
  const path = parseImagePath(product.imagePath);
  if (path) return resolveImageUrl(path);
  return "/placeholder.svg";
}

/** Get all available images for gallery (detail view). */
export function getProductImages(product: ApiProductDetail): string[] {
  const imgs: string[] = [];

  // Main product image
  const mainPath = parseImagePath(product.imagePath);
  if (mainPath) imgs.push(resolveImageUrl(mainPath));

  // Variant images
  if (product.variants) {
    product.variants.forEach((v) => {
      v.images?.forEach((img) => {
        const resolved = resolveImageUrl(img.path);
        if (!imgs.includes(resolved)) imgs.push(resolved);
      });
    });
  }

  return imgs.length > 0 ? imgs : ["/placeholder.svg"];
}

/** Get display price (base price for list, can be overridden per variant). */
export function getSellingPrice(product: ApiProduct): number {
  return product.basePrice;
}

/** Get MRP — same as basePrice in new API (no separate MRP field in list). */
export function getMrp(product: ApiProduct): number {
  return product.basePrice;
}

/** Calculate discount percentage (new API doesn't provide discount in list). */
export function getDiscount(_product: ApiProduct): number {
  return 0; // New API doesn't have separate MRP vs selling price in list view
}

/** Check if product is in stock. */
export function isInStock(product: ApiProduct): boolean {
  return product.inStock;
}

/** Parse variant attributes combo string like "Color=Black,Fit=Regular". */
export function parseAttrsCombo(combo: string): Record<string, string> {
  const result: Record<string, string> = {};
  if (!combo) return result;
  combo.split(",").forEach((pair) => {
    const [key, value] = pair.split("=");
    if (key && value) result[key.trim()] = value.trim();
  });
  return result;
}

/** Check if a variant is in stock. */
export function isVariantInStock(variant: ApiVariant): boolean {
  return variant.inventory.available;
}

/** Get total stock for a variant. */
export function getVariantStock(variant: ApiVariant): number {
  return variant.inventory.totalStock;
}
