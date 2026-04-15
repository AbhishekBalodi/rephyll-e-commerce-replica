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

export async function listOrders(params: { page?: number; size?: number; status?: string; sortBy?: string; direction?: string } = {}) {
  const sp = new URLSearchParams();
  if (params.page !== undefined) sp.set('page', String(params.page));
  if (params.size !== undefined) sp.set('size', String(params.size));
  if (params.status) sp.set('status', params.status);
  if (params.sortBy) sp.set('sortBy', params.sortBy);
  if (params.direction) sp.set('direction', params.direction);
  const res = await fetch(`${BASE_URL}/api/customer-account/orders?${sp.toString()}`, { headers: authHeaders() });
  return fetchJson(res);
}

export async function getOrderById(orderId: number) {
  const res = await fetch(`${BASE_URL}/api/customer-account/orders/${orderId}`, { headers: authHeaders() });
  return fetchJson(res);
}

export default { listOrders, getOrderById };
