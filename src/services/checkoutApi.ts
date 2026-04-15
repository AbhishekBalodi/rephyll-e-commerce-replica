/**
 * Checkout / Orders API (frontend wrappers)
 */
import type { ApiResponse } from "@/types/api";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://www.rephyl.com";

function authHeaders() {
  const token = localStorage.getItem("rephyl_token");
  return token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : { "Content-Type": "application/json" };
}

export async function previewCheckout(body: any) {
  const res = await fetch(`${BASE_URL}/api/customer-account/orders/payment-session/preview`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Preview failed: ${res.status}`);
  }
  const data = await res.json();
  return data; // ApiResponse expected
}

export async function startPaymentSession(body: any) {
  const res = await fetch(`${BASE_URL}/api/customer-account/orders/payment-session`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Start payment session failed: ${res.status}`);
  }
  return res.json();
}

export async function confirmPaymentSession(body: any) {
  const res = await fetch(`${BASE_URL}/api/customer-account/orders/payment-session/confirm`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Confirm failed: ${res.status}`);
  }
  return res.json();
}

export default { previewCheckout, startPaymentSession, confirmPaymentSession };
