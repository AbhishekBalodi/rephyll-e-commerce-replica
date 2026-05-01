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
  return variant.inventory.totalStock ?? 0;
}

/** Parse a quantity from labels like "Pack of 2" or "2 Pack". */
export function parsePackQuantity(value: string): number | null {
  if (!value) return null;

  const packOfMatch = value.match(/pack\s*of\s*(\d+)/i);
  if (packOfMatch) return Number(packOfMatch[1]);

  const suffixMatch = value.match(/(\d+)\s*pack/i);
  if (suffixMatch) return Number(suffixMatch[1]);

  const firstNumber = value.match(/(\d+)/);
  return firstNumber ? Number(firstNumber[1]) : null;
}

/** Detect whether an attribute behaves like a pack selector. */
export function isPackAttribute(attributeName: string): boolean {
  return /pack|quantity|size/i.test(attributeName);
}

/** Infer the MRP for a variant from the product base price and pack quantity. */
export function getVariantMrp(product: ApiProduct, variant: ApiVariant): number {
  const attrs = parseAttrsCombo(variant.attrsCombo);
  const packValue = Object.entries(attrs).find(([key]) => isPackAttribute(key))?.[1];
  const packQuantity = parsePackQuantity(packValue ?? "");

  if (packQuantity && packQuantity > 1) {
    return product.basePrice * packQuantity;
  }

  return product.basePrice;
}

/** Calculate a discount percentage for a variant compared with inferred MRP. */
export function getVariantDiscountPercent(product: ApiProduct, variant: ApiVariant): number {
  const mrp = getVariantMrp(product, variant);
  if (!mrp || variant.price >= mrp) return 0;
  return Math.round(((mrp - variant.price) / mrp) * 100);
}

/** Calculate per-pack price when a pack quantity is present. */
export function getVariantUnitPrice(variant: ApiVariant): number | null {
  const attrs = parseAttrsCombo(variant.attrsCombo);
  const packValue = Object.entries(attrs).find(([key]) => isPackAttribute(key))?.[1];
  const packQuantity = parsePackQuantity(packValue ?? "");

  if (!packQuantity || packQuantity <= 1) return null;
  return Number((variant.price / packQuantity).toFixed(2));
}

/** Get a user-friendly stock label for a variant. */
export function getVariantStockLabel(variant: ApiVariant): string {
  if (!variant.inventory.available) return "Out of stock";
  if (variant.inventory.stockLabel) return variant.inventory.stockLabel;
  if (typeof variant.inventory.totalStock === "number") {
    return `${variant.inventory.totalStock} in stock`;
  }
  return "In stock";
}
