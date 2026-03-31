/**
 * Types matching the NEW Spring Boot backend API responses.
 */

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ── Paginated response ──
export interface PaginatedData<T> {
  content: T[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

// ══════════════════════════════════════
//  PRODUCTS (list)
// ══════════════════════════════════════

export interface ApiProductImage {
  path: string;
  originalName: string | null;
}

/** Product as returned from GET /api/customer/products (list view). */
export interface ApiProduct {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
  brandId: number;
  brandName: string;
  basePrice: number;
  emoji: string | null;
  imagePath: ApiProductImage | null;
  tags: string[];
  variantCount: number;
  inStock: boolean;
  createdDate: string;
  urlHandle: string;
  slug: string;
}

// ══════════════════════════════════════
//  PRODUCTS (detail)
// ══════════════════════════════════════

export interface ApiVariantImage {
  path: string;
  originalName: string;
}

export interface ApiWarehouseDetail {
  warehouseId: number;
  warehouseName: string;
  quantity: number;
}

export interface ApiVariantInventory {
  available: boolean;
  totalStock: number;
  warehouseDetails: ApiWarehouseDetail[];
}

export interface ApiVariant {
  id: number;
  attrsCombo: string; // e.g. "Color=Black,Fit=Regular"
  sku: string;
  images: ApiVariantImage[];
  inventory: ApiVariantInventory;
}

export interface ApiProductAttribute {
  attributeName: string;
  values: string[];
  displayOrder: number;
}

/** Product as returned from GET /api/customer/products/slug/{slug} (detail view). */
export interface ApiProductDetail extends ApiProduct {
  description: string;
  seoTitle: string;
  seoDescription: string;
  attrs: ApiProductAttribute[];
  variants: ApiVariant[];
  updatedDate: string | null;
}

// ══════════════════════════════════════
//  CATEGORIES
// ══════════════════════════════════════

export interface ApiCategory {
  id: number;
  name: string;
  description: string;
  productCount: number;
  parentId: number | null;
  children: ApiCategory[] | null;
}

// ══════════════════════════════════════
//  BRANDS
// ══════════════════════════════════════

export interface ApiBrand {
  id: number;
  name: string;
  productCount: number;
  logoPath: string | null;
}

// ══════════════════════════════════════
//  BLOGS
// ══════════════════════════════════════

export interface CustomerBlogCatalogDto {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  banner: string;
  categoryId: number;
  categoryName: string;
  createdDate: string;
  readingTime: number;
}

export interface CustomerBlogDetailDto extends CustomerBlogCatalogDto {
  description: string;
  metaTitle: string;
  metaDescription: string;
  metaImg: string;
  metaKeywords: string;
  updatedDate: string | null;
  author: string;
}

export interface CustomerBlogCategoryDto {
  id: number;
  name: string;
  blogCount: number;
}

// ── Blog API Responses ──
export interface BlogListApiResponse {
  content: CustomerBlogCatalogDto[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface BlogDetailApiResponse extends CustomerBlogDetailDto {}

// ── Search suggestion ──
export interface ApiSearchSuggestion {
  id: number;
  name: string;
  [key: string]: unknown;
}
