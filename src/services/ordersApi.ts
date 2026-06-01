const BASE_URL =
  (import.meta.env.VITE_BASE_URL as string | undefined)?.trim().replace(/\/+$/, "") || "";

function decodeBase64ToUint8Array(base64: string): Uint8Array {
  const normalized = base64.includes(',') ? base64.split(',').pop() || '' : base64;
  const binary = atob(normalized);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

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

export async function cancelOrder(orderId: number) {
  const res = await fetch(`${BASE_URL}/api/customer-account/orders/${orderId}/cancel`, {
    method: "POST",
    headers: authHeaders(),
  });
  return fetchJson(res);
}

export async function getOrderInvoice(orderId: number) {
  const res = await fetch(`${BASE_URL}/api/customer-account/orders/${orderId}/invoice`, {
    headers: authHeaders(),
  });

  const json = await fetchJson(res);
  const base64Data = typeof json?.data === 'string' ? json.data : '';

  if (!base64Data) {
    throw new Error('Invoice data is empty.');
  }

  const byteArray = decodeBase64ToUint8Array(base64Data);
  const blob = new Blob([byteArray as BlobPart], { type: 'application/pdf' });

  return {
    blob,
    fileName: `invoice-order-${orderId}.pdf`,
  };
}

export default { listOrders, getOrderById, cancelOrder, getOrderInvoice };
