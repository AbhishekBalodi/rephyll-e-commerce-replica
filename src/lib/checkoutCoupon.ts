import type { CouponValidateResult } from "@/services/couponsApi";

const STORAGE_KEY = "rephyl_checkout_coupons";

export function getStoredCheckoutCoupons(): CouponValidateResult[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function setStoredCheckoutCoupons(coupons: CouponValidateResult[]) {
  if (typeof window === "undefined") return;

  if (!coupons.length) {
    window.sessionStorage.removeItem(STORAGE_KEY);
    return;
  }

  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(coupons));
}

export function clearStoredCheckoutCoupons() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(STORAGE_KEY);
}