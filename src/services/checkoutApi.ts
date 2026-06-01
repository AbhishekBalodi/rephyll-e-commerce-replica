/**
 * Checkout / Orders API (frontend wrappers)
 */
import { handleAuthExpired } from "@/lib/authSession";

const BASE_URL =
  (import.meta.env.VITE_BASE_URL as string | undefined)?.trim().replace(/\/+$/, "") || "";

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
    if (res.status === 401) {
      handleAuthExpired();
      throw new Error("Session expired. Please log in again.");
    }
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
    if (res.status === 401) {
      handleAuthExpired();
      throw new Error("Session expired. Please log in again.");
    }
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Start payment session failed: ${res.status}`);
  }
  return res.json();
}

export async function verifyPaymentSession(merchantOrderId: string) {
  const res = await fetch(`${BASE_URL}/api/customer-account/orders/payment-session/${merchantOrderId}/verify`, {
    method: "POST",
    headers: authHeaders(),
  });
  if (!res.ok) {
    if (res.status === 401) {
      handleAuthExpired();
      throw new Error("Session expired. Please log in again.");
    }
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Verify failed: ${res.status}`);
  }
  return res.json();
}

export async function confirmPaymentSession(body: { orderIds: number[]; paymentMethod: string }) {
  const res = await fetch(`${BASE_URL}/api/customer-account/orders/payment-session/confirm`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    if (res.status === 401) {
      handleAuthExpired();
      throw new Error("Session expired. Please log in again.");
    }
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Confirm payment failed: ${res.status}`);
  }
  return res.json();
}

export default { previewCheckout, startPaymentSession, verifyPaymentSession, confirmPaymentSession };
