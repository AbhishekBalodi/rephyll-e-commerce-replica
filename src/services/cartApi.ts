/**
 * Cart API wrapper for server-backed cart endpoints.
 */
const BASE_URL = import.meta.env.VITE_BASE_URL || "https://www.rephyl.com";

function authHeaders() {
  const token = localStorage.getItem("rephyl_token");
  return token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : { "Content-Type": "application/json" };
}

async function fetchJson(res: Response) {
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `API error ${res.status}`);
  }
  return res.json();
}

export async function getCart() {
  const res = await fetch(`${BASE_URL}/api/customer-account/cart`, { headers: authHeaders() });
  return fetchJson(res);
}

export async function addItem(variantId: number, quantity = 1) {
  const res = await fetch(`${BASE_URL}/api/customer-account/cart/items`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ variantId, quantity }),
  });
  return fetchJson(res);
}

export async function updateItem(itemId: number, quantity: number) {
  const res = await fetch(`${BASE_URL}/api/customer-account/cart/items/${itemId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ quantity }),
  });
  return fetchJson(res);
}

export async function removeItem(itemId: number) {
  const res = await fetch(`${BASE_URL}/api/customer-account/cart/items/${itemId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return fetchJson(res);
}

export async function clearCart() {
  const res = await fetch(`${BASE_URL}/api/customer-account/cart`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return fetchJson(res);
}

export default { getCart, addItem, updateItem, removeItem, clearCart };
