const STORAGE_KEY = "rephyl_green_points_checkout_summary";

export interface GreenPointsCheckoutSummary {
  pointsBalance: number;
  redeemableValue: number;
  pointsRate: number;
  redeemedValue: number;
  pointsUsed: number;
  remainingPoints: number;
  remainingRedeemableValue: number;
  subtotal: number;
  payableAfterGreenPoints: number;
  updatedAt: string;
}

const canUseSessionStorage = () => typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";

export function getStoredGreenPointsCheckoutSummary(): GreenPointsCheckoutSummary | null {
  if (!canUseSessionStorage()) return null;

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GreenPointsCheckoutSummary;
  } catch {
    return null;
  }
}

export function setStoredGreenPointsCheckoutSummary(summary: GreenPointsCheckoutSummary) {
  if (!canUseSessionStorage()) return;

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(summary));
  } catch {
    // Ignore storage quota or privacy mode failures.
  }
}

export function clearStoredGreenPointsCheckoutSummary() {
  if (!canUseSessionStorage()) return;

  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage cleanup failures.
  }
}