const BASE_URL =
  (import.meta.env.VITE_BASE_URL as string | undefined)?.trim().replace(/\/+$/, "") || "";

function authHeaders() {
  const token = localStorage.getItem("rephyl_token");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

export interface CouponValidateRequest {
  code: string;
  items?: { variantId: number; quantity: number }[];
  appliedCouponCodes?: string[];
}

export interface CouponValidateResult {
  valid: boolean;
  couponCode: string;
  discountAmount: number | null;
  applicableAmount: number | null;
  message: string;
  allowStackable: boolean;
}

export interface CouponCatalogItem {
  id?: number;
  code: string;
  title?: string | null;
  description?: string | null;
  discountType?: string | null;
  discountValue?: number | null;
  maxDiscountAmount?: number | null;
  minOrderAmount?: number | null;
  startsAt?: string | null;
  expiresAt?: string | null;
  usageLimit?: number | null;
  perUserLimit?: number | null;
  usedCount?: number | null;
  allowStackable?: boolean | null;
  applicableScope?: string | null;
  applicableProducts?: string[];
  applicableCategories?: string[];
  termsAndConditions?: string[];
  isActive?: boolean | null;
}

const parseNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
};

const parseStringList = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value.map((entry) => String(entry ?? "").trim()).filter(Boolean);
};

const normalizeCoupon = (raw: any): CouponCatalogItem | null => {
  const code = String(raw?.code ?? raw?.couponCode ?? "").trim();
  if (!code) return null;

  const terms = parseStringList(raw?.termsAndConditions ?? raw?.terms ?? raw?.conditions);

  return {
    id: parseNumber(raw?.id) ?? undefined,
    code,
    title: raw?.title ?? raw?.name ?? null,
    description: raw?.description ?? raw?.message ?? null,
    discountType: raw?.discountType ?? raw?.type ?? null,
    discountValue: parseNumber(raw?.discountValue ?? raw?.value),
    maxDiscountAmount: parseNumber(raw?.maxDiscountAmount ?? raw?.maximumDiscountAmount ?? raw?.maxDiscount ?? raw?.maxDiscountCap),
    minOrderAmount: parseNumber(raw?.minOrderAmount ?? raw?.minimumOrderAmount),
    startsAt: raw?.startsAt ?? raw?.validFrom ?? raw?.startDate ?? null,
    expiresAt: raw?.expiresAt ?? raw?.validTo ?? raw?.endDate ?? null,
    usageLimit: parseNumber(raw?.usageLimit ?? raw?.totalUsageLimit),
    perUserLimit: parseNumber(raw?.perUserLimit ?? raw?.userUsageLimit),
    usedCount: parseNumber(raw?.usedCount ?? raw?.usageCount),
    allowStackable:
      typeof raw?.allowStackable === "boolean"
        ? raw.allowStackable
        : typeof raw?.stackable === "boolean"
          ? raw.stackable
          : null,
    applicableScope: raw?.applicableScope ?? raw?.scope ?? null,
    applicableProducts: parseStringList(raw?.applicableProducts ?? raw?.products ?? raw?.productNames),
    applicableCategories: parseStringList(raw?.applicableCategories ?? raw?.categories ?? raw?.categoryNames),
    termsAndConditions: terms,
    isActive:
      typeof raw?.isActive === "boolean"
        ? raw.isActive
        : typeof raw?.active === "boolean"
          ? raw.active
          : null,
  };
};

export async function listCoupons(): Promise<CouponCatalogItem[]> {
  const candidatePaths = [
    "/api/customer/coupons",
    "/api/customer/coupons/available",
    "/api/customer/coupons/list",
    "/api/customer/coupons/active",
  ];

  for (const path of candidatePaths) {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "GET",
      headers: authHeaders(),
    });

    if (!res.ok) {
      continue;
    }

    const json = await res.json().catch(() => null);
    const payload = json?.data ?? json;
    const rows = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.content)
        ? payload.content
        : [];

    const normalized = rows
      .map((row) => normalizeCoupon(row))
      .filter((row): row is CouponCatalogItem => row !== null);

    if (normalized.length > 0) {
      return normalized;
    }
  }

  return [];
}

export async function listVisibleCoupons(page = 0, size = 20): Promise<CouponCatalogItem[]> {
  const candidatePaths = [
    `/api/customer/coupons/visible?page=${encodeURIComponent(String(page))}&size=${encodeURIComponent(String(size))}`,
    `/api/customer/coupons/visible`,
    `/api/customer/coupons/available?page=${encodeURIComponent(String(page))}&size=${encodeURIComponent(String(size))}`,
    `/api/customer/coupons/available`,
    `/api/customer/coupons?page=${encodeURIComponent(String(page))}&size=${encodeURIComponent(String(size))}`,
    `/api/customer/coupons`,
  ];

  for (const path of candidatePaths) {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "GET",
      headers: authHeaders(),
    });

    if (!res.ok) {
      if (res.status === 404 || res.status === 401 || res.status === 403) {
        continue;
      }
      const err = await res.text().catch(() => "");
      throw new Error(`Failed to fetch visible coupons: ${res.status} ${err}`);
    }

    const json = await res.json().catch(() => null);
    const payload = json?.data ?? json;
    const rows = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.content)
        ? payload.content
        : [];

    const normalized = rows
      .map((row: any) => normalizeCoupon(row))
      .filter((row: CouponCatalogItem | null): row is CouponCatalogItem => row !== null);

    if (normalized.length > 0) {
      return normalized;
    }
  }

  return [];
}

export async function validateCoupon(payload: CouponValidateRequest): Promise<CouponValidateResult> {
  const res = await fetch(`${BASE_URL}/api/customer/coupons/validate`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json?.message || `Coupon validation failed: ${res.status}`);
  }
  // API wraps in { success, message, data }
  return (json?.data ?? json) as CouponValidateResult;
}

export default { validateCoupon, listCoupons, listVisibleCoupons }; 
