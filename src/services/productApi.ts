/**
 * Product API service - calls the Spring Boot backend (NEW endpoints).
 */
import type {
  ApiResponse,
  ApiProduct,
  ApiProductDetail,
  ApiCategory,
  ApiBrand,
  PaginatedData,
} from "@/types/api";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://www.rephyl.com";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

// ══════════════════════════════════════
//  PRODUCTS
// ══════════════════════════════════════

/** List products (paginated). Optionally filter by search & category. */
export async function listProducts(params?: {
  page?: number;
  size?: number;
  search?: string;
  category?: number;
}): Promise<PaginatedData<ApiProduct>> {
  const sp = new URLSearchParams();
  sp.set("page", String(params?.page ?? 0));
  sp.set("size", String(params?.size ?? 40));
  if (params?.search) sp.set("search", params.search);
  if (params?.category) sp.set("category", String(params.category));

  const res = await fetchJson<ApiResponse<PaginatedData<ApiProduct>>>(
    `${BASE_URL}/api/customer/products?${sp}`
  );
  return res.data;
}

/** Get single product details by slug. */
export async function getProductBySlug(slug: string): Promise<ApiProductDetail> {
  const res = await fetchJson<ApiResponse<ApiProductDetail>>(
    `${BASE_URL}/api/customer/products/slug/${slug}`
  );
  return res.data;
}

/** Get single product details by ID. */
export async function getProductById(id: number): Promise<ApiProductDetail> {
  const res = await fetchJson<ApiResponse<ApiProductDetail>>(
    `${BASE_URL}/api/customer/products/${id}`
  );
  return res.data;
}

/** Get products by category ID. */
export async function getProductsByCategory(
  categoryId: number,
  params?: { search?: string; page?: number; size?: number }
): Promise<PaginatedData<ApiProduct>> {
  const sp = new URLSearchParams();
  sp.set("page", String(params?.page ?? 0));
  sp.set("size", String(params?.size ?? 40));
  if (params?.search) sp.set("search", params.search);

  const res = await fetchJson<ApiResponse<PaginatedData<ApiProduct>>>(
    `${BASE_URL}/api/customer/products/category/${categoryId}?${sp}`
  );
  return res.data;
}

/** Get products by brand ID. */
export async function getProductsByBrand(
  brandId: number,
  params?: { search?: string; page?: number; size?: number }
): Promise<PaginatedData<ApiProduct>> {
  const sp = new URLSearchParams();
  sp.set("page", String(params?.page ?? 0));
  sp.set("size", String(params?.size ?? 40));
  if (params?.search) sp.set("search", params.search);

  const res = await fetchJson<ApiResponse<PaginatedData<ApiProduct>>>(
    `${BASE_URL}/api/customer/products/brand/${brandId}?${sp}`
  );
  return res.data;
}

/** Get related products for a given product ID. */
export async function getRelatedProducts(
  productId: number
): Promise<PaginatedData<ApiProduct>> {
  const res = await fetchJson<ApiResponse<PaginatedData<ApiProduct>>>(
    `${BASE_URL}/api/customer/products/${productId}/related`
  );
  return res.data;
}

// ══════════════════════════════════════
//  CATEGORIES
// ══════════════════════════════════════

/** Get all categories (flat list). */
export async function getCategories(): Promise<ApiCategory[]> {
  const res = await fetchJson<ApiResponse<ApiCategory[]>>(
    `${BASE_URL}/api/customer/categories`
  );
  return res.data;
}

/** Get categories as hierarchical tree. */
export async function getCategoryTree(): Promise<ApiCategory[]> {
  const res = await fetchJson<ApiResponse<ApiCategory[]>>(
    `${BASE_URL}/api/customer/categories/tree`
  );
  return res.data;
}

/** Get single category by ID. */
export async function getCategoryById(id: number): Promise<ApiCategory> {
  const res = await fetchJson<ApiResponse<ApiCategory>>(
    `${BASE_URL}/api/customer/categories/${id}`
  );
  return res.data;
}

// ══════════════════════════════════════
//  BRANDS
// ══════════════════════════════════════

/** Get all active brands. */
export async function getBrands(): Promise<ApiBrand[]> {
  const res = await fetchJson<ApiResponse<ApiBrand[]>>(
    `${BASE_URL}/api/customer/brands`
  );
  return res.data;
}

/** Get featured brands. */
export async function getFeaturedBrands(): Promise<ApiBrand[]> {
  const res = await fetchJson<ApiResponse<ApiBrand[]>>(
    `${BASE_URL}/api/customer/brands/featured`
  );
  return res.data;
}

/** Get verified brands. */
export async function getVerifiedBrands(): Promise<ApiBrand[]> {
  const res = await fetchJson<ApiResponse<ApiBrand[]>>(
    `${BASE_URL}/api/customer/brands/verified`
  );
  return res.data;
}

/** Get single brand by ID. */
export async function getBrandById(id: number): Promise<ApiBrand> {
  const res = await fetchJson<ApiResponse<ApiBrand>>(
    `${BASE_URL}/api/customer/brands/${id}`
  );
  return res.data;
}

// ══════════════════════════════════════
//  SEARCH SUGGESTIONS (kept for backward compatibility)
// ══════════════════════════════════════

/** Get search suggestions - uses product list with search param. */
export async function getSearchSuggestions(
  query: string
): Promise<string[]> {
  if (!query || query.length < 2) return [];
  try {
    const data = await listProducts({ search: query, size: 5 });
    return data.content.map((p) => p.name);
  } catch {
    return [];
  }
}
