/**
 * Types matching the Spring Boot backend API responses.
 */

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ── Stock ──
export interface VariantStock {
  totalQuantity: number;
  available: boolean;
  reservedQuantity: number;
}

// ── Variant ──
export interface ApiVariant {
  id: number;
  sku: string;
  barcode: string;
  variantName: string;
  variantAttributes: string | null; // JSON string e.g. '{"color":"Black","storage":"256GB"}'
  sellingPrice: number;
  mrp: number;
  weight: number;
  uomId: number;
  uomName: string;
  uomAbbreviation: string;
  imageUrl: string | null;
  stock: VariantStock;
}

// ── Product (list + detail) ──
export interface ApiProduct {
  id: number;
  slug: string; // URL-friendly identifier
  name: string;
  code: string;
  productTags: string | null;
  categoryId: number;
  categoryName: string;
  brandId: number;
  brandName: string;
  mrp: number;
  wholesalePrice: number | null;
  productImage: string | null;
  stickerImage: string | null;
  featured: boolean;
  ingredients: string | null;
  nutritionAnalysis: string | null;
  productDetails: string | null;
  productWeight: string | null;
  dimensionWidth: number | null;
  dimensionDepth: number | null;
  dimensionHeight: number | null;
  netWeightUnit: number | null;
  variants: ApiVariant[];
  variantCount: number;
  metaTitle: string | null;
  metaDescription: string | null;
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

// ── Category ──
export interface ApiCategory {
  id: number;
  name: string;
  parentId: number | null;
  parentName: string | null;
  image: string | null;
  icon: string | null;
  featured: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  activeFlag: boolean;
  crtDt: string;
}

// ── Search suggestion ──
export interface ApiSearchSuggestion {
  id: number;
  name: string;
  [key: string]: unknown;
}

// ── Blog ──
export interface CustomerBlogCatalogDto {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  banner: string; // Relative path e.g. /api/files/blogs/banners/uuid.jpg
  categoryId: number;
  categoryName: string;
  createdDate: string; // Format: yyyy-MM-dd HH:mm:ss
  readingTime: number; // In minutes
}

export interface CustomerBlogDetailDto extends CustomerBlogCatalogDto {
  description: string; // HTML content
  metaTitle: string;
  metaDescription: string;
  metaImg: string; // Relative path for social media preview
  metaKeywords: string; // Comma-separated keywords
  updatedDate: string | null; // Format: yyyy-MM-dd HH:mm:ss
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
