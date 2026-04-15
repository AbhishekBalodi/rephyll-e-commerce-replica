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

export async function getProfile() {
  const res = await fetch(`${BASE_URL}/api/customer-account/profile`, { headers: authHeaders() });
  return fetchJson(res);
}

export async function updateProfile(body: any) {
  const res = await fetch(`${BASE_URL}/api/customer-account/profile`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  return fetchJson(res);
}

export default { getProfile, updateProfile };
