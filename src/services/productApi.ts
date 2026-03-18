/**
 * Product API service - calls the Spring Boot backend.
 */
import type {
  ApiResponse,
  ApiProduct,
  ApiCategory,
  PaginatedData,
} from "@/types/api";

const BASE_URL = "https://brandingidiots.tech/api/customer/products";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

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
    `${BASE_URL}?${sp}`
  );
  return res.data;
}

/** Get single product details. */
export async function getProductDetail(id: number): Promise<ApiProduct> {
  const res = await fetchJson<ApiResponse<ApiProduct>>(`${BASE_URL}/${id}`);
  return res.data;
}

/** Get all categories. */
export async function getCategories(): Promise<ApiCategory[]> {
  const res = await fetchJson<ApiResponse<ApiCategory[]>>(
    `${BASE_URL}/categories`
  );
  return res.data;
}

/** Get search suggestions. */
export async function getSearchSuggestions(
  query: string
): Promise<string[]> {
  if (!query || query.length < 2) return [];
  const res = await fetchJson<ApiResponse<string[]>>(
    `${BASE_URL}/search-suggestions?q=${encodeURIComponent(query)}`
  );
  return res.data ?? [];
}
